import React, { useState, useEffect } from "react";
import {
  FaPhone,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { setSearchTerm } from "../redux/productSlice";
import companyLogoMobile from "../assets/images/company-logo-mobile.png";
import companyLogo from "../assets/images/company-logo.png";
import Button from "./ui/Button";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
    navigate("/filter-data");
    setIsMenuOpen(false);
  };

  // ✅ Check if user is logged in
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("easygifting_user") || "null");
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("easygifting_user_token");
    localStorage.removeItem("easygifting_user");
    navigate("/");
    window.location.reload();
  };

  const products = useSelector((state) => state.cart.products);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    // { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg shadow-luxury"
            : "bg-white dark:bg-neutral-900"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/">
                <img
                  src={companyLogo}
                  alt="EasyGifting"
                  className="h-8 md:h-12 w-auto"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400 ${
                      isActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-neutral-700 dark:text-neutral-300"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search
              <form onSubmit={handleSearch} className="hidden md:flex">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search gifts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                </div>
              </form> */}

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
              >
                {isDarkMode ? (
                  <FaSun className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                ) : (
                  <FaMoon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                )}
              </button>

              {/* Cart */}
              {/* <Link
                to="/cart"
                className="relative p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors duration-200"
              >
                <FaShoppingCart className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                {products.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {products.length}
                  </span>
                )}
              </Link> */}

              {/* ✅ User Account — shows avatar if logged in, login button if not */}
              {user ? (
                <div className="hidden md:flex items-center gap-2 relative group">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 hover:bg-primary-100 transition-colors">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                      }}
                    >
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-medium text-primary-700 max-w-[80px] truncate">
                      {user.name?.split(" ")[0]}
                    </span>
                  </button>

                  {/* Dropdown */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-luxury border border-neutral-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-3 border-b border-neutral-100">
                      <p className="text-sm font-semibold text-neutral-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-2">
                      {/* <Link
                        to="/orders"
                        className="block px-3 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-3 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors"
                      >
                        Profile
                      </Link> */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:flex items-center space-x-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors duration-200"
                >
                  <FaUser className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <FaTimes className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                ) : (
                  <FaBars className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden border-t border-neutral-200 dark:border-neutral-700"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="py-4 space-y-4">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="px-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search gifts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    </div>
                  </form>

                  {/* Mobile Navigation */}
                  <div className="px-4 space-y-2">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `block py-2 px-4 rounded-lg text-base font-medium transition-colors duration-200 ${
                            isActive
                              ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>

                  {/* Mobile Auth */}
                  <div className="px-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    {user ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 border border-primary-100">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                            style={{
                              background:
                                "linear-gradient(135deg, #7c3aed, #ec4899)",
                            }}
                          >
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">
                              {user.name}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        {/* <Link
                          to="/orders"
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-2 px-4 rounded-lg text-sm text-neutral-700 hover:bg-neutral-50"
                        >
                          My Orders
                        </Link> */}
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left py-2 px-4 rounded-lg text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-4">
                        <Link
                          to="/login"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex-1 text-center py-2.5 rounded-xl border-2 border-primary-300 text-primary-700 font-semibold text-sm hover:bg-primary-50 transition-colors"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex-1 text-center py-2.5 rounded-xl text-white font-semibold text-sm transition-colors"
                          style={{
                            background:
                              "linear-gradient(135deg, #7c3aed, #a855f7)",
                          }}
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
