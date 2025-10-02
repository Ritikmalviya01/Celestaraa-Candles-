import React from 'react'
import { useState } from 'react';
import { Plus, Minus, ChevronRight } from 'lucide-react';
import cardImage from "../../../assets/candleCardImage.svg"
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Vanilla Relax Candle',
      price: 20,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=200&q=80"
    },
    {
      id: 2,
      name: 'Lavender Dream Candle',
      price: 18,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=200&q=80'
    }
  ]);

  const [shippingMethod, setShippingMethod] = useState('express');
  const [contactInfo, setContactInfo] = useState({
    name: 'Sunny Marwah',
    address: '2972 Westheimer Rd.',
    city: 'Santa Ana, Illinois',
    zipCode: '85486',
    phone: '(406) 555-0120',
    cityName: 'Washington, D.C.'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempContactInfo, setTempContactInfo] = useState(contactInfo);

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingMethod === 'express' ? 5 : 0;
  const taxes = 10;
  const total = subtotal + shippingCost + taxes;

  const handleEditToggle = () => {
    if (isEditing) {
      setContactInfo(tempContactInfo);
    } else {
      setTempContactInfo(contactInfo);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setTempContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const isContactInfoComplete = () => {
    return Object.values(contactInfo).every(value => value.trim() !== '');
  };

  return (
    <div className="min-h-screen bg-bg p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Cart Items and Contact */}
          <div className="space-y-6">
            {/* Shopping Cart Header */}
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-heading font-semibold text-gray-900">Shopping Cart</h1>
              <span className="bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cartItems.length}
              </span>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg font-heading text- text-gray-900">{item.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-300 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-100 rounded-l-full"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 rounded-r-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-semibold text-gray-900">${item.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold font-heading text-gray-900">Contact Information</h2>
                <button
                  onClick={handleEditToggle}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Recipient's Name</label>
                    <input
                      type="text"
                      value={tempContactInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Address</label>
                      <input
                        type="text"
                        value={tempContactInfo.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Phone</label>
                      <input
                        type="text"
                        value={tempContactInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">City</label>
                      <input
                        type="text"
                        value={tempContactInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Zip Code</label>
                      <input
                        type="text"
                        value={tempContactInfo.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Recipient's Name</p>
                  <p className="font-semibold text-gray-900 mb-4">{contactInfo.name}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Address</p>
                      <p className="text-gray-900">{contactInfo.address}</p>
                      <p className="text-gray-900">{contactInfo.city}</p>
                      <p className="text-gray-900">{contactInfo.zipCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <p className="text-gray-900">{contactInfo.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">City</p>
                      <p className="text-gray-900">{contactInfo.cityName}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Method */}
           
          </div>

          {/* Right Column - Checkout */}
          <div className="space-y-6">
            {/* Apply Discount Code */}
            {/* <div className="bg-[#f5ebe5] p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-[#f0e3db]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#d4a574]" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M10 6v4l3 2"/>
                  </svg>
                </div>
                <span className="text-[#b8896d]">Apply discount code</span>
              </div>
              <ChevronRight className="text-[#b8896d]" size={20} />
            </div> */}

            {/* Express Checkout */}
            <div>
              <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">Express Checkout</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#502ab9] hover:bg-primary p-4 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">PhonePe </span>
                </button>
                <button className="bg-gray-900 hover:bg-primary p-4 rounded-lg flex items-center justify-center gap-2">
                  <span className="text-white font-semibold">G Pay</span>
                </button>
              </div>
            </div>

            {/* Detail Shop */}
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">Detail shop</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold text-gray-900">${taxes.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Buttons */}
            <div className="space-y-3">
            <Link to="/search-candles">
              <button className="w-full text-gray-600 py-3 px-6 mb-2 rounded-full border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2">
                <span>←</span>
              
                <span>Return To Search</span>
               
              </button>
              </Link>
              <button
                disabled={!isContactInfoComplete()}
                className={`w-full py-4 px-6 rounded-full font-semibold transition ${
                  isContactInfoComplete()
                    ? 'bg-primary text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                CHECKOUT
              </button>
              {!isContactInfoComplete() && (
                <p className="text-sm text-red-600 text-center">
                  Please complete all contact information fields
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart