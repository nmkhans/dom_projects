/**
 * Project requirements:
 * - change the background color by generating a random hex color on button click
 * - display the hex color on the disabled input field
 */

// Steps:

// step 1 - create an onload handler
window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById("root");
  const btn = document.getElementById("change-btn");
  const output = document.getElementById("output");

  btn.addEventListener("click", () => {
    const bgColor = generateHexColor();
    root.style.backgroundColor = bgColor;
    output.value = bgColor;
  });
}

// step 2 - random hex color generator function
function generateHexColor() {
  // #000000, #ffffff
  // 255, 255, 255 -> ff,ff,ff -> #ffffff
  // 255 -> ff

  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `#${red.toString(16)}${green.toString(16)}${blue.toString(
    16
  )}`;
}

// step 3 - gather necessary references

// step 4 - handle click event
