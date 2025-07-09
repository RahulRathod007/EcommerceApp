import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const Filters = ({ setFilters, setSort }) => {
  const categories = ['', 'Clothing', 'Footwear'];
  const sizes = ['', 'S', 'M', 'L'];
  const colors = ['', 'Blue', 'Red', 'Black'];
  const brands = ['', 'Nike', 'Adidas', 'Puma'];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value ? [value] : [],
    }));
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  // Styles for the form and select elements
  const formStyles = {
    backgroundColor: '#F4BB44' ,
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  };
  const labelStyles = {
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '10px',

  };
  const selectStyles = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };
  const selectFocusStyles = {
    borderColor: '#007bff',
    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
  };
  
  // Handle focus state for select inputs
  const handleSelectFocus = (e) => {
    e.target.style.borderColor = selectFocusStyles.borderColor;
    e.target.style.boxShadow = selectFocusStyles.boxShadow;
  };

  const handleSelectBlur = (e) => {
    e.target.style.borderColor = selectStyles.border;
    e.target.style.boxShadow = 'none';
  };

  return (
    <Form style={formStyles} className="mb-4">
      <Row>
        <Col>
          <Form.Group>
            <Form.Label style={labelStyles}>Category</Form.Label>
            <Form.Select
              name="category"
              onChange={handleFilterChange}
              onFocus={handleSelectFocus}
              onBlur={handleSelectBlur}
              style={selectStyles}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat || 'All'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label style={labelStyles}>Size</Form.Label>
            <Form.Select
              name="size"
              onChange={handleFilterChange}
              onFocus={handleSelectFocus}
              onBlur={handleSelectBlur}
              style={selectStyles}
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size || 'All'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label style={labelStyles}>Color</Form.Label>
            <Form.Select
              name="color"
              onChange={handleFilterChange}
              onFocus={handleSelectFocus}
              onBlur={handleSelectBlur}
              style={selectStyles}
            >
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color || 'All'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label style={labelStyles}>Brand</Form.Label>
            <Form.Select
              name="brand"
              onChange={handleFilterChange}
              onFocus={handleSelectFocus}
              onBlur={handleSelectBlur}
              style={selectStyles}
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand || 'All'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label style={labelStyles}>Sort By</Form.Label>
            <Form.Select
              onChange={handleSortChange}
              onFocus={handleSelectFocus}
              onBlur={handleSelectBlur}
              style={selectStyles}
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popularity-desc">Popularity</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;