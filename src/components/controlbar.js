import React, { useEffect, useState, useRef } from "react";
import "./controlbar.css";
export const Controlbar = ({ Element, Properties }) => {
  const [activeJustify, onactiveJustify] = useState();
  const [activeAlign, onactiveAlign] = useState();
  const [ImageType, onImageType] = useState("bg");
  const [imageURL, setImageURL] = useState("");
  const [InnerHTML, onInnerHTML] = useState("");

  const AppendHTML = () => {
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = InnerHTML;
    var elements = tempDiv.getElementsByTagName("*");
    if (Element && elements) {
      for (let i = 0; i < elements.length; i++) {
        Element.appendChild(elements[i].cloneNode(true));
      }
      onInnerHTML("");
    }
  };
  const FlexControlBox = "flex-rec mar-5 borr-5 box-shadow";
  const padding = "paddingmargin mar-5 borr-5 box-shadow";
  const ImageURLHandler = (e) => {
    ImageType === "bg"
      ? (Element.style.backgroundImage = `url(${e.target.value})`)
      : Element.setAttribute("src", e.target.value);
  };

  // class messgae creator
  const Message = useRef();
  useEffect(() => {
    if (Element && Element.classList.length > 0) {
      return;
    } else {
      Message.current.style.opacity = 1;
      setTimeout(() => {
        Message.current.style.opacity = 0;
      }, 1500);
    }
  }, [Element]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (ev) => {
      setImageURL(ImageType);
      switch (ImageType) {
        case "bg":
          Element.style.backgroundImage = `url(${ev.target.result})`;
          event.target.value = "";
          break;
        case "img":
          Element.setAttribute("src", ev.target.result);
          event.target.value = "";
          break;
        default:
          var backgoundIMG = document.createElement("img");
          backgoundIMG.style.position = "absolute";
          backgoundIMG.style.height = "100%";
          backgoundIMG.style.width = "100%";
          backgoundIMG.style.opacity = "0.4";
          backgoundIMG.style.top = "0";
          backgoundIMG.style.left = "0";
          backgoundIMG.style.pointerEvents = "none";
          backgoundIMG.setAttribute("src", ev.target.result);
          backgoundIMG.setAttribute("id", "reference-image");
          if (Element) {
            Element.style.position = "relative";
            Element.appendChild(backgoundIMG);
            event.target.value = "";
          } else {
            window.alert("Parent Node Not found");
            event.target.value = "";
          }
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <div ref={Message} className="class-message">
        This Element Doesn't have any class
      </div>
      <div ref={Properties} className="user-panel">
        <div className="properties-items">
          <div className="data-contents">
            <div className="neo-cont">
              {/* this is for custom class */}
              <div className="flex-col ">
                <p className="a-l">Custon Class</p>
                <input
                  className="custom-input"
                  onFocus={(e) => e.target.select()}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      Element.classList.add(e.target.value);
                    }
                  }}
                  type="text"
                  placeholder="custom class"
                />
              </div>

              {/* this is for display and flex-direction */}
              <div className="flex">
                <div className="wid-50">
                  <p className="al-left">Display</p>
                  <select
                    onFocus={(e) => (e.target.value = "")}
                    id="displayDropdown"
                    onChange={(e) =>
                      Element ? (Element.style.display = e.target.value) : null
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
                    <option value="table-column-group">
                      table-column-group
                    </option>
                    <option value="table-footer-group">
                      table-footer-group
                    </option>
                    <option value="table-header-group">
                      table-header-group
                    </option>
                    <option value="table-row">table-row</option>
                    <option value="table-row-group">table-row-group</option>
                    <option value="none">none</option>
                    <option value="initial">initial</option>
                    <option value="inherit">inherit</option>
                  </select>
                </div>
                <div className="wid-50">
                  <p className="al-left">Flex Direction</p>
                  <select
                    onFocus={(e) => (e.target.value = "")}
                    id="displayDropdown"
                    onChange={(e) =>
                      Element
                        ? (Element.style.flexDirection = e.target.value)
                        : null
                    }
                  >
                    <option value="row">row</option>
                    <option value="row-reverse">row-reverse</option>
                    <option value="column">column</option>
                    <option value="column-reverse">column-reverse</option>
                  </select>
                </div>
              </div>
            </div>
            {/* this is for flex adjustment */}
            <div className="neo-cont">
              <div className="flex">
                <div
                  onClick={() => (Element.style.justifyContent = "flex-start")}
                  className={FlexControlBox}
                >
                  <img
                    width={40}
                    height={40}
                    alt="jus-start"
                    src={require("../assect/jus-start.svg").default}
                  />
                </div>
                <div
                  onClick={() => (Element.style.justifyContent = "center")}
                  className={FlexControlBox}
                >
                  <img
                    width={40}
                    height={40}
                    alt="jus-start"
                    src={require("../assect/jus-center.svg").default}
                  />
                </div>
                <div
                  onClick={() => (Element.style.justifyContent = "flex-end")}
                  className={FlexControlBox}
                >
                  <img
                    width={40}
                    height={40}
                    alt="jus-start"
                    src={require("../assect/jus-end.svg").default}
                  />
                </div>
                <div
                  onClick={() =>
                    (Element.style.justifyContent = "space-between")
                  }
                  className={FlexControlBox}
                >
                  <img
                    width={40}
                    height={40}
                    alt="jus-start"
                    src={require("../assect/space-between.svg").default}
                  />
                </div>
                <div
                  onClick={() =>
                    (Element.style.justifyContent = "space-around")
                  }
                  className={FlexControlBox}
                >
                  <img
                    width={40}
                    height={40}
                    alt="jus-start"
                    src={require("../assect/space-around.svg").default}
                  />
                </div>
                <div
                  onClick={() =>
                    (Element.style.justifyContent = "space-evenly")
                  }
                  className={FlexControlBox}
                >
                  <img
                    width={40}
                    height={40}
                    alt="jus-start"
                    src={require("../assect/space-evenly.svg").default}
                  />
                </div>
              </div>
              <div className="flex">
                <div
                  onClick={() => (Element.style.alignItems = "flex-start")}
                  className={FlexControlBox}
                ></div>
                <div
                  onClick={() => (Element.style.alignItems = "center")}
                  className={FlexControlBox}
                ></div>
                <div
                  onClick={() => (Element.style.alignItems = "flex-end")}
                  className={FlexControlBox}
                ></div>
                <div
                  onClick={() => (Element.style.alignItems = "streach")}
                  className={FlexControlBox}
                ></div>
                <div className={FlexControlBox}></div>
              </div>
            </div>
            <div className="neo-cont">
              {/* this is for border radius and fill */}
              <div className="flex">
                <div className="wid-50">
                  <p>Radius</p>
                  <input
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      (Element.style.borderRadius = e.target.value)
                    }
                    type="text"
                  />
                </div>
                <div className="wid-50 colorpicker">
                  <p>fill BG</p>
                  <input
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      (Element.style.background = e.target.value)
                    }
                    type="color"
                  />
                </div>
              </div>

              {/* this is for height and width */}
              <div className="flex">
                <div className="wid-50">
                  <p>Height</p>
                  <input
                    onFocus={(e) => {
                      e.target.value = Element && Element.style.height;
                      e.target.readOnly = false;
                      e.target.select();
                    }}
                    onBlur={(e) => {
                      e.target.setAttribute("readOnly", "readOnly");
                    }}
                    onChange={(e) => {
                      if (Element) {
                        Element.style.height = e.target.value;
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        Element.style.height = e.target.value;
                      }
                    }}
                    type="text"
                    placeholder="Height"
                  />
                </div>
                <div className="wid-50">
                  <p>Width</p>
                  <input
                    onFocus={(e) => {
                      e.target.value = Element && Element.style.width;
                      e.target.readOnly = false;
                      e.target.select();
                    }}
                    onChange={(e) =>
                      Element ? (Element.style.width = e.target.value) : null
                    }
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        Element.style.width = e.target.value;
                      }
                    }}
                    type="text"
                    placeholder="Width"
                  />
                </div>
              </div>
            </div>
            {/* this is for overflow */}
            <div className=" neo-cont">
              <p className="al-left">Overflow</p>
              <div className="flex">
                <div className="wid-30">
                  <p>All</p>
                  <select
                    onFocus={(e) => (e.target.value = "")}
                    id="displayDropdown"
                    onChange={(e) =>
                      Element ? (Element.style.overflow = e.target.value) : null
                    }
                  >
                    <option value="none">None</option>
                    <option value="scroll">scroll</option>
                    <option value="hidden">hidden</option>
                    <option value="overlay">overlay</option>
                    <option value="stretch">stretch</option>
                  </select>
                </div>
                <div className="wid-30">
                  <p>X</p>
                  <select
                    onFocus={(e) => (e.target.value = "")}
                    id="displayDropdown"
                    onChange={(e) =>
                      Element
                        ? (Element.style.overflowX = e.target.value)
                        : null
                    }
                  >
                    <option value="none">None</option>
                    <option value="scroll">scroll</option>
                    <option value="hidden">hidden</option>
                    <option value="overlay">overlay</option>
                    <option value="stretch">stretch</option>
                  </select>
                </div>
                <div className="wid-30">
                  <p>Y</p>
                  <select
                    onFocus={(e) => (e.target.value = "")}
                    id="displayDropdown"
                    onChange={(e) =>
                      Element
                        ? (Element.style.overflowY = e.target.value)
                        : null
                    }
                  >
                    <option value="none">None</option>
                    <option value="scroll">scroll</option>
                    <option value="hidden">hidden</option>
                    <option value="overlay">overlay</option>
                    <option value="stretch">stretch</option>
                  </select>
                </div>
              </div>
            </div>
            {/* this is for image */}
            <div className="wid-100 neo-cont">
              <div className="flex wid-100-around">
                <h2
                  style={{
                    backgroundColor: ImageType === "bg" ? "aqua" : "grey",
                  }}
                  onClick={() => {
                    onImageType("bg");
                  }}
                >
                  BG
                </h2>
                <h2
                  style={{
                    backgroundColor: ImageType === "img" ? "aqua" : "grey",
                  }}
                  onClick={() => {
                    onImageType("img");
                  }}
                >
                  IMG
                </h2>
                <h2
                  style={{
                    backgroundColor: ImageType === "ref" ? "aqua" : "grey",
                  }}
                  onClick={() => {
                    onImageType("ref");
                  }}
                >
                  REF
                </h2>
              </div>
              <div className="flex image-content">
                <input
                  onChange={ImageURLHandler}
                  onFocus={(e) => e.target.select()}
                  type="url"
                  placeholder="url"
                  style={{ display: ImageType === "ref" ? "none" : "block" }}
                />
                <div
                  style={{
                    width: ImageType === "ref" ? "100%" : "25%",
                    transitionDuration: "0.2s",
                  }}
                  className="upload-image borr-10"
                >
                  <input onChange={handleFileInputChange} type="file" />
                </div>
              </div>
            </div>
            {/* this is for padding and margin */}
            <div className="flex neo-cont">
              <div className="wid-50 borR">
                <p>Padding</p>
                <div className="wid-100-center">
                  <div className={padding}>
                    <input
                      onFocus={(e) => e.target.select()}
                      onChange={(e) =>
                        (Element.style.paddingTop = e.target.value)
                      }
                      type="text"
                    />
                  </div>
                </div>
                <div className="wid-100-center">
                  <div className="wid-100-center">
                    <div className={padding}>
                      <input
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          (Element.style.paddingLeft = e.target.value)
                        }
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="wid-100-center">
                    <div className={padding}>
                      <input
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          (Element.style.padding = e.target.value)
                        }
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="wid-100-center">
                    <div className={padding}>
                      <input
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          (Element.style.paddingRight = e.target.value)
                        }
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="wid-100-center">
                  <div className="wid-100-center">
                    <div className={padding}>
                      <input
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          (Element.style.paddingBottom = e.target.value)
                        }
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="wid-50">
                <p>Margin</p>
                <div className="wid-100-center">
                  <div className={padding}>
                    <input
                      onFocus={(e) => e.target.select()}
                      onChange={(e) =>
                        (Element.style.marginTop = e.target.value)
                      }
                      type="text"
                    />
                  </div>
                </div>
                <div className="wid-100-center">
                  <div className={padding}>
                    <input
                      onFocus={(e) => e.target.select()}
                      onChange={(e) =>
                        (Element.style.marginLeft = e.target.value)
                      }
                      type="text"
                    />
                  </div>
                  <div className={padding}>
                    <input
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => (Element.style.margin = e.target.value)}
                      type="text"
                    />
                  </div>

                  <div className={padding}>
                    <input
                      onFocus={(e) => e.target.select()}
                      onChange={(e) =>
                        (Element.style.marginRight = e.target.value)
                      }
                      type="text"
                    />
                  </div>
                </div>

                <div className="wid-100-center">
                  <div className={padding}>
                    <input
                      onFocus={(e) => e.target.select()}
                      onChange={(e) =>
                        (Element.style.marginBottom = e.target.value)
                      }
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* this is for position and transform */}

            <div className="flex neo-cont">
              <div className="wid-50 borR">
                <p>position</p>
                <select
                  onFocus={(e) => (e.target.value = "")}
                  id="displayDropdown"
                  onChange={(e) =>
                    Element ? (Element.style.position = e.target.value) : null
                  }
                >
                  <option value="none">None</option>
                  <option value="absolute">Absolute</option>
                  <option value="relative">Relative</option>
                  <option value="fixed">Fixed</option>
                  <option value="sticky">sticky</option>
                  <option value="static">Static</option>
                </select>
              </div>
              <div className="wid-50">
                <p>Transform</p>
                <div className="wid-100-center">
                  <div className={padding}>
                    <input
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => (Element.style.top = e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
                <div className="wid-100-center">
                  <div className={padding}>
                    <input
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => (Element.style.left = e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className={FlexControlBox}></div>
                  <div className={padding}>
                    <input
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => (Element.style.bottom = e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
                <div className="wid-100-center">
                  <div className={padding}>
                    <input
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => (Element.style.right = e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* this is a new container, which will be used for Text control */}

            <div className="text-edit-cont neo-cont">
              <div className="text-section">
                <p>Text</p>
                <textarea
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    Element ? (Element.innerHTML = e.target.value) : null
                  }
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
                      Element
                        ? (Element.style.fontWeight = e.target.value)
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
                      Element
                        ? (Element.style.fontSize = e.target.value + "rem")
                        : null
                    }
                    type="number"
                  />
                </div>
              </div>
              {/* this is for font color and font family */}
              <div className="flex">
                <div className="wid-50 colorpicker">
                  <p>Color</p>
                  <input
                    onChange={(e) =>
                      Element ? (Element.style.color = e.target.value) : null
                    }
                    type="color"
                  />
                </div>
                <div className="wid-50">
                  <p>Fonts</p>
                  <select
                    onChange={(e) =>
                      Element
                        ? (Element.style.fontFamily = e.target.value)
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
                      Element
                        ? (Element.style.textTransform = e.target.value)
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
                      Element
                        ? (Element.style.letterSpacing = e.target.value + "px")
                        : null
                    }
                    defaultValue={1}
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="neo-cont">
              <p>HTML Code</p>
              <textarea
                value={InnerHTML}
                onFocus={(e) => e.target.select()}
                onChange={(e) => onInnerHTML(e.target.value)}
                placeholder="Paste html here to append."
                type="text"
              />
              {Element && (
                <button onClick={() => AppendHTML()} className="append-button">
                  Append
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
