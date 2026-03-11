import React, { useContext } from "react";
import { AddToCartButton } from "../cart/AddToCartButton";
import { GlobalContext } from "../../context/GlobalState";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useNavigate } from "react-router";

const Product = ({ product, onClick }) => {
  const { AddToCart } = useContext(GlobalContext);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="product" onClick={onClick}>
      <img src={product.image} alt="" />
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <h2>${product.price}</h2>
      <p className="category">{product.category}</p>
      <AddToCartButton
        onAdd={(event) => {
          event.stopPropagation();
          if (user) {
            AddToCart(product._id);
          } else {
            navigate("/login");
          }
        }}
      />
    </div>
  );
};

export default Product;
