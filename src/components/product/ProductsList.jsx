import React, { useContext, useMemo } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Product from "./Product";
import { useNavigate } from "react-router";

const ProductsList = () => {
  const { state, filters, searchTerm, loading } = useContext(GlobalContext);
  const navigate = useNavigate();
  const handleClick = (id) => {
    //go to /products/id
    navigate(`/products/${id}`);
  };

  let filteredProducts = useMemo(() => {
    return state.filter((product) => {
      const matchCategory =
        filters.length === 0 || filters.includes(product.category);
      const matchSearchTerm =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearchTerm && matchCategory;
    });
  }, [state, filters, searchTerm]);

  return (
    <div className="productsContainer">
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          {loading ? "loading" : "Sorry, No Products available...."}
        </p>
      ) : (
        filteredProducts.map((product) => (
          <Product
            key={product._id}
            product={product}
            onClick={() => handleClick(product._id)}
          />
        ))
      )}
    </div>
  );
};

export default ProductsList;
