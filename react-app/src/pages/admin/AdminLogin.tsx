import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { loginAdmin } from "@/api/authService";
import {
  FaEnvelope,
  FaLock,
  FaGift,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaShieldAlt,
} from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@easygifting.com");
  const [password, setPassword] = useState("EasyGifting@123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await loginAdmin({ email, password });
      localStorage.setItem("easygifting_token", response.data.token);
      localStorage.setItem("easygifting_admin", JSON.stringify(response.data));
      navigate("/admin/dashboard");
      toast.success("Welcome back, admin!");
    } catch (error) {
      toast.error("Unable to log in. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 font-sans relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #3b0764 0%, #6d28d9 40%, #a855f7 70%, #ec4899 100%)",
      }}
    >
      {/* ─── Background decorations ───────────────────────────── */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #c084fc, transparent)" }}
      />
      <div
        className="absolute -bottom-24 -right-12 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #f472b6, transparent)" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
      />

      {/* ─── Card ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo mark */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mb-4 shadow-lg backdrop-blur-sm"
          >
            <FaGift className="w-7 h-7 text-white" />
          </motion.div>
          <h1 className="text-white text-2xl font-bold font-serif">
            EasyGifting
          </h1>
          <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mt-1">
            Admin Portal
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.25)] overflow-hidden border border-white/20">
          {/* Card top accent */}
          <div
            className="h-1.5 w-full"
            style={{
              background:
                "linear-gradient(to right, #7c3aed, #a855f7, #ec4899)",
            }}
          />

          <div className="px-8 py-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-4">
                <FaShieldAlt className="w-3 h-3 text-primary-600" />
                <span className="text-xs font-semibold text-primary-700">
                  Secure Access
                </span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-neutral-900">
                Welcome Back
              </h2>
              <p className="text-neutral-400 text-sm mt-1.5">
                Sign in to manage your store
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #faf5ff, #fdf2f8)",
                    }}
                  >
                    <FaEnvelope className="w-3.5 h-3.5 text-primary-600" />
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="admin@easygifting.com"
                    className="w-full pl-14 pr-4 py-3.5 rounded-xl border border-primary-200 bg-primary-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #faf5ff, #fdf2f8)",
                    }}
                  >
                    <FaLock className="w-3.5 h-3.5 text-primary-600" />
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-14 pr-12 py-3.5 rounded-xl border border-primary-200 bg-primary-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-600 transition-colors"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-4 h-4" />
                    ) : (
                      <FaEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
                }}
              >
                {loading ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaShieldAlt className="w-4 h-4" />
                    Sign In to Admin Panel
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-xs text-neutral-400 mt-6">
              Restricted to authorized administrators only.
            </p>
          </div>
        </div>

        {/* Bottom tag */}
        <p className="text-center text-white/30 text-xs mt-6">
          © 2026 EasyGifting · Corporate Gift Solutions
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
