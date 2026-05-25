import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPaperPlane,
  FaClock,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const contactInfo = [
  {
    icon: FaPhone,
    label: "Phone",
    value: "+91 9000328100",
    href: "tel:+919000328100",
    color: "from-primary-600 to-primary-400",
    bg: "bg-primary-50",
    border: "border-primary-100",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "info@easygifting.in",
    href: "mailto:info@easygifting.in",
    color: "from-secondary-600 to-secondary-400",
    bg: "bg-secondary-50",
    border: "border-secondary-100",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+91 9000328100",
    href: "https://wa.me/919000328100",
    color: "from-green-600 to-green-400",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: FaClock,
    label: "Business Hours",
    value: "Mon–Sat: 9AM – 7PM",
    href: null,
    color: "from-accent-600 to-accent-400",
    bg: "bg-accent-50",
    border: "border-accent-100",
  },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbxY7BwoYYoIQUFBi4BeAFouTfm586Ct77HwD-jNaT_g/exec";

    try {
      await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ─── Hero Section ──────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 px-4"
        style={{
          background:
            "linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #ec4899 100%)",
        }}
      >
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

        <motion.div
          className="absolute top-16 left-[10%] text-3xl opacity-40"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          📞
        </motion.div>
        <motion.div
          className="absolute top-20 right-[12%] text-2xl opacity-40"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          💌
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-[15%] text-2xl opacity-30"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        >
          🎁
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-[10%] text-3xl opacity-30"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
        >
          ✨
        </motion.div>

        <div className="relative max-w-4xl mx-auto text-center text-white z-10">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2 rounded-full border border-white/30 mb-6"
          >
            📞 Get In Touch
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6"
          >
            Contact <span className="text-accent-300">Us</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto"
          >
            Have a question or need help finding the perfect gift? We'd love to
            hear from you. Reach out and we'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ─── Contact Info Cards ────────────────────────────────── */}
      <section
        className="py-16 px-4"
        style={{ background: "linear-gradient(to bottom, #faf5ff, #fdf2f8)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className={`flex flex-col items-center text-center p-6 rounded-2xl ${info.bg} border ${info.border} hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 group block`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      <info.icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                      {info.label}
                    </p>
                    <p className="font-semibold text-neutral-800 text-sm">
                      {info.value}
                    </p>
                  </a>
                ) : (
                  <div
                    className={`flex flex-col items-center text-center p-6 rounded-2xl ${info.bg} border ${info.border} hover:shadow-luxury transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 text-white`}
                    >
                      <info.icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                      {info.label}
                    </p>
                    <p className="font-semibold text-neutral-800 text-sm">
                      {info.value}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Form + Address Section ────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-soft border border-primary-100"
          >
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
              Send Us a Message
            </h2>
            <p className="text-neutral-500 text-sm mb-8">
              Fill out the form below and we'll get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-primary-200 rounded-xl bg-primary-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-primary-200 rounded-xl bg-primary-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 border border-primary-200 rounded-xl bg-primary-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your gifting needs..."
                  className="w-full px-4 py-3 border border-primary-200 rounded-xl bg-primary-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-sm resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-6 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
                }}
              >
                {status === "loading" ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium text-center"
                >
                  ✅ Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium text-center"
                >
                  ❌ Something went wrong. Please try WhatsApp or call us
                  directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Address + Map */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="flex flex-col gap-6"
          >
            <div className="bg-primary-50 rounded-3xl p-8 border border-primary-100">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                }}
              >
                <FaMapMarkerAlt className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-neutral-900 mb-3">
                Our Office
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm">
                Plot No.15C, House no.27/16/22-15c,
                <br />
                RamBrahamanagar, Neredmet,
                <br />
                Secunderabad - 500056,
                <br />
                Telangana, India
              </p>

              <div className="mt-6 pt-6 border-t border-primary-200 space-y-3">
                <a
                  href="tel:+919000328100"
                  className="flex items-center gap-3 text-neutral-600 hover:text-primary-600 transition-colors text-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <FaPhone className="w-3 h-3 text-primary-600" />
                  </div>
                  +91 9000328100
                </a>
                <a
                  href="mailto:info@easygifting.in"
                  className="flex items-center gap-3 text-neutral-600 hover:text-primary-600 transition-colors text-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <FaEnvelope className="w-3 h-3 text-primary-600" />
                  </div>
                  info@easygifting.in
                </a>
                <a
                  href="https://wa.me/919000328100"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-neutral-600 hover:text-green-600 transition-colors text-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <FaWhatsapp className="w-3 h-3 text-green-600" />
                  </div>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-soft border border-primary-100 flex-1 min-h-[250px]">
              <iframe
                className="w-full h-full min-h-[250px]"
                title="EasyGifting Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.571013111025!2d78.53423407369168!3d17.480234900126636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9b099cf79317%3A0xbf30dc9b61208dde!2s500056%2C%20Neredmet%201st%20Main%20Rd%2C%20Sri%20colony%2C%20A.%20S.%20Rao%20Nagar%2C%20Secunderabad%2C%20Telangana%20500056!5e0!3m2!1sen!2sin!4v1725530665746!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </motion.div>
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
              <div className="text-5xl mb-4">💬</div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Need Bulk or Corporate Gifting?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                For orders of 50+ pieces, custom branding, or corporate gifting
                solutions — connect with us directly on WhatsApp for the fastest
                response.
              </p>
              <a
                href="https://wa.me/919000328100?text=Hi%2C%20I%20need%20help%20with%20corporate%20gifting."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
