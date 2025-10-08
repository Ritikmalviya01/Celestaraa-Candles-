import React from "react";
import { Clock, Package, MapPin, IndianRupee } from "lucide-react";
import image from "../../../assets/candleCardImage.svg"

const dummyOrders = [
  {
    _id: 1,
    orderId: "ORD123456",
    items: [
      {
        name: "Wireless Earbuds",
        image: [image],
        quantity: 1,
        price: 2499,
      },
    ],
    payment_status: "pending",
    totalAmt: 2499,
    createdAt: "2025-10-02T12:30:00",
  },
  {
    _id: 2,
    orderId: "ORD789012",
    items: [
      {
        name: "Smart Watch",
        image: [image],
        quantity: 1,
        price: 4999,
      },
    ],
    payment_status: "pending",
    totalAmt: 4999,
    createdAt: "2025-10-04T10:15:00",
  },
  {
    _id: 3,
    orderId: "ORD789012",
    items: [
      {
        name: "Smart Watch",
        image: [image],
        quantity: 1,
        price: 4999,
      },
    ],
    payment_status: "pending",
    totalAmt: 4999,
    createdAt: "2025-10-04T10:15:00",
  },
];

const ViewPendingOrders = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Pending Orders
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dummyOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">
                Order ID: <span className="font-semibold">{order.orderId}</span>
              </p>
              <span className="flex items-center gap-1 text-yellow-600 text-sm font-medium">
                <Clock size={15} /> Pending
              </span>
            </div>

            <div className="flex gap-4 items-center mb-3">
              <img
                src={order.items[0].image[0]}
                alt={order.items[0].name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="font-semibold text-gray-800">
                  {order.items[0].name}
                </h2>
                <p className="text-sm text-gray-500">
                  Qty: {order.items[0].quantity}
                </p>
                <p className="text-sm text-gray-700 font-semibold flex items-center gap-1">
                  <IndianRupee size={14} />
                  {order.items[0].price}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 border-t pt-3">
              <p className="text-gray-500 text-sm">
                Ordered on:{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-gray-800 font-semibold flex items-center gap-1">
                <Package size={16} /> ₹{order.totalAmt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPendingOrders;
