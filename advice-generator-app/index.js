const btnRefresh = document.getElementById("refresh");

async function fetchData() {
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = res.json();
  return data;
}

function getAdvice() {
  fetchData().then((data) => {
    document.getElementById("id").textContent = data.slip.id;
    document.getElementById("text").textContent = data.slip.advice;
  });
}

getAdvice();
btnRefresh?.addEventListener("click", getAdvice);
