import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect, useRef, useState } from "react";
import { InputMenu } from "./input-menu";
import { Controlbar } from "./components/controlbar";
import { CopyArray, ZoomIn, ZoomOut } from "./components/smallFunc";
import { act } from "react-dom/test-utils";
import { MainContext } from "../src/context/main.context";
import { PlayGroundWindow } from "./components/playground";
import { LeftElements } from "./components/Elements";
import { TopControls } from "./components/topControls";
import { BottomControl } from "./components/bottomcontrol";
function App() {
  const [images, setImages] = useState([]);
  const Rectangle = useRef("");
  const [tempImage, setTempImage] = useState([]);
  const [parent, setParent] = useState("main-container");
  const [childElement, onChildElement] = useState("");
  const [data, ondata] = useState();
  const [propertyPanel, onpropertyPanel] = useState(false);
  const [scalepg, onscalepg] = useState(1);

  // these are playground dimension

  const [playgroundHeight, setPlaygroundHeight] = useState("");
  const [playgroundWidth, setPlaygroundWidth] = useState("");
  const PlayGround = useRef();

  const {
    activeElement,
    setactiveElement,
    generateRandomNumber,
    onTggPropControl,
  } = useContext(MainContext);
  // state managed for visibility of Reference images

  // const mainContainer = "main-container";
  const Properties = useRef();
  // these are for appendchild as rectangle

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
        if (activeElement.tagName === "DIV") {
          activeElement.style.outline = "0.5px dashed rgb(255 207 207)";
        } else {
          activeElement.style.removeProperty("outline");
        }
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
          CreateRect.classList.add(`division${generateRandomNumber()}`);
          CreateRect.style.height = tempObj.height;
          CreateRect.style.width = tempObj.width;
          CreateRect.style.position = "relative";
          // CreateRect.style.top = tempObj.top;
          // CreateRect.style.left = tempObj.left;
          CreateRect.style.outline = "0.5px dashed rgb(255 207 207)";
          CreateRect.style.boxSizing = "border-box";

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

    setPlaygroundHeight(setHeight + "px");
    setPlaygroundWidth(setWidth + "px");
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

  return (
    <div className="App">
      <div id="branding">UI GENERATOR</div>
      <div onClick={() => CopyArray()} id="copy-array">
        Copy Data
      </div>
      <LeftElements PlayGround={PlayGround} />

      <div ref={Rectangle} id="rectangle" className="guide-rectangle"></div>

      <div ref={mainContainer} className="container-parent">
        <TopControls
          playgroundHeight={playgroundHeight}
          playgroundWidth={playgroundWidth}
          scalepg={scalepg}
          onscalepg={onscalepg}
          Properties={Properties}
          PlayGround={PlayGround}
        />
        <PlayGroundWindow
          mainContainer={mainContainer}
          PlayGround={PlayGround}
          setParent={setParent}
        />
        <BottomControl />
        <div
          onMouseOver={() => onTggPropControl(true)}
          style={{
            height: "30px",
            width: "90%",
            position: "absolute",
            bottom: "0",
            zIndex: "9",
          }}
          className="bottomHover"
        ></div>
      </div>
      <Controlbar
        setElement={setactiveElement}
        Element={activeElement}
        Properties={Properties}
      />
    </div>
  );
}

export default App;
