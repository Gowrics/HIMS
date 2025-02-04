import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_URL = "http://192.168.91.201:8082/nationality";

// Async thunk to fetch nationality data
export const fetchNationalities = createAsyncThunk(
  "nationality/fetchNationalities",
  async () => {
    const response = await axios.get(`${API_URL}/getAll`);
    return response.data;
  }
);

// Async thunk to create a new nationality
export const createNationality = createAsyncThunk(
  "nationality/createNationality",
  async (newNationality) => {
    await axios.post(`${API_URL}/create`, newNationality);
    return newNationality;
  }
);

// Async thunk to delete a nationality
export const deleteNationality = createAsyncThunk(
  "nationality/deleteNationality",
  async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
    return id;
  }
);

const nationalitySlice = createSlice({
  name: "nationality",
  initialState: {
    nationalityData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNationalities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNationalities.fulfilled, (state, action) => {
        state.loading = false;
        state.nationalityData = action.payload;
      })
      .addCase(fetchNationalities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNationality.fulfilled, (state, action) => {
        state.nationalityData.push(action.payload);
      })
      .addCase(deleteNationality.fulfilled, (state, action) => {
        state.nationalityData = state.nationalityData.filter(
          (item) => item.nationalityCode !== action.payload
        );
      });
  },
});

export default nationalitySlice.reducer;
