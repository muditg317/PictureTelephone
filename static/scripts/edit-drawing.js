var canvas,ctx;
var mouseX,mouseY,mouseDown=0;
var x;
let imageData;
let imageData2;
let drawingUrl;
let storedDrawing;

let thread_id;

let prevX;
let prevY;


function drawLineTo(ctx,x,y,size) {
    r=0; g=0; b=0; a=255;

    ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
    ctx.lineWidth = size*2;

    // ctx.beginPath();
    // ctx.arc(x, y, size, 0, Math.PI*2, true);
    // ctx.closePath();
    // ctx.fill();
    ctx.beginPath();
    ctx.moveTo(prevX,prevY);
    ctx.lineTo(x,y);
    ctx.stroke();

    prevX = x;
    prevY = y;
}

function clearCanvas(canvas,ctx) {
  // ctx.save();
  // ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.restore();
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
  // alert("|"+thread_id+"|");
  post('/confirmation', {"drawing": drawingUrl,"thread_id":thread_id,"request_type":"drawing"});
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
