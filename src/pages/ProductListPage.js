import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Cart Icon
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductListPage = ({ products }) => {
  const { addToCart, cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ["Electronics", "Footwear", "Clothing"];

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategories.length === 0 || selectedCategories.includes(product.category)
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

  return (
    <div className="max-w-6xl mx-auto p-4 relative">
      {/* Main Heading */}
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 mb-6 text-center drop-shadow-lg">
        Explore Our Exclusive Collection
      </h1>

      {/* Search Bar with Icon */}
      <div className="mb-6 flex justify-center">
  <div className="relative w-full max-w-xl">
    <input
      type="text"
      id="search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-4 text-sm rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out placeholder-gray-500"
      placeholder="Search Products..." />
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

      {/* Filter and Sort Section */}
      <div className="flex justify-between mb-4">
        {/* Category Filters */}
        <div className="flex gap-4">
          <h3 className="font-semibold text-xl">Filter by Category</h3>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${selectedCategories.includes(category)
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-blue-100 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-500"}`}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sort by Price Filter */}
        <div className="flex items-center gap-4">
          <label htmlFor="sort" className="mr-2 font-semibold text-lg">Sort by Price:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md w-48 px-4 py-2 transition-all ease-in-out transform hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
            aria-label="Sort by Price"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-xl transition-all ease-in-out">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm px-4 py-2 rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2"
                aria-label={`Add ${product.name} to cart`}
              >
                <FaShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>

              {/* View Details Button */}
              <Link
                to={`/product/${product.id}`}
                className="inline-block mt-2 text-sm font-semibold text-blue-600 hover:text-white hover:bg-blue-600 border-2 border-blue-600 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                aria-label={`View details of ${product.name}`}
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-lg text-gray-500">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;






























