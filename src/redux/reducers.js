import { combineReducers } from "redux";
import products from "./slices/productsSlice";
const reducers = combineReducers({
  products,
});
export default reducers;
