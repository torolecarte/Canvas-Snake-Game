var canvas;
/** @type {CanvasRenderingContext2D} */
var ctx;
var x = 0;
var y = 300;

window.onload = function () {
  canvas = document.getElementById("exemplo");
  ctx = canvas.getContext("2d");

  canvas.addEventListener("click", trataClique);
  document.addEventListener("keydown", trataTeclas);

  desenha(x, y);
};

function trataClique(e) {
  console.log(e.target);
  console.log(`PosX: ${e.clientX} / PosY: ${e.clientY}`);

  ctx.beginPath();
  var posX = e.clientX - e.target.offsetLeft;
  var posY = e.clientY - e.target.offsetTop;
  ctx.arc(posX, posY, 20, 0, (2 * Math.PI));
  ctx.fill();
}

function trataTeclas(e) {
  switch (e.keyCode) {
    case 37:
      x = x - 10;
      break;
    case 39:
      x = x + 10;
      break;
    case 38:
      y = y - 10;
      break;
    case 40:
      y = y + 10;
      break;
  }

  desenha(x, y);
}

function desenha (posX, posY) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(posX, posY, 30, 30);
}