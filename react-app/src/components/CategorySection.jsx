import React, { useEffect } from "react";
import ManCategory from "../assets/images/man.png";
import WomanCategory from "../assets/images/woman.png";
import KidCategory from "../assets/images/kid.png";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

const categories = [
  {
    title: "Men",
    imageUrl: ManCategory,
  },
  {
    title: "Women",
    imageUrl: WomanCategory,
  },
  {
    title: "Kid",
    imageUrl: KidCategory,
  },
];

const CategorySection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: true, // Whether animation should happen only once - while scrolling down
      easing: "ease-in-out", // Easing function for animations
      offset: 50, // Offset (in pixels) from the original trigger point
    });
  }, []);
  return (
    <div
      className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6"
      data-aos="flip-up"
    >
      {categories.map((category, index) => (
        <div
          key={index}
          className="relative h-64 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <img
            src={category.imageUrl}
            alt=""
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          <div className="absolute top-20 left-12">
            <p className="text-xl font-bold">{category.title}</p>
            <p className="text-gray-600">View All</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
