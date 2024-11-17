import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import useCart to access cart context

const ProductDetailsPage = ({ products }) => {
  const { id } = useParams(); // Extract product ID from URL
  const navigate = useNavigate(); // Navigate back to catalog
  
  // Get addToCart and removeFromCart functions from CartContext
  const { addToCart, removeFromCart, cart } = useCart();

  // Find the product based on the ID from URL params
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto text-center mt-10">
        <h2 className="text-2xl font-bold text-red-500">Product Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Go Back to Products
        </button>
      </div>
    );
  }

  // Check if the product is already in the cart
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4"
      >
        Go Back to Catalog
      </button>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/3 rounded-lg shadow"
        />
        <div>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-green-600 font-bold text-xl">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Conditionally render Add to Cart or Remove from Cart button */}
          {isInCart ? (
            <button
              onClick={() => removeFromCart(product.id)} // Remove from cart if already added
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={() => addToCart(product)} // Add to cart if not already in the cart
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;





