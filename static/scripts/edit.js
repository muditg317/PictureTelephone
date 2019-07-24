var canvas,ctx;
var mouseX,mouseY,mouseDown=0;
var fullQuality;
var x;

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
  fullQuality = canvas.toDataURL('image/jpeg', 1.0);
  console.log(fullQuality);
}

function changeImage(element){
  // x = document.getElementById("drawing");
  // x.setAttribute("src", fullQuality);
  var x = document.getElementById("drawing");
  var v = x.getAttribute("src");
  if(v !== fullQuality)
    v = fullQuality;
  x.setAttribute("src", v);
}
