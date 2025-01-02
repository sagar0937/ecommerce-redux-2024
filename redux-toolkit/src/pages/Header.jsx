import React, { useState, memo } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { userId, isLoaded } = useAuth();
  const cartItems = useSelector((state) => state?.cart?.data);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-gray-900  backdrop-blur-md shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-200 font-medium">
          <li>
            <NavLink to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </NavLink>
          </li>
        </ul>

        {/* Right-aligned elements */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <NavLink to="/cart" className="hover:text-primary">
            <button className="flex items-center bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-600">
              <ShoppingCart size={20} className="mr-2" />
              Cart-{cartItems.length}
            </button>
          </NavLink>
          {/* Clerk Authentication */}
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link
                to="/sign-in"
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-white"
              >
                Sign In
              </Link>
            </SignedOut>
          </div>
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-full bg-gray-900 bg-opacity-90 shadow-md md:hidden">
            <ul className="flex flex-col items-center space-y-4 p-4 text-gray-200 font-medium">
              <li>
                <NavLink to="/dashboard" className="hover:text-blue-400">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-blue-400">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="hover:text-primary">
                  <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    <ShoppingCart size={20} className="mr-2" />
                    Cart-{cartItems.length}
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default memo(Navbar);
