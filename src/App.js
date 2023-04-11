import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { InputMenu } from "./input-menu";
import { Controlbar } from "./components/controlbar";
import {
  CopyArray,
  SingleButton,
  ZoomIn,
  ZoomOut,
} from "./components/smallFunc";
import { act } from "react-dom/test-utils";

function App() {
  const [images, setImages] = useState([]);
  const [closeProps, onCloseProps] = useState(true);
  const Rectangle = useRef("");
  const [tempImage, setTempImage] = useState([]);
  const [parent, setParent] = useState("main-container");
  const [childElement, onChildElement] = useState("");
  const [data, ondata] = useState();
  const [propertyPanel, onpropertyPanel] = useState(false);
  const [scalepg, onscalepg] = useState(1);
  const PlayGround = useRef();
  // const mainContainer = "main-container";
  const Properties = useRef();
  const [activeElement, setactiveElement] = useState();
  // these are for appendchild as rectangle

  //

  // prevent to onload

  window.addEventListener("beforeunload", function (e) {
    // Cancel the event
    e.preventDefault();

    // Chrome requires returnValue to be set
    e.returnValue = "";

    // Display the confirmation message
    const confirmationMessage = "Do you really want to close?";
    e.returnValue = confirmationMessage; // For Chrome
    return confirmationMessage; // For other browsers
  });
  useEffect(() => {
    if (data) {
      var parentRect = document.getElementById(parent);
      parentRect.appendChild(data);
    }
  }, [parent.keepit, data]);

  useEffect(() => {
    if (childElement) {
      ondata(childElement);
    }
  }, [childElement]);

  useEffect(() => {
    if (activeElement) {
      activeElement.style.outline = "5px solid blue";

      setTimeout(() => {
        activeElement.style.removeProperty("outline");
      }, 100);
    }
  }, [activeElement]);

  let counter = 0;

  useEffect(() => {
    let topPosition = 0;
    let leftPosition = 0;
    let lastTopPosition = 0;
    let lastLeftPosition = 0;
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    function handleMouseDown(e) {
      counter = counter + 1;
      const idName = "Image" + counter;

      const tempObj = {
        id: "id" + Date.now(), // Use a unique identifier
        idName: idName,
        height: "",
        width: "",
        color: randomColor,
        top: e.clientY / (window.innerHeight / 100) + "%",
        left: e.clientX / (window.innerWidth / 100) + "%",
        background: "anything",
      };

      let targetItem = null;
      function handleMouseMove(ev) {
        // it is for setting parent backgound
        targetItem = ev.target;

        var recWidth = null;
        var recHeight = null;
        switch (scalepg) {
          case 1:
            recHeight = ev.clientY - topPosition;
            recWidth = ev.clientX - leftPosition;
            break;
          case 2:
            recHeight = (ev.clientY - topPosition) / 2;
            recWidth = (ev.clientX - leftPosition) / 2;
            break;
          case 3:
            recHeight = (ev.clientY - topPosition) / 3;
            recWidth = (ev.clientX - leftPosition) / 3;
            break;
          default:
            return;
        }

        Rectangle.current.style.height = ev.clientY - topPosition + "px";
        Rectangle.current.style.width = ev.clientX - leftPosition + "px";
        const heiGht =
          (ev.clientY - topPosition) / (window.innerHeight / 100) + "%";
        const WiDth =
          (ev.clientX - leftPosition) / (window.innerWidth / 100) + "%";
        tempObj.height = recHeight + "px";
        tempObj.width = recWidth + "px";
        Rectangle.current.style.height = heiGht;
        Rectangle.current.style.width = WiDth;
      }

      topPosition = e.clientY;
      leftPosition = e.clientX;

      Rectangle.current.style.top = e.clientY + "px";
      Rectangle.current.style.left = e.clientX + "px";
      PlayGround.current.addEventListener("mousemove", handleMouseMove);

      PlayGround.current.addEventListener("mouseup", function handleMouseUp(e) {
        lastTopPosition = e.clientY;
        lastLeftPosition = e.clientX;

        if (e.clientY - topPosition > 10 && e.clientX - leftPosition > 10) {
          var CreateRect = document.createElement("div");
          CreateRect.setAttribute("id", tempObj.id);
          CreateRect.style.height = tempObj.height;
          CreateRect.style.width = tempObj.width;
          CreateRect.style.position = "relative";
          // CreateRect.style.top = tempObj.top;
          // CreateRect.style.left = tempObj.left;
          CreateRect.style.border = "0.5px solid rgb(255 207 207)";
          CreateRect.style.boxSizing = "border-box";
          CreateRect.style.boxShadow = "0 0 5px #fff,0 0 10px #fff";

          if (targetItem) {
            targetItem.appendChild(CreateRect);
          }
        }
        Rectangle.current.style.height = 0 + "px";
        Rectangle.current.style.width = 0 + "px";

        PlayGround.current.removeEventListener("mousemove", handleMouseMove);
        PlayGround.current.removeEventListener("mouseup", handleMouseUp);
      });
    }

    PlayGround.current.addEventListener("mousedown", handleMouseDown);

    return () => {
      PlayGround.current.removeEventListener("mousedown", handleMouseDown);
    };
  }, [tempImage, scalepg]);

  // keypress eventlistner

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.shiftKey && event.keyCode === 88) {
        Properties.current.style.width = "20%";
      }
      if (event.shiftKey && event.keyCode === 90) {
        Properties.current.style.width = "0px";
      }
    });
  }, [propertyPanel.keepit]);

  useEffect(() => {
    setImages(tempImage);
  }, [tempImage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey && event.key === "D") {
        if (activeElement) {
          const clonedElement = activeElement.cloneNode(true);

          const parentElement = activeElement.parentNode;
          console.log(parentElement, "/n", clonedElement);
          parentElement.appendChild(clonedElement);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeElement]);

  //from here zoom and other starts
  const mainContainer = useRef();

  useEffect(() => {
    var mainWidth = mainContainer.current.offsetWidth;

    var setWidth = mainWidth * 0.9;

    var setHeight = ((mainWidth * 0.9) / 16) * 9;

    PlayGround.current.style.width = setWidth + "px";
    PlayGround.current.style.height = setHeight + "px";
  }, []);

  // select element
  const [runFirst, onRunFirst] = useState(true);

  const NHighliter = (e) => {
    setactiveElement(e.target);
  };
  useEffect(() => {
    console.log("running", new Date());
    if (!runFirst) {
      PlayGround.current.removeEventListener("click", NHighliter);
    } else {
      onRunFirst(false);
    }
    return PlayGround.current.addEventListener("click", NHighliter);
  }, []);

  // Copy selected Element
  const CopySelected = () => {
    let clonedElement = activeElement.cloneNode(true);
    navigator.clipboard
      .writeText(clonedElement.outerHTML)
      .then(() => {
        console.log("copied data");
      })
      .catch((err) => {
        console.error("Failed to copy element: ", err);
      });
  };
  return (
    <div className="App">
      <div className="center-control">
        <img
          onClick={() => {
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
          }}
          alt="delete"
          src={require("./assect/delete.svg").default}
        />
        {closeProps ? (
          <img
            className="open-properties"
            onClick={() => {
              Properties.current.style.width = "300px";
              onCloseProps(false);
            }}
            alt="delete"
            src={require("./assect/edit.svg").default}
          />
        ) : (
          <img
            className="close-properties"
            onClick={() => {
              Properties.current.style.width = "0%";
              onCloseProps(true);
            }}
            alt="delete"
            src={require("./assect/close.svg").default}
          />
        )}
        <img
          className="open-properties"
          onClick={() => CopySelected()}
          alt="delete"
          src={require("./assect/copy.svg").default}
        />
        <div onClick={() => ZoomIn(PlayGround, onscalepg, scalepg)}>+</div>
        <div onClick={() => ZoomOut(PlayGround, onscalepg, scalepg)}>-</div>
      </div>
      <div id="branding">UI GENERATOR</div>
      <div onClick={() => CopyArray()} id="copy-array">
        Copy Data
      </div>
      <div className="CreatorSec">
        {InputMenu.map((x, i) => {
          return <SingleButton PlayGround={PlayGround} key={i} data={x} />;
        })}
      </div>

      <div ref={Rectangle} id="rectangle" className="guide-rectangle"></div>
      <div ref={mainContainer} className="container-parent">
        <div
          ref={PlayGround}
          onClick={() => setParent("main-container")}
          id="main-container"
        ></div>
      </div>
      <Controlbar Element={activeElement} Properties={Properties} />
    </div>
  );
}

export default App;
