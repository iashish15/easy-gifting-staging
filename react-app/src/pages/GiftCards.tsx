// src/pages/GiftCards.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGift,
  FaWhatsapp,
  FaArrowRight,
  FaHeart,
  FaBriefcase,
  FaStar,
  FaUsers,
  FaHome,
  FaGraduationCap,
  FaBaby,
  FaLeaf,
  FaCheck,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Gift Collections ─────────────────────────────────────────────
const collections = [
  {
    id: "for-her",
    label: "Gift for Her",
    emoji: "👩",
    icon: FaHeart,
    gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
    bg: "#fdf2f8",
    border: "#fbcfe8",
    description: "Thoughtful gifts for the special women in your life",
    tags: ["Jewellery", "Skincare", "Perfume", "Hampers"],
    priceRange: "₹500 – ₹10,000",
    occasions: ["Birthday", "Anniversary", "Mother's Day"],
  },
  {
    id: "for-him",
    label: "Gift for Him",
    emoji: "👨",
    icon: FaUsers,
    gradient: "linear-gradient(135deg, #7c3aed, #a855f7)",
    bg: "#faf5ff",
    border: "#e9d5ff",
    description: "Stylish and practical gifts for the men who deserve the best",
    tags: ["Watches", "Bags", "Electronics", "Apparel"],
    priceRange: "₹800 – ₹15,000",
    occasions: ["Birthday", "Father's Day", "Promotion"],
  },
  {
    id: "corporate",
    label: "Corporate Gifts",
    emoji: "💼",
    icon: FaBriefcase,
    gradient: "linear-gradient(135deg, #6d28d9, #ec4899)",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    description: "Premium branded gifts for clients, employees and partners",
    tags: ["Hampers", "Notebooks", "Tech", "Branded Sets"],
    priceRange: "₹1,000 – ₹50,000",
    occasions: ["Diwali", "New Year", "Appreciation"],
  },
  {
    id: "wedding",
    label: "Wedding Gifts",
    emoji: "💒",
    icon: FaStar,
    gradient: "linear-gradient(135deg, #eab308, #f59e0b)",
    bg: "#fefce8",
    border: "#fef08a",
    description: "Elegant and memorable gifts to celebrate new beginnings",
    tags: ["Home Décor", "Kitchenware", "Luxury Sets", "Personalized"],
    priceRange: "₹1,500 – ₹25,000",
    occasions: ["Wedding", "Anniversary", "Engagement"],
  },
  {
    id: "home",
    label: "Home & Living",
    emoji: "🏠",
    icon: FaHome,
    gradient: "linear-gradient(135deg, #0891b2, #22d3ee)",
    bg: "#ecfeff",
    border: "#a5f3fc",
    description: "Beautiful gifts that make any home feel special",
    tags: ["Candles", "Décor", "Kitchen", "Plants"],
    priceRange: "₹400 – ₹8,000",
    occasions: ["Housewarming", "Birthday", "Festive"],
  },
  {
    id: "kids",
    label: "Gifts for Kids",
    emoji: "🧸",
    icon: FaBaby,
    gradient: "linear-gradient(135deg, #16a34a, #4ade80)",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    description: "Fun and educational gifts that bring smiles to little faces",
    tags: ["Toys", "Books", "Art Sets", "Games"],
    priceRange: "₹300 – ₹5,000",
    occasions: ["Birthday", "Children's Day", "Christmas"],
  },
  {
    id: "graduation",
    label: "Graduation Gifts",
    emoji: "🎓",
    icon: FaGraduationCap,
    gradient: "linear-gradient(135deg, #ea580c, #fb923c)",
    bg: "#fff7ed",
    border: "#fed7aa",
    description: "Celebrate achievements with meaningful gifts they'll cherish",
    tags: ["Bags", "Watches", "Stationery", "Tech"],
    priceRange: "₹600 – ₹12,000",
    occasions: ["Graduation", "Achievement", "New Job"],
  },
  {
    id: "eco",
    label: "Eco-Friendly Gifts",
    emoji: "🌿",
    icon: FaLeaf,
    gradient: "linear-gradient(135deg, #15803d, #16a34a)",
    bg: "#f0fdf4",
    border: "#86efac",
    description: "Sustainable gifts that are good for people and the planet",
    tags: ["Plant Kits", "Organic", "Recycled", "Bamboo"],
    priceRange: "₹350 – ₹6,000",
    occasions: ["Any Occasion", "Corporate", "Festive"],
  },
];

// ─── Budget options ───────────────────────────────────────────────
const budgets = [
  { label: "Under ₹500", value: "500" },
  { label: "₹500 – ₹1,000", value: "1000" },
  { label: "₹1,000 – ₹3,000", value: "3000" },
  { label: "₹3,000 – ₹10,000", value: "10000" },
  { label: "₹10,000+", value: "10000+" },
];

// ─── Gift Card component ──────────────────────────────────────────
const GiftCard = ({
  collection,
  index,
}: {
  collection: (typeof collections)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  const whatsappMsg = `Hi! I'm interested in ${collection.label} gifting options. Budget: ${collection.priceRange}`;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-3xl border border-primary-100 shadow-soft overflow-hidden group hover:-translate-y-1 hover:shadow-luxury transition-all duration-300"
    >
      {/* Card top gradient band */}
      <div
        className="relative h-36 flex items-center justify-center overflow-hidden"
        style={{ background: collection.gradient }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Blobs */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />

        <motion.div
          animate={{ scale: hovered ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
          className="text-5xl drop-shadow-lg"
        >
          {collection.emoji}
        </motion.div>

        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-white/25 backdrop-blur-sm border border-white/30 rounded-xl px-2.5 py-1">
          <p className="text-white text-[10px] font-bold">
            {collection.priceRange}
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-serif font-bold text-neutral-900 text-lg mb-1">
          {collection.label}
        </h3>
        <p className="text-neutral-500 text-xs leading-relaxed mb-4">
          {collection.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {collection.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
              style={{
                background: collection.bg,
                border: `1px solid ${collection.border}`,
                color: "#6d28d9",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Occasions */}
        <div className="mb-5">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
            Perfect for
          </p>
          <div className="flex flex-wrap gap-1.5">
            {collection.occasions.map((occ, i) => (
              <div key={i} className="flex items-center gap-1">
                <FaCheck className="w-2.5 h-2.5 text-green-500" />
                <span className="text-xs text-neutral-600 font-medium">
                  {occ}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/919000328100?text=${encodeURIComponent(whatsappMsg)}`}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-bold hover:shadow-md hover:-translate-y-0.5 transition-all"
          style={{ background: collection.gradient }}
        >
          <FaWhatsapp className="w-4 h-4" />
          Enquire Now
        </a>
      </div>
    </motion.div>
  );
};

// ─── Main page ────────────────────────────────────────────────────
export default function GiftCards() {
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");

  const occasions = [
    "Birthday",
    "Anniversary",
    "Wedding",
    "Corporate",
    "Festive",
    "Graduation",
  ];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      {/* ─── Hero ─────────────────────────────────────────────── */}
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
            <FaGift className="w-6 h-6 text-white" />
          </div>
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">
            Curated Collections
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Find the Perfect <span className="text-pink-300">Gift</span>
          </h1>
          <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Handpicked gift collections for every person, occasion, and budget.
            Let us help you make someone's day unforgettable.
          </p>
        </motion.div>
      </header>

      {/* ─── Filter bar ───────────────────────────────────────── */}
      <div className="bg-white border-b border-neutral-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex-shrink-0">
            Occasion:
          </span>
          {occasions.map((occ) => (
            <button
              key={occ}
              onClick={() =>
                setSelectedOccasion(selectedOccasion === occ ? "" : occ)
              }
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedOccasion === occ
                  ? "text-white shadow-sm"
                  : "bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-primary-300"
              }`}
              style={
                selectedOccasion === occ
                  ? { background: "linear-gradient(135deg, #7c3aed, #a855f7)" }
                  : {}
              }
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Gift Cards Grid ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-serif font-bold text-neutral-900">
              Gift Collections
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              {collections.length} curated collections · all budgets
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors"
          >
            Browse all products <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection, index) => (
            <GiftCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* ─── Budget section ────────────────────────────────────── */}
      <section className="px-4 pb-14">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-primary-100 shadow-soft overflow-hidden"
          >
            <div
              className="px-6 py-5 border-b border-primary-50 flex items-center gap-3"
              style={{
                background: "linear-gradient(to right, #faf5ff, #fdf2f8)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                }}
              >
                <FaGift className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-neutral-900">
                  Shop by Budget
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Find gifts that fit your budget perfectly
                </p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {budgets.map((b) => (
                <a
                  key={b.value}
                  href={`https://wa.me/919000328100?text=${encodeURIComponent(`Hi! I'm looking for gift options with a budget of ${b.label}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-primary-100 hover:border-primary-300 hover:bg-primary-50 transition-all group text-center"
                >
                  <span className="text-2xl mb-2">💰</span>
                  <span className="text-xs font-bold text-neutral-700 group-hover:text-primary-700 transition-colors">
                    {b.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Bottom CTA ────────────────────────────────────────── */}
      <section className="px-4 pb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto rounded-3xl p-10 text-center relative overflow-hidden"
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
            <div className="text-5xl mb-4">🎁</div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              Need a Custom Gift?
            </h2>
            <p className="text-white/70 text-sm mb-6 leading-relaxed max-w-xl mx-auto">
              Tell us about the recipient, occasion, and budget — and our
              gifting experts will curate the perfect gift just for you.
              Personal and corporate gifting made easy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/919000328100?text=Hi! I need help finding the perfect gift. Can you help?"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <FaWhatsapp className="w-5 h-5" />
                Get Gift Recommendations
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold text-sm transition-all hover:-translate-y-0.5"
              >
                Contact Us
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
