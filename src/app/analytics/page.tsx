"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; // Adjust the path to your sanity.js file
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define types for the cart item and order
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
  cartItems: CartItem[] | null; // cartItems can be null
};

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]); // State type is an array of Order objects
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalItemsSold, setTotalItemsSold] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  useEffect(() => {
    // Fetch orders from Sanity
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

      // Calculate total revenue, total items sold, and total orders
      let revenue = 0;
      let itemsSold = 0;
      let ordersCount = data.length;

      data.forEach((order: Order) => {  // Explicitly type `order` as `Order`
        if (order.cartItems) {
          order.cartItems.forEach((item: CartItem) => {  // Explicitly type `item` as `CartItem`
            if (item) { // Ensure item is not null
              revenue += item.price * item.quantity;
              itemsSold += item.quantity;
            }
          });
        }
      });

      setTotalRevenue(revenue);
      setTotalItemsSold(itemsSold);
      setTotalOrders(ordersCount);
    };

    fetchOrders();
  }, []);

  // Data for the bar chart
  const chartData = {
    labels: ["Total Revenue", "Total Items Sold", "Total Orders"],
    datasets: [
      {
        label: "Analytics",
        data: [totalRevenue, totalItemsSold, totalOrders],
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
        borderColor: ["#4CAF50", "#FFC107", "#2196F3"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      
      {/* Analytics Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-medium">Total Revenue</h3>
            <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-medium">Total Items Sold</h3>
            <p className="text-2xl">{totalItemsSold}</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-medium">Total Orders</h3>
            <p className="text-2xl">{totalOrders}</p>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Analytics Visualization</h2>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Cart Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{order.name}</td>
                <td className="border border-gray-300 px-4 py-2">{order.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {/* Render the address properties */}
                  {order.address ? (
                    <div>
                      <p>{order.address.street1}</p>
                      <p>{order.address.city_locality}, {order.address.state_province}</p>
                      <p>{order.address.postal_code}</p>
                      <p>{order.address.country_code}</p>
                    </div>
                  ) : (
                    <p>No address available</p>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <ul>
                    {order.cartItems && order.cartItems.length > 0 ? (
                      order.cartItems.map((item, idx) => (
                        item ? (
                          <li key={idx}>
                            {item.name} - {item.quantity} x ${item.price}
                          </li>
                        ) : null
                      ))
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
