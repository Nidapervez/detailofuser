"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faUser,
  faHeart,
  faShoppingCart,
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
      <div className="bg-purple-600 text-white text-sm py-2 px-4 flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap space-x-4 justify-center items-center">
          <span className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            mhhasanul@gmail.com
          </span>
          <span className="flex items-center">
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            (12345)67890
          </span>
        </div>
        <div className="flex flex-wrap space-x-4 justify-center items-center mt-2 md:mt-0">
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
          <Link href="/cart">
            <button className="flex items-center">
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Cart
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="flex items-center">
              <FontAwesomeIcon icon={faCogs} className="mr-2" /> AdminDashboard
            </button>
          </Link>
          <Link href="/analytics">
            <button className="flex items-center">
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
            <li className="hover:text-pink-500">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-pink-500">
              <Link href="/pages">Pages</Link>
            </li>
            <li className="hover:text-pink-500">
              <Link href="/shoppingcart">Shop</Link>
            </li>
            <li className="hover:text-pink-500">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="hover:text-pink-500">
              <Link href="/shop">More Products</Link>
            </li>
            <li className="hover:text-pink-500">
              <Link href="/contact">Contact</Link>
            </li>
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
            <li>
              <Link href="/pages" className="hover:text-pink-500">
                Pages
              </Link>
            </li>
            <li>
              <Link href="/shoppingcart" className="hover:text-pink-500">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-pink-500">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-pink-500">
                More Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-pink-500">
                Contact
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header1;
