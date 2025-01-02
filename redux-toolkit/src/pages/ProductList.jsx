import React from "react";

const ProductList = React.memo(({ filteredProducts, handleAddToCart }) => {
  return (
    <div className="container mx-auto p-4">
      {/* Responsive grid layout for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col border"
          >
            {/* Card Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={card.thumbnail}
                alt={`Product ${card.title}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {card.description}
              </p>
            </div>

            {/* Price and Rating */}
            <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
              <span className="text-primary font-bold text-lg">
                ${card.price}
              </span>
              <span className="text-yellow-500 font-medium">
                {card.rating} ⭐
              </span>
            </div>

            {/* Add to Cart Button */}
            <div className="p-4">
              <button
                onClick={() => handleAddToCart(card)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ProductList;
