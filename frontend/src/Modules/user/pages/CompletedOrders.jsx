import React from "react";
import { CheckCircle, Package, IndianRupee } from "lucide-react";

const dummyCompleted = [
  {
    _id: 3,
    orderId: "ORD345678",
    items: [
      {
        name: "Bluetooth Speaker",
        image: ["/images/speaker.jpg"],
        quantity: 1,
        price: 1999,
      },
    ],
    payment_status: "paid",
    totalAmt: 1999,
    createdAt: "2025-09-28T08:45:00",
  },
  {
    _id: 4,
    orderId: "ORD901234",
    items: [
      {
        name: "Laptop Bag",
        image: ["/images/bag.jpg"],
        quantity: 1,
        price: 1499,
      },
    ],
    payment_status: "paid",
    totalAmt: 1499,
    createdAt: "2025-09-20T15:00:00",
  },
];

const CompletedOrders = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Completed Orders
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dummyCompleted.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">
                Order ID: <span className="font-semibold">{order.orderId}</span>
              </p>
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <CheckCircle size={15} /> Completed
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
                Delivered on:{" "}
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

export default CompletedOrders;
