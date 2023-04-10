// these functions are for zooming function
export const ZoomIn = (PlayGround, onscalepg, scalepg) => {
  var playgroundWidth = PlayGround.current.offsetWidth;
  var playgroundHeight = PlayGround.current.offsetHeight;
  var element = PlayGround.current;
  switch (scalepg) {
    case 1:
      element.style.transform = `scale(2) translateX(${
        playgroundWidth * 0.25
      }px) translateY(${playgroundWidth * 0.1}px)`;
      onscalepg(2);
      break;
    case 2:
      element.style.transform = `scale(3) translateX(${
        playgroundWidth * 0.32
      }px) translateY(${playgroundWidth * 0.15}px)`;
      onscalepg(3);
      break;
    case 3:
      element.style.transform = `scale(4) translateX(${
        playgroundWidth * 0.4
      }px) translateY(${playgroundWidth * 0.2}px)`;
      onscalepg(4);
      break;
    default:
      return;
  }
};

export const ZoomOut = (PlayGround, onscalepg, scalepg) => {
  var playgroundWidth = PlayGround.current.offsetWidth;
  var playgroundHeight = PlayGround.current.offsetHeight;
  var element = PlayGround.current;
  switch (scalepg) {
    case 2:
      element.style.transform = "scale(1)";
      onscalepg(1);
      break;
    case 3:
      element.style.transform = `scale(2) translateX(${
        playgroundWidth * 0.25
      }px) translateY(${playgroundWidth * 0.1}px)`;
      onscalepg(2);
      break;
    case 4:
      element.style.transform = `scale(3) translateX(${
        playgroundWidth * 0.32
      }px) translateY(${playgroundWidth * 0.15}px)`;
      onscalepg(3);
      onscalepg(3);
      break;
    default:
      return;
  }
};

// this function execute click of rectangle

export const executeClick = (id, setactiveElement) => {
  var divs = document.querySelectorAll("div");

  // Loop through all div elements and remove the background style
  for (var i = 0; i < divs.length; i++) {
    divs[i].style.outline = "none";
  }

  const element = document.getElementById(id);
  element.style.outline = "5px solid green";
  setactiveElement(element);
};

// this function for copy array

export const CopyArray = () => {
  let originalElement = document.getElementById("main-container");
  let clonedElement = originalElement.cloneNode(true);
  let refImage = clonedElement.querySelectorAll("#reference-image");

  const GuideRectangle = clonedElement.querySelectorAll("#rectangle");
  // const divElements = clonedElement.querySelectorAll("div");

  // divElements.forEach((divElement) => {
  //   divElement.removeAttribute("style");
  // });

  GuideRectangle.forEach((elem) => {
    elem.remove();
  });
  refImage.forEach((elem) => {
    elem.remove();
  });

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

export const ElementCreator = (type) => {
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
      targetItem.appendChild(element);
    }
  };

  window.addEventListener("mousemove", TargetFinder);
  window.addEventListener("mouseup", MouseUpHandler);
};

// this is for create single button

export const SingleButton = ({ data }) => {
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
