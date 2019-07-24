var canvas,ctx;
var mouseX,mouseY,mouseDown=0;

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













// var canvas,ctx;
// var mouseX,mouseY,mouseDown=0;
// var paint;
// var clickX = [];
// var clickY = [];
// var clickDrag = [];
//
//
// function drawDot(ctx,x,y,size) {
//     r=0; g=0; b=0; a=255;
//
//     ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
//
//     ctx.beginPath();
//     ctx.arc(x, y, size, 0, Math.PI*2, true);
//     ctx.closePath();
//     ctx.fill();
// }
//
// function clearCanvas(canvas,ctx) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }
//
//     // Keep track of the mouse button being pressed and draw a dot at current location
// function sketchpad_mouseDown() {
//     mouseDown=1;
//     mouseX = e.pageX - canvas.offsetLeft;
//     mouseY = e.pageY - canvas.offsetTop;
//
//     paint = true;
//     addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
//     redraw();
//     // drawDot(ctx,mouseX,mouseY,12);
// }
//
//     // Keep track of the mouse button being released
// function sketchpad_mouseUp() {
//     mouseDown=0;
//     paint === false;
// }
//
//     // Keep track of the mouse position and draw a dot if mouse button is currently pressed
// function sketchpad_mouseMove(e) {
//   getMousePos(e);
//   if (mouseDown==1) {
//     addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, true);
//     redraw();
//     // drawDot(ctx,mouseX,mouseY,12);
//   }
// }
//
// //function that adds to the position arrays
// function addClick(x, y, dragging)
// {
//   clickX.push(x);
//   clickY.push(y);
//   clickDrag.push(dragging);
// }
//
//
//
// // Get the current mouse position relative to the top-left of the canvas
// function getMousePos(e) {
// //   what I'm trying to implant from the other tutorial
//   if (!e)
//     var e = event;
//
//   if (e.offsetX) {
//     mouseX = e.offsetX;
//     mouseY = e.offsetY;
//   }
//   else if (e.layerX) {
//     mouseX = e.layerX;
//     mouseY = e.layerY;
//   }
// }
//
//
// function redraw(){
//   context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
//
//   ctx.strokeStyle = "#000000";
//   ctx.lineJoin = "round";
//   ctx.lineWidth = 2;
//
//   for(var i=0; i < clickX.length; i++) {
//     context.beginPath();
//     if(clickDrag[i] && i){
//       ctx.moveTo(clickX[i-1], clickY[i-1]);
//      }else{
//        ctx.moveTo(clickX[i]-1, clickY[i]);
//      }
//      ctx.lineTo(clickX[i], clickY[i]);
//      ctx.closePath();
//      ctx.stroke();
//   }
// }
//
//
// function init() {
//         // Get the specific canvas element from the HTML document
//   canvas = document.getElementById('sketchpad');
//
//   if (canvas.getContext)
//     ctx = canvas.getContext('2d');
//
//   if (ctx) {
//     canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
//     canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
//     window.addEventListener('mouseup', sketchpad_mouseUp, false);
//   }
// }






// var clickX = [];
// var clickY = [];
// var clickDrag = [];
// var paint;
//
//
//
// var canvasDiv = document.getElementById('canvasDiv');
// canvas = document.createElement('canvas');
// canvas.setAttribute('width', canvasWidth);
// canvas.setAttribute('height', canvasHeight);
// canvas.setAttribute('id', 'canvas');
// canvasDiv.appendChild(canvas);
// if(typeof G_vmlCanvasManager != 'undefined') {
// 	canvas = G_vmlCanvasManager.initElement(canvas);
// }
// context = canvas.getContext("2d");
//
//
// $('#canvas').mousedown(function(e){
//   var mouseX = e.pageX - this.offsetLeft;
//   var mouseY = e.pageY - this.offsetTop;
//
//   paint = true;
//   addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
//   redraw();
// });
//
// $('#canvas').mousemove(function(e){
//   if(paint){
//     addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
//     redraw();
//   }
// });
//
// $('#canvas').mouseup(function(e){
//   paint = false;
// });
//
// $('#canvas').mouseleave(function(e){
//   paint = false;
// });
//
//
// function addClick(x, y, dragging)
// {
//   clickX.push(x);
//   clickY.push(y);
//   clickDrag.push(dragging);
// }
//
// function redraw(){
//   context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
//
//   context.strokeStyle = "#df4b26";
//   context.lineJoin = "round";
//   context.lineWidth = 5;
//
//   for(var i=0; i < clickX.length; i++) {
//     context.beginPath();
//     if(clickDrag[i] && i){
//       context.moveTo(clickX[i-1], clickY[i-1]);
//      }else{
//        context.moveTo(clickX[i]-1, clickY[i]);
//      }
//      context.lineTo(clickX[i], clickY[i]);
//      context.closePath();
//      context.stroke();
//   }
// }
