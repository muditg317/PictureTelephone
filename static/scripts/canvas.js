let canvas, ctx;
let mouseX, mouseY, mouseDown = 0;

let prevX;
let prevY;

let empty = true;

function drawLineTo(ctx, x, y, size) {
  empty = false;
  r = 0;
  g = 0;
  b = 0;
  a = 255;

  ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
  ctx.lineWidth = size * 2;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.stroke();

  prevX = x;
  prevY = y;
}

function clearCanvas(canvas, ctx) {
  empty = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function sketchpad_mouseDown() {
  mouseDown = 1;
  prevX = mouseX;
  prevY = mouseY;
  drawLineTo(ctx, mouseX, mouseY, 2);
}

function sketchpad_mouseUp() {
  mouseDown = 0;
}

function sketchpad_mouseMove(e) {
  getMousePos(e);
  if (mouseDown == 1) {
    drawLineTo(ctx, mouseX, mouseY, 2);
  }
}

function getMousePos(e) {
  if (!e)
    var e = event;

  if (e.offsetX) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  } else if (e.layerX) {
    mouseX = e.layerX;
    mouseY = e.layerY;
  }
}

window.onload = init;

let ongoingTouches = new Array;

function handleStart(evt) {


  let touches = evt.changedTouches;
  let offset = findPos(canvas);


  for (let i = 0; i < touches.length; i++) {
    if (touches[i].clientX - offset.x > 0 && touches[i].clientX - offset.x < parseFloat(canvas.width) && touches[i].clientY - offset.y > 0 && touches[i].clientY - offset.y < parseFloat(canvas.height)) {
      evt.preventDefault();
      console.log("touchstart:" + i + "...");
      ongoingTouches.push(copyTouch(touches[i]));
      let color = colorForTouch(touches[i]);
      ctx.beginPath();
      ctx.arc(touches[i].clientX - offset.x, touches[i].clientY - offset.y, 2, 0, 2 * Math.PI, false); // a circle at the start
      ctx.fillStyle = color;
      ctx.fill();
      console.log("touchstart:" + i + ".");
    }
  }
}

function handleMove(evt) {

  let touches = evt.changedTouches;
  let offset = findPos(canvas);

  for (let i = 0; i < touches.length; i++) {
    if (touches[i].clientX - offset.x > 0 && touches[i].clientX - offset.x < parseFloat(canvas.width) && touches[i].clientY - offset.y > 0 && touches[i].clientY - offset.y < parseFloat(canvas.height)) {
      evt.preventDefault();
      let color = colorForTouch(touches[i]);
      let idx = ongoingTouchIndexById(touches[i].identifier);

      if (idx >= 0) {
        console.log("continuing touch " + idx);
        ctx.beginPath();
        console.log("ctx.moveTo(" + ongoingTouches[idx].clientX + ", " + ongoingTouches[idx].clientY + ");");
        ctx.moveTo(ongoingTouches[idx].clientX - offset.x, ongoingTouches[idx].clientY - offset.y);
        console.log("ctx.lineTo(" + touches[i].clientX + ", " + touches[i].clientY + ");");
        ctx.lineTo(touches[i].clientX - offset.x, touches[i].clientY - offset.y);
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;
        ctx.stroke();

        ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
        console.log(".");
      } else {
        console.log("can't figure out which touch to continue");
      }
    }
  }
}

function handleEnd(evt) {

  //  console.log("touchend/touchleave.");
  let touches = evt.changedTouches;
  let offset = findPos(canvas);

  for (let i = 0; i < touches.length; i++) {
    if (touches[i].clientX - offset.x > 0 && touches[i].clientX - offset.x < parseFloat(canvas.width) && touches[i].clientY - offset.y > 0 && touches[i].clientY - offset.y < parseFloat(canvas.height)) {
      evt.preventDefault();
      let color = colorForTouch(touches[i]);
      let idx = ongoingTouchIndexById(touches[i].identifier);

      if (idx >= 0) {
        ctx.lineWidth = 4;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(ongoingTouches[idx].clientX - offset.x, ongoingTouches[idx].clientY - offset.y);
        ctx.lineTo(touches[i].clientX - offset.x, touches[i].clientY - offset.y);
        // ctx.fillRect(touches[i].clientX - 4 - offset.x, touches[i].clientY - 4 - offset.y, 4, 4); // and a square at the end
        ongoingTouches.splice(i, 1); // remove it; we're done
      } else {
        console.log("can't figure out which touch to end");
      }
    }
  }
}

function handleCancel(evt) {
  evt.preventDefault();
  console.log("touchcancel.");
  let touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    ongoingTouches.splice(i, 1); // remove it; we're done
  }
}

function colorForTouch(touch) {
  let r = touch.identifier % 16;
  let g = Math.floor(touch.identifier / 3) % 16;
  let b = Math.floor(touch.identifier / 7) % 16;
  r = r.toString(16); // make it a hex digit
  g = g.toString(16); // make it a hex digit
  b = b.toString(16); // make it a hex digit
  let color = "#" + r + g + b;
  color = "#000"
  console.log("color for touch with identifier " + touch.identifier + " = " + color);
  return color;
}

function copyTouch(touch) {
  return {
    identifier: touch.identifier,
    clientX: touch.clientX,
    clientY: touch.clientY
  };
}

function ongoingTouchIndexById(idToFind) {
  for (let i = 0; i < ongoingTouches.length; i++) {
    let id = ongoingTouches[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1; // not found
}

function findPos(obj) {
  let curleft = 0,
    curtop = 0;

  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);

    return {
      x: curleft - document.body.scrollLeft,
      y: curtop - document.body.scrollTop
    };
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

    let el = canvas;
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchleave", handleEnd, false);
    el.addEventListener("touchmove", handleMove, false);
  }
}

function saveImage(nextPage, thread_id) {
  if (!empty) {
    drawingUrl = canvas.toDataURL('image/png', 1.0);
    post(nextPage, {
      "drawing": drawingUrl,
      "thread_id": thread_id,
      "request_type": "drawing"
    });
  }
}

function post(path, params, method = 'post') {

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
