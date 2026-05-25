import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import {
  createProduct,
  deleteProduct,
  getBrands,
  getCategories,
  getProducts,
  updateProduct,
  getAllProductsAdmin,
} from "@/api/productService";
import Loader from "@/components/Loader";
import type { Product, ProductPayload } from "@/types";
import {
  FaBox,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUpload,
  FaCrop,
  FaCheck,
  FaImage,
} from "react-icons/fa";
import ReactCrop, {
  type Crop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// ─── Types ───────────────────────────────────────────────────────
const emptyProduct: ProductPayload = {
  name: "",
  description: "",
  brand: "",
  category: "",
  price: 0,
  discountPrice: 0,
  images: [],
  stock: 0,
  tags: [],
  sizes: [],
  featured: false,
  status: "active",
};

// ─── Image Crop Modal ─────────────────────────────────────────────
const CropModal = ({
  src,
  onDone,
  onClose,
}: {
  src: string;
  onDone: (croppedUrl: string) => void;
  onClose: () => void;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    const c = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, 1, width, height),
      width,
      height,
    );
    setCrop(c);
  };

  const handleCropDone = () => {
    if (!completedCrop || !imgRef.current) return;
    const canvas = document.createElement("canvas");
    const SIZE = 600;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d")!;
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      SIZE,
      SIZE,
    );
    onDone(canvas.toDataURL("image/jpeg", 0.92));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-glass w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div
          className="p-5 text-white flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
        >
          <div className="flex items-center gap-3">
            <FaCrop className="w-5 h-5" />
            <div>
              <h3 className="font-bold text-base">Crop Image</h3>
              <p className="text-white/70 text-xs">
                Square crop — 1:1 ratio (600×600px)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Crop Area */}
        <div className="p-5 flex justify-center bg-neutral-50">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            circularCrop={false}
          >
            <img
              ref={imgRef}
              src={src}
              onLoad={onImageLoad}
              alt="Crop preview"
              className="max-h-[350px] object-contain"
            />
          </ReactCrop>
        </div>

        {/* Actions */}
        <div className="p-5 flex gap-3 border-t border-neutral-100">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 text-sm font-semibold hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCropDone}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-md"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            <FaCheck className="w-3.5 h-3.5" />
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Image Upload Section ─────────────────────────────────────────
const ImageUploader = ({
  images,
  onChange,
}: {
  images: string[];
  onChange: (imgs: string[]) => void;
}) => {
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCropSrc(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropDone = (croppedUrl: string) => {
    onChange([...images, croppedUrl]);
    setCropSrc(null);
  };

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-neutral-700 mb-3">
        Product Images
        <span className="ml-2 text-xs font-normal text-neutral-400">
          (Square crop applied automatically — 600×600px)
        </span>
      </label>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {/* Existing images */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative aspect-square rounded-xl overflow-hidden border-2 border-primary-200 group"
          >
            <img
              src={img}
              alt={`Product ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <FaTrash className="w-3 h-3" />
              </button>
            </div>
            {idx === 0 && (
              <span className="absolute top-1.5 left-1.5 bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                Main
              </span>
            )}
          </div>
        ))}

        {/* Upload button */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="aspect-square rounded-xl border-2 border-dashed border-primary-300 bg-primary-50 flex flex-col items-center justify-center gap-2 hover:border-primary-500 hover:bg-primary-100 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary-100 group-hover:bg-primary-200 flex items-center justify-center transition-colors">
            <FaPlus className="w-3.5 h-3.5 text-primary-600" />
          </div>
          <span className="text-[10px] font-semibold text-primary-600 text-center px-1">
            Add Photo
          </span>
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      {images.length === 0 && (
        <div
          onClick={() => fileRef.current?.click()}
          className="mt-3 border-2 border-dashed border-primary-200 rounded-2xl p-8 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
            <FaImage className="w-6 h-6 text-primary-400" />
          </div>
          <p className="text-sm font-semibold text-neutral-700">
            Click to upload product image
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            PNG, JPG up to 10MB · Auto-cropped to 600×600px square
          </p>
          <div
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            <FaUpload className="w-3.5 h-3.5" />
            Choose Image
          </div>
        </div>
      )}

      {/* Crop Modal */}
      {cropSrc && (
        <CropModal
          src={cropSrc}
          onDone={handleCropDone}
          onClose={() => setCropSrc(null)}
        />
      )}
    </div>
  );
};

// ─── Main Products Component ──────────────────────────────────────
const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ProductPayload>(emptyProduct);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "draft">(
    "all",
  );

  const loadProducts = async () => {
    setLoading(true);
    try {
      const [productRes, categoryRes, brandRes] = await Promise.all([
        // getProducts(),
        getAllProductsAdmin(),
        getCategories(),
        getBrands(),
      ]);
      setProducts(
        Array.isArray(productRes.data)
          ? productRes.data
          : productRes.data?.products || [],
      );
      setCategories(
        Array.isArray(categoryRes.data)
          ? categoryRes.data
          : categoryRes.data?.categories || [],
      );
      setBrands(
        Array.isArray(brandRes.data)
          ? brandRes.data
          : brandRes.data?.brands || [],
      );
    } catch {
      toast.error("Unable to load product data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selected) {
        await updateProduct(selected, form);
        toast.success("Product updated successfully");
      } else {
        await createProduct(form);
        toast.success("Product created successfully");
      }
      setForm(emptyProduct);
      setSelected(null);
      loadProducts();
    } catch {
      toast.error("Failed to save product.");
    }
  };

  const handleEdit = (product: Product) => {
    setSelected(product._id);
    setForm({
      name: product.name,
      description: product.description,
      brand:
        typeof product.brand === "string" ? product.brand : product.brand._id,
      category:
        typeof product.category === "string"
          ? product.category
          : product.category._id,
      price: product.price,
      discountPrice: product.discountPrice || 0,
      images: product.images,
      stock: product.stock,
      tags: product.tags,
      sizes: product.sizes,
      featured: product.featured,
      status: product.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted.");
      loadProducts();
    } catch {
      toast.error("Could not delete product.");
    }
  };

  const handleToggleStatus = async (product: Product) => {
    try {
      const newStatus = product.status === "active" ? "draft" : "active";
      await updateProduct(product._id, { status: newStatus });
      toast.success(
        `Product ${newStatus === "active" ? "activated" : "drafted"}!`,
      );
      loadProducts();
    } catch {
      toast.error("Could not update status.");
    }
  };

  // const sortedProducts = useMemo(
  //   () =>
  //     [...products]
  //       .sort(
  //         (a, b) =>
  //           new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
  //       )
  //       .filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
  //   [products, search],
  // );
  const sortedProducts = useMemo(
    () =>
      [...products]
        .sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
        )
        .filter((p) => {
          const matchSearch = p.name
            .toLowerCase()
            .includes(search.toLowerCase());
          const matchStatus =
            statusFilter === "all" ? true : p.status === statusFilter;
          return matchSearch && matchStatus;
        }),
    [products, search, statusFilter],
  );

  if (loading) return <Loader />;

  return (
    <div className="space-y-8 font-sans">
      <div className="grid gap-8 xl:grid-cols-[1.3fr_1fr]">
        {/* ─── Form ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-primary-100 shadow-soft overflow-hidden">
          {/* Form Header */}
          <div
            className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between"
            style={{
              background: "linear-gradient(to right, #faf5ff, #fdf2f8)",
            }}
          >
            <div>
              <h3 className="font-serif font-bold text-neutral-900">
                {selected ? "Edit Product" : "New Product"}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {selected
                  ? "Update product details below"
                  : "Fill in the details to add a new product"}
              </p>
            </div>
            {selected && (
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setForm(emptyProduct);
                }}
                className="text-xs text-neutral-500 hover:text-red-500 flex items-center gap-1.5 transition-colors"
              >
                <FaTimes className="w-3 h-3" /> Cancel edit
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="p-6 space-y-5">
            {/* Image Upload */}
            <div className="p-4 rounded-2xl bg-primary-50 border border-primary-100">
              <ImageUploader
                images={form.images}
                onChange={(imgs) => setForm({ ...form, images: imgs })}
              />
            </div>

            {/* Name + Price */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="e.g. Luxury Hamper Box"
                  className="w-full rounded-xl border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Price (₹) <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.price}
                  type="number"
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                  required
                  placeholder="0"
                  className="w-full rounded-xl border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                />
              </div>
            </div>

            {/* Discount Price + Stock */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Discount Price (₹)
                </label>
                <input
                  value={form.discountPrice}
                  type="number"
                  onChange={(e) =>
                    setForm({ ...form, discountPrice: Number(e.target.value) })
                  }
                  placeholder="0"
                  className="w-full rounded-xl border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Stock <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.stock}
                  type="number"
                  onChange={(e) =>
                    setForm({ ...form, stock: Number(e.target.value) })
                  }
                  required
                  placeholder="0"
                  className="w-full rounded-xl border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                />
              </div>
            </div>

            {/* Brand + Category */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Brand{" "}
                  {brands.length === 0 && (
                    <span className="text-red-400 text-xs font-normal">
                      — Add brands first
                    </span>
                  )}
                </label>
                <select
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  required
                  className="w-full rounded-xl border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                >
                  <option value="">
                    {brands.length === 0
                      ? "No brands available"
                      : "Select brand"}
                  </option>
                  {brands.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Category{" "}
                  {categories.length === 0 && (
                    <span className="text-red-400 text-xs font-normal">
                      — Add categories first
                    </span>
                  )}
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                >
                  <option value="">
                    {categories.length === 0
                      ? "No categories available"
                      : "Select category"}
                  </option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                rows={4}
                placeholder="Describe the product..."
                className="w-full rounded-xl border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all resize-none"
              />
            </div>

            {/* Status + Featured */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as "active" | "draft",
                    })
                  }
                  className="w-full rounded-xl border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Featured
                </label>
                <div className="flex items-center gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, featured: !form.featured })
                    }
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      form.featured ? "bg-primary-600" : "bg-neutral-200"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                        form.featured ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-neutral-600">
                    {form.featured ? "Featured on homepage" : "Not featured"}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                }}
              >
                {selected ? (
                  <>
                    <FaEdit className="w-3.5 h-3.5" /> Update Product
                  </>
                ) : (
                  <>
                    <FaPlus className="w-3.5 h-3.5" /> Create Product
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setForm(emptyProduct);
                }}
                className="px-5 py-3 rounded-xl border border-neutral-200 text-neutral-600 text-sm font-semibold hover:bg-neutral-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* ─── Product List ─────────────────────────────────── */}
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
                Products ({sortedProducts.length})
              </h3>
              {/* Status counts */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-semibold">
                  {products.filter((p) => p.status === "active").length} active
                </span>
                <span className="bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded-full font-semibold">
                  {products.filter((p) => p.status === "draft").length} draft
                </span>
              </div>
            </div>
            {/* Filter tabs */}
            <div className="flex gap-1.5 mb-3">
              {(["all", "active", "draft"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                    statusFilter === tab
                      ? "text-white"
                      : "bg-white border border-neutral-200 text-neutral-500 hover:border-primary-300"
                  }`}
                  style={
                    statusFilter === tab
                      ? {
                          background:
                            "linear-gradient(135deg, #7c3aed, #a855f7)",
                        }
                      : {}
                  }
                >
                  {tab === "all" ? "All" : tab}
                </button>
              ))}
            </div>
            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-primary-200 bg-white px-4 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
            />
          </div>

          {/* List */}
          <div className="divide-y divide-neutral-50 max-h-[700px] overflow-y-auto">
            {sortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
                  <FaBox className="w-7 h-7 text-primary-300" />
                </div>
                <p className="font-semibold text-neutral-700">
                  No products found
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  {search
                    ? "Try a different search term"
                    : "Create your first product"}
                </p>
              </div>
            ) : (
              sortedProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-4 p-4 hover:bg-primary-50/50 transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaImage className="w-5 h-5 text-neutral-300" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 text-sm truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {(product.brand as any)?.name || "Unknown brand"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-primary-700">
                        ₹{product.price}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          product.status === "active"
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {product.status}
                      </span>
                      {product.featured && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-accent-50 text-accent-700 border border-accent-100">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-600 bg-primary-50 hover:bg-primary-100 border border-primary-200 transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                      title="Delete"
                    >
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
