import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { getProductById } from "@/api/productService";
import Loader from "../components/Loader";
import {
  FaArrowLeft,
  FaShieldAlt,
  FaCheckCircle,
  FaWhatsapp,
  FaTag,
  FaBoxOpen,
  FaStar,
} from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Loader />;

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center pt-20">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-xl font-semibold text-neutral-700 mb-2">
          {error || "Unable to load product."}
        </p>
        <p className="text-neutral-500 mb-6">
          The product you're looking for doesn't exist or was removed.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
        >
          <FaArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  const hasDiscount =
    product.discountPrice > 0 && product.discountPrice > product.price;
  const discount = hasDiscount
    ? Math.round(
        ((product.discountPrice - product.price) / product.discountPrice) * 100,
      )
    : null;

  const images =
    product.images?.length > 0
      ? product.images
      : ["https://placehold.co/600x600/faf5ff/7c3aed?text=🎁"];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      {/* ─── Hero Header Banner ───────────────────────────────── */}
      <div
        className="relative overflow-hidden pt-20 pb-6"
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
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow blobs */}
        <div
          className="absolute -top-10 -left-10 w-48 h-48 rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #c084fc, transparent)",
          }}
        />
        <div
          className="absolute -bottom-8 right-20 w-40 h-40 rounded-full opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #f472b6, transparent)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-4 transition-colors group"
          >
            <FaArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[420px_1fr] gap-8">
          {/* ── Left: Images ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            {/* Main image */}
            <div className="bg-white rounded-3xl overflow-hidden border border-primary-100 shadow-soft aspect-square relative">
              <img
                src={
                  imgError
                    ? "https://placehold.co/600x600/faf5ff/7c3aed?text=🎁"
                    : images[selectedImage]
                }
                alt={product.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-xl shadow-md">
                  {discount}% OFF
                </div>
              )}
              {product.featured && (
                <div
                  className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  }}
                >
                  ✦ Top Pick
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImage(idx);
                      setImgError(false);
                    }}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-primary-500 shadow-md scale-105"
                        : "border-neutral-200 hover:border-primary-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust badges */}
            <div
              className="rounded-3xl border border-primary-100 p-4 overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, #faf5ff, #fdf2f8)",
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: FaShieldAlt,
                    text: "Secure Payment",
                    sub: "100% Safe",
                    color: "#7c3aed",
                  },
                  {
                    icon: FaCheckCircle,
                    text: "Genuine Product",
                    sub: "Quality assured",
                    color: "#ec4899",
                  },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, #7c3aed22, #ec489922)",
                      }}
                    >
                      <badge.icon
                        className="w-4 h-4"
                        style={{ color: badge.color }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-800">
                        {badge.text}
                      </p>
                      <p className="text-[10px] text-neutral-500">
                        {badge.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Product Info ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Brand + Status */}
            <div className="flex items-center gap-3 flex-wrap">
              {product.brand?.name && (
                <span
                  className="text-sm font-bold px-3 py-1 rounded-full text-white"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  }}
                >
                  {product.brand.name}
                </span>
              )}
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  product.status === "active"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${product.status === "active" ? "bg-green-500" : "bg-neutral-400"}`}
                />
                {product.status === "active" ? "In Store" : "Draft"}
              </span>
              {product.featured && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center gap-1">
                  <FaStar className="w-3 h-3" /> Featured
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 leading-tight font-serif">
              {product.name}
            </h1>

            {/* Price card */}
            <div
              className="rounded-3xl p-5 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #faf5ff, #fdf2f8)",
                border: "1px solid #e9d5ff",
              }}
            >
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #a855f7, transparent)",
                }}
              />
              <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-2">
                Special Price
              </p>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-bold text-neutral-900">
                  ₹{product.price?.toLocaleString("en-IN")}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-neutral-400 line-through">
                      ₹{product.discountPrice?.toLocaleString("en-IN")}
                    </span>
                    <span
                      className="text-sm font-bold px-2 py-0.5 rounded-lg text-white"
                      style={{
                        background: "linear-gradient(135deg, #16a34a, #22c55e)",
                      }}
                    >
                      {discount}% off
                    </span>
                  </>
                )}
              </div>
              {hasDiscount && (
                <p className="text-sm text-green-600 mt-2 font-medium">
                  You save ₹
                  {(product.discountPrice - product.price).toLocaleString(
                    "en-IN",
                  )}{" "}
                  on this order
                </p>
              )}
            </div>

            {/* Stock + Category row */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                {product.stock > 0 ? (
                  <>
                    <FaCheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">
                      In Stock
                      {product.stock < 10 && (
                        <span className="ml-2 text-orange-500 font-normal">
                          (Only {product.stock} left!)
                        </span>
                      )}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-red-500 flex items-center gap-1.5">
                    <FaBoxOpen className="w-4 h-4" /> Out of Stock
                  </span>
                )}
              </div>

              {product.category?.name && (
                <div className="flex items-center gap-1.5">
                  <FaTag className="w-3 h-3 text-neutral-400" />
                  <span className="text-sm text-neutral-500">Category:</span>
                  <Link
                    to={`/shop?category=${product.category._id}&name=${product.category.name}`}
                    className="text-sm font-semibold text-primary-600 hover:text-primary-800 hover:underline transition-colors"
                  >
                    {product.category.name}
                  </Link>
                </div>
              )}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/919000328100?text=Hi! I'm interested in ${encodeURIComponent(product.name)} (₹${product.price})`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 border-green-200 text-green-700 bg-green-50 hover:bg-green-100"
            >
              <FaWhatsapp className="w-5 h-5" />
              Enquire on WhatsApp
            </a>

            {/* Description */}
            {product.description && (
              <div className="bg-white rounded-3xl border border-primary-100 overflow-hidden shadow-soft">
                <button
                  onClick={() => setDescOpen(!descOpen)}
                  className="w-full px-5 py-4 border-b border-primary-50 flex items-center justify-between"
                  style={{
                    background: "linear-gradient(to right, #faf5ff, #fdf2f8)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                      }}
                    >
                      <span className="text-sm">📋</span>
                    </div>
                    <h3 className="font-bold text-neutral-900 font-serif">
                      Product Description
                    </h3>
                  </div>
                  <motion.span
                    animate={{ rotate: descOpen ? 180 : 0 }} // or detailsOpen for the second one
                    transition={{ duration: 0.3 }}
                    className="text-neutral-400 text-lg inline-block"
                  >
                    ▾
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {descOpen && (
                    <motion.div
                      key="desc"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 py-4">
                        <p className="text-neutral-600 text-sm leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Product details table */}
            <div className="bg-white rounded-3xl border border-primary-100 overflow-hidden shadow-soft">
              <button
                onClick={() => setDetailsOpen(!detailsOpen)}
                className="w-full px-5 py-4 border-b border-primary-50 flex items-center justify-between"
                style={{
                  background: "linear-gradient(to right, #faf5ff, #fdf2f8)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                    }}
                  >
                    <span className="text-sm">📦</span>
                  </div>
                  <h3 className="font-bold text-neutral-900 font-serif">
                    Product Details
                  </h3>
                </div>
                <motion.span
                  animate={{ rotate: detailsOpen ? 180 : 0 }} // or descOpen for the second one
                  transition={{ duration: 0.3 }}
                  className="text-neutral-400 text-lg inline-block"
                >
                  ▾
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {detailsOpen && (
                  <motion.div
                    key="details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="divide-y divide-neutral-50">
                      {[
                        {
                          label: "Brand",
                          value: product.brand?.name || "EasyGifting",
                        },
                        {
                          label: "Category",
                          value: product.category?.name || "General",
                        },
                        {
                          label: "Stock",
                          value:
                            product.stock > 0
                              ? `${product.stock} units available`
                              : "Out of Stock",
                        },
                        {
                          label: "Status",
                          value:
                            product.status === "active" ? "Available" : "Draft",
                        },
                      ].map((row, i) => (
                        <div
                          key={i}
                          className="flex px-5 py-3 text-sm hover:bg-primary-50/40 transition-colors"
                        >
                          <span className="w-36 text-neutral-400 font-medium flex-shrink-0">
                            {row.label}
                          </span>
                          <span className="text-neutral-800 font-semibold">
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full font-medium text-primary-700"
                    style={{
                      background: "linear-gradient(135deg, #ede9fe, #fce7f3)",
                      border: "1px solid #ddd6fe",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
