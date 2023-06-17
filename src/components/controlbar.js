import React, { useEffect, useState, useRef } from "react";
import "./controlbar.css";
import { Layers } from "./layers";

export const Controlbar = ({ Element, setElement, Properties }) => {
  const [activeJustify, onactiveJustify] = useState();
  const [activeAlign, onactiveAlign] = useState();
  const [ImageType, onImageType] = useState("bg");
  const [imageURL, setImageURL] = useState("");
  const [InnerHTML, onInnerHTML] = useState("");
  const [opendTab, setOpendTab] = useState("prop");
  const AppendHTML = () => {
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = InnerHTML;
    if (Element) {
      var children = tempDiv.children;
      for (var i = 0; i < children.length; i++) {
        Element.appendChild(children[i]);
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
        <div className="controlbar-navigator">
          <h1 onClick={() => setOpendTab("prop")}>Properties</h1>
          <h1 onClick={() => setOpendTab("layers")}>Layers</h1>
        </div>
        {opendTab === "layers" ? (
          <Layers Element={Element} setElement={setElement} />
        ) : (
          <div className="properties-items">
            <div className="data-contents">
              {/* this is for flex adjustment */}
              <div className="neo-cont">
                {/* this is for box shadow and box sizing */}
                <div className="flex-col">
                  <p className="al-left">Shadow</p>
                  <textarea
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      Element
                        ? (Element.style.boxShadow = e.target.value)
                        : null
                    }
                    type="text"
                  />
                </div>
                {/* from here the border starts */}
                <p>Border</p>
                <div className="flex">
                  <div
                    onClick={() => (Element.style.border = "2px solid grey")}
                    className={FlexControlBox + " flex-center"}
                  >
                    <div
                      style={{
                        height: "75%",
                        width: "75%",
                        border: "3px solid pink",
                      }}
                    />
                  </div>
                  <div
                    onClick={() =>
                      (Element.style.borderLeft = "2px solid grey")
                    }
                    className={FlexControlBox + " flex-center"}
                  >
                    <div
                      style={{
                        height: "75%",
                        width: "75%",
                        borderLeft: "3px solid pink",
                      }}
                    />
                  </div>
                  <div
                    onClick={() =>
                      (Element.style.borderRight = "2px solid grey")
                    }
                    className={FlexControlBox + " flex-center"}
                  >
                    <div
                      style={{
                        height: "75%",
                        width: "75%",
                        borderRight: "3px solid pink",
                      }}
                    />
                  </div>{" "}
                  <div
                    onClick={() => (Element.style.borderTop = "2px solid grey")}
                    className={FlexControlBox + " flex-center"}
                  >
                    <div
                      style={{
                        height: "75%",
                        width: "75%",
                        borderTop: "3px solid pink",
                      }}
                    />
                  </div>
                  <div
                    onClick={() =>
                      (Element.style.borderBottom = "2px solid grey")
                    }
                    className={FlexControlBox + " flex-center"}
                  >
                    <div
                      style={{
                        height: "75%",
                        width: "75%",
                        borderBottom: "3px solid pink",
                      }}
                    />
                  </div>
                  <div
                    onClick={() => (Element.style.border = "none")}
                    className={FlexControlBox + " flex-center"}
                  >
                    <div
                      style={{
                        height: "75%",
                        width: "75%",
                        border: "none",
                      }}
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
                        Element
                          ? (Element.style.overflow = e.target.value)
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
                        onChange={(e) =>
                          (Element.style.margin = e.target.value)
                        }
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
                  <p>Z Index</p>
                  <input
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      Element ? (Element.style.zIndex = e.target.value) : null
                    }
                    type="number"
                  />
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
                        onChange={(e) =>
                          (Element.style.bottom = e.target.value)
                        }
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
                  <button
                    onClick={() => AppendHTML()}
                    className="append-button"
                  >
                    Append
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
