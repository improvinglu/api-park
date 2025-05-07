import React from "react";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <button className="w-full bg-red-500 text-white py-2 rounded mb-4">Iniciar con Google</button>
        <form>
          <input className="w-full border p-2 mb-4" type="email" placeholder="Correo electrónico" />
          <input className="w-full border p-2 mb-4" type="password" placeholder="Contraseña" />
          <button className="w-full bg-blue-500 text-white py-2 rounded">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;