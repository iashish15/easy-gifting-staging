import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaBox,
  FaTags,
  FaBriefcase,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaGift,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const pageConfig: Record<
  string,
  { title: string; subtitle: string; icon: React.ElementType }
> = {
  "/admin/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of your store",
    icon: FaHome,
  },
  "/admin/products": {
    title: "Products",
    subtitle: "Create, edit and manage catalog",
    icon: FaBox,
  },
  "/admin/categories": {
    title: "Categories",
    subtitle: "Manage product categories",
    icon: FaTags,
  },
  "/admin/brands": {
    title: "Brands",
    subtitle: "Manage your brands",
    icon: FaBriefcase,
  },
};

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FaHome },
  { to: "/admin/products", label: "Products", icon: FaBox },
  { to: "/admin/categories", label: "Categories", icon: FaTags },
  { to: "/admin/brands", label: "Brands", icon: FaBriefcase },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  // ✅ Auto-close sidebar whenever route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // ✅ Lock body scroll when sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  function getGreeting() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return { text: "Good Morning", emoji: "☀️" };
    if (h >= 12 && h < 17) return { text: "Good Afternoon", emoji: "🌤️" };
    if (h >= 17 && h < 21) return { text: "Good Evening", emoji: "🌆" };
    return { text: "Good Night", emoji: "🌙" };
  }

  const logout = () => {
    localStorage.removeItem("easygifting_token");
    localStorage.removeItem("easygifting_admin");
    navigate("/admin/login");
  };

  const adminData = (() => {
    try {
      return JSON.parse(localStorage.getItem("easygifting_admin") || "{}");
    } catch {
      return {};
    }
  })();

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Admin Info */}
      {(!collapsed || mobile) && (
        <div className="mb-6 p-3 rounded-xl bg-primary-50 border border-primary-100">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              }}
            >
              {adminData?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-900 truncate">
                {adminData?.name || "Admin"}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {adminData?.email || "admin@easygifting.com"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed avatar */}
      {collapsed && !mobile && (
        <div className="mb-6 flex justify-center">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            {adminData?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {(!collapsed || mobile) && (
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 px-2">
            Navigation
          </p>
        )}
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                collapsed && !mobile ? "justify-center" : ""
              } ${
                isActive
                  ? "text-white shadow-sm"
                  : "text-neutral-600 hover:bg-primary-50 hover:text-primary-700"
              }`
            }
            style={({ isActive }) =>
              isActive
                ? { background: "linear-gradient(135deg, #7c3aed, #a855f7)" }
                : {}
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-neutral-400 group-hover:text-primary-600"
                  }`}
                />
                {(!collapsed || mobile) && <span>{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-6 pt-6 border-t border-neutral-100">
        <button
          onClick={logout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 ${
            collapsed && !mobile ? "justify-center" : ""
          }`}
        >
          <FaSignOutAlt className="w-4 h-4 flex-shrink-0" />
          {(!collapsed || mobile) && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 font-sans">
      {/* ─── Desktop Sidebar ─────────────────────────────── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col relative border-r border-neutral-100 bg-white shadow-soft flex-shrink-0 h-screen sticky top-0"
        style={{ overflow: "visible" }}
      >
        <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
          <SidebarContent />
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-8 w-7 h-7 rounded-full bg-white border-2 border-neutral-200 shadow-md flex items-center justify-center text-neutral-500 hover:text-primary-600 hover:border-primary-300 transition-all z-50"
        >
          {collapsed ? (
            <FaChevronRight className="w-2.5 h-2.5" />
          ) : (
            <FaChevronLeft className="w-2.5 h-2.5" />
          )}
        </button>
      </motion.aside>

      {/* ─── Mobile Sidebar ───────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                pointerEvents: "auto",
              }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl lg:hidden p-5 overflow-y-auto"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
              <SidebarContent mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main Content ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-100 shadow-sm sticky top-0 z-30 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <FaBars className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              }}
            >
              <FaGift className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-neutral-900 font-serif text-sm">
              EasyGifting Admin
            </span>
          </div>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            {adminData?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
        </div>

        {/* ─── Sticky Page Header ─────────────────────────────── */}
        {(() => {
          const page = pageConfig[location.pathname];
          if (!page) return null;
          const Icon = page.icon;
          return (
            <div className="flex-shrink-0 flex items-center justify-between gap-4 px-6 lg:px-8 py-8 border-b border-neutral-100 bg-white">
              {/* Left: icon + title */}
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h1 className="text-lg font-bold font-serif text-neutral-900 leading-tight">
                    {page.title}
                  </h1>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {page.subtitle}
                  </p>
                </div>
              </div>

              {/* Right: day/date + time + status */}
              <div className="flex items-center gap-2">
                {/* Day + Date */}
                <div className="hidden md:flex flex-col items-center px-3 py-2 rounded-xl bg-primary-50 border border-primary-100">
                  <p className="text-[10px] font-semibold text-primary-400 uppercase tracking-wider">
                    {now.toLocaleDateString("en-IN", { weekday: "short" })}
                  </p>
                  <p className="text-sm font-bold text-primary-700">
                    {now.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>

                {/* Time */}
                <div
                  className="flex flex-col items-center px-3 py-2 rounded-xl text-white"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  }}
                >
                  <p className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">
                    Time
                  </p>
                  <p className="text-sm font-bold tabular-nums">
                    {now.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </p>
                </div>

                {/* Status */}
                <div className="flex flex-col items-center px-3 py-2 rounded-xl bg-green-50 border border-green-100">
                  <p className="text-[10px] font-semibold text-green-400 uppercase tracking-wider">
                    Status
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                    </span>
                    <p className="text-sm font-bold text-green-600">Live</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
        {/* ✅ Only scrollable area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
