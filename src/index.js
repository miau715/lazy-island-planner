import './index.css';

const mainCanvas = document.getElementById('mainCanvas');
const ctxM = mainCanvas.getContext('2d');
const squareSize = 8;
const squareCount = 16;
const mapWidth = squareCount * 7;
const mapHeight = squareCount * 6;
const mapPadding = 100;
mainCanvas.width  = mapWidth * squareSize + mapPadding;
mainCanvas.height = mapHeight * squareSize + mapPadding;
ctxM.fillStyle = 'rgb(119, 214, 194)';
ctxM.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

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
  ctxI.drawImage(img, 0, 0);

  // draw pixel blocks
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
      ctxM.fillStyle = `rgb(${colorR}, ${colorG}, ${colorB})`;
      ctxM.fillRect(i * squareSize + mapPadding / 2, j * squareSize + mapPadding / 2, squareSize, squareSize);
    } 
  }

  // draw grid 
  let lineWidth;
  let strokeStyle = 'rgba(255,255,255,0.2)';
  let lineDash = [];
  let lineHStart, lineHEnd, lineVStart, lineVEnd;
  for (let i = 0; i <= mapWidth; i++){
    if (i % squareCount === 0) {
      lineWidth = 3;
      lineDash = [squareSize + 2, squareSize - 2];
      lineHStart = [i * squareSize + mapPadding / 2 - 0.5, 0];
      lineHEnd = [i * squareSize + mapPadding / 2 - 0.5, mapHeight * squareSize + mapPadding];
    }
    else {
      lineWidth = 1;
      lineDash = [];
      lineHStart = [i * squareSize + mapPadding / 2 - 0.5, 0 + mapPadding / 2];
      lineHEnd = [i * squareSize + mapPadding / 2 - 0.5, mapHeight * squareSize + mapPadding / 2];
    }
    ctxM.lineWidth = lineWidth;
    ctxM.strokeStyle = strokeStyle;
    ctxM.setLineDash(lineDash);
    ctxM.beginPath();
    ctxM.moveTo(lineHStart[0], lineHStart[1]);
    ctxM.lineTo(lineHEnd[0], lineHEnd[1]);
    ctxM.stroke();
  }
  for (let i = 0; i <= mapHeight; i++){
    if (i % squareCount === 0) {
      lineWidth = 3;
      lineDash = [squareSize - 1, squareSize - 1];
      lineVStart = [0, i * squareSize + mapPadding / 2 - 0.5];
      lineVEnd = [mapWidth * squareSize + mapPadding, i * squareSize + mapPadding / 2 - 0.5];
    }
    else {
      lineWidth = 1;
      lineDash = [];
      lineVStart = [0 + mapPadding / 2, i * squareSize + mapPadding / 2 - 0.5];
      lineVEnd = [mapWidth * squareSize + mapPadding / 2, i * squareSize + mapPadding / 2 - 0.5];
    }
    ctxM.lineWidth = lineWidth;
    ctxM.strokeStyle = strokeStyle;
    ctxM.setLineDash(lineDash);
    ctxM.beginPath();
    ctxM.moveTo(lineVStart[0], lineVStart[1]);
    ctxM.lineTo(lineVEnd[0], lineVEnd[1]);
    ctxM.stroke();
  }
}, false);
img.src = 'test.jpg'; 
