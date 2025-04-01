/**
 * Date - 29/03/2025
 * Author: Moin Khan
 * Description: Multiple converter app
 */

/**
 * Requirements:
 * - multiple category of converted. e.g. area, height, weight
 * - each category can have multiple units. formula of varients = n * (n-1)
 * swap selected options if selected on both side
 * display the formula
 *
 */

// globals

const converter = {
  area: {
    name: "Area",
    units: {
      squareKm: "Square Kilometer",
      squareM: "Square Meter",
      squareMile: "Square Mile",
      squareFoot: "Square Foot",
    },
    varients: {
      "squareKm:squareM": {
        formula: "multiply the area value by 1000000",
        calculation: function (n) {
          return n * 1000000;
        },
      },
      "squareKm:squareMile": {
        formula: "divide the area value by 2.59",
        calculation: function (n) {
          return n / 2.59;
        },
      },
      "squareKm:squareFoot": {
        formula: "multiply the area value by 10760000",
        calculation: function (n) {
          return n * 10760000;
        },
      },
      "squareM:squareKm": {
        formula: "divide the value by 1e+6",
        calculation: function (n) {
          return n / new Number("1e+6");
        },
      },
      "squareM:squareMile": {
        formula: "divide the area value by 2.59e+6",
        calculation: function (n) {
          return n / new Number("2.59e+6");
        },
      },
      "squareM:squareFoot": {
        formula: "multiply the area value by 10.764",
        calculation: function (n) {
          return n * 10.764;
        },
      },
      "squareMile:squareKm": {
        formula: "multiply the area value by 2.59",
        calculation: function (n) {
          return n * 2.59;
        },
      },
      "squareMile:squareM": {
        formula: "multiplu the area value by 2.59e+6",
        calculation: function (n) {
          return n * new Number("2.59e+6");
        },
      },
      "squareMile:squareFoot": {
        formula: "multiply the area value by 2.788e+7",
        calculation: function (n) {
          return n * new Number("2.788e+7");
        },
      },
      "squareFoot:squareKm": {
        formula: "divide the area value by 1.076e+7",
        calculation: function (n) {
          return n / new Number("1.076e+7");
        },
      },
      "squareFoot:squareM": {
        formula: "divide the area value by 10.764",
        calculation: function (n) {
          return n / 10.764;
        },
      },
      "squareFoot:squareMile": {
        formula: " divide the area value by 2.788e+7",
        calculation: function (n) {
          return n / new Number("2.788e+7");
        },
      },
    },
  },
  mass: {
    name: "Mass",
    units: {
      tonne: "Tonne",
      kilogram: "Kilogram",
      gram: "Gram",
      miligram: "Miligram",
    },
  },
  length: {
    name: "Length",
    units: {
      kilometer: "Kilometer",
      meter: "Meter",
      centimeter: "Centimeter",
      milimeter: "Milimeter",
    },
  },
  time: {
    name: "Time",
    units: {
      second: "Second",
      minute: "Minute",
      hour: "Hour",
      day: "Day",
    },
  },
};

let lastLeftSelectedValue = "";
let lastRightSelectedValue = "";

// onload handler
window.onload = function () {
  main();
};

// main function
function main() {
  const categorySelect = document.getElementById("category-select");
  const leftSelect = document.getElementById("left-select");
  const rightSelect = document.getElementById("right-select");
  const leftInput = document.getElementById("left-input");
  const rightInput = document.getElementById("right-input");

  const converterKeys = Object.keys(converter).sort();
  converterKeys.forEach((item) => {
    addOption(categorySelect, {
      value: item,
      text: converter[item].name,
    });
  });

  handleCategoryChange(categorySelect, leftSelect, rightSelect);

  categorySelect.addEventListener("change", () =>
    handleCategoryChange(categorySelect, leftSelect, rightSelect)
  );

  leftSelect.addEventListener("change", (e) => {
    if (e.target.value === rightSelect.value) {
      const options = rightSelect.getElementsByTagName("option");
      for (let option of options) {
        if (lastLeftSelectedValue === option.value) {
          option.selected = "selected";
          lastRightSelectedValue = option.value;
          break;
        }
      }

      lastLeftSelectedValue = e.target.value;
    }

    calculateValue(categorySelect, leftSelect, rightSelect);
  });

  rightSelect.addEventListener("change", (e) => {
    if (e.target.value === leftSelect.value) {
      const options = leftSelect.getElementsByTagName("option");
      for (let option of options) {
        if (lastRightSelectedValue === option.value) {
          option.selected = "selected";
          lastLeftSelectedValue = option.value;
          break;
        }
      }

      lastRightSelectedValue = e.target.value;
    }

    calculateValue(categorySelect, leftSelect, rightSelect);
  });

  leftInput.addEventListener("keyup", function (e) {
    if (e.target.value && !isNaN(e.target.value)) {
      const categoryName = categorySelect.value;
      const varients = converter[categoryName].varients;
      if (varients !== undefined) {
        const varientKey = `${leftSelect.value}:${rightSelect.value}`;
        const varient = varients[varientKey];
        leftInput.value = Number(e.target.value);
        rightInput.value = varient.calculation(
          Number(e.target.value)
        );
      }
    } else {
      rightInput.value = "";
    }
  });

  rightInput.addEventListener("keyup", function (e) {
    if (e.target.value && !isNaN(e.target.value)) {
      const categoryName = categorySelect.value;
      const varients = converter[categoryName].varients;
      if (varients !== undefined) {
        const varientKey = `${leftSelect.value}:${rightSelect.value}`;
        const varient = varients[varientKey];
        rightInput.value = Number(e.target.value);
        leftInput.value = varient.calculation(Number(e.target.value));
      }
    } else {
      leftInput.value = "";
    }
  });
}

// event listeners
function handleCategoryChange(
  categorySelect,
  leftSelect,
  rightSelect
) {
  const categoryName = categorySelect.value;
  const units = converter[categoryName].units;
  const options = Object.keys(units);

  // handle left select

  leftSelect.innerHTML = "";
  options.forEach((item) => {
    addOption(leftSelect, {
      value: item,
      text: units[item],
    });
  });
  lastLeftSelectedValue = leftSelect.value;

  // handle right select

  rightSelect.innerHTML = "";
  options.forEach((item) => {
    addOption(rightSelect, {
      value: item,
      text: units[item],
    });
  });

  rightSelect.getElementsByTagName("option")[1].selected = "selected";
  lastRightSelectedValue = rightSelect.value;

  calculateValue(categorySelect, leftSelect, rightSelect);
}

// utils function
function addOption(parent, option) {
  const opt = document.createElement("option");
  opt.setAttribute("value", option.value);
  opt.innerText = option.text;

  parent.appendChild(opt);
}

function calculateValue(categorySelect, leftSelect, rightSelect) {
  const leftInput = document.getElementById("left-input");
  const rightInput = document.getElementById("right-input");
  const formulaText = document.getElementById("formula-text");

  const categoryName = categorySelect.value;
  const varients = converter[categoryName].varients;
  if (varients !== undefined) {
    const varientKey = `${leftSelect.value}:${rightSelect.value}`;
    const varient = varients[varientKey];
    leftInput.value = 1;
    rightInput.value = varient.calculation(1);
    formulaText.innerText = varient.formula;
  }
}
