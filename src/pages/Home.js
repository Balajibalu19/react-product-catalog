import React, { useState } from "react";
import productsData from "../data/products.json";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [categories] = useState([
    "All",
    ...new Set(productsData.map((product) => product.category)),
  ]);

  const handleSearch = (searchTerm) => {
    const results = productsData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  };

  const handleCategoryFilter = (category) => {
    if (category === "All") {
      setFilteredProducts(productsData);
    } else {
      const results = productsData.filter(
        (product) => product.category === category
      );
      setFilteredProducts(results);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Catalog</h1>
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter categories={categories} onFilter={handleCategoryFilter} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Home;
