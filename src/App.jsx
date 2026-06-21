import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Trash2,
  X,
  ChevronRight,
  Leaf,
  Apple,
  Carrot,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowLeft,
  Sparkles,
  Star,
  Truck,
  ShieldCheck,
  Clock,
  Heart,
  Package,
  HelpCircle,
  MessageCircle,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import fruitsData from "./data/fruits.js";

/* ─────────────────────────────── MOCK DATA ─────────────────────────────── */

const baseProducts = [
  {
    id: 1,
    name: "Alphonso Mangoes",
    unit: "1 Dozen",
    price: 800,
    category: "fruit",
    image: "/Users/jayneel/Documents/ShivShakti/public/Mango.png",
    badge: "Seasonal",
    rating: 4.9,
    description: "Premium Ratnagiri Alphonso mangoes, hand-picked at peak ripeness. Known as the 'King of Mangoes' for their rich, creamy texture and intense sweetness with notes of honey and citrus.",
    nutrition: ["Rich in Vitamin C", "High in Fiber", "Natural Antioxidants"],
  },
  {
    id: 2,
    name: "Shimla Apples",
    unit: "1 kg",
    price: 250,
    category: "fruit",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=480&q=80&auto=format&fit=crop",
    badge: null,
    rating: 4.7,
    description: "Crisp and juicy apples from the orchards of Shimla. These mountain-grown apples are naturally sweet with a perfect crunch, ideal for snacking or baking.",
    nutrition: ["Dietary Fiber", "Vitamin B6", "Low Calorie"],
  },
  {
    id: 3,
    name: "Fresh Spinach (Palak)",
    unit: "500g",
    price: 50,
    category: "vegetable",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=480&q=80&auto=format&fit=crop",
    badge: "Organic",
    rating: 4.6,
    description: "Organically grown, tender spinach leaves harvested fresh every morning. Perfect for palak paneer, smoothies, or healthy salads. No pesticides, purely natural.",
    nutrition: ["Iron Rich", "Vitamin K", "Folate"],
  },
  {
    id: 4,
    name: "Cherry Tomatoes",
    unit: "250g",
    price: 80,
    category: "vegetable",
    image: "https://images.unsplash.com/photo-1558818498-28c1e002b655?w=480&q=80&auto=format&fit=crop",
    badge: null,
    rating: 4.5,
    description: "Vine-ripened cherry tomatoes bursting with sweet, tangy flavor. Perfect for salads, pasta sauces, or roasting. Each bite delivers a pop of freshness.",
    nutrition: ["Lycopene", "Vitamin A", "Potassium"],
  },
  {
    id: 5,
    name: "Pomegranates",
    unit: "1 kg",
    price: 300,
    category: "fruit",
    image: "/pomegranate.png",
    badge: "Premium",
    rating: 4.8,
    description: "Ruby-red pomegranates with jewel-like arils packed with sweet-tart juice. Sourced from premium farms, these are perfect for fresh juice, desserts, or healthy snacking.",
    nutrition: ["Antioxidant Rich", "Vitamin K", "Heart Healthy"],
  },
  {
    id: 6,
    name: "Organic Potatoes",
    unit: "1 kg",
    price: 40,
    category: "vegetable",
    image: "https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=480&q=80&auto=format&fit=crop",
    badge: "Organic",
    rating: 4.4,
    description: "Farm-fresh organic potatoes with a naturally earthy flavor. Versatile and essential for every Indian kitchen — from crispy aloo tikki to creamy mashed potatoes.",
    nutrition: ["Vitamin C", "Potassium", "Complex Carbs"],
  },
];

// Merge fruit catalog into the main product list (deduplicate by id)
const PRODUCTS = [
  ...baseProducts,
  ...fruitsData,
];

/* ─────────────────────────────── NAVBAR ─────────────────────────────── */

function Navbar({ view, setView, cartCount, onCartOpen, onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3 shadow-lg shadow-black/20" : "py-5 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          id="nav-logo"
          onClick={() => setView("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow">
            <Leaf className="w-5 h-5 text-surface" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">Shiv</span>
            <span className="text-brand-100">Shakti</span>
          </span>
        </button>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { key: "home", label: "Home" },
            { key: "shop", label: "Shop" },
          ].map(({ key, label }) => (
            <button
              key={key}
              id={`nav-link-${key}`}
              onClick={() => setView(key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${view === key
                ? "bg-brand-500/15 text-brand-300 shadow-inner"
                : "text-brand-100/60 hover:text-brand-100 hover:bg-white/5"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <button
            id="nav-search"
            onClick={onSearchOpen}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-brand-100/50 hover:text-brand-300 hover:bg-white/5 transition-all duration-300"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            id="nav-cart"
            onClick={onCartOpen}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-brand-100/50 hover:text-brand-300 hover:bg-white/5 transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-linear-to-r from-brand-400 to-brand-500 text-[10px] font-bold text-surface flex items-center justify-center animate-scale-in shadow-lg shadow-brand-500/40">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────── SEARCH MODAL ─────────────────────────────── */

function SearchModal({ open, onClose, products, onAddToCart }) {
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-start justify-center pt-28 px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl glass rounded-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-white/5">
          <Search className="w-5 h-5 text-brand-400 shrink-0" />
          <input
            id="search-input"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fruits & vegetables..."
            className="flex-1 bg-transparent text-brand-100 placeholder:text-brand-100/30 text-lg outline-none border-none"
            style={{ boxShadow: "none" }}
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-brand-100/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {query.length === 0 ? (
            <p className="text-center text-brand-100/30 py-8 text-sm">
              Start typing to search...
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-brand-100/30 py-8 text-sm">
              No products found
            </p>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => {
                  onAddToCart(p);
                  onClose();
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-brand-100">{p.name}</p>
                  <p className="text-xs text-brand-100/40">{p.unit}</p>
                </div>
                <p className="text-sm font-semibold text-brand-400">₹{p.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── CART DRAWER ─────────────────────────────── */

function CartDrawer({ open, onClose, cart, onUpdateQty, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * (item.weightMultiplier ?? 1) * item.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-70 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-80 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="h-full glass flex flex-col border-l border-white/5">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-brand-100">Your Cart</h2>
                <p className="text-xs text-brand-100/40">
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <button
              id="cart-close"
              onClick={onClose}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/5 text-brand-100/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-4 animate-float-slow">
                  <ShoppingCart className="w-8 h-8 text-brand-500/40" />
                </div>
                <p className="text-brand-100/40 text-sm">Your cart is empty</p>
                <p className="text-brand-100/25 text-xs mt-1">
                  Add some fresh produce!
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="glass-light rounded-2xl p-4 flex items-center gap-4 animate-fade-in"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-100 truncate">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-brand-100/40">{item.unit}</p>
                      {item.weight && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-brand-500/15 text-brand-400 font-medium">
                          {item.weight}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-brand-400 mt-1">
                      ₹{item.price * (item.weightMultiplier ?? 1) * item.qty}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-brand-100/20 hover:text-accent-rose transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1 bg-surface/50 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/5 text-brand-100/50 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm font-medium text-brand-100">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-brand-500/20 text-brand-400 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-100/50">Subtotal</span>
                <span className="text-lg font-bold text-brand-100">₹{total}</span>
              </div>
              <button
                id="cart-checkout"
                onClick={onCheckout}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-brand-500 to-brand-600 text-surface font-semibold text-sm hover:from-brand-400 hover:to-brand-500 transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 btn-shimmer"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────── HOME VIEW ─────────────────────────────── */

// Curated home page picks: seasonal · best-sellers · all-rounders
// Product IDs: 1=Alphonso Mango (Seasonal), Lichi (Seasonal), Dragon Fruit (Exotic),
//              2=Shimla Apple (best-seller), 5=Pomegranate (Premium), 3=Spinach (Organic all-rounder)
const HOME_PICK_IDS = [1, 2, 5, 3]; // base product IDs
const HOME_PICKS = (() => {
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  // Seasonal picks from fruits catalog
  const seasonal = PRODUCTS.filter((p) => p.badge === "Seasonal").slice(0, 2);
  // Exotic picks
  const exotic = PRODUCTS.filter((p) => p.badge === "Exotic").slice(0, 1);
  // Premium / best-seller hand-picks
  const handPicked = HOME_PICK_IDS.map(byId).filter(Boolean);
  // Merge, deduplicate, cap at 6
  const seen = new Set();
  const merged = [...seasonal, ...exotic, ...handPicked].filter((p) => {
    if (!p || seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
  return merged.slice(0, 6);
})();

function HomeView({ setView, onAddToCart, cart, onProductClick }) {
  const isInCart = (id) => cart.some((c) => c.id === id);
  const fruits = PRODUCTS.filter((p) => p.category === "fruit");
  const vegetables = PRODUCTS.filter((p) => p.category === "vegetable");

  /* ── Scroll-hijack zoom hero ── */
  const SCROLL_DISTANCE    = 600;
  const heroRef            = useRef(null);
  const productsSectionRef = useRef(null);
  const accumulatorRef     = useRef(0);
  const hijackActive       = useRef(true);
  const touchStartRef      = useRef(0);
  const hasScrolledThrough = useRef(false);
  const [progress, setProgress] = useState(0);

  // Wheel + touch hijack on the hero element
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (!hijackActive.current && (window.scrollY > 0 || e.deltaY > 0)) return;
      e.preventDefault();
      accumulatorRef.current = Math.min(
        Math.max(accumulatorRef.current + e.deltaY, 0),
        SCROLL_DISTANCE
      );
      const p = accumulatorRef.current / SCROLL_DISTANCE;
      setProgress(p);
      if (p >= 1 && !hasScrolledThrough.current) {
        hijackActive.current = false;
        hasScrolledThrough.current = true;
        setTimeout(() => {
          productsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
      if (p < 1 && !hijackActive.current && window.scrollY === 0) {
        hijackActive.current = true;
        hasScrolledThrough.current = false;
      }
    };

    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const delta = touchStartRef.current - e.touches[0].clientY;
      if (!hijackActive.current && (window.scrollY > 0 || delta > 0)) return;
      touchStartRef.current = e.touches[0].clientY;
      e.preventDefault();
      accumulatorRef.current = Math.min(
        Math.max(accumulatorRef.current + delta, 0),
        SCROLL_DISTANCE
      );
      const p = accumulatorRef.current / SCROLL_DISTANCE;
      setProgress(p);
      if (p >= 1 && !hasScrolledThrough.current) {
        hijackActive.current = false;
        hasScrolledThrough.current = true;
        setTimeout(() => {
          productsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
      if (p < 1 && !hijackActive.current && window.scrollY === 0) {
        hijackActive.current = true;
        hasScrolledThrough.current = false;
      }
    };

    el.addEventListener("wheel",      handleWheel,      { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true  });
    el.addEventListener("touchmove",  handleTouchMove,  { passive: false });
    return () => {
      el.removeEventListener("wheel",      handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove",  handleTouchMove);
    };
  }, []);

  // Re-engage hijack when user scrolls back to very top
  useEffect(() => {
    const handleWindowScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      if (window.scrollY < heroHeight * 0.5) {
        if (!hijackActive.current) {
          hijackActive.current = true;
          hasScrolledThrough.current = false;
          accumulatorRef.current = 0;
          setProgress(0);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  // Interpolation helpers
  const lerp   = (a, b, t) => a + (b - a) * t;
  const clamp  = (val, mn, mx) => Math.min(Math.max(val, mn), mx);
  const easeInOut = (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

  const ep = easeInOut(progress);
  const maxDim = typeof window !== "undefined"
    ? Math.max(window.innerWidth, window.innerHeight) * 1.1
    : 1200;
  const imgSize        = lerp(220, maxDim, ep);
  const imgRadius      = lerp(50, 0, ep);
  const bgR            = Math.round(lerp(18,  124, ep));
  const bgG            = Math.round(lerp(12,   58, ep));
  const bgB            = Math.round(lerp(0,     0, ep));
  const bgColor        = `rgb(${bgR},${bgG},${bgB})`;
  const headlineOpacity = clamp(1 - progress / 0.4,  0, 1);
  const scrollCueOpacity = clamp(1 - progress / 0.25, 0, 1);
  const badgeOpacity   = clamp((progress - 0.5) / 0.35, 0, 1);

  return (
    <div className="relative min-h-screen bg-surface">
      {/* ── Scroll-hijack Zoom Hero ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex items-center justify-center"
        style={{ height: "100vh", background: bgColor, transition: "none", touchAction: "none" }}
      >
        {/* Warm radial glow — behind the mango, fades as it zooms */}
        <div
          style={{
            position: "absolute",
            width:  imgSize * 0.85,
            height: imgSize * 0.85,
            borderRadius: "50%",
            left: "50%",
            top:  "50%",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 70%)",
            opacity: 1 - ep,
            transition: "none",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Fruit image — circle → fullscreen */}
        <img
          src="/public/Mango.png"
          alt="Fresh Alphonso Mangoes"
          style={{
            position: "absolute",
            width:  imgSize,
            height: imgSize,
            borderRadius: `${imgRadius}%`,
            objectFit: "cover",
            left: "50%",
            top:  "50%",
            transform: "translate(-50%,-50%)",
            filter: `drop-shadow(0 0 18px rgba(251,191,36,${(0.9 * (1 - ep)).toFixed(3)})) drop-shadow(0 0 6px rgba(255,160,0,${(0.7 * (1 - ep)).toFixed(3)}))`,
            transition: "none",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Headline — fades out in first 40% of scroll */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-48 z-10 text-center px-6"
          style={{ opacity: headlineOpacity, transition: "none" }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="text-brand-100">Taste the</span><br />
            <span className="gradient-text">Season.</span>
          </h1>
        </div>

        {/* Scroll cue — bouncing chevron, fades out earliest */}
        <div
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 z-10"
          style={{ opacity: scrollCueOpacity, transition: "none" }}
        >
          <ChevronDown className="w-5 h-5 text-brand-100/50 animate-bounce" />
          <span className="text-xs text-brand-100/30">Scroll to explore</span>
        </div>
        {/* Top gradient dissolve */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "15%",
            background: "linear-gradient(to top, transparent 0%, #120c00 100%)",
            zIndex: 20,
            pointerEvents: "none",
          }}
        />

        {/* Gradient dissolve — anchors hero bottom into products bg */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to bottom, transparent 0%, #120c00 100%)",
            zIndex: 20,
            pointerEvents: "none",
          }}
        />
      </section>

      {/* Our Picks – curated 6 products */}
      <section ref={productsSectionRef} className="pb-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-center justify-between mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <div>
              <h2 className="text-xl font-bold text-brand-100">
                Our <span className="gradient-text">Picks</span>
              </h2>
              <p className="text-[11px] text-brand-100/30 mt-0.5">Seasonal favourites · Best sellers · All-rounders</p>
            </div>
            <button onClick={() => setView("shop")} className="flex items-center gap-1 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors">
              See all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 stagger-children">
            {HOME_PICKS.map((product) => (
              <div key={product.id} className="product-card glass-light rounded-2xl overflow-hidden group">
                {/* Image */}
                <button
                  className="relative w-full h-40 overflow-hidden bg-surface/30 block cursor-pointer"
                  onClick={() => onProductClick(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-brand-500/20 backdrop-blur-md text-brand-300 text-[10px] font-medium border border-brand-500/20">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-md">
                    <Star className="w-3 h-3 text-accent-amber fill-accent-amber" />
                    <span className="text-[10px] font-medium text-brand-100/80">{product.rating}</span>
                  </div>
                </button>
                {/* Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <button className="text-left hover:opacity-80 transition-opacity" onClick={() => onProductClick(product)}>
                      <h3 className="font-semibold text-brand-100 text-sm leading-tight">{product.name}</h3>
                      <p className="text-[10px] text-brand-100/35 mt-0.5">{product.unit}</p>
                    </button>
                    <p className="text-base font-bold gradient-text whitespace-nowrap">₹{product.price}</p>
                  </div>
                  <button
                    id={`home-add-to-cart-${product.id}`}
                    onClick={() => onAddToCart(product)}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 btn-shimmer ${isInCart(product.id)
                        ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                        : "bg-linear-to-r from-brand-500 to-brand-600 text-surface shadow-md shadow-brand-500/20 hover:shadow-brand-500/35"
                      }`}
                  >
                    {isInCart(product.id) ? "✓ Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Quick-Picks */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-xl font-bold text-brand-100 mb-6 animate-fade-in-up">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 stagger-children">
            {/* Fruits */}
            <button
              id="category-fruits"
              onClick={() => setView("shop")}
              className="group glass-light rounded-2xl p-5 text-left hover:bg-brand-500/10 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center">
                    <Apple className="w-5 h-5 text-accent-amber" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-brand-100">Fresh Fruits</h3>
                    <p className="text-[10px] text-brand-100/35">{fruits.length} items available</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-100/20 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="flex gap-2">
                {fruits.slice(0, 3).map((p) => (
                  <div key={p.id} className="w-16 h-16 rounded-xl overflow-hidden bg-surface/30 shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </button>
            {/* Vegetables */}
            <button
              id="category-vegetables"
              onClick={() => setView("shop")}
              className="group glass-light rounded-2xl p-5 text-left hover:bg-brand-500/10 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-brand-400/20 to-brand-600/20 flex items-center justify-center">
                    <Carrot className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-brand-100">Daily Vegetables</h3>
                    <p className="text-[10px] text-brand-100/35">{vegetables.length} items available</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-100/20 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="flex gap-2">
                {vegetables.slice(0, 3).map((p) => (
                  <div key={p.id} className="w-16 h-16 rounded-xl overflow-hidden bg-surface/30 shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="glass-light rounded-2xl p-6 flex flex-wrap items-center justify-center gap-8 md:gap-16 animate-fade-in-up">
            {[
              { icon: Truck, text: "Free Delivery", sub: "Orders above ₹500" },
              { icon: ShieldCheck, text: "100% Fresh", sub: "Quality guaranteed" },
              { icon: Clock, text: "Same Day", sub: "Delivered by 6 PM" },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-brand-100">{text}</p>
                  <p className="text-[10px] text-brand-100/30">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="glass-light rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-brand-500/15 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-brand-400" />
              </div>
              <h2 className="text-xl font-bold text-brand-100">
                Our <span className="gradient-text">Story</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-3 text-brand-100/55 text-sm leading-relaxed">
                <p>
                  <span className="text-brand-300 font-semibold">ShivShakti</span> was founded in 2018 by the Mehta family with a single handcart and a promise — to bring the freshest, most honest produce from farm to doorstep, without middlemen and without compromise.
                </p>
                <p>
                  We began in the lanes of Pune, supplying to just 12 households. Today we serve over{" "}
                  <span className="text-brand-300 font-medium">3,000 families</span> across the city, partnering directly with 40+ farmers in Maharashtra and Gujarat.
                </p>
                <p>
                  Every fruit and vegetable is hand-selected, quality-checked, and delivered within hours of harvest. We believe fresh food is not a luxury — it&apos;s a right.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "2018", label: "Founded" },
                  { value: "3,000+", label: "Happy Families" },
                  { value: "40+", label: "Farm Partners" },
                  { value: "28+", label: "Products" },
                ].map(({ value, label }) => (
                  <div key={label} className="rounded-2xl bg-brand-500/8 border border-brand-500/10 p-4 text-center">
                    <p className="text-xl font-extrabold gradient-text">{value}</p>
                    <p className="text-[11px] text-brand-100/40 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Customer Reviews ── (infinite marquee) */}
      {(() => {
        const ALL_REVIEWS = [
          { id: 1, name: "Priya Sharma",  avatar: "PS", rating: 5, text: "ShivShakti has completely changed how I shop for produce. The Alphonso mangoes were the sweetest I’ve ever had — absolutely premium quality!", since: "Customer since 2023" },
          { id: 2, name: "Rohan Mehta",   avatar: "RM", rating: 5, text: "Same-day delivery is a game changer. I ordered spinach at 9 AM and it was at my door by 5 PM, perfectly fresh. Highly recommend!", since: "Customer since 2022" },
          { id: 3, name: "Anita Patel",   avatar: "AP", rating: 5, text: "The dragon fruit and berries are genuinely exotic and fresh. You can tell these are sourced with care. My kids love the weekly fruit box!", since: "Customer since 2024" },
          { id: 4, name: "Karan Desai",   avatar: "KD", rating: 5, text: "Watermelon season just hit different with ShivShakti. Crisp, super sweet, and delivery was contactless and on time every single time.", since: "Customer since 2023" },
          { id: 5, name: "Sneha Joshi",   avatar: "SJ", rating: 4, text: "Great variety of fruits and I love the seasonal picks. The lychees were absolutely divine — already looking forward to next season!", since: "Customer since 2024" },
          { id: 6, name: "Devang Shah",   avatar: "DS", rating: 5, text: "The Alphonso mangoes are honestly the best I’ve tasted outside a Gir farm. Arrived perfectly ripe, zero bruising. Will order every season!", since: "Customer since 2022" },
          { id: 7, name: "Meera Trivedi", avatar: "MT", rating: 5, text: "Ordered at noon and delivery reached Satellite by 5:30 PM — still cold, still crisp. Same-day promise is real here, highly impressed!", since: "Customer since 2023" },
          { id: 8, name: "Hardik Patel",  avatar: "HP", rating: 4, text: "The pomegranates had deep ruby arils with perfect sweetness. I juice them every morning now. Quality is consistently excellent every time.", since: "Customer since 2024" },
        ];
        const row2 = [...ALL_REVIEWS].reverse().slice(0, 5);

        const ReviewCard = ({ r }) => (
          <div className="w-80 shrink-0 glass-light rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "text-accent-amber fill-accent-amber" : "text-brand-100/15"}`} />
              ))}
            </div>
            <p className="text-sm text-brand-100/65 leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-brand-400/30 to-brand-600/30 flex items-center justify-center text-xs font-bold text-brand-300 shrink-0">
                {r.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-100">{r.name}</p>
                <p className="text-[10px] text-brand-100/30">{r.since}</p>
              </div>
            </div>
          </div>
        );

        return (
          <section className="pb-16 overflow-hidden">
            <div className="max-w-6xl mx-auto px-8 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-brand-100">
                  What our <span className="gradient-text">Customers Say</span>
                </h2>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent-amber fill-accent-amber" />
                  <span className="text-sm font-bold text-brand-100">4.9</span>
                  <span className="text-xs text-brand-100/30 ml-1">· 2,400+ reviews</span>
                </div>
              </div>
            </div>
            <div className="marquee-container space-y-4">
              {/* Row 1 — scrolls LEFT */}
              <div className="marquee-track marquee-left gap-4 px-4">
                {[...ALL_REVIEWS, ...ALL_REVIEWS].map((r, i) => <ReviewCard key={i} r={r} />)}
              </div>
              {/* Row 2 — scrolls RIGHT */}
              <div className="marquee-track marquee-right gap-4 px-4">
                {[...row2, ...row2].map((r, i) => <ReviewCard key={i} r={r} />)}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 pt-10 pb-8">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-surface" />
                </div>
                <span className="text-base font-bold">
                  <span className="gradient-text">Shiv</span>
                  <span className="text-brand-100">Shakti</span>
                </span>
              </div>
              <p className="text-xs text-brand-100/35 leading-relaxed">
                Farm-fresh fruits &amp; vegetables delivered to your doorstep. Honest sourcing, zero compromise.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <p className="text-xs font-semibold text-brand-100/50 uppercase tracking-wider mb-3">Quick Links</p>
              <ul className="space-y-2">
                {[{ label: "Home", view: "home" }, { label: "Shop", view: "shop" }, { label: "Checkout", view: "checkout" }].map(({ label, view }) => (
                  <li key={label}>
                    <button onClick={() => setView(view)} className="text-sm text-brand-100/40 hover:text-brand-300 transition-colors">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Connect */}
            <div>
              <p className="text-xs font-semibold text-brand-100/50 uppercase tracking-wider mb-1">Connect With Us</p>
              {[
                // {
                //   href: "https://wa.me/",
                //   label: "WhatsApp Us",
                //   sublabel: "+91 ",
                //   iconBg: "rgba(37,211,102,0.1)",
                //   iconBorder: "1px solid rgba(37,211,102,0.2)",
                //   iconColor: "#25D366",
                //   icon: (
                //     <MessageCircle className="w-4 h-4" style={{ color: "#25D366" }} />
                //   ),
                // },
                {
                  href: "https://www.instagram.com/shivshaktifruits.ahmedabad/",
                  label: "Follow on Instagram",
                  sublabel: "@shivshaktifruits.ahmedabad",
                  iconBg: "rgba(225,48,108,0.1)",
                  iconBorder: "1px solid rgba(225,48,108,0.2)",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  ),
                },
                {
                  href: "tel:+919879797824",
                  label: "Call Us",
                  sublabel: "+91 98797 97824",
                  iconBg: "rgba(217,119,6,0.1)",
                  iconBorder: "1px solid rgba(217,119,6,0.2)",
                  icon: (
                    <Phone className="w-4 h-4" style={{ color: "#d97706" }} />
                  ),
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 border-b border-white/5 group hover:bg-brand-500/5 transition-colors -mx-2 px-2 rounded-lg last:border-0"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: link.iconBg, border: link.iconBorder }}
                  >
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-brand-100 group-hover:text-brand-300 transition-colors">{link.label}</p>
                    <p className="text-[10px] text-brand-100/30">{link.sublabel}</p>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brand-100/20 group-hover:text-brand-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-brand-100/25">© 2026 ShivShakti. All rights reserved.</p>
            <p className="text-xs text-brand-100/20">Freshness delivered with love 🌿</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────────── SHOP VIEW ─────────────────────────────── */

function ShopView({ onAddToCart, cart, onProductClick }) {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? PRODUCTS
      : ["fruit", "vegetable"].includes(filter)
        ? PRODUCTS.filter((p) => p.category === filter)
        : PRODUCTS.filter((p) => p.badge && p.badge.toLowerCase() === filter.toLowerCase());

  const isInCart = (id) => cart.some((c) => c.id === id);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-surface">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-100 mb-3">
            The <span className="gradient-text">Harvest</span>
          </h1>
          <p className="text-brand-100/40 max-w-md mx-auto text-sm">
            Browse our curated selection of premium fruits and fresh vegetables
          </p>
        </div>

        {/* Filter bar */}
        <div
          className="flex items-center justify-center flex-wrap gap-2 mb-10 animate-fade-in-up px-2"
          style={{ animationDelay: "0.15s" }}
        >
          {[
            { key: "all", label: "All", icon: Sparkles },
            { key: "fruit", label: "Fruits", icon: Apple },
            { key: "vegetable", label: "Vegetables", icon: Carrot },
            { key: "Seasonal", label: "Seasonal", icon: Clock },
            { key: "Premium", label: "Premium", icon: Star },
            { key: "Exotic", label: "Exotic", icon: Sparkles },
            { key: "Organic", label: "Organic", icon: Leaf },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              id={`filter-${key}`}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${filter === key
                ? "bg-brand-500/15 text-brand-300 shadow-inner border border-brand-500/20"
                : "text-brand-100/40 hover:text-brand-100/60 hover:bg-white/5 border border-transparent"
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 stagger-children">
          {filtered.map((product, index) => (
            <div
              key={product.id}
              className="product-card glass-light rounded-3xl overflow-hidden group"
            >
              {/* Image — clickable to detail */}
              <button
                className="relative w-full h-32 sm:h-44 overflow-hidden bg-surface/30 block cursor-pointer"
                onClick={() => onProductClick(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {product.badge && (
                  <span className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-brand-500/20 backdrop-blur-md text-brand-300 text-[10px] sm:text-xs font-medium border border-brand-500/20">
                    {product.badge}
                  </span>
                )}
                {/* Rating */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/30 backdrop-blur-md">
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber fill-accent-amber" />
                  <span className="text-[10px] sm:text-xs font-medium text-brand-100/80">
                    {product.rating}
                  </span>
                </div>
              </button>
              {/* Details */}
              <div className="p-3 sm:p-5">
                <div className="flex items-start justify-between gap-1 sm:gap-3 mb-2 sm:mb-3">
                  <button
                    className="text-left hover:opacity-80 transition-opacity min-w-0"
                    onClick={() => onProductClick(product)}
                  >
                    <h3 className="font-semibold text-brand-100 text-xs sm:text-base truncate">
                      {product.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-brand-100/35 mt-0.5">
                      {product.unit}
                    </p>
                  </button>
                  <p className="text-sm sm:text-lg font-bold gradient-text whitespace-nowrap">
                    ₹{product.price}
                  </p>
                </div>
                <button
                  id={`add-to-cart-${product.id}`}
                  onClick={() => onAddToCart(product)}
                  className={`w-full py-2 sm:py-3 rounded-xl text-[11px] sm:text-sm font-semibold transition-all duration-300 btn-shimmer ${isInCart(product.id)
                    ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                    : "bg-linear-to-r from-brand-500 to-brand-600 text-surface shadow-lg shadow-brand-500/20 hover:shadow-brand-500/35"
                    }`}
                >
                  {isInCart(product.id) ? "✓ Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── PRODUCT DETAIL VIEW ─────────────────────────────── */

const WEIGHT_OPTIONS = [
  { label: "250 g", value: "250g", multiplier: 0.25 },
  { label: "500 g", value: "500g", multiplier: 0.5 },
  { label: "1 kg", value: "1kg", multiplier: 1 },
];

function ProductDetailView({ product, cart, onAddToCart, onUpdateQty, updateCartItem, setView, onProductClick }) {
  const cartItem = cart.find((c) => c.id === product.id);

  // Initialise weight from existing cart item or default to 1kg
  const initialWeight = WEIGHT_OPTIONS.find((w) => w.value === cartItem?.weight) ?? WEIGHT_OPTIONS[2];
  const [selectedWeight, setSelectedWeight] = useState(initialWeight);
  const [qty, setQty] = useState(cartItem ? cartItem.qty : 1);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  // Effective price based on weight × qty
  const effectivePrice = Math.round(product.price * selectedWeight.multiplier * qty);

  const handleAddOrUpdate = () => {
    if (cartItem) {
      // Update qty AND weight together
      updateCartItem(product.id, qty, selectedWeight.value, selectedWeight.multiplier);
    } else {
      onAddToCart(product, { weight: selectedWeight.value, weightMultiplier: selectedWeight.multiplier });
      // If qty > 1 top up — simplest approach: update after first add
      if (qty > 1) {
        updateCartItem(product.id, qty, selectedWeight.value, selectedWeight.multiplier);
      }
    }
  };

  // Sync if cart changes externally
  useEffect(() => {
    if (cartItem) {
      setQty(cartItem.qty);
      const w = WEIGHT_OPTIONS.find((w) => w.value === cartItem.weight);
      if (w) setSelectedWeight(w);
    }
  }, [cartItem]);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-surface">
      <div className="max-w-6xl mx-auto px-8">
        {/* Back */}
        <button
          id="product-back"
          onClick={() => setView("shop")}
          className="flex items-center gap-2 text-sm text-brand-100/40 hover:text-brand-300 transition-colors mb-8 animate-fade-in-up"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </button>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {/* Left — Image */}
          <div className="relative rounded-3xl overflow-hidden bg-surface/30 aspect-square max-h-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover product-detail-image animate-float-slow"
            />
            {product.badge && (
              <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-brand-500/20 backdrop-blur-md text-brand-300 text-sm font-medium border border-brand-500/20">
                {product.badge}
              </span>
            )}
            {/* Rating badge */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md">
              <Star className="w-4 h-4 text-accent-amber fill-accent-amber" />
              <span className="text-sm font-semibold text-brand-100">{product.rating}</span>
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Category tag */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full glass-light text-xs font-medium text-brand-300">
              {product.category === "fruit" ? (
                <Apple className="w-3 h-3" />
              ) : (
                <Carrot className="w-3 h-3" />
              )}
              {product.category === "fruit" ? "Fruit" : "Vegetable"}
            </div>

            {/* Name & Price */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-100 mb-2">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold gradient-text">₹{product.price}</span>
                <span className="text-sm text-brand-100/35">per {product.unit}</span>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating)
                      ? "text-accent-amber fill-accent-amber"
                      : "text-brand-100/15"
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-brand-100/40">({product.rating})</span>
            </div>

            {/* Description */}
            <p className="text-brand-100/50 leading-relaxed">{product.description}</p>

            {/* Nutrition Tags */}
            <div>
              <p className="text-xs font-medium text-brand-100/40 mb-3 uppercase tracking-wider">Nutrition Highlights</p>
              <div className="flex flex-wrap gap-2">
                {product.nutrition.map((tag) => (
                  <span key={tag} className="nutrition-tag px-3 py-1.5 rounded-full text-xs font-medium text-brand-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Varieties (shown only when product has varieties) */}
            {product.varieties && product.varieties.length > 0 && (
              <div>
                <p className="text-xs font-medium text-brand-100/40 mb-3 uppercase tracking-wider">Available Varieties</p>
                <div className="flex flex-wrap gap-2">
                  {product.varieties.map((v) => (
                    <span key={v} className="px-3 py-1.5 rounded-full bg-brand-500/8 border border-brand-500/20 text-brand-200 text-xs font-medium">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Weight Selector ── */}
            <div>
              <p className="text-xs font-medium text-brand-100/40 mb-3 uppercase tracking-wider">
                Select Weight
              </p>
              <div className="flex gap-2">
                {WEIGHT_OPTIONS.map((option) => {
                  const isActive = selectedWeight.value === option.value;
                  return (
                    <button
                      key={option.value}
                      id={`weight-${option.value}`}
                      onClick={() => setSelectedWeight(option)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${isActive
                          ? "bg-brand-500/20 border-brand-500/40 text-brand-300 shadow-inner"
                          : "bg-surface/40 border-white/8 text-brand-100/40 hover:border-brand-500/20 hover:text-brand-100/70"
                        }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Quantity Selector ── */}
            <div className="flex items-center gap-6">
              <p className="text-sm font-medium text-brand-100/40">Quantity</p>
              <div className="flex items-center gap-1 glass-light rounded-xl p-1">
                <button
                  id="product-qty-minus"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/5 text-brand-100/50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-lg font-bold text-brand-100">{qty}</span>
                <button
                  id="product-qty-plus"
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-brand-500/20 text-brand-400 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-brand-100/30">
                Total: <span className="font-semibold text-brand-100">₹{effectivePrice}</span>
              </p>
            </div>

            {/* ── Add to Cart / Update ── */}
            <div className="flex gap-3">
              <button
                id="product-add-to-cart"
                onClick={handleAddOrUpdate}
                className="flex-1 py-4 rounded-2xl bg-linear-to-r from-brand-500 to-brand-600 text-surface font-semibold text-sm hover:from-brand-400 hover:to-brand-500 transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 btn-shimmer flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                {cartItem ? `Update Cart · ₹${effectivePrice}` : `Add to Cart · ₹${effectivePrice}`}
              </button>
            </div>

            {/* Delivery info */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-brand-100/35">
                <Truck className="w-4 h-4 text-brand-500/60" />
                Free delivery above ₹500
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-100/35">
                <Package className="w-4 h-4 text-brand-500/60" />
                Freshness guaranteed
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-xl font-bold text-brand-100 mb-6">
              You may also <span className="gradient-text">like</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {relatedProducts.map((rp) => (
                <button
                  key={rp.id}
                  onClick={() => onProductClick(rp)}
                  className="glass-light rounded-2xl overflow-hidden text-left group hover:bg-brand-500/5 transition-all duration-300"
                >
                  <div className="relative h-36 overflow-hidden bg-surface/30">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {rp.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-brand-500/20 backdrop-blur-md text-brand-300 text-[10px] font-medium border border-brand-500/20">
                        {rp.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-brand-100 text-sm">{rp.name}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[10px] text-brand-100/35">{rp.unit}</p>
                      <p className="text-sm font-bold gradient-text">₹{rp.price}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────── CHECKOUT VIEW ─────────────────────────────── */

/* ── Ahmedabad delivery zone data ── */
const AHMEDABAD_AREAS = {
  "West Ahmedabad": [
    "Navrangpura", "Paldi", "Ellisbridge", "C.G. Road", "Vastrapur", "Satellite",
    "Bodakdev", "Thaltej", "Sola", "SG Highway", "Prahlad Nagar", "Jodhpur",
    "Ambawadi", "Gurukul", "Drive-In Road", "Memnagar", "Judges Bungalow",
    "Shilaj", "Gota", "Science City", "Anand Nagar", "Sindhu Bhavan Road",
  ],
  "East Ahmedabad": [
    "Maninagar", "Isanpur", "Kankaria", "Bapunagar", "Gomtipur", "Rakhial",
    "Odhav", "Vastral", "Nikol", "Naroda", "CTM", "Ramol", "Saraspur",
    "Shahpur", "Kalupur", "Jamalpur", "Dariapur", "Khokhra", "Amraiwadi",
  ],
  "North Ahmedabad": [
    "Sabarmati", "Chandkheda", "Motera", "Ranip", "Shahibaug", "Usmanpura",
    "Naranpura", "Vadaj", "Tragad", "New Ranip", "Nava Vadaj", "Kali",
    "Bhat", "Sughad", "Zundal",
  ],
  "South Ahmedabad": [
    "Sarkhej", "Juhapura", "Vejalpur", "Jodhpur Tekra", "Narol", "Vatva",
    "Danilimda", "Lambha", "Hathijan", "Vinzol", "Dani Limda",
  ],
  "Old City": [
    "Lal Darwaja", "Manek Chowk", "Relief Road", "Bhadra", "Dhalgarwad",
    "Fernandez Bridge", "Astodia", "Raipur", "Khadia", "Gheekanta",
    "Panchkuva", "Maskati Market", "Teen Darwaja", "Revdi Bazaar",
  ],
  "SG Highway Corridor": [
    "Bopal", "Ghuma", "South Bopal", "Shela", "Sanand", "Tragad",
    "Chandlodia", "SP Ring Road", "Vaishnodevi Circle", "Ognaj", "Shilaj", "Chharodi",
  ],
};
const AHMEDABAD_CITIES = Object.keys(AHMEDABAD_AREAS);

// Flat area → city reverse-lookup (auto-built from AHMEDABAD_AREAS)
const AREA_TO_CITY_MAP = Object.fromEntries(
  Object.entries(AHMEDABAD_AREAS).flatMap(([city, areas]) =>
    areas.map((area) => [area, city])
  )
);

// All areas sorted per city for grouped display
const ALL_AREAS_GROUPED = AHMEDABAD_CITIES.map((city) => ({
  city,
  areas: AHMEDABAD_AREAS[city],
}));

/* ── Searchable Area Dropdown – portal + fixed position to escape overflow:hidden ── */
function AreaSearchDropdown({ value, onChange }) {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState("");
  const [pos, setPos]         = useState({ top: 0, left: 0, width: 0 });
  const triggerRef            = useRef(null);
  const panelRef              = useRef(null);

  // Calculate fixed position from trigger's bounding rect
  const openDropdown = () => {
    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left, width: r.width });
    }
    setOpen(true);
    setQuery("");
  };

  const closeDropdown = () => {
    setOpen(false);
    setQuery("");
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      const clickedTrigger = triggerRef.current?.contains(e.target);
      const clickedPanel   = panelRef.current?.contains(e.target);
      if (!clickedTrigger && !clickedPanel) closeDropdown();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") closeDropdown(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Reposition if window scrolls / resizes while open
  useEffect(() => {
    if (!open) return;
    const reposition = () => {
      if (triggerRef.current) {
        const r = triggerRef.current.getBoundingClientRect();
        setPos({ top: r.bottom + 4, left: r.left, width: r.width });
      }
    };
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [open]);

  // Filter groups by query
  const filteredGroups = ALL_AREAS_GROUPED.map(({ city, areas }) => ({
    city,
    areas: query
      ? areas.filter((a) => a.toLowerCase().includes(query.toLowerCase()))
      : areas,
  })).filter(({ areas }) => areas.length > 0);

  const totalMatches = filteredGroups.reduce((n, g) => n + g.areas.length, 0);

  const handleSelect = (area) => {
    onChange(area);
    closeDropdown();
  };

  // Portal panel rendered into document.body
  const panel = open && createPortal(
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        zIndex: 9999,
        borderRadius: "1rem",
        background: "rgba(15, 26, 18, 0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(134, 239, 172, 0.12)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        overflow: "hidden",
      }}
    >
      {/* Search bar — pinned, not scrollable */}
      <div style={{ padding: "8px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-500/50" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search area…"
            className="w-full pl-8 pr-3 py-2 text-sm bg-surface/60 rounded-lg border border-white/5 text-brand-100 placeholder:text-brand-100/30 outline-none focus:border-brand-500/40"
          />
        </div>
      </div>

      {/* Scrollable area list */}
      <ul style={{ maxHeight: "240px", overflowY: "auto" }}>
        {totalMatches === 0 ? (
          <li className="px-4 py-3 text-sm text-brand-100/30 text-center">No areas found</li>
        ) : (
          filteredGroups.map(({ city, areas }) => (
            <li key={city}>
              <div className="px-4 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-brand-500/60">
                {city}
              </div>
              <ul>
                {areas.map((area) => (
                  <li key={area}>
                    <button
                      type="button"
                      onClick={() => handleSelect(area)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        area === value
                          ? "bg-brand-500/20 text-brand-300 font-medium"
                          : "text-brand-100/70 hover:bg-brand-500/10 hover:text-brand-100"
                      }`}
                    >
                      {area}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>,
    document.body
  );

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        ref={triggerRef}
        id="checkout-area"
        type="button"
        onClick={() => open ? closeDropdown() : openDropdown()}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-surface/50 border text-sm transition-all outline-none ${
          open ? "border-brand-500/50" : "border-white/5"
        } ${
          value ? "text-brand-100" : "text-brand-100/40"
        }`}
      >
        <span className="truncate">{value || "Select Area"}</span>
        <ChevronRight
          className={`w-4 h-4 text-brand-500/50 shrink-0 transition-transform duration-200 ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        />
      </button>

      {panel}
    </div>
  );
}

function CheckoutView({ cart, onUpdateQty, onRemove, setView, onPlaceOrder }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    area: "",
    pinCode: "",
    phone: "",
    saveInfo: false,
    payment: "upi",
  });

  // Areas available for the selected city is no longer needed.
  // Area is primary; city is derived automatically.
  const handleAreaChange = (selectedArea) => {
    setForm((prev) => ({
      ...prev,
      area: selectedArea,
      city: AREA_TO_CITY_MAP[selectedArea] || "",
    }));
  };

  const total = cart.reduce((sum, item) => sum + item.price * (item.weightMultiplier ?? 1) * item.qty, 0);
  const deliveryFee = total > 500 ? 0 : 30;
  const grandTotal = total + deliveryFee;

  const canSubmit =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.address.trim() &&
    form.area.trim() &&
    form.pinCode.trim() &&
    form.phone.trim() &&
    cart.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) onPlaceOrder(form, grandTotal);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-surface">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4 animate-float-slow">
            <ShoppingCart className="w-8 h-8 text-brand-500/40" />
          </div>
          <p className="text-brand-100/40 mb-4">Your cart is empty</p>
          <button
            onClick={() => setView("shop")}
            className="px-6 py-3 rounded-xl bg-brand-500/15 text-brand-300 text-sm font-medium hover:bg-brand-500/25 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-surface">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back + Header */}
        <div className="mb-10 animate-fade-in-up">
          <button
            id="checkout-back"
            onClick={() => setView("shop")}
            className="flex items-center gap-2 text-sm text-brand-100/40 hover:text-brand-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-100">
            Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left – Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Delivery Details */}
              <div
                className="glass-light rounded-3xl p-6 space-y-5 animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                <h2 className="text-lg font-semibold text-brand-100 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-400" />
                  Delivery Details
                </h2>
                <div className="space-y-4">
                  {/* First & Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="First name"
                      className="w-full px-4 py-3.5 rounded-xl bg-surface/50 border border-white/5 text-brand-100 text-sm placeholder:text-brand-100/40 transition-all focus:border-brand-500/50 outline-none"
                    />
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="Last name"
                      className="w-full px-4 py-3.5 rounded-xl bg-surface/50 border border-white/5 text-brand-100 text-sm placeholder:text-brand-100/40 transition-all focus:border-brand-500/50 outline-none"
                    />
                  </div>

                  {/* Address */}
                  <div className="relative">
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="Address"
                      className="w-full pl-4 pr-11 py-3.5 rounded-xl bg-surface/50 border border-white/5 text-brand-100 text-sm placeholder:text-brand-100/40 transition-all focus:border-brand-500/50 outline-none"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-100/40" />
                  </div>

                  {/* Apartment */}
                  <input
                    type="text"
                    value={form.apartment}
                    onChange={(e) => setForm({ ...form, apartment: e.target.value })}
                    placeholder="Apartment, suite, etc."
                    className="w-full px-4 py-3.5 rounded-xl bg-surface/50 border border-white/5 text-brand-100 text-sm placeholder:text-brand-100/40 transition-all focus:border-brand-500/50 outline-none"
                  />

                  {/* Area · City (auto) · PIN */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Area — searchable, all areas grouped by city */}
                    <AreaSearchDropdown
                      value={form.area}
                      onChange={handleAreaChange}
                    />
                    {/* City — auto-filled from area, read-only */}
                    <input
                      id="checkout-city"
                      type="text"
                      value={form.city}
                      readOnly
                      placeholder="City (auto-filled)"
                      className="w-full px-4 py-3.5 rounded-xl bg-surface/30 border border-white/5 text-sm text-brand-100/50 placeholder:text-brand-100/20 outline-none cursor-default select-none"
                    />
                    {/* PIN code */}
                    <input
                      type="text"
                      id="checkout-pin"
                      value={form.pinCode}
                      onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
                      placeholder="PIN code"
                      maxLength={6}
                      className="w-full px-4 py-3.5 rounded-xl bg-surface/50 border border-white/5 text-brand-100 text-sm placeholder:text-brand-100/40 transition-all focus:border-brand-500/50 outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Phone"
                      className="w-full pl-4 pr-11 py-3.5 rounded-xl bg-surface/50 border border-white/5 text-brand-100 text-sm placeholder:text-brand-100/40 transition-all focus:border-brand-500/50 outline-none"
                    />
                    <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-100/40 cursor-help" />
                  </div>

                  {/* Save Info */}
                  <label className="flex items-center gap-2 cursor-pointer pt-2 w-max">
                    <input
                      type="checkbox"
                      checked={form.saveInfo}
                      onChange={(e) => setForm({ ...form, saveInfo: e.target.checked })}
                      className="w-4 h-4 rounded border-brand-500/30 bg-surface/50 text-brand-500 focus:ring-brand-500/50 focus:ring-offset-0"
                    />
                    <span className="text-sm text-brand-100/80">Save this information for next time</span>
                  </label>
                </div>
              </div>

              {/* Payment */}
              <div
                className="glass-light rounded-3xl p-6 space-y-5 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <h2 className="text-lg font-semibold text-brand-100 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-brand-400" />
                  Payment Method
                </h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    {
                      key: "upi",
                      label: "UPI",
                      desc: "Google Pay / PhonePe",
                      icon: Smartphone,
                    },
                    {
                      key: "card",
                      label: "Card",
                      desc: "Credit / Debit",
                      icon: CreditCard,
                    },
                    {
                      key: "cod",
                      label: "Cash on Delivery",
                      desc: "Pay at doorstep",
                      icon: Banknote,
                    },
                  ].map(({ key, label, desc, icon: Icon }) => (
                    <label
                      key={key}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${form.payment === key
                        ? "bg-brand-500/10 border-brand-500/30 shadow-inner"
                        : "bg-surface/30 border-white/5 hover:bg-white/5"
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={key}
                        checked={form.payment === key}
                        onChange={() => setForm({ ...form, payment: key })}
                        className="sr-only"
                      />
                      <Icon
                        className={`w-6 h-6 ${form.payment === key
                          ? "text-brand-400"
                          : "text-brand-100/25"
                          }`}
                      />
                      <span
                        className={`text-sm font-medium ${form.payment === key
                          ? "text-brand-100"
                          : "text-brand-100/50"
                          }`}
                      >
                        {label}
                      </span>
                      <span className="text-[10px] text-brand-100/30">{desc}</span>
                      {form.payment === key && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-brand-500 flex items-center justify-center animate-scale-in">
                          <CheckCircle2 className="w-3 h-3 text-surface" />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right – Summary */}
            <div className="lg:col-span-2">
              <div
                className="glass-light rounded-3xl p-6 sticky top-28 space-y-5 animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                <h2 className="text-lg font-semibold text-brand-100">
                  Order Summary
                </h2>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-surface/30"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-brand-100 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-brand-100/30">
                          {item.qty} × ₹{Math.round(item.price * (item.weightMultiplier ?? 1))}
                          {item.weight && <span className="ml-1 text-brand-400">({item.weight})</span>}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-brand-100">
                        ₹{Math.round(item.price * (item.weightMultiplier ?? 1) * item.qty)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-100/40">Subtotal</span>
                    <span className="text-brand-100">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-100/40">Delivery</span>
                    <span
                      className={
                        deliveryFee === 0
                          ? "text-brand-400 font-medium"
                          : "text-brand-100"
                      }
                    >
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee === 0 && (
                    <p className="text-[10px] text-brand-400/60">
                      Free delivery on orders above ₹500
                    </p>
                  )}
                  <div className="flex justify-between pt-3 border-t border-white/5">
                    <span className="font-semibold text-brand-100">Total</span>
                    <span className="text-xl font-bold gradient-text">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>

                <button
                  id="place-order-btn"
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-300 btn-shimmer ${canSubmit
                    ? "bg-linear-to-r from-brand-500 to-brand-600 text-surface shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40"
                    : "bg-white/5 text-brand-100/20 cursor-not-allowed"
                    }`}
                >
                  Place Order · ₹{grandTotal}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────── SUCCESS VIEW ─────────────────────────────── */

function SuccessView({ orderDetails, setView, onReset }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-surface">
      <div className="text-center max-w-md animate-fade-in-up">
        {/* Check circle */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-28 h-28 rounded-full bg-brand-500/10 flex items-center justify-center animate-float-slow">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-xl shadow-brand-500/30 animate-check-pop">
              <CheckCircle2 className="w-10 h-10 text-surface" />
            </div>
          </div>
          {/* Sparkle particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-brand-400 animate-pulse-soft"
              style={{
                top: `${20 + Math.sin((i * Math.PI) / 3) * 55}px`,
                left: `${56 + Math.cos((i * Math.PI) / 3) * 55}px`,
                animationDelay: `${i * 0.15}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        <h1 className="text-3xl font-bold text-brand-100 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-brand-100/40 mb-2">
          Your fresh produce is on its way 🌿
        </p>
        {orderDetails && (
          <div className="glass-light rounded-2xl p-5 mt-6 mb-8 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-brand-100/40">Delivering to</span>
              <span className="text-brand-100 font-medium text-right max-w-[200px] truncate">
                {orderDetails.firstName} {orderDetails.lastName}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-100/40">Payment</span>
              <span className="text-brand-100 font-medium uppercase">
                {orderDetails.payment}
              </span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-white/5">
              <span className="text-brand-100/40">Total Paid</span>
              <span className="text-lg font-bold gradient-text">
                ₹{orderDetails.total}
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            id="success-continue-shopping"
            onClick={() => {
              onReset();
              setView("home");
            }}
            className="px-8 py-4 rounded-2xl bg-linear-to-r from-brand-500 to-brand-600 text-surface font-semibold hover:from-brand-400 hover:to-brand-500 transition-all duration-300 shadow-lg shadow-brand-500/25 btn-shimmer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── MAIN APP ─────────────────────────────── */

export default function App() {
  const [view, setView] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = useCallback((product, options = {}) => {
    const { weight = "1kg", weightMultiplier = 1 } = options;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // If same product already in cart: bump qty, keep or update weight
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1, weight, weightMultiplier }
            : item
        );
      }
      return [...prev, { ...product, qty: 1, weight, weightMultiplier }];
    });
  }, []);

  const updateQty = useCallback((id, newQty) => {
    if (newQty < 1) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  }, []);

  // Update both qty AND weight for the product detail page
  const updateCartItem = useCallback((id, newQty, weight, weightMultiplier) => {
    if (newQty < 1) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: newQty, weight, weightMultiplier } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleCheckoutFromCart = () => {
    setCartOpen(false);
    setView("checkout");
  };

  const handlePlaceOrder = (formData, total) => {
    setOrderDetails({ ...formData, total });
    setCart([]);
    setView("success");
  };

  const resetOrder = () => {
    setCart([]);
    setOrderDetails(null);
  };

  const handleSetView = useCallback((v) => {
    setView(v);
  }, []);

  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product);
    setView("product");
  }, []);

  return (
    <div className="relative min-h-screen font-outfit">
      <Navbar
        view={view}
        setView={handleSetView}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={PRODUCTS}
        onAddToCart={addToCart}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={handleCheckoutFromCart}
      />

      <main className="relative z-10">
        {view === "home" && (
          <HomeView
            setView={handleSetView}
            onAddToCart={addToCart}
            cart={cart}
            onProductClick={handleProductClick}
          />
        )}
        {view === "shop" && (
          <ShopView
            onAddToCart={addToCart}
            cart={cart}
            onProductClick={handleProductClick}
          />
        )}
        {view === "product" && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            cart={cart}
            onAddToCart={addToCart}
            onUpdateQty={updateQty}
            updateCartItem={updateCartItem}
            setView={handleSetView}
            onProductClick={handleProductClick}
          />
        )}
        {view === "checkout" && (
          <CheckoutView
            cart={cart}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            setView={handleSetView}
            onPlaceOrder={handlePlaceOrder}
          />
        )}
        {view === "success" && (
          <SuccessView
            orderDetails={orderDetails}
            setView={handleSetView}
            onReset={resetOrder}
          />
        )}
      </main>
    </div>
  );
}
