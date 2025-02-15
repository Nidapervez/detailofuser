"use client"
import React, { useState } from "react";
import { useCart } from "./context";
import ShippoData from "./ShippoData";

interface CheckoutFormProps {
  setIsCheckoutVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string; // userId should be passed as a prop
}

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

const CheckoutForm: React.FC<CheckoutFormProps> = ({ setIsCheckoutVisible, userId }) => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      name,
      email,
      address,
      userId, // Save the user ID with the order
      cartItems: cart.items,
    };

    try {
      const response = await fetch("/api/saveOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        setOrderDetails(result.order); // Save the order details
        clearCart(); // Clear the cart after order success
      } else {
        alert("Failed to place the order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (orderDetails) {
    return (
      <div className="p-6 bg-white shadow-lg">
        <h2 className="text-xl font-bold mb-4">Order Confirmation</h2>
        <p className="mb-2"><strong>Order ID:</strong> {orderDetails._id}</p>
        <p className="mb-2"><strong>Name:</strong> {orderDetails.name}</p>
        <p className="mb-2"><strong>Email:</strong> {orderDetails.email}</p>
        <p className="mb-2"><strong>Address:</strong> {orderDetails.address}</p>
        <h3 className="text-lg font-semibold mt-4">Cart Items:</h3>
        <ul className="list-disc pl-5">
          {orderDetails.cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setIsCheckoutVisible(false)}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Close
        </button>

        <ShippoData />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Place Order
        </button>
        <ShippoData />
      </form>
    </div>
  );
};

export default CheckoutForm;
