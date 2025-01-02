// SortOptions.js
import React from "react";

const SortOptions = ({ sortBy, order, onSortChange }) => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <select
        className="px-4 py-2 border rounded-lg"
        onChange={onSortChange}
        value={`${sortBy}-${order}`}
      >
        <option value="title-asc">Title: A to Z</option>
        <option value="title-desc">Title: Z to A</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortOptions;
