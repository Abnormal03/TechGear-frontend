import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.setItem("user", null);
    return true;
  };

  return { logout };
};

export default useLogout;
