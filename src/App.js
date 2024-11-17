// App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Use HashRouter
import { CartProvider } from "./context/CartContext"; // Import the CartProvider
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import productsData from "./data/products.json"; // Assuming you have product data in this file

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Product List Route */}
          <Route path="/" element={<ProductListPage products={productsData} />} />
          
          {/* Product Details Route */}
          <Route 
            path="/product/:id" 
            element={<ProductDetailsPage products={productsData} />} 
          />
          
          {/* Cart Page Route */}
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;









