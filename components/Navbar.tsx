"use client"

import React, { useState } from "react";
import { Search, Bell, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Site Name */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-400 cursor-pointer hover:text-blue-300 transition-colors">
              StackIT
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Questions
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-400"
                />
                <button
                  onClick={handleSearch}
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 hover:text-blue-400"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-full transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <button className="flex items-center space-x-2 p-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-full transition-colors">
              <User className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-blue-400 p-2 rounded-md"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-gray-400"
                />
                <button
                  onClick={handleSearch}
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 hover:text-blue-400"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <a
              href="#"
              className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-md text-base font-medium"
            >
              Questions
            </a>

            {/* Mobile Icons */}
            <div className="flex items-center space-x-4 px-3 py-2">
              <button className="relative p-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-full">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center space-x-2 p-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-full">
                <User className="h-6 w-6" />
                <span className="text-sm text-gray-300">Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
