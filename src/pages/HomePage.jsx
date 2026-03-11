import React from "react";
import ProductsList from "../components/product/ProductsList";
import Categories from "../components/home/Categories";

const HomePage = () => {
  return (
    <div className="home">
      <Categories />
      <ProductsList />
    </div>
  );
};

export default HomePage;
