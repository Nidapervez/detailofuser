"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

type Address = {
  state_province: string;
  street1: string;
  postal_code: string;
  country_code: string;
  city_locality: string;
};

type Order = {
  name: string;
  email: string;
  address: Address;
  createdAt: string;
  cartItems: CartItem[] | null;
};

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const query = `*[_type == "order"]{
        name,
        email,
        address,
        createdAt,
        cartItems[]->{
          _id,
          name,
          price,
          quantity
        }
      }`;
      const data = await client.fetch(query);
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Admin Dashboard
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-left text-sm sm:text-base">
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Name</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Email</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Address</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Cart Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 text-sm sm:text-base"
              >
                <td className="border border-gray-300 px-2 sm:px-4 py-2">
                  {order.name}
                </td>
                <td className="border border-gray-300 px-2 sm:px-4 py-2">
                  {order.email}
                </td>
                <td className="border border-gray-300 px-2 sm:px-4 py-2">
                  {order.address ? (
                    <div>
                      <p>{order.address.street1}</p>
                      <p>
                        {order.address.city_locality},{" "}
                        {order.address.state_province}
                      </p>
                      <p>{order.address.postal_code}</p>
                      <p>{order.address.country_code}</p>
                    </div>
                  ) : (
                    <p>No address available</p>
                  )}
                </td>
                <td className="border border-gray-300 px-2 sm:px-4 py-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 sm:px-4 py-2">
                  <ul>
                    {order.cartItems && order.cartItems.length > 0 ? (
                      order.cartItems.map((item, idx) =>
                        item ? (
                          <li key={idx}>
                            {item.name} - {item.quantity} x ${item.price}
                          </li>
                        ) : null
                      )
                    ) : (
                      <li>No items in the cart</li>
                    )}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
