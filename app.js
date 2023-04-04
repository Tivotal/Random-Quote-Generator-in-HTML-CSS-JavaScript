/* Created by Tivotal */
let quoteText = document.querySelector(".quote");
let button = document.querySelector("button");
let authorName = document.querySelector(".name");
let speechBTn = document.querySelector(".speach");
let copyBtn = document.querySelector(".copy");
let twitterBtn = document.querySelector(".twitter");
let synth = speechSynthesis;

function randomQuote() {
  button.classList.add("loading");
  button.innerText = "Loading...";
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      button.classList.remove("loading");
      button.innerText = "New Quote";
    });
}

speechBTn.addEventListener("click", () => {
  if (!button.classList.contains("loading")) {
    let utterrance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );

    synth.speak(utterrance);
    setInterval(() => {
      !synth.speaking
        ? speechBTn.classList.remove("active")
        : speechBTn.classList.add("active");
    }, 10);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
  let url = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(url, "_blank");
});

button.addEventListener("click", randomQuote);
