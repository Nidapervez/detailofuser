'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { useCart } from "@/app/context";
import { Cart } from "../cart"; // Ensure the Cart component is correctly imported
import { toast } from "react-hot-toast"; // Import toast

interface Product {
  _id: string;
  name: string;
  description: string;
  price: string; // Updated to string to match the schema
  discountPercentage?: number;
  priceWithoutDiscount?: string; // Updated to string
  rating: number;
  ratingCount: number;
  tags?: string[];
  sizes?: string[];
  image: string; // Updated to string for image URL
  stockLevel: number;
  category: string;
  isFeaturedProduct: boolean;
}

const Page = () => {
  const [bags, setBags] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { add } = useCart(); // Access the add function from the cart context

  useEffect(() => {
    const fetchBags = async () => {
      const query = `*[_type == "product"]{
        _id,
        name,
        description,
        price,
        discountPercentage,
        priceWithoutDiscount,
        rating,
        ratingCount,
        tags,
        sizes,
        image,
        stockLevel,
        category,
        isFeaturedProduct
      }`;

      try {
        const result = await client.fetch(query);
        setBags(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBags();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold mt-20">Loading products...</div>;
  }

  if (bags.length === 0) {
    return <div className="text-center text-lg font-semibold mt-20">No products found.</div>;
  }

  return (
    <div className="container mx-auto mt-10 px-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Product List</h1>

      {/* Display the Cart component */}
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {bags.map((bag) => (
          <div
            key={bag._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl flex flex-col h-full"
          >
            <div className="flex flex-col items-center p-4 flex-grow">
              <Link href={`/shoppingcart/${bag._id}`}>
                <Image
                  src={bag.image || "/placeholder.png"} // Handle the image URL
                  alt={bag.name || "Product Image"}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
              </Link>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{bag.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{bag.description}</p>
              <p className="text-lg font-semibold text-gray-800">
                ${parseFloat(bag.price).toFixed(2)} {/* Ensure price is parsed as a number */}
                {bag.discountPercentage && (
                  <span className="ml-2 text-sm text-red-500 line-through">
                    ${parseFloat(bag.priceWithoutDiscount || "0").toFixed(2)} {/* Handle discount price */}
                  </span>
                )}
              </p>
              <div className="flex justify-between items-center mt-4 w-full">
                <span className="text-sm text-yellow-500">{bag.rating} ★</span>
                <span className="text-sm text-gray-500">{bag.ratingCount} reviews</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Category: {bag.category} {/* Display category */}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Stock Level: {bag.stockLevel} {/* Display stock level */}
              </div>
            </div>
            {/* Add to Cart Button */}
            <button
              onClick={() => {
                add({
                  id: bag._id,
                  name: bag.name,
                  price: parseFloat(bag.price), // Ensure price is passed as a number
                  quantity: 1,
                  image: bag.image || "/placeholder.png", // Include image in cart
                });
                toast.success(`${bag.name} added to cart!`); // Show toast when item is added
              }}
              className="mt-4 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            >
              Add to Cart
            </button>

         
          </div>
        ))}
      </div>
      <Cart />
    </div>
  );
};

export default Page;
