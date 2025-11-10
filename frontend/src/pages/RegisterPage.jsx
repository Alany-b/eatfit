import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "", 
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registro exitoso");
        window.location.href = "/login";
      } else {
        alert(data.message || "Error al registrarse ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error en la conexión con el servidor ❗");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Crear una cuenta
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          className="w-full border rounded-lg p-2 mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username" // 🔹 Nuevo campo
          placeholder="Nombre de usuario"
          className="w-full border rounded-lg p-2 mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="w-full border rounded-lg p-2 mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full border rounded-lg p-2 mb-4"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
        >
          Registrarse
        </button>

        <p className="mt-4 text-center text-sm">
          ¿Ya tenés cuenta?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Iniciá sesión
          </a>
        </p>
      </form>
    </div>
  );
}
