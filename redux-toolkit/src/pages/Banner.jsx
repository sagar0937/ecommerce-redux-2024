import React, { useState, useEffect } from "react";

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  const banners = [
    "https://via.placeholder.com/1200x400/FF5733/FFFFFF?text=Banner+1",
    "https://via.placeholder.com/1200x400/33FF57/FFFFFF?text=Banner+2",
    "https://via.placeholder.com/1200x400/3357FF/FFFFFF?text=Banner+3",
  ];

  // Move to the next slide
  const nextSlide = () => {
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  // Move to the previous slide
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // 3 seconds interval for auto-slide

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full h-64 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <img
        src={banners[current]}
        alt={`banner-${current}`}
        className="w-full h-full object-cover"
      />
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 px-4 py-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 px-4 py-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
};

export default BannerSlider;
