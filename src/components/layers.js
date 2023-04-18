import React, { useState, useEffect } from "react";
import "./layers.css";

export const Layers = ({ Element, setElement }) => {
  const [Nodes, onNodes] = useState([]);
  const [timer, ontimer] = useState(new Date());
  useEffect(() => {
    var PlayGround = document.getElementById("main-container");
    const allElements = PlayGround.getElementsByTagName("*");
    onNodes(allElements);
  }, [ontimer]);

  const SingleTab = ({ data }) => {
    console.log(data);
    const [Visible, onVisible] = useState(true);

    const ToggleVisibleRef = (Element) => {
      if (Visible) {
        onVisible(false);
        Element.style.visibility = "hidden";
      } else {
        Element.style.visibility = "visible";

        onVisible(true);
      }
    };
    return (
      <div
        style={{ background: Element === data ? "#ade2e8" : "transparent" }}
        onClick={() => setElement(data)}
        className="layer-element"
      >
        <div className="layer-leftside">
          {Visible ? (
            <img
              className="open-properties"
              onClick={() => ToggleVisibleRef(data)}
              alt="visible"
              src={require("../assect/visibility.svg").default}
            />
          ) : (
            <img
              className="open-properties"
              onClick={() => ToggleVisibleRef(data)}
              alt="unvisible"
              src={require("../assect/visibility_off.svg").default}
            />
          )}
          <p>{data.tagName}</p>
        </div>
        <div>
          <img
            style={{
              padding: "5px",
              margin: "5px 5px 0 0",
              borderRadius: "5px",
              background: "rgb(222, 126, 126)",
              cursor: "pointer",
            }}
            onClick={() => {
              const result = window.confirm(
                "Are you sure you want to delete this item?"
              );
              if (result === true) {
                data.remove();
                // Perform the delete operation
              } else {
                // User clicked Cancel
                // Do nothing or perform some other operation
              }
            }}
            alt="delete"
            src={require("../assect/delete.svg").default}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="layers-scroll">
        {Array.from(Nodes).map((x, i) => {
          return <SingleTab data={x} />;
        })}
      </div>
    </>
  );
};
