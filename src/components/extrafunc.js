import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/main.context";

export const Extrafunc = ({ PlayGround, scalepg, onscalepg, RecMode }) => {
  const { activeElement, onContHighliter, ContHighliter } =
    useContext(MainContext);
  const [moveon, onmoveon] = useState(false);

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

  // useEffect(() => {
  //   var scale = scalepg ? scalepg : 1;
  //   var spacePressed = false;
  //   var mouseDown = false;
  //   var lastX, lastY;
  //   var el = PlayGround.current;
  //   el.onwheel = function (e) {
  //     if (e.altKey) {
  //       e.preventDefault();
  //       if (e.deltaY > 0 && scale > 0.5) {
  //         // zoom out, but not beyond 0.5
  //         scale -= 0.1;
  //       } else if (e.deltaY < 0 && scale < 5) {
  //         // zoom in, but not beyond 1
  //         scale += 0.1;
  //       }
  //       el.style.transform = `scale(${scale})`;
  //     }
  //   };

  //   window.addEventListener("keyup", function (event) {
  //     if (event.key === "Alt") {
  //       // Set focus back to your element
  //       el.focus();
  //       onscalepg(scale);
  //     }
  //   });
  // }, [scalepg, onscalepg]);

  useEffect(() => {
    var scale = scalepg ? scalepg : 1;
    var el = PlayGround.current;

    el.onwheel = function (e) {
      if (e.altKey) {
        e.preventDefault();

        // Get mouse pointer position relative to the element, in percentages
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top; //y position within the element.

        var xPercent = (x / rect.width) * 100;
        var yPercent = (y / rect.height) * 100;

        // Set the transform-origin property
        el.style.transformOrigin = `${xPercent}% ${yPercent}%`;

        if (e.deltaY > 0 && scale > 0.5) {
          // zoom out, but not beyond 0.5
          scale -= 0.1;
        } else if (e.deltaY < 0 && scale < 5) {
          // zoom in, but not beyond 5
          scale += 0.1;
        }
        el.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener("keyup", function (event) {
      if (event.key === "Alt") {
        // Set focus back to your element
        el.focus();
        onscalepg(scale);
      }
      if (event.key === "w") {
        onmoveon(true);
      }
    });

    // Clean up event listeners on unmount
    return () => {
      el.onwheel = null;
      window.removeEventListener("keyup", el.focus);
    };
  }, [scalepg, onscalepg]);

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
      }
    });

    window.addEventListener("mousemove", function (event) {
      if (mouseDown && spacePressed) {
        var dx = event.clientX - lastX;
        var dy = event.clientY - lastY;
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

  useEffect(() => {
    if (!moveon) {
      return;
    }

    let targetItem = null;
    let targetshadow = null;
    let element = null;
    let cloned = null;
    let altpressed = false;
    let isMouseDown = false; // Flag to track mouse button state

    const TargetFinder = (e) => {
      if (!isMouseDown) {
        return; // Ignore mousemove events if mouse button is not down
      }

      if (targetItem == e.target) {
        return;
      }
      if (targetItem) {
        if (targetshadow) {
          targetItem.style.boxShadow = targetshadow;
        } else {
          targetItem.style.removeProperty("box-shadow");
        }
      }
      targetItem = e.target;
      targetshadow = e.target.style.boxShadow;
      targetItem.style.boxShadow = "0.3px 0px 5px green";
    };

    const handleKeyPress = (event) => {
      if (!isMouseDown) {
        return; // Ignore mousemove events if mouse button is not down
      }
      if (event.key === "Alt") {
        if (altpressed) {
          return;
        }
        console.log("alt is pressed");
        altpressed = true;
      }
    };

    const MouseUpHandler = () => {
      isMouseDown = false; // Mouse button is released
      if (targetItem) {
        if (targetshadow) {
          targetItem.style.boxShadow = targetshadow;
        } else {
          targetItem.style.removeProperty("box-shadow");
        }
      }
      if (targetItem && element && targetItem !== element) {
        if (altpressed) {
          cloned = element.cloneNode(true);
          targetItem.appendChild(cloned);
        } else {
          targetItem.appendChild(element);
        }
      }
      altpressed = false;
      onmoveon(false);
    };

    const MouseDownHandler = (e) => {
      element = null;
      targetItem = null;
      element = e.target;
      isMouseDown = true; // Mouse button is pressed
    };

    PlayGround.current.addEventListener("mousemove", TargetFinder);
    PlayGround.current.addEventListener("mouseup", MouseUpHandler);
    PlayGround.current.addEventListener("mousedown", MouseDownHandler);
    PlayGround.current.addEventListener("keydown", handleKeyPress);

    return () => {
      PlayGround.current.removeEventListener("mousemove", TargetFinder);
      PlayGround.current.removeEventListener("mouseup", MouseUpHandler);
      PlayGround.current.removeEventListener("mousedown", MouseDownHandler);
      PlayGround.current.removeEventListener("keydown", handleKeyPress);
    };
  }, [moveon]);

  return <></>;
};
