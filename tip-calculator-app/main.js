const form = document.querySelector("form");
const fields = document.querySelectorAll(".field");
const buttons = document.querySelector(".buttons");
const reset = document.querySelector(".reset");

const customTip = document.getElementById("custom-tip");
const numPeople = document.querySelector("input[name='num-people']");
const billInput = document.querySelector("input[name='bill']");

const outTip = document.getElementById("tip");
const outTotal = document.getElementById("total");

let selectedTip = 0;
let bill = 0;
let people = 1;
let total = 0;
let tip = 0;

updateUI();

function calculate() {
  bill = Number.parseFloat(billInput.value) / people;
  tip = (selectedTip / 100) * bill;
  total = bill + tip;
  updateUI();
}

customTip.addEventListener("keypress", () => {
  setTimeout(() => {
    selectedTip = Number.parseFloat(customTip.value);
    if (billInput.value !== "") {
      calculate();
    }
  }, 10);
});

billInput.addEventListener("keypress", () => {
  setTimeout(() => {
    if (billInput.value !== "") {
      calculate();
    }
  }, 10);
});

numPeople.addEventListener("keypress", () => {
  setTimeout(() => {
    people = Number.parseInt(numPeople.value);
    if (billInput.value !== "") {
      calculate();
    }
  }, 10);
});

function updateUI() {
  if (total - Math.floor(total) === 0) {
    outTotal.textContent = `$${total}.00`;
  } else {
    outTotal.textContent = `$${total.toPrecision(3)}`;
  }

  if (tip - Math.floor(tip) === 0) {
    outTip.textContent = `$${tip}.00`;
  } else {
    outTip.textContent = `$${tip.toPrecision(3)}`;
  }
}

buttons.addEventListener("click", (e) => {
  if (e.target.nodeName.toLowerCase() === "button") {
    [].forEach.call(buttons.children, (btn) => {
      if (btn.nodeName.toLowerCase() === "button") {
        btn.style.backgroundColor = "var(--very-dark-cyan)";
      }
    });
    e.target.style.backgroundColor = "var(--strong-cyan)";
    selectedTip = Number.parseInt(e.target.textContent.replace("%", ""));
    calculate();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

customTip.addEventListener("focus", () => {
  customTip.style.borderColor = "var(--strong-cyan)";
  [].forEach.call(customTip.parentElement.children, (child) => {
    if (child.nodeName.toLowerCase() === "button") {
      child.style.backgroundColor = "var(--very-dark-cyan)";
    }
  });
});

customTip.addEventListener("blur", () => {
  customTip.style.borderColor = "var(--very-light-grayish-cyan)";
});

setInterval(() => {
  const err = numPeople.parentElement.parentElement.children[0].children[1];

  if (numPeople.value === "0") {
    err.textContent = "Can't be zero";
    err.style.display = "block";
    numPeople.parentElement.style.borderColor = "var(--error)";
  } else if (numPeople.value.includes(".")) {
    err.textContent = "Can't be decimal";
    err.style.display = "block";
    numPeople.parentElement.style.borderColor = "var(--error)";
  } else {
    err.textContent = "ERR";
    err.style.display = "none";
    numPeople.parentElement.style.borderColor =
      "var(--very-light-grayish-cyan)";
  }
}, 500);

fields.forEach((field) => {
  let input;

  [].forEach.call(field.children, (i) => {
    if (i.nodeName.toLowerCase() === "input") {
      input = i;
    }
  });

  input.addEventListener("focus", () => {
    field.style.borderColor = "var(--strong-cyan)";
  });

  input.addEventListener("blur", () => {
    field.style.borderColor = "var(--very-light-grayish-cyan)";
  });
});

document.querySelectorAll("input[type='text']").forEach((input) => {
  input.addEventListener("keypress", () => {
    setTimeout(() => {
      if (isNaN(input.value)) {
        let nums = input.value.replace(/\D/g, "");
        input.value = nums;
      }
    }, 10);
  });
});

reset.addEventListener("click", () => {
  selectedTip = 0;
  bill = 0;
  people = 1;
  total = 0;
  tip = 0;
  billInput.value = "";
  numPeople.value = "";
  customTip.value = "";
  [].forEach.call(buttons.children, (btn) => {
    if (btn.nodeName.toLowerCase() === "button") {
      btn.style.backgroundColor = "var(--very-dark-cyan)";
    }
  });
  outTip.textContent = "$0.00";
  outTotal.textContent = "$0.00";
});
