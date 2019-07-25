function init2() {
  canvas2 = document.getElementById('canvas2');
  if (canvas2.getContext){
    ctx2 = canvas2.getContext('2d');
  }
  ctx2.putImageData(imageData, 0, 0);
}
