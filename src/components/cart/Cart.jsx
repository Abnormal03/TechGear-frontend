import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { CartProduct } from "../cart/CartProduct";
import CheckOut from "../cart/CheckOut";
import { TbShoppingCartOff } from "react-icons/tb";

const Cart = () => {
  const { cart, state, AddToCart, RemoveFromCart } = useContext(GlobalContext);
  const ids = cart.map((item) => item._id);
  const quantity = cart.map((item) => item.quantity);
  const cartProducts = state.filter((product) => ids.includes(product._id));
  return (
    <div className="cartContainer">
      <div>
        {cartProducts.length === 0 ? (
          <p
            style={{ textAlign: "center", marginTop: "20px", fontSize: "25px" }}
          >
            <TbShoppingCartOff style={{ marginRight: "10px" }} />
            No Product in Cart...
          </p>
        ) : (
          cartProducts.map((product) => (
            <CartProduct
              key={product._id}
              product={product}
              quantity={quantity[ids.indexOf(product._id)]}
              AddToCart={AddToCart}
              RemoveFromCart={RemoveFromCart}
            />
          ))
        )}
      </div>

      {cartProducts.length === 0 ? (
        ""
      ) : (
        <CheckOut products={cartProducts} quantity={quantity} />
      )}
    </div>
  );
};

export default Cart;
