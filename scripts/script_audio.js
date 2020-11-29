var audioBounce = new Audio();
audioBounce.src = "assets/Bounce.mp3";

document.addEventListener("click", tocarSom);

function tocarSom() {
  audioBounce.play();
}