import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import History from "../history/History";

const Histories = () => {
  const { checkouts, loading } = useContext(GlobalContext);
  return (
    <div className="checkoutContainer">
      {checkouts.length === 0 ? (
        <p>{loading ? "Loading...." : "no checkouts..."}</p>
      ) : (
        checkouts.map((checkout) => (
          <History key={checkout._id} checkout={checkout} />
        ))
      )}
    </div>
  );
};

export default Histories;
