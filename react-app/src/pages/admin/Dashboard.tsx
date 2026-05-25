import { useEffect, useState } from "react";
import { fetchAdminDashboard } from "@/api/authService";
import { motion } from "framer-motion";
import {
  FaBox,
  FaShoppingBag,
  FaUsers,
  FaRupeeSign,
  FaArrowUp,
  FaGift,
  FaStar,
  FaTruck,
  FaChartLine,
  FaFire,
} from "react-icons/fa";

// ─── Types ───────────────────────────────────────────────────────
interface Stats {
  productCount?: number;
  orderCount?: number;
  userCount?: number;
  totalRevenue?: number;
  pendingOrders?: number;
  deliveredOrders?: number;
  newUsers?: number;
  avgRating?: number;
}

// ─── Metric Cards Config ─────────────────────────────────────────
const metricCards = [
  {
    key: "productCount",
    label: "Total Products",
    icon: FaBox,
    gradient: "from-primary-700 to-primary-500",
    bg: "bg-primary-50",
    border: "border-primary-100",
    text: "text-primary-700",
    change: "+12%",
    suffix: "",
    prefix: "",
  },
  {
    key: "orderCount",
    label: "Total Orders",
    icon: FaShoppingBag,
    gradient: "from-secondary-700 to-secondary-500",
    bg: "bg-secondary-50",
    border: "border-secondary-100",
    text: "text-secondary-700",
    change: "+8%",
    suffix: "",
    prefix: "",
  },
  {
    key: "userCount",
    label: "Customers",
    icon: FaUsers,
    gradient: "from-accent-700 to-accent-500",
    bg: "bg-accent-50",
    border: "border-accent-100",
    text: "text-accent-700",
    change: "+24%",
    suffix: "",
    prefix: "",
  },
  // {
  //   key: "totalRevenue",
  //   label: "Total Revenue",
  //   icon: FaRupeeSign,
  //   gradient: "from-green-700 to-green-500",
  //   bg: "bg-green-50",
  //   border: "border-green-100",
  //   text: "text-green-700",
  //   change: "+18%",
  //   suffix: "",
  //   prefix: "₹",
  // },
];

const quickStats = [
  {
    key: "pendingOrders",
    label: "Pending Orders",
    icon: FaTruck,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    key: "deliveredOrders",
    label: "Delivered",
    icon: FaGift,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    key: "newUsers",
    label: "New Users",
    icon: FaFire,
    color: "text-primary-600",
    bg: "bg-primary-50",
    border: "border-primary-100",
  },
  {
    key: "avgRating",
    label: "Avg Rating",
    icon: FaStar,
    color: "text-accent-600",
    bg: "bg-accent-50",
    border: "border-accent-100",
  },
];

// ─── Animation ───────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// ─── Animated Counter ────────────────────────────────────────────
const AnimatedNumber = ({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) return;
    const duration = 1200;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};

// ─── Skeleton Loader ─────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-slate-100" />
      <div className="w-16 h-5 rounded-full bg-slate-100" />
    </div>
    <div className="w-24 h-8 rounded-lg bg-slate-100 mt-4" />
    <div className="w-20 h-4 rounded bg-slate-100 mt-2" />
  </div>
);

// ─── Dashboard Component ─────────────────────────────────────────
const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({});
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    // Get admin name from localStorage
    try {
      const adminData = JSON.parse(
        localStorage.getItem("easygifting_admin") || "{}",
      );
      if (adminData?.name) setAdminName(adminData.name);
    } catch {}

    const load = async () => {
      try {
        const response = await fetchAdminDashboard();
        setStats(response.data || {});
      } catch (error) {
        console.error(error);
        // Use dummy data if API fails
        setStats({
          productCount: 0,
          orderCount: 0,
          userCount: 0,
          totalRevenue: 0,
          pendingOrders: 0,
          deliveredOrders: 0,
          newUsers: 0,
          avgRating: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-8 font-sans">
      {/* ─── Main Metric Cards ───────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <FaChartLine className="text-primary-600 w-4 h-4" />
          <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
            Overview
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            : metricCards.map((card, i) => (
                <motion.div
                  key={card.key}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className={`rounded-2xl border ${card.border} ${card.bg} p-6 hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <card.icon className="w-5 h-5" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                      <FaArrowUp className="w-2.5 h-2.5" />
                      {card.change}
                    </span>
                  </div>

                  <p className={`text-3xl font-bold font-serif ${card.text}`}>
                    <AnimatedNumber
                      value={stats[card.key as keyof Stats] || 0}
                      prefix={card.prefix}
                      suffix={card.suffix}
                    />
                  </p>
                  <p className="text-neutral-500 text-sm font-medium mt-1">
                    {card.label}
                  </p>
                </motion.div>
              ))}
        </div>
      </div>

      {/* ─── Quick Actions ───────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={8}
      >
        <div className="flex items-center gap-2 mb-5">
          <FaGift className="text-accent-600 w-4 h-4" />
          <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Add Product",
              href: "/admin/products",
              emoji: "📦",
              color: "from-primary-600 to-primary-400",
            },
            {
              label: "Add Category",
              href: "/admin/categories",
              emoji: "🗂️",
              color: "from-secondary-600 to-secondary-400",
            },
            {
              label: "Add Brand",
              href: "/admin/brands",
              emoji: "🏷️",
              color: "from-accent-600 to-accent-400",
            },
            // {
            //   label: "View Orders",
            //   href: "/admin/orders",
            //   emoji: "🛒",
            //   color: "from-green-600 to-green-400",
            // },
          ].map((action, i) => (
            <motion.a
              key={action.label}
              href={action.href}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 8}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-slate-100 hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 group text-center"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}
              >
                {action.emoji}
              </div>
              <span className="text-sm font-semibold text-neutral-700">
                {action.label}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* ─── Footer note ─────────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={12}
        className="rounded-2xl p-5 text-center"
        style={{ background: "linear-gradient(to right, #faf5ff, #fdf2f8)" }}
      >
        <p className="text-neutral-500 text-sm">
          Last updated:{" "}
          <span className="font-semibold text-primary-700">
            {new Date().toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>{" "}
          · EasyGifting Admin Panel
        </p>
      </motion.div>
    </div>
  );
};

export default Dashboard;
