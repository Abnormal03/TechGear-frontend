import { useCallback, useState } from "react";

const useDatabase = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const getProducts = useCallback(async () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const token = user ? user.token : null;
    try {
      setError(null);
      setLoading(true);
      const response = await fetch("/api/products", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        return;
      }
      if (response.ok) {
        setLoading(false);
        return json.products;
      }
    } catch (error) {
      setError("error while fetching products data.");
      setLoading(false);
    }
  }, []);

  //get users products...
  const getMyProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/products/myproducts", {
        method: "GET",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
      });

      const json = await response.json();

      if (response.status === 400) {
        setError("unable to get users products.");
        setLoading(false);
      }
      if (response.status === 200) {
        setLoading(false);
        return json.products;
      }
    } catch (error) {
      return setError(error.error);
    }
  }, []);

  const addProduct = useCallback(async (product) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image,
        }),
      });
      const json = await response.json();

      if (response.status === 400) {
        setError(json.error);
        setLoading(false);
      }
      if (response.status === 200) {
        setLoading(false);
        return json.product || [];
      }
    } catch (error) {
      return setError(error.error);
    }
  }, []);

  //update a product...
  const updateProduct = useCallback(async (_id, product) => {
    setError(null);
    setLoading(true);
    try {
      console.log("updating...");
      const response = await fetch(`/api/products/myproducts/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
        body: JSON.stringify({ product: product }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError("unable to update.");
        setLoading(false);
        return;
      }
      if (response.status === 200) {
        setLoading(false);
        return json.product || [];
      }
    } catch (error) {
      setError(error.error);
      return [];
    }
  }, []);

  //delete a product....
  const deleteProduct = useCallback(async (product) => {
    const id = product._id;
    console.log(id, product);
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/product/delete/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
      });
      const json = await response.json();

      if (!json.deleted) {
        setLoading(fasle);
        setError("unable to delete a product.");
      }
      setLoading(false);
      console.log(json);
      return json.deleted;
    } catch (error) {
      setError(error.error);
      setLoading(false);
      return;
    }
  }, []);

  const getCheckouts = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/checkout/mycheckouts", {
        method: "GET",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
      });

      let json = await response.json();
      if (!response.ok) {
        setLoading(false);
        setError(json.error);
        console.log(json.error);
        return;
      }

      if (response.ok) {
        setLoading(false);
        json = json.checkouts.map((checkout) => ({
          ...checkout,
          date: new Date(checkout.date),
        }));
        return json;
      }
      setLoading(false);
    } catch (error) {
      setError("error while fetching products data.");
      setLoading(false);
    }
  }, []);

  const addCheckout = useCallback(async (checkouts) => {
    if (!checkouts) return;

    setError(null);
    setLoading(true);

    try {
      //post this to the backend....
      const response = await fetch("/api/checkout/addcheckout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
        body: JSON.stringify({
          date: checkouts.date,
          items: checkouts.items,
          prices: checkouts.prices,
          quantity: checkouts.quantity,
          total: checkouts.total,
        }),
      });

      const json = response.json();

      if (!response.ok) {
        console.log(json.error);
        setError(json.error);
      }
      if (response.ok) {
        setLoading(false);
        return json.checkout;
      }
      setLoading(fasle);
    } catch (error) {
      setError("error while fetching products data.", error.message);
      setLoading(false);
    }
  }, []);
  return {
    getProducts,
    getCheckouts,
    addCheckout,
    addProduct,
    getMyProduct,
    updateProduct,
    deleteProduct,
    loading,
    error,
  };
};

export default useDatabase;
