import React from "react";

export const PlayGroundWindow = ({ PlayGround, setParent }) => {
  return (
    <canvas
      ref={PlayGround}
      onClick={() => setParent("main-container")}
      id="main-container"
    ></canvas>
  );
};
