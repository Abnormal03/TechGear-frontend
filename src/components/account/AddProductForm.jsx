import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useDatabase from "../../Hooks/useDatabase";

const AddProductForm = ({ setmodal, product, setProducts }) => {
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });
  const { loading, error, addProduct, updateProduct } = useDatabase();

  useEffect(() => {
    if (product) {
      setInputs({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        image: product.image,
      });
    }
  }, [product]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newProduct = {
      name: inputs.name,
      description: inputs.description,
      category: inputs.category,
      price: inputs.price,
      image: inputs.image,
    };
    let result;
    if (product) {
      result = await updateProduct(product._id, newProduct);
      if (result) {
        setProducts((prev) =>
          prev.map((p) => (p._id === result._id ? result : p)),
        );
      }
    }
    if (!product) {
      result = await addProduct(newProduct);
      console.log(result);
      if (result) {
        setProducts((prev) => [...prev, result]);
      }
    }
    if (result) {
      setmodal(false);
    }
  };

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="portal"
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center",
          maxWidth: "600px",
        }}
        className="add-product-portal"
      >
        <h3>Add product form</h3>
        {loading ? (
          <p>{product ? "Updating..." : "Saving..."}...</p>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={inputs.name}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  onChange={handleChange}
                  value={inputs.description}
                  required
                />
              </div>
              <div>
                {" "}
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  onChange={handleChange}
                  value={inputs.category}
                  required
                />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  onChange={handleChange}
                  value={inputs.price}
                  required
                />
              </div>

              <div>
                <label htmlFor="image">Image Link:</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  onChange={handleChange}
                  value={inputs.image}
                  required
                />
              </div>
            </form>
            <button onClick={() => setmodal(false)} disabled={loading}>
              Close
            </button>
            <button onClick={handleSubmit} disabled={loading}>
              {product ? "Update" : "Save"}
            </button>
            {error && <p className="error">{error}</p>}
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default AddProductForm;
