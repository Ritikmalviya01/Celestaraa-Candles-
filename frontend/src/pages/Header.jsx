import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { TiThMenu } from "react-icons/ti";
import { FaUserAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["About", "Products", "Contact" , "Blogs"];

  return (
    <header className="sticky top-0 z-50 bg-primary1 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-6 py-4 relative">
        {/* Logo */}
        
        <h1 className="text-xl sm:text-2xl font-bold font-heading text-primary">
          Candle Co.
        </h1>
          <div className="flex items-center gap-6 sm:gap-32">
        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              className={({ isActive }) =>
                `capitalize transition-colors duration-300 hover:text-primary3 hover:text-2xl ${
                  isActive ? "font-semibold" : "text-primary"
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-5 sm:gap-8 text-primary text-lg sm:text-2xl ">
          <FaCartShopping  />
        <FaUserAlt />
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-primary focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <TiThMenu size={22} />}
        </button>

        {/* Mobile Dropdown (absolute, not affecting header height) */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full text-center bg-primary/40 shadow-sm md:hidden">
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item}
                  to={`/${item}`}
                  className={({ isActive }) =>
                    `block capitalize transition-colors duration-300 hover:text-primary3  ${
                      isActive ? "font-semibold" : "text-primary1"
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

      </div>
      

    </header>
  );
};

export default Header;
