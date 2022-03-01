import { createSlice } from "@reduxjs/toolkit";
import { queryApi } from "../../utils/queryApi";
let initialState = {
  products: [],
  selectedProduct: {},
  errors: "",
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    populateProducts(state, action) {
      state.products = action.payload;
    },
    selectProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    unselectProduct(state) {
      state.selectedProduct = null;
    },
    deleteProduct: (state, action) => {
      const payload = action.payload;
      const index = state.products.findIndex((item) => item._id === payload);
      console.log("index" + index);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    updateProduct: (state, action) => {
      const payload = action.payload;
      const index = state.products.findIndex(
        (item) => item._id === payload._id
      );
      if (index !== -1) {
        state.products[index] = payload;
      }
    },
    addProduct: (state, action) => {
      const payload = action.payload;
      state.products.push(payload);
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});
export const fetchProducts = () => async (dispatch) => {
  const [res, error] = await queryApi("products");
  if (error) {
    dispatch(setErrors(error));
  } else {
    dispatch(populateProducts(res));
  }
};
export const selectProducts = (state) => {
  return [state.products.products, state.products.errors];
};
export const selectSelectedProduct = (state) => {
  return state.products.selectedProduct;
};
export const {
  populateProducts,
  selectProduct,
  unselectProduct,
  setErrors,
  deleteProduct,
  updateProduct,
  addProduct,
} = productsSlice.actions;
export default productsSlice.reducer;
