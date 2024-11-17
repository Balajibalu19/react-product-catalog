import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-6 flex items-center justify-center">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for products..."
          className="w-full p-4 pl-12 pr-4 rounded-full bg-gray-100 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg transition duration-300 ease-in-out hover:shadow-lg"
        />
        {/* Search Icon */}
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
      </div>
    </div>
  );
};

export default SearchBar;


