import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Inicio de sesión exitoso ✅");
        console.log("Token:", data.token);
        localStorage.setItem("token", data.token);
        window.location.href = "/home";
      } else {
        alert(data.message || "Error al iniciar sesión ❌");
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
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border rounded-lg p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border rounded-lg p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Entrar
        </button>

        <p className="mt-4 text-center text-sm">
          ¿No tenés cuenta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Registrate aquí
          </a>
        </p>
      </form>
    </div>
  );
}
