import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  addData: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  itemsPerPage: 20,
  sortBy: "title",
  order: "asc", // 'asc' for ascending, 'desc' for descending
  filters: {
    category: [], // To hold selected categories
  },
  searchQuery: "", // Search query for filtering
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit, skip, sortBy, order }) => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    return data;
  }
);
// Async thunk for adding a product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const data = await response.json();
      return data; // Return the product data to be handled in the reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
    },
    setCategoryFilter: (state, action) => {
      const category = action.payload;
      if (state.filters.category.includes(category)) {
        state.filters.category = state.filters.category.filter(
          (cat) => cat !== category
        );
      } else {
        state.filters.category.push(category);
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data.push(action.payload); // Add new product to the state
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload; // Handle error
      });
  },
});

export const { setPage, setSort, setCategoryFilter, setSearchQuery } =
  productSlice.actions;
export default productSlice.reducer;
