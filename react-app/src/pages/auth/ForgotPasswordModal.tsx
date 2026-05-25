import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "react-toastify";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// ── Types ──────────────────────────────────────────────────────────────────
type Step = "email" | "otp" | "reset" | "done";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Shared components ──────────────────────────────────────────────────────
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-semibold text-neutral-700 mb-2">
    {children}
  </label>
);

const InputBase = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="relative">
    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-3.5 h-3.5">
      {icon}
    </div>
    {children}
  </div>
);

const inputClass =
  "w-full pl-10 pr-4 py-3 rounded-xl border border-primary-200 bg-primary-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all";

const GradientBtn = ({
  onClick,
  disabled,
  loading,
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type={onClick ? "button" : "submit"}
    onClick={onClick}
    disabled={disabled || loading}
    className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:hover:translate-y-0"
    style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
  >
    {loading ? (
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    ) : (
      children
    )}
  </button>
);

// ── Step 1: Enter Email ────────────────────────────────────────────────────
const StepEmail = ({ onNext }: { onNext: (email: string) => void }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success("OTP sent to your email");
        onNext(email.trim().toLowerCase());
      } else {
        toast.error(
          data.message || "Email not found. Please check and try again.",
        );
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Allow Enter key to submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Email Address</Label>
        <InputBase icon={<FaEnvelope />}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="your@email.com"
            className={inputClass}
          />
        </InputBase>
      </div>
      <GradientBtn onClick={handleSubmit} loading={loading}>
        Send OTP <FaArrowRight className="w-3 h-3" />
      </GradientBtn>
    </div>
  );
};

// ── Step 2: Enter OTP ──────────────────────────────────────────────────────
const StepOTP = ({
  email,
  onNext,
  onBack,
}: {
  email: string;
  onNext: (otp: string) => void;
  onBack: () => void;
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const refs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    setTimer(30);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const resendOTP = async () => {
    try {
      await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      toast.success("OTP resent!");
      startTimer();
      setOtp(Array(6).fill(""));
      refs.current[0]?.focus();
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const next = [...otp];
    pasted.split("").forEach((ch, i) => {
      next[i] = ch;
    });
    setOtp(next);
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const verify = () => {
    const code = otp.join("");
    if (code.length < 6) {
      toast.error("Enter all 6 digits");
      return;
    }
    onNext(code);
  };

  return (
    <div className="space-y-4">
      <div className="text-center p-4 rounded-2xl bg-primary-50 border border-primary-100">
        <p className="text-sm text-neutral-500">
          OTP sent to{" "}
          <span className="font-semibold text-primary-700">{email}</span>
        </p>
      </div>

      <div>
        <Label>Enter 6-digit OTP</Label>
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-10 h-12 text-center text-lg font-bold rounded-xl border-2 bg-primary-50 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all ${
                digit
                  ? "border-primary-500 bg-primary-100"
                  : "border-primary-200"
              }`}
            />
          ))}
        </div>
      </div>

      <GradientBtn onClick={verify} disabled={otp.join("").length < 6}>
        Verify OTP <FaArrowRight className="w-3 h-3" />
      </GradientBtn>

      <div className="text-center">
        {timer > 0 ? (
          <p className="text-xs text-neutral-500">
            Resend in{" "}
            <span className="font-semibold text-primary-600">{timer}s</span>
          </p>
        ) : (
          <button
            onClick={resendOTP}
            className="text-xs text-primary-600 font-semibold hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>

      <button
        onClick={onBack}
        className="w-full py-2.5 rounded-xl border border-neutral-200 text-neutral-600 text-sm font-semibold hover:bg-neutral-50 transition-colors"
      >
        ← Back
      </button>
    </div>
  );
};

// ── Step 3: New Password ───────────────────────────────────────────────────
const StepReset = ({
  email,
  otp,
  onDone,
  onBack,
}: {
  email: string;
  otp: string;
  onDone: () => void;
  onBack: () => void;
}) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength =
    password.length === 0
      ? 0
      : password.length < 6
        ? 1
        : password.length < 10
          ? 2
          : 3;
  const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-green-400"][
    strength
  ];
  const strengthLabel = ["", "Weak", "Fair", "Strong"][strength];

  const handleSubmit = async () => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        onDone();
      } else {
        toast.error(data.message || "Failed to reset password. Try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* New password */}
      <div>
        <Label>New Password</Label>
        <div className="relative">
          <FaShieldAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            placeholder="Min 6 characters"
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-primary-200 bg-primary-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPass((p) => !p)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            {showPass ? (
              <FaEyeSlash className="w-3.5 h-3.5" />
            ) : (
              <FaEye className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
        {/* Strength bar */}
        {password.length > 0 && (
          <div className="mt-2 space-y-1">
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= strength ? strengthColor : "bg-neutral-200"}`}
                />
              ))}
            </div>
            <p
              className={`text-xs font-medium ${strength === 1 ? "text-red-500" : strength === 2 ? "text-yellow-600" : "text-green-600"}`}
            >
              {strengthLabel}
            </p>
          </div>
        )}
      </div>

      {/* Confirm password */}
      <div>
        <Label>Confirm Password</Label>
        <div className="relative">
          <FaShieldAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
          <input
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            placeholder="Re-enter password"
            className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all ${
              confirm && confirm !== password
                ? "border-red-300 bg-red-50 focus:ring-red-200"
                : confirm && confirm === password
                  ? "border-green-400 bg-green-50 focus:ring-green-200"
                  : "border-primary-200 bg-primary-50 focus:ring-primary-400"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((p) => !p)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            {showConfirm ? (
              <FaEyeSlash className="w-3.5 h-3.5" />
            ) : (
              <FaEye className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
        {confirm && confirm !== password && (
          <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
        )}
        {confirm && confirm === password && (
          <p className="text-xs text-green-600 mt-1">✓ Passwords match</p>
        )}
      </div>

      <GradientBtn
        onClick={handleSubmit}
        loading={loading}
        disabled={password !== confirm || password.length < 6}
      >
        Reset Password <FaArrowRight className="w-3 h-3" />
      </GradientBtn>

      <button
        type="button"
        onClick={onBack}
        className="w-full py-2.5 rounded-xl border border-neutral-200 text-neutral-600 text-sm font-semibold hover:bg-neutral-50 transition-colors"
      >
        ← Back
      </button>
    </div>
  );
};

// ── Step 4: Done ───────────────────────────────────────────────────────────
const StepDone = ({ onClose }: { onClose: () => void }) => (
  <div className="text-center space-y-4 py-4">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto"
    >
      <FaCheckCircle className="w-10 h-10 text-green-500" />
    </motion.div>
    <div>
      <h3 className="font-bold text-lg text-neutral-900">Password Reset!</h3>
      <p className="text-sm text-neutral-500 mt-1">
        Your password has been updated successfully.
      </p>
    </div>
    <button
      onClick={onClose}
      className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
    >
      Back to Login
    </button>
  </div>
);

// ── Step config ────────────────────────────────────────────────────────────
const STEPS: Record<Step, { label: string; desc: string }> = {
  email: {
    label: "Forgot Password?",
    desc: "Enter your email to receive an OTP",
  },
  otp: { label: "Verify OTP", desc: "Check your email for the 6-digit code" },
  reset: { label: "Set New Password", desc: "Choose a strong new password" },
  done: { label: "All Done!", desc: "" },
};

const STEP_ORDER: Step[] = ["email", "otp", "reset", "done"];

// ── Main Modal ─────────────────────────────────────────────────────────────
export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("email");
        setEmail("");
        setOtpCode("");
      }, 300);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const stepIndex = STEP_ORDER.indexOf(step);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto">
              {/* Header */}
              <div
                className="relative p-6 text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #581c87, #7c3aed, #ec4899)",
                }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <FaTimes className="w-3.5 h-3.5" />
                </button>

                <h2 className="font-serif text-xl font-bold pr-10">
                  {STEPS[step].label}
                </h2>
                {STEPS[step].desc && (
                  <p className="text-white/70 text-sm mt-1">
                    {STEPS[step].desc}
                  </p>
                )}

                {/* Progress dots — only show for steps 0–2 */}
                {step !== "done" && (
                  <div className="flex items-center gap-2 mt-4">
                    {STEP_ORDER.slice(0, 3).map((s, i) => (
                      <React.Fragment key={s}>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            i === stepIndex
                              ? "bg-white text-purple-700 scale-110"
                              : i < stepIndex
                                ? "bg-green-400 text-white"
                                : "bg-white/25 text-white"
                          }`}
                        >
                          {i < stepIndex ? "✓" : i + 1}
                        </div>
                        {i < 2 && (
                          <div
                            className={`flex-1 h-0.5 rounded-full transition-colors duration-500 ${i < stepIndex ? "bg-green-400" : "bg-white/25"}`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step === "email" && (
                      <StepEmail
                        onNext={(e) => {
                          setEmail(e);
                          setStep("otp");
                        }}
                      />
                    )}
                    {step === "otp" && (
                      <StepOTP
                        email={email}
                        onNext={(code) => {
                          setOtpCode(code);
                          setStep("reset");
                        }}
                        onBack={() => setStep("email")}
                      />
                    )}
                    {step === "reset" && (
                      <StepReset
                        email={email}
                        otp={otpCode}
                        onDone={() => setStep("done")}
                        onBack={() => setStep("otp")}
                      />
                    )}
                    {step === "done" && <StepDone onClose={onClose} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;
