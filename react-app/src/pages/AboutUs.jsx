import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaShieldAlt,
  FaUsers,
  FaGift,
  FaStar,
  FaHeart,
  FaTruck,
  FaAward,
} from "react-icons/fa";

const stats = [
  { number: "2+", label: "Years Experience" },
  { number: "500+", label: "Happy Clients" },
  { number: "10K+", label: "Gifts Delivered" },
  { number: "100%", label: "Satisfaction" },
];

const values = [
  {
    icon: FaShieldAlt,
    title: "Quality",
    description:
      "We source only the finest products that reflect our clients' brands and values. Every gift is handpicked for premium quality.",
    color: "from-primary-600 to-primary-400",
    bg: "bg-primary-50",
  },
  {
    icon: FaLightbulb,
    title: "Creativity",
    description:
      "We strive to bring innovative ideas and solutions to the table — from unique packaging to personalised touches.",
    color: "from-secondary-600 to-secondary-400",
    bg: "bg-secondary-50",
  },
  {
    icon: FaUsers,
    title: "Service",
    description:
      "We deliver exceptional customer experiences through personalised support and meticulous attention to every detail.",
    color: "from-accent-600 to-accent-400",
    bg: "bg-accent-50",
  },
  {
    icon: FaTruck,
    title: "Reliability",
    description:
      "On-time delivery, every time. We ensure your gifts reach the right hands at the right moment, across India.",
    color: "from-primary-700 to-secondary-500",
    bg: "bg-primary-50",
  },
];

const team = [
  {
    name: "Gifting Experts",
    role: "Curate perfect gifts",
    emoji: "🎁",
  },
  {
    name: "Design Team",
    role: "Beautiful packaging",
    emoji: "✨",
  },
  {
    name: "Delivery Partners",
    role: "Pan-India delivery",
    emoji: "🚚",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white font-sans dark:bg-neutral-900">
      {/* ─── Hero Section ──────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 px-4"
        style={{
          background:
            "linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #ec4899 100%)",
        }}
      >
        {/* Background blobs */}
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #fff 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #facc15 0%, transparent 70%)",
            transform: "translate(50%, 50%)",
          }}
        />

        {/* Floating emojis */}
        <motion.div
          className="absolute top-16 left-[10%] text-3xl opacity-40"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎁
        </motion.div>
        <motion.div
          className="absolute top-20 right-[12%] text-2xl opacity-40"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-[15%] text-2xl opacity-30"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        >
          🎀
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-[10%] text-3xl opacity-30"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
        >
          💝
        </motion.div>

        <div className="relative max-w-4xl mx-auto text-center text-white z-10">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2 rounded-full border border-white/30 mb-6"
          >
            🎁 Our Story
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6"
          >
            About <span className="text-accent-300">EasyGifting</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto"
          >
            Your premier partner for customised corporate gifts and thoughtful
            business solutions. With 2+ years of experience, we've helped
            countless businesses build meaningful relationships and leave a
            lasting impression.
          </motion.p>
        </div>
      </section>

      {/* ─── Stats Section ─────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="text-center p-6 rounded-2xl border border-primary-100 bg-primary-50 hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 dark:border-neutral-700 bg-primary-50 dark:bg-neutral-800"
              >
                <div className="font-serif text-4xl font-bold bg-gradient-to-r from-primary-700 to-secondary-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-neutral-600 dark:text-neutral-300 text-sm font-medium mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Vision & Mission ──────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ background: "linear-gradient(to bottom, #faf5ff, #fdf2f8)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Vision */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-soft border border-primary-100 hover:shadow-luxury transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                }}
              >
                <FaLightbulb className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-4">
                Our Vision
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                To help businesses build stronger relationships, foster loyalty,
                and drive success through the art of gifting. We believe every
                gift tells a story — and we help you tell yours beautifully.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="bg-white rounded-3xl p-8 shadow-soft border border-secondary-100 hover:shadow-luxury transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white"
                style={{
                  background: "linear-gradient(135deg, #ec4899, #f472b6)",
                }}
              >
                <FaHeart className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-4">
                Our Mission
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                To deliver premium, personalised gifting experiences that
                strengthen bonds between businesses and their clients,
                employees, and partners — one thoughtful gift at a time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Values Section ────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full border border-primary-200 mb-4">
              What We Stand For
            </span>
            <h2 className="font-serif text-4xl font-bold text-neutral-900">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`${value.bg} rounded-3xl p-7 border border-white hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-5 text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team Section ──────────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ background: "linear-gradient(to bottom, #faf5ff, #fdf2f8)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block bg-secondary-50 text-secondary-700 text-sm font-semibold px-4 py-2 rounded-full border border-secondary-200 mb-4">
              The People Behind EasyGifting
            </span>
            <h2 className="font-serif text-4xl font-bold text-neutral-900">
              Who We Are
            </h2>
            <p className="text-neutral-500 mt-4 max-w-xl mx-auto">
              A passionate team dedicated to making every gifting experience
              memorable, meaningful, and effortless.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-white rounded-3xl p-8 text-center shadow-soft border border-primary-100 hover:shadow-luxury transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="font-serif text-lg font-bold text-neutral-900">
                  {member.name}
                </h3>
                <p className="text-neutral-500 text-sm mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ───────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-3xl p-12 text-center text-white relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #ec4899 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            <div className="relative z-10">
              <div className="text-5xl mb-4">🎁</div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Ready to Create Memorable Gifts?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Let's work together to craft the perfect gifting experience for
                your business, team, or loved ones.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/shop"
                  className="bg-white text-primary-700 font-bold px-8 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Explore Gifts
                </a>
                <a
                  href="/contact"
                  className="bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-3 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
