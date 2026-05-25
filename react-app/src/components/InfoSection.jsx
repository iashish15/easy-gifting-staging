import React, { useEffect } from "react";
import {
  FaHeadset,
  FaLock,
  FaMoneyBillWave,
  FaShippingFast,
  FaTag,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles
import apparel from "../assets/images/info-section/customized-apparel-and-accessories.png";
import deskAwards from "../assets/images/info-section/engraved-desk-accessories-and-awards.png";
import techgadgets from "../assets/images/info-section/branded-tech-gadgets-and-more.png";
import bsgpacks from "../assets/images/info-section/customized-backpacks-and-bags.png";

const InfoSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: true, // Whether animation should happen only once - while scrolling down
      easing: "ease-in-out", // Easing function for animations
      offset: 50, // Offset (in pixels) from the original trigger point
    });
  }, []);
  const infoItems = [
    {
      // icon: <FaShippingFast className="text-3xl text-red-600" />,
      title: "Customized apparel and accessories.",
      discription: "Get your order delivered with no extra cost",
      imageUrl: apparel,
    },
    {
      // icon: <FaHeadset className="text-3xl text-red-600" />,
      title: "Engraved Desk Accessories and Awards.",
      discription: "We're here to assist you anytime",
      imageUrl: deskAwards,
    },
    {
      // icon: <FaMoneyBillWave className="text-3xl text-red-600" />,
      title: "Branded tech gadgets and more.",
      discription: "Full refund if you're not satisfied",
      imageUrl: techgadgets,
    },
    {
      // icon: <FaLock className="text-3xl text-red-600" />,
      title: "Customized Backpacks and bags.",
      discription: "Your payment information is secure with us",
      imageUrl: bsgpacks,
    },
  ];

  return (
    <div className=" bg-white pb-8 pt-12">
      <h2
        className="text-2xl font-bold mb-6 text-center uppercase"
        data-aos="zoom-in"
      >
        Our Products
      </h2>
      <div className="flex items-center justify-center">
        <p
          className="mb-6 text-gray-600 text-center lg:grid-cols-3 md:w-1/2"
          data-aos="fade-up"
        >
          At Easy Gifting, we offer a diverse range of high-quality,
          customizable products designed to enhance your brand's presence and
          meet your unique needs. Our collection includes:
        </p>
      </div>
      <div
        className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        data-aos="fade-up"
      >
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="h-70 flex flex-col items-center text-center p-4 border rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <img
              src={item.imageUrl}
              alt=""
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            {/* {item.icon} */}
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
export default InfoSection;
