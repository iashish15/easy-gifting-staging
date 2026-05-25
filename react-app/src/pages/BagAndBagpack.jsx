import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const BagAndBagpack = () => {
  const products = useSelector((state) => state.product);
  return (
    <div className="container mx-auto py-12 px-4 md:px-auto">
      <h2 className="text-2xl font-bold mb-6 text-center uppercase">
        Bag and bagpacks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
        {products.products.slice(25, 35).map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};
export default BagAndBagpack;
