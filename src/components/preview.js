import React, { useEffect, useRef } from "react";

export const Preview = ({ PlayGround, setPreviewdata }) => {
  const previewParent = useRef(null);
  useEffect(() => {
    const newdiv = document.createElement("div");
    newdiv.innerHTML = "hello world";
    const clonedPreview = PlayGround.current.cloneNode(true);
    clonedPreview.style.width = "100%";
    clonedPreview.style.height = "100%";
    clonedPreview.style.position = "revert";
    clonedPreview.style.transform = "scale(1)";
    const allElements = clonedPreview.querySelectorAll("*");

    if (clonedPreview.style.boxShadow.includes("0.3")) {
      clonedPreview.style.removeProperty("box-shadow");
    }
    if (clonedPreview.style.outline.includes("dashed")) {
      clonedPreview.style.removeProperty("outline");
    }
    allElements.forEach((element) => {
      if (element.style.boxShadow.includes("0.3")) {
        element.style.removeProperty("box-shadow");
      }
      if (element.style.outline.includes("dashed")) {
        element.style.removeProperty("outline");
      }
    });

    document.getElementById("previewPanel").appendChild(clonedPreview);
  }, []);

  return <div id="previewPanel"></div>;
};
