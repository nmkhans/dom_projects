/**
 * Date:  21-03-2025
 * Author: Moin Khan
 * Description: color picker application with various interactivity.
 *
 */

//Globals
let toastContainer = null;

// onload handler
window.onload = () => {
  main();
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
}

// event handlers

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
  if (color.length !== 6) return false;

  return /^[0-9A-Fa-f]{6}$/i.test(color);
}
