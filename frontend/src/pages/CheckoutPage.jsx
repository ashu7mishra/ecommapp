// src/pages/CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import { fetchCart } from "../api/cart";
import { fetchAddresses } from "../api/address";
import { placeOrder } from "../api/order";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadCartAndAddresses = async () => {
    setLoading(true);
    try {
      const cartRes = await fetchCart();
      setCartItems(cartRes.items || []);

      const addrRes = await fetchAddresses();
      setAddresses(addrRes);
      if (addrRes.length > 0) {
        setSelectedAddress(addrRes[0].id);
      }
    } catch (err) {
      toast.error("Failed to load checkout info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCartAndAddresses();
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return toast.error("Please select an address");
    try {
      await placeOrder({
        address_id: selectedAddress,
        payment_method: paymentMethod,
      });
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error("Order failed");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Cart Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="border p-2 mb-2 rounded">
                {item.product.name} × {item.quantity} — ₹{item.product.price}
              </div>
            ))}
            <div className="font-bold mt-2">Total: ₹{total}</div>
          </div>

          {/* Address Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
            {addresses.map((addr) => (
              <div key={addr.id} className="mb-1">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAddress === addr.id}
                    onChange={() => setSelectedAddress(addr.id)}
                  />
                  {addr.full_address}
                </label>
              </div>
            ))}
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery
            </label>
          </div>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
