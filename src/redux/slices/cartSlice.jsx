import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove if quantity reaches 0 or 1 and decrement is clicked
          state.items = state.items.filter(i => i.id !== item.id);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    // Optional: useful for showing cart count in Navbar, etc.
    getTotalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  getTotalItems, // optional
} = cartSlice.actions;

export default cartSlice.reducer;
