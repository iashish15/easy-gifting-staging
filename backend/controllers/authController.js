// {
//   /*import asyncHandler from "express-async-handler";
// import bcrypt from "bcryptjs";
// import User from "../models/userModel.js";
// import generateToken from "../utils/generateToken.js";

// export const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error("Please include all required fields");
//   }
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     res.status(400);
//     throw new Error("Email already registered");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hashedPassword });
//   res.status(201).json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     token: generateToken(user._id),
//   });
// });

// export const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

// export const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });
// */
// }

// import asyncHandler from "express-async-handler";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import User from "../models/userModel.js";
// import generateToken from "../utils/generateToken.js";

// // ─── OTP Store (in-memory, use Redis in production) ──────────────
// const otpStore = new Map();

// // ─── Register ────────────────────────────────────────────────────
// export const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, phone, password } = req.body;

//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error("Please include all required fields");
//   }

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     res.status(400);
//     throw new Error("Email already registered");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await User.create({
//     name,
//     email,
//     phone: phone || "",
//     password: hashedPassword,
//   });

//   res.status(201).json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//     role: user.role,
//     token: generateToken(user._id),
//   });
// });

// // ─── Login ───────────────────────────────────────────────────────
// export const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

// // ─── Logout ──────────────────────────────────────────────────────
// export const logoutUser = asyncHandler(async (req, res) => {
//   // Client should delete token — nothing to do server-side for JWT
//   res.json({ message: "Logged out successfully" });
// });

// // ─── Refresh Token ───────────────────────────────────────────────
// export const refreshToken = asyncHandler(async (req, res) => {
//   const { token } = req.body;
//   if (!token) {
//     res.status(400);
//     throw new Error("Token required");
//   }
//   // For now just return a new token for the same user
//   // In production, verify the refresh token properly
//   res.json({ message: "Use login to get a new token" });
// });

// // ─── Get User Profile ────────────────────────────────────────────
// export const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// // ─── Forgot Password ─────────────────────────────────────────────
// export const forgotPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     res.status(400);
//     throw new Error("Email is required");
//   }

//   const user = await User.findOne({ email });

//   // Always return success to prevent email enumeration
//   if (!user) {
//     res.json({
//       message: "If an account exists, a reset link has been sent to your email",
//     });
//     return;
//   }

//   // Generate reset token
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // Save to user (add these fields to your User model if not present)
//   user.resetPasswordToken = hashedToken;
//   user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
//   await user.save();

//   // TODO: Send email with reset link
//   // const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
//   // await sendEmail({ to: user.email, subject: "Password Reset", text: resetURL });

//   console.log(`Password reset token for ${email}: ${resetToken}`);

//   res.json({
//     message: "If an account exists, a reset link has been sent to your email",
//     // Remove this in production:
//     devToken: resetToken,
//   });
// });

// // ─── Reset Password ──────────────────────────────────────────────
// export const resetPassword = asyncHandler(async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   if (!password) {
//     res.status(400);
//     throw new Error("Password is required");
//   }

//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken: hashedToken,
//     resetPasswordExpires: { $gt: Date.now() },
//   });

//   if (!user) {
//     res.status(400);
//     throw new Error("Invalid or expired reset token");
//   }

//   user.password = await bcrypt.hash(password, 10);
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpires = undefined;
//   await user.save();

//   res.json({ message: "Password reset successful. Please log in." });
// });

// // ─── Verify Email ────────────────────────────────────────────────
// export const verifyEmail = asyncHandler(async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     res.status(400);
//     throw new Error("Email and OTP are required");
//   }

//   const stored = otpStore.get(email);

//   if (!stored || stored.otp !== otp || Date.now() > stored.expires) {
//     res.status(400);
//     throw new Error("Invalid or expired OTP");
//   }

//   otpStore.delete(email);

//   const user = await User.findOne({ email });
//   if (user) {
//     user.isVerified = true;
//     await user.save();
//   }

//   res.json({ message: "Email verified successfully" });
// });

// // ─── Send OTP ────────────────────────────────────────────────────
// export const sendOTP = asyncHandler(async (req, res) => {
//   const { phone, email } = req.body;

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const key = phone || email;

//   otpStore.set(key, {
//     otp,
//     expires: Date.now() + 5 * 60 * 1000, // 5 minutes
//   });

//   // TODO: Send via Twilio for phone or nodemailer for email
//   // For now log to console (demo mode)
//   console.log(`OTP for ${key}: ${otp}`);

//   res.json({
//     message: "OTP sent successfully",
//     // Remove in production:
//     devOTP: otp,
//   });
// });

// // ─── Verify OTP ──────────────────────────────────────────────────
// export const verifyOTP = asyncHandler(async (req, res) => {
//   const { phone, email, otp } = req.body;
//   const key = phone || email;

//   const stored = otpStore.get(key);

//   if (!stored || stored.otp !== otp || Date.now() > stored.expires) {
//     res.status(400);
//     throw new Error("Invalid or expired OTP");
//   }

//   otpStore.delete(key);
//   res.json({ message: "OTP verified successfully" });
// });

// // ─── Login with OTP ──────────────────────────────────────────────
// export const loginWithOTP = asyncHandler(async (req, res) => {
//   const { phone, otp } = req.body;

//   const stored = otpStore.get(phone);

//   if (!stored || stored.otp !== otp || Date.now() > stored.expires) {
//     res.status(400);
//     throw new Error("Invalid or expired OTP");
//   }

//   otpStore.delete(phone);

//   const user = await User.findOne({ phone });
//   if (!user) {
//     res.status(404);
//     throw new Error("No account found with this phone number. Please sign up.");
//   }

//   res.json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//     role: user.role,
//     token: generateToken(user._id),
//   });
// });

import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// ─── In-memory OTP store (swap for Redis in production) ───────────────────
// Structure: Map<key, { otp: string, expires: number, purpose: string }>
const otpStore = new Map();

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ─── Register ─────────────────────────────────────────────────────────────
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all required fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    phone: phone || "",
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    token: generateToken(user._id),
  });
});

// ─── Login ────────────────────────────────────────────────────────────────
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// ─── Logout ───────────────────────────────────────────────────────────────
export const logoutUser = asyncHandler(async (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// ─── Refresh Token ────────────────────────────────────────────────────────
export const refreshToken = asyncHandler(async (req, res) => {
  res.json({ message: "Use login to get a new token" });
});

// ─── Get Profile ──────────────────────────────────────────────────────────
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

// ─── Send OTP ─────────────────────────────────────────────────────────────
// Used for: phone verification during signup, or forgot-password email OTP
// Body: { phone?, email?, purpose? }
export const sendOTP = asyncHandler(async (req, res) => {
  const { phone, email } = req.body;
  const key = email || phone; // prefer email as key

  if (!key) {
    res.status(400);
    throw new Error("Email or phone is required");
  }

  const otp = generateOTP();
  otpStore.set(key, {
    otp,
    expires: Date.now() + 5 * 60 * 1000, // 5 minutes
  });

  // TODO: Replace console.log with real delivery
  // Email → use nodemailer / SendGrid
  // Phone → use Twilio
  console.log(`[OTP] ${key} → ${otp}`);

  res.json({
    message: "OTP sent successfully",
    devOTP: otp, // ← remove in production
  });
});

// ─── Verify OTP ───────────────────────────────────────────────────────────
// Used for: signup phone verification
// Body: { phone?, email?, otp }
export const verifyOTP = asyncHandler(async (req, res) => {
  const { phone, email, otp } = req.body;
  const key = email || phone;

  if (!key || !otp) {
    res.status(400);
    throw new Error("Key and OTP are required");
  }

  const stored = otpStore.get(key);

  if (!stored) {
    res.status(400);
    throw new Error("No OTP found. Please request a new one");
  }
  if (Date.now() > stored.expires) {
    otpStore.delete(key);
    res.status(400);
    throw new Error("OTP has expired. Please request a new one");
  }
  if (stored.otp !== otp) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  otpStore.delete(key);
  res.json({ message: "OTP verified successfully" });
});

// ─── Forgot Password ──────────────────────────────────────────────────────
// Generates an OTP and saves it to the user record (not in-memory store)
// so it survives server restarts and is tied to the account.
// Body: { email }
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email });

  // Always respond 200 to prevent email enumeration attacks
  if (!user) {
    res.json({ message: "If an account exists, an OTP has been sent" });
    return;
  }

  // Generate 6-digit OTP and save to user document
  const otp = generateOTP();
  user.resetOTP = otp;
  user.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  await user.save();

  // TODO: Send via nodemailer / SendGrid
  // await sendEmail({
  //   to: user.email,
  //   subject: "Your EasyGifting password reset OTP",
  //   html: `<p>Your OTP is <strong>${otp}</strong>. Valid for 10 minutes.</p>`,
  // });
  console.log(`[Forgot Password OTP] ${email} → ${otp}`);

  res.json({
    message: "If an account exists, an OTP has been sent",
    devOTP: otp, // ← remove in production
  });
});

// ─── Reset Password ───────────────────────────────────────────────────────
// Verifies the OTP saved on the user document, then updates the password.
// Body: { email, otp, newPassword }
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    res.status(400);
    throw new Error("Email, OTP, and new password are required");
  }

  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  // Find user and check OTP
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("No account found with this email");
  }

  if (!user.resetOTP || !user.resetOTPExpires) {
    res.status(400);
    throw new Error(
      "No OTP requested. Please start the forgot password flow again",
    );
  }

  if (user.resetOTP !== otp) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  if (Date.now() > new Date(user.resetOTPExpires).getTime()) {
    // Clear expired OTP
    user.resetOTP = null;
    user.resetOTPExpires = null;
    await user.save();
    res.status(400);
    throw new Error("OTP has expired. Please request a new one");
  }

  // All good — hash and save the new password
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOTP = null;
  user.resetOTPExpires = null;
  await user.save();

  res.json({ message: "Password reset successful. Please log in." });
});

// ─── Verify Email ─────────────────────────────────────────────────────────
export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400);
    throw new Error("Email and OTP are required");
  }

  const stored = otpStore.get(email);

  if (!stored || stored.otp !== otp || Date.now() > stored.expires) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }

  otpStore.delete(email);

  const user = await User.findOne({ email });
  if (user) {
    user.isVerified = true;
    await user.save();
  }

  res.json({ message: "Email verified successfully" });
});

// ─── Login with OTP ───────────────────────────────────────────────────────
export const loginWithOTP = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;

  const stored = otpStore.get(phone);

  if (!stored || stored.otp !== otp || Date.now() > stored.expires) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }

  otpStore.delete(phone);

  const user = await User.findOne({ phone });
  if (!user) {
    res.status(404);
    throw new Error("No account found with this phone. Please sign up.");
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    token: generateToken(user._id),
  });
});
