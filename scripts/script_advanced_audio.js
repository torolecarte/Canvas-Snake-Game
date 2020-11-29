/** @type {AudioContext} */
var audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // define audio context
var oscillator;
var bounceBuffer;
var bounceBufferNode;

window.onload = function () {
  document.getElementById("btnTocarOscilador").onclick = tocarOscilador;
  document.getElementById("btnPararOscilador").onclick = pararOscilador;

  document.getElementById("btnTocarBounce").onclick = tocarBounce;
  document.getElementById("btnPararBounce").onclick = pararBounce;
  loadAudioBuffers();
};

function loadAudioBuffers() {
  bounceBuffer = new Buffer(audioCtx, ["/assets/Bounce.mp3"]);
  bounceBuffer.loadAll();
}

function tocarBounce() {
  var buffer = bounceBuffer.getSoundByIndex(0);
  bounceBufferNode = audioCtx.createBufferSource();
  bounceBufferNode.buffer = buffer;
  bounceBufferNode.connect(audioCtx.destination);
  bounceBufferNode.start();
}

function pararBounce() {
  bounceBufferNode.stop();
  bounceBufferNode.disconnect(audioCtx.destination);
}

function tocarOscilador() {
  oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = 440;
  oscillator.connect(audioCtx.destination);
  oscillator.start();
}

function pararOscilador() {
  oscillator.stop();
  oscillator.disconnect(audioCtx.destination);
}


// Classes
class Buffer {

  constructor(context, urls) {
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }

  loadSound(url, index) {
    console.log(`Loading from ${url}`);
    let request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    let thisBuffer = this;
    request.onload = function () {
      thisBuffer.context.decodeAudioData(request.response, function (buffer) {
        thisBuffer.buffer[index] = buffer;
        //updateProgress(thisBuffer.urls.length);
        if (index == thisBuffer.urls.length - 1) {
          thisBuffer.loaded();
        }
      });
    };
    request.send();
  };

  loadAll() {
    for(var index = 0; index < this.urls.length; index++ ){
      this.loadSound(this.urls[index], index);
    }
  }

  loaded() {
    // what happens when all the files are loaded
  }

  getSoundByIndex(index) {
    return this.buffer[index];
  }

}