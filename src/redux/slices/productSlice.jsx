import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    filters: { size: [], color: [], brand: [] },
    sort: 'price-asc',
    searchQuery: '',
    visibleCount: 2,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredProducts = state.products.filter((product) => {
        return (
          (!state.filters.size.length || state.filters.size.some((size) => product.size.includes(size))) &&
          (!state.filters.color.length || state.filters.color.includes(product.color)) &&
          (!state.filters.brand.length || state.filters.brand.includes(product.brand)) &&
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      });
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      state.filteredProducts = [...state.filteredProducts].sort((a, b) => {
        if (action.payload === 'price-asc') return a.price - b.price;
        if (action.payload === 'price-desc') return b.price - a.price;
        if (action.payload === 'popularity-asc') return a.popularity - b.popularity;
        return b.popularity - a.popularity;
      });
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    loadMore: (state) => {
      state.visibleCount += 2;
    },
  },
});

export const { setProducts, setFilters, setSort, setSearchQuery, loadMore } = productSlice.actions;
export default productSlice.reducer;