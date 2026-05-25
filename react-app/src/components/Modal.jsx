import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

const Modal = ({ isModelOpen, setIsModelOpen, children }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: true, // Whether animation should happen only once - while scrolling down
      easing: "ease-in-out", // Easing function for animations
      offset: 50, // Offset (in pixels) from the original trigger point
    });
  }, []);
  if (!isModelOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div
        className="bg-white  rounded-lg shadow-lg p-6 w-full max-w-md"
        data-aos="zoom-in"
      >
        <button
          className="absolute top-4 right-4 text-gray-300 text-3xl"
          onClick={() => setIsModelOpen(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
