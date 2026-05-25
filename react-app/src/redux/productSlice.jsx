import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: [],
//   searchTerm: "",
//   filteredData: [],
// };

// const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     setProducts(state, action) {
//       state.products = action.payload;
//     },
//     setSearchTerm(state, action) {
//       state.searchTerm = action.payload;
//       state.filteredData = state.products.filter((product) =>
//         product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
//       );
//     },
//   },
// });

// export const { setProducts, setSearchTerm } = productSlice.actions;
// export default productSlice.reducer;

// ==========================================
// src/redux/productSlice.js
// ==========================================

const initialState = {
  products: [],
  searchTerm: "",
  filteredData: [],
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
  },
});

export const { setProducts, setSearchTerm, setFilteredData } =
  productSlice.actions;

export default productSlice.reducer;
