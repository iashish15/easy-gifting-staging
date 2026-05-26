import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "./ui/Button";

interface BannerProps {
  title?: string;
  subtitle?: string;
  description?: string;
  callToActionText?: string;
  callToActionLink?: string;
  image?: string;
}

interface HeroSectionProps {
  banner?: BannerProps | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ banner }) => {
  const title = banner?.title ?? "Discover the Art of Perfect Gifting";
  const subtitle =
    banner?.subtitle ??
    "Curated collections of thoughtful, elegant gifts for every occasion.";
  const description =
    banner?.description ??
    "Experience luxury gifting with exceptional quality and personal touch.";
  const ctaText = banner?.callToActionText ?? "Explore Gifts";
  const ctaLink = banner?.callToActionLink ?? "/shop";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-32">
      <div className="absolute inset-0 gradient-luxury opacity-90"></div>
      {banner?.image ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${banner.image})` }}
        />
      ) : null}

      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
      <div
        className="absolute bottom-20 right-20 w-24 h-24 bg-gold-400/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        <motion.p
          className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button variant="gold" size="lg" className="text-lg">
            <Link to={ctaLink}>{ctaText}</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-primary-600"
          >
            <Link to="/our-story">Our Story</Link>
          </Button>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gold-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Premium Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gold-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gold-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>100% Satisfaction</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
