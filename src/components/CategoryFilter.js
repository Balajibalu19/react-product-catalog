import React from "react";

const CategoryFilter = ({ categories, onFilter }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-700 text-center">Choose a Category</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilter(category)}
            className="px-6 py-3 text-lg font-medium rounded-full transition-all duration-300 bg-gray-200 text-gray-700 border-2 border-gray-300 hover:bg-blue-100 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-500"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;


