/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/style-prop-object */
import React from "react";

const Swap = () => {
  return (
    <div className=" min-h-screen">
      <iframe
        src="https://app.uniswap.org/#/swap"
        width="100%"
        height="100%"
        style={{ border: "none", minHeight: "100vh", marginTop: "-40px" }}
      ></iframe>
    </div>
  );
};

export default Swap;
