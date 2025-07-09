import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    // ✅ Show SweetAlert instead of regular alert
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${product.name} has been added to your cart.`,
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  return (
    <Card
      style={{
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
      }}
    >
      {product.image && (
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            height: '350px',
            objectFit: 'fit'
          }}
        />
      )}
      <Card.Body>
        <Card.Title
          style={{
            fontSize: '1.3rem',
            fontWeight: '600',
            color: '#2c3e50',
            marginBottom: '10px'
          }}
        >
          {product.name}
        </Card.Title>
        <Card.Text style={{ fontSize: '0.95rem', color: '#7f8c8d' }}>
          Price: ${product.price} <br />
          Category: {product.category} <br />
          Color: {product.color} <br />
          Brand: {product.brand}
        </Card.Text>

        <Button
          variant="success"
          onClick={handleAddToCart}
          style={{
            backgroundColor: '#2ecc71',
            borderColor: '#2ecc71',
            borderRadius: '25px',
            padding: '8px 15px'
          }}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
