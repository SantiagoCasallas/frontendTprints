import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authService.js";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [identificador, setIdentificador] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({
        identificador,
        password,
      });

      navigate("/productos");
    } catch (error) {
      setError(error.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-primary flex size-10 shrink-0 items-center justify-center hover:bg-primary/10 rounded-full transition-colors cursor-pointer"
            aria-label="Volver"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <h1 className="text-primary text-xl font-bold leading-tight tracking-tight flex-1 text-center pr-10">
            T-Prints
          </h1>
        </div>

        <div className="px-8 pt-6 pb-2 text-center">
          <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight">
            Iniciar sesión
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Ingresa tus datos para continuar
          </p>
        </div>

        <form className="px-8 py-6 space-y-5" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">
              Correo o usuario
            </label>

            <input
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              placeholder="Correo o nombre de usuario"
              type="text"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">
              Contraseña
            </label>

            <div className="relative flex items-center">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-4 pr-12 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                placeholder="Ingresa tu contraseña"
                type={showPassword ? "text" : "password"}
                required
              />

              <button
                className="absolute right-3 text-slate-400 hover:text-primary transition-colors"
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <button
            className="w-full h-12 bg-primary hover:bg-primary/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
            <span className="material-symbols-outlined text-sm">login</span>
          </button>
        </form>

        <div className="px-8 pb-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            ¿No tienes cuenta?
            <Link
              className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1"
              to="/registro"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
