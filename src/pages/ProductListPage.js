import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa"; // Cart and Search Icons
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductListPage = ({ products }) => {
  const { addToCart, cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ratings, setRatings] = useState({}); // To store ratings for products

  const categories = ["Electronics", "Footwear", "Clothing"];

  // Generate random ratings for each product
  useEffect(() => {
    const initialRatings = {};
    products.forEach((product) => {
      // Random rating between 1 and 5
      initialRatings[product.id] = Math.floor(Math.random() * 5) + 1;
    });
    setRatings(initialRatings);
  }, [products]);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const toggleCategory = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((cat) => cat !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleRating = (productId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: rating,
    }));
  };

  const renderStars = (productId) => {
    const rating = ratings[productId] || 0; // Default rating to 0 if not yet rated
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleRating(productId, i)}
        >
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="flex-1 bg-gray-100">
      <div className="max-w-6xl mx-auto p-4 relative ">
        {/* Main Heading */}
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 mb-6 text-center drop-shadow-lg">
          Explore Our Exclusive Collection
        </h1>

        {/* Container for Category Filters and Sort by Price */}
        <div className="flex flex-wrap justify-between items-center mb-6 p-4 rounded-xl bg-gray-200 shadow-lg">
          {/* Category Filters - Left Side */}
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`flex items-center px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 transform ${
                  selectedCategories.includes(category)
                    ? "text-white bg-gradient-to-r from-gray-600 to-gray-800 border-2 border-transparent shadow-lg"
                    : "text-gray-600 bg-gray-300 border border-gray-400 hover:bg-gray-400 hover:text-gray-700 hover:border-gray-500"
                } hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50`}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar with Icon */}
          <div className="relative w-full max-w-sm mt-4 md:mt-0">
            <div className="flex items-center bg-gray-300 text-gray-700 rounded-full shadow-md focus-within:ring-4 focus-within:ring-gray-600">
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-4 pr-10 text-sm font-medium rounded-full bg-transparent placeholder-gray-500 focus:outline-none"
                placeholder="Search for items..."
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                <FaSearch />
              </span>
            </div>
          </div>
        </div>

        {/* Sort by Price Filter - Right Side */}
        <div className="flex items-center gap-6 mb-6 justify-end">
          <label
            htmlFor="sort"
            className="text-lg font-semibold text-gray-300 mr-3"
          >
            Sort by Price:
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-800 text-gray-200 border border-gray-600 rounded-full shadow-lg w-44 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out hover:border-blue-400 cursor-pointer appearance-none"
              aria-label="Sort by Price"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 5.5a.5.5 0 0 1 .708 0L8 9.293l3.792-3.793a.5.5 0 1 1 .707.707l-4.5 4.5a.5.5 0 0 1-.707 0l-4.5-4.5a.5.5 0 0 1 0-.707z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Cart Icon with Item Count */}
        <div className="absolute top-4 right-4">
          <Link to="/cart">
            <button className="relative" aria-label="Go to Cart">
              <FaShoppingCart size={30} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </Link>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all ease-in-out transform hover:scale-105 relative group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  {/* Add to Cart Button (Always visible with transparent background) */}
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute top-4 left-4 bg-transparent border border-gray-600 text-gray-700 px-4 py-2 rounded-full text-sm font-medium opacity-90 hover:opacity-100 hover:shadow-lg hover:bg-gray-700 transition-all duration-300 ease-in-out"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add to Cart
                  </button>
                </div>

                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-green-600 font-bold">
                  ${product.price.toFixed(2)}
                </p>

                {/* Rating System */}
                <div className="flex mt-2">{renderStars(product.id)}</div>

                {/* Right-Aligned View More Button */}
                <button
                  onClick={() => openModal(product)}
                  className="mt-4 ml-auto block bg-transparent border-2 border-gray-500 text-gray-500 px-4 py-2 rounded-full text-sm font-medium opacity-80 hover:opacity-100 hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
                  aria-label={`View details of ${product.name}`}
                >
                  View More
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-lg text-gray-500">
              No products found matching your criteria.
            </div>
          )}
        </div>

        {/* Product Details Modal */}
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-3xl relative">
              {/* Header with Title and Close Button */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {selectedProduct.name}
                  </h2>
                  <h4 className="text-gray-600">{selectedProduct.category}</h4>
                </div>
                <button
                  onClick={closeModal}
                  className="text-black text-2xl font-bold p-2 rounded-full hover:bg-gray-200 transition-all"
                  aria-label="Close Modal"
                >
                  ×
                </button>
              </div>

              {/* Product Details */}
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="w-1/2">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="w-1/2">
                  <p className="text-xl text-green-600 font-bold">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                  <div className="flex mt-2">
                    {renderStars(selectedProduct.id)}
                  </div>
                  <p className="text-gray-700 mt-4">
                    {selectedProduct.description}
                  </p>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    className="mt-6  border border-gray-500 text-gray-500 px-6 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-black hover:shadow-lg transition-all duration-300 ease-in-out"
                    aria-label={`Add ${selectedProduct.name} to cart`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
