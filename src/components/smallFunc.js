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

  var elements = clonedElement.getElementsByTagName("*");
  // const divElements = clonedElement.querySelectorAll("div");

  Array.from(elements).forEach((divElement) => {
    if (divElement.style.backgroundImage) {
      console.log("it has a image");
      if (divElement.style.backgroundImage.length > 200) {
        console.log("it has more length");

        divElement.style.backgroundImage = `url('local image')`;
        // divElement.style.removeProperty("background-image");
      }
    }
    if (divElement.getAttribute("src")) {
      if (divElement.getAttribute("src").length > 200) {
        divElement.setAttribute("src", "local Image");
      }
    }
  });
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
