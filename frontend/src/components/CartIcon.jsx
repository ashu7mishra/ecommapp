import { useCart } from "../contexts/CartContext";
import { ShoppingCart } from "lucide-react"; // or any icon library

const CartIcon = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative">
      <ShoppingCart />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
