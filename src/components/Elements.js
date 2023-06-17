import React from "react";
import { InputMenu } from "../input-menu";

export const LeftElements = ({ PlayGround }) => {
  const ElementCreator = (type) => {
    let element = null;

    switch (type) {
      case "text":
        element = document.createElement("input");
        element.setAttribute("type", "text");
        element.setAttribute("placeholder", "Your Text");
        break;
      case "img":
        element = document.createElement("img");
        element.setAttribute("src", "text");
        element.setAttribute("alt", "custom");
        break;
      case "input":
        console.log("input");
        break;
      case "button":
        element = document.createElement("button");
        element.innerHTML = "Click Me";
        break;
      case "textarea":
        element = document.createElement("textarea");
        element.setAttribute("type", "text");
        element.setAttribute("placeholder", "Your Text");
        break;
      case "h1":
        element = document.createElement("h1");
        element.innerHTML = "Hello World";
        break;

      case "p":
        element = document.createElement("p");
        element.innerHTML = "Hello World";
        break;
      case "strong":
        element = document.createElement("strong");
        element.innerHTML = "Hello World";
        break;
      case "file":
        element = document.createElement("input");
        element.setAttribute("type", "file");
        element.setAttribute("placeholder", "Your Text");
        break;
      case "number":
        element = document.createElement("input");
        element.setAttribute("type", "number");
        element.setAttribute("placeholder", "Your Text");
        break;
      case "email":
        element = document.createElement("input");
        element.setAttribute("type", "email");
        element.setAttribute("placeholder", "Your Text");
        break;
      case "date":
        element = document.createElement("input");
        element.setAttribute("type", "date");
        element.setAttribute("placeholder", "Your Text");
        break;
      case "password":
        element = document.createElement("input");
        element.setAttribute("type", "password");
        element.setAttribute("placeholder", "Your Text");
        break;
      case "search":
        element = document.createElement("input");
        element.setAttribute("type", "search");
        element.setAttribute("placeholder", "Your Text");
        break;
      case "tel":
        element = document.createElement("input");
        element.setAttribute("type", "tel");
        element.setAttribute("placeholder", "Your Text");
        break;
      case "url":
        element = document.createElement("input");
        element.setAttribute("type", "url");
        element.setAttribute("placeholder", "Your Text");
        break;
      default:
        console.log("default");
        break;
    }
    let targetItem = null;

    const TargetFinder = (e) => {
      targetItem = e.target;
    };

    const MouseUpHandler = () => {
      PlayGround.current.removeEventListener("mousemove", TargetFinder);
      window.removeEventListener("mouseup", MouseUpHandler);
      if (targetItem) {
        targetItem.appendChild(element);
      }
    };

    PlayGround.current.addEventListener("mousemove", TargetFinder);
    window.addEventListener("mouseup", MouseUpHandler);
  };

  const SingleButton = ({ data }) => {
    return (
      <div
        onMouseDown={() =>
          data.subitems.length ? null : ElementCreator(data.value)
        }
        className="buttons-container"
      >
        <div className="input-button">{data.icon}</div>

        {data.subitems.length ? (
          <div className="extra-subitem">
            {data.subitems.map((x, i) => {
              return (
                <div
                  onMouseDown={() => ElementCreator(x.value)}
                  key={i}
                  className="input-button sub-button"
                >
                  {x.icon}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="CreatorSec">
      {InputMenu.map((x, i) => {
        return <SingleButton PlayGround={PlayGround} key={i} data={x} />;
      })}
    </div>
  );
};
