import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "@/api/productService";
import Loader from "@/components/Loader";
import {
  FaTags,
  FaPlus,
  FaTrash,
  FaSearch,
  FaLayerGroup,
} from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories();
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.categories || [];
      setCategories(data);
    } catch {
      toast.error("Unable to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createCategory(name, description);
      toast.success("Category created successfully!");
      setName("");
      setDescription("");
      loadCategories();
    } catch {
      toast.error("Category already exists");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      setCategories((prev) => prev.filter((category) => category._id !== id));

      toast.success("Category deleted successfully!");
    } catch {
      toast.error("Unable to delete category.");
    }
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <Loader />;

  return (
    <div className="space-y-8 font-sans">
      {/* ─── Header ──────────────────────────────────────────── */}

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ─── Form ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-primary-100 shadow-soft overflow-hidden">
          {/* Form Header */}
          <div
            className="px-6 py-4 border-b border-neutral-100"
            style={{
              background: "linear-gradient(to right, #faf5ff, #fdf2f8)",
            }}
          >
            <h3 className="font-serif font-bold text-neutral-900">
              New Category
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Add a category to organise your products
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Category Name <span className="text-red-400">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Birthday Gifts, Corporate Hampers..."
                className="w-full rounded-xl border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe this category..."
                className="w-full rounded-xl border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all resize-none"
              />
            </div>

            {/* Preview */}
            {name && (
              <div className="p-4 rounded-xl bg-primary-50 border border-primary-100">
                <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2">
                  Preview
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    }}
                  >
                    <FaLayerGroup className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">
                      {name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {description || "No description"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              }}
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaPlus className="w-3.5 h-3.5" />
              )}
              {submitting ? "Adding..." : "Add Category"}
            </button>
          </form>
        </div>

        {/* ─── Category List ────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft overflow-hidden">
          {/* List Header */}
          <div
            className="px-6 py-4 border-b border-neutral-100"
            style={{
              background: "linear-gradient(to right, #faf5ff, #fdf2f8)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif font-bold text-neutral-900">
                Active Categories ({categories.length})
              </h3>
            </div>
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-primary-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
              />
            </div>
          </div>

          {/* List */}
          <div className="divide-y divide-neutral-50 max-h-[500px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
                  <FaTags className="w-7 h-7 text-primary-300" />
                </div>
                <p className="font-semibold text-neutral-700">
                  {search ? "No categories found" : "No categories yet"}
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  {search
                    ? "Try a different search term"
                    : "Add your first category using the form"}
                </p>
              </div>
            ) : (
              filtered.map((category, i) => (
                <div
                  key={category._id}
                  className="flex items-center gap-4 p-4 hover:bg-primary-50/50 transition-colors group"
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{
                      background:
                        i % 3 === 0
                          ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                          : i % 3 === 1
                            ? "linear-gradient(135deg, #ec4899, #f472b6)"
                            : "linear-gradient(135deg, #eab308, #facc15)",
                    }}
                  >
                    <FaLayerGroup className="w-4 h-4" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 text-sm truncate">
                      {category.name}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {category.description || "No description added."}
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDelete(category._id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 transition-all"
                    title="Delete category"
                  >
                    <FaTrash className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
