import React, { useContext } from "react";
import "./bottomcontrol.css";
import { MainContext } from "../context/main.context";

import InputColor from "react-input-color";
export const BottomControl = () => {
  const {
    activeElement,
    MainUnit,
    onMainUnit,
    onTggPropControl,
    TggPropControl,
  } = useContext(MainContext);
  const handleChange = (element, color) => {
    if (element) {
      element.style.borderColor = color.hex;
    }
  };

  const BorderSetter = (data) => {
    if (!activeElement) {
      return;
    }

    let hasBorder = activeElement.style.border;

    if (data === "all" && hasBorder) {
      activeElement.style.removeProperty("border");
      return;
    }

    switch (data) {
      case "all":
        activeElement.style.border = "1px solid grey";
        break;
      case "left":
        activeElement.style.borderLeft = "1px solid grey";
        break;
      case "right":
        activeElement.style.borderRight = "1px solid grey";
        break;
      case "top":
        activeElement.style.borderTop = "1px solid grey";
        break;
      case "bottom":
        activeElement.style.borderBottom = "1px solid grey";
        break;
      default:
        break;
    }
  };

  const inputValueController = (e, find) => {
    if (!activeElement) {
      return;
    }
    e.target.value = "";
    let finder = find;
    if (!finder) {
      return;
    }
    let previusunit = MainUnit;
    const result = finder.match(/\d+|\D+/g);

    onMainUnit(result[1]);
    e.target.value = result[0];
    e.target.readOnly = false;
    e.target.select();
    setTimeout(() => {
      onMainUnit(previusunit);
    }, 200);
  };

  const setFlexdisplay = () => {
    activeElement.style.display = "flex";
  };

  return (
    <div
      style={{
        width: "100%",
        position: "absolute",
        bottom: "0",
        height: TggPropControl ? "100px" : 0,
        transitionDuration: "0.5s",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          height: TggPropControl ? "100px" : 0,
          transitionDuration: "0.5s",
        }}
        className="bottombarcontrols"
      >
        {/* this is for custom class */}
        <div style={{ width: "150px" }}>
          {/* this is for height and width */}

          {/* this is for display and flex-direction */}
          <div className="flex-col">
            <p className="al-left">Display</p>
            <select
              className="custom-input"
              onFocus={(e) => (e.target.value = "")}
              id="displayDropdown"
              onChange={(e) =>
                Element ? (activeElement.style.display = e.target.value) : null
              }
            >
              <option value="inline">inline</option>
              <option value="block">block</option>
              <option value="inline-block">inline-block</option>
              <option value="flex">flex</option>
              <option value="inline-flex">inline-flex</option>
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
          <div className="flex-col">
            <p className="al-left">flex-Wrap</p>
            <div className="wrapButtonsParent">
              <div
                onClick={() => {
                  if (activeElement && activeElement.style.flexWrap) {
                    activeElement.style.removeProperty("flex-wrap");
                    return;
                  }
                  activeElement.style.flexWrap = "wrap";
                }}
                data={
                  activeElement && activeElement.style.flexWrap
                    ? "Remove"
                    : "Wrap"
                }
                className="single-div wrapButtons"
              >
                Wrap
              </div>
              <div
                onClick={() => (activeElement.style.flexWrap = "wrap-reverse")}
                data="Reverse"
                className="single-div wrapButtons"
              >
                Reverse
              </div>
            </div>
          </div>
        </div>
        {/* this is for justify and align */}
        <div className="gui-controllers">
          <p>Justyfy-Content</p>
          <div className="justifyControl">
            <div
              onClick={() => {
                activeElement.style.justifyContent = "space-between";
                setFlexdisplay();
              }}
              data="space-between"
              className="single-div"
            ></div>
            <div className="centercolumn">
              <div
                onClick={() => {
                  activeElement.style.justifyContent = "flex-start";
                  setFlexdisplay();
                }}
                data="flex-start"
                className="single-div"
              />
              <div
                onClick={() => {
                  activeElement.style.justifyContent = "center";
                  setFlexdisplay();
                }}
                data="Center"
                className="single-div"
              />
              <div
                onClick={() => {
                  activeElement.style.justifyContent = "flex-end";
                  setFlexdisplay();
                }}
                data="flex-end"
                className="single-div"
              />
            </div>
            <div
              onClick={() => {
                activeElement.style.justifyContent = "space-around";
                setFlexdisplay();
              }}
              data="space-around"
              className="single-div"
            />
          </div>
        </div>
        <div className="gui-controllers">
          <p>Align-Items</p>
          <div className="justifyControl">
            <div
              onClick={() => {
                activeElement.style.alignItems = "self-start";
                setFlexdisplay();
              }}
              data="Self Start"
              className="single-div"
            ></div>
            <div className="centercolumn">
              <div
                onClick={() => {
                  activeElement.style.alignItems = "flex-start";
                  setFlexdisplay();
                }}
                data="Flex-start"
                className="single-div"
              />
              <div
                onClick={() => {
                  activeElement.style.alignItems = "center";
                  setFlexdisplay();
                }}
                data="Center"
                className="single-div"
              />
              <div
                onClick={() => {
                  activeElement.style.alignItems = "flex-end";
                  setFlexdisplay();
                }}
                data="Flex-End"
                className="single-div"
              />
            </div>
            <div
              data="Self End"
              onClick={() => {
                activeElement.style.alignItems = "self-end";
                setFlexdisplay();
              }}
              className="single-div"
            />
          </div>
        </div>
        <div className="gui-controllers">
          <p>direction</p>
          <div className="justifyControl">
            <div
              onClick={() => {
                activeElement.style.flexDirection = "row";
                setFlexdisplay();
              }}
              data="row"
              className="single-div"
            ></div>
            <div className="centercolumn">
              <div
                data="column"
                onClick={() => {
                  activeElement.style.flexDirection = "column";
                  setFlexdisplay();
                }}
                className="single-div"
              />
              <div
                data="Auto"
                onClick={() => {
                  activeElement.style.flexDirection = "auto";
                  setFlexdisplay();
                }}
                className="single-div"
              />
              <div
                data="column Reverse"
                onClick={() => {
                  activeElement.style.flexDirection = "column-reverse";
                  setFlexdisplay();
                }}
                className="single-div"
              />
            </div>
            <div
              data="row Reverse"
              onClick={() => {
                activeElement.style.flexDirection = "row-reverse";
                setFlexdisplay();
              }}
              className="single-div"
            />
          </div>
        </div>
        <div className="gui-controllers">
          <p>Border</p>
          <div className="justifyControl">
            <div
              onClick={() => BorderSetter("left")}
              data="Left"
              className="single-div"
            ></div>
            <div className="centercolumn">
              <div
                onClick={() => BorderSetter("top")}
                data="Top"
                className="single-div"
              />
              <div
                onClick={() => BorderSetter("all")}
                data="All"
                className="single-div"
              />
              <div
                onClick={() => BorderSetter("bottom")}
                data="Bottom"
                className="single-div"
              />
            </div>
            <div
              onClick={() => BorderSetter("right")}
              data="Right"
              className="single-div"
            />
          </div>
        </div>

        <div className="flex-col" style={{ width: "100px" }}>
          <p className="al-left">Border</p>
          <input
            className="custom-input"
            onFocus={(e) => {
              inputValueController(e, activeElement.style.borderWidth);
            }}
            onChange={(e) =>
              (activeElement.style.borderWidth = e.target.value + MainUnit)
            }
            type="number"
            placeholder="width"
          />
          <input
            type="color"
            value="#ff0000"
            style={{ width: "90%" }}
            onChange={(e) => (activeElement.style.borderColor = e.target.value)}
            placement="top"
          />
        </div>
        <div className="flex-col" style={{ width: "100px" }}>
          <p className="al-lef">Box-Sizing</p>
          <select
            onFocus={(e) => (e.target.value = "")}
            id="displayDropdown"
            className="custom-input"
            onChange={(e) =>
              activeElement
                ? (activeElement.style.boxSizing = e.target.value)
                : null
            }
          >
            <option value="unset">unset</option>
            <option value="border-box">Border-box</option>
            <option value="content-box">Content-Box</option>
          </select>
          <p className="al-left">Radius</p>
          <input
            className="custom-input"
            onFocus={(e) => {
              inputValueController(e, activeElement.style.borderRadius);
            }}
            onChange={(e) =>
              (activeElement.style.borderRadius = e.target.value + MainUnit)
            }
            type="number"
          />
        </div>
        <div className="padding-control gui-controllers">
          <p>Padding</p>
          <div className="justifyControl">
            <div data="Flex-start" className="single-div input-boxes">
              <input
                onFocus={(e) => {
                  inputValueController(e, activeElement.style.paddingLeft);
                }}
                onChange={(e) => {
                  if (activeElement) {
                    activeElement.style.paddingLeft = e.target.value + MainUnit;
                  }
                }}
                type="number"
              />
            </div>
            <div className="centercolumn">
              <div data="space-between" className="single-div input-boxes">
                <input
                  onFocus={(e) => {
                    inputValueController(e, activeElement.style.paddingTop);
                  }}
                  onChange={(e) => {
                    if (activeElement) {
                      activeElement.style.paddingTop =
                        e.target.value + MainUnit;
                    }
                  }}
                  type="number"
                />
              </div>
              <div data="Center" className="single-div input-boxes">
                <input
                  onFocus={(e) => {
                    inputValueController(e, activeElement.style.padding);
                  }}
                  onChange={(e) => {
                    if (activeElement) {
                      activeElement.style.padding = e.target.value + MainUnit;
                    }
                  }}
                  type="number"
                />
              </div>
              <div data="space-around" className="single-div input-boxes">
                <input
                  onFocus={(e) => {
                    inputValueController(e, activeElement.style.paddingBottom);
                  }}
                  onChange={(e) => {
                    if (activeElement) {
                      activeElement.style.paddingBottom =
                        e.target.value + MainUnit;
                    }
                  }}
                  type="number"
                />
              </div>
            </div>
            <div data="Flex-End" className="single-div input-boxes">
              <input
                onFocus={(e) => {
                  inputValueController(e, activeElement.style.paddingRight);
                }}
                onChange={(e) => {
                  if (activeElement) {
                    activeElement.style.paddingRight =
                      e.target.value + MainUnit;
                  }
                }}
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="padding-control gui-controllers">
          <p>Margin</p>
          <div className="justifyControl">
            <div data="Flex-start" className="single-div input-boxes">
              <input
                onFocus={(e) => {
                  inputValueController(e, activeElement.style.marginLeft);
                }}
                onChange={(e) => {
                  if (activeElement) {
                    activeElement.style.marginLeft = e.target.value + MainUnit;
                  }
                }}
                type="number"
              />
            </div>
            <div className="centercolumn">
              <div data="space-between" className="single-div input-boxes">
                <input
                  onFocus={(e) => {
                    inputValueController(e, activeElement.style.marginTop);
                  }}
                  onChange={(e) => {
                    if (activeElement) {
                      activeElement.style.marginTop = e.target.value + MainUnit;
                    }
                  }}
                  type="number"
                />
              </div>
              <div data="Center" className="single-div input-boxes">
                <input
                  onFocus={(e) => {
                    inputValueController(e, activeElement.style.margin);
                  }}
                  onChange={(e) => {
                    if (activeElement) {
                      activeElement.style.margin = e.target.value + MainUnit;
                    }
                  }}
                  type="number"
                />
              </div>
              <div data="space-around" className="single-div input-boxes">
                <input
                  onFocus={(e) => {
                    inputValueController(e, activeElement.style.marginBottom);
                  }}
                  onChange={(e) => {
                    if (activeElement) {
                      activeElement.style.marginBottom =
                        e.target.value + MainUnit;
                    }
                  }}
                  type="number"
                />
              </div>
            </div>
            <div data="Flex-End" className="single-div input-boxes">
              <input
                onFocus={(e) => {
                  inputValueController(e, activeElement.style.marginRight);
                }}
                onChange={(e) => {
                  if (activeElement) {
                    activeElement.style.marginRight = e.target.value + MainUnit;
                  }
                }}
                type="number"
              />
            </div>
          </div>
        </div>
        <div style={{ width: "150px" }} className="input-position">
          <p className="al-left">position</p>
          <select
            className="custom-input"
            onFocus={(e) => (e.target.value = "")}
            id="displayDropdown"
            onChange={(e) =>
              activeElement
                ? (activeElement.style.position = e.target.value)
                : null
            }
          >
            <option value="none">None</option>
            <option value="absolute">Absolute</option>
            <option value="relative">Relative</option>
            <option value="fixed">Fixed</option>
            <option value="sticky">sticky</option>
            <option value="static">Static</option>
          </select>
          <p className="al-left">Z Index</p>
          <input
            className="custom-input"
            onFocus={(e) => {
              inputValueController(e, activeElement.style.zIndex);
            }}
            onChange={(e) =>
              activeElement
                ? (activeElement.style.zIndex = e.target.value)
                : null
            }
            type="number"
          />
        </div>
        <div className="padding-control gui-controllers">
          <p>Transform</p>
          <div className="justifyControl">
            <div data="Flex-start" className="single-div input-boxes">
              <input
                onFocus={(e) => {
                  inputValueController(e, activeElement.style.left);
                }}
                onChange={(e) => {
                  if (activeElement) {
                    activeElement.style.left = e.target.value + MainUnit;
                  }
                }}
                type="number"
              />
            </div>
            <div className="centercolumn">
              <div data="space-between" className="single-div input-boxes">
                <input
                  onFocus={(e) => {
                    inputValueController(e, activeElement.style.top);
                  }}
                  onChange={(e) => {
                    if (activeElement) {
                      activeElement.style.top = e.target.value + MainUnit;
                    }
                  }}
                  type="number"
                />
              </div>
              <div data="Center" className="single-div input-boxes"></div>
              <div data="space-around" className="single-div input-boxes">
                <input
                  onFocus={(e) => {
                    inputValueController(e, activeElement.style.bottom);
                  }}
                  onChange={(e) => {
                    if (activeElement) {
                      activeElement.style.bottom = e.target.value + MainUnit;
                    }
                  }}
                  type="number"
                />
              </div>
            </div>
            <div data="Flex-End" className="single-div input-boxes">
              <input
                onFocus={(e) => {
                  inputValueController(e, activeElement.style.right);
                }}
                onChange={(e) => {
                  if (activeElement) {
                    activeElement.style.right = e.target.value + MainUnit;
                  }
                }}
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => onTggPropControl(!TggPropControl)}
        style={{ top: "-35px", borderRadius: "10px 0 0px 0px" }}
        className="ButtonToggle"
      >
        Tt
      </div>
    </div>
  );
};
