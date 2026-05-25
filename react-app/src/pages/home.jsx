import React, { useEffect, useState } from "react";
import { setProducts } from "../redux/productSlice";
import { useDispatch } from "react-redux";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import CategoryShowcase from "../components/CategoryShowcase";
import TestimonialsSection from "../components/TestimonialsSection";
import NewsletterSection from "../components/NewsletterSection";
import { getBanners } from "../api/cmsService";
import { getProducts } from "../api/productService";

const Home = () => {
  const dispatch = useDispatch();
  const [heroBanner, setHeroBanner] = useState(null);

  useEffect(() => {
    const loadHomeContent = async () => {
      try {
        const [bannerRes, productRes] = await Promise.all([
          getBanners(),
          getProducts({ featured: true }),
        ]);

        if (bannerRes?.data?.length > 0) {
          setHeroBanner(bannerRes.data[0]);
        }

        if (productRes?.data) {
          dispatch(setProducts(productRes.data));
        }
      } catch (error) {
        console.error("Failed to load homepage content", error);
      }
    };

    loadHomeContent();
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <HeroSection banner={heroBanner} />
      <FeaturedProducts />
      <CategoryShowcase />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
