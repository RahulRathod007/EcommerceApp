import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load product. Please check the product ID or try again.');
        setProduct(null);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      alert('Added to cart!');
    }
  };

  if (!id) return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-red-100 text-red-800 rounded-lg">
      No product ID provided.
    </div>
  );
  if (error) return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-red-100 text-red-800 rounded-lg">
      {error}
    </div>
  );
  if (!product) return (
    <div className="max-w-4xl mx-auto mt-8 p-6 text-gray-600">
      Loading...
    </div>
  );

  const sizeDisplay = Array.isArray(product.size) ? product.size.join(', ') : product.size || 'N/A';
  const discountedPrice = product.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2)
    : null;

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="relative md:w-1/2">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg bg-white"
            />
          )}
          <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
          {product.discount && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Details Section */}
        <div className="md:w-1/2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">{product.name}</h2>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-3">
              <span className="text-sm bg-green-500 text-white px-2 py-0.5 rounded">{product.rating} ★</span>
              <span className="text-xs text-gray-500 ml-2">({Math.floor(Math.random() * 1000) + 100} ratings)</span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center mb-3">
            <span className="text-2xl font-semibold text-gray-800">
              ${discountedPrice || product.price}
            </span>
            {discountedPrice && (
              <span className="text-base text-gray-500 line-through ml-3">${product.price}</span>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-2 text-gray-600">
            <p className="text-base">Category: {product.category}</p>
            <p className="text-base">Color: {product.color}</p>
            <p className="text-base">Brand: {product.brand}</p>
            <p className="text-base">Sizes: {sizeDisplay}</p>
            {product.description && (
              <p className="text-base mt-4">{product.description}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-6 rounded-lg text-white font-medium ${
                product.inStock ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!product.inStock}
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate(`/checkout/${id}`)}
              className="flex-1 py-3 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium"
            >
              Buy Now
            </button>
            <button
              onClick={() => navigate('/products')}
              className="flex-1 py-3 px-6 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;