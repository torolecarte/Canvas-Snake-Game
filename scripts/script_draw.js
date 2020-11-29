window.onload = function () {
  var canvas = document.getElementById("exemplo");
  var ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.arc(130, 50, 15, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.font = "20px Arial";
  ctx.fillText("Olá, tudo bem?", 0, 130);

  ctx.fillStyle = "blue";
  ctx.fillRect(10, 10, 80, 80);
}