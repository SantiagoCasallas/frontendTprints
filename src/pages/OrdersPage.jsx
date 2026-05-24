import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import Header1 from "../components/Header1.jsx";
import { createOrder } from "../services/orderService.js";
import { isAuthenticated } from "../services/api.js";

const CART_STORAGE_KEY = "tprints-cart";
const SHIPPING_COST = 8000;

function formatCurrency(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStoredCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("No se pudo leer el carrito", error);
    return [];
  }
}

export default function OrdersPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [idDireccionEnvio, setIdDireccionEnvio] = useState("");
  const [metodoPago, setMetodoPago] = useState("PSE");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingOrder, setLoadingOrder] = useState(false);

  useEffect(() => {
    setCartItems(getStoredCart());
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + Number(item.price || 0) * Number(item.quantity || 1),
        0
      ),
    [cartItems]
  );

  const shipping = cartItems.length ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  const updateQuantity = (idVariante, nextQuantity) => {
    const quantity = Math.max(1, nextQuantity);

    const updatedCart = cartItems.map((item) =>
      item.idVariante === idVariante ? { ...item, quantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
  };

  const removeItem = (idVariante) => {
    const updatedCart = cartItems.filter((item) => item.idVariante !== idVariante);

    setCartItems(updatedCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
  };

  const handleCreateOrder = async () => {
    setError("");
    setSuccess("");

    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    if (!idDireccionEnvio) {
      setError("Debes ingresar el ID de la dirección de envío.");
      return;
    }

    if (!cartItems.length) {
      setError("El carrito está vacío.");
      return;
    }

    const payload = {
      idDireccionEnvio: Number(idDireccionEnvio),
      metodoPago,
      items: cartItems.map((item) => ({
        idVariante: item.idVariante,
        cantidad: Number(item.quantity || 1),
        imagenPersonalizadaUrl: item.imagenPersonalizadaUrl || null,
        notasPersonalizacion: item.notasPersonalizacion || null,
      })),
    };

    try {
      setLoadingOrder(true);

      const pedido = await createOrder(payload);

      localStorage.removeItem(CART_STORAGE_KEY);
      setCartItems([]);

      setSuccess(`Pedido #${pedido.idPedido} creado correctamente. Total: ${formatCurrency(pedido.total)}`);
    } catch (error) {
      setError(error.message || "No se pudo crear el pedido");
    } finally {
      setLoadingOrder(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Header1 title="T-Prints" />

      <main className="flex-1 px-4 py-6 pb-28">
        <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Carrito de compras
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Revisa los productos agregados antes de finalizar tu compra.
                </p>
              </div>

              <Link
                to="/productos"
                className="inline-flex items-center justify-center rounded-xl border border-primary px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
              >
                Seguir comprando
              </Link>
            </div>

            {success && (
              <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {cartItems.length === 0 ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-800/40">
                <span className="material-symbols-outlined text-5xl text-slate-300">
                  shopping_cart
                </span>

                <h2 className="mt-3 text-lg font-bold text-slate-800 dark:text-white">
                  Tu carrito está vacío
                </h2>

                <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                  Agrega una camisa desde productos para que aparezca aquí con su imagen, descripción y cantidad.
                </p>

                <Link
                  to="/productos"
                  className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90"
                >
                  Ver productos
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <article
                    key={item.idVariante}
                    className="grid gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 sm:grid-cols-[120px_1fr_auto]"
                  >
                    <div className="h-32 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 sm:h-28">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between gap-3">
                      <div>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {item.description}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Variante: {item.color} / Talla {item.size}
                        </p>

                        <p className="mt-2 text-sm font-bold text-primary">
                          {formatCurrency(Number(item.price || 0))}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.idVariante)}
                        className="w-fit text-sm font-semibold text-red-500 transition hover:text-red-600"
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="flex items-center gap-2 sm:flex-col sm:justify-center">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Cantidad
                      </p>

                      <div className="flex items-center overflow-hidden rounded-full border border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.idVariante,
                              Number(item.quantity || 1) - 1
                            )
                          }
                          className="grid h-9 w-9 place-items-center text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          -
                        </button>

                        <span className="grid h-9 min-w-10 place-items-center px-3 text-sm font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.idVariante,
                              Number(item.quantity || 1) + 1
                            )
                          }
                          className="grid h-9 w-9 place-items-center text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Resumen de compra
            </h2>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  ID dirección de envío
                </span>

                <input
                  value={idDireccionEnvio}
                  onChange={(e) => setIdDireccionEnvio(e.target.value)}
                  type="number"
                  min="1"
                  placeholder="Ej: 1"
                  className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-800"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Método de pago
                </span>

                <select
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-800"
                >
                  <option value="PSE">PSE</option>
                  <option value="TARJETA">Tarjeta</option>
                  <option value="NEQUI">Nequi</option>
                  <option value="DAVIPLATA">Daviplata</option>
                  <option value="TRANSFERENCIA">Transferencia</option>
                  <option value="EFECTIVO">Efectivo</option>
                </select>
              </label>
            </div>

            <div className="mt-5 space-y-3 border-b border-slate-200 pb-5 text-sm dark:border-slate-800">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Productos</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Envío</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-base font-bold text-slate-900 dark:text-white">
                Total
              </span>

              <span className="text-xl font-extrabold text-primary">
                {formatCurrency(total)}
              </span>
            </div>

            <button
              disabled={!cartItems.length || loadingOrder}
              onClick={handleCreateOrder}
              className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
            >
              {loadingOrder ? "Creando pedido..." : "Finalizar compra"}
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              El envío se calcula con una tarifa base de {formatCurrency(SHIPPING_COST)}.
            </p>
          </aside>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}