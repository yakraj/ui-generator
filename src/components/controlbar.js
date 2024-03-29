import React, { useEffect, useState, useRef } from "react";
import { BottomControl } from "./bottomcontrol";
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
      }, 1000);
    }
  }, [Element]);

  const handleFileInputChange = (event) => {
    const [file] = event.target.files;
    let localURL;
    if (file) {
      localURL = URL.createObjectURL(file);
    }
    setImageURL(localURL);
    switch (ImageType) {
      case "bg":
        Element.style.backgroundImage = `url(${localURL})`;
        event.target.value = "";
        break;
      case "img":
        Element.setAttribute("src", localURL);
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
        backgoundIMG.setAttribute("src", localURL);
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
              {/* <BottomControl /> */}
              <div className="neo-cont">
                {/* this is for box shadow and box sizing */}
                <p className="al-left">Custom Class</p>
                <div className="flex" style={{ flexWrap: "wrap" }}>
                  {Element &&
                    Array.from(Element.classList).map((x) => {
                      return (
                        <input
                          style={{
                            width: "45%",
                            borderRadius: "5px",
                            background: "transparent",
                            color: "grey",
                            color: "#fff",
                            fontSize: "1rem",
                          }}
                          onKeyDown={(e) => {
                            if (e.keyCode === 13 && e.target.value.length > 3) {
                              e.preventDefault();
                              Element.classList.replace(
                                x,
                                e.target.value.toString()
                              );
                            }
                          }}
                          type="text"
                          onFocus={(e) => {
                            e.target.value = x;
                            e.target.readOnly = false;
                            e.target.select();
                          }}
                          onBlur={(e) => {
                            e.target.setAttribute("readOnly", "readOnly");
                            e.target.value = "";
                          }}
                          placeholder={x}
                        ></input>
                      );
                    })}
                </div>
                <textarea
                  style={{ width: "95%" }}
                  className="custom-input"
                  onFocus={(e) => e.target.select()}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 && e.target.value.length > 3) {
                      e.preventDefault();
                      Element.classList.add(e.target.value);
                      e.target.value = ""; // Clear the value of the textarea
                    }
                  }}
                  type="text"
                />
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
                <div style={{ marginBottom: 0 }} className="flex">
                  <div className="wid-50">
                    <p>max-height</p>
                    <input
                      onFocus={(e) => {
                        e.target.value = Element && Element.style.maxHeight;
                        e.target.readOnly = false;
                        e.target.select();
                      }}
                      onBlur={(e) => {
                        e.target.setAttribute("readOnly", "readOnly");
                        e.target.value = "";
                      }}
                      onChange={(e) => {
                        if (Element) {
                          Element.style.maxHeight = e.target.value;
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          Element.style.maxHeight = e.target.value;
                        }
                      }}
                      type="text"
                      placeholder={
                        Element && Element.style.maxHeight.toString()
                      }
                    />
                  </div>
                  <div className="wid-50">
                    <p>min-height</p>
                    <input
                      onFocus={(e) => {
                        e.target.value = Element && Element.style.minHeight;
                        e.target.readOnly = false;
                        e.target.select();
                      }}
                      onChange={(e) =>
                        Element
                          ? (Element.style.minHeight = e.target.value)
                          : null
                      }
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          Element.style.minHeight = e.target.value;
                        }
                      }}
                      onBlur={(e) => {
                        e.target.setAttribute("readOnly", "readOnly");
                        e.target.value = "";
                      }}
                      type="text"
                      placeholder={
                        Element && Element.style.minHeight.toString()
                      }
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 0 }} className="flex">
                  <div className="wid-50">
                    <p>max-width</p>
                    <input
                      onFocus={(e) => {
                        e.target.value = Element && Element.style.maxWidth;
                        e.target.readOnly = false;
                        e.target.select();
                      }}
                      onBlur={(e) => {
                        e.target.setAttribute("readOnly", "readOnly");
                        e.target.value = "";
                      }}
                      onChange={(e) => {
                        if (Element) {
                          Element.style.maxWidth = e.target.value;
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          Element.style.maxWidth = e.target.value;
                        }
                      }}
                      type="text"
                      placeholder={Element && Element.style.maxWidth.toString()}
                    />
                  </div>
                  <div className="wid-50">
                    <p>min-width</p>
                    <input
                      onFocus={(e) => {
                        e.target.value = Element && Element.style.minWidth;
                        e.target.readOnly = false;
                        e.target.select();
                      }}
                      onChange={(e) =>
                        Element
                          ? (Element.style.minWidth = e.target.value)
                          : null
                      }
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          Element.style.minWidth = e.target.value;
                        }
                      }}
                      onBlur={(e) => {
                        e.target.setAttribute("readOnly", "readOnly");
                        e.target.value = "";
                      }}
                      type="text"
                      placeholder={Element && Element.style.minWidth.toString()}
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

              {/* this is for position and transform */}

              <div className="neo-cont">
                <p>Custom style</p>
                <textarea
                  style={{ width: "95%" }}
                  className="custom-input"
                  onFocus={(e) => e.target.select()}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 && e.target.value.length > 3) {
                      e.preventDefault();
                      Element.style.cssText += e.target.value;
                      e.target.value = ""; // Clear the value of the textarea
                    }
                  }}
                  type="text"
                />
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
