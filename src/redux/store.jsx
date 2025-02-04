import { configureStore } from "@reduxjs/toolkit";
import nationalityReducer from "./slices/nationalitySlice";
import departmentReducer from "./slices/departmentSlice";

const store = configureStore({
  reducer: {
    nationality: nationalityReducer,
    department: departmentReducer,
  },
});

export default store;
