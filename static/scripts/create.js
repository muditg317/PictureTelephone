navBar_element = document.getElementById("create");
navBar_element.classList.add("active")


var canvas,ctx;
var mouseX,mouseY,mouseDown=0;
var x;
let imageData;
let imageData2;
let drawingUrl;
let storedDrawing;


let prevX;
let prevY;

let empty = true;

function drawLineTo(ctx,x,y,size) {
    empty = false;
    r=0; g=0; b=0; a=255;

    ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
    ctx.lineWidth = size*2;

    ctx.beginPath();
    ctx.moveTo(prevX,prevY);
    ctx.lineTo(x,y);
    ctx.stroke();

    prevX = x;
    prevY = y;
}

function clearCanvas(canvas,ctx) {
  empty = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function sketchpad_mouseDown() {
    mouseDown=1;
    prevX = mouseX;
    prevY = mouseY;
    drawLineTo(ctx,mouseX,mouseY,2);
}

function sketchpad_mouseUp() {
    mouseDown=0;
}

function sketchpad_mouseMove(e) {
  getMousePos(e);
  if (mouseDown==1) {
    drawLineTo(ctx,mouseX,mouseY,2);
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

window.onload=init;

function init() {
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
  if(empty){
    return;
  }
  drawingUrl = canvas.toDataURL('image/png', 1.0);
  // x = document.getElementById("drawing");
  // x.src = drawingUrl;

  post('/confirmation-newthread', {"drawing": drawingUrl,"request_type":"drawing"});
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
