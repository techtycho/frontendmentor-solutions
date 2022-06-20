const questions = document.querySelectorAll(".question");

questions[0].classList.add("selected");
questions[0].children[0].children[1].style.transform = "rotateZ(-180deg)";
questions[0].children[1].style.display = "block";

questions.forEach((question, index) => {
  question.addEventListener("click", () => {
    questions.forEach((_question) => {
      _question.classList.remove("selected");
      _question.children[0].children[1].style.transform = "rotate(0)";
      _question.children[1].style.display = "none";
    });

    question.classList.add("selected");
    question.children[0].children[1].style.transform = "rotateZ(-180deg)";
    question.children[1].style.display = "block";
  });
});
