import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://192.168.91.201:8082/department";

export const fetchDepartments = createAsyncThunk(
  "department/fetchDepartments",
  async () => {
    const response = await axios.get(`${API_URL}/getAll`);
    return response.data;
  }
);

export const createDepartment = createAsyncThunk(
  "department/createDepartment",
  async (newDepartment) => {
    await axios.post(`${API_URL}/create`, newDepartment);
    return newDepartment;
  }
);

export const deleteDepartment = createAsyncThunk(
  "department/deleteDepartment",
  async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
    return id;
  }
);

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    departmentData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentData = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.departmentData.push(action.payload);
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.departmentData = state.departmentData.filter(
          (item) => item.deptCode !== action.payload
        );
      });
  },
});

export default departmentSlice.reducer;
