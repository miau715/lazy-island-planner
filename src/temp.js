/*
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const squareSize = 8;
const squareCount = 16;
const mapWidth = squareCount * 7;
const mapHeight = squareCount * 6;
const mapPadding = 50;
canvas.width  = mapWidth * squareSize + mapPadding * 2;
canvas.height = mapHeight * squareSize + mapPadding * 2;
ctx.fillStyle = 'rgb(119, 214, 194)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const inputCanvas = document.getElementById('inputCanvas');
const ctxI = inputCanvas.getContext("2d");
const sampleStartX = 354;
const sampleStartY = 117;
const sampleEndX = 953;
const sampleEndY = 630;
const sampleSquareSize = (sampleEndX - sampleStartX)/mapWidth;
inputCanvas.width  = 1280;
inputCanvas.height = 720;

const img = new Image();
img.addEventListener('load', function() {
  // draw pixel blocks
  ctxI.drawImage(img, 0, 0);
  for (let i = 0; i < mapWidth; i++) {
    for (let j = 0; j < mapHeight; j++) {
      const squareColor = ctxI.getImageData(sampleStartX + (i + 0.25) * sampleSquareSize, sampleStartY + (j + 0.25) * sampleSquareSize, sampleSquareSize / 2, sampleSquareSize / 2);
      const data = squareColor.data;
      let sumR = 0, sumG = 0, sumB = 0, count = 0;;
      data.forEach((val, i) => {
        switch(i%4) {
          case 0:
            sumR += val;
            count ++;
            break;
          case 1:
            sumG += val;
            break;
          case 2:
            sumB += val;
            break;
          default:
        }
      });
      let colorR = Math.floor(sumR / count);
      let colorG = Math.floor(sumG / count);
      let colorB = Math.floor(sumB / count);
      ctx.fillStyle = `rgb(${colorR}, ${colorG}, ${colorB})`;
      ctx.fillRect(i * squareSize + mapPadding, j * squareSize + mapPadding, squareSize, squareSize);
    } 
  }

  // draw grid 
  let lineWidth;
  let strokeStyle;
  let lineDash = [];
  let lineHStart, lineHEnd, lineVStart, lineVEnd;
  for (let i = 0; i <= mapWidth; i++){
    if (i % squareCount === 0) {
      lineWidth = 3;
      strokeStyle = 'rgba(255,255,255,0.3)';
      lineDash = [squareSize + 5, squareSize - 2];
      lineHStart = [i * squareSize + mapPadding - 0.5, 0];
      lineHEnd = [i * squareSize + mapPadding - 0.5, mapHeight * squareSize + mapPadding * 2];
    }
    else {
      lineWidth = 1;
      strokeStyle = 'rgba(255,255,255,0.2)'
      lineDash = [];
      lineHStart = [i * squareSize + mapPadding - 0.5, 0 + mapPadding];
      lineHEnd = [i * squareSize + mapPadding - 0.5, mapHeight * squareSize + mapPadding];
    }
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.setLineDash(lineDash);
    ctx.beginPath();
    ctx.moveTo(lineHStart[0], lineHStart[1]);
    ctx.lineTo(lineHEnd[0], lineHEnd[1]);
    ctx.stroke();
  }
  for (let i = 0; i <= mapHeight; i++){
    if (i % squareCount === 0) {
      lineWidth = 3;
      strokeStyle = 'rgba(255,255,255,0.3)';
      lineDash = [squareSize - 1, squareSize - 1];
      lineVStart = [0, i * squareSize + mapPadding - 0.5];
      lineVEnd = [mapWidth * squareSize + mapPadding * 2, i * squareSize + mapPadding - 0.5];
    }
    else {
      lineWidth = 1;
      strokeStyle = 'rgba(255,255,255,0.2)'
      lineDash = [];
      lineVStart = [0 + mapPadding, i * squareSize + mapPadding - 0.5];
      lineVEnd = [mapWidth * squareSize + mapPadding, i * squareSize + mapPadding - 0.5];
    }
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.setLineDash(lineDash);
    ctx.beginPath();
    ctx.moveTo(lineVStart[0], lineVStart[1]);
    ctx.lineTo(lineVEnd[0], lineVEnd[1]);
    ctx.stroke();
  }
}, false);
img.src = 'test.jpg'; 

// hover

const canvasRect = canvas.getBoundingClientRect();
const functionArea = new Path2D();
functionArea.rect(mapPadding, mapPadding, mapWidth * squareSize, mapHeight * squareSize);
console.log(canvasRect);
canvas.onmousemove = (e) => {
  if (ctx.isPointInPath(functionArea, e.offsetX, e.offsetY)) {
    console.log(e.offsetX, e.offsetY);
    let x = e.offsetX;
    let y = e.offsetY;
    let hoverX = x - (x - mapPadding) % squareSize;
    let hoverY = y - (y - mapPadding) % squareSize;
    ctx.beginPath();
    ctx.rect(hoverX, hoverY, squareSize, squareSize);
    ctx.fillStyle = 'rgba(255,0,0,0.1)';
    ctx.fill();
  }
};