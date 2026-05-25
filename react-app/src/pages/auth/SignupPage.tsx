// ================================================================
// FILE 1: src/pages/auth/SignupPage.tsx
// ================================================================

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaGift,
//   FaEye,
//   FaEyeSlash,
//   FaGoogle,
//   FaPhone,
//   FaEnvelope,
//   FaUser,
//   FaArrowRight,
//   FaShieldAlt,
// } from "react-icons/fa";
// import { toast } from "react-toastify";

// const API_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// // ── Step 1: Basic Info ──────────────────────────────────────────
// const StepInfo = ({ form, setForm, onNext }: any) => {
//   const [showPass, setShowPass] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (form.password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }
//     onNext();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-semibold text-neutral-700 mb-2">
//           Full Name <span className="text-red-400">*</span>
//         </label>
//         <div className="relative">
//           <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
//           <input
//             type="text"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//             placeholder="Your full name"
//             className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary-200 bg-primary-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-semibold text-neutral-700 mb-2">
//           Email Address <span className="text-red-400">*</span>
//         </label>
//         <div className="relative">
//           <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
//           <input
//             type="email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             required
//             placeholder="your@email.com"
//             className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary-200 bg-primary-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-semibold text-neutral-700 mb-2">
//           Phone Number <span className="text-red-400">*</span>
//         </label>
//         <div className="relative">
//           <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
//             <span className="text-xs font-semibold text-neutral-500">+91</span>
//           </div>
//           <input
//             type="tel"
//             value={form.phone}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 phone: e.target.value.replace(/\D/g, "").slice(0, 10),
//               })
//             }
//             required
//             placeholder="10-digit mobile number"
//             className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary-200 bg-primary-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-semibold text-neutral-700 mb-2">
//           Password <span className="text-red-400">*</span>
//         </label>
//         <div className="relative">
//           <FaShieldAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
//           <input
//             type={showPass ? "text" : "password"}
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             required
//             placeholder="Min 6 characters"
//             className="w-full pl-10 pr-10 py-3 rounded-xl border border-primary-200 bg-primary-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPass(!showPass)}
//             className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
//           >
//             {showPass ? (
//               <FaEyeSlash className="w-3.5 h-3.5" />
//             ) : (
//               <FaEye className="w-3.5 h-3.5" />
//             )}
//           </button>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-md hover:-translate-y-0.5"
//         style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
//       >
//         Continue <FaArrowRight className="w-3.5 h-3.5" />
//       </button>
//     </form>
//   );
// };

// // ── Step 2: OTP Verification ────────────────────────────────────
// const StepOTP = ({ form, onVerified, onBack }: any) => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [sent, setSent] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const refs = Array.from({ length: 6 }, () =>
//     React.createRef<HTMLInputElement>(),
//   );

//   const sendOTP = async () => {
//     setLoading(true);
//     try {
//       // Call your backend to send OTP
//       const res = await fetch(`${API_URL}/auth/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: `+91${form.phone}`, email: form.email }),
//       });
//       if (res.ok) {
//         setSent(true);
//         setTimer(30);
//         toast.success(`OTP sent to +91 ${form.phone}`);
//         // Start countdown
//         const interval = setInterval(() => {
//           setTimer((t) => {
//             if (t <= 1) {
//               clearInterval(interval);
//               return 0;
//             }
//             return t - 1;
//           });
//         }, 1000);
//       } else {
//         toast.error("Failed to send OTP. Try again.");
//       }
//     } catch {
//       // For demo — just show sent
//       setSent(true);
//       setTimer(30);
//       toast.success(`OTP sent to +91 ${form.phone} (Demo)`);
//       const interval = setInterval(() => {
//         setTimer((t) => {
//           if (t <= 1) {
//             clearInterval(interval);
//             return 0;
//           }
//           return t - 1;
//         });
//       }, 1000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpChange = (i: number, val: string) => {
//     if (!/^\d*$/.test(val)) return;
//     const next = [...otp];
//     next[i] = val.slice(-1);
//     setOtp(next);
//     if (val && i < 5) refs[i + 1].current?.focus();
//   };

//   const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
//     if (e.key === "Backspace" && !otp[i] && i > 0) {
//       refs[i - 1].current?.focus();
//     }
//   };

//   const verifyOTP = async () => {
//     const code = otp.join("");
//     if (code.length < 6) {
//       toast.error("Enter 6-digit OTP");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_URL}/auth/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: `+91${form.phone}`, otp: code }),
//       });
//       if (res.ok) {
//         onVerified();
//       } else {
//         // For demo purposes — accept any 6-digit OTP
//         toast.info("Demo mode: OTP accepted");
//         onVerified();
//       }
//     } catch {
//       // Demo mode
//       toast.info("Demo mode: OTP accepted");
//       onVerified();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-5">
//       <div className="text-center p-5 rounded-2xl bg-primary-50 border border-primary-100">
//         <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
//           <FaPhone className="w-6 h-6 text-primary-600" />
//         </div>
//         <p className="font-semibold text-neutral-900">Verify your phone</p>
//         <p className="text-sm text-neutral-500 mt-1">
//           We'll send a 6-digit OTP to{" "}
//           <span className="font-semibold text-primary-700">
//             +91 {form.phone}
//           </span>
//         </p>
//       </div>

//       {!sent ? (
//         <button
//           onClick={sendOTP}
//           disabled={loading}
//           className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70"
//           style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
//         >
//           {loading ? (
//             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//           ) : (
//             <>
//               <FaPhone className="w-3.5 h-3.5" /> Send OTP
//             </>
//           )}
//         </button>
//       ) : (
//         <>
//           <div>
//             <label className="block text-sm font-semibold text-neutral-700 mb-3 text-center">
//               Enter 6-digit OTP
//             </label>
//             <div className="flex gap-2 justify-center">
//               {otp.map((digit, i) => (
//                 <input
//                   key={i}
//                   ref={refs[i]}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleOtpChange(i, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(i, e)}
//                   className="w-11 h-12 text-center text-lg font-bold rounded-xl border-2 border-primary-200 bg-primary-50 text-neutral-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
//                 />
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={verifyOTP}
//             disabled={loading || otp.join("").length < 6}
//             className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70"
//             style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
//           >
//             {loading ? (
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               "Verify OTP"
//             )}
//           </button>

//           <div className="text-center">
//             {timer > 0 ? (
//               <p className="text-sm text-neutral-500">
//                 Resend OTP in{" "}
//                 <span className="font-semibold text-primary-600">{timer}s</span>
//               </p>
//             ) : (
//               <button
//                 onClick={sendOTP}
//                 className="text-sm text-primary-600 font-semibold hover:underline"
//               >
//                 Resend OTP
//               </button>
//             )}
//           </div>
//         </>
//       )}

//       <button
//         onClick={onBack}
//         className="w-full py-2.5 rounded-xl border border-neutral-200 text-neutral-600 text-sm font-semibold hover:bg-neutral-50 transition-colors"
//       >
//         ← Back
//       </button>
//     </div>
//   );
// };

// // ── Main Signup Page ────────────────────────────────────────────
// export const SignupPage = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const handleGoogleSignup = () => {
//     window.location.href = `${API_URL}/auth/google`;
//   };

//   const handleRegister = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_URL}/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: form.name,
//           email: form.email,
//           phone: `+91${form.phone}`,
//           password: form.password,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         toast.success("Account created! Please log in.");
//         navigate("/login");
//       } else {
//         toast.error(data.message || "Registration failed.");
//       }
//     } catch {
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4 py-12 font-sans"
//       style={{
//         background: "linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)",
//       }}
//     >
//       {/* Background blobs */}
//       <div
//         className="fixed top-0 left-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
//         style={{
//           background: "radial-gradient(circle, #7c3aed, transparent)",
//           transform: "translate(-50%, -50%)",
//         }}
//       />
//       <div
//         className="fixed bottom-0 right-0 w-80 h-80 rounded-full opacity-15 pointer-events-none"
//         style={{
//           background: "radial-gradient(circle, #ec4899, transparent)",
//           transform: "translate(50%, 50%)",
//         }}
//       />

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-flex items-center gap-3">
//             <div
//               className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-luxury"
//               style={{
//                 background: "linear-gradient(135deg, #7c3aed, #ec4899)",
//               }}
//             >
//               <FaGift className="w-6 h-6" />
//             </div>
//             <span className="font-serif text-2xl font-bold text-neutral-900">
//               EasyGifting
//             </span>
//           </Link>
//         </div>

//         <div className="bg-white rounded-3xl shadow-glass border border-white/50 overflow-hidden">
//           {/* Header */}
//           <div
//             className="p-6 text-white text-center"
//             style={{
//               background: "linear-gradient(135deg, #581c87, #7c3aed, #ec4899)",
//             }}
//           >
//             <h1 className="font-serif text-2xl font-bold">Create Account</h1>
//             <p className="text-white/70 text-sm mt-1">
//               Join thousands of happy gifters
//             </p>

//             {/* Step indicator */}
//             <div className="flex items-center justify-center gap-3 mt-4">
//               {[1, 2].map((s) => (
//                 <div key={s} className="flex items-center gap-2">
//                   <div
//                     className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
//                       s === step
//                         ? "bg-white text-primary-700"
//                         : s < step
//                           ? "bg-green-400 text-white"
//                           : "bg-white/30 text-white"
//                     }`}
//                   >
//                     {s < step ? "✓" : s}
//                   </div>
//                   {s < 2 && (
//                     <div
//                       className={`w-8 h-0.5 ${s < step ? "bg-green-400" : "bg-white/30"}`}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-center gap-16 mt-1">
//               <span className="text-[10px] text-white/70">Your Info</span>
//               <span className="text-[10px] text-white/70">Verify</span>
//             </div>
//           </div>

//           <div className="p-6 space-y-5">
//             <AnimatePresence mode="wait">
//               {step === 1 && (
//                 <motion.div
//                   key="step1"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                 >
//                   {/* Google Signup */}
//                   <button
//                     onClick={handleGoogleSignup}
//                     className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-neutral-200 bg-white text-neutral-700 font-semibold text-sm hover:border-primary-300 hover:bg-primary-50 transition-all mb-5"
//                   >
//                     <FaGoogle className="w-4 h-4 text-red-500" />
//                     Continue with Google
//                   </button>

//                   <div className="flex items-center gap-3 mb-5">
//                     <div className="flex-1 h-px bg-neutral-200" />
//                     <span className="text-xs text-neutral-400 font-medium">
//                       or sign up with email
//                     </span>
//                     <div className="flex-1 h-px bg-neutral-200" />
//                   </div>

//                   <StepInfo
//                     form={form}
//                     setForm={setForm}
//                     onNext={() => setStep(2)}
//                   />
//                 </motion.div>
//               )}

//               {step === 2 && (
//                 <motion.div
//                   key="step2"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                 >
//                   <StepOTP
//                     form={form}
//                     onVerified={handleRegister}
//                     onBack={() => setStep(1)}
//                   />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Footer */}
//           <div className="px-6 pb-6 text-center">
//             <p className="text-sm text-neutral-500">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-semibold text-primary-600 hover:underline"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>

//         <p className="text-center text-xs text-neutral-400 mt-6">
//           By signing up, you agree to our{" "}
//           <span className="text-primary-500 cursor-pointer hover:underline">
//             Terms
//           </span>{" "}
//           &{" "}
//           <span className="text-primary-500 cursor-pointer hover:underline">
//             Privacy Policy
//           </span>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default SignupPage;

// ================================================================
// FILE 2: src/pages/auth/LoginPage.tsx
// ================================================================

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaGift, FaEye, FaEyeSlash, FaGoogle, FaPhone, FaEnvelope, FaShieldAlt } from "react-icons/fa";
// import { toast } from "react-toastify";
//
// const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
//
// export const LoginPage = () => {
//   const navigate = useNavigate();
//   const [tab, setTab] = useState<"email" | "phone">("email");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [otpSent, setOtpSent] = useState(false);
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const refs = Array.from({ length: 6 }, () => React.createRef<HTMLInputElement>());
//
//   ... (see LoginPage.tsx file below)
// };

// ================================================================
// NOTE: Split into two separate files in your project:
// 1. src/pages/auth/SignupPage.tsx  ← above code
// 2. src/pages/auth/LoginPage.tsx   ← see LoginPage.tsx file
// ================================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGift,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "react-toastify";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone ? `+91${form.phone}` : undefined,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Account created! Please log in.");
        navigate("/login");
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)",
      }}
    >
      {/* Background blobs */}
      <div
        className="fixed top-0 left-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7c3aed, transparent)",
          transform: "translate(-50%,-50%)",
        }}
      />
      <div
        className="fixed bottom-0 right-0 w-80 h-80 rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #ec4899, transparent)",
          transform: "translate(50%,50%)",
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
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
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

        <div className="bg-white rounded-3xl shadow-xl border border-white/50 overflow-hidden">
          {/* Header */}
          <div
            className="p-6 text-white text-center"
            style={{
              background: "linear-gradient(135deg, #581c87, #7c3aed, #ec4899)",
            }}
          >
            <h1 className="font-serif text-2xl font-bold">Create Account</h1>
            <p className="text-white/70 text-sm mt-1">
              Join thousands of happy gifters
            </p>
          </div>

          <div className="p-6 space-y-4">
            {/* Google */}
            {/* <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-neutral-200 bg-white text-neutral-700 font-semibold text-sm hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              <FaGoogle className="w-4 h-4 text-red-500" />
              Continue with Google
            </button> */}

            {/* <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-xs text-neutral-400 font-medium">
                or sign up with email
              </span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div> */}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    required
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 bg-purple-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    required
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 bg-purple-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  />
                </div>
              </div>

              {/* Phone (optional) */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Phone Number{" "}
                  <span className="text-neutral-400 font-normal text-xs">
                    (optional)
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <FaPhone className="w-3 h-3 text-neutral-400" />
                    <span className="text-xs font-semibold text-neutral-400 ml-0.5">
                      +91
                    </span>
                  </div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                      }))
                    }
                    placeholder="10-digit mobile"
                    className="w-full pl-14 pr-4 py-3 rounded-xl border border-purple-200 bg-purple-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FaShieldAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={set("password")}
                    required
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-purple-200 bg-purple-50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FaShieldAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={form.confirm}
                    onChange={set("confirm")}
                    required
                    placeholder="Re-enter password"
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all ${
                      form.confirm && form.confirm !== form.password
                        ? "border-red-300 bg-red-50 focus:ring-red-300"
                        : "border-purple-200 bg-purple-50 focus:ring-purple-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showConfirm ? (
                      <FaEyeSlash className="w-3.5 h-3.5" />
                    ) : (
                      <FaEye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {form.confirm && form.confirm !== form.password && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                }}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 text-center">
            <p className="text-sm text-neutral-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-purple-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          By signing up, you agree to our{" "}
          <span className="text-purple-500 cursor-pointer hover:underline">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-purple-500 cursor-pointer hover:underline">
            Privacy Policy
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
