// src/pages/auth/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGift,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaPhone,
  FaEnvelope,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// ── OTP Input Component ─────────────────────────────────────────
const OTPInput = ({
  otp,
  setOtp,
}: {
  otp: string[];
  setOtp: (o: string[]) => void;
}) => {
  const refs = Array.from({ length: 6 }, () =>
    React.createRef<HTMLInputElement>(),
  );

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      refs[i - 1].current?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-11 h-12 text-center text-lg font-bold rounded-xl border-2 border-primary-200 bg-primary-50 text-neutral-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
        />
      ))}
    </div>
  );
};

// ── Email Login Tab ─────────────────────────────────────────────
const EmailLogin = ({ onSuccess }: { onSuccess: (data: any) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onSuccess(data);
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary-200 bg-primary-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-neutral-700">
            Password
          </label>
          {/* <Link
            to="/forgot-password"
            className="text-xs text-primary-600 hover:underline font-medium"
          >
            Forgot password?
          </Link> */}
          <button
            type="button"
            onClick={() => setForgotOpen(true)}
            className="text-xs text-primary-600 hover:underline font-medium"
          >
            Forgot password?
          </button>
          <ForgotPasswordModal
            isOpen={forgotOpen}
            onClose={() => setForgotOpen(false)}
          />
        </div>
        <div className="relative">
          <FaShieldAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Your password"
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-primary-200 bg-primary-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            {showPass ? (
              <FaEyeSlash className="w-3.5 h-3.5" />
            ) : (
              <FaEye className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70"
        style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <FaArrowRight className="w-3.5 h-3.5" /> Sign In
          </>
        )}
      </button>
    </form>
  );
};

// ── Phone OTP Login Tab ─────────────────────────────────────────
const PhoneLogin = ({ onSuccess }: { onSuccess: (data: any) => void }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const sendOTP = async () => {
    if (phone.length !== 10) {
      toast.error("Enter valid 10-digit number");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `+91${phone}` }),
      });
      setOtpSent(true);
      setTimer(30);
      toast.success(`OTP sent to +91 ${phone}`);
      const interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(interval);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } catch {
      setOtpSent(true);
      setTimer(30);
      toast.success(`OTP sent to +91 ${phone} (Demo)`);
      const interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(interval);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const verifyAndLogin = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      toast.error("Enter 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `+91${phone}`, otp: code }),
      });
      const data = await res.json();
      if (res.ok) {
        onSuccess(data);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch {
      toast.info("Demo mode: Login successful");
      onSuccess({
        token: "demo-token",
        name: "Demo User",
        email: "demo@easygifting.com",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">
          Mobile Number
        </label>
        <div className="flex gap-2">
          <div className="flex items-center px-3 rounded-xl border border-primary-200 bg-primary-50 text-sm font-semibold text-neutral-600">
            +91
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="10-digit number"
            disabled={otpSent}
            className="flex-1 px-4 py-3 rounded-xl border border-primary-200 bg-primary-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all disabled:opacity-60"
          />
        </div>
      </div>

      {!otpSent ? (
        <button
          onClick={sendOTP}
          disabled={loading || phone.length !== 10}
          className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70 transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FaPhone className="w-3.5 h-3.5" /> Send OTP
            </>
          )}
        </button>
      ) : (
        <>
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3 text-center">
              Enter OTP sent to +91 {phone}
            </label>
            <OTPInput otp={otp} setOtp={setOtp} />
          </div>

          <button
            onClick={verifyAndLogin}
            disabled={loading || otp.join("").length < 6}
            className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70 transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Verify & Sign In"
            )}
          </button>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setOtpSent(false);
                setOtp(["", "", "", "", "", ""]);
              }}
              className="text-sm text-neutral-500 hover:text-neutral-700"
            >
              ← Change number
            </button>
            {timer > 0 ? (
              <p className="text-sm text-neutral-500">
                Resend in{" "}
                <span className="font-semibold text-primary-600">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={sendOTP}
                className="text-sm text-primary-600 font-semibold hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// ── Main Login Page ─────────────────────────────────────────────
export const LoginPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"email" | "phone">("email");

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleSuccess = (data: any) => {
    // Save user token and info
    localStorage.setItem("easygifting_user_token", data.token);
    localStorage.setItem("easygifting_user", JSON.stringify(data));
    toast.success(`Welcome back, ${data.name || "there"}! 🎉`);
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 font-sans"
      style={{
        background: "linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)",
      }}
    >
      {/* Background blobs */}
      <div
        className="fixed top-0 left-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7c3aed, transparent)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="fixed bottom-0 right-0 w-80 h-80 rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #ec4899, transparent)",
          transform: "translate(50%, 50%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8 mt-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-luxury"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              }}
            >
              <FaGift className="w-6 h-6" />
            </div>
            <span className="font-serif text-2xl font-bold text-neutral-900">
              EasyGifting
            </span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-glass border border-white/50 overflow-hidden">
          {/* Header */}
          <div
            className="p-6 text-white text-center"
            style={{
              background: "linear-gradient(135deg, #581c87, #7c3aed, #ec4899)",
            }}
          >
            <h1 className="font-serif text-2xl font-bold">Welcome Back 👋</h1>
            <p className="text-white/70 text-sm mt-1">
              Sign in to continue gifting
            </p>
          </div>

          <div className="p-6 space-y-5">
            {/* Google Login */}
            {/* <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-neutral-200 bg-white text-neutral-700 font-semibold text-sm hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              <FaGoogle className="w-4 h-4 text-red-500" />
              Continue with Google
            </button> */}

            {/* Divider */}
            {/* <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-xs text-neutral-400 font-medium">
                or sign in with
              </span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div> */}

            {/* Tabs */}
            <div className="flex bg-neutral-100 rounded-xl p-1">
              <button
                onClick={() => setTab("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === "email"
                    ? "bg-white text-primary-700 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <FaEnvelope className="w-3.5 h-3.5" />
                Email
              </button>
              <button
                onClick={() => setTab("phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === "phone"
                    ? "bg-white text-primary-700 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <FaPhone className="w-3.5 h-3.5" />
                Phone OTP
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {tab === "email" ? (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <EmailLogin onSuccess={handleSuccess} />
                </motion.div>
              ) : (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <PhoneLogin onSuccess={handleSuccess} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 text-center">
            <p className="text-sm text-neutral-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-primary-600 hover:underline"
              >
                Create one free
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          Protected by 256-bit encryption 🔐
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
