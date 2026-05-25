import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import companyLogo from "../assets/images/company-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", path: "/shop" },
        { name: "Categories", path: "/categories" },
        { name: "Best Sellers", path: "/best-sellers" },
        { name: "New Arrivals", path: "/new-arrivals" },
        { name: "Gift Cards", path: "/gift-cards" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", path: "/contact" },
        // { name: "Shipping Info", path: "/shipping" },
        // { name: "Returns & Exchanges", path: "/returns" },
        // { name: "Size Guide", path: "/size-guide" },
        { name: "FAQ", path: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Our Story", path: "/our-story" },
        // { name: "Press", path: "/press" },
        { name: "Blog", path: "/blog" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={companyLogo}
                alt="EasyGifting"
                className="h-12 w-auto mb-6"
              />
              <p className="text-neutral-300 mb-6 leading-relaxed">
                {/* Your premier destination for premium, thoughtful gifts. We
                curate exceptional products that create lasting memories and
                meaningful connections for every special occasion. */}
                Redefining the art of gifting. Discover our thoughtfully curated
                collection of premium gifts designed to delight, inspire, and
                leave a lasting impression on every occasion.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a href="tel:+911800123444">
                  <div className="flex items-center gap-3 text-neutral-300 hover:text-purple-600 transition-colors duration-200 cursor-pointer">
                    <FaPhone className="w-4 h-4 text-primary-400" />
                    <span>+91 9000328100</span>
                  </div>
                </a>
                <a href="mailto:info@easygifting.in">
                  <div className="flex items-center gap-3 text-neutral-300 hover:text-purple-600 transition-colors duration-200 cursor-pointer">
                    <FaEnvelope className="w-4 h-4 text-primary-400" />
                    <span>info@easygifting.in</span>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-neutral-300">
                  <FaMapMarkerAlt className="w-4 h-4 text-primary-400" />
                  <span>
                    Plot No.15C, House no.27/16/22-15c RamBrahamanagar,
                    Neredmet, Secunderabad-500056
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4 font-serif">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <motion.div
          className="border-t border-neutral-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-xl font-semibold text-white mb-2 font-serif">
                Stay Connected
              </h3>
              <p className="text-neutral-300 text-sm mb-4">
                Get exclusive offers and gifting inspiration
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-l-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="px-6 py-2 bg-gradient-primary text-white rounded-r-lg hover:shadow-lg transition-all duration-200 font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.div> */}

        {/* Bottom Section */}
        <div className="border-t border-neutral-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Social Links */}
              <div className="flex items-center gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <span>© {currentYear} EasyGifting.</span>
                {/* <FaHeart className="w-4 h-4 text-red-500" /> */}
                <span>Made for special moments.</span>
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-6 text-sm">
                <Link
                  to="/"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
