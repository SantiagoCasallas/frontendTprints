import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/authService.js";

export default function CreateAccountPage() {
  const navigate = useNavigate();

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("CLIENTE");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser({
        nombres,
        apellidos,
        correo,
        nombreUsuario,
        password,
        telefono,
        fotoPerfilUrl: "",
        rol,
      });

      navigate("/productos");
    } catch (error) {
      setError(error.message || "No se pudo crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
<div className="relative p-4 flex items-center justify-center">
  <button
    onClick={() => navigate(-1)}
    className="absolute left-4 text-primary flex size-10 shrink-0 items-center justify-center hover:bg-primary/10 rounded-full transition-colors cursor-pointer"
    aria-label="Volver"
  >
    <span className="material-symbols-outlined">{"<--"}</span>
  </button>

  <div className="text-center">
    <h1 className="text-primary text-xl font-bold leading-tight tracking-tight">
      T-Prints
    </h1>

    <h2 className="mt-2 text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight">
      Crear cuenta
    </h2>
  </div>
</div>



        <form className="px-8 py-6 space-y-5" onSubmit={handleRegister}>
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">
              Nombres
            </label>

            <input
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              placeholder="Ingresa tus nombres"
              type="text"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">
              Apellidos
            </label>

            <input
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              placeholder="Ingresa tus apellidos"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">
              Correo
            </label>

            <input
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              placeholder="Ingresa tu correo"
              type="email"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">
              Nombre de usuario
            </label>

            <input
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              placeholder="Ej: juanvanegas"
              type="text"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">
              Teléfono
            </label>

            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              placeholder="+57 300 123 4567"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">
              Contraseña
            </label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              placeholder="Crea una contraseña"
              type="password"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">
              Rol
            </label>

            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900 dark:text-white"
              required
            >
              <option value="CLIENTE">Cliente</option>
              <option value="DISENADOR">Diseñador</option>
            </select>
          </div>

          <button
            className="w-full h-12 bg-primary hover:bg-primary/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
    <span className="material-symbols-outlined">{"-->"}</span>

          </button>
        </form>

        <div className="px-8 pb-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            ¿Ya tienes cuenta?
            <Link
              className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1"
              to="/login"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}