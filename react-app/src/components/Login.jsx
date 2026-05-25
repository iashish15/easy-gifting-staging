import React from "react";

const Login = ({ openSignUp }) => {
  return (
    <div>
      <h2 className="text-2xl text-center font-bold mb-4">Enquiry Form</h2>
      <p className="text-center mb-4">We will get in touch with you shortly</p>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">
            Your Name <span className="text-red-600">*</span>
          </label>
          <input
            required
            type="First_name"
            className="w-full px-3 py-2 border"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            required
            type="text"
            className="w-full px-3 py-2 border"
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            E-mail Address <span className="text-red-600">*</span>
          </label>
          <input
            required
            type="email"
            className="w-full px-3 py-2 border"
            placeholder="Enter E-mail Address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Leave Your Message <span className="text-red-600">*</span>
          </label>
          <textarea
            required
            type="message"
            className="w-full px-3 py-2 border"
            placeholder="Write your message here..."
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2 text-gray-700">Remember Me</span>
          </label>
          <a href="" className="text-red-800">
            Forgot Password
          </a>
        </div>
        <div className="mb-4">
          <button type="submit" className="w-full bg-red-600 text-white py-2">
            Send
          </button>
        </div>
      </form>
      <div className="text-center">
        <span className="text-gray-700">Don't have an Account</span>
        <button className="text-red-800" onClick={openSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default Login;
