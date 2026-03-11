import React from "react";

export const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      if (action.payload) {
        return action.payload;
      }
      return state;
    default:
      return state;
  }
};
