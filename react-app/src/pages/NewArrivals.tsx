// src/pages/NewArrivals.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts, getCategories } from "@/api/productService";
import ProductCard from "@/components/ProductCard";
import {
  FaSearch,
  FaTimes,
  FaFire,
  FaChevronDown,
  FaStar,
  FaGift,
} from "react-icons/fa";

// ─── Skeleton ─────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-soft overflow-hidden animate-pulse">
    <div className="h-56 bg-neutral-200" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-neutral-200 rounded w-3/4" />
      <div className="h-3 bg-neutral-100 rounded w-1/2" />
      <div className="h-5 bg-neutral-200 rounded w-1/3 mt-2" />
    </div>
  </div>
);

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const ITEMS_PER_PAGE = 12;

// ─── Is new helper (within 14 days) ──────────────────────────────
const isNew = (createdAt: string) => {
  const days =
    (Date.now() - new Date(createdAt).valueOf()) / (1000 * 60 * 60 * 24);
  return days <= 14;
};

export default function NewArrivals() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // ─── Load data ───────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);
        const cats = Array.isArray(catRes.data)
          ? catRes.data
          : catRes.data?.categories || [];
        const prods = Array.isArray(prodRes.data)
          ? prodRes.data
          : prodRes.data?.products || [];

        // Sort by newest first, take latest 30
        const sorted = prods.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
        );

        setCategories(cats);
        setProducts(sorted);
      } catch (err) {
        console.error("Failed to load new arrivals", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ─── Filter + sort ───────────────────────────────────────────────
  const filtered = React.useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter((p) => {
        const catId =
          typeof p.category === "string" ? p.category : p.category?._id;
        return catId === selectedCategory;
      });
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q),
      );
    }

    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
        );
    }

    return result;
  }, [products, selectedCategory, search, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const newCount = products.filter((p) => isNew(p.createdAt)).length;

  const handleClear = () => {
    setSearch("");
    setSortBy("newest");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const hasFilters =
    selectedCategory !== "all" || search.trim() || sortBy !== "newest";

  return (
    <div className="min-h-screen bg-neutral-50 font-sans pt-20">
      {/* ─── Hero Banner ──────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-16 px-4"
        style={{
          background:
            "linear-gradient(135deg, #3b0764 0%, #6d28d9 40%, #a855f7 70%, #ec4899 100%)",
        }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Blobs */}
        <div
          className="absolute -top-12 -left-12 w-56 h-56 rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #c084fc, transparent)",
          }}
        />
        <div
          className="absolute -bottom-10 right-24 w-44 h-44 rounded-full opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #f472b6, transparent)",
          }}
        />

        {/* Floating emojis */}
        {["🎁", "✨", "🆕", "🎀"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-30 pointer-events-none"
            style={{
              top: `${15 + i * 20}%`,
              left: i < 2 ? `${5 + i * 10}%` : undefined,
              right: i >= 2 ? `${5 + (i - 2) * 10}%` : undefined,
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {emoji}
          </motion.div>
        ))}

        <div className="relative max-w-4xl mx-auto text-center text-white z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full border border-white/30 mb-5"
          >
            <FaFire className="w-3.5 h-3.5 text-orange-300" />
            Just Arrived
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
          >
            New <span className="text-pink-300">Arrivals</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg mb-3 max-w-xl mx-auto"
          >
            Fresh picks added to our gifting collection — be the first to
            explore
          </motion.p>

          {/* Stats pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex items-center justify-center gap-3 mb-8 flex-wrap"
          >
            <div className="flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 font-medium">
              <FaGift className="w-3.5 h-3.5" />
              {loading ? "..." : filtered.length} products
            </div>
            {newCount > 0 && (
              <div className="flex items-center gap-1.5 bg-green-500/30 border border-green-400/30 rounded-full px-4 py-1.5 text-sm text-green-200 font-medium">
                <FaStar className="w-3 h-3" />
                {newCount} added this week
              </div>
            )}
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-lg mx-auto"
          >
            <div className="flex bg-white/15 backdrop-blur-sm rounded-2xl border border-white/30 overflow-hidden">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search new arrivals..."
                className="flex-1 px-5 py-3.5 bg-transparent text-white placeholder-white/60 outline-none text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="px-3 text-white/70 hover:text-white"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
              <button className="px-5 py-3 bg-white/20 hover:bg-white/30 text-white transition-colors">
                <FaSearch className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Body ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Category tabs */}
        <div className="overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === "all"
                  ? "text-white shadow-sm"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300"
              }`}
              style={
                selectedCategory === "all"
                  ? { background: "linear-gradient(135deg, #7c3aed, #a855f7)" }
                  : {}
              }
            >
              🎁 All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => {
                  setSelectedCategory(cat._id);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat._id
                    ? "text-white shadow-sm"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300"
                }`}
                style={
                  selectedCategory === cat._id
                    ? {
                        background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                      }
                    : {}
                }
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <p className="text-sm text-neutral-500">
            {loading ? (
              <span className="inline-block w-32 h-4 bg-neutral-200 rounded animate-pulse" />
            ) : (
              <>
                <span className="font-bold text-neutral-900">
                  {filtered.length}
                </span>{" "}
                product{filtered.length !== 1 ? "s" : ""} found
              </>
            )}
          </p>

          <div className="flex items-center gap-3">
            {hasFilters && (
              <button
                onClick={handleClear}
                className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
              >
                <FaTimes className="w-3 h-3" /> Clear filters
              </button>
            )}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        ) : paginated.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-xl font-bold text-neutral-700 mb-2">
              No products found
            </h3>
            <p className="text-neutral-500 mb-6">
              {search
                ? `No results for "${search}". Try a different term.`
                : "Nothing here yet."}
            </p>
            <button
              onClick={handleClear}
              className="px-6 py-3 rounded-2xl text-white font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              }}
            >
              View All
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${currentPage}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {paginated.map((product) => (
                <div key={product._id} className="relative">
                  {/* NEW badge */}
                  {isNew(product.createdAt) && (
                    <div
                      className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-[10px] font-bold shadow-md"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                      }}
                    >
                      <FaStar className="w-2.5 h-2.5" />
                      NEW
                    </div>
                  )}
                  <ProductCard product={product} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-600 hover:border-primary-300 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                  page === currentPage
                    ? "text-white shadow-sm"
                    : "border border-neutral-200 bg-white text-neutral-600 hover:border-primary-300"
                }`}
                style={
                  page === currentPage
                    ? {
                        background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                      }
                    : {}
                }
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-600 hover:border-primary-300 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
