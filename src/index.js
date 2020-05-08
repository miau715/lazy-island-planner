import React from 'react';
import ReactDOM from 'react-dom';
import paper from 'paper';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null,
      squareSize: 8,
      squareCount: 16,
      mapPadding: 50,
      mapHUnit: 7,
      mapVUnit: 6,
      bgColor: 'rgb(119, 214, 194)',
      gridColor: 'rgba(255, 255, 255, 0.2)',
      mainGridColor: 'rgba(255, 255, 255, 0.4)',
      sampleStartX: 354,
      sampleStartY: 117,
      sampleEndX: 953,
      sampleEndY: 630,
      colorG1: ['#3c783b', '#598447', '#3d783c', '#417a40', '#518349'],
      colorG2: ['#42a140', '#49a646', '#40a03e', '#44a63f', '#4fa544'],
      colorG3: ['#5dc549', '#5fc647', '#5bc746', '#6ecd51', '#5cc746'],
      colorSand: ['#f0e8a7', '#ece5a2', '#ede7a6', '#ebe6a1', '#eee8b4'],
      colorWater: ['#78d4c3', '#7bd8c3', '#7dd9c0', '#79d6c1', '#76d5c3'],
      colorStone: ['#6e7484', '#818793', '#6e7689', '#6f7684', '#747788'],

      sizeMyHome: [5, 4],
      sizeHome: [4,4],
      sizeStore: [7, 4],
      sizeApparel: [5, 4],
      sizeMuzeum: [7, 4],
      sizeInfoCenter: [12, 10],
      sizeCamp: [4, 4],
      currentMode: ''
    };
  }
  componentDidMount() {
    const canvas = document.getElementById('canvas');
    canvas.width = this.state.squareSize * this.state.squareCount * this.state.mapHUnit + this.state.mapPadding * 2;
    canvas.height = this.state.squareSize * this.state.squareCount * this.state.mapVUnit + this.state.mapPadding * 2;
    paper.setup(canvas);
    this.setState({
      canvas: canvas
    });

    const url = 'test.jpg';
    let raster = new paper.Raster(url);
    const mapLayer = new paper.Layer();
    const drawLayer = new paper.Layer();
    const buildLayer = new paper.Layer();
    mapLayer.activate();
    const bgRect = new paper.Path.Rectangle({
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    });
    bgRect.fillColor = this.state.bgColor;
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
          const color = mapRaster.getPixel(x, y);
          //let prevColor;
          const pixelRect = new paper.Path.Rectangle({
            x: x * this.state.squareSize + this.state.mapPadding, 
            y: y * this.state.squareSize + this.state.mapPadding,
            width: this.state.squareSize,
            height: this.state.squareSize
          });
          pixelRect.fillColor = color;
          /*pixelRect.onMouseEnter = function(e) {
            this.fillColor = 'red';
            prevColor = color;
          }
          pixelRect.onMouseLeave = function(e) {
            this.fillColor = prevColor;
          }*/
        }
      }

    }
    
    // addGrid
    const gridLayer = new paper.Layer();
    gridLayer.activate();
    //console.log(paper.Project);
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
  }
  componentDidUpdate(prevProps) {
    if (this.state.currentMode === 'draw') {
      paper.project.layers[2].activate();
      const drawTool = new paper.Tool();
      drawTool.activate();
      
      drawTool.onMouseDown = (e) => {
        this.draw(e);
      }
      drawTool.onMouseDrag = (e) => {
        this.draw(e);
      }
    }
    else if (this.state.currentMode === 'build') {
      paper.project.layers[3].activate();
      const buildTool = new paper.Tool();
      buildTool.activate();
      
      let isBuild = true;
      let isEdit = false;
      let buildPath = new paper.Path.Rectangle({
        x: 0, 
        y: 0,
        width: this.state.sizeMyHome[0] * this.state.squareSize,
        height: this.state.sizeMyHome[1] * this.state.squareSize
      });
      buildPath.fillColor = '#ff84af';
		  buildPath.strokeColor = '#00baff';

      let deletBtnBg = new paper.Path.Circle({
        center: [this.state.sizeMyHome[0] * this.state.squareSize, 0], 
        radius: this.state.squareSize * 0.8
      });
      deletBtnBg.fillColor = '#555';
      
      let deletBtnIcon = new paper.PointText(new paper.Point(this.state.sizeMyHome[0] * this.state.squareSize - (this.state.squareSize * 1.6 - 6) / 2, (this.state.squareSize * 1.6 - 6) / 2));
      deletBtnIcon.fillColor = '#eee';
      deletBtnIcon.content = '×';

      let deletBtn = new paper.Group([deletBtnBg, deletBtnIcon]);
      deletBtn.name = 'deletBtn';

      let itemSet = new paper.Group([buildPath, deletBtn]);



      buildTool.onMouseMove = (e) => {
        if (isBuild) {
          itemSet.position = e.point;
        }
      }
      buildTool.onMouseDown = (e) => {
        if (isBuild) {
          itemSet.position.x = e.point.x - (e.point.x - this.state.mapPadding - (this.state.sizeMyHome[0] * this.state.squareSize / 2 + this.state.squareSize * 0.4)) % this.state.squareSize;
          itemSet.position.y = e.point.y - (e.point.y - this.state.mapPadding - (this.state.sizeMyHome[1] * this.state.squareSize / 2 + this.state.squareSize * 0.4)) % this.state.squareSize;
          isBuild = false;
        }
        else {
          const hitResult = paper.project.layers[3].hitTest(e.point, {
            segments: true,
            stroke: true,
            fill: true,
            tolerance: 5
          });
          if (!hitResult) {
            isEdit = false;
            return;
          }
          else {
            if (!(hitResult.item.parent.name === 'deletBtn')) {
              itemSet = hitResult.item.parent;
              isEdit = true;
            }
            else {
              hitResult.item.parent.parent.remove();
            }
          }
        }
      }
      buildTool.onMouseDrag = (e) => {
        if (isEdit) {
          itemSet.position = e.point;
        }
      }
      buildTool.onMouseUp = (e) => {
        if (isEdit) {
          itemSet.position.x = e.point.x - (e.point.x - this.state.mapPadding - (this.state.sizeMyHome[0] * this.state.squareSize / 2 + this.state.squareSize * 0.4)) % this.state.squareSize;
          itemSet.position.y = e.point.y - (e.point.y - this.state.mapPadding - (this.state.sizeMyHome[1] * this.state.squareSize / 2 + this.state.squareSize * 0.4)) % this.state.squareSize;
        }
        
      }
    }
  }
  isEditableArea(point) {
    if (point.x > this.state.mapPadding && point.x < this.state.squareSize * this.state.squareCount * this.state.mapHUnit + this.state.mapPadding && point.y > this.state.mapPadding && point.y < this.state.squareSize * this.state.squareCount * this.state.mapVUnit + this.state.mapPadding) {
      return true;
    }
    else {
      return false;
    }
  }
  startDraw(e) {
    this.setState({
      currentMode: 'draw'
    });
  }
  startBuild(e) {
    this.setState({
      currentMode: 'build'
    });
  }
  draw(e) {
    if (this.isEditableArea(e.point)) {
      const drawRect = new paper.Path.Rectangle({
        x: e.point.x - (e.point.x - this.state.mapPadding) % this.state.squareSize, 
        y: e.point.y - (e.point.y - this.state.mapPadding) % this.state.squareSize,
        width: this.state.squareSize,
        height: this.state.squareSize
      });
      drawRect.fillColor = this.state.colorG1[Math.floor(Math.random() * this.state.colorG1.length)];
    }
  }
  render() {
    return (
      <div className='container'>
        <aside>
          <div className='mainTools'>
            <ul>
              <li>
                <button id='draw'>
                  塗
                </button>
              </li>
              <li>
                <button id='build'>
                  蓋
                </button>
              </li>
              <li>
                <button id='grow'>
                  種
                </button>
              </li>
            </ul>
          </div>
          
          <div className='subTools'>
            <ul>
              <li>
                <button id='colorG1' onClick={(e) => this.startDraw(e)}>
                  G1
                </button>
              </li>
              <li>
                <button id='sizeMyHome' onClick={(e) => this.startBuild(e)}>
                  My Home
                </button> 
              </li>
            </ul>
            <hr />
            <ul>
              <li>
                <button id=''>
                  塗
                </button>
              </li>
              <li>
                <button id=''>
                  蓋
                </button>
              </li>
              <li>
                <button id=''>
                  種
                </button>
              </li>
            </ul>
          </div>
        </aside>
        <canvas id='canvas'>
        </canvas>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
