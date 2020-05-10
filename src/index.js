import React from 'react';
import ReactDOM from 'react-dom';
import paper from 'paper';
import setting from './setting.json';
import toolData from './toolData.json';
import './index.css';

function MenuModes(props) {
  const toolData = props.toolData;
  const listItems = toolData.map((mode, i) =>
    <li key={i}>
      <MenuBtn data={mode} type='mode' isActive={props.currentMode === mode.mode} onClick={props.onClick} />
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

function MenuBtn(props) {
  const id = props.data.mode || props.data.tool || props.data.item || props.data.colorName;
  let className;
  const isActive = props.isActive ? 'active' : '';
  if (props.data.colorName) {
    className = `color ${props.data.colorName} ${isActive}`;
  }
  else if (props.data.item) {
    className = `item ${props.type} ${props.data.item} ${isActive}`;
  }
  else {
    className = `${props.type} ${isActive}`;
  }
  if (props.data.image) {
    if (id === 'colorCustom') {
      return (
        <button id={id} onClick={props.onClick} className={className}>
          <label>
            <input type='color' defaultValue={props.customColor} onChange={props.changeColor} />
            <img alt={id} src={props.data.image} />
          </label>
        </button>
      )
    }
    else {
      return (
        <button id={id} onClick={props.onClick} className={className}>
          <img alt={id} src={props.data.image} />
        </button>
      )
    }
  }
  else {
    const colorStyle = {color: props.data.item};
    return (
      <button id={props.data.mode} onClick={props.onClick} className={className}>
        <div className="colorBlock" style={colorStyle}></div>
      </button>
    )
  }
}

function MenuTools(props) {
  const listItems = props.currentModeData.tools.map((tool, i) =>
    <li key={i}>
      <MenuBtn data={tool} type='tool' isActive={props.currentTool === tool.tool} onClick={props.onClick} />
    </li>
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

function MenuItems(props) {
  let menuItems, compareTarget;
  const type = props.currentTool;
  if (props.currentMode === 'draw') {
    menuItems = props.currentModeData.colors;
    compareTarget = 'colorName';
  }
  else {
    const currentTool = props.currentModeData.tools.find((data) => {
        if (data.tool === props.currentTool) {
          return data;
        }
      },
    );
    menuItems = currentTool.items;
    compareTarget = 'item';
  }
  const listItems = menuItems.map((tool, i) =>
    <li key={i}>
      <MenuBtn data={tool} type={type} isActive={tool[compareTarget] === props.currentItem} onClick={props.onClick} customColor={props.customColor} changeColor={props.changeColor} />
    </li>
  );
  return (
    <div className="menuItems">
      <hr />
      <ul>
        {listItems}
      </ul>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeMode = this.changeMode.bind(this);
    this.changeTool = this.changeTool.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.state = {
      canvasSizeX: setting.squareSize * setting.squarePerBlock * setting.mapXBlock + setting.mapPadding * 2,
      canvasSizeY: setting.squareSize * setting.squarePerBlock * setting.mapYBlock + setting.mapPadding * 2,
      squareSize: setting.squareSize,
      currentMode: toolData.toolData[0].mode,
      currentModeData: toolData.toolData[0],
      currentTool: toolData.toolData[0].tools[0].tool,
      currentItem: toolData.toolData[0].colors[0].colorName,
      customColor: toolData.toolData[0].colors[toolData.toolData[0].colors.length - 1].color[0]
    };
  }
  componentDidMount() {
    const canvas = document.getElementById('canvas');
    canvas.width = this.state.canvasSizeX;
    canvas.height = this.state.canvasSizeY;
    paper.setup(canvas);

    const url = 'test.jpg';
    let raster = new paper.Raster(url);
    const mapLayer = new paper.Layer();
    mapLayer.name = 'mapLayer';
    const drawLayer = new paper.Layer();
    drawLayer.name = 'drawLayer';
    const buildLayer = new paper.Layer();
    buildLayer.name = 'buildLayer';
    mapLayer.activate();
    const bgRect = new paper.Path.Rectangle({
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    });
    bgRect.fillColor = setting.colorBg;
    raster.onLoad = () => {
      mapLayer.activate();
      const mapRasterWidth = setting.sampleEndX - setting.sampleStartX;
      const mapRasterHeight = setting.sampleEndY - setting.sampleStartY;
      const mapRaster = raster.getSubRaster(new paper.Rectangle(setting.sampleStartX, setting.sampleStartY, mapRasterWidth, mapRasterHeight));
      raster.remove();
      mapRaster.visible = false;
      mapRaster.size = new paper.Size(setting.squarePerBlock * setting.mapXBlock, setting.squarePerBlock * setting.mapYBlock);
      for (let y = 0; y < mapRaster.height; y++) {
        for(let x = 0; x < mapRaster.width; x++) {
          const color = mapRaster.getPixel(x, y);
          const pixelRect = new paper.Path.Rectangle({
            x: x * this.state.squareSize + setting.mapPadding, 
            y: y * this.state.squareSize + setting.mapPadding,
            width: this.state.squareSize,
            height: this.state.squareSize
          });
          pixelRect.fillColor = color;
        }
      }
    }
    this.renderGrid();
    this.componentDidUpdate();
  }
  componentDidUpdate(prevProps) {
    console.log(this.state.currentMode);
    if (this.state.currentMode === 'draw') {
      this.handleDraw();
    }
    else if (this.state.currentMode === 'build' && this.state.currentItem) {
      this.handleBuildAndPlant();
      
    }
  }
  renderGrid() {
    const gridLayer = new paper.Layer();
    gridLayer.name = 'gridLayer';
    gridLayer.activate();
    let gridLine;
    const dashStroke = [this.state.squareSize + 5, this.state.squareSize - 2]
    for(let x = 0; x <= setting.squarePerBlock * setting.mapXBlock; x++) {
      if (x % setting.squarePerBlock === 0) {
        gridLine = new paper.Path.Line(new paper.Point(x * this.state.squareSize + setting.mapPadding - 0.5, 0), new paper.Point(x * this.state.squareSize + setting.mapPadding - 0.5, this.state.canvasSizeY));
        gridLine.strokeWidth = 3;
        gridLine.dashArray = dashStroke;
        gridLine.strokeColor = setting.colorMainGrid;
      }
      else {
        gridLine = new paper.Path.Line(new paper.Point(x * this.state.squareSize + setting.mapPadding - 0.5, setting.mapPadding), new paper.Point(x * this.state.squareSize + setting.mapPadding - 0.5, this.state.canvasSizeY - setting.mapPadding));
        gridLine.strokeColor = setting.colorGrid;
      }
      gridLine.locked = true;
    }
    for(let y = 0; y <= setting.squarePerBlock * setting.mapYBlock; y++) {
      if (y % setting.squarePerBlock === 0) {
        gridLine = new paper.Path.Line(new paper.Point(0, y * this.state.squareSize + setting.mapPadding - 0.5), new paper.Point(this.state.canvasSizeX, y * this.state.squareSize + setting.mapPadding - 0.5));
        gridLine.strokeWidth = 3;
        gridLine.dashArray = dashStroke;
        gridLine.strokeColor = setting.colorMainGrid;
      }
      else {
        gridLine = new paper.Path.Line(new paper.Point(setting.mapPadding, y * this.state.squareSize + setting.mapPadding - 0.5), new paper.Point(this.state.canvasSizeX - setting.mapPadding, y * this.state.squareSize + setting.mapPadding - 0.5));
        gridLine.strokeColor = setting.colorGrid;
      }
      gridLine.locked = true;
    }
    for (let i = 0; i < setting.mapYBlock; i++) {
      const meridianMark = new paper.PointText(new paper.Point(setting.mapPadding / 5, this.state.squareSize * setting.squarePerBlock * (i + 0.5) + setting.mapPadding ));
      meridianMark.fillColor = setting.colorGridMark;
      meridianMark.fontSize = this.state.squareSize * 2;
      meridianMark.content = String.fromCharCode(65 + i);
      meridianMark.fontWeight = 'bold';
    }
    for (let j = 0; j < setting.mapXBlock; j++) {
      let parallelMark = new paper.PointText(new paper.Point(this.state.squareSize * setting.squarePerBlock * (j + 0.5) + setting.mapPadding, this.state.squareSize * setting.squarePerBlock * setting.mapYBlock + setting.mapPadding * 1.8));
      parallelMark.fillColor = setting.colorGridMark;
      parallelMark.fontSize = this.state.squareSize * 2;
      parallelMark.content = j + 1;
      parallelMark.fontWeight = 'bold';
    }
  }
  changeMode(e) {
    const target = e.target.closest('button');
    const currentMode = target.getAttribute('id');
    const currentModeData = toolData.toolData.find((data) => {
      if (data.mode === currentMode) {
        return data;
      }
    });
    let currentItem;
    if (currentMode === 'draw') {
      currentItem = currentModeData.colors[0].colorName;
    }
    else {
      currentItem = currentModeData.tools[0].items[0].item;
    }
    this.setState({
      currentMode: currentMode,
      currentModeData: currentModeData,
      currentTool: currentModeData.tools[0].tool,
      currentItem: currentItem
    });
  }
  changeTool(e) {
    const target = e.target.closest('button');
    const currentTool = target.getAttribute('id');
    let currentItem = this.state.currentItem;
    if (this.state.currentMode !== 'draw') {
      const toolData = this.state.currentModeData.tools.find((data) => {
        if (data.tool === currentTool) {
          return data;
        }
      });
      currentItem = toolData.items[0].item;
    }
    this.setState({
      currentTool: currentTool,
      currentItem: currentItem
    });
  }
  changeItem(e) {
    const target = e.target.closest('button');
    const currentItem = target.getAttribute('id');
    this.setState({
      currentItem: currentItem
    });

    // remove not built items
    const checkPoint = new paper.Point(this.state.squareSize / 2 - setting.hideDist, this.state.squareSize / 2 - setting.hideDist);
    const hitResult = paper.project.layers.buildLayer.hitTest(checkPoint, {
      segments: true,
      stroke: true,
      fill: true
    });
    if (hitResult) {
      hitResult.item.parent.remove();
    }
  }
  changeColor(e) {
    this.setState({
      customColor: e.target.value
    });
  }
  isEditableArea(point) {
    if (point.x > setting.mapPadding && point.x < this.state.squareSize * setting.squarePerBlock * setting.mapXBlock + setting.mapPadding && point.y > setting.mapPadding && point.y < this.state.squareSize * setting.squarePerBlock * setting.mapYBlock + setting.mapPadding) {
      return true;
    }
    else {
      return false;
    }
  }
  handleDraw() {
    paper.project.layers.drawLayer.activate();
    const drawTool = new paper.Tool();
    drawTool.activate();
    
    drawTool.onMouseDown = (e) => {
      if (this.isEditableArea(e.point)) {
        this.draw(e);
      }
    }
    drawTool.onMouseDrag = (e) => {
      if (this.isEditableArea(e.point)) {
        this.draw(e);
      }
    }
  }
  draw(e) {
    paper.project.layers.drawLayer.activate();
    // get color data 
    let size, colors;
    let point = new paper.Point(0, 0);
    let testPoint = new paper.Point(0, 0);
    const thisTool = this.state.currentModeData.tools.find((tool) => {
      if (tool.tool === this.state.currentTool) {
        return tool;
      }
    });
    size = thisTool.size ? thisTool.size : 0;
    if (this.state.currentItem === 'colorCustom') {
      colors = [this.state.customColor];
    }
    else {
      const thisColors = this.state.currentModeData.colors.find((color) => {
        if (color.colorName === this.state.currentItem) {
          return color;
        }
      });
      colors = thisColors.color;
    }
    const refPointDist = (size - 1) * setting.squareSize;

    point.x = e.point.x - (e.point.x - setting.mapPadding) % setting.squareSize - refPointDist;
    point.y = e.point.y - (e.point.y - setting.mapPadding) % setting.squareSize - refPointDist;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const drawRect = new paper.Path.Rectangle({
          x: point.x + i * setting.squareSize, 
          y: point.y + j * setting.squareSize,
          width: setting.squareSize,
          height: setting.squareSize
        });
        testPoint.x = point.x + i * setting.squareSize + setting.squareSize/2;
        testPoint.y = point.y + j * setting.squareSize + setting.squareSize/2;
        let hitResult = paper.project.layers[2].hitTest(testPoint, {            
          fill: true
        });
        if (hitResult) {
          hitResult.item.remove();
        }
        drawRect.fillColor = colors[Math.floor(Math.random() * colors.length)];
      }
    }
  }
  /*drawHover(e) {
    paper.project.layers.hoverLayer.activate();
    let size;
    let hasHoverBlock = false;
    console.log(paper.project.activeLayer._children.length);
    const thisTool = this.state.currentModeData.tools.find((tool) => {
      if (tool.tool === this.state.currentTool) {
        return tool;
      }
    });
    size = thisTool.size ? thisTool.size : 0;
    const refPointDist = (size - 1) * setting.squareSize;
    if (paper.project.activeLayer._children.length == 0) {
      const drawRect = new paper.Path.Rectangle({
        x: 0, 
        y: 0,
        width: setting.squareSize,
        height: setting.squareSize
      });
      drawRect.strokeColor = 'rgba(255,255,255,0.8)';
      drawRect.name = 'hoverBlock';
    }
    const hoverBlock = paper.project.activeLayer.children.hoverBlock;
    hoverBlock.position.x = e.point.x - (e.point.x - setting.mapPadding) % setting.squareSize - refPointDist;
    hoverBlock.position.y = e.point.y - (e.point.y - setting.mapPadding) % setting.squareSize - refPointDist;
  }*/
  handleBuildAndPlant() {
    paper.project.layers.buildLayer.activate();
    const buildTool = new paper.Tool();
    buildTool.activate();
    let size;
    let isBuild = true;
    let isEdit = false;
    const thisTool = this.state.currentModeData.tools.find((tool) => {
      if (tool.tool === this.state.currentTool) {
        return tool;
      }
    });
    const thisItem = thisTool.items.find((item) => {
      if (item.item === this.state.currentItem) {
        return item;
      }
    });
    size = thisItem.size;
    let buildPath = new paper.Path.Rectangle({
      x: 0, 
      y: 0,
      width: size[0] * this.state.squareSize,
      height: size[1] * this.state.squareSize
    });
    buildPath.fillColor = thisItem.color ? thisItem.color : thisTool.color;
    buildPath.strokeColor = '#00baff';
    let deletBtnBg = new paper.Path.Circle({
      center: [size[0] * this.state.squareSize, 0], 
      radius: this.state.squareSize * 0.8
    });
    deletBtnBg.fillColor = '#555';
    let deletBtnIcon = new paper.PointText(new paper.Point(size[0] * this.state.squareSize - (this.state.squareSize * 1.6 - 6) / 2, (this.state.squareSize * 1.6 - 6) / 2));
    deletBtnIcon.fillColor = '#eee';
    deletBtnIcon.content = '×';
    let deletBtn = new paper.Group([deletBtnBg, deletBtnIcon]);
    deletBtn.name = 'deletBtn';
    let itemSet = new paper.Group([buildPath, deletBtn]);
    itemSet.position = [setting.hideDist * -1, setting.hideDist * -1];
    buildTool.onMouseMove = (e) => {
      if (isBuild) {
        itemSet.position = e.point;
      }
    }
    buildTool.onMouseDown = (e) => {
      if (isBuild) {
        itemSet.position.x = e.point.x - (e.point.x - setting.mapPadding - (size[0] * this.state.squareSize / 2 + this.state.squareSize * 0.4)) % this.state.squareSize;
        itemSet.position.y = e.point.y - (e.point.y - setting.mapPadding - (size[1] * this.state.squareSize / 2 + this.state.squareSize * 0.4)) % this.state.squareSize;
        isBuild = false;
      }
      else {
        const hitResult = paper.project.layers.buildLayer.hitTest(e.point, {
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
        itemSet.position.x = e.point.x - (e.point.x - setting.mapPadding - (size[0] * this.state.squareSize / 2 + this.state.squareSize * 0.4)) % this.state.squareSize;
        itemSet.position.y = e.point.y - (e.point.y - setting.mapPadding - (size[1] * this.state.squareSize / 2 + this.state.squareSize * 0.4)) % this.state.squareSize;
      }
      this.setState({
        currentItem: null
      });
      document.querySelectorAll('button.item').forEach(function(btn){
        btn.blur();
      });
    }
  }
  render() {
    return (
      <div className='container'>
        <aside>
          <div className='modes'>
            <MenuModes toolData={toolData.toolData} currentMode = {this.state.currentMode} onClick={this.changeMode} />
          </div>
          
          <div className='tools'>
            <MenuTools currentTool={this.state.currentTool} currentModeData={this.state.currentModeData} onClick={this.changeTool} />
            <MenuItems currentMode={this.state.currentMode} currentModeData={this.state.currentModeData} currentTool={this.state.currentTool} currentItem={this.state.currentItem} onClick={this.changeItem} customColor={this.state.customColor} changeColor={this.changeColor} /> 
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
