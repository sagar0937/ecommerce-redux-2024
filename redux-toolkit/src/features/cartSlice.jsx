import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload; // New item to add
      const existingItem = state.data.find(
        (item) => item.id == action.payload.id
      );
      if (existingItem) {
        // If item already exists, increment quantity
        existingItem.quantity += 1;
      } else {
        // Add new item with initial quantity of 1
        state.data.push({ ...newItem, quantity: 1 });
      }
    },
    removeCart: (state, action) => {
      const itemId = action.payload; // The id of the item to remove
      state.data = state.data.filter((item) => item.id !== itemId);
    },
    incrementItem: (state, action) => {
      const itemId = action.payload; // New item to add
      const existingItem = state.data.find((item) => item.id === itemId);
      if (existingItem) {
        // If item already exists, increment quantity
        existingItem.quantity += 1;
      }
    },
    // Decrement quantity of a specific item
    decrementItem: (state, action) => {
      const itemId = action.payload; // Item ID
      const existingItem = state.data.find((item) => item.id === itemId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
  },
});
export const { addToCart, removeCart, incrementItem, decrementItem } =
  cartSlice.actions;
export default cartSlice.reducer;
