import React, { useEffect } from 'react'
import { useState } from 'react';
import { Plus, Minus, ChevronRight } from 'lucide-react';
import cardImage from "../../../assets/candleCardImage.svg"
import { Link } from 'react-router-dom';
import axios from 'axios';


const loadRazorpay = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
const Cart = () => {
  const [cart, setCart] = useState([]);
  const handleEditToggle = async () => {
    if (isEditing) {
      // When clicking "Save"
      try {
        const res = await axios.post(
          "http://localhost:8000/api/user/add-address",
          {
            name: tempContactInfo.name,
            phone: tempContactInfo.phone,
            address: tempContactInfo.address,
            city: tempContactInfo.cityName || query, // use selected city
            zipCode: tempContactInfo.zipCode,
          },
          { withCredentials: true } // ✅ sends cookie token automatically
        );

        if (res.data.success) {
          alert("Address saved successfully!");
          setContactInfo(tempContactInfo);
        } else {
          alert(res.data.message || "Failed to save address");
        }
      } catch (error) {
        console.error("Error saving address:", error);
        alert("Something went wrong while saving the address");
      }
    } else {
      // When clicking "Edit"
      setTempContactInfo(contactInfo);
    }

    setIsEditing(!isEditing);
  };
const removeItem = async (cartItemId) => {
  try {
    const res = await axios.delete(
      "http://localhost:8000/api/user/remove-cart",
      { withCredentials: true,
        data: { cartItemId }

       },
      
    );

    if (res.data.success) {
      // remove item from local state
      setCart(prevCart => prevCart.filter(item => item._id !== cartItemId));
      alert(res.data.message);
    }
  } catch (err) {
    console.error("Error removing item from cart:", err.response?.data || err.message);
    alert("Failed to remove item from cart. Try again.");
  }
};

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/get-cart", {
          withCredentials: true,
        });
        if (res.data.success) {
          setCart(res.data?.cart);
          console.log(res.data)
        }
      } catch (err) {
        console.error("Error fetching cart:", err.response?.data || err.message);
      }
    };
    fetchCart();
  }, []);

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

  const updateQuantity = async (cartItemId, delta) => {
    const item = cart.find(i => i._id === cartItemId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    try {
      const res = await axios.put(
        "http://localhost:8000/api/user/update-cart",
        { cartItemId, quantity: newQuantity },
        { withCredentials: true }
      );

      if (res.data.success) {
        // update cart state locally
        setCart(prevCart =>
          prevCart.map(i =>
            i._id === cartItemId ? { ...i, quantity: newQuantity } : i
          )
        );
      }
    } catch (err) {
      console.error("Error updating cart:", err.response?.data || err.message);
    }
  };



  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingMethod === 'express' ? 5 : 0;
  const taxes = 10;
  const total = subtotal + shippingCost + taxes;



  const handleInputChange = (field, value) => {
    setTempContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const isContactInfoComplete = () => {
    return Object.values(contactInfo).every(value => value.trim() !== '');
  };



  // For location autocomplete using Nominatim
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Handle typing
  const handleInput = async (e) => {
    const value = e.target.value;
    setQuery(value);
    handleInputChange("city", value); // keep updating your contact info state
    if (value.length > 2) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?city=${value}&format=json&addressdetails=1`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // ✅ When user clicks a city suggestion
  const handleSelect = (place) => {
    setQuery(place.display_name); // updates input box
    handleInputChange("city", place.display_name); // saves to form
    setSuggestions([]); // hides dropdown
  };

  // const handleCheckout = async () => {
  //   if (cart.length === 0) {
  //     alert("Your cart is empty!");
  //     return;
  //   }

  //   if (!isContactInfoComplete()) {
  //     alert("Please complete all contact information fields!");
  //     return;
  //   }

  //   const res = await loadRazorpay();
  //   if (!res) {
  //     alert("Razorpay SDK failed to load. Check your internet connection.");
  //     return;
  //   }

  //   try {
  //     // 1️⃣ Create order on backend
  //     const orderRes = await axios.post(
  //       "http://localhost:8000/api/order/create",
  //       {
  //         items: cart.map((i) => ({
  //           productId: i.product._id,
  //           name: i.product.name,
  //           price: i.product.price,
  //           quantity: i.quantity,
  //         })),
  //         delivery_address: contactInfo._id, // replace with real address ID if saved
  //         subTotalAmnt: subtotal,
  //         totalAmt: total,
  //       },
  //       { withCredentials: true }
  //     );

  //     const { orderId, totalAmt } = orderRes.data.order;

  //     // 2️⃣ Configure Razorpay
  //     const options = {
  //       key: "YOUR_RAZORPAY_KEY", // replace with your Razorpay key
  //       amount: totalAmt * 100, // in paise
  //       currency: "INR",
  //       name: "Candle Store",
  //       description: `Order #${orderId}`,
  //       order_id: orderId,
  //       handler: async function (response) {
  //         try {
  //           const verifyRes = await axios.post(
  //             "http://localhost:8000/api/order/verify-payment",
  //             {
  //               orderId,
  //               paymentId: response.razorpay_payment_id,
  //             },
  //             { withCredentials: true }
  //           );

  //           if (verifyRes.data.success) {
  //             alert("Payment successful!");
  //             setCart([]);
  //             window.location.href = `/order-success/${orderId}`;
  //           }
  //         } catch (err) {
  //           console.error(err);
  //           alert("Payment verification failed. Contact support.");
  //         }
  //       },
  //       prefill: {
  //         name: contactInfo.name,
  //         email: "user@example.com",
  //         contact: contactInfo.phone,
  //       },
  //       theme: {
  //         color: "#502ab9",
  //       },
  //     };

  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.open();
  //   } catch (error) {
  //     console.error("Error during checkout:", error);
  //     alert("Failed to initiate checkout.");
  //   }
  // };

const handleCheckout = async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  if (!isContactInfoComplete()) {
    alert("Please complete all contact information fields!");
    return;
  }

  try {
    // Send request to backend — backend should attach the logged-in user's ID
    const orderRes = await axios.post(
      "http://localhost:8000/api/user/create-order", // backend test endpoint
      {
        items: cart.map((i) => ({
          productId: i.product._id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
        })),
        delivery_address: contactInfo._id, // real address ID or leave null for test
        subTotalAmnt: subtotal,
        totalAmt: total,
      },
      { withCredentials: true } // ensures cookies are sent
    );

    if (orderRes.data.success) {
      alert("Order placed successfully!");
      setCart([]); // empty cart
      window.location.href = `/cart`;
    }
  } catch (err) {
    console.error("Error placing order:", err.response?.data || err.message);
    alert("Failed to place order. Try again.");
  }
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
                {cart.length}
              </span>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-lg">
                  <img
                    src={item.product?.image[1]}
                    alt={item.product?.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg font-heading text- text-gray-900">{item.product?.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-300 rounded-full">
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          className="p-1 hover:bg-gray-100 rounded-l-full"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, 1)}
                          className="p-1 hover:bg-gray-100 rounded-r-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-semibold text-gray-900">Rs. {item.product?.price}</span>
                    </div>
                  </div>
                 <button
  onClick={() => removeItem(item._id)} // pass MongoDB cart item ID
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
                    <div className="relative">
                      <label className="block text-sm text-gray-600 mb-1">City</label>
                      <input
                        type="text"
                        value={query}
                        onChange={handleInput}
                        placeholder="Start typing your city..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />

                      {suggestions.length > 0 && (
                        <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow mt-1 w-full max-h-48 overflow-y-auto">
                          {suggestions.map((s) => (
                            <li
                              key={s.place_id}
                              onClick={() => handleSelect(s)}  // ✅ clickable
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                              {s.display_name}
                            </li>
                          ))}
                        </ul>
                      )}
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
                onClick={handleCheckout}
                disabled={!isContactInfoComplete() || cart.length === 0}
                className={`w-full py-4 px-6 rounded-full font-semibold transition ${isContactInfoComplete() && cart.length > 0
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