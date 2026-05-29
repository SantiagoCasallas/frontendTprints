import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/authService.js";
import visibilitionIcon from "../assets/icons/visibilition.png";
import visibilitionOffIcon from "../assets/icons/visibilityoff.png";

export default function CreateAccountPage() {
  const navigate = useNavigate();

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("CLIENTE");
  const [nombreUsuario, setNombreUsuario] = useState("");

  const [showPassword, setShowPassword] = useState(false);
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
    <div
      id="CreateAccount"
      className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-md w-full bg-white dark:bg-slate-900/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-primary flex size-10 shrink-0 items-center justify-center hover:bg-primary/10 rounded-full transition-colors cursor-pointer"
            aria-label="Volver"
          >
            <span className="material-symbols-outlined">{"<--"}</span>
          </button>

          <h1 className="text-primary text-xl font-bold leading-tight tracking-tight flex-1 text-center pr-10">
            T-Prints
          </h1>
        </div>

        <div className="px-8 pt-6 pb-2 text-center">
          <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight">
            Crear cuenta
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Regístrate para comprar, subir diseños y personalizar camisetas.
          </p>
        </div>

        <form className="px-8 py-6 space-y-4" onSubmit={handleRegister}>
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">
                Nombres
              </label>

              <input
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                placeholder="Tus nombres"
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
                placeholder="Tus apellidos"
                type="text"
              />
            </div>
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

            <div className="relative flex items-center">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-4 pr-12 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                placeholder="Crea una contraseña"
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
                {showPassword ? (
                  <img
                    src={visibilitionIcon}
                    alt="visibilidad"
                    className="h-5 w-5 object-contain"
                  />
                ) : (
                  <img
                    src={visibilitionOffIcon}
                    alt="visibilidad"
                    className="h-5 w-5 object-contain"
                  />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">
              Rol
            </label>

            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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