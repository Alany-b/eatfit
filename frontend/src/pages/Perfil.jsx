import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient.js";
import { Loader2, CheckCircle, User } from "lucide-react";

import { Button } from "../components/ui/Button.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Label } from "../components/ui/Label.jsx";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group.jsx";
import { Select, SelectItem } from "../components/ui/Select.jsx";
import { Card, CardContent } from "../components/ui/Card.jsx";
import { Alert } from "../components/ui/Alert.jsx";

const condiciones = [
  { value: "anorexia_nerviosa", label: "Anorexia nerviosa" },
  { value: "bulimia", label: "Bulimia" },
  { value: "trastorno_por_atracon", label: "Trastorno por atracón" },
  { value: "celiaquia", label: "Celiaquía" },
  { value: "intolerancia_lactosa", label: "Intolerancia a la lactosa" },
  { value: "intolerancia_gluten", label: "Intolerancia al gluten" },
  { value: "diabetes", label: "Diabetes" },
  { value: "hipertension", label: "Hipertensión" },
  { value: "hipercolesterolemia", label: "Hipercolesterolemia" },
  { value: "obesidad", label: "Obesidad" },
  { value: "resistencia_insulina", label: "Resistencia a la insulina" },
  { value: "otro", label: "Otro" }
];

const objetivos = [
  { value: "informarme_alimentos", label: "Informarme más acerca de los alimentos" },
  { value: "mejorar_habitos", label: "Mejorar mis hábitos alimenticios" },
  { value: "bajar_peso", label: "Bajar de peso" },
  { value: "subir_peso", label: "Subir de peso" },
  { value: "alimentacion_equilibrada", label: "Mantener una alimentación equilibrada" }
];

export default function Perfil() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  
  // Obtener el usuario actual
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiClient.auth.me(),
    retry: false,
    onError: () => {
      apiClient.auth.redirectToLogin();
    }
  });
  const [formData, setFormData] = useState({
    edad: "",
    genero: "",
    tiene_condicion: "no",
    condicion: [],
    condicion_otro: "",
    objetivo: []
  });

  // 🔹 Cargar perfil desde backend
  const { data: existingProfile, isLoading, error: profileError } = useQuery({
    queryKey: ["userProfile", user?.id],
    queryFn: () => apiClient.profile.getUserProfile(user.id),
    enabled: !!user?.id,
    retry: 1,
  });

  useEffect(() => {
    if (existingProfile) {
      setFormData(existingProfile);
    }
  }, [existingProfile]);

  // 🔹 Crear o actualizar perfil
  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        if (existingProfile?._id) {
          return await apiClient.profile.updateUserProfile(existingProfile._id, data);
        } else {
          return await apiClient.profile.createUserProfile(data);
        }
      } catch (err) {
        // Capturar mensajes específicos del backend
        const message = await err.response?.text();
        throw new Error(message || err.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
      navigate("/dashboard");
    },
    onError: (error) => {
      setError(error.message);
      // Scrollear al inicio donde se muestra el error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Limpiar error previo
    
    // Validaciones básicas
    const edad = parseInt(formData.edad, 10);
    if (!edad || edad < 12 || edad > 120) {
      setError("Por favor, ingresa una edad válida entre 12 y 120 años");
      return;
    }

    if (!formData.objetivo || formData.objetivo.length === 0) {
      setError("Por favor, selecciona al menos un objetivo");
      return;
    }

    if (formData.tiene_condicion === "si" && formData.condicion.length === 0) {
      setError("Por favor, selecciona al menos una condición médica");
      return;
    }

    if (formData.condicion.includes("otro") && !formData.condicion_otro.trim()) {
      setError("Por favor, especifica tu condición en 'Otro'");
      return;
    }

    mutation.mutate({ ...formData, userId: user.id });
  };

  if (isLoadingUser || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {existingProfile ? "Mi Perfil" : "Completa Tu Perfil"}
          </h1>
        </div>

        {/* Mensajes de error */}
        {error && (
          <Alert
            variant="error"
            title="Error"
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}
        {profileError && (
          <Alert
            variant="error"
            title="Error al cargar el perfil"
          >
            {profileError.message}
          </Alert>
        )}

        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Información Básica */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Información Básica</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="edad">Edad</Label>
                    <Input
                      id="edad"
                      type="number"
                      value={formData.edad}
                      onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                      placeholder="Tu edad"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="genero">Género (opcional)</Label>
                    <Select
                      value={formData.genero}
                      onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                    >
                      <option value="">Selecciona tu género</option>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="femenino">Femenino</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                      <SelectItem value="prefiero_no_decir">Prefiero no decir</SelectItem>
                    </Select>
                  </div>
                </div>
              </div>

                {/* Condiciones Médicas */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Condiciones Médicas</h3>

                  <div className="space-y-4">
                    <RadioGroup
                      value={formData.tiene_condicion}
                      onChange={(e) => setFormData({ ...formData, tiene_condicion: e.target.value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="si" id="si" name="tiene_condicion" />
                        <Label htmlFor="si">Sí, tengo una condición médica</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" name="tiene_condicion" />
                        <Label htmlFor="no">No tengo ninguna condición médica</Label>
                      </div>
                    </RadioGroup>

                    {formData.tiene_condicion === "si" && (
                      <div className="space-y-4">
                        <Label>Selecciona tus condiciones médicas (puedes elegir varias)</Label>
                        <div className="grid grid-cols-2 gap-4">
                          {condiciones.map((cond) => (
                            <div key={cond.value} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={cond.value}
                                checked={formData.condicion.includes(cond.value)}
                                onChange={(e) => {
                                  const newCondiciones = e.target.checked
                                    ? [...formData.condicion, cond.value]
                                    : formData.condicion.filter((c) => c !== cond.value);
                                  setFormData({ ...formData, condicion: newCondiciones });
                                }}
                                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                              />
                              <Label htmlFor={cond.value}>{cond.label}</Label>
                            </div>
                          ))}
                        </div>

                        {formData.condicion.includes("otro") && (
                          <div className="space-y-2">
                            <Label htmlFor="condicion_otro">Especifica tu condición</Label>
                            <Input
                              id="condicion_otro"
                              value={formData.condicion_otro}
                              onChange={(e) => setFormData({ ...formData, condicion_otro: e.target.value })}
                              placeholder="Describe tu condición médica"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Objetivos */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Objetivos</h3>
                  <div className="space-y-4">
                    <Label>Selecciona tus objetivos (puedes elegir varios)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {objetivos.map((obj) => (
                        <div key={obj.value} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={obj.value}
                            checked={formData.objetivo.includes(obj.value)}
                            onChange={(e) => {
                              const newObjetivos = e.target.checked
                                ? [...formData.objetivo, obj.value]
                                : formData.objetivo.filter((o) => o !== obj.value);
                              setFormData({ ...formData, objetivo: newObjetivos });
                            }}
                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <Label htmlFor={obj.value}>{obj.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Botón */}
              <Button
                type="submit"
                disabled={mutation.isLoading}
                className="w-full bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-6 text-lg"
              >
                {mutation.isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Guardando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" /> Guardar Perfil
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
