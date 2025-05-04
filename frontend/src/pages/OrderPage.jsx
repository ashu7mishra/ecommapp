// src/pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import { fetchOrders } from "../api/order";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(setOrders).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 mb-4 rounded">
            <div className="font-semibold">Order #{order.id}</div>
            <div>Status: {order.status}</div>
            <div className="mt-2">
              {order.items.map((item) => (
                <div key={item.id}>
                  {item.product.name} × {item.quantity}
                </div>
              ))}
            </div>
            <div className="mt-2 font-bold">
              Total: ₹
              {order.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
