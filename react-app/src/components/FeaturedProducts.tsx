import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts, getCategories } from "../api/productService";
import { setProducts } from "../redux/productSlice";
import ProductCard from "./ProductCard";
import { FaArrowRight, FaFire } from "react-icons/fa";
import Card from "./ui/Card";

// ── Skeleton ────────────────────────────────────────────────────
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

// ── Animation ────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ── FeaturedProducts ─────────────────────────────────────────────
const FeaturedProducts: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<any[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<
    Record<string, any[]>
  >({});
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          getCategories(),
          getProducts({ featured: true }),
        ]);

        const cats = Array.isArray(catRes.data)
          ? catRes.data
          : catRes.data?.categories || [];

        const prods = Array.isArray(prodRes.data)
          ? prodRes.data
          : prodRes.data?.products || [];

        setCategories(cats);
        setAllProducts(prods);
        dispatch(setProducts(prods));

        // Group products by category
        const grouped: Record<string, any[]> = {};
        cats.forEach((cat: any) => {
          grouped[cat._id] = prods.filter((p: any) => {
            const catId =
              typeof p.category === "string" ? p.category : p.category?._id;
            return catId === cat._id;
          });
        });
        setProductsByCategory(grouped);
      } catch (err) {
        console.error("Failed to load featured products", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [dispatch]);

  // Products to show based on active tab
  const displayProducts =
    activeCategory === "all"
      ? allProducts.slice(0, 8)
      : (productsByCategory[activeCategory] || []).slice(0, 4);

  const activeCategory_obj = categories.find((c) => c._id === activeCategory);
  const hasMore =
    activeCategory === "all"
      ? allProducts.length > 8
      : (productsByCategory[activeCategory] || []).length > 4;

  const handleViewMore = () => {
    if (activeCategory === "all") {
      navigate("/shop");
    } else {
      navigate(
        `/shop?category=${activeCategory}&name=${encodeURIComponent(activeCategory_obj?.name || "")}`,
      );
    }
  };

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-secondary-50 text-secondary-700 text-sm font-semibold px-4 py-2 rounded-full border border-secondary-200 mb-4">
            <FaFire className="inline w-3.5 h-3.5 mr-1.5" />
            Handpicked for You
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 font-serif">
            Featured Gifts
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Discover our handpicked selection of premium gifts that bring joy
            and elegance to every occasion
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        {/* Category Filter Tabs */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 w-full overflow-x-auto scrollbar-hide"
          >
            <div className="flex space-x-3 px-4 pb-1 w-max mx-auto md:flex-wrap md:justify-center md:w-full md:gap-2 md:space-x-0">
              {/* All Tab */}
              <button
                onClick={() => setActiveCategory("all")}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === "all"
                    ? "text-white shadow-sm"
                    : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300"
                }`}
                style={
                  activeCategory === "all"
                    ? {
                        background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                      }
                    : {}
                }
              >
                🎁 All Gifts
              </button>

              {/* Category Tabs */}
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat._id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat._id
                      ? "text-white shadow-sm"
                      : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600"
                  }`}
                  style={
                    activeCategory === cat._id
                      ? {
                          background:
                            "linear-gradient(135deg, #7c3aed, #a855f7)",
                        }
                      : {}
                  }
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        ) : displayProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🎁</div>
            <p className="text-neutral-500 text-lg font-medium">
              No products in this category yet.
            </p>
            <p className="text-neutral-400 text-sm mt-1">
              Add products from the admin panel.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-4 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              }}
            >
              View All Gifts
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {displayProducts.map((product: any, index: number) => (
                <motion.div key={product._id || index} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {/* View More Button */}
            {hasMore && (
              <motion.div
                className="text-center mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={handleViewMore}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-white font-bold text-sm transition-all hover:shadow-luxury hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
                  }}
                >
                  View More {activeCategory_obj?.name || ""} Gifts
                  <FaArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Why EasyGifting */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card variant="glass" className="inline-block p-8">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 font-serif">
              Why Choose EasyGifting?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Premium Quality
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Carefully curated gifts of exceptional quality
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Fast Delivery
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Swift and reliable shipping worldwide
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-neutral-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Personal Touch
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Thoughtful gifts that create lasting memories
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
