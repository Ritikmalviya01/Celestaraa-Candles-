import React, { useEffect, useState } from "react";
import { Loader2, Package } from "lucide-react";
// import axios from "axios"; // ready for backend API integration

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders (replace URL with your real backend)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Example endpoint
        // const res = await axios.get("/api/orders");
        // setOrders(res.data);
        // Temporary dummy data:
        setTimeout(() => {
          setOrders([
            {
              id: "ORD1001",
              customerName: "Aditi Sharma",
              email: "aditi@example.com",
              city: "Mumbai",
              totalAmount: 1499,
              status: "Delivered",
              orderDate: "2025-09-22",
              items: [
                { name: "Lavender Bliss Candle", qty: 2 },
                { name: "Rose Delight Candle", qty: 1 },
              ],
            },
            {
              id: "ORD1002",
              customerName: "Neha Patel",
              email: "neha@example.com",
              city: "Pune",
              totalAmount: 899,
              status: "Pending",
              orderDate: "2025-09-30",
              items: [{ name: "Vanilla Dream Candle", qty: 2 }],
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const colorMap = {
      Pending: "bg-yellow-100 text-yellow-700",
      Processing: "bg-blue-100 text-blue-700",
      Delivered: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f7f3f0] py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-[#4b3f34] mb-8 flex items-center justify-center gap-2">
        <Package className="text-amber-600" size={28} />
        View Orders
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-[#4b3f34]">
          <Loader2 className="animate-spin mr-2" />
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-lg">
          No orders found 📦
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-[#e6ddd5] max-w-6xl mx-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f9f6f2] text-[#4b3f34]">
              <tr>
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">City</th>
                <th className="py-3 px-4 font-semibold">Items</th>
                <th className="py-3 px-4 font-semibold">Total</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-white" : "bg-[#fcfaf8]"
                  } hover:bg-[#fefaf7] transition-all`}
                >
                  <td className="py-3 px-4 text-[#4b3f34] font-medium">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 text-[#4b3f34]">
                    <div className="flex flex-col">
                      <span>{order.customerName}</span>
                      <span className="text-sm text-gray-500">
                        {order.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#4b3f34]">{order.city}</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">
                    {order.items.map((item, i) => (
                      <div key={i}>
                        {item.name} × {item.qty}
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#4b3f34]">
                    ₹{order.totalAmount}
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {new Date(order.orderDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
