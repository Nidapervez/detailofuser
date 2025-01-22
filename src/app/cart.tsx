"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "./context";
import CheckoutForm from "./CheckoutForm";
import Link from "next/link";
import { toast } from "react-hot-toast";

export const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, deleteItem, clearCart } = useCart();
  const [isCheckoutVisible, setIsCheckoutVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect screen size for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCheckoutClick = () => {
    if (cart.items.length > 0) {
      setIsCheckoutVisible(true);
    } else {
      toast.error("Your cart is empty! Add items to proceed.");
    }
  };

  // Calculate total quantity and price
  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Your Shopping Cart</h1>
      <div>
        {cart.items.length > 0 ? (
          <ol className="space-y-6">
            {cart.items.map((val, i) => (
              <li
                key={i}
                className="flex justify-between items-center border-b pb-6 border-gray-300"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={val.image || "/placeholder.png"}
                    alt={val.name}
                    className="w-20 h-20 object-cover rounded-md shadow-md"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-700">{val.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {val.quantity}</p>
                    <p className="text-sm text-gray-600">
                      Price: <span className="font-medium">${(val.price * val.quantity).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md shadow-md text-sm"
                    onClick={() => {
                      increaseQuantity(val.id);
                      toast.success(`Increased quantity of ${val.name}`);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-md text-sm"
                    onClick={() => {
                      if (val.quantity > 1) {
                        decreaseQuantity(val.id);
                        toast.success(`Decreased quantity of ${val.name}`);
                      } else {
                        toast.error(`Cannot decrease below 1`);
                      }
                    }}
                  >
                    -
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md shadow-md text-sm"
                    onClick={() => {
                      deleteItem(val.id);
                      toast.success(`Removed ${val.name} from the cart`);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        )}
      </div>
      {cart.items.length > 0 && (
        <div className="mt-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Total Quantity: <span className="text-blue-600">{totalQuantity}</span>
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Total Price: <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </p>
          </div>
          <div className="mt-6 space-y-4">
            <button
              onClick={handleCheckoutClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md shadow-md text-lg"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => {
                clearCart();
                toast.success("Cart cleared successfully!");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md shadow-md text-lg"
            >
              Clear Cart
            </button>
            <Link href="/">
              <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md shadow-md text-lg">
                Back to Shop
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Only render the CheckoutForm if there are items in the cart */}
      {isCheckoutVisible && cart.items.length > 0 && (
        <div className="mt-10">
          <CheckoutForm setIsCheckoutVisible={setIsCheckoutVisible} userId="user123" />
        </div>
      )}
    </div>
  );
};
