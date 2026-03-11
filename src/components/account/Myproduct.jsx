import { MdEdit } from "react-icons/md";
import { useState } from "react";
import AddProductForm from "./AddProductForm";

const Myproduct = ({ product, setProducts, onDelete }) => {
  const [modal, setModal] = useState(false);
  const editProduct = () => {
    setModal(true);
  };
  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="description">{product.desciption}</p>
      <h2>${product.price}</h2>
      <p className="category">{product.category}</p>
      <MdEdit className="icon" onClick={editProduct} />
      <button
        className="delete-product"
        onClick={() => {
          onDelete(product);
        }}
      >
        delete
      </button>
      {modal && (
        <AddProductForm
          setmodal={setModal}
          product={product}
          setProducts={setProducts}
        />
      )}
    </div>
  );
};

export default Myproduct;
