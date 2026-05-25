// import {
//   FaGift,
//   FaTruck,
//   FaStar,
//   FaHeart,
//   FaHandHoldingHeart,
//   FaQuoteLeft,
// } from "react-icons/fa";
// import { HiSparkles } from "react-icons/hi2";

// export default function OurStory() {
//   return (
//     <div className="min-h-screen bg-neutral-50 font-sans">
//       {/* ─────────────────────────────
//             Hero Section
//       ─────────────────────────────── */}
//       <header
//         className="relative overflow-hidden py-24 px-6 text-center text-white"
//         style={{
//           backgroundImage:
//             "linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #ec4899 100%)",
//         }}
//       >
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
//             backgroundSize: "30px 30px",
//           }}
//         />
//         <div className="relative z-10 max-w-4xl mx-auto">
//           <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
//             Our Story
//           </h1>
//           <p className="text-white/80 text-lg md:text-xl leading-relaxed">
//             How a simple idea for gifting transformed into a thoughtful
//             experience that connects hearts across India.
//           </p>
//         </div>
//       </header>

//       {/* ─────────────────────────────
//             Introduction
//       ─────────────────────────────── */}
//       <section className="px-6 py-16 bg-white">
//         <div className="max-w-4xl mx-auto space-y-8">
//           <div className="text-center">
//             <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
//               Why Easy Gifting Began
//             </h2>
//             <p className="text-neutral-600 text-lg leading-relaxed">
//               At Easy Gifting, we believe every occasion deserves a meaningful
//               gift. We started with one simple goal: make gifting easier, more
//               thoughtful, and truly memorable.
//             </p>
//           </div>

//           <div className="grid gap-8 md:grid-cols-2 text-neutral-700">
//             <div className="p-6 rounded-2xl bg-neutral-50 border border-primary-100 shadow-soft">
//               <HiSparkles className="w-8 h-8 text-primary-600 mb-4" />
//               <h3 className="text-xl font-semibold text-neutral-900 mb-3">
//                 Thoughtful Curation
//               </h3>
//               <p className="text-neutral-600 leading-relaxed">
//                 Every gift box is hand‑picked from trusted brands and local
//                 artisans, ensuring quality, freshness, and beautiful packaging
//                 that feels personal.
//               </p>
//             </div>

//             <div className="p-6 rounded-2xl bg-neutral-50 border border-primary-100 shadow-soft">
//               <FaTruck className="w-8 h-8 text-secondary-600 mb-4" />
//               <h3 className="text-xl font-semibold text-neutral-900 mb-3">
//                 Fast & Reliable Delivery
//               </h3>
//               <p className="text-neutral-600 leading-relaxed">
//                 We partner with trusted logistics to deliver on time, every
//                 time—so your loved ones receive their gifts with joy, exactly
//                 when it matters most.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────
//             Journey Timeline
//       ─────────────────────────────── */}
//       <section className="px-6 py-16 bg-neutral-50">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-3xl font-serif font-bold text-neutral-900 text-center mb-2">
//             Our Journey
//           </h2>
//           <p className="text-neutral-600 text-center mb-12">
//             From a small idea to a growing community of givers.
//           </p>

//           <div className="space-y-8">
//             <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 group">
//               <div
//                 className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
//                 style={{
//                   background: "linear-gradient(135deg, #7c3aed, #a855f7)",
//                 }}
//               >
//                 <FaStar className="w-5 h-5" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-neutral-900 mb-1">
//                   2022 – The Idea Was Born
//                 </h3>
//                 <p className="text-neutral-600 text-sm">
//                   A team of gift‑lovers met around a simple question: “Can
//                   gifting be easier and more personal?” That curiosity led to
//                   Easy Gifting.
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 group">
//               <div
//                 className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
//                 style={{
//                   background: "linear-gradient(135deg, #ec4899, #f472b6)",
//                 }}
//               >
//                 <FaGift className="w-5 h-5" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-neutral-900 mb-1">
//                   2023 – First Hampers Delivered
//                 </h3>
//                 <p className="text-neutral-600 text-sm">
//                   We launched with a small catalog of curated hampers. Each box
//                   was packed with care, and our first customers loved the
//                   experience.
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 group">
//               <div
//                 className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
//                 style={{
//                   background: "linear-gradient(135deg, #eab308, #facc15)",
//                 }}
//               >
//                 <FaHeart className="w-5 h-5" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-neutral-900 mb-1">
//                   2024 – Growing With You
//                 </h3>
//                 <p className="text-neutral-600 text-sm">
//                   More categories, more brands, more smiles. We expanded across
//                   India, delighting thousands of customers with effortless,
//                   beautiful gifting.
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 group">
//               <div
//                 className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
//                 style={{
//                   background: "linear-gradient(135deg, #581c87, #7c3aed)",
//                 }}
//               >
//                 <FaHandHoldingHeart className="w-5 h-5" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-neutral-900 mb-1">
//                   2026 – A Gifting Brand You Trust
//                 </h3>
//                 <p className="text-neutral-600 text-sm">
//                   Today, Easy Gifting is your trusted partner for
//                   gifting—whether it’s birthday surprises, corporate gifts, or
//                   helping you say “I care” in a memorable way.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────
//             Mission & Values
//       ─────────────────────────────── */}
//       <section className="px-6 py-16 bg-white">
//         <div className="max-w-4xl mx-auto space-y-10">
//           <h2 className="text-3xl font-serif font-bold text-neutral-900 text-center">
//             Our Mission
//           </h2>
//           <p className="text-neutral-600 text-lg text-center leading-relaxed max-w-3xl mx-auto">
//             To make gifting easy, emotional, and memorable for every person and
//             every occasion.
//           </p>

//           <div className="grid gap-8 md:grid-cols-3">
//             <div className="p-6 rounded-2xl bg-neutral-50 border border-primary-100 shadow-soft">
//               <FaHeart className="w-8 h-8 text-primary-600 mb-4" />
//               <h3 className="text-lg font-semibold text-neutral-900 mb-3">
//                 People First
//               </h3>
//               <p className="text-neutral-600 text-sm">
//                 We care deeply about the people who give and the people who
//                 receive. Every decision starts with empathy.
//               </p>
//             </div>

//             <div className="p-6 rounded-2xl bg-neutral-50 border border-secondary-100 shadow-soft">
//               <FaQuoteLeft className="w-8 h-8 text-secondary-600 mb-4" />
//               <h3 className="text-lg font-semibold text-neutral-900 mb-3">
//                 Honest Quality
//               </h3>
//               <p className="text-neutral-600 text-sm">
//                 We work with trusted brands and artisans to ensure every gift
//                 feels premium, not just in look but in experience.
//               </p>
//             </div>

//             <div className="p-6 rounded-2xl bg-neutral-50 border border-accent-100 shadow-soft">
//               <FaStar className="w-8 h-8 text-accent-600 mb-4" />
//               <h3 className="text-lg font-semibold text-neutral-900 mb-3">
//                 Simple, Yet Beautiful
//               </h3>
//               <p className="text-neutral-600 text-sm">
//                 We believe great gifting doesn’t need to be complicated.
//                 Beautiful design, thoughtful curation, and fast delivery—that’s
//                 our promise.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────
//             Closing CTA
//       ─────────────────────────────── */}
//       <section className="px-6 py-16 bg-white">
//         <div
//           className="max-w-4xl mx-auto rounded-2xl p-8 text-center"
//           style={{
//             background: "linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)",
//           }}
//         >
//           <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-4">
//             Join the Easy Gifting Story
//           </h2>
//           <p className="text-neutral-600 mb-6">
//             Every gift you send helps write our story. Choose Easy Gifting for
//             effortless, heartfelt moments.
//           </p>
//           <button
//             className="py-3 px-8 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 mx-auto transition-all hover:shadow-md hover:-translate-y-0.5"
//             style={{
//               background: "linear-gradient(135deg, #7c3aed, #a855f7)",
//             }}
//           >
//             Start Gifting Now
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }

// src/pages/OurStory.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaGift,
  FaTruck,
  FaStar,
  FaHeart,
  FaHandHoldingHeart,
  FaQuoteLeft,
  FaUsers,
  FaShieldAlt,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const stats = [
  { number: "2+", label: "Years of Excellence", icon: "🏆" },
  { number: "500+", label: "Happy Clients", icon: "😊" },
  { number: "10K+", label: "Gifts Delivered", icon: "🎁" },
  { number: "Pan India", label: "Delivery Reach", icon: "🚀" },
];

const journey = [
  {
    year: "2022",
    title: "The Idea Was Born",
    desc: 'A passionate team of gift lovers in Secunderabad asked one simple question: "Can gifting be easier, more personal, and truly memorable?" That spark of curiosity gave birth to EasyGifting — a brand built on the belief that every occasion deserves a perfect gift.',
    gradient: "from-primary-700 to-primary-500",
    icon: FaStar,
  },
  {
    year: "2023",
    title: "First Hampers Delivered",
    desc: "We launched with a curated catalog of premium hampers for corporate clients and individuals across Hyderabad. Every box was packed with love, and our first customers didn't just receive gifts — they received experiences. Word spread fast.",
    gradient: "from-secondary-700 to-secondary-500",
    icon: FaGift,
  },
  {
    year: "2024",
    title: "Growing Across India",
    desc: "More categories. More brands. More smiles. We expanded our catalog to include personalised gifts, festive hampers, wedding collections, and corporate bulk orders. Thousands of customers trusted EasyGifting to make their moments special.",
    gradient: "from-accent-700 to-accent-500",
    icon: FaHeart,
  },
  {
    year: "2025",
    title: "Corporate Gifting Partner",
    desc: "Businesses across India chose us as their go-to corporate gifting partner. From employee appreciation kits to client Diwali hampers — we handled bulk orders with personalised branding, on-time delivery, and premium packaging.",
    gradient: "from-green-700 to-green-500",
    icon: FaUsers,
  },
  {
    year: "2026",
    title: "A Gifting Brand You Trust",
    desc: "Today, EasyGifting is more than a store. We are a gifting experience — your trusted partner for birthdays, anniversaries, weddings, festivals, and corporate milestones. Every gift we send carries one message: someone cares about you.",
    gradient: "from-primary-800 to-secondary-600",
    icon: FaHandHoldingHeart,
  },
];

const values = [
  {
    icon: FaHeart,
    title: "People First",
    desc: "Every decision we make starts with empathy — for the giver and the receiver. We care deeply about the emotions behind every gift we send.",
    gradient: "from-primary-600 to-primary-400",
    bg: "bg-primary-50",
    border: "border-primary-100",
  },
  {
    icon: FaShieldAlt,
    title: "Honest Quality",
    desc: "We work only with trusted brands, premium vendors, and local artisans. Every product in our catalog is hand-picked for quality, freshness, and presentation.",
    gradient: "from-secondary-600 to-secondary-400",
    bg: "bg-secondary-50",
    border: "border-secondary-100",
  },
  {
    icon: HiSparkles,
    title: "Thoughtful Curation",
    desc: "We don't just sell gifts — we curate experiences. From packaging to personalisation, every detail is designed to make the recipient feel truly special.",
    gradient: "from-accent-600 to-accent-400",
    bg: "bg-accent-50",
    border: "border-accent-100",
  },
  {
    icon: FaTruck,
    title: "Reliable Delivery",
    desc: "Pan-India delivery with real-time tracking. We partner with trusted logistics to ensure your gift arrives on time, in perfect condition, every single time.",
    gradient: "from-green-600 to-green-400",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: FaStar,
    title: "Premium Experience",
    desc: "From the moment you place an order to the moment it's unboxed — we design every step to feel luxurious, effortless, and worth remembering.",
    gradient: "from-primary-700 to-secondary-500",
    bg: "bg-primary-50",
    border: "border-primary-100",
  },
  {
    icon: FaQuoteLeft,
    title: "Customer Obsession",
    desc: "Your satisfaction is our mission. We listen, we improve, and we go the extra mile — because you trust us with moments that matter the most.",
    gradient: "from-secondary-700 to-accent-500",
    bg: "bg-secondary-50",
    border: "border-secondary-100",
  },
];

const testimonials = [
  {
    name: "Kanchan",
    role: "HR Manager, Hyderabad",
    text: "EasyGifting handled our Diwali corporate gifting for 200 employees. The packaging was stunning, delivery was on time, and every employee loved it. Will definitely use again!",
    emoji: "🎁",
  },
  {
    name: "Rudransh",
    role: "Entrepreneur, Bengaluru",
    text: "I've ordered anniversary and birthday gifts multiple times. The personalised hampers are absolutely beautiful. My wife was speechless when she opened the box!",
    emoji: "💍",
  },
  {
    name: "Anjali",
    role: "Event Planner, Secunderabad",
    text: "For weddings and corporate events, EasyGifting is my go-to. They understand the brief perfectly and always deliver something premium and memorable.",
    emoji: "✨",
  },
];

export default function OurStory() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28 px-6 text-center text-white"
        style={{
          background:
            "linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #ec4899 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #fff, transparent)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #facc15, transparent)",
          }}
        />

        {/* Floating emojis */}
        {[
          { e: "🎁", s: { top: "18%", left: "8%" }, d: 0 },
          { e: "✨", s: { top: "14%", right: "10%" }, d: 1.2 },
          { e: "🎀", s: { bottom: "20%", left: "12%" }, d: 0.6 },
          { e: "💝", s: { bottom: "18%", right: "8%" }, d: 1.8 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-40 pointer-events-none"
            style={item.s as any}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: item.d }}
          >
            {item.e}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2 rounded-full border border-white/30 mb-6">
            💝 Our Story
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Gifting with <span className="text-accent-300">Heart</span>,<br />
            Delivered with <span className="text-secondary-300">Care</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            From a small idea born in Secunderabad to delivering 10,000+ gifts
            across India — this is how EasyGifting became the most trusted name
            in premium gifting.
          </p>
        </motion.div>
      </section>

      {/* ─── Stats ─────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="text-center p-6 rounded-2xl border border-primary-100 bg-primary-50 hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="font-serif text-3xl font-bold bg-gradient-to-r from-primary-700 to-secondary-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-neutral-600 text-sm font-medium mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Why We Started ────────────────────────────────────── */}
      <section
        className="px-6 py-16"
        style={{ background: "linear-gradient(to bottom, #faf5ff, #fdf2f8)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full border border-primary-200 mb-4">
              🌱 How It Started
            </span>
            <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-4">
              Why EasyGifting Began
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed max-w-3xl mx-auto">
              We started with one frustrating observation — gifting was
              complicated, generic, and impersonal. The right gift was hard to
              find, packaging was an afterthought, and delivery was unreliable.
              We set out to fix all of that.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: HiSparkles,
                title: "Thoughtful Curation",
                desc: "Every gift box is hand-picked from trusted brands and local artisans, ensuring quality, freshness, and packaging that feels personal and premium.",
                gradient: "from-primary-600 to-primary-400",
                bg: "bg-primary-50",
                border: "border-primary-100",
              },
              {
                icon: FaTruck,
                title: "Fast & Reliable Delivery",
                desc: "We partner with trusted logistics partners to deliver on time, every time — so your loved ones receive their gifts with joy, exactly when it matters most.",
                gradient: "from-secondary-600 to-secondary-400",
                bg: "bg-secondary-50",
                border: "border-secondary-100",
              },
              {
                icon: FaGift,
                title: "Premium Packaging",
                desc: "Unboxing is part of the gift. We invest in beautiful, branded packaging that makes the first impression as special as the gift itself.",
                gradient: "from-accent-600 to-accent-400",
                bg: "bg-accent-50",
                border: "border-accent-100",
              },
              {
                icon: FaUsers,
                title: "Corporate Expertise",
                desc: "From 10 pieces to 10,000 — we handle corporate gifting at scale with custom branding, bulk pricing, and dedicated account management.",
                gradient: "from-green-600 to-green-400",
                bg: "bg-green-50",
                border: "border-green-100",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`p-6 rounded-2xl ${item.bg} border ${item.border} hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2 font-serif">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Journey Timeline ───────────────────────────────────── */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-secondary-50 text-secondary-700 text-sm font-semibold px-4 py-2 rounded-full border border-secondary-200 mb-4">
              📅 Our Journey
            </span>
            <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-4">
              From Idea to Impact
            </h2>
            <p className="text-neutral-600 text-lg">
              A timeline of growth, learning, and thousands of smiles delivered.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 to-secondary-300 hidden md:block" />

            <div className="space-y-8">
              {journey.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="flex flex-col md:flex-row items-start gap-4 md:gap-6 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br ${item.gradient} shadow-soft group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 bg-neutral-50 rounded-2xl p-5 border border-neutral-100 hover:border-primary-200 hover:shadow-soft transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full text-white"
                        style={{
                          background: `linear-gradient(135deg, #7c3aed, #ec4899)`,
                        }}
                      >
                        {item.year}
                      </span>
                      <h3 className="text-base font-bold text-neutral-900 font-serif">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ────────────────────────────────────────────── */}
      <section
        className="px-6 py-16"
        style={{ background: "linear-gradient(to bottom, #faf5ff, #fdf2f8)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-accent-50 text-accent-700 text-sm font-semibold px-4 py-2 rounded-full border border-accent-200 mb-4">
              💛 What We Stand For
            </span>
            <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Six principles that guide every decision we make at EasyGifting.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((val, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`p-6 rounded-2xl ${val.bg} border ${val.border} hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${val.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <val.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-2 font-serif">
                  {val.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────────── */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full border border-primary-200 mb-4">
              ⭐ What People Say
            </span>
            <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-4">
              Stories from Our Customers
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-6 rounded-2xl bg-neutral-50 border border-primary-100 hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-xl"
                    style={{
                      background: "linear-gradient(135deg, #faf5ff, #fdf2f8)",
                    }}
                  >
                    {t.emoji}
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array(5)
                    .fill(0)
                    .map((_, j) => (
                      <FaStar key={j} className="w-3.5 h-3.5 text-accent-500" />
                    ))}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed italic">
                  "{t.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team Note ─────────────────────────────────────────── */}
      <section
        className="px-6 py-16"
        style={{ background: "linear-gradient(to bottom, #faf5ff, #fdf2f8)" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-3xl p-10 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #ec4899 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10">
              <div className="text-5xl mb-5">🎁</div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Be Part of the EasyGifting Story
              </h2>
              <p className="text-white/80 text-lg mb-3 max-w-2xl mx-auto leading-relaxed">
                Every gift you send with us adds a chapter to this story.
                Whether it's for your team, your family, or someone you love —
                we're here to make it unforgettable.
              </p>
              <p className="text-white/60 text-sm mb-8">
                📍 Secunderabad, Telangana · 🚚 Pan India Delivery · 📞 +91
                9000328100
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-3 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <FaGift className="w-4 h-4" /> Explore Gifts
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-3 rounded-2xl border border-white/30 hover:bg-white/30 transition-all hover:-translate-y-0.5"
                >
                  <FaPhone className="w-4 h-4" /> Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
