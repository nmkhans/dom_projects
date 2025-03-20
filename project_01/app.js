/**
 * Project requirement:
 * - change the background color by generating rbg by button click
 */

// steps

// step 1 - create an onload handler
window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById("root");
  const btn = document.getElementById("change-btn");

  btn.addEventListener("click", () => {
    const bgColor = generateRGBcolor();
    root.style.backgroundColor = bgColor;
  });
}

// step 2 - random color generator function
function generateRGBcolor() {
  // rgb(0,0,0), rgb(255, 255, 255)

  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

// step 3 - collect all necessary references

// step 4 - handle the click event
