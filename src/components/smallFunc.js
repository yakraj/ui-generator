// these functions are for zooming function

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
      if (divElement.style.backgroundImage.length > 200) {
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
      clonedElement = "";
      if (window.confirm("Do you want to extract copied data?")) {
        window.open("https://html-extractor.yakraj.com", "_blank");
      }
    })
    .catch((err) => {
      console.error("Failed to copy element: ", err);
    });
};
