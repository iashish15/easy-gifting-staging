// src/pages/BlogPost.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaClock,
  FaCalendarAlt,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";
import { posts } from "../data/blogData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === id);
  const related = posts.filter((p) => p.id !== id).slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center pt-20">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-xl font-semibold text-neutral-700 mb-2">
          Post not found
        </p>
        <Link
          to="/blog"
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
        >
          <FaArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      {/* ─── Hero Banner ──────────────────────────────────────── */}
      <header
        className="relative overflow-hidden pt-24 pb-10 px-6 text-white"
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

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors group"
          >
            <FaArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>

          {/* Category badge */}
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            {post.category}
          </span>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <div className="flex items-center gap-1.5">
              <FaCalendarAlt className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaClock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Cover Image ──────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden shadow-xl border border-primary-100"
        >
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://placehold.co/800x400/7c3aed/ffffff?text=${encodeURIComponent(post.category)}`;
            }}
          />
        </motion.div>
      </div>

      {/* ─── Article Body ─────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl border border-primary-100 shadow-soft overflow-hidden"
        >
          {/* Intro */}
          <div className="px-8 pt-8 pb-6 border-b border-neutral-50">
            <p className="text-neutral-700 text-base leading-relaxed font-medium">
              {post.content.intro}
            </p>
          </div>

          {/* Sections */}
          <div className="px-8 py-6 space-y-8">
            {post.content.sections.map((section, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Section heading with gradient left bar */}
                <div className="flex gap-4 mb-3">
                  <div
                    className="w-1 rounded-full flex-shrink-0 mt-1"
                    style={{
                      background:
                        "linear-gradient(to bottom, #7c3aed, #ec4899)",
                      minHeight: 24,
                    }}
                  />
                  <h2 className="text-lg font-bold text-neutral-900 font-serif leading-snug">
                    {section.heading}
                  </h2>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed pl-5">
                  {section.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Conclusion */}
          <div
            className="mx-6 mb-8 p-6 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #faf5ff, #fdf2f8)",
              border: "1px solid #e9d5ff",
            }}
          >
            <p className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-2">
              Final Thoughts
            </p>
            <p className="text-neutral-700 text-sm leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>
        </motion.div>

        {/* ─── WhatsApp CTA ─────────────────────────────────── */}
        <motion.a
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          href="https://wa.me/919000328100?text=Hi! I read your blog and would love to know more about gifting options."
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 border-green-200 text-green-700 bg-green-50 hover:bg-green-100"
        >
          <FaWhatsapp className="w-5 h-5" />
          Enquire about gifting on WhatsApp
        </motion.a>

        {/* ─── Related Posts ────────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-serif font-bold text-neutral-900 mb-6">
              More Stories
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.id}`}
                  className="rounded-2xl overflow-hidden bg-white border border-primary-100 shadow-soft group hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={p.cover}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://placehold.co/400x200/7c3aed/ffffff?text=${encodeURIComponent(p.category)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span
                      className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                      }}
                    >
                      {p.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-neutral-900 font-serif leading-snug mb-1 group-hover:text-primary-700 transition-colors">
                      {p.title}
                    </h4>
                    <div className="flex items-center gap-1 text-primary-600 text-xs font-semibold mt-2">
                      Read story{" "}
                      <FaArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
