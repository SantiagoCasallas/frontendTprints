import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav.jsx";
import Header1 from "../components/Header1.jsx";

import person from "../assets/icons/profile.png";
import username from "../assets/icons/username.png";
import mail from "../assets/icons/mail.png";
import badge from "../assets/icons/bagde.png";
import shoppingBag from "../assets/icons/shoppingcart.png";
import editar from "../assets/icons/editar.png";
import salir from "../assets/icons/salir.png";

import {
  clearSession,
  getCurrentUser,
  isAuthenticated,
} from "../services/api.js";
import { getMyOrders } from "../services/orderService.js";

const defaultPhoto =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80";

function getImageUrl(url) {
  if (!url) {
    return defaultPhoto;
  }

  const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);

  if (driveFileMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${driveFileMatch[1]}&sz=w1000`;
  }

  const driveIdMatch = url.match(/[?&]id=([^&]+)/);

  if (url.includes("drive.google.com") && driveIdMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${driveIdMatch[1]}&sz=w1000`;
  }

  return url;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateValue));
}

export default function ProfilePage() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  const [editForm, setEditForm] = useState({
    nombres: "",
    apellidos: "",
    nombreUsuario: "",
    correo: "",
    telefono: "",
    fotoPerfilUrl: "",
  });

  const user = currentUser;

  const fullName = user
    ? `${user.nombres || ""} ${user.apellidos || ""}`.trim()
    : "Usuario invitado";

  const profilePhoto = getImageUrl(user?.fotoPerfilUrl);

  const profileInfo = [
    {
      label: "Nombres",
      value: fullName || "Sin nombre",
      icon: person,
    },
    {
      label: "Usuario",
      value: user?.nombreUsuario || "Sin usuario",
      icon: username,
    },
    {
      label: "Correo",
      value: user?.correo || "No has iniciado sesión",
      icon: mail,
    },
    {
      label: "Roles",
      value: user?.roles?.join(", ") || "Sin rol",
      icon: badge,
    },
  ];

  useEffect(() => {
    const loadOrders = async () => {
      if (!isAuthenticated()) {
        setLoadingOrders(false);
        setOrdersError("Debes iniciar sesión para ver tus pedidos.");
        return;
      }

      try {
        setLoadingOrders(true);
        setOrdersError("");

        const data = await getMyOrders();

        setOrders(data || []);
      } catch (error) {
        setOrdersError(error.message || "No se pudieron cargar los pedidos.");
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, []);

  const openEditProfile = () => {
    if (!user) {
      return;
    }

    setProfileMessage("");

    setEditForm({
      nombres: user.nombres || "",
      apellidos: user.apellidos || "",
      nombreUsuario: user.nombreUsuario || "",
      correo: user.correo || "",
      telefono: user.telefono || "",
      fotoPerfilUrl: user.fotoPerfilUrl || "",
    });

    setShowEditProfile(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      ...editForm,
    };

    setCurrentUser(updatedUser);
    setShowEditProfile(false);
    setProfileMessage("Perfil actualizado en la vista actual.");

    /*
      Aquí puedes conectar el endpoint real del backend.

      Ejemplo:
      await updateMyProfile(editForm);

      También puedes actualizar el localStorage aquí si tu sesión guarda
      el usuario directamente en localStorage.
    */
  };

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Header1 title="T-Prints" />

      <main className="flex-1 px-4 py-6 pb-28">
        <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[320px_1fr] pt-14">
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col items-center text-center">
              <a
                href={profilePhoto}
                target="_blank"
                rel="noreferrer"
                className="block h-36 w-36 overflow-hidden rounded-full border-4 border-primary/20 bg-slate-100 shadow-md transition hover:scale-105 dark:bg-slate-800"
                title="Abrir foto de perfil"
              >
                <img
                  src={profilePhoto}
                  alt="Foto de perfil"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = defaultPhoto;
                  }}
                />
              </a>

              <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                {fullName}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {user?.roles?.join(", ") || "Invitado"}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {profileInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/60"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-5 w-5 object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {item.label}
                    </p>

                    <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={openEditProfile}
                disabled={!user}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary/90 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <img
                  src={editar}
                  alt="editar"
                  className="h-5 w-5 object-contain"
                />
                Editar perfil
              </button>

              {profileMessage && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {profileMessage}
                </div>
              )}

              {user && (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
                >
                  <img
                    src={salir}
                    alt="salir"
                    className="h-5 w-5 object-contain"
                  />
                  Cerrar sesión
                </button>
              )}
            </div>
          </aside>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Historial
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  Mis pedidos
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Aquí puedes consultar los pedidos realizados con tu cuenta.
                </p>
              </div>

              <Link
                to="/productos"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
              >
                <img
                  src={shoppingBag}
                  alt="Comprar más"
                  className="h-5 w-5 object-contain"
                />
                Comprar más
              </Link>
            </div>

            {!user && (
              <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
                No has iniciado sesión. Para ver tus pedidos, entra con tu
                cuenta.
              </div>
            )}

            {loadingOrders && (
              <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400">
                Cargando pedidos...
              </div>
            )}

            {ordersError && !loadingOrders && (
              <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                {ordersError}
              </div>
            )}

            {!loadingOrders && !ordersError && orders.length === 0 && (
              <div className="mt-8 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-800/40">
                <span className="material-symbols-outlined text-5xl text-slate-300">
                  receipt_long
                </span>

                <h2 className="mt-3 text-lg font-bold text-slate-800 dark:text-white">
                  Todavía no tienes pedidos
                </h2>

                <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                  Cuando finalices una compra, el pedido aparecerá en esta
                  sección.
                </p>

                <Link
                  to="/productos"
                  className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90"
                >
                  Ver productos
                </Link>
              </div>
            )}

            {!loadingOrders && !ordersError && orders.length > 0 && (
              <div className="mt-8 space-y-5">
                {orders.map((order) => (
                  <article
                    key={order.idPedido}
                    className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                  >
                    <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 dark:border-slate-800 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">
                            receipt_long
                          </span>

                          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Pedido #{order.idPedido}
                          </h2>
                        </div>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {formatDate(order.fechaCreacion)}
                        </p>
                      </div>

                      <div className="flex flex-col items-start gap-2 sm:items-end">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                          {order.estadoPedido}
                        </span>

                        <p className="text-xl font-extrabold text-primary">
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                      <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          Subtotal
                        </p>
                        <p className="mt-1 font-semibold text-slate-700 dark:text-slate-200">
                          {formatCurrency(order.subtotal)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          Envío
                        </p>
                        <p className="mt-1 font-semibold text-slate-700 dark:text-slate-200">
                          {formatCurrency(order.costoEnvio)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          Dirección
                        </p>
                        <p className="mt-1 font-semibold text-slate-700 dark:text-slate-200">
                          {order.direccionEnvio}, {order.ciudadEnvio}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Productos del pedido
                      </h3>

                      <div className="mt-3 space-y-3">
                        {(order.items || []).map((item) => (
                          <div
                            key={item.idPedidoItem}
                            className="flex flex-col gap-3 rounded-xl border border-slate-100 p-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div>
                              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                {item.producto}
                              </p>

                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                Color: {item.color} / Talla: {item.talla}
                              </p>

                              {item.tituloDiseno && (
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                  Diseño: {item.tituloDiseno}
                                </p>
                              )}

                              {item.imagenPersonalizadaUrl && (
                                <a
                                  href={item.imagenPersonalizadaUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="mt-1 inline-block text-xs font-semibold text-primary hover:underline"
                                >
                                  Ver imagen personalizada
                                </a>
                              )}
                            </div>

                            <div className="text-left sm:text-right">
                              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                {formatCurrency(item.subtotal)}
                              </p>

                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                Cantidad: {item.cantidad}
                              </p>

                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                Unitario: {formatCurrency(item.precioUnitario)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>

      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between border-b border-slate-200 p-5 dark:border-slate-800">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Perfil
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  Editar perfil
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Actualiza la información visible de tu cuenta.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowEditProfile(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSaveProfile}
              className="max-h-[75vh] space-y-4 overflow-y-auto p-5"
            >
              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <img
                  src={getImageUrl(editForm.fotoPerfilUrl)}
                  alt="Vista previa perfil"
                  className="h-20 w-20 rounded-full object-cover border-4 border-primary/20"
                  onError={(e) => {
                    e.currentTarget.src = defaultPhoto;
                  }}
                />

                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    Vista previa
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Puedes pegar una URL normal o una URL de Google Drive.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Nombres
                  </label>

                  <input
                    name="nombres"
                    value={editForm.nombres}
                    onChange={handleEditChange}
                    className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900"
                    placeholder="Tus nombres"
                    type="text"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Apellidos
                  </label>

                  <input
                    name="apellidos"
                    value={editForm.apellidos}
                    onChange={handleEditChange}
                    className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900"
                    placeholder="Tus apellidos"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Nombre de usuario
                </label>

                <input
                  name="nombreUsuario"
                  value={editForm.nombreUsuario}
                  onChange={handleEditChange}
                  className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900"
                  placeholder="Ej: juanvanegas"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Correo
                </label>

                <input
                  name="correo"
                  value={editForm.correo}
                  onChange={handleEditChange}
                  className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900"
                  placeholder="correo@ejemplo.com"
                  type="email"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Teléfono
                </label>

                <input
                  name="telefono"
                  value={editForm.telefono}
                  onChange={handleEditChange}
                  className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900"
                  placeholder="+57 300 123 4567"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Foto de perfil URL
                </label>

                <input
                  name="fotoPerfilUrl"
                  value={editForm.fotoPerfilUrl}
                  onChange={handleEditChange}
                  className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900"
                  placeholder="https://..."
                  type="text"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary/90"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}