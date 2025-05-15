// src/pages/CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import { fetchCart } from "../api/cart";
import { fetchAddresses, createAddress } from "../api/address";
import { placeOrder } from "../api/order";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    is_default: false,
  });
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

      const defaultAddr = addrRes.find((addr) => addr.is_default);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr.id);
      } else if (addrRes.length > 0) {
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
    if (!selectedAddress) {
      return toast.error("Please select or add an address");
    }
    try {
      await placeOrder({
        address_id: selectedAddress,
        payment_method: paymentMethod,
      });
      setCartItems([]);
      toast.success("Order placed successfully!");
      
      // Re-fetch cart from backend to ensure it’s cleared
      const cartRes = await fetchCart();
      setCartItems(cartRes.items || []);

      const userId = localStorage.getItem("userId");
      navigate(`/dashboard/${userId}`);
      
    } catch (err) {
      toast.error("Order failed");
    }
  };

  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddAddress = async () => {
    try {
      await createAddress(addressForm);
      toast.success("Address added");
      setShowAddressForm(false);
      setAddressForm({
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        is_default: false,
      });
      await loadCartAndAddresses();
    } catch (err) {
      toast.error("Failed to add address");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Cart Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Cart Summary</h2>
            {cartItems.length === 0 ? (
              <p className="text-red-500">Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border p-3 mb-2 rounded"
                  >
                    <span>
                      {item.product?.name} × {item.quantity}
                    </span>
                    <span>
                      ₹{parseFloat(item.product?.price || 0).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="font-bold text-lg mt-2">
                  Total: ₹{total.toFixed(2)}
                </div>
              </>
            )}
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              <button
                className="text-blue-600 text-sm"
                onClick={() => setShowAddressForm((s) => !s)}
              >
                {showAddressForm ? "Cancel" : "Add New"}
              </button>
            </div>

            {addresses.length === 0 ? (
              <p className="text-red-500">No address found.</p>
            ) : (
              addresses.map((addr) => (
                <div key={addr.id} className="mb-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="address"
                      value={addr.id}
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                    />
                    <span>
                      {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                      {addr.is_default && (
                        <span className="text-green-600 text-sm ml-2">
                          (Default)
                        </span>
                      )}
                    </span>
                  </label>
                </div>
              ))
            )}

            {showAddressForm && (
              <div className="border p-4 mt-4 rounded bg-gray-100 space-y-2">
                {["street", "city", "state", "pincode", "country"].map(
                  (field) => (
                    <input
                      key={field}
                      type="text"
                      name={field}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={addressForm[field]}
                      onChange={handleAddressFormChange}
                      className="w-full p-2 border rounded"
                    />
                  )
                )}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_default"
                    checked={addressForm.is_default}
                    onChange={handleAddressFormChange}
                  />
                  Set as default
                </label>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleAddAddress}
                >
                  Save Address
                </button>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
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

          {/* Place Order */}
          <button
            className="bg-green-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
            onClick={handlePlaceOrder}
            disabled={!selectedAddress || cartItems.length === 0}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
