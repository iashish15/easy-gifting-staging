import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import NoProduct from "../assets/images/not_found.png";

const FilterData = () => {
  const filterProducts = useSelector((state) => state.product.filteredData);
  return (
    <div className="mx-auto py-12 px-4 md:px-auto">
      {filterProducts.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">Shop</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
            {filterProducts.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <img src={NoProduct} alt="" className="w-56 h-auto" />
        </div>
      )}
    </div>
  );
};

export default FilterData;
