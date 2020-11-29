var canvas;
var ctx;

window.onload = function () {
  canvas = document.getElementById("exemplo");
  ctx = canvas.getContext("2d");

  var btnDrawWithSetInterval = document.getElementById("btnDrawWithSetInterval");
  btnDrawWithSetInterval.onclick = initDrawWithSetInterval;

  var btnDrawWithSetTimeout = document.getElementById("btnDrawWithSetTimeout");
  btnDrawWithSetTimeout.onclick = initDrawWithSetTimeout;
  
  var btnDrawWithRequestAnimationFrame = document.getElementById("btnDrawWithRequestAnimationFrame");
  btnDrawWithRequestAnimationFrame.onclick = initDrawWithRequestAnimationFrame;
}

function disableButtons () {
  var btnDrawWithSetInterval = document.getElementById("btnDrawWithSetInterval");
  var btnDrawWithSetTimeout = document.getElementById("btnDrawWithSetTimeout");
  var btnDrawWithRequestAnimationFrame = document.getElementById("btnDrawWithRequestAnimationFrame");

  btnDrawWithSetInterval.disabled = true;
  btnDrawWithSetTimeout.disabled = true;
  btnDrawWithRequestAnimationFrame.disabled = true;
}

function desenhaObjeto(positions) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(positions.posX, positions.posY, 20, 20);
  if (positions.posY >= canvas.height) {
    positions.posX = Math.round(Math.random() * 780 + 10);
    positions.posY = -10;
  }
  positions.posY++;
}

function initDrawWithSetInterval() {
  disableButtons();
  var positions = { posY: -10, posX: 10 };
  setInterval(function() { desenhaObjeto(positions) }, 1);
}

function initDrawWithSetTimeout() {
  disableButtons();
  
  var positions = { posY: -10, posX: 10 };
  function setupTimeout() { setTimeout(function () { desenhaObjeto(positions); setupTimeout(); }, 1); }
  setupTimeout();
}

function initDrawWithRequestAnimationFrame() {
  disableButtons();
  
  var positions = { posY: -10, posX: 10 };
  var lastTimestamp;
  function step(timestamp) {
    console.log(`Curent: ${timestamp}`);
    console.log(`Last: ${lastTimestamp}`);
    if(lastTimestamp === undefined)
      lastTimestamp = timestamp;

    var elapsed = timestamp - lastTimestamp;
    console.log(`Elapsed: ${elapsed}`);
    lastTimestamp = timestamp;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(positions.posX, positions.posY, 20, 20);
    if (positions.posY >= canvas.height) {
      positions.posX = Math.round(Math.random() * 780 + 10);
      positions.posY = -10;
    }

    var calc = 0.1 * elapsed;
    console.log(`Calc: ${calc}`);
    positions.posY = positions.posY + calc;
    console.log(`Position Y: ${positions.posY}`);
    console.log(`Canvas Height: ${canvas.height}`);

    
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}