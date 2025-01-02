import React, { useEffect, useMemo, Suspense, lazy, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setSort,
  setCategoryFilter,
  setSearchQuery,
  setPage,
} from "../features/productSlice";
import { addToCart } from "../features/cartSlice";
const BannerSlider = lazy(() => import("./Banner"));
const ProductList = lazy(() => import("./ProductList"));
import Pagination from "./Pagination";
import SearchBar from "./SearchBox";
import CategoryFilter from "./CategoryFilter";
import AddProductForm from "./AddProduct";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Extract required states from Redux store
  const {
    data: products,
    loading,
    error,
    currentPage,
    total,
    itemsPerPage,
    sortBy,
    order,
    filters: { category: selectedCategories },
    searchQuery,
  } = useSelector((state) => state.productSlice);

  // Handle adding a product to the cart
  const handleAddToCart = useCallback((product) => {
    dispatch(addToCart(product));
  }, []);

  const handleSearchChange = React.useCallback(
    (e) => {
      dispatch(setSearchQuery(e.target.value)); // Update search query
      dispatch(setPage(1)); // Reset to the first page when searching
    },
    [searchQuery]
  );

  const handleCategoryClick = (category) => {
    dispatch(setCategoryFilter(category)); // Toggle category selection
  };

  // Memoize unique categories to avoid re-calculation on each render
  const uniqueCategories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  // Fetch products when dependencies change
  useEffect(() => {
    const skip = (currentPage - 1) * itemsPerPage;
    dispatch(fetchProducts({ limit: itemsPerPage, skip, order }));
  }, [dispatch, currentPage, itemsPerPage, sortBy, order]);

  // Handle sort change
  const handleSortChange = (e) => {
    const [sortBy, order] = e.target.value.split("-");
    console.log({ sortBy, order });
    dispatch(setSort({ sortBy, order }));
  };
  // Memoize filtered products to prevent unnecessary filtering on each render
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategories]);

  const handlePageChange = (page) => {
    dispatch(setPage(page)); // Update current page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="p-4">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <CategoryFilter
          uniqueCategories={uniqueCategories}
          selectedCategories={selectedCategories}
          onCategoryClick={handleCategoryClick}
        />

        <div>
          <Suspense fallback={<div>Loading Products...</div>}>
            <ProductList
              filteredProducts={filteredProducts}
              handleAddToCart={handleAddToCart}
            />
          </Suspense>
        </div>

        {/* Pagination */}
        {filteredProducts?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={total}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
