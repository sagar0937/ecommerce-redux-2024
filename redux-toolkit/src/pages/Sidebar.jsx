// Sidebar.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state?.productSlice);

  const handlePriceChange = (e) => {
    dispatch(setPriceRange([+e.target.min, +e.target.value]));
  };

  const handleBrandChange = (brand) => {
    dispatch(setBrandFilter(brand));
  };

  const handleRatingChange = (rating) => {
    dispatch(setRatingFilter(rating));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  // Fetch products when any filter is applied
  useEffect(() => {
    dispatch(fetchProducts({ limit: 10, skip: 0, filters }));
  }, [filters, dispatch]);

  return (
    <div className="w-64 p-4 border-r">
      <h2 className="text-xl font-bold">Filters</h2>

      {/* Price Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Price</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div>
          <span>
            Price: {filters.priceRange[0]} - {filters.priceRange[1]}
          </span>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Brand</h3>
        <div>
          {[].map((brand) => (
            <label key={brand} className="block">
              <input
                type="checkbox"
                checked={filters.selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="mr-2"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Rating</h3>
        <div>
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="block">
              <input
                type="checkbox"
                checked={filters.selectedRatings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
                className="mr-2"
              />
              {rating} Stars
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleResetFilters}
        className="bg-gray-500 text-white p-2 rounded"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;
