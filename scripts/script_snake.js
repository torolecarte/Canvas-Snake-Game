var canvas;
/** @type {CanvasRenderingContext2D} */
var ctx;
var boxSize = 20;
var gameObj = {
  box: boxSize,
  snake: [{
    x: 10 * boxSize,
    y: 10 * boxSize
  }],
  direcao: '',
  pontos: 0,
  comida: gerarComida(),
  storagePontosKey: "pontuacaoSnake"
};

window.onload = function () {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");

  mostrarRecorde();
  mostrarPontos();
  document.addEventListener("keydown", direcao);
  gameObj.interval = setInterval(draw, 100);
};

function gerarComida() {
  return {
    x: Math.floor(Math.random() * 29 + 1) * boxSize,
    y: Math.floor(Math.random() * 29 + 1) * boxSize
  };
}

function direcao(eventArgs) {
  var key = eventArgs.keyCode;

  if (key == 37 && gameObj.direcao != "RIGHT") {
    gameObj.direcao = "LEFT";
  } else if (key == 38 && gameObj.direcao != "DOWN") {
    gameObj.direcao = "UP";
  } else if (key == 39 && gameObj.direcao != "LEFT") {
    gameObj.direcao = "RIGHT";
  } else if (key == 40 && gameObj.direcao != "UP") {
    gameObj.direcao = "DOWN";
  }
}

function colisaoComCorpo(cabeca, arrayCorpo) {
  for (var i = 0; i < arrayCorpo.length; i++) {
    if (cabeca.x == arrayCorpo[i].x && cabeca.y == arrayCorpo[i].y) {
      return true;
    }
  }
  return false;
}

function somaPonto() {
  gameObj.pontos += 1;
  mostrarPontos();
}

function gravarRecorde() {
  var record = 0;
  if (localStorage.getItem(gameObj.storagePontosKey) != null) {
    record = parseInt(localStorage.getItem(gameObj.storagePontosKey));
    if (record < gameObj.pontos) {
      record = gameObj.pontos;
    }
  } else {
    record = gameObj.pontos;
  }

  localStorage.setItem(gameObj.storagePontosKey, record);
  mostrarRecorde();
}

function mostrarRecorde() {
  ctx.clearRect(canvas.width - 250, 0, canvas.width, 20);
  var record = 0;
  ctx.fillStyle = "#0000ff";
  ctx.font = "20px Arial";
  if (localStorage.getItem(gameObj.storagePontosKey) != null) {
    record = parseInt(localStorage.getItem(gameObj.storagePontosKey));
  }
  ctx.fillText(`Recorde: ${record}`, canvas.width - 250, 16, 250);
}

function mostrarPontos() {
  ctx.clearRect(0, 0, 250, 20);
  ctx.fillStyle = "#ff0000";
  ctx.fillText(`Pontos: ${gameObj.pontos}`, 1, 16, 250);
}

function draw() {
  console.log("Step");
  ctx.fillStyle = "#dbdbdb";
  ctx.fillRect(0, 20, canvas.width, canvas.height);

  for (var i = 0; i < gameObj.snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "green" : "blue";
    ctx.fillRect(gameObj.snake[i].x, gameObj.snake[i].y, gameObj.box, gameObj.box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(gameObj.snake[i].x, gameObj.snake[i].y, gameObj.box, gameObj.box);
  }

  ctx.fillStyle = "black";
  ctx.fillRect(gameObj.comida.x, gameObj.comida.y, gameObj.box, gameObj.box);

  var snakeX = gameObj.snake[0].x;
  var snakeY = gameObj.snake[0].y;

  if (gameObj.direcao == "LEFT") snakeX -= gameObj.box;
  if (gameObj.direcao == "RIGHT") snakeX += gameObj.box;
  if (gameObj.direcao == "UP") snakeY -= gameObj.box;
  if (gameObj.direcao == "DOWN") snakeY += gameObj.box;

  if (snakeX == gameObj.comida.x
    && snakeY == gameObj.comida.y) {
    gameObj.comida = gerarComida();
    somaPonto();
  } else {
    gameObj.snake.pop();
  }

  var novaCabeca = {
    x: snakeX,
    y: snakeY
  }

  if (snakeX < 0 || snakeY < 20
    || snakeX > canvas.height - gameObj.box
    || snakeY > canvas.width - gameObj.box
    || colisaoComCorpo(novaCabeca, gameObj.snake)) {
    console.log("Endgame");
    clearInterval(gameObj.interval);
    gravarRecorde();
  }

  gameObj.snake.unshift(novaCabeca);
}