import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import BottomNav from "../components/BottomNav.jsx";
import Header1 from "../components/Header1.jsx";
import { getProducts } from "../services/productService.js";
import add from "../assets/icons/add.png";
import check from "../assets/icons/check.png";
import error from "../assets/icons/error.png";

const CART_STORAGE_KEY = "tprints-cart";

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

function normalizeProducts(productsFromBackend) {
  return productsFromBackend.flatMap((product) => {
    const variantes = product.variantes || [];

    return variantes
      .filter((variant) => variant.activo)
      .map((variant) => {
        const price =
          Number(product.precioBase || 0) + Number(variant.precioAdicional || 0);

        return {
          id: variant.idVariante,
          idProducto: product.idProducto,
          idVariante: variant.idVariante,
          name: product.nombre,
          description: product.descripcion,
          color: variant.color,
          size: variant.talla,
          stock: variant.stock,
          sku: variant.sku,
          price,
          image: variant.imagenUrl,
        };
      });
  });
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cartToast, setCartToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  const productCards = useMemo(() => normalizeProducts(products), [products]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data || []);
      } catch (error) {
        setError(error.message || "No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToast = ({ type = "success", title, message }) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setCartToast({
      type,
      title,
      message,
    });

    toastTimeoutRef.current = setTimeout(() => {
      setCartToast(null);
    }, 2800);
  };

  const addToCart = (product) => {
    const currentCart = getStoredCart();

    const existingProduct = currentCart.find(
      (item) => item.idVariante === product.idVariante
    );

    if (existingProduct && Number(existingProduct.quantity || 1) >= product.stock) {
      showToast({
        type: "error",
        title: "Stock no disponible",
        message: `No hay más unidades disponibles de ${product.name} ${product.color} talla ${product.size}.`,
      });

      return;
    }

    const updatedCart = existingProduct
      ? currentCart.map((item) =>
          item.idVariante === product.idVariante
            ? { ...item, quantity: Number(item.quantity || 1) + 1 }
            : item
        )
      : [
          ...currentCart,
          {
            id: product.idVariante,
            idProducto: product.idProducto,
            idVariante: product.idVariante,
            name: product.name,
            description: `${product.description || ""} Color: ${
              product.color
            } - Talla: ${product.size}`,
            color: product.color,
            size: product.size,
            quantity: 1,
            price: product.price,
            image: product.image,
            stock: product.stock,
            sku: product.sku,
          },
        ];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));

    showToast({
      type: "success",
      title: "Producto agregado",
      message: `${product.name} ${product.color} talla ${product.size} fue agregado al carrito.`,
    });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Header1 title="T-Prints" />

      <main className="flex-1 pb-24">
        <div className="px-4 pt-6 pb-2">
          <h2 className="text-2xl font-bold leading-tight text-slate-900 dark:text-slate-100">
            Productos
          </h2>
        </div>

        <div className="sticky top-[64px] z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm pb-2">
          <div className="flex border-b border-slate-200 dark:border-slate-800 px-4 gap-8">
            <NavLink
              to="/productos"
              end
              className={({ isActive }) =>
                `flex flex-col items-center justify-center pb-3 pt-4 border-b-2 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-primary"
                } transition-colors`
              }
            >
              <p className="text-sm font-bold tracking-wide">Camisas</p>
            </NavLink>

            <NavLink
              to="/disenos"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center pb-3 pt-4 border-b-2 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-primary"
                } transition-colors`
              }
            >
              <p className="text-sm font-bold tracking-wide">Estampas</p>
            </NavLink>
          </div>
        </div>

        {loading && (
          <div className="p-4 text-sm text-slate-500">
            Cargando productos...
          </div>
        )}

        {error && (
          <div className="m-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && productCards.length === 0 && (
          <div className="m-4 rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
            No hay productos disponibles.
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {productCards.map((p) => (
            <div
              key={p.idVariante}
              className="group flex flex-col gap-3 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="relative w-full aspect-square bg-slate-100 dark:bg-slate-800 bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url("${p.image}")` }}
              >
    
              </div>

              <div className="px-3 pb-4">
                <p className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-snug">
                  {p.name}
                </p>

                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-0.5">
                  {p.color} / Talla {p.size}
                </p>

                <p className="text-slate-400 dark:text-slate-500 text-xs font-medium mt-0.5">
                  Stock: {p.stock}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-primary text-sm font-bold">
                    {formatCurrency(p.price)}
                  </p>

                  <button
                    type="button"
                    onClick={() => addToCart(p)}
                    disabled={p.stock <= 0}
                    className="rounded-full text-primary transition hover:scale-110 disabled:text-slate-300 disabled:cursor-not-allowed"
                    aria-label={`Agregar ${p.name} al carrito`}
                  >
                    <img
                      src={add}
                      alt="Agregar al carrito"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {cartToast && (
        <div className="fixed bottom-24 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 animate-[fadeIn_0.2s_ease-out] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                cartToast.type === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                {cartToast.type === "success" ? 
                                    <img
                      src={check}
                      alt="Agregar al carrito"
                      className="w-6 h-6"
                    /> 
                :
                                     <img
                      src={error}
                      alt="Agregar al carrito"
                      className="w-6 h-6"
                    />}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {cartToast.title}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {cartToast.message}
              </p>
            </div>

            {cartToast.type === "success" && (
              <NavLink
                to="/carrito"
                className="shrink-0 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-white transition hover:bg-primary/90"
              >
                Ver carrito
              </NavLink>
            )}

            <button
              type="button"
              onClick={() => setCartToast(null)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Cerrar notificación"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}