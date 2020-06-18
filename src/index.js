import React from 'react';
import ReactDOM from 'react-dom';
import paper from 'paper';
import setting from './setting.json';
import { toolData } from './toolData.js';
import MenuModes from './MenuModes.js';
import MenuTools from './MenuTools.js';
import MenuItems from './MenuItems.js';
import sampleImg from './img/test.jpg';
import i18n from "i18next";
import { Translation } from 'react-i18next';
import './i18n';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.urlInput = React.createRef();
    this.upLoadImg = this.upLoadImg.bind(this);
    this.loadMapFromUrl = this.loadMapFromUrl.bind(this);
    this.downLoadCanvas = this.downLoadCanvas.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.changeTool = this.changeTool.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.state = {
      language: i18n.language,
      isImgUploaded: false,
      canvasSizeX: setting.squareSize * setting.squarePerBlock * setting.mapXBlock + setting.mapPadding * 2,
      canvasSizeY: setting.squareSize * setting.squarePerBlock * setting.mapYBlock + setting.mapPadding * 2,
      squareSize: setting.squareSize,
      currentMode: [...toolData][0][0],
      currentModeData: [...toolData][0][1],
      currentTool: [...[...toolData][0][1].tools][0][0],
      currentItem: [...[...toolData][0][1].colors][0][0],
      customColor: [...[...toolData][0][1].colors][[...toolData][0][1].colors.size - 1][1].color[0]
    };
  }
  changeLanguage(e) {
    e.target.parentElement.querySelectorAll('button').forEach((btn)=>{
      btn.classList.remove('active');
    });
    
    e.target.classList.add('active');
    i18n.changeLanguage(e.target.name);
  }
  componentDidUpdate(prevProps) {
    if (paper.project) {
      if (this.state.currentMode === 'draw') {
        this.handleDraw();
      }
      else if (this.state.currentMode === 'build' || this.state.currentMode === 'plant') {
        this.handleBuildAndPlant();
      }
    }
  }
  upLoadImg(e) {
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
    const uploadImg = e.target.files[0];
    const reader = new FileReader();
    const that = this;
    if (uploadImg) {
      const img = new Image();
      img.src = window.URL.createObjectURL(uploadImg);
      img.addEventListener('load', () => {
        const errorMessageDiv = document.getElementById('img-input-error');
        if ((img.width !== setting.imgWidth || img.height !== setting.imgHeight) && (parseInt(img.width / img.height * 1000) !== parseInt(setting.imgWidth / setting.imgHeight * 1000)))  {
          errorMessageDiv.classList.add('active');
          return false;
        }
        else {
          reader.readAsDataURL(uploadImg);
        }
      });
    }
    reader.addEventListener("load", function () {
      that.setState({
        isImgUploaded: true
      });
      that.renderMap(reader.result);
    }, false);
  }
  loadMapFromUrl(e) {
    document.querySelectorAll('.error-message').forEach((msg) => {
      msg.classList.remove('active');
    });
    const that = this;
    let url;
    if (e.target.id === 'mapUseDefault') {
      url = sampleImg;
    }
    else {
      url = this.urlInput.current.value;
    }
    fetch(url)
    .then(function(response) {
      return response.blob()
    })
    .then(function(blob) {
      if (!blob.type.includes('image/jpeg')) {
        const errorMessageDiv = document.getElementById('url-error');
        errorMessageDiv.classList.add('active');
      }
      else {
        const img = new Image();
        img.src = url;
        img.addEventListener('load', () => {
          const errorMessageDiv = document.getElementById('url-error');
          if ((img.width !== setting.imgWidth || img.height !== setting.imgHeight) && (parseInt(img.width / img.height * 1000) !== parseInt(setting.imgWidth / setting.imgHeight * 1000))) {
            errorMessageDiv.classList.add('active');
            return false;
          }
          else {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.addEventListener("load", function () {
              that.setState({
                isImgUploaded: true
              });
              that.renderMap(reader.result);
            }, false);
          }
        });
      }
    })
    .catch(function(error) {
      const errorMessageDiv = document.getElementById('url-fetch-error');
      errorMessageDiv.classList.add('active');
    });
  }
  openModal() {
    document.body.classList.add("modal-open");
  }
  closeModal() {
    document.body.classList.remove("modal-open");
  }
  downLoadCanvas() {
    const canvas = this.canvas.current;
    const img = canvas.toDataURL('image/jpg');
    let a = document.createElement('a');
    a.href = img;
    a.download = 'myIslandImg.jpg';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  renderMap(url) {
    const canvas = this.canvas.current;
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
      let imgRatio = 1;
      if (raster.width !== setting.imgWidth) {
        imgRatio = raster.width / setting.imgWidth;
      }
      mapLayer.activate();
      const mapRasterWidth = setting.sampleEndX * imgRatio - setting.sampleStartX * imgRatio;
      const mapRasterHeight = setting.sampleEndY * imgRatio - setting.sampleStartY * imgRatio;
      const mapRaster = raster.getSubRaster(new paper.Rectangle(setting.sampleStartX * imgRatio, setting.sampleStartY * imgRatio, mapRasterWidth, mapRasterHeight));
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
    const currentModeData = toolData.get(currentMode);
    let currentItem;
    if (currentMode === 'draw') {
      currentItem = [...currentModeData.colors][0][0];
    }
    else {
      currentItem = null;
    }
    this.setState({
      currentMode: currentMode,
      currentModeData: currentModeData,
      currentTool: [...currentModeData.tools][0][0],
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
      currentItem = [...this.state.currentModeData.tools.get(currentTool).items][0][0];
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
    paper.project.layers.buildLayer.children.forEach((itemSet)=>{
      itemSet.children.deletBtn.opacity = 0;
    });
    paper.project.layers.drawLayer.activate();
    const drawTool = new paper.Tool();
    drawTool.activate();
    let size, colors;
    const thisTool = this.state.currentModeData.tools.get(this.state.currentTool);
    size = thisTool.size ? thisTool.size : 0;
    if (this.state.currentItem === 'colorCustom') {
      colors = [this.state.customColor];
    }
    else {
      colors = this.state.currentModeData.colors.get(this.state.currentItem).color;
    }
    const refPointDist = (size - 1) * setting.squareSize;

    if (!paper.project.activeLayer.children.brush) {
      this.generateHoverSquare(size);
    }
    else {
      if (paper.project.activeLayer.children.brush.width / this.state.squareSize !== size) {
        paper.project.activeLayer.children.brush.remove();
        this.generateHoverSquare(size);
      }
    }
    let brushSquare = paper.project.activeLayer.children.brush;
    drawTool.onMouseMove = (e) => {
      this.getHoverSquarePosition(e, size, refPointDist, brushSquare);
    }
    drawTool.onMouseDown = (e) => {
      if (this.isEditableArea(e.point)) {
        this.draw(e, size, refPointDist, colors);
      }
    }
    drawTool.onMouseDrag = (e) => {
      if (this.isEditableArea(e.point)) {
        this.draw(e, size, refPointDist, colors);
        paper.project.activeLayer.children.brush.remove();
        this.generateHoverSquare(size);
        brushSquare = paper.project.activeLayer.children.brush;
        this.getHoverSquarePosition(e, size, refPointDist, brushSquare);
      }
    }
    drawTool.onMouseUp = (e) => {
      paper.project.activeLayer.children.brush.remove();
      this.generateHoverSquare(size);
      brushSquare = paper.project.activeLayer.children.brush;
      this.getHoverSquarePosition(e, size, refPointDist, brushSquare);
    }
  }
  generateHoverSquare(size) {
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
  getHoverSquarePosition(e, size, refPointDist, brushSquare) {
    let point = new paper.Point();
    point.x = e.point.x - (e.point.x - setting.mapPadding) % this.state.squareSize - refPointDist + this.state.squareSize * size / 2;
    point.y = e.point.y - (e.point.y - setting.mapPadding) % this.state.squareSize - refPointDist + this.state.squareSize * size / 2;
    brushSquare.position = point;
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
    let isBuild, isEdit, itemSet;
    if (this.state.currentItem) {
      let size;
      isBuild = true;
      isEdit = false;
      let buildPath;
      let baseBlock;
      let buildItem;
      const currentTool = this.state.currentTool;
      const thisTool = this.state.currentModeData.tools.get(currentTool);
      const thisItem = thisTool.items.get(this.state.currentItem);
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
        buildItem = new paper.Group([buildPath]);
      }
      else if (this.state.currentMode === 'plant') {
        size = thisTool.size;
        baseBlock = new paper.Shape.Rectangle({
          x: 0, 
          y: 0,
          width: size[0] * this.state.squareSize,
          height: size[1] * this.state.squareSize
        });
        buildItem = new paper.Group([baseBlock]);

        if (this.state.currentTool === 'tree') {
          buildPath = new paper.Shape.Circle(new paper.Point(size[0] * this.state.squareSize / 2, size[1] * this.state.squareSize / 2), size[0] * this.state.squareSize * 0.7 / 2);
          buildPath.fillColor = thisItem.color ? thisItem.color : thisTool.color;
          buildPath.strokeColor = setting.strokeColorPlant;
          buildPath.opacity = 0.5;
        }
        else if (this.state.currentTool === 'flower') {
          buildPath = new paper.Shape.Circle(new paper.Point(size[0] * this.state.squareSize / 2, size[1] * this.state.squareSize / 2), size[0] * this.state.squareSize / 2);
          buildPath.fillColor = thisItem.item;
          buildPath.strokeColor = setting.strokeColorPlant;
        }
        buildItem.addChild(buildPath);
      }
      
      // add img
      if (thisItem.image && (thisTool.tool !== 'bridge' && thisTool.tool !== 'slope')) {
        const buildImage = new paper.Group();
        const that = this;
        buildImage.importSVG(process.env.PUBLIC_URL + '/' + thisItem.image, function(item) {
          const squareSize = that.state.squareSize;
          const imageSizeSquare = currentTool === 'tree' ? 1 : 2.8;
          const scale =  squareSize * imageSizeSquare / buildImage.bounds.size._height;
          buildImage.scale(scale);
          buildImage.position = buildItem.position;
          buildImage.locked = true;
          buildItem.addChild(buildImage);
        });
      }
      let deletBtnBg = new paper.Shape.Circle({
        center: [buildItem.bounds.size._width, 0], 
        radius: this.state.squareSize * 0.8
      });
      deletBtnBg.fillColor = '#555';
      let deletBtnIcon = new paper.PointText(new paper.Point(buildItem.bounds.size._width - (this.state.squareSize * 1.6 - 6) / 2, (this.state.squareSize * 1.6 - 6) / 2));
      deletBtnIcon.fillColor = '#eee';
      deletBtnIcon.content = '×';
      deletBtnIcon.locked = true;
      let deletBtn = new paper.Group([deletBtnBg, deletBtnIcon]);
      deletBtn.name = 'deletBtn';
      deletBtn.opacity = 0;
      deletBtn.locked = true;
      itemSet = new paper.Group([buildItem, deletBtn]);
      itemSet.position = [setting.hideDist * -1, setting.hideDist * -1];
    }
    else {
      isBuild = false;
      isEdit = true;
    }
    buildTool.onMouseMove = (e) => {
      if (isBuild) {
        itemSet.position.x = this.getSnapPoint(e.point.x, true, itemSet);
        itemSet.position.y = this.getSnapPoint(e.point.y, false, itemSet);
      }
    }
    buildTool.onMouseDown = (e) => {
      if (isBuild) {
        itemSet.position.x = this.getSnapPoint(e.point.x, true, itemSet);
        itemSet.position.y = this.getSnapPoint(e.point.y, false, itemSet);
        isBuild = false;
        itemSet.data.built = true;
      }
      else {
        paper.project.activeLayer.children.forEach((itemSet) => {
          itemSet.children.deletBtn.opacity = 0;
        });
        const hitResult = paper.project.layers.buildLayer.hitTest(e.point, {
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
            itemSet.children.deletBtn.opacity = 1;
            itemSet.children.deletBtn.locked = false;
          }
          else {
            hitResult.item.parent.parent.remove();
            itemSet = null;
          }
        }
      }
    }
    buildTool.onMouseDrag = (e) => {
      if (isEdit && itemSet) {
        itemSet.position.x = this.getSnapPoint(e.point.x, true, itemSet);
        itemSet.position.y = this.getSnapPoint(e.point.y, false, itemSet);
      }
    }
    buildTool.onMouseUp = (e) => {
      this.setState({
        currentItem: null
      });
      document.querySelectorAll('button.item').forEach(function(btn){
        btn.blur();
      });
    }
  }
  getSnapPoint(point, isX, itemSet) {
    let snapPoint;
    if (isX) {
      snapPoint = point - (point - itemSet.bounds._width / 2 - setting.mapPadding) % this.state.squareSize;
    }
    else {
      snapPoint = point - (point - itemSet.bounds._height / 2 - setting.mapPadding) % this.state.squareSize;
    }
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
          <div className='lang-menu'>
            <button name='zh-TW' className={(this.state.language === 'zh-TW' || this.state.language === 'zh') ? 'active' : ''} onClick={this.changeLanguage}>台灣華語</button>
            <button name='en' className={(this.state.language !== 'zh-TW' && this.state.language !== 'zh' && this.state.language !== 'ja') ? 'active' : ''} onClick={this.changeLanguage}>English</button>
            <button name='ja' className={this.state.language === 'ja' ? 'active' : ''} onClick={this.changeLanguage}>日本語</button>
          </div>
          <Translation>
            {(t, { i18n }) => 
              <div>
                <p>{t('This is a simple tool for Animal Crossing')}</p>
                <p>{t('Upload your map screenshot to start')}{t('or you can')}<button className='link' id='mapUseDefault' onClick={this.loadMapFromUrl}>{t('try with my map')}</button>{t('period')}</p>
                <p>{t('This is for desktop browser')}</p>
              </div>
            }
          </Translation>
          <img src={sampleImg} alt='Map sample' className='island-map' />
          <Translation>
            {(t, { i18n }) => 
              <form>
                <input type='file' accept='image/.jpg, .jpeg' id='img-input' onChange={this.upLoadImg} />
                <label htmlFor='img-input' className='btn fake-input'>{t('Upload image')}</label>
                <div id='img-input-error' className='error-message'>{t('Sorry this seems not a correct map image')}</div>
                <div className='or'>{t('or')}</div>
                <div className='use-url'>
                  <label>{t('Use the URL of uploaded image')}</label>
                  <input type='text' ref={this.urlInput}  /> 
                  <button type='button' id='mapFromUrl' onClick={this.loadMapFromUrl}>{t('Confirm')}</button>
                </div>
                <div id='url-error' className='error-message'>{t('Sorry this seems not a correct map image url')}</div>
                <div id='url-fetch-error' className='error-message'>{t('Sorry can not get image from URL')}</div>
              </form>
            }
          </Translation>
        </div>
      )
    }
    else {
      return (
        <div className='wrapper'>
          <div className='editor'>
            <aside className='tool-aside'>
              <div className='modes'>
                <MenuModes toolData={toolData} currentMode = {this.state.currentMode} onClick={this.changeMode} />
              </div>
              
              <div className='tools'>
                <MenuTools currentTool={this.state.currentTool} currentModeData={this.state.currentModeData} onClick={this.changeTool} />
                <MenuItems currentMode={this.state.currentMode} currentModeData={this.state.currentModeData} currentTool={this.state.currentTool} currentItem={this.state.currentItem} onClick={this.changeItem} customColor={this.state.customColor} changeColor={this.changeColor} /> 
              </div>
            </aside>
            <canvas id='canvas' ref={this.canvas}>
            </canvas>
            <aside className='sub-aside'>
              <Translation>
                {(t, { i18n }) => 
                  <ul>
                    <li>
                      <button type='button' title={t('Info')} onClick={this.openModal}>
                        <img src={process.env.PUBLIC_URL + '/icon_question.svg'} alt={t('Info')} />
                      </button>
                    </li>
                    <li>
                      <button type='button' title={t('Download map')} onClick={this.downLoadCanvas}>
                        <img src={process.env.PUBLIC_URL + '/icon_download.svg'} alt={t('Download map')} />
                      </button>
                    </li>
                  </ul>
                }
              </Translation>
            </aside>
          </div>
          <Translation>
            {(t, { i18n }) => 
              <div id='info-modal'>
                <button className='close-modal round' onClick={this.closeModal}>×</button>
                <h1><div>Lazy Island Planner</div></h1>
                <p>{t('This is a very simple tool')}<strong>{t('No undo')}{t('No save')}</strong></p>
                <p>{t('You can try other great tools')}</p>
                <ul>
                  <li>
                    <a href='https://eugeneration.github.io/HappyIslandDesigner/' target='_blank'>Happy Island Designer</a>
                  </li>
                  <li>
                    <a href='https://bobacupcake.itch.io/island-planner' target='_blank'>Island Planner</a>
                  </li>
                </ul>
                <button className='btn close-modal' onClick={this.closeModal}>{t('Close')}</button>
              </div>
            }
          </Translation>
        </div>
      );
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
