/**
 * Date - 26/03/2025
 * Author: Moin Khan
 * Description: counter app
 */

//? globals
let count = 0;

// onload handler
window.onload = function () {
  main();
};

// main function
function main() {
  const counter = document.getElementById("counter-display");
  const incrementInput = document.getElementById("increment-input");
  const incrementBtn = document.getElementById("increment-btn");
  const decrementInput = document.getElementById("decrement-input");
  const decrementBtn = document.getElementById("decrement-btn");

  displayCount(counter);

  incrementBtn.addEventListener("click", () => {
    const increment = +incrementInput.value;
    count += increment;

    displayCount(counter);
  });

  decrementBtn.addEventListener("click", () => {
    const decrement = +decrementInput.value;
    count -= decrement;

    displayCount(counter);
  });

  incrementInput.addEventListener("keyup", (e) => {
    if (parseInt(e.target.value) > 100) {
      e.target.value = 100;
    }

    if (parseInt(e.target.value) <= 0) {
      e.target.value = 1;
    }
  });

  decrementInput.addEventListener("keyup", (e) => {
    if (parseInt(e.target.value) > 100) {
      e.target.value = 100;
    }

    if (parseInt(e.target.value) <= 0) {
      e.target.value = 1;
    }
  });
}

function displayCount(counter) {
  if (count < 0) {
    count = 0;
  }

  let finalCount = null;

  if (count < 10) {
    finalCount = `0${count}`;
  } else {
    finalCount = count;
  }

  counter.innerText = finalCount;
}
