// src/components/CategoryShowcase.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getCategories } from "../api/productService";
import { FaArrowRight, FaLayerGroup } from "react-icons/fa";

// ── Gradient colors cycle for dynamic categories ─────────────────
const GRADIENTS = [
  "from-primary-500 to-primary-700",
  "from-secondary-500 to-secondary-700",
  "from-accent-500 to-accent-700",
  "from-primary-600 to-secondary-600",
  "from-green-500 to-green-700",
  "from-pink-500 to-rose-700",
  "from-orange-500 to-amber-700",
  "from-teal-500 to-cyan-700",
];

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
  return "🎁"; // default
};

// ── Skeleton Card ────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden animate-pulse">
    <div className="h-64 bg-neutral-200 dark:bg-neutral-700" />
    <div className="p-4 bg-white dark:bg-neutral-800">
      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-2" />
      <div className="h-3 bg-neutral-100 dark:bg-neutral-600 rounded w-1/2" />
    </div>
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CategoryShowcase: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCategories();
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.categories || [];
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full border border-primary-200 mb-4">
            🗂️ Browse Collections
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 font-serif">
            Shop by Category
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Explore our curated collections designed for every taste and
            occasion
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🎁</div>
            <p className="text-neutral-500 text-lg">
              No categories yet. Add some from the admin panel!
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div key={category._id} variants={itemVariants}>
                <Link
                  to={`/shop?category=${category._id}&name=${encodeURIComponent(category.name)}`}
                >
                  <div className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-soft hover:shadow-luxury transition-all duration-300 hover:-translate-y-2">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        GRADIENTS[index % GRADIENTS.length]
                      } transition-all duration-300 group-hover:scale-110`}
                    />

                    {/* Decorative circles */}
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                      <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                        {getCategoryEmoji(category.name)}
                      </div>
                      <h3 className="text-xl font-bold font-serif mb-1 leading-tight">
                        {category.name}
                      </h3>
                      <p className="text-sm text-white/80 mb-4 line-clamp-2">
                        {category.description || "Explore our collection"}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-semibold bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/30 group-hover:bg-white/30 transition-colors">
                        Explore
                        <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All */}
        {categories.length > 0 && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-primary-300 text-primary-700 font-semibold text-sm hover:bg-primary-50 transition-all duration-200 hover:-translate-y-0.5"
            >
              <FaLayerGroup className="w-4 h-4" />
              View All Categories
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CategoryShowcase;
