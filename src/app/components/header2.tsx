"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faUser,
  faHeart,
  faShoppingCart,
  faTachometerAlt,
  faCogs,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

const Header1 = () => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-purple-600 text-white text-sm py-2 px-4 flex justify-between items-center max-md:flex-col max-md:space-y-2">
        <div className="flex space-x-6 max-md:justify-center">
          <span className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            mhhasanul@gmail.com
          </span>
          <span className="flex items-center">
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            (12345)67890
          </span>
        </div>
        <div className="flex space-x-6 items-center max-md:justify-center">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              className="flex items-center"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              English <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute bg-white text-gray-800 mt-2 py-2 w-28 shadow-md rounded z-10">
                <button className="block px-4 py-1 hover:bg-gray-200 w-full text-left">
                  English
                </button>
                <button className="block px-4 py-1 hover:bg-gray-200 w-full text-left">
                  Spanish
                </button>
              </div>
            )}
          </div>

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              className="flex items-center"
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
            >
              USD <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
            {isCurrencyDropdownOpen && (
              <div className="absolute bg-white text-gray-800 mt-2 py-2 w-28 shadow-md rounded z-10">
                <button className="block px-4 py-1 hover:bg-gray-200 w-full text-left">
                  USD
                </button>
                <button className="block px-4 py-1 hover:bg-gray-200 w-full text-left">
                  EUR
                </button>
              </div>
            )}
          </div>

          <Link href="/login">
            <button className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Login
            </button>
          </Link>
          <Link href="/wishlist">
            <button className="flex items-center">
              <FontAwesomeIcon icon={faHeart} className="mr-2" /> Wishlist
            </button>
          </Link>
         <Link href='/cart'>
            <button className="flex items-center snipcart-checkout ">
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Cart
            </button>
          </Link>

          <Link href='/dashboard'>
  <button className="flex items-center snipcart-checkout">
    <FontAwesomeIcon icon={faCogs} className="mr-2" /> Admin Dashboard
  </button>
</Link>


<Link href='/analytics'>
  <button className="flex items-center snipcart-checkout">
    <FontAwesomeIcon icon={faChartLine} className="mr-2" /> Analytics
  </button>
</Link>
         
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white py-4 px-4 shadow-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-bold text-gray-800">Hekto</div>

          {/* Hamburger Menu */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-8 text-gray-800 text-sm">
            <li className="hover:text-pink-500 cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <Link href="/pages">
              <li className="hover:text-pink-500 cursor-pointer">Pages</li>
            </Link>
            <Link href="/shoppingcart">
              <li className="hover:text-pink-500 cursor-pointer">Shop</li>
            </Link>
           
            <Link href="/blog">
              <li className="hover:text-pink-500 cursor-pointer">Blog</li>
            </Link>
            <Link href="/shop">
              <li className="hover:text-pink-500 cursor-pointer">More Products</li>
            </Link>
            <Link href="/contact">
              <li className="hover:text-pink-500 cursor-pointer">Contact</li>
            </Link>
          </ul>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <ul className="flex flex-col mt-4 space-y-2 md:hidden text-gray-800 text-sm">
            <li>
              <Link href="/" className="hover:text-pink-500">
                Home
              </Link>
            </li>
            <Link href="/pages">
              <li className="hover:text-pink-500">Pages</li>
            </Link>
            <Link href="/shoppingcart">
              <li className="hover:text-pink-500 cursor-pointer">Shop</li>
            </Link>
           
            <Link href="/blog">
              <li className="hover:text-pink-500">Blog</li>
            </Link>
            <Link href="/shop">
              <li className="hover:text-pink-500 cursor-pointer">More Products</li>
            </Link>
            <Link href="/contact">
              <li className="hover:text-pink-500">Contact</li>
            </Link>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header1;
