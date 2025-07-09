import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Checkout from './src/components/Checkout/Checkout';
import { clearCart } from './src/redux/slices/cartSlice';
import axios from 'axios';

// Mock axios to prevent real API calls
jest.mock('axios');

const mockStore = configureStore([]);

describe('Checkout Component', () => {
  let store;

  beforeEach(() => {
    // Mock cart with quantities
    store = mockStore({
      cart: {
        items: [
          { id: 1, name: 'Blue T-Shirt', price: 20, quantity: 1 },
          { id: 2, name: 'Red Sneakers', price: 50, quantity: 2 },
        ],
      },
    });
    store.dispatch = jest.fn();

    // Mock useParams to return a product ID
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ id: '1' });

    // Mock axios response for product fetch
    axios.get.mockResolvedValue({
      data: { id: '1', name: 'Blue T-Shirt', price: 20 },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should display cart items with quantities and total, and complete purchase', async () => {
    render(
      <Provider store={store}>
        <Checkout />
      </Provider>
    );

    // Wait for component to render with mocked data
    await screen.findByText('Checkout');

    expect(screen.getByText('Blue T-Shirt (x1)')).toBeInTheDocument();
    expect(screen.getByText('Red Sneakers (x2)')).toBeInTheDocument();
    expect(screen.getByText('Total: $120.00')).toBeInTheDocument(); // 20 * 1 + 50 * 2 = 120

    const purchaseButton = screen.getByText('Confirm Purchase');
    fireEvent.click(purchaseButton);

    expect(store.dispatch).toHaveBeenCalledWith(clearCart());
  });

  test('should display single product if no cart items and id exists', async () => {
    store = mockStore({ cart: { items: [] } });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Checkout />
      </Provider>
    );

    await screen.findByText('Checkout');
    expect(screen.getByText('Selected Product')).toBeInTheDocument();
    expect(screen.getByText('Blue T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Price: $20')).toBeInTheDocument();
    expect(screen.getByText('Total: $20.00')).toBeInTheDocument();
  });

  test('should show error message for invalid product ID', async () => {
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ id: 'invalid' });
    axios.get.mockRejectedValue(new Error('Product not found'));

    store = mockStore({ cart: { items: [] } });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Checkout />
      </Provider>
    );

    await screen.findByText('Failed to load product. Please check the product ID or try again later.');
  });

  test('should show no items message if no cart and no id', async () => {
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({});
    store = mockStore({ cart: { items: [] } });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Checkout />
      </Provider>
    );

    await screen.findByText('No product ID or items in cart provided. Please select a product or add items to cart.');
  });

  test('should validate shipping details before purchase', async () => {
    render(
      <Provider store={store}>
        <Checkout />
      </Provider>
    );

    await screen.findByText('Checkout');
    const purchaseButton = screen.getByText('Confirm Purchase');
    fireEvent.click(purchaseButton);

    // Expect alert for missing shipping details (simulated with jest.spyOn)
    expect(window.alert).toHaveBeenCalledWith('Please fill in all shipping details.');
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});