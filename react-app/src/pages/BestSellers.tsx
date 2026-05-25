// src/pages/BestSellers.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts, getCategories } from "@/api/productService";
import ProductCard from "@/components/ProductCard";
import {
  FaFire,
  FaStar,
  FaTrophy,
  FaChevronDown,
  FaTimes,
  FaSearch,
  FaGift,
  FaWhatsapp,
} from "react-icons/fa";

// ─── Skeleton ─────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-neutral-100 animate-pulse">
    <div className="aspect-square bg-neutral-200" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-neutral-200 rounded w-3/4" />
      <div className="h-3 bg-neutral-100 rounded w-1/2" />
      <div className="h-5 bg-neutral-200 rounded w-1/3" />
    </div>
  </div>
);

const SORT_OPTIONS = [
  { value: "featured", label: "Top Picks First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

const ITEMS_PER_PAGE = 12;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BestSellers() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
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
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error("Failed to load best sellers", err);
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
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
        );
        break;
      default:
        // featured first, then by price desc
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.price - a.price;
        });
    }

    return result;
  }, [products, selectedCategory, search, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const featuredCount = products.filter((p) => p.featured).length;

  const handleClear = () => {
    setSearch("");
    setSortBy("featured");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const hasFilters =
    selectedCategory !== "all" || search.trim() || sortBy !== "featured";

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
        {["🏆", "⭐", "🎁", "🔥"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-25 pointer-events-none"
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
            <FaTrophy className="w-3.5 h-3.5 text-yellow-300" />
            Customer Favourites
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight"
          >
            Best <span className="text-pink-300">Sellers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-base md:text-lg mb-5 max-w-xl mx-auto leading-relaxed"
          >
            Our most loved and top-rated gifts — handpicked by customers like
            you.
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
            {featuredCount > 0 && (
              <div className="flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-400/30 rounded-full px-4 py-1.5 text-sm text-yellow-200 font-medium">
                <FaStar className="w-3 h-3" />
                {featuredCount} top picks
              </div>
            )}
            <div className="flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 font-medium">
              <FaFire className="w-3 h-3 text-orange-300" />
              Trending now
            </div>
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
                placeholder="Search best sellers..."
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
              🏆 All Best Sellers
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

        {/* ─── Top 3 Podium (featured products) ────────────── */}
        {!loading &&
          products.filter((p) => p.featured).length >= 1 &&
          selectedCategory === "all" &&
          !search &&
          currentPage === 1 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-5">
                <FaTrophy className="w-4 h-4 text-yellow-500" />
                <h2 className="text-lg font-serif font-bold text-neutral-900">
                  Top Picks
                </h2>
                <span className="text-xs text-neutral-400 font-medium">
                  — Our most loved products
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products
                  .filter((p) => p.featured)
                  .slice(0, 3)
                  .map((product, i) => (
                    <div key={product._id} className="relative">
                      {/* Rank badge */}
                      <div
                        className="absolute -top-3 -left-1 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                        style={{
                          background:
                            i === 0
                              ? "linear-gradient(135deg, #f59e0b, #d97706)"
                              : i === 1
                                ? "linear-gradient(135deg, #9ca3af, #6b7280)"
                                : "linear-gradient(135deg, #b45309, #92400e)",
                        }}
                      >
                        {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
                      </div>
                      <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                          boxShadow:
                            i === 0
                              ? "0 0 0 2px #f59e0b, 0 8px 24px rgba(245,158,11,0.2)"
                              : i === 1
                                ? "0 0 0 2px #9ca3af"
                                : "0 0 0 2px #b45309",
                        }}
                      >
                        <ProductCard product={product} />
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

        {/* ─── Divider ──────────────────────────────────────── */}
        {!loading &&
          products.filter((p) => p.featured).length >= 1 &&
          selectedCategory === "all" &&
          !search &&
          currentPage === 1 && (
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3">
                All Best Sellers
              </span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>
          )}

        {/* ─── Product Grid ──────────────────────────────────── */}
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
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-neutral-700 mb-2">
              No products found
            </h3>
            <p className="text-neutral-500 mb-6">
              {search
                ? `No results for "${search}". Try a different term.`
                : "Nothing in this category yet."}
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
              key={`${selectedCategory}-${currentPage}-${sortBy}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {paginated.map((product, index) => (
                <div key={product._id} className="relative">
                  {/* Best seller rank badge for first 3 on page 1 */}
                  {currentPage === 1 &&
                    index < 3 &&
                    !search &&
                    selectedCategory === "all" && (
                      <div
                        className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-[10px] font-bold"
                        style={{
                          background:
                            "linear-gradient(135deg, #7c3aed, #ec4899)",
                        }}
                      >
                        <FaFire className="w-2.5 h-2.5" />
                        Hot
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

      {/* ─── Bottom CTA ────────────────────────────────────── */}
      <section className="px-4 py-14">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto rounded-3xl p-8 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #3b0764 0%, #6d28d9 40%, #a855f7 70%, #ec4899 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-10">
            <div className="text-4xl mb-3">🏆</div>
            <h2 className="text-2xl font-serif font-bold text-white mb-2">
              Can't find what you're looking for?
            </h2>
            <p className="text-white/70 text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Our gifting experts can help you find the perfect gift. Reach out
              on WhatsApp for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/919000328100?text=Hi! I'm looking for a best seller gift recommendation."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <FaWhatsapp className="w-4 h-4" />
                Get Recommendations
              </a>
              <button
                onClick={() => navigate("/shop")}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold text-sm transition-all hover:-translate-y-0.5"
              >
                Browse All Products
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
