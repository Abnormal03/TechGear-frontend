import React from "react";

export const CartProduct = ({
  product,
  quantity,
  AddToCart,
  RemoveFromCart,
}) => {
  return (
    <div className="cartProduct">
      <img src={product.image} alt="" />
      <div>
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <h2>${product.price}</h2>
      </div>
      <div className="quantity">
        <button onClick={() => RemoveFromCart(product._id, "DEDUCT")}>-</button>
        <p style={{ fontSize: "25px" }}>{quantity}</p>
        <button onClick={() => AddToCart(product._id)}>+</button>
      </div>
      <button onClick={() => RemoveFromCart(product._id, "DELETE")}>
        Delete
      </button>
    </div>
  );
};
