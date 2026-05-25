// src/pages/CategoriesPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getCategories } from "@/api/productService";
import {
  FaArrowRight,
  FaLayerGroup,
  FaGift,
  FaSearch,
  FaWhatsapp,
} from "react-icons/fa";

// ─── Emoji mapper ─────────────────────────────────────────────────
const getCategoryEmoji = (name: string): string => {
  const n = name.toLowerCase();
  if (
    n.includes("apparel") ||
    n.includes("cloth") ||
    n.includes("fashion") ||
    n.includes("shirt") ||
    n.includes("dress")
  )
    return "👕";
  if (
    n.includes("bag") ||
    n.includes("backpack") ||
    n.includes("purse") ||
    n.includes("handbag")
  )
    return "👜";
  if (
    n.includes("electron") ||
    n.includes("gadget") ||
    n.includes("tech") ||
    n.includes("device")
  )
    return "📱";
  if (
    n.includes("home") ||
    n.includes("kitchen") ||
    n.includes("decor") ||
    n.includes("furniture")
  )
    return "🏠";
  if (
    n.includes("household") ||
    n.includes("house hold") ||
    n.includes("utilit")
  )
    return "🧹";
  if (
    n.includes("jewel") ||
    n.includes("ring") ||
    n.includes("necklace") ||
    n.includes("gold")
  )
    return "💍";
  if (
    n.includes("toy") ||
    n.includes("kids") ||
    n.includes("children") ||
    n.includes("baby")
  )
    return "🧸";
  if (n.includes("book") || n.includes("stationery") || n.includes("office"))
    return "📚";
  if (
    n.includes("food") ||
    n.includes("snack") ||
    n.includes("chocolate") ||
    n.includes("sweet")
  )
    return "🍫";
  if (n.includes("flower") || n.includes("floral") || n.includes("bouquet"))
    return "💐";
  if (n.includes("sport") || n.includes("fitness") || n.includes("gym"))
    return "⚽";
  if (
    n.includes("beauty") ||
    n.includes("cosmetic") ||
    n.includes("makeup") ||
    n.includes("skincare")
  )
    return "💄";
  if (n.includes("perfume") || n.includes("fragrance")) return "🌸";
  if (n.includes("watch") || n.includes("clock")) return "⌚";
  if (n.includes("shoe") || n.includes("footwear") || n.includes("sandal"))
    return "👟";
  if (n.includes("wedding") || n.includes("bride") || n.includes("marriage"))
    return "💒";
  if (n.includes("birthday") || n.includes("cake") || n.includes("party"))
    return "🎂";
  if (
    n.includes("diwali") ||
    n.includes("festival") ||
    n.includes("lamp") ||
    n.includes("diya")
  )
    return "🪔";
  if (n.includes("travel") || n.includes("luggage") || n.includes("suitcase"))
    return "🧳";
  if (
    n.includes("pet") ||
    n.includes("animal") ||
    n.includes("dog") ||
    n.includes("cat")
  )
    return "🐾";
  return "🎁";
};

// ─── Gradient cycle ───────────────────────────────────────────────
const GRADIENTS = [
  "linear-gradient(135deg, #7c3aed, #a855f7)",
  "linear-gradient(135deg, #ec4899, #f472b6)",
  "linear-gradient(135deg, #eab308, #facc15)",
  "linear-gradient(135deg, #6d28d9, #ec4899)",
  "linear-gradient(135deg, #0891b2, #22d3ee)",
  "linear-gradient(135deg, #16a34a, #4ade80)",
  "linear-gradient(135deg, #ea580c, #fb923c)",
  "linear-gradient(135deg, #be185d, #ec4899)",
];

// ─── Skeleton ─────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="rounded-3xl overflow-hidden animate-pulse">
    <div className="h-56 bg-neutral-200" />
    <div className="p-4 bg-white">
      <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-neutral-100 rounded w-1/2" />
    </div>
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCategories();
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.categories || [];
        setCategories(data);
      } catch {
        console.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      {/* ─── Hero Banner ──────────────────────────────────────── */}
      <header
        className="relative overflow-hidden pt-24 pb-16 px-6 text-center text-white"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center mx-auto mb-5">
            <FaLayerGroup className="w-6 h-6 text-white" />
          </div>
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">
            Browse Collections
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Shop by <span className="text-pink-300">Category</span>
          </h1>
          <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Explore our curated collections designed for every taste, occasion,
            and budget.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40 text-sm font-medium transition-all"
            />
          </div>
        </motion.div>
      </header>

      {/* ─── Stats bar ────────────────────────────────────────── */}
      <div className="bg-white border-b border-neutral-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-neutral-500 font-medium">
            Showing{" "}
            <span className="font-bold text-primary-700">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "category" : "categories"}
            {search && ` for "${search}"`}
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors"
          >
            <FaGift className="w-3.5 h-3.5" />
            Browse all products
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ─── Category Grid ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg font-semibold text-neutral-700 mb-2">
              No categories found
            </p>
            <p className="text-neutral-400 text-sm mb-6">
              Try a different search term
            </p>
            <button
              onClick={() => setSearch("")}
              className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              }}
            >
              Clear search
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filtered.map((category, index) => (
              <motion.div key={category._id} variants={itemVariants}>
                <Link
                  to={`/shop?category=${category._id}&name=${encodeURIComponent(category.name)}`}
                  className="group block"
                >
                  {/* Card */}
                  <div className="relative h-56 rounded-3xl overflow-hidden shadow-soft hover:shadow-luxury transition-all duration-300 hover:-translate-y-2">
                    {/* Gradient bg */}
                    <div
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: GRADIENTS[index % GRADIENTS.length],
                      }}
                    />
                    {/* Decorative circles */}
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
                    {/* Dot pattern */}
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                      <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300 drop-shadow">
                        {getCategoryEmoji(category.name)}
                      </div>
                      <h3 className="text-lg font-bold font-serif mb-1 leading-tight">
                        {category.name}
                      </h3>
                      <p className="text-xs text-white/75 mb-4 line-clamp-2">
                        {category.description || "Explore our collection"}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-bold bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/30 group-hover:bg-white/30 transition-colors">
                        Explore
                        <FaArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div
                    className="mt-3 px-4 py-3 rounded-2xl border group-hover:border-primary-200 group-hover:bg-primary-50 transition-all"
                    style={{ borderColor: "#f3e8ff", background: "#faf5ff" }}
                  >
                    <p className="text-sm font-semibold text-neutral-800 truncate group-hover:text-primary-700 transition-colors">
                      {category.name}
                    </p>
                    <p className="text-xs text-neutral-400 truncate mt-0.5">
                      {category.description || "Tap to explore products"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────── */}
      <section className="px-4 pb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-3xl p-8 text-center relative overflow-hidden"
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
            <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center mx-auto mb-4">
              <FaGift className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white mb-2">
              Can't find what you're looking for?
            </h2>
            <p className="text-white/70 text-sm mb-6 leading-relaxed max-w-xl mx-auto">
              We take custom gifting requests. Tell us what you have in mind and
              our team will source it for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/919000328100?text=Hi! I'm looking for a specific gift category."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <FaWhatsapp className="w-4 h-4" />
                Enquire on WhatsApp
              </a>
              <Link
                to="/shop"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold text-sm transition-all hover:-translate-y-0.5"
              >
                <FaLayerGroup className="w-4 h-4" />
                Browse All Products
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
