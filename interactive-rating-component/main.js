const normalState = document.querySelector(".rating-state");
const thankyouState = document.querySelector(".thankyou");
const rating = document.getElementById("rating");
const buttons = document.querySelector(".buttons");
const btn = document.querySelector(".btn");

let selected = 0;

if (localStorage.getItem("rating")) {
  selected = localStorage.getItem("rating");
  normalState.style.display = "none";
  thankyouState.style.display = "flex";
  rating.textContent = selected;
}

buttons.addEventListener("click", (e) => {
  if (!e.target.classList.contains("buttons")) {
    [].forEach.call(buttons.children, (child) => {
      child.classList.remove("selected");
    });

    e.target.classList.add("selected");
    selected = Number.parseInt(e.target.textContent);
  }
});

btn.addEventListener("click", () => {
  normalState.style.display = "none";
  thankyouState.style.display = "flex";
  rating.textContent = selected;
  localStorage.setItem("rating", selected);
});
