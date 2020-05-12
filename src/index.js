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
      if (props.type === 'tree') {
        const colorStyle = {background: props.data.color};
        return (
          <button id={id} onClick={props.onClick} className={className} style={colorStyle}>
            <img alt={id} src={props.data.image} />
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
  }
  else {
    let color;
    if (props.type === 'flower') {
      color = props.data.item;
    }
    else {
      color = props.data.color;
    }
    const colorStyle = {background: color};
    return (
      <button id={id} onClick={props.onClick} className={className}>
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
    this.upLoadImg = this.upLoadImg.bind(this);
    this.useDefaultMap = this.useDefaultMap.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.changeTool = this.changeTool.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.state = {
      isImgUploaded: false,
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
  componentDidUpdate(prevProps) {
    if (paper.project) {
      if (this.state.currentMode === 'draw') {
        this.handleDraw();
      }
      else if ((this.state.currentMode === 'build' || this.state.currentMode === 'plant') && this.state.currentItem) {
        this.handleBuildAndPlant();
      }
    }
  }
  selectImg(e) {
    const label = e.target.nextElementSibling;
    const labelVal = label.innerHTML;
		let fileName = '';
		fileName = e.target.value.split('\\').pop();
		if (fileName) {
      label.innerHTML = fileName;
    }
		else {
      label.innerHTML = labelVal;
    }
  }
  upLoadImg() {
    const uploadImg = document.getElementById('img-input').files[0];
    const reader = new FileReader();
    const that = this;
    reader.addEventListener("load", function () {
      that.setState({
        isImgUploaded: true
      });
      that.renderMap(reader.result);
    }, false);
    if (uploadImg) {
      reader.readAsDataURL(uploadImg);
    }
  }
  useDefaultMap() {
    console.log('here');
    const that = this;
    fetch('test.jpg')
    .then(function(response) {
      return response.blob()
    })
    .then(function(blob) {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.addEventListener("load", function () {
        that.setState({
          isImgUploaded: true
        });
        that.renderMap(reader.result);
      }, false);
    });
  }
  renderMap(url) {
    const canvas = document.getElementById('canvas');
    canvas.width = this.state.canvasSizeX;
    canvas.height = this.state.canvasSizeY;
    paper.setup(canvas);
    let raster = new paper.Raster(url);
    const mapLayer = new paper.Layer();
    mapLayer.name = 'mapLayer';
    const drawLayer = new paper.Layer();
    drawLayer.name = 'drawLayer';
    const buildLayer = new paper.Layer();
    buildLayer.name = 'buildLayer';
    mapLayer.activate();
    const bgRect = new paper.Shape.Rectangle({
      x: 0,
      y: 0,
      width: this.state.canvasSizeX,
      height: this.state.canvasSizeY,
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
          const pixelRect = new paper.Shape.Rectangle({
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
    this.clearBrushHover();
    this.clearNotBuiltItem();
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
    this.clearNotBuiltItem();
  }
  changeItem(e) {
    const target = e.target.closest('button');
    const currentItem = target.getAttribute('id');
    this.setState({
      currentItem: currentItem
    });
    this.clearNotBuiltItem();
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
    let size, colors;
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

    if (!paper.project.activeLayer.children.brush) {
      let brush = new paper.Shape.Rectangle({
        x: setting.hideDist * -1, 
        y: setting.hideDist * -1,
        width: size * this.state.squareSize,
        height: size * this.state.squareSize
      });
      brush.fillColor = 'rgba(255,255,255,0.1)';
      brush.strokeColor = 'rgba(255,255,255,0.8)';
      brush.name = 'brush';
    }
    else {
      if (paper.project.activeLayer.children.brush.width / this.state.squareSize !== size) {
        paper.project.activeLayer.children.brush.remove();
        let brush = new paper.Shape.Rectangle({
          x: setting.hideDist * -1, 
          y: setting.hideDist * -1,
          width: size * this.state.squareSize,
          height: size * this.state.squareSize
        });
        brush.fillColor = 'rgba(255,255,255,0.1)';
        brush.strokeColor = 'rgba(255,255,255,0.8)';
        brush.name = 'brush';
      }
    }
    const brushSquare = paper.project.activeLayer.children.brush;
    drawTool.onMouseMove = (e) => {
      let point = new paper.Point();
      point.x = e.point.x - (e.point.x - setting.mapPadding) % this.state.squareSize - refPointDist + this.state.squareSize * size / 2;
      point.y = e.point.y - (e.point.y - setting.mapPadding) % this.state.squareSize - refPointDist + this.state.squareSize * size / 2;
      brushSquare.position = point;
    }
    drawTool.onMouseDown = (e) => {
      if (this.isEditableArea(e.point)) {
        this.draw(e, size, refPointDist, colors);
      }
    }
    drawTool.onMouseDrag = (e) => {
      if (this.isEditableArea(e.point)) {
        this.draw(e, size, refPointDist, colors);
      }
    }
  }
  draw(e, size, refPointDist, colors) {
    paper.project.layers.drawLayer.activate();
    let point = new paper.Point(0, 0);
    let testPoint = new paper.Point(0, 0);
    const brushSquare = paper.project.activeLayer.children.brush;
    point.x = e.point.x - (e.point.x - setting.mapPadding) % this.state.squareSize - refPointDist;
    point.y = e.point.y - (e.point.y - setting.mapPadding) % this.state.squareSize - refPointDist;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const drawRect = new paper.Shape.Rectangle({
          x: point.x + i * this.state.squareSize, 
          y: point.y + j * this.state.squareSize,
          width: this.state.squareSize,
          height: this.state.squareSize
        });
        brushSquare.position = [point.x + size * this.state.squareSize / 2, point.y + size * this.state.squareSize / 2];
        testPoint.x = point.x + i * this.state.squareSize + this.state.squareSize / 2;
        testPoint.y = point.y + j * this.state.squareSize + this.state.squareSize / 2;
        let hitResult = paper.project.layers[2].hitTest(testPoint, {            
          fill: true
        });
        if (hitResult && hitResult.item.name !== 'brush') {
          hitResult.item.remove();
        }
        drawRect.fillColor = colors[Math.floor(Math.random() * colors.length)];
      }
    }
  }
  handleBuildAndPlant() {
    paper.project.layers.buildLayer.activate();
    const buildTool = new paper.Tool();
    buildTool.activate();
    let size;
    let isBuild = true;
    let isEdit = false;
    let buildPath
    const currentTool = this.state.currentTool;
    const thisTool = this.state.currentModeData.tools.find((tool) => {
      if (tool.tool === currentTool) {
        return tool;
      }
    });
    const thisItem = thisTool.items.find((item) => {
      if (item.item === this.state.currentItem) {
        return item;
      }
    });
    if (this.state.currentMode === 'build') {
      size = thisItem.size;

      buildPath = new paper.Shape.Rectangle({
        x: 0, 
        y: 0,
        width: size[0] * this.state.squareSize,
        height: size[1] * this.state.squareSize
      });

      // oblique bridge
      if (this.state.currentItem === 'b45' || this.state.currentItem === 'b135') {
        buildPath.size = [2 * this.state.squareSize, 4 * this.state.squareSize];
        buildPath.rotate(parseInt(this.state.currentItem.replace('b', '')));
      }
      buildPath.fillColor = thisItem.color ? thisItem.color : thisTool.color;
      buildPath.strokeColor = setting.strokeColorBilding;
    }
    else if (this.state.currentMode === 'plant') {
      size = thisTool.size;
      if (this.state.currentTool === 'tree') {
        buildPath = new paper.Shape.Circle(new paper.Point(0, 0), size[0] * this.state.squareSize * 0.7 / 2);
        buildPath.position.x = this.state.squareSize * 1.7;
        buildPath.position.y = this.state.squareSize * 1.2;
        buildPath.fillColor = thisItem.color ? thisItem.color : thisTool.color;
        buildPath.strokeColor = setting.strokeColorPlant;
        buildPath.opacity = 0.5;
      }
      else if (this.state.currentTool === 'flower') {
        buildPath = new paper.Shape.Circle(new paper.Point(size[0] * this.state.squareSize / 2, size[0] * this.state.squareSize / 2), size[0] * this.state.squareSize / 2);
        buildPath.fillColor = thisItem.item;
        buildPath.strokeColor = setting.strokeColorPlant;
      }
    }
    let deletBtnBg = new paper.Path.Circle({
      center: [size[0] * this.state.squareSize, 0], 
      radius: this.state.squareSize * 0.8
    });
    let buildItem = new paper.Group([buildPath])
    if (thisItem.image) {
      const buildImage = new paper.Raster(thisItem.image);
      const squareSize = this.state.squareSize;
      
      const imageSizeSquare = currentTool === 'tree' ? 1 : 2.8;
      buildImage.onLoad = function() {
        buildImage.size = new paper.Size(buildImage.width * squareSize * imageSizeSquare / buildImage.height, squareSize * imageSizeSquare);
        buildImage.position = buildItem.position;
        buildImage.locked = true;
        buildItem.addChild(buildImage);
      };
    }

    deletBtnBg.fillColor = '#555';
    let deletBtnIcon = new paper.PointText(new paper.Point(size[0] * this.state.squareSize - (this.state.squareSize * 1.6 - 6) / 2, (this.state.squareSize * 1.6 - 6) / 2));
    deletBtnIcon.fillColor = '#eee';
    deletBtnIcon.content = '×';
    let deletBtn = new paper.Group([deletBtnBg, deletBtnIcon]);
    deletBtn.name = 'deletBtn';
    let itemSet = new paper.Group([buildItem, deletBtn]);
    itemSet.position = [setting.hideDist * -1, setting.hideDist * -1];
    buildTool.onMouseMove = (e) => {
      if (isBuild) {
        itemSet.position.x = this.getSnapPoint(e.point.x, size[0]);
        itemSet.position.y = this.getSnapPoint(e.point.y, size[1]);
      }
    }
    buildTool.onMouseDown = (e) => {
      if (isBuild) {
        itemSet.position.x = this.getSnapPoint(e.point.x, size[0]);
        itemSet.position.y = this.getSnapPoint(e.point.y, size[1]);
        isBuild = false;
        itemSet.data.built = true;
      }
      else {
        const hitResult = paper.project.layers.buildLayer.hitTest(e.point, {
          segments: true,
          stroke: true,
          fill: true,
          tolerance: 1
        });
        if (!hitResult) {
          isEdit = false;
          return;
        }
        else {
          if (!(hitResult.item.parent.name === 'deletBtn')) {
            itemSet = hitResult.item.parent.parent;
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
        itemSet.position.x = this.getSnapPoint(e.point.x, size[0]);
        itemSet.position.y = this.getSnapPoint(e.point.y, size[1]);
      }
    }
    buildTool.onMouseUp = (e) => {
      if (isEdit) {
        itemSet.position.x = this.getSnapPoint(e.point.x, size[0]);
        itemSet.position.y = this.getSnapPoint(e.point.y, size[1]);
      }
      this.setState({
        currentItem: null
      });
      document.querySelectorAll('button.item').forEach(function(btn){
        btn.blur();
      });
    }
  }
  getSnapPoint(point, size) {
    const snapPoint = point - (point - setting.mapPadding - (size * this.state.squareSize / 2 + this.state.squareSize * 0.4)) % this.state.squareSize;
    return snapPoint;
  }
  clearBrushHover() {
    if (paper.project.layers.drawLayer.children.brush) {
      paper.project.layers.drawLayer.children.brush.remove();
    }
  }
  clearNotBuiltItem() {
    const lastBuild = paper.project.layers.buildLayer.children[paper.project.layers.buildLayer.children.length - 1];
    if (lastBuild && !lastBuild.data.built) {
      lastBuild.remove();
    }
  }
  render() {
    if (!this.state.isImgUploaded) {
      return (
        <div className='intro'>
          <h1><div>Lazy Island Planner</div></h1>
          <p>這是一個給懶人用的《集合啦！動物森友會》島嶼規劃工具。</p>
          <p>上傳你擷取的島嶼地圖畫面（如下圖）即可開始，或<button className='link' onClick={this.useDefaultMap}>先用我的地圖試試看</button>。</p>
          <img src='test.jpg' alt='上傳圖示意圖' className='island-map' />
          <form>
            <input type='file' accept='image/*' id='img-input' onChange={this.selectImg} />
            <label for='img-input' className='fake-input'>選擇檔案</label>
            <div id='error-message'></div>
            <button type='button' className='btn-upload' onClick={this.upLoadImg}>上傳</button>
          </form>
        </div>
      )
    }
    else {
      return (
        <div className='editor'>
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
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
