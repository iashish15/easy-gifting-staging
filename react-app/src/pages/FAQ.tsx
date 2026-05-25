// src/pages/FAQ.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGift,
  FaChevronDown,
  FaWhatsapp,
  FaEnvelope,
  FaBox,
  FaBriefcase,
  FaHeadset,
  FaLightbulb,
  FaStar,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── FAQ Data ─────────────────────────────────────────────────────
const categories = [
  {
    id: "products",
    label: "Products & Customization",
    icon: FaBox,
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#e9d5ff",
    faqs: [
      {
        q: "Can I customize a gift with a personal message or name?",
        a: "Absolutely! Most of our products support personalization including custom name engravings, printed messages, and monogramming. Simply mention your customization requirements in the order notes or WhatsApp us directly and our team will guide you through the options.",
      },
      {
        q: "Are the products on EasyGifting genuine and quality assured?",
        a: "Yes, every product listed on EasyGifting is sourced from verified brands and suppliers. We personally curate our catalog to ensure quality, authenticity, and gifting-worthiness. Each item is inspected before dispatch.",
      },
      {
        q: "What product categories do you offer?",
        a: "We offer a wide range of gifting categories including Apparel, Bags & Backpacks, Electronics, Home & Kitchen, Household Utilities, and curated gift hampers for all occasions. Our catalog is regularly updated with new arrivals.",
      },
      {
        q: "Can I request a product that's not listed on the website?",
        a: "Yes! We take custom sourcing requests. If you have a specific product in mind, reach out to us via WhatsApp or the Contact page and we'll do our best to source it for you at competitive pricing.",
      },
    ],
  },
  {
    id: "corporate",
    label: "Corporate Gifting",
    icon: FaBriefcase,
    color: "#ec4899",
    bg: "#fdf2f8",
    border: "#fbcfe8",
    faqs: [
      {
        q: "Do you offer bulk or corporate gifting solutions?",
        a: "Yes, corporate gifting is one of our specialties. We offer bulk order discounts, custom branding options, and dedicated account managers for corporate clients. Whether it's Diwali hampers, employee appreciation kits, or client gifts — we handle everything end to end.",
      },
      {
        q: "Can I get my company logo printed on the gifts?",
        a: "Absolutely. We offer corporate branding on packaging, product tags, and select items like notebooks, bags, mugs, and boxes. Share your logo and brand guidelines with us and our design team will create a proof for your approval before production.",
      },
      {
        q: "What is the minimum order quantity for corporate gifting?",
        a: "Our minimum order quantity for corporate gifting typically starts at 20 units, though this can vary by product. For smaller teams we also offer semi-custom options. Contact us for a tailored quote based on your requirements.",
      },
      {
        q: "How far in advance should I place a corporate gifting order?",
        a: "We recommend placing corporate orders at least 7–14 days in advance for standard orders, and 3–4 weeks for fully customized or branded orders. For festive seasons like Diwali, earlier is always better to secure your preferred products.",
      },
    ],
  },
  {
    id: "contact",
    label: "Contact & Support",
    icon: FaHeadset,
    color: "#6d28d9",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    faqs: [
      {
        q: "How can I get in touch with EasyGifting?",
        a: "You can reach us through multiple channels — WhatsApp (fastest response), our Contact page form, or by email. Our team is available Monday to Saturday, 10 AM to 7 PM IST. We typically respond within a few hours.",
      },
      {
        q: "What should I do if I have an issue with my order?",
        a: "Please contact us immediately via WhatsApp or the Contact form with your order details and a description of the issue. We take all concerns seriously and aim to resolve them within 24–48 hours. Photographs of any product issues help speed up the resolution process.",
      },
      {
        q: "Do you have a physical store I can visit?",
        a: "Currently EasyGifting operates primarily online to serve customers across India. However, local clients in select cities may arrange viewings for corporate orders by appointment. Contact us to check availability in your area.",
      },
      {
        q: "Can I track my order status?",
        a: "Yes, once your order is dispatched you will receive tracking details via WhatsApp or the contact information provided. For corporate orders, a dedicated point of contact will keep you updated throughout the process.",
      },
    ],
  },
  {
    id: "ideas",
    label: "Gift Ideas & Occasions",
    icon: FaLightbulb,
    color: "#ca8a04",
    bg: "#fefce8",
    border: "#fef08a",
    faqs: [
      {
        q: "I'm not sure what to gift — can you help me choose?",
        a: "Of course! That's exactly what we're here for. Share a little about the recipient — their age, interests, the occasion, and your budget — via WhatsApp and our gifting experts will curate personalized recommendations just for you.",
      },
      {
        q: "What are the best gifts for a wedding or anniversary?",
        a: "For weddings and anniversaries, we recommend personalized keepsakes, luxury hampers, premium home décor items, or experience-based gifts. Our Wedding & Occasions collection features curated sets that balance elegance and sentimentality.",
      },
      {
        q: "Do you offer gifts suitable for festivals like Diwali and Eid?",
        a: "Yes! Festive gifting is our forte. We offer specially curated Diwali hampers with diyas, sweets, and premium gifts, as well as Eid gift boxes, Christmas sets, and Holi combos. Festive collections are updated seasonally — check our Shop page for current offerings.",
      },
      {
        q: "What makes a good corporate gift vs a personal gift?",
        a: "A good corporate gift is professional, useful, and subtly branded — think premium notebooks, tech accessories, or elegant hampers. Personal gifts, on the other hand, should feel intimate and tailored — customized items, sentimental keepsakes, or experience vouchers. We can help you navigate both.",
      },
    ],
  },
  {
    id: "packaging",
    label: "Packaging & Presentation",
    icon: FaStar,
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    faqs: [
      {
        q: "How are gifts packaged at EasyGifting?",
        a: "We take presentation very seriously. Every order is packed with care using premium materials — tissue paper, ribbon, gift boxes, and branded tags. For special occasions, we offer luxury gift wrapping as an add-on. The unboxing experience is as important to us as the gift itself.",
      },
      {
        q: "Can I request gift wrapping for my order?",
        a: "Yes, gift wrapping is available for most orders. You can select this option during checkout or mention it when enquiring via WhatsApp. We offer several wrapping styles from minimalist kraft to full luxury presentation with ribbon and handwritten tags.",
      },
      {
        q: "Do you offer eco-friendly packaging options?",
        a: "We are actively expanding our eco-friendly packaging range including recycled kraft boxes, seed paper tags, and biodegradable void fill. If sustainability is important to you, let us know and we'll prioritize green packaging options for your order.",
      },
      {
        q: "Can I include a personal message card with my gift?",
        a: "Absolutely. You can include a handwritten or printed message card with any order. Simply add your message during checkout or share it with us on WhatsApp. Cards are elegantly presented and can be kept as a keepsake by the recipient.",
      },
    ],
  },
];

// ─── Single FAQ item ──────────────────────────────────────────────
const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border border-primary-100 rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-primary-50/50 transition-colors"
      >
        <div className="flex items-start gap-3">
          <span
            className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white mt-0.5"
            style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
          >
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-neutral-800 leading-snug">
            {q}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <FaChevronDown className="w-4 h-4 text-primary-400" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 pl-14">
              <p className="text-sm text-neutral-500 leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Main FAQ page ────────────────────────────────────────────────
export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("products");

  const current = categories.find((c) => c.id === activeCategory)!;

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
            <FaGift className="w-6 h-6 text-white" />
          </div>
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">
            Help Center
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Frequently Asked <span className="text-pink-300">Questions</span>
          </h1>
          <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about gifting with EasyGifting. Can't
            find your answer? We're just a WhatsApp away.
          </p>
        </motion.div>
      </header>

      {/* ─── Category tabs ────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-neutral-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-semibold transition-all ${
                  isActive
                    ? "text-white shadow-md"
                    : "bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-primary-300 hover:text-primary-700"
                }`}
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                      }
                    : {}
                }
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── FAQ Content ──────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {/* Section header */}
            <div
              className="flex items-center gap-4 p-5 rounded-3xl mb-8 border"
              style={{
                background: current.bg,
                borderColor: current.border,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${current.color}, ${current.color}99)`,
                }}
              >
                <current.icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-neutral-900 text-lg">
                  {current.label}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {current.faqs.length} questions answered
                </p>
              </div>
            </div>

            {/* FAQ items */}
            <div className="space-y-3">
              {current.faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ─── Still have questions CTA ─────────────────────────── */}
      <section className="px-4 pb-16">
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
            <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center mx-auto mb-4">
              <FaHeadset className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white mb-2">
              Still have questions?
            </h2>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Our gifting experts are ready to help. Reach out via WhatsApp for
              the fastest response or drop us a message.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/919000328100?text=Hi! I have a question about EasyGifting."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <FaWhatsapp className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold text-sm transition-all hover:-translate-y-0.5"
              >
                <FaEnvelope className="w-4 h-4" />
                Send a Message
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
