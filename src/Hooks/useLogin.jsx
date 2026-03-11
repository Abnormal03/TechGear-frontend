import React, { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(json.data);
      }
      if (response.ok) {
        //save the user into the localstorage...
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });

        setLoading(false);
        return true;
      }
    } catch (error) {
      setLoading(false);
      setError("could not connect to the server.");
    }
  };
  return { login, loading, error };
};
