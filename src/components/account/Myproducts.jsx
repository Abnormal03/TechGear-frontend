import React, { useEffect, useState } from "react";
import Myproduct from "./Myproduct";
import AddProductForm from "./AddProductForm";
import useDatabase from "../../Hooks/useDatabase";

const Myproducts = () => {
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState([]);
  const { getMyProduct, deleteProduct, loading, error } = useDatabase();

  const handleDelete = async (product) => {
    const res = window.confirm(`Did you want to remove: ${product.name}`);
    if (!res) {
      return;
    }
    const id = product._id;
    const deleted = await deleteProduct(product);
    console.log(deleted);
    if (deleted) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  };
  //get products on load
  useEffect(() => {
    const fetchMyProducts = async () => {
      const result = await getMyProduct();
      setProducts(result);
    };
    fetchMyProducts();
  }, [getMyProduct]);
  return (
    <div className="myproducts">
      <button
        onClick={() => {
          setModal(true);
        }}
      >
        Add Product
      </button>
      <div className="products-list">
        {loading ? (
          <div>loading....</div>
        ) : (
          products?.map((product) => (
            <Myproduct
              key={product._id}
              product={product}
              setProducts={setProducts}
              onDelete={handleDelete}
            />
          ))
        )}
        {error && <p>{error}</p>}
      </div>
      {modal && (
        <AddProductForm setmodal={setModal} setProducts={setProducts} />
      )}
    </div>
  );
};

export default Myproducts;
