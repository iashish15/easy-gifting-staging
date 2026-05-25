import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingChat from "./components/FloatingChat";

import Home from "./pages/home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import FilterData from "./pages/FilterData";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import BagAndBagpack from "./pages/BagAndBagpack";
import HouseHoldProducts from "./pages/HouseHoldProducts";
import StationeryProduct from "./pages/StationaryProduct";
import Electronics from "./pages/Electronics";
import OurStory from "./pages/OurStory";
import BestSellers from "./pages/BestSellers";

import Loader from "./components/Loader";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";
import FAQ from "./pages//FAQ";
import CategoriesPage from "./pages/CategoriesPage";
import GiftCards from "./pages/GiftCards";
import NewArrivals from "./pages/NewArrivals";

const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const Products = React.lazy(() => import("./pages/admin/Products"));
const Categories = React.lazy(() => import("./pages/admin/Categories"));
const Brands = React.lazy(() => import("./pages/admin/Brands"));

function AppContent() {
  const [order, setOrder] = useState(null);

  const location = useLocation();

  // Hide Navbar & Footer on admin pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* 👉 Keep this first */}

          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/bags" element={<BagAndBagpack />} />
          <Route path="/house_hold_product" element={<HouseHoldProducts />} />
          <Route path="/stationary_product" element={<StationeryProduct />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout setOrder={setOrder} />} />
          <Route path="/order-confirmation" element={<Order order={order} />} />
          <Route path="/filter-data" element={<FilterData />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Routes */}
          {/* <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="brands" element={<Brands />} />
          </Route> */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="dashboard"
              element={
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="products"
              element={
                <Suspense fallback={<Loader />}>
                  <Products />
                </Suspense>
              }
            />
            <Route
              path="categories"
              element={
                <Suspense fallback={<Loader />}>
                  <Categories />
                </Suspense>
              }
            />
            <Route
              path="brands"
              element={
                <Suspense fallback={<Loader />}>
                  <Brands />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </Suspense>

      {!isAdminRoute && <Footer />}

      {!isAdminRoute && <FloatingChat />}

      {/* <ToastContainer position="top-center" theme="colored" /> */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastStyle={{
          borderRadius: "16px",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          fontWeight: "600",
        }}
        style={{ top: "80px" }}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageLoader />
      <AppContent />
    </Router>
  );
}

export default App;
