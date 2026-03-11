import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";

const Categories = () => {
  const [inputs, setInputs] = useState({});
  const handleClick = (event) => {
    const name = event.target.name;
    const checked = event.target.checked;
    setInputs({ ...inputs, [name]: checked });
  };

  const { categories, setFilters } = useContext(GlobalContext);
  useEffect(() => {
    const activeFilters = Object.keys(inputs).filter((key) => inputs[key]);

    setFilters(activeFilters);
  }, [inputs]);

  if (categories.length === 0) {
    return;
  }
  return (
    <div className="categories">
      <h2>Categories</h2>
      {categories.map((category) => (
        <div key={category}>
          <label htmlFor={category}>{category}</label>
          <input
            type="checkbox"
            onChange={handleClick}
            name={category}
            id={category}
            checked={inputs[category] || false}
          />
        </div>
      ))}
    </div>
  );
};

export default Categories;
