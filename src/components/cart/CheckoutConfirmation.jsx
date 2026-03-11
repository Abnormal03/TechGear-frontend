import { createPortal } from "react-dom";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const CheckoutConfirmation = ({ date }) => {
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
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "30px", color: "green" }}>
          <IoCheckmarkDoneOutline />
        </p>
        <h4>{date.toDateString()}</h4>
        <p>Checkout successful!</p>
      </div>
    </div>,
    document.body,
  );
};

export default CheckoutConfirmation;
