/**
 * Date:  21-03-2025
 * Author: Moin Khan
 * Description: color picker application with various interactivity.
 *
 */

//Globals
let toastContainer = null;

const defaultPresetColors = [
  "#ffcdd2",
  "#f8bbd0",
  "#e1bee7",
  "#ff8a80",
  "#ff80ab",
  "#ea80fc",
  "#b39ddb",
  "#9fa8da",
  "#90caf9",
  "#b388ff",
  "#8c9eff",
  "#82b1ff",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#80d8ff",
  "#84ffff",
  "#a7ffeb",
  "#c8e6c9",
  "#dcedc8",
  "#f0f4c3",
  "#b9f6ca",
  "#ccff90",
  "#ffcc80",
];

let customColors = new Array(12);

const copySound = new Audio("./copy-sound.wav");

// onload handler
window.onload = () => {
  main();

  updateColorCodeToDom(hexToDecimalColor("DDDEEE"));

  // show preset colors
  displayColorBoxes(
    document.getElementById("preset-colors"),
    defaultPresetColors
  );

  const customColorsString = localStorage.getItem("custom-color");

  // load saved custom color
  if (customColorsString) {
    customColors = JSON.parse(customColorsString);
    displayColorBoxes(
      document.getElementById("custom-colors"),
      customColors
    );
  }
};

// main function
function main() {
  const generateRandomColorBtn = document.getElementById(
    "generate-random-color"
  );
  const hexInput = document.getElementById("input-hex");
  const colorSliderRed = document.getElementById("color-slider-red");
  const colorSliderGreen = document.getElementById(
    "color-slider-green"
  );
  const colorSliderBlue = document.getElementById(
    "color-slider-blue"
  );
  const copyToClipBoardBtn = document.getElementById(
    "copy-to-clipboard"
  );
  const presetColorParent = document.getElementById("preset-colors");
  const customColorParent = document.getElementById("custom-colors");
  const saveToCustomBtn = document.getElementById("save-to-custom");
  const fileInput = document.getElementById("bg-file-input");
  const fileInputBtn = document.getElementById("bg-file-input-btn");
  const fileDeleteBtn = document.getElementById("bg-file-delete-btn");
  const bgPreview = document.getElementById("background-preview");
  const bgController = document.getElementById("bg-controller");
  const bgControllerLead = document.getElementById(
    "bg-controller-lead"
  );

  generateRandomColorBtn.addEventListener(
    "click",
    handleGenerateRandomColorBtn
  );

  hexInput.addEventListener("keyup", handleHexInputUpdate);

  colorSliderRed.addEventListener(
    "change",
    handleColorSliderChange(
      colorSliderRed,
      colorSliderGreen,
      colorSliderBlue
    )
  );

  colorSliderGreen.addEventListener(
    "change",
    handleColorSliderChange(
      colorSliderRed,
      colorSliderGreen,
      colorSliderBlue
    )
  );

  colorSliderBlue.addEventListener(
    "change",
    handleColorSliderChange(
      colorSliderRed,
      colorSliderGreen,
      colorSliderBlue
    )
  );

  copyToClipBoardBtn.addEventListener("click", handleCopyToClipBoard);

  presetColorParent.addEventListener(
    "click",
    handlePresetAndCustomColorClick
  );

  saveToCustomBtn.addEventListener(
    "click",
    handleSaveToCustom(hexInput, customColorParent)
  );

  customColorParent.addEventListener(
    "click",
    handlePresetAndCustomColorClick
  );

  fileInputBtn.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener(
    "change",
    handleFileChange(
      bgPreview,
      fileDeleteBtn,
      bgController,
      bgControllerLead
    )
  );

  fileDeleteBtn.addEventListener(
    "click",
    handleFileDeleteBtnClick(
      bgPreview,
      fileDeleteBtn,
      fileInput,
      bgController,
      bgControllerLead
    )
  );

  document
    .getElementById("bg-size")
    .addEventListener("change", handleChangeBackgroundPreferances);
  document
    .getElementById("bg-position")
    .addEventListener("change", handleChangeBackgroundPreferances);
  document
    .getElementById("bg-repeat")
    .addEventListener("change", handleChangeBackgroundPreferances);
  document
    .getElementById("bg-attachment")
    .addEventListener("change", handleChangeBackgroundPreferances);
}

//? event handlers

function handleGenerateRandomColorBtn() {
  const color = generateColorDecimal();

  updateColorCodeToDom(color);
}

function handleHexInputUpdate(e) {
  const hexColor = e.target.value;

  if (hexColor.trim()) {
    this.value = hexColor.toUpperCase();

    if (validHexCode(hexColor)) {
      const decimalColorCode = hexToDecimalColor(hexColor);
      updateColorCodeToDom(decimalColorCode);
    }
  }
}

function handleColorSliderChange(
  colorSliderRed,
  colorSliderGreen,
  colorSliderBlue
) {
  return function () {
    const color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value),
    };

    updateColorCodeToDom(color);
  };
}

function handleCopyToClipBoard() {
  const colorModeRadio = document.getElementsByName("color-mode");
  const colorMode = getCheckedValue(colorModeRadio);

  if (colorMode === null) {
    throw new Error("Invalid radio input!");
  }

  if (toastContainer !== null) {
    toastContainer.remove();
    toastContainer = null;
  }

  if (colorMode === "hex") {
    const hexColor = document.getElementById("input-hex").value;

    if (hexColor.trim() && validHexCode(hexColor)) {
      navigator.clipboard.writeText(`#${hexColor}`);
      generateToastMessage(`#${hexColor} copied.`);
    } else {
      alert("Invalid hex color");
      return;
    }
  } else {
    const rgbColor = document.getElementById("input-rgb").value;

    if (rgbColor.trim()) {
      navigator.clipboard.writeText(rgbColor);
      generateToastMessage(`${rgbColor} copied.`);
    } else {
      alert("Invalid rgb color");
      return;
    }
  }
}

function handlePresetAndCustomColorClick(e) {
  const element = e.target;
  if (element.className === "color-box") {
    const hexColor = element.getAttribute("data-color");
    const decimalColor = hexToDecimalColor(hexColor.substring(1));

    navigator.clipboard.writeText(hexColor.toUpperCase());
    copySound.volume = 0.2;
    copySound.play();

    if (toastContainer !== null) {
      toastContainer.remove();
      toastContainer = null;
    }

    updateColorCodeToDom(decimalColor);
    generateToastMessage(`${hexColor.toUpperCase()} copied.`);
  }
}

function handleSaveToCustom(hexInput, customColorParent) {
  return function () {
    const hexColor = `#${hexInput.value}`;

    if (customColors.includes(hexColor)) {
      alert("Color already exist in list");
      return;
    }
    customColors.unshift(hexColor);

    if (customColors.length > 12) {
      customColors = customColors.slice(0, 12);
    }

    localStorage.setItem(
      "custom-color",
      JSON.stringify(customColors)
    );

    customColorParent.innerHTML = "";
    displayColorBoxes(customColorParent, customColors);
  };
}

function handleChangeBackgroundPreferances() {
  document.body.style.backgroundSize =
    document.getElementById("bg-size").value;
  document.body.style.backgroundRepeat =
    document.getElementById("bg-repeat").value;
  document.body.style.backgroundPosition =
    document.getElementById("bg-position").value;
  document.body.style.backgroundAttachment =
    document.getElementById("bg-attachment").value;
}

function handleFileChange(
  bgPreview,
  fileDeleteBtn,
  bgController,
  bgControllerLead
) {
  return function (e) {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);

    bgPreview.style.background = `url(${imgUrl})`;
    document.body.style.background = `url(${imgUrl})`;
    fileDeleteBtn.style.display = "inline-block";
    bgController.style.display = "block";
    bgControllerLead.style.display = "none";
  };
}

function handleFileDeleteBtnClick(
  bgPreview,
  fileDeleteBtn,
  fileInput,
  bgController,
  bgControllerLead
) {
  return function () {
    bgPreview.style.background = `#DDDEEE`;
    document.body.style.background = `#DDDEEE`;
    fileDeleteBtn.style.display = "none";
    fileInput.value = null;
    bgController.style.display = "none";
    bgControllerLead.style.display = "block";
  };
}

// DOM function

/**
 * generate a toast message and display in the dom using given message
 * @param {string} msg
 */
function generateToastMessage(msg) {
  toastContainer = document.createElement("div");
  toastContainer.innerText = msg;
  toastContainer.className = "toast-message toast-message-slide-in";

  setTimeout(() => {
    toastContainer.classList.remove("toast-message-slide-in");
    toastContainer.classList.add("toast-message-slide-out");

    toastContainer.addEventListener("animationend", function () {
      toastContainer.remove();
      toastContainer = null;
    });
  }, 5000);

  toastContainer.addEventListener("click", () => {
    toastContainer.classList.remove("toast-message-slide-in");
    toastContainer.classList.add("toast-message-slide-out");

    toastContainer.addEventListener("animationend", function () {
      toastContainer.remove();
      toastContainer = null;
    });
  });

  document.body.appendChild(toastContainer);
}

/**
 * find the checked element from a list of radio buttons
 * @param {array} nodes
 * @returns {string | null}
 */
function getCheckedValue(nodes) {
  let checkedItem = null;
  for (let item of nodes) {
    if (item.checked) {
      checkedItem = item.value;
      break;
    }
  }

  return checkedItem;
}

/**
 * update dom element with calculated color values
 * @param {object} color
 */
function updateColorCodeToDom(color) {
  const hexColor = generateHexColor(color);
  const rgbColor = generateRGBColor(color);

  document.getElementById("color-display").style.backgroundColor =
    hexColor;
  document.getElementById("input-hex").value = hexColor.substring(1);
  document.getElementById("input-rgb").value = rgbColor;
  document.getElementById("color-slider-red").value = color.red;
  document.getElementById("color-slider-red-label").innerText =
    color.red;
  document.getElementById("color-slider-green").value = color.green;
  document.getElementById("color-slider-green-label").innerText =
    color.green;
  document.getElementById("color-slider-blue").value = color.blue;
  document.getElementById("color-slider-blue-label").innerText =
    color.blue;
}

/**
 * create a div with provided color as background color.
 * @param {string} color
 * @returns {object}
 */
function generateColorBox(color) {
  const div = document.createElement("div");
  div.className = "color-box";
  div.style.backgroundColor = color;
  div.setAttribute("data-color", color);

  return div;
}

/**
 * this function will generate a color box and append it to the parent element
 * @param {object} parent
 * @param {array} colors
 */
function displayColorBoxes(parent, colors) {
  colors.forEach((color) => {
    if (validHexCode(color?.slice(1))) {
      const colorBox = generateColorBox(color);
      parent.appendChild(colorBox);
    }
  });
}

// utils function

/**
 * generate and return a object of three random decimal color.
 * @returns {object}
 */
function generateColorDecimal() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return {
    red,
    green,
    blue,
  };
}

/**
 * Take a color object of three values and generate a hex color and return as string.
 * @param {object} color
 * @returns {string}
 */
function generateHexColor({ red, green, blue }) {
  const getTwoCode = (value) => {
    const hex = value.toString(16);

    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`.toUpperCase();
}

/**
 * Take a color object of three values and generate a rgb color and return as string.
 * @param {object} color
 * @returns {string}
 */
function generateRGBColor({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * Take a string of hex color and converts it to decimal color and return a object
 * @param {string} hex
 * @returns {object}
 */
function hexToDecimalColor(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return {
    red,
    green,
    blue,
  };
}

/**
 * Takes a string input of hex color and return boolean value after validating the hex.
 * @param {string} color
 * @returns {boolean}
 */
function validHexCode(color) {
  if (color?.length !== 6) return false;

  return /^[0-9A-Fa-f]{6}$/i.test(color);
}

