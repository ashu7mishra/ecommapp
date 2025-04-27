import api from '../api/axios.js'
import { useEffect } from 'react'


export default function CheckoutButton({ amount }) {

    const handlePayment = async () => {
        try {
            // create razorpay order from backend
            const res = api.post("payment/create-razorpay-order/", { amount });
            const { order_id } = res.data

            // open razorpay checkout
            const options = {

                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: amount*100,
                currency: "INR",
                name: "EcommApp",
                description: "Test Payment",
                order_id: order_id,
                handler: function (response) {
                    console.log(response);
                    alert("Payment successful");
                },
                prefill: {
                    name: "Ashu Mishra",
                    email: "test@example.com",
                    contact: "7889451525",
                },
                theme: {
                    color: "#3399cc",
                },

            };

            const rzp = new window.Razorpay(options);
            rzp.open()
        } catch (error) {
            console.log(error);
            alert("something went wrong during payment creation");
        }
    };

    return (
        <button onClick={handlePayment}>
            Pay ₹{amount}
        </button>
    )

}