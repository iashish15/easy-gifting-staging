import React from "react";
import { motion } from "framer-motion";
import Card from "./ui/Card";

const testimonials = [
  {
    id: 1,
    name: "Ashish",
    role: "Happy Customer",
    content:
      "EasyGifting made my anniversary unforgettable. The gift arrived perfectly wrapped and on time. The quality exceeded my expectations!",
    rating: 5,
    avatar: "A",
  },
  {
    id: 2,
    name: "IP Gupta",
    role: "Gift Shopper",
    content:
      "As someone who struggles with gift ideas, EasyGifting has been a lifesaver. Their curated collections are always spot-on and beautifully presented.",
    rating: 5,
    avatar: "IP",
  },
  {
    id: 3,
    name: "Aditya",
    role: "Corporate Client",
    content:
      "We use EasyGifting for all our corporate gifting needs. The premium quality and reliable service make them our go-to choice.",
    rating: 5,
    avatar: "A",
  },
];

const TestimonialsSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
            What Our Customers Say
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust EasyGifting for
            their special moments
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card variant="glass" className="h-full p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-gold-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-white/90 mb-6 italic">
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex justify-center items-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 text-gold-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg font-medium">
                10,000+ Happy Customers
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 text-gold-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg font-medium">4.9/5 Average Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
