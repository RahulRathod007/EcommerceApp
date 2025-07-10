# E-commerce Application

## Overview
This is a React-based e-commerce web application featuring a product catalog, search functionality, filters, and basic pages (Home, Product Detail, Checkout, Register). It uses Redux for state management, Bootstrap for styling, and a JSON server for mock API data.

## Features
- Full-screen responsive layout with a navbar including search and navigation links.
- Product listing with search and filter capabilities.
- Product detail, checkout, and registration pages.
- Dynamic product data fetched from a local JSON server.

## Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)
- Git (for cloning the repository)

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the JSON server (for mock API data):
   ```
   npx json-server --watch db.json --port 3000
   ```
   - Ensure `db.json` is in the root directory with product data (e.g., 27 products).
4. Start the React application:
   ```
   npm run dev
   ```
   - Open `http://localhost:3000` in your browser.

## Usage
- Navigate using the navbar (Home, Register, Checkout).
- Use the search bar in the navbar to filter products by name.
- View product details by clicking on a product card.
- Access the checkout or registration pages as needed.

## Project Structure
- `src/App.jsx`: Main application component with routing.
- `src/pages/`: Page components (Home.jsx, ProductDetailPage.jsx, etc.).
- `src/components/Product/`: Product-related components (ProductList.jsx, SearchBar.jsx, etc.).
- `src/redux/slices/productSlice.jsx`: Redux slice for product state.
- `db.json`: Mock API data file.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make changes and commit (`git commit -m "description"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Issues
Report any bugs or feature requests by creating an issue in the repository.

## License
This project is licensed under the MIT License - see the LICENSE file for details (if applicable, add a LICENSE file).

## Acknowledgments
- Built with React, Redux, Bootstrap, and json-server.
- Icons and images sourced from Unsplash (example URLs in db.json).
=======
# React + Vite

