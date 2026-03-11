import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CheckoutConfirmation from "./CheckoutConfirmation";
import useDatabase from "../../Hooks/useDatabase";

const CheckOut = ({ products, quantity }) => {
  const { checkouts, setCheckouts, setCart } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const { addCheckout } = useDatabase();

  let total = 0;
  products.map((item) => {
    total += item.price * quantity[products.indexOf(item)];
  });
  const items = products.map((item) => item.name);
  const prices = products.map((item) => item.price);
  const date = new Date();

  const handleCheckout = async () => {
    setCheckouts((prevCheckouts) => [
      ...prevCheckouts,
      {
        date: date,
        items: items,
        prices: prices,
        quantity: quantity,
        total: total,
      },
    ]);

    await addCheckout({
      date: date,
      items: items,
      prices: prices,
      quantity: quantity,
      total: total,
    });
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      setCart([]);
      localStorage.setItem("cart", {});
    }, 3000);
  };
  return (
    <div className="checkout">
      <h2>Final CheckOut</h2>
      {products.map((item) => (
        <div key={item._id} className="priceQuantity">
          <p>{item.name} </p>
          <p style={{ alignSelf: "flex-end" }}>
            ---------
            {item.price}
            {"("}
            {quantity[products.indexOf(item)]}
            {")"}
          </p>
        </div>
      ))}
      <p>Total: ${total.toFixed(2)} </p>
      <button className="checkoutBtn" onClick={handleCheckout}>
        Check Out
      </button>

      {showModal && <CheckoutConfirmation date={date} />}
    </div>
  );
};

export default CheckOut;
