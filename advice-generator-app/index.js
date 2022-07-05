const btnRefresh = document.getElementById("refresh");
const id = document.getElementById("id");
const advice = document.getElementById("text");

const defaultUrl = "https://api.adviceslip.com/advice";

let i = 0;

async function fetchData(url) {
  const res = await fetch(url);
  const data = res.json();
  return data;
}

function getAdvice(url) {
  fetchData(url).then((res) => {
    const data = res.slip;
    const currentId = Number.parseInt(id.textContent);

    if (data.id + i === currentId) {
      const incremented = Number.parseInt(id.textContent) + 1;

      fetchData(`https://api.adviceslip.com/advice/${incremented}`).then(
        (_data) => {
          i++;

          id.textContent = incremented;
          advice.textContent = _data.slip.advice;
        }
      );
    } else {
      i = 0;

      id.textContent = data.id;
      advice.textContent = data.advice;
    }
  });
}

getAdvice(defaultUrl);
btnRefresh?.addEventListener("click", () => getAdvice(defaultUrl));
