import React from "react";

export const PlayGroundWindow = ({ PlayGround, setParent }) => {
  return (
    <div
      ref={PlayGround}
      onClick={() => setParent("main-container")}
      id="main-container"
    ></div>
  );
};
