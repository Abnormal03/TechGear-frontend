import React, { useState } from "react";

const History = ({ checkout }) => {
  const [detail, setDetail] = useState(false);
  const style = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  };
  return (
    <div
      className={`checkoutDetail ${detail ? "" : "nonDetail"}`}
      onClick={() => {
        setDetail(!detail);
      }}
    >
      <h4>Date: {checkout?.date.toDateString()}</h4>
      {checkout?.items.map((item) => (
        <div
          key={item}
          className="detail"
          style={detail ? style : { display: "none" }}
        >
          <p>{item}</p>
          <p>
            -------{checkout?.prices[checkout?.items.indexOf(item)]}
            {`(${checkout?.quantity[checkout?.items.indexOf(item)]})`}
          </p>
        </div>
      ))}

      <h4 style={detail ? { alignSelf: "flex-end" } : {}}>
        Total: ${checkout?.total}
      </h4>
    </div>
  );
};

export default History;
