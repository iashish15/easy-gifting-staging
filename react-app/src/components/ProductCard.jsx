import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = React.memo(({ product }) => {
  const [imgError, setImgError] = useState(false);

  const hasDiscount =
    product.discountPrice > 0 && product.discountPrice > product.price;
  const discount = hasDiscount
    ? Math.round(
        ((product.discountPrice - product.price) / product.discountPrice) * 100,
      )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group bg-white rounded-xl overflow-hidden border border-neutral-100 hover:border-primary-200 hover:shadow-luxury transition-all duration-300"
    >
      <Link to={`/product/${product._id}`} className="block">
        {/* ── Image ─────────────────────────────── */}
        <div className="relative bg-neutral-50 overflow-hidden aspect-square">
          <img
            src={
              imgError || !product.images?.[0]
                ? "https://placehold.co/600x600/faf5ff/7c3aed?text=🎁"
                : product.images[0]
            }
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount badge */}
          {discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              {discount}% off
            </div>
          )}

          {/* Featured badge */}
          {product.featured && (
            <div
              className="absolute top-2 right-2 text-white text-[10px] font-bold px-2 py-0.5 rounded"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              }}
            >
              ✦ Top Pick
            </div>
          )}

          {/* Out of stock */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="text-neutral-500 font-semibold text-sm border border-neutral-300 px-3 py-1 rounded-full bg-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* ── Info ──────────────────────────────── */}
        <div className="p-3 flex justify-between items-center">
          {/* Name */}
          <h2 className="text-sm font-medium text-neutral-800 line-clamp-2 leading-snug mb-2">
            {product.name}
          </h2>
          {/* Category */}
          {product.category?.name && (
            <p className="text-[10px] font-semibold text-primary-500 uppercase tracking-wide mb-1">
              {product.category.name}
            </p>
          )}
        </div>
        <div className="p-3 flex justify-between items-center">
          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-base font-bold text-neutral-900">
              ₹{product.price?.toLocaleString("en-IN")}
            </span>
            {hasDiscount && (
              <>
                <span className="text-xs text-neutral-400 line-through">
                  ₹{product.discountPrice?.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-semibold text-green-600">
                  {discount}% off
                </span>
              </>
            )}
          </div>

          {/* Brand */}
          {product.brand?.name && (
            <p className="text-xs text-neutral-400 mt-1">
              by {product.brand.name}
            </p>
          )}

          {/* Free delivery */}
          {/* <p className="text-[10px] text-green-600 font-medium mt-1.5">
            🚚 Free Delivery
          </p> */}
        </div>
      </Link>
    </motion.div>
  );
});

export default ProductCard;
