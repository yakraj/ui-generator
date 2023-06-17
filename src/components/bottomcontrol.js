import React, { useContext } from "react";
import "./bottomcontrol.css";
import { MainContext } from "../context/main.context";

import InputColor from "react-input-color";
export const BottomControl = () => {
  const { activeElement, MainUnit } = useContext(MainContext);
  const handleChange = (element, color) => {
    if (element) {
      element.style.borderColor = color.hex;
    }
  };

  const BorderSetter = (data) => {
    let hasBorder = activeElement.style.border;

    if (data === "all" && hasBorder) {
      activeElement.style.removeProperty("border");
      return;
    }
    activeElement.style.removeProperty("border");
    activeElement.style.removeProperty("borderLeft");
    activeElement.style.removeProperty("borderRight");
    activeElement.style.removeProperty("borderTop");
    activeElement.style.removeProperty("borderBottom");

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

  return (
    <div className="bottombarcontrols">
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
          <p className="al-left">Custon Class</p>
          <input
            className="custom-input"
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
      </div>
      <div className="gui-controllers">
        <p>Justyfy-Content</p>
        <div className="justifyControl">
          <div
            onClick={() => (activeElement.style.justifyContent = "flex-start")}
            data="Flex-start"
            className="single-div"
          ></div>
          <div className="centercolumn">
            <div
              onClick={() =>
                (activeElement.style.justifyContent = "space-between")
              }
              data="space-between"
              className="single-div"
            />
            <div
              onClick={() => (activeElement.style.justifyContent = "center")}
              data="Center"
              className="single-div"
            />
            <div
              onClick={() =>
                (activeElement.style.justifyContent = "space-around")
              }
              data="space-around"
              className="single-div"
            />
          </div>
          <div
            onClick={() => (activeElement.style.justifyContent = "flex-end")}
            data="Flex-End"
            className="single-div"
          />
        </div>
      </div>

      <div className="gui-controllers">
        <p>Align-Items</p>
        <div className="justifyControl">
          <div
            onClick={() => (activeElement.style.alignItems = "self-start")}
            data="Self Start"
            className="single-div"
          ></div>
          <div className="centercolumn">
            <div
              onClick={() => (activeElement.style.alignItems = "flex-start")}
              data="Flex-start"
              className="single-div"
            />
            <div
              onClick={() => (activeElement.style.alignItems = "center")}
              data="Center"
              className="single-div"
            />
            <div
              onClick={() => (activeElement.style.alignItems = "flex-end")}
              data="Flex-End"
              className="single-div"
            />
          </div>
          <div
            data="Self End"
            onClick={() => (activeElement.style.alignItems = "self-end")}
            className="single-div"
          />
        </div>
      </div>
      <div className="gui-controllers">
        <p>direction</p>
        <div className="justifyControl">
          <div
            onClick={() => (activeElement.style.flexDirection = "row")}
            data="row"
            className="single-div"
          ></div>
          <div className="centercolumn">
            <div
              data="column"
              onClick={() => (activeElement.style.flexDirection = "column")}
              className="single-div"
            />
            <div
              data="Auto"
              onClick={() => (activeElement.style.flexDirection = "auto")}
              className="single-div"
            />
            <div
              data="column Reverse"
              onClick={() =>
                (activeElement.style.flexDirection = "column-reverse")
              }
              className="single-div"
            />
          </div>
          <div
            data="row Reverse"
            onClick={() => (activeElement.style.flexDirection = "row-reverse")}
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
          onChange={(e) =>
            (activeElement.style.borderWidth = e.target.value + MainUnit)
          }
          type="number"
          placeholder="width"
        />
        <InputColor
          style={{ width: "90%" }}
          initialValue="#5e72e4"
          onChange={(e) => handleChange(activeElement, e)}
          placement="right"
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
          onFocus={(e) => e.target.select()}
          onChange={(e) =>
            (activeElement.style.borderRadius = e.target.value + MainUnit)
          }
          type="number"
        />
      </div>
    </div>
  );
};
