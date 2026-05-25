import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaGift,
  FaQuoteRight,
  FaClock,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import { posts } from "../data/blogData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

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
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center mx-auto mb-5">
            <FaGift className="w-6 h-6 text-white" />
          </div>
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">
            The Easy Gifting Blog
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Ideas That Make Every Gift{" "}
            <span className="text-pink-300">Unforgettable</span>
          </h1>
          <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Discover tips, stories, and inspiration to help you give better,
            more thoughtful gifts — every time.
          </p>
        </motion.div>
      </header>

      {/* ─── Blog Grid ────────────────────────────────────────── */}
      <section className="px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-serif font-bold text-neutral-900">
                Latest Stories
              </h2>
              <p className="text-neutral-400 text-sm mt-1">
                {posts.length} articles
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden bg-white border border-primary-100 shadow-soft group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                {/* Cover image */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://placehold.co/600x400/7c3aed/ffffff?text=${encodeURIComponent(post.category)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white bg-black/40 backdrop-blur-sm flex items-center gap-1">
                      <FaClock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-3">
                    <FaCalendarAlt className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 font-serif leading-snug group-hover:text-primary-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-5">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-800 transition-colors group/btn"
                    >
                      Read full story
                      <FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <button className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center text-primary-400 hover:text-pink-500 hover:bg-pink-50 transition-all">
                      <FaHeart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quote section ────────────────────────────────────── */}
      <section
        className="px-6 py-16 relative overflow-hidden"
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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center mx-auto mb-6">
            <FaQuoteRight className="w-5 h-5 text-white" />
          </div>
          <p className="text-white text-xl md:text-2xl font-serif italic leading-relaxed mb-6">
            "The best gifts are not always the most expensive. They are the ones
            that clearly say, 'I was thinking of you.'"
          </p>
          <div className="w-12 h-0.5 bg-white/30 mx-auto mb-4" />
          <p className="text-white/60 text-sm">
            At Easy Gifting, we believe in the power of small, meaningful
            gestures that make big emotional impact.
          </p>
        </motion.div>
      </section>

      {/* ─── Newsletter CTA ───────────────────────────────────── */}
      <section className="px-6 py-16 bg-white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto rounded-3xl p-8 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)",
            border: "1px solid #e9d5ff",
          }}
        >
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #a855f7, transparent)",
            }}
          />
          <div className="relative z-10">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              }}
            >
              <FaGift className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-2">
              Never Miss a Gifting Idea
            </h2>
            <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
              Subscribe to our newsletter and get fresh blog updates, curated
              gift guides, and exclusive offers every week.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-3 px-6 rounded-2xl bg-green-50 border border-green-200 text-green-700 font-semibold text-sm"
              >
                ✅ You're subscribed! Welcome to the Easy Gifting family.
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm transition-all"
                />
                <button
                  onClick={handleSubscribe}
                  className="py-2.5 px-6 rounded-xl text-white font-bold text-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  }}
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
