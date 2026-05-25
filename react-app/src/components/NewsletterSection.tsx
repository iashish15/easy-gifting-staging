import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Card from "./ui/Card";
import { toast } from "react-toastify";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing! 🎉");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-neutral-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card variant="glass" className="p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
                Stay in the Loop
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Be the first to know about new arrivals, exclusive offers, and
                gifting inspiration delivered to your inbox.
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-gold-400"
                  />
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    isLoading={isLoading}
                    className="whitespace-nowrap"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
              </form>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/60 text-sm">
                <span>✨ Exclusive offers</span>
                <span>🎁 New arrivals</span>
                <span>💝 Gifting tips</span>
                <span>🔔 Special events</span>
              </div>

              <p className="mt-6 text-white/50 text-xs">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
