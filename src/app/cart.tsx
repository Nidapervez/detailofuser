"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "./context";
import CheckoutForm from "./CheckoutForm";
import Link from "next/link";
import { toast } from "react-hot-toast";

export const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, deleteItem, clearCart } = useCart();
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
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

  const handleMouseEnter = () => {
    setIsCartVisible(true);
  };

  const handleMouseLeave = () => {
    if (cart.items.length === 0) {
      setIsCartVisible(false);
    }
  };

  useEffect(() => {
    if (cart.items.length > 0) {
      setIsCartVisible(true);
    }
  }, [cart.items.length]);

  const handleCheckoutClick = () => {
    setIsCheckoutVisible(true);
  };

  // Calculate total quantity and price
  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <>
      {!isMobile && (
        <div
          className="fixed right-0 w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out"
          style={{
            top: "64px",
            height: "calc(100% - 64px)",
            transform: isCartVisible ? "translateX(0)" : "translateX(100%)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-6 overflow-y-auto h-full">
            <h1 className="text-black font-bold text-2xl mb-4">Cart</h1>
            <ol>
              {cart.items.length > 0 ? (
                cart.items.map((val, i) => (
                  <li key={i} className="mb-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={val.image || "/placeholder.png"}
                        alt={val.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <span className="mr-5 text-sm sm:text-base">Name: {val.name}</span>
                        <span className="mr-5 text-sm sm:text-base">Quantity: {val.quantity}</span>
                        <span className="mr-5 text-sm sm:text-base">
                          Price: ${(val.price * val.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="inline-block space-x-2">
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded-md text-sm sm:text-base"
                        onClick={() => {
                          increaseQuantity(val.id);
                          toast.success(`Increased quantity of ${val.name}`);
                        }}
                      >
                        +
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded-md text-sm sm:text-base"
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
                        className="bg-gray-600 text-white px-2 py-1 rounded-md text-sm sm:text-base"
                        onClick={() => {
                          deleteItem(val.id);
                          toast.success(`Removed ${val.name} from the cart`);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-sm sm:text-base">Your cart is empty.</p>
              )}
            </ol>
            {cart.items.length > 0 && (
              <div className="mt-4">
                <div className="mb-4">
                  <p className="text-black font-semibold">
                    Total Quantity: {totalQuantity}
                  </p>
                  <p className="text-black font-semibold">
                    Total Price: ${totalPrice.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-blue-600 text-white py-2 rounded-md"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    toast.success("Cart cleared successfully!");
                  }}
                  className="w-full bg-red-600 text-white py-2 rounded-md mt-4"
                >
                  Clear Cart
                </button>
                <Link href="/">
                  <button className="w-full bg-gray-600 text-white py-2 rounded-md mt-4">
                    Back
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {isMobile && (
        <div
          className="fixed bottom-0 w-full bg-white shadow-xl z-50"
          style={{
            transform: isCartVisible ? "translateY(0)" : "translateY(100%)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-4">
            <h1 className="text-black font-bold text-xl mb-4">Cart</h1>
            {cart.items.length > 0 ? (
              cart.items.map((val, i) => (
                <div key={i} className="flex justify-between items-center mb-4">
                  <span>{val.name}</span>
                  <span>{val.quantity}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
            {cart.items.length > 0 && (
              <div>
                <p className="text-black font-semibold mb-2">
                  Total Quantity: {totalQuantity}
                </p>
                <p className="text-black font-semibold mb-4">
                  Total Price: ${totalPrice.toFixed(2)}
                </p>
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-blue-600 text-white py-2 rounded-md"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    toast.success("Cart cleared successfully!");
                  }}
                  className="w-full bg-red-600 text-white py-2 rounded-md mt-4"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {isCheckoutVisible && (
        <CheckoutForm setIsCheckoutVisible={setIsCheckoutVisible} userId="user123" />
      )}
    </>
  );
};
