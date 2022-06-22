const sects = document.querySelectorAll(".sect");
const bars = document.querySelectorAll(".bar");
const tooltips = document.querySelectorAll(".tooltip");

let currentDay = new Date().getDay();

async function fetchData() {
  const res = await fetch("data.json");
  const data = await res.json();
  return data;
}

fetchData().then((data) => {
  bars.forEach((bar, i) => {
    bar.style.height = `${data[i].amount * 3}px`;
  });

  tooltips.forEach((tooltip, i) => {
    tooltip.textContent = `$${data[i].amount}`;
  });

  sects.forEach((sect, i) => {
    if (i === currentDay - 1) {
      sect.classList.add("current");
    }
  });
});
