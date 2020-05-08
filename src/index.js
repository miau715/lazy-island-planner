import React from 'react';
import ReactDOM from 'react-dom';
import paper from 'paper';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squareSize: 8,
      squareCount: 16,
      mapPadding: 50,
      mapHUnit: 7,
      mapVUnit: 6,
      gridColor: 'rgba(255, 255, 255, 0.2)',
      mainGridColor: 'rgba(255, 255, 255, 0.4)',
      sampleStartX: 354,
      sampleStartY: 117,
      sampleEndX: 953,
      sampleEndY: 630,
    };
  }
  componentDidMount() {
    const canvas = document.getElementById('canvas');
    canvas.width = this.state.squareSize * this.state.squareCount * this.state.mapHUnit + this.state.mapPadding * 2;
    canvas.height = this.state.squareSize * this.state.squareCount * this.state.mapVUnit + this.state.mapPadding * 2;
    paper.setup(canvas);

    const url = 'test.jpg';
    let raster = new paper.Raster(url);
    const mapLayer = new paper.Layer();
    raster.onLoad = () => {
      mapLayer.activate();
      const mapRasterWidth = this.state.sampleEndX - this.state.sampleStartX;
      const mapRasterHeight = this.state.sampleEndY - this.state.sampleStartY;
      const mapRaster = raster.getSubRaster(new paper.Rectangle(this.state.sampleStartX, this.state.sampleStartY, mapRasterWidth, mapRasterHeight));
      raster.remove();
      mapRaster.visible = false;
      mapRaster.size = new paper.Size(this.state.squareCount * this.state.mapHUnit, this.state.squareCount * this.state.mapVUnit);
      for (let y = 0; y < mapRaster.height; y++) {
        for(let x = 0; x < mapRaster.width; x++) {
          let color = mapRaster.getPixel(x, y);
          let prevColor;
          let pixelRect = new paper.Path.Rectangle({
            x: x * this.state.squareSize + this.state.mapPadding, 
            y: y * this.state.squareSize + this.state.mapPadding,
            width: this.state.squareSize,
            height: this.state.squareSize
          });
          pixelRect.fillColor = color;
          pixelRect.onMouseEnter = function(e) {
            this.fillColor = 'red';
            prevColor = color;
          }
          pixelRect.onMouseLeave = function(e) {
            this.fillColor = prevColor;
          }
        }
      }

    }
    
    // addGrid
    const gridLayer = new paper.Layer();
    gridLayer.activate();
    let gridLine;
    const dashStroke = [this.state.squareSize + 5, this.state.squareSize - 2]
    for(let x = 0; x <= this.state.squareCount * this.state.mapHUnit; x++) {
      if (x % this.state.squareCount === 0) {
        gridLine = new paper.Path.Line(new paper.Point(x * this.state.squareSize + this.state.mapPadding - 0.5, 0), new paper.Point(x * this.state.squareSize + this.state.mapPadding - 0.5, canvas.height));
        gridLine.strokeWidth = 3;
        gridLine.dashArray = dashStroke;
        gridLine.strokeColor = this.state.mainGridColor;
      }
      else {
        gridLine = new paper.Path.Line(new paper.Point(x * this.state.squareSize + this.state.mapPadding - 0.5, this.state.mapPadding), new paper.Point(x * this.state.squareSize + this.state.mapPadding - 0.5, canvas.height - this.state.mapPadding));
        gridLine.strokeColor = this.state.gridColor;
      }
      gridLine.locked = true;
    }
    for(let y = 0; y <= this.state.squareCount * this.state.mapVUnit; y++) {
      if (y % this.state.squareCount === 0) {
        gridLine = new paper.Path.Line(new paper.Point(0, y * this.state.squareSize + this.state.mapPadding - 0.5), new paper.Point(canvas.width, y * this.state.squareSize + this.state.mapPadding - 0.5));
        gridLine.strokeWidth = 3;
        gridLine.dashArray = dashStroke;
        gridLine.strokeColor = this.state.mainGridColor;
      }
      else {
        gridLine = new paper.Path.Line(new paper.Point(this.state.mapPadding, y * this.state.squareSize + this.state.mapPadding - 0.5), new paper.Point(canvas.width - this.state.mapPadding, y * this.state.squareSize + this.state.mapPadding - 0.5));
        gridLine.strokeColor = this.state.gridColor;
      }
      gridLine.locked = true;
    }
    
    // hover 
    const hoverLayer = new paper.Layer();
    hoverLayer.activate();

  }
  render() {
    return (
      <canvas id='canvas'>
      </canvas>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
