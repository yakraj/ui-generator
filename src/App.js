import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { InputMenu } from "./input-menu";
function App() {
  const [images, setImages] = useState([]);
  const [closeProps, onCloseProps] = useState(true);
  const Rectangle = useRef("");
  const [tempImage, setTempImage] = useState([]);
  const [parent, setParent] = useState("main-container");
  const [childElement, onChildElement] = useState("");
  const [data, ondata] = useState();
  const [propertyPanel, onpropertyPanel] = useState(false);

  const PlayGround = useRef();
  // const mainContainer = "main-container";
  const Properties = useRef();
  const [activeElement, setactiveElement] = useState();
  const executeClick = (id) => {
    var divs = document.querySelectorAll("div");

    // Loop through all div elements and remove the background style
    for (var i = 0; i < divs.length; i++) {
      divs[i].style.outline = "none";
    }

    const element = document.getElementById(id);
    element.style.outline = "5px solid green";
    setactiveElement(element);
  };

  // set background image

  useEffect(() => {
    var element = document.getElementById("main-container");
    element.style.backgroundImage = `url(${prompt(
      "pleas insert background image"
    )})`;
  }, []);
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

  // console.log(parent, new Date().getSeconds());
  // console.log(childElement, new Date().getSeconds());
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

      function handleMouseMove(ev) {
        Rectangle.current.style.height = ev.clientY - topPosition + "px";
        Rectangle.current.style.width = ev.clientX - leftPosition + "px";
        const heiGht =
          (ev.clientY - topPosition) / (window.innerHeight / 100) + "%";
        const WiDth =
          (ev.clientX - leftPosition) / (window.innerWidth / 100) + "%";
        tempObj.height = ev.clientY - topPosition + "px";
        tempObj.width = ev.clientX - leftPosition + "px";
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
        setTimeout(() => {
          if (e.clientY - topPosition > 10 && e.clientX - leftPosition > 10) {
            var CreateRect = document.createElement("div");
            CreateRect.setAttribute("id", tempObj.id);
            CreateRect.style.height = tempObj.height;
            CreateRect.style.width = tempObj.width;
            CreateRect.style.position = "relative";
            // CreateRect.style.top = tempObj.top;
            // CreateRect.style.left = tempObj.left;
            CreateRect.style.border = "1px solid red";
            CreateRect.style.boxSizing = "border-box";
            CreateRect.style.boxShadow = "0 0 5px #fff,0 0 10px #fff";

            CreateRect.onclick = (e) => {
              e.stopPropagation();
              setParent(tempObj.id);
              executeClick(tempObj.id);
            };
            // parent.appendChild(CreateRect);
            onChildElement(CreateRect);
            // parentRect.appendChild(CreateRect);
            // setTempImage([...tempImage, tempObj]);
          } else {
            // console.log("delete it");
          }
        }, 10);
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
  }, [tempImage]);

  const CopyArray = () => {
    let originalElement = document.getElementById("main-container");
    let clonedElement = originalElement.cloneNode(true);

    const GuideRectangle = clonedElement.querySelectorAll("#rectangle");
    // const divElements = clonedElement.querySelectorAll("div");

    // divElements.forEach((divElement) => {
    //   divElement.removeAttribute("style");
    // });

    GuideRectangle.forEach((elem) => {
      elem.remove("delete-button");
    });

    console.log(clonedElement);
    navigator.clipboard
      .writeText(clonedElement.outerHTML)
      .then(() => {
        if (window.confirm("Do you want to extract copied data?")) {
          window.open("https://html-extractor.yakraj.com", "_blank");
        }
      })
      .catch((err) => {
        console.error("Failed to copy element: ", err);
      });
  };

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
  const Highliter = (e) => {
    e.stopPropagation();
    console.log("reached until here");
    setactiveElement(e.target);
  };
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
      case "h2":
        element = document.createElement("h2");
        element.innerHTML = "Hello World";
        break;
      case "h3":
        element = document.createElement("h3");
        element.innerHTML = "Hello World";
        break;
      case "h4":
        element = document.createElement("h4");
        element.innerHTML = "Hello World";
        break;
      case "h5":
        element = document.createElement("h5");
        element.innerHTML = "Hello World";
        break;
      case "h6":
        element = document.createElement("h6");
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
      window.removeEventListener("mousemove", TargetFinder);
      window.removeEventListener("mouseup", MouseUpHandler);
      if (targetItem) {
        element.addEventListener("click", Highliter);
        targetItem.appendChild(element);
      }
    };

    window.addEventListener("mousemove", TargetFinder);
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

  //from here zoom and other starts
  const mainContainer = useRef();

  const [scalepg, onscalepg] = useState(1);
  const ZoomIn = () => {
    console.log(scalepg);

    var element = PlayGround.current;
    switch (scalepg) {
      case 1:
        element.style.transform = "scale(2)";
        onscalepg(2);
        break;
      case 2:
        element.style.transform = "scale(3)";
        onscalepg(3);
        break;
      case 3:
        element.style.transform = "scale(4)";
        onscalepg(4);
        break;
      default:
        return;
    }
  };

  const ZoomOut = () => {
    var element = PlayGround.current;
    switch (scalepg) {
      case 2:
        element.style.transform = "scale(1)";
        onscalepg(1);
        break;
      case 3:
        element.style.transform = "scale(2)";
        onscalepg(2);
        break;
      case 4:
        element.style.transform = "scale(3)";
        onscalepg(3);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    var mainWidth = mainContainer.current.offsetWidth;

    var setWidth = mainWidth * 0.9;

    var setHeight = ((mainWidth * 0.9) / 16) * 9;

    PlayGround.current.style.width = setWidth + "px";
    PlayGround.current.style.height = setHeight + "px";
  }, []);

  return (
    <div className="App">
      <div className="center-control">
        <img
          onClick={() => {
            activeElement.remove();
          }}
          alt="delete"
          src={require("./assect/delete.svg").default}
        />
        {closeProps ? (
          <img
            className="open-properties"
            onClick={() => {
              Properties.current.style.width = "20%";
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
        <div onClick={() => ZoomIn()}>+</div>
        <div onClick={() => ZoomOut()}>-</div>
      </div>
      <div id="branding">UI GENERATOR</div>
      <div onClick={() => CopyArray()} id="copy-array">
        Copy Data
      </div>
      <div className="CreatorSec">
        {InputMenu.map((x, i) => {
          return <SingleButton key={i} data={x} />;
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
      <div ref={Properties} className="user-panel">
        <div className="properties-heading">Properties</div>
        <div className="properties-items">
          <div class="data-contents">
            <div class="display-data">
              <p>display</p>
              <select
                onFocus={(e) => (e.target.value = "")}
                id="displayDropdown"
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.display = e.target.value)
                    : null
                }
              >
                <option value="inline">inline</option>
                <option value="block">block</option>
                <option value="inline-block">inline-block</option>
                <option value="flex">flex</option>
                <option value="inline-flex">inline-flex</option>
                <option value="grid">grid</option>
                <option value="inline-grid">inline-grid</option>
                <option value="table">table</option>
                <option value="table-caption">table-caption</option>
                <option value="table-cell">table-cell</option>
                <option value="table-column">table-column</option>
                <option value="table-column-group">table-column-group</option>
                <option value="table-footer-group">table-footer-group</option>
                <option value="table-header-group">table-header-group</option>
                <option value="table-row">table-row</option>
                <option value="table-row-group">table-row-group</option>
                <option value="none">none</option>
                <option value="initial">initial</option>
                <option value="inherit">inherit</option>
              </select>
            </div>
            <div class="display-data">
              <p>Justify Content</p>
              <select
                onFocus={(e) => (e.target.value = "")}
                id="Justify-content"
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.justifyContent = e.target.value)
                    : null
                }
              >
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="center">center</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
                <option value="space-evenly">space-evenly</option>
                <option value="stretch">stretch</option>
              </select>
            </div>
            <div class="display-data">
              <p>align Items</p>
              <select
                onFocus={(e) => (e.target.value = "")}
                id="displayDropdown"
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.alignItems = e.target.value)
                    : null
                }
              >
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="center">center</option>
                <option value="baseline">baseline</option>
                <option value="stretch">stretch</option>
              </select>
            </div>
            <div class="display-data">
              <p>flex Direction</p>
              <select
                onFocus={(e) => (e.target.value = "")}
                id="displayDropdown"
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.flexDirection = e.target.value)
                    : null
                }
              >
                <option value="row">row</option>
                <option value="row-reverse">row-reverse</option>
                <option value="column">column</option>
                <option value="column-reverse">column-reverse</option>
              </select>
            </div>
            <div class="display-data">
              <p>Custon Class</p>
              <input
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    activeElement.classList.add(e.target.value);
                  }
                }}
                type="text"
                placeholder="custom class"
              />
            </div>
            <div class="display-data">
              <p>height</p>
              <input
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.height = e.target.value)
                    : null
                }
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    activeElement.style.height = e.target.value;
                  }
                }}
                type="text"
                placeholder="Element Height"
              />
            </div>
            <div class="display-data">
              <p>Width</p>
              <input
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.width = e.target.value)
                    : null
                }
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    activeElement.style.width = e.target.value;
                  }
                }}
                type="text"
                placeholder="Element Width"
              />
            </div>
            <div class="display-data">
              <p>Overflow X</p>
              <input
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.overflowX = e.target.value)
                    : null
                }
                type="text"
                placeholder="Element Width"
              />
            </div>
            <div class="display-data">
              <p>Overflow Y</p>
              <input
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.overflowY = e.target.value)
                    : null
                }
                type="text"
                placeholder="Element Width"
              />
            </div>
            <div class="display-data">
              <p>Inside Text</p>
              <input
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                  activeElement
                    ? (activeElement.innerHTML = e.target.value)
                    : null
                }
                type="text"
                placeholder="Element Width"
              />
            </div>
            <div class="display-data">
              <p>Image URL</p>
              <input
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                  activeElement
                    ? activeElement.setAttribute("src", e.target.value)
                    : null
                }
                type="text"
                placeholder="Element Width"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
