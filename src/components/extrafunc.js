import React, { useContext, useEffect } from "react";
import { MainContext } from "../context/main.context";

export const Extrafunc = ({ PlayGround }) => {
  const { activeElement } = useContext(MainContext);

  //   function it will handle the delete elements
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Delete") {
        const result = window.confirm(
          "Are you sure you want to delete this item?"
        );
        if (result === true) {
          activeElement.remove();
          // Perform the delete operation
        } else {
          // User clicked Cancel
          // Do nothing or perform some other operation
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeElement]);

  // function it will handle scroll zoom in and zoom out

  useEffect(() => {
    var scale = 1;
    var spacePressed = false;
    var mouseDown = false;
    var lastX, lastY;
    var el = PlayGround.current;
    el.onwheel = function (e) {
      if (e.altKey) {
        e.preventDefault();
        if (e.deltaY > 0 && scale > 0.5) {
          // zoom out, but not beyond 0.5
          scale -= 0.1;
        } else if (e.deltaY < 0 && scale < 5) {
          // zoom in, but not beyond 1
          scale += 0.1;
        }
        el.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener("keyup", function (event) {
      if (event.key === "Alt") {
        // Set focus back to your element
        el.focus();
      }
    });
  }, []);

  // it will be for the pan

  useEffect(() => {
    var playElement = PlayGround.current;
    var spacePressed = false;
    var mouseDown = false;
    var lastX, lastY, elementX, elementY;

    window.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        spacePressed = true;
        playElement.style.cursor = "grab";
      }
    });

    window.addEventListener("keyup", function (event) {
      if (event.code === "Space") {
        spacePressed = false;
      }
    });

    playElement.addEventListener("mousedown", function (event) {
      if (spacePressed) {
        mouseDown = true;
        lastX = event.clientX;
        lastY = event.clientY;
        elementX = playElement.offsetLeft;
        elementY = playElement.offsetTop;
        playElement.style.transitionDuration = "0s";
        console.log(elementX, elementY);
      }
    });

    window.addEventListener("mousemove", function (event) {
      if (mouseDown && spacePressed) {
        var dx = event.clientX - lastX;
        var dy = event.clientY - lastY;
        console.log(elementX + dx, elementY + dy);
        playElement.style.left = elementX + dx + "px";
        playElement.style.top = elementY + dy + "px";
      }
    });

    window.addEventListener("mouseup", function (event) {
      mouseDown = false;
      playElement.style.cursor = "auto";
      playElement.style.transitionDuration = "0.3s";
    });
  }, []);

  return <></>;
};
