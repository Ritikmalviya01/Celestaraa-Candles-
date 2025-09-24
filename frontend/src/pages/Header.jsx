import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["About", "Products", "Contact", "Cart"];

  return (
    <header className="sticky top-0 z-50 bg-primary1 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 relative">
        {/* Logo */}
        <h1 className="text-sm sm:text-2xl font-bold font-heading text-primary">
          Candle Co.
        </h1>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              className={({ isActive }) =>
                `capitalize transition-colors duration-300 hover:text-[#D4A35C] ${
                  isActive ? "font-semibold" : "text-primary"
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-primary focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown (absolute, not affecting header height) */}
        {isOpen && (
          <div className="absolute top-full l w-68 bg-primary1 shadow-md md:hidden">
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item}
                  to={`/${item}`}
                  className={({ isActive }) =>
                    `block capitalize transition-colors duration-300 hover:text-[#D4A35C] ${
                      isActive ? "font-semibold" : "text-primary"
                    }`
                  }
                  onClick={() => setIsOpen(false)} // close on link click
                >
                  {item}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
