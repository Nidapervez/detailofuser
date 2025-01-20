"use client"
import React, { useState, useEffect } from "react";
import { useCart } from "./context";
import CheckoutForm from "./CheckoutForm";
import Link from "next/link";

interface OrderDetails {
  _id: string;
  name: string;
  email: string;
  address: string;
  cartItems: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, deleteItem } = useCart();
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState<boolean>(false); // Track checkout form visibility
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null); // New state for order details
  const [isMobile, setIsMobile] = useState<boolean>(false); // Track if the screen is mobile

  // Detect screen size for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this width as needed for mobile
    };
    handleResize(); // Initial check
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
    setIsCheckoutVisible(true); // Show checkout form
  };

  return (
    <>
      {/* Cart Sidebar for Desktop */}
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
                        onClick={() => increaseQuantity(val.id)}
                      >
                        +
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded-md text-sm sm:text-base"
                        onClick={() => decreaseQuantity(val.id)}
                      >
                        -
                      </button>
                      <button
                        className="bg-gray-600 text-white px-2 py-1 rounded-md text-sm sm:text-base"
                        onClick={() => deleteItem(val.id)}
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
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-blue-600 text-white py-2 rounded-md"
                >
                  Proceed to Checkout
                </button>
                <Link href='/'><button className="w-full bg-blue-600 text-white py-2 rounded-md mt-20">Back</button></Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile View */}
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
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Checkout Form */}
      {isCheckoutVisible && (
        <CheckoutForm setIsCheckoutVisible={setIsCheckoutVisible} userId="user123" />
      )}
    </>
  );
};
