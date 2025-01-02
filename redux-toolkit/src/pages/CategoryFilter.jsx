// CategoryFilter.js
import React from "react";

const CategoryFilter = ({
  uniqueCategories,
  selectedCategories,
  onCategoryClick,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {uniqueCategories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryClick(category)}
          className={`px-4 py-2 rounded ${
            selectedCategories.includes(category)
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
