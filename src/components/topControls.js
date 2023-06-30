import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/main.context";

import "./topcontrols.css";
import InputColor from "react-input-color";
export const TopControls = ({
  Properties,
  PlayGround,
  playgroundHeight,
  playgroundWidth,
  setPreviewdata,
}) => {
  const {
    activeElement,
    MainUnit,
    onMainUnit,
    TggTxtControl,
    onTggTxtControl,
  } = useContext(MainContext);

  const [verDiv, onverDiv] = useState(false);
  const [closeProps, onCloseProps] = useState(true);
  const [Visible, onVisible] = useState(true);
  // Copy selected Element
  const CopySelected = () => {
    let clonedElement = activeElement.cloneNode(true);
    navigator.clipboard
      .writeText(clonedElement.outerHTML)
      .then(() => {
        if (window.confirm("Do you want to extract copied data?")) {
          activeElement.remove();
        }
      })
      .catch((err) => {
        console.error("Failed to copy element: ", err);
      });
  };

  const ToggleVisibleRef = (fromshift) => {
    let refImage = document.querySelectorAll("#reference-image");
    const allElements = PlayGround.current.getElementsByTagName("DIV");

    if (Visible && !fromshift) {
      onVisible(false);
      // change styles
      PlayGround.current.style.height = "100vh";
      PlayGround.current.style.width = "100vw";
      PlayGround.current.style.position = "fixed";
      PlayGround.current.style.left = "0";
      PlayGround.current.style.top = "0";
      PlayGround.current.style.zIndex = "9999";

      refImage.forEach((elem) => {
        elem.style.display = "none";
      });
      for (let i = 0; i < allElements.length; i++) {
        allElements[i].style.removeProperty("outline");
      }
    } else {
      onVisible(true);
      PlayGround.current.style.height = playgroundHeight;
      PlayGround.current.style.width = playgroundWidth;
      PlayGround.current.style.removeProperty("position");
      PlayGround.current.style.removeProperty("left");
      PlayGround.current.style.removeProperty("top");
      PlayGround.current.style.removeProperty("z-index");
      refImage.forEach((elem) => {
        elem.style.display = "block";
      });
      for (let i = 0; i < allElements.length; i++) {
        allElements[i].style.outline = "0.5px dashed rgb(255 207 207)";
      }
    }
  };

  const handleChange = (element, color) => {
    if (element) {
      element.style.backgroundColor = color.hex;
    }
  };
  const handleTextChange = (element, color) => {
    if (element) {
      element.style.color = color.hex;
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "F") {
        setPreviewdata(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="center-control-parent">
      <div className="leftside-start">
        <div>
          <div
            onClick={() => {
              onMainUnit("px");
            }}
            style={{
              height: "5px",
              background: MainUnit === "px" ? "pink" : "transparent",
              color: MainUnit === "px" ? "#000" : "#fff",
            }}
            className="unitsset"
          >
            px
          </div>
          <div
            onClick={() => {
              onMainUnit("rem");
            }}
            style={{
              height: "5px",
              background: MainUnit === "rem" ? "pink" : "transparent",
              color: MainUnit === "rem" ? "#000" : "#fff",
            }}
            className="unitsset"
          >
            rem
          </div>
          <div
            onClick={() => {
              onMainUnit("%");
            }}
            style={{
              height: "5px",
              background: MainUnit === "%" ? "pink" : "transparent",
              color: MainUnit === "%" ? "#000" : "#fff",
            }}
            className="unitsset"
          >
            %
          </div>
        </div>
        <div className="leftside-colors">
          <div>
            <div>BG</div>
            <InputColor
              style={{ width: "50px" }}
              initialValue="#5e72e4"
              onChange={(e) => handleChange(activeElement, e)}
              placement="right"
            />
            <div
              onClick={() => {
                activeElement.style.removeProperty("background-color");
              }}
              class="division99115"
            >
              <div class="division36194"></div>
            </div>
          </div>
          <div>
            <div>Text</div>
            <InputColor
              style={{ width: "50px" }}
              initialValue="#5e72e4"
              onChange={(e) => handleTextChange(activeElement, e)}
              placement="right"
            />
            <div
              onClick={() => {
                activeElement.style.removeProperty("color");
              }}
              class="division99115"
            >
              <div class="division36194"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="center-control">
        {closeProps ? (
          <img
            className="open-properties"
            onClick={() => {
              Properties.current.style.width = "300px";
              onCloseProps(false);
            }}
            alt="open close"
            src={require("../assect/edit.svg").default}
          />
        ) : (
          <img
            className="close-properties"
            onClick={() => {
              Properties.current.style.width = "0%";
              onCloseProps(true);
            }}
            alt="open close"
            src={require("../assect/close.svg").default}
          />
        )}
        <img
          className="open-properties"
          onClick={() => CopySelected()}
          alt="delete"
          src={require("../assect/copy.svg").default}
        />

        {Visible ? (
          <img
            className="open-properties"
            onClick={() => setPreviewdata(true)}
            alt="preview"
            src={require("../assect/visibility.svg").default}
          />
        ) : (
          <img
            className="open-properties"
            onClick={() => ToggleVisibleRef()}
            alt="unvisible"
            src={require("../assect/visibility_off.svg").default}
          />
        )}
      </div>
      <div style={{ width: "200px" }}></div>
      <div className="rightside-end">
        <div style={{ marginBottom: 0 }} className="flex">
          <div className="wid-50">
            <input
              onFocus={(e) => {
                e.target.value = activeElement && activeElement.style.height;
                e.target.readOnly = false;
                e.target.select();
              }}
              onBlur={(e) => {
                e.target.setAttribute("readOnly", "readOnly");
              }}
              onChange={(e) => {
                if (activeElement) {
                  activeElement.style.height = e.target.value;
                }
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  activeElement.style.height = e.target.value;
                }
              }}
              type="text"
              placeholder="Height"
            />
            <div
              onClick={() => {
                activeElement.style.height = "100%";
              }}
              className="unitsset widthButton"
            >
              100%
            </div>
          </div>
          <div className="wid-50">
            <input
              onFocus={(e) => {
                e.target.value = activeElement && activeElement.style.width;
                e.target.readOnly = false;
                e.target.select();
              }}
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
              placeholder="Width"
            />
            <div
              onClick={() => {
                activeElement.style.width = "100%";
              }}
              className="unitsset widthButton"
            >
              100%
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: TggTxtControl ? "10px" : 0,
            height: TggTxtControl ? "300px" : 0,
            overflow: "hidden",
            padding: TggTxtControl ? "5px" : 0,
            marginBottom: "10px",
            transitionDuration: "0.5s",
          }}
          className="text-edit-cont neo-cont"
        >
          <div className="text-section">
            <textarea
              onFocus={(e) => {
                e.target.value = activeElement && activeElement.innerText;
                e.target.readOnly = false;
                e.target.select();
              }}
              onChange={(e) => {
                if (activeElement) {
                  if (activeElement.tagName === "DIV") {
                    if (verDiv === activeElement) {
                      activeElement.innerHTML = e.target.value;
                    } else {
                      if (
                        window.confirm(
                          `Do you really want to change inside?\nIt is a ${activeElement.tagName} Element\nIt's height is : ${activeElement.style.height}\nIt's width is : ${activeElement.style.width}`
                        )
                      ) {
                        activeElement.innerHTML = e.target.value;
                        onverDiv(activeElement);
                      }
                    }
                  } else {
                    activeElement.innerHTML = e.target.value;
                  }
                }
              }}
              placeholder="your text here"
              type="text"
            />
          </div>
          {/* this is for font weight and font size */}
          <div className="flex">
            <div className="wid-50">
              <p>Weight</p>
              <select
                onFocus={(e) => (e.target.value = "")}
                id="displayDropdown"
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.fontWeight = e.target.value)
                    : null
                }
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Lighter</option>
                <option value="400">400</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="900">900</option>
              </select>
            </div>
            <div className="wid-50">
              <p>Size</p>
              <input
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.fontSize = e.target.value + "rem")
                    : null
                }
                type="number"
              />
            </div>
          </div>
          {/* this is for font color and font family */}
          <div className="flex">
            <div className="flex-col">
              <p>Fonts</p>
              <select
                className="custom-input"
                style={{ width: "90%" }}
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.fontFamily = e.target.value)
                    : null
                }
                id="font-family"
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Times">Times</option>
                <option value="Courier New">Courier New</option>
                <option value="Courier">Courier</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
                <option value="Palatino">Palatino</option>
                <option value="Garamond">Garamond</option>
              </select>
            </div>
          </div>
          {/* this is for text Transform and letter space */}
          <div className="flex">
            <div className="wid-50">
              <p>Transform</p>
              <select
                onFocus={(e) => (e.target.value = "")}
                id="displayDropdown"
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.textTransform = e.target.value)
                    : null
                }
              >
                <option value="none">None</option>
                <option value="capitalize">Capitalize</option>
                <option value="uppercase">Uppercase</option>
                <option value="lowercase">Lowercase</option>
              </select>
            </div>
            <div className="wid-50">
              <p>Spacing</p>
              <input
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.letterSpacing =
                        e.target.value + "px")
                    : null
                }
                defaultValue={1}
                type="number"
              />
            </div>
          </div>
          {/* from here it is for text align */}
          <div className="flex">
            <div className="wid-50">
              <p>Decoration</p>
              <select
                onFocus={(e) => (e.target.value = "")}
                id="displayDropdown"
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.textDecoration = e.target.value)
                    : null
                }
              >
                <option value="none">None</option>
                <option value="line-through">Line-through</option>
                <option value="underline">Underline</option>
                <option value="overline">Overline</option>
              </select>
            </div>
            <div className="wid-50">
              <p>Align Text</p>
              <select
                onFocus={(e) => (e.target.value = "")}
                id="displayDropdown"
                onChange={(e) =>
                  activeElement
                    ? (activeElement.style.textAlign = e.target.value)
                    : null
                }
              >
                <option value="none">None</option>
                <option value="center">Center</option>
                <option value="start">Start</option>
                <option value="end">End</option>
                <option value="Left">Left</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
          </div>
        </div>
        <div
          onClick={() => onTggTxtControl(!TggTxtControl)}
          className="ButtonToggle"
        >
          Tt
        </div>
      </div>
    </div>
  );
};
