/**
 * Project requirements:
 * - Change the background color by generating a random hex color on button click
 * - Display the hex color on the disabled input field
 * - Add a button to copy the color code
 * - Add a toast message when copy button clicked
 */

// Steps:

//global 
let div = null;

// step 1 - create an onload handler
window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById("root");
  const output = document.getElementById("output");
  const changeBtn = document.getElementById("change-btn");
  const copyBtn = document.getElementById("copy-btn");

  changeBtn.addEventListener("click", () => {
    const bgColor = generateHexColor();
    root.style.backgroundColor = bgColor;
    output.value = bgColor;
  });

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(output.value);

    if(div !== null) {
      div.remove();
      div = null;
    }
    
    generateToastMessage(`${output.value} copied.`);
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

function generateToastMessage(msg) {
  div = document.createElement("div");
  div.innerText = msg;
  div.className = "toast-message toast-message-slide-in";

  div.addEventListener("click", () => {
    div.classList.remove("toast-message-slide-in");
    div.classList.add("toast-message-slide-out");

    div.addEventListener("animationend", function() {
      div.remove();
      div = null;
    });
  });

  document.body.appendChild(div);
}

// step 3 - gather necessary references

// step 4 - handle the change button click event

// step 5 - handle the copy button click event

// step 6 - activate toast message

// step 7 - create dynamic toast message

// step 8 - clear toast message
