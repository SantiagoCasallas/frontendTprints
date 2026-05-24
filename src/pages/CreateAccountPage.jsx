import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/authService.js";

export default function CreateAccountPage() {
  const navigate = useNavigate();

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("CLIENTE");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");

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
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
        <div className="flex items-center bg-transparent p-4 pb-2 justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-900 dark:text-slate-100 flex size-12 shrink-0 items-center cursor-pointer"
            aria-label="Volver"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-lg">print</span>
            </div>

            <span className="font-bold text-xl tracking-tight">T-Prints</span>
          </div>

          <div className="size-12 shrink-0"></div>
        </div>

        <div className="px-4 pt-8 pb-4">
          <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight">
            Crear cuenta
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal mt-2">
            Regístrate para comprar, subir diseños y personalizar camisetas.
          </p>
        </div>

        <form
          className="flex flex-col gap-4 px-4 py-2 max-w-[480px]"
          onSubmit={handleRegister}
        >
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <label className="flex flex-col w-full">
            <p className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal pb-2 px-1">
              Nombres
            </p>

            <div className="relative">
                 <input
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 placeholder:text-slate-400 pl-12 pr-4 text-base font-normal leading-normal transition-all"
                placeholder="Ingresa tus nombres"
                type="text"
                required
              />
            </div>
          </label>

          <label className="flex flex-col w-full">
            <p className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal pb-2 px-1">
              Apellidos
            </p>

            <div className="relative">
              <input
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 placeholder:text-slate-400 pl-12 pr-4 text-base font-normal leading-normal transition-all"
                placeholder="Ingresa tus apellidos"
                type="text"
              />
            </div>
          </label>

          <label className="flex flex-col w-full">
            <p className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal pb-2 px-1">
              Correo
            </p>

            <div className="relative">
              <input
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 placeholder:text-slate-400 pl-12 pr-4 text-base font-normal leading-normal transition-all"
                placeholder="Ingresa tu correo"
                type="email"
                required
              />
            </div>
          </label>
          <label className="flex flex-col w-full">
            <p className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal pb-2 px-1">
              Nombre de usuario
            </p>

            <div className="relative">
              <input
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 placeholder:text-slate-400 pl-12 pr-4 text-base font-normal leading-normal transition-all"
                placeholder="Ej: juanvanegas"
                type="text"
                required
              />
            </div>
          </label>

          <label className="flex flex-col w-full">
            <p className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal pb-2 px-1">
              Teléfono
            </p>

            <div className="relative">
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 placeholder:text-slate-400 pl-12 pr-4 text-base font-normal leading-normal transition-all"
                placeholder="+57 300 123 4567"
                type="text"
              />
            </div>
          </label>

          <label className="flex flex-col w-full">
            <p className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal pb-2 px-1">
              Contraseña
            </p>

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 placeholder:text-slate-400 pl-12 pr-4 text-base font-normal leading-normal transition-all"
                placeholder="Crea una contraseña"
                type="password"
                required
              />
            </div>
          </label>

          <label className="flex flex-col w-full">
            <p className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal pb-2 px-1">
              Rol
            </p>

            <div className="relative">
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="form-select flex w-full min-w-0 flex-1 rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 pl-12 pr-10 text-base font-normal leading-normal appearance-none transition-all"
                required
              >
                <option value="CLIENTE">Cliente</option>
                <option value="DISENADOR">Diseñador</option>
              </select>

              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
               +
              </span>
            </div>
          </label>

          <div className="pt-2">
            <button
              className="w-full h-14 bg-primary hover:bg-primary/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? "Creando cuenta..." : "Crear cuenta"}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </form>

        <div className="px-4 pb-12 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-base font-normal">
            ¿Ya tienes cuenta?
            <Link
              className="text-primary font-bold hover:underline ml-1"
              to="/login"
            >
              Inicia sesión
            </Link>
          </p>
        </div>

        <div className="h-8"></div>
      </div>
    </div>
  );
}
