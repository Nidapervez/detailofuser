'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/app/wishlistcontext";
import { toast } from "react-hot-toast";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.items.length === 0) {
    return (
      <div className="text-center text-lg font-semibold mt-20">
        Your wishlist is empty. Start adding your favorite products!
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl flex flex-col h-full"
          >
            <div className="flex flex-col items-center p-4 flex-grow">
              <Link href={`/shoppingcart/${item.id}`}>
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name || "Product Image"}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
              </Link>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
              <p className="text-lg font-semibold text-gray-800">
                ${item.price.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => {
                removeFromWishlist(item.id);
                toast.success(`${item.name} removed from wishlist.`);
              }}
              className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            >
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
