// SearchBar.js
import React from "react";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={onSearchChange}
        className="w-full px-4 py-2 border rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
