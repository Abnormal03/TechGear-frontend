import React from "react";

export const AddToCartButton = ({ onAdd }) => {
  return (
    <button className="AddBtn" onClick={onAdd}>
      Add to Cart
    </button>
  );
};
