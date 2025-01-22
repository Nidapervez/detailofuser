'use client';

import React, { createContext, useContext, useReducer } from "react";

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface WishlistState {
  items: WishlistItem[];
}

interface WishlistContextType {
  wishlist: WishlistState;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: any): WishlistState => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, { items: [] });

  const addToWishlist = (item: WishlistItem) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: item });
  };

  const removeFromWishlist = (id: string) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
