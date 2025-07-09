import { createSlice } from '@reduxjs/toolkit';

// Apply filters, search, and sort (case-insensitive)
const applyFiltersAndSort = (state) => {
  const { size, color, brand, category } = state.filters;

  let result = state.products.filter((product) => {
    return (
      (!size.length || size.some((s) => product.size?.map(v => v.toLowerCase()).includes(s))) &&
      (!color.length || color.includes(product.color?.toLowerCase())) &&
      (!brand.length || brand.includes(product.brand?.toLowerCase())) &&
      (!category.length || category.includes(product.category?.toLowerCase())) &&
      product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  });

  // Sort
  if (state.sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (state.sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (state.sort === 'popularity-asc') {
    result.sort((a, b) => a.popularity - b.popularity);
  } else {
    result.sort((a, b) => b.popularity - a.popularity);
  }

  state.filteredProducts = result;
};

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    filters: { size: [], color: [], brand: [], category: [] },
    sort: 'price-asc',
    searchQuery: '',
    visibleCount: 2,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      applyFiltersAndSort(state);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      applyFiltersAndSort(state);
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      applyFiltersAndSort(state);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      applyFiltersAndSort(state);
    },
    loadMore: (state) => {
      state.visibleCount += 2;
    },
  },
});

export const {
  setProducts,
  setFilters,
  setSort,
  setSearchQuery,
  loadMore,
} = productSlice.actions;

export default productSlice.reducer;
