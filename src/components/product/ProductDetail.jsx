import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { GlobalContext } from "../../context/GlobalState";
import { IoClose } from "react-icons/io5";
import { AddToCartButton } from "../cart/AddToCartButton";
import { useAuthContext } from "../../Hooks/useAuthContext";

const ProductDetail = ({}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state, AddToCart } = useContext(GlobalContext);
  const product = state.filter((item) => item._id === id)[0];
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <div className="productDetailContainer">
      <div className="productDetail">
        <img src={product.image} alt="" />
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <h2 style={{ display: "flex", gap: "20px" }}>
          {`price:`}
          <p style={{ textDecoration: "line-through" }}>
            ${product.price + 50}
          </p>{" "}
          ${product.price}
        </h2>
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
        <button className="closeBtn" onClick={handleClose}>
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
