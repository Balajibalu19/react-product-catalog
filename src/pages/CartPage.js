import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import useCart for cart data
import { FaTrashAlt } from "react-icons/fa"; // Import delete icon from React Icons

const CartPage = () => {
  const navigate = useNavigate(); // Initialize navigate hook to handle page navigation
  const { cart, removeFromCart } = useCart(); // Access cart data and remove function from CartContext

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page (product listing page)
  };

  const handleDelete = (id) => {
    removeFromCart(id); // Call removeFromCart function from context to remove item by id
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty! Add some products.</p> // Message when the cart is empty
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>{item.description}</p>
                  <p className="text-green-600 font-bold">${item.price.toFixed(2)}</p>
                </div>

                {/* Delete Icon with hover effect */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800 text-2xl focus:outline-none transition duration-300"
                >
                  <FaTrashAlt /> {/* Delete Icon */}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-4 py-2 rounded-full hover:scale-105 transition-all duration-300"
      >
        Back to Product Listing
      </button>
    </div>
  );
};

export default CartPage;








