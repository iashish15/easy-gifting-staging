import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Electronics = () => {
  const products = useSelector((state) => state.product);
  return (
    <div className="container mx-auto py-12 md:px-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 uppercase">
        Electronics Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
        {products.products.slice(48, 57).map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};
export default Electronics;
