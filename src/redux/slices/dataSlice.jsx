import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react';

// Utility function for error messages
const getErrorMessage = (error, defaultMessage) => {
  if (!error.response) return 'Network error! Please check your connection.';
  if (error.response.status === 500 || error.response.status === 400) {
    return 'This value already exists!';
  }
  return error.response.data?.message || defaultMessage;
};

// Fetch Data
export const fetchData = createAsyncThunk('data/fetchData', async (url, { rejectWithValue }) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Error fetching data'));
  }
});
// Generic delete function for any form type
export const deleteItem = createAsyncThunk(
  "data/deleteItem",
  async ({ url, id, key }, { rejectWithValue }) => {
    try {
      await axios.delete(`${url}/${id}`);
      return { id, key }; // Return both ID and key
    } catch (error) {
      return rejectWithValue(error.response?.data || "Deletion failed");
    }
  }
);

// Submit Data
export const submitForm = createAsyncThunk('data/submitForm', async ({ url, formData }, { rejectWithValue }) => {
  try {
    const response = await axios.post(url, formData);
    return response.data; // Assuming backend returns the newly created item
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Error submitting form'));
  }
});

// Update Data
export const updateForm = createAsyncThunk('data/updateForm', async ({ url, id, formData }, { rejectWithValue }) => {
  try {
    await axios.put(`${url}/${id}`, formData);
    const response = await axios.get(url.replace('update', 'getAll'));
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Error updating form'));
  }
});

// Initial State
const initialState = {
  items: [],
  loading: false,
  error: null,
  validationMessage: '',
  showModal: false,
  alert: { show: false, type: '', message: '' }
};

// Utility function to show alerts
const showAlert = (state, type, message) => {
  state.alert = { show: true, type, message };
};

// Redux Slice
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.validationMessage = '';
      state.showModal = false;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    clearAlert: (state) => {
      state.alert = { show: false, type: '', message: '' };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Data
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        const { id, key } = action.payload; // Use dynamic key
        state.items = state.items.filter((item) => item[key] !== id);
        state.alert = { show: true, type: "danger", message: "Record deleted successfully!" };
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.validationMessage = action.payload;
        state.showModal = true;
        showAlert(state, 'danger', action.payload);
      })

      // Submit Data
      .addCase(submitForm.fulfilled, (state, action) => {
        state.items.push(action.payload); // Append new record instead of refetching
        state.validationMessage = 'Form Submitted Successfully';
        state.showModal = true;
        showAlert(state, 'primary', 'Form Submitted Successfully!');
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.validationMessage = action.payload;
        state.showModal = true;
        showAlert(state, 'danger', action.payload);
      })
      // Update Data
      .addCase(updateForm.fulfilled, (state, action) => {
        state.items = action.payload;
        state.validationMessage = 'Record updated Successfully';
        state.showModal = true;
        showAlert(state, 'primary', 'Record updated successfully!');
      })
      .addCase(updateForm.rejected, (state, action) => {
        state.validationMessage = action.payload;
        state.showModal = true;
        showAlert(state, 'danger', action.payload);
      });
  }
});

export const { clearMessage, setAlert, clearAlert } = dataSlice.actions;
export default dataSlice.reducer;
