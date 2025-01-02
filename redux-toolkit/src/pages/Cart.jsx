import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeCart,
  incrementItem,
  decrementItem,
} from "../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.data);
  console.log(cartItems);

  const removeFromCart = (id) => {
    console.log("---", id);
    dispatch(removeCart(id));
  };
  const incrementQuantity = (id) => {
    dispatch(incrementItem(id));
  };
  const decrementQuantity = (id) => {
    dispatch(decrementItem(id));
  };
  const totoQuantity = () => {
    return cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
  };
  const totalPrice = () => {
    return cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  };
  if (cartItems.length === 0) {
    return <>No Item in Cart</>;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
          >
            {/* Product Image */}
            <img
              src={item.thumbnail}
              alt={item.thumbnail}
              className="w-16 h-16 object-cover rounded"
            />

            {/* Product Name */}
            <div className="flex-1 px-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-500">${item.price} each</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => decrementQuantity(item.id)}
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
              >
                -
              </button>
              <span className="text-lg font-medium">{item.quantity}</span>
              <button
                onClick={() => incrementQuantity(item.id)}
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
              >
                +
              </button>
            </div>

            {/* Total Price for Product */}
            <p className="text-lg font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold">Cart Summary</h2>
        <div className="flex justify-between mt-4">
          <b>Total Quantity:{totoQuantity()}</b>
          {/* <p className="font-semibold">{totalQuantity}</p> */}
        </div>
        <div className="flex justify-between">
          <b>Total Price:{totalPrice().toFixed(2)}</b>
          {/* <p className="font-semibold">${totalPrice}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
