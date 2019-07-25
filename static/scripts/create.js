var canvas,ctx;
var mouseX,mouseY,mouseDown=0;
var x;
let imageData;
let imageData2;
let drawingUrl;
let storedDrawing;

let thread_id;

function drawDot(ctx,x,y,size) {
    r=0; g=0; b=0; a=255;

    ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function clearCanvas(canvas,ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function sketchpad_mouseDown() {
    mouseDown=1;
    drawDot(ctx,mouseX,mouseY,2);
}

function sketchpad_mouseUp() {
    mouseDown=0;
}

function sketchpad_mouseMove(e) {
  getMousePos(e);
  if (mouseDown==1) {
    drawDot(ctx,mouseX,mouseY,2);
  }
}

function getMousePos(e) {
  if (!e)
    var e = event;

  if (e.offsetX) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  }
  else if (e.layerX) {
    mouseX = e.layerX;
    mouseY = e.layerY;
  }
}

function init(threadId) {
  thread_id = threadId;
  canvas = document.getElementById('canvas');

  if (canvas.getContext)
    ctx = canvas.getContext('2d');

  if (ctx) {
    canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
    canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
    window.addEventListener('mouseup', sketchpad_mouseUp, false);
  }
}

function saveImage() {
  drawingUrl = canvas.toDataURL('image/png', 1.0);
  // x = document.getElementById("drawing");
  // x.src = drawingUrl;

  post('/confirmation-newthread', {"drawing": drawingUrl,"thread_id":thread_id,"request_type":"drawing"});
}

function post(path, params, method='post') {

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}
