import { createContext, useEffect, useReducer, useState } from "react";
import { Reducer } from "./Reducer";
import useDatabase from "../Hooks/useDatabase";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { getProducts, getCheckouts } = useDatabase();

  const [state, dispatch] = useReducer(Reducer, []);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]); // for tracking filters
  const [searchTerm, setSearchTerm] = useState();
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });

  const [loading, setloading] = useState(null);

  //tracking checkouts...
  const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    const fetchAndSetProduct = async () => {
      setloading(true);
      const data = await getProducts();
      if (data) {
        dispatch({ type: "SET_PRODUCTS", payload: data });
        setloading(false);
      }
    };
    const fetchAndSetCheckouts = async () => {
      setloading(true);
      const checks = await getCheckouts();

      if (checks) {
        setCheckouts(checks);
        setloading(false);
      }
    };
    fetchAndSetProduct();
    fetchAndSetCheckouts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (state && state.length > 0) {
      const uniquecats = [...new Set(state.map((product) => product.category))];
      setCategories(uniquecats);
    }
  }, [state]);

  const AddToCart = (id) => {
    const cartProductsId = cart.map((product) => product._id);
    if (cartProductsId.includes(id)) {
      setCart(
        cart.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { _id: id, quantity: 1 }]);
    }
  };

  const RemoveFromCart = (id, type) => {
    const targetItem = cart.find((item) => item._id === id);

    if (!targetItem) return; // Safety check
    if (targetItem?.quantity === 1 || type === "DELETE") {
      setCart(cart.filter((item) => item._id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      );
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        categories,
        setFilters,
        filters,
        setSearchTerm,
        searchTerm,
        cart,
        setCart,
        AddToCart,
        RemoveFromCart,
        checkouts,
        setCheckouts,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
