var canvas;
/** @type {CanvasRenderingContext2D} */
var ctx;

window.onload = function () {

  canvas = document.getElementById("exemplo");
  ctx = canvas.getContext("2d");

  canvas.addEventListener("click", gravarClique);

  escreverNumeroCliques();
};

function gravarClique(e) {

  var cliques = 0;
  if (localStorage.getItem("cliquecanvas")) {
    cliques = parseInt(localStorage.getItem("cliquecanvas"));
    cliques = cliques + 1;
  } else {
    cliques = 1;
  }
  localStorage.setItem("cliquecanvas", cliques);

  escreverNumeroCliques(); 

}

function escreverNumeroCliques() {
  ctx.font = "20px Verdanda";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(localStorage.getItem("cliquecanvas"), canvas.width / 2, canvas.height / 2);
}
