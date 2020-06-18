(this["webpackJsonplazy-island-planner"]=this["webpackJsonplazy-island-planner"]||[]).push([[0],{1:function(e){e.exports=JSON.parse('{"squareSize":8,"squarePerBlock":16,"mapPadding":50,"mapXBlock":7,"mapYBlock":6,"colorBg":"rgb(119, 214, 194)","colorGrid":"rgba(255, 255, 255, 0.2)","colorMainGrid":"rgba(255, 255, 255, 0.4)","colorGridMark":"#2f9b8b","imgWidth":1280,"imgHeight":720,"sampleStartX":354,"sampleStartY":117,"sampleEndX":953,"sampleEndY":630,"hideDist":500,"strokeColorBilding":"#00baff","strokeColorPlant":"#00ff48"}')},11:function(e,a,t){e.exports=t.p+"static/media/test.5da2d115.jpg"},23:function(e,a,t){e.exports=t(38)},28:function(e,a){},30:function(e,a){},31:function(e,a,t){},38:function(e,a,t){"use strict";t.r(a);var o=t(3),r=t(13),i=t(14),n=t(6),s=t(21),l=t(20),c=t(0),m=t.n(c),u=t(15),d=t.n(u),h=t(2),g=t.n(h),p=t(1),v=new Map([["draw",{mode:"draw",image:"icon_draw.svg",tools:new Map([["brush-S",{tool:"brush-S",image:"icon_brush-S.svg",size:1}],["brush-M",{tool:"brush-M",image:"icon_brush-M.svg",size:2}],["brush-L",{tool:"brush-L",image:"icon_brush-L.svg",size:3}]]),colors:new Map([["colorG1",{colorName:"colorG1",image:"icon_colorG1.jpg",color:["#3c783b","#437c42","#3d783c","#417a40","#458042"]}],["colorG2",{colorName:"colorG2",image:"icon_colorG2.jpg",color:["#42a140","#49a646","#40a03e","#44a63f","#4fa544"]}],["colorG3",{colorName:"colorG3",image:"icon_colorG3.jpg",color:["#5dc549","#5fc647","#5bc746","#6ecd51","#5cc746"]}],["colorSand",{colorName:"colorSand",image:"icon_colorSand.jpg",color:["#f0e8a7","#ece5a2","#ede7a6","#ebe6a1","#eee8b4"]}],["colorWater",{colorName:"colorWater",image:"icon_colorWater.jpg",color:["#78d4c3","#7bd8c3","#7dd9c0","#79d6c1","#76d5c3"]}],["colorRock",{colorName:"colorRock",image:"icon_colorRock.jpg",color:["#6e7484","#818793","#6e7689","#6f7684","#747788"]}],["colorCustom",{colorName:"colorCustom",image:"icon_palette.svg",color:["#b0a07c"]}]])}],["build",{mode:"build",image:"icon_build.svg",tools:new Map([["building",{tool:"building",image:"icon_building.svg",color:"#544f40",items:new Map([["home",{item:"home",image:"icon_home.svg",size:[5,4],color:"#f784ae"}],["house",{item:"house",image:"icon_house.svg",size:[4,4],color:"#f8b616"}],["store",{item:"store",image:"icon_store.svg",size:[7,4]}],["apparel",{item:"apparel",image:"icon_apparel.svg",size:[5,4]}],["museum",{item:"museum",image:"icon_museum.svg",size:[7,4]}],["infoCenter",{item:"infoCenter",image:"icon_infoCenter.svg",size:[12,10]}],["camp",{item:"camp",image:"icon_camp.svg",size:[4,4]}],["airPort",{item:"airPort",image:"icon_airport.svg",size:[8,8]}]])}],["bridge",{tool:"bridge",image:"icon_bridge.svg",color:"#847f64",items:new Map([["b0",{item:"b0",image:"icon_b0.svg",size:[4,2]}],["b90",{item:"b90",image:"icon_b90.svg",size:[2,4]}],["b45",{item:"b45",image:"icon_b45.svg",size:[6,6]}],["b135",{item:"b135",image:"icon_b135.svg",size:[6,6]}]])}],["slope",{tool:"slope",image:"icon_slope.svg",color:"#edda96",items:new Map([["s0",{item:"s0",image:"icon_s0.svg",size:[4,2]}],["s90",{item:"s90",image:"icon_s90.svg",size:[2,4]}]])}]])}],["plant",{mode:"plant",image:"icon_plant.svg",tools:new Map([["tree",{tool:"tree",image:"icon_tree.svg",color:"#00b27a",size:[3,3],items:new Map([["broadleaf",{item:"broadleaf"}],["conifer",{item:"conifer",color:"#12560c"}],["apple",{item:"apple",image:"icon_apple.svg"}],["cherry",{item:"cherry",image:"icon_cherry.svg"}],["coconut",{item:"coconut",image:"icon_coconut.svg"}],["orange",{item:"orange",image:"icon_orange.svg"}],["pear",{item:"pear",image:"icon_pear.svg"}],["peach",{item:"peach",image:"icon_peach.svg"}],["bamboo",{item:"bamboo",image:"icon_bamboo.svg",color:"#c7ea7b"}]])}],["flower",{tool:"flower",image:"icon_flower.svg",color:"#fff",size:[1,1],items:new Map([["red",{item:"red"}],["yellow",{item:"yellow"}],["white",{item:"white"}],["orange",{item:"orange"}],["pink",{item:"pink"}],["purple",{item:"purple"}],["black",{item:"black"}],["blue",{item:"blue"}]])}]])}]]);var b=function(e){var a,t=e.data.mode||e.data.tool||e.data.item||e.data.colorName,o=e.isActive?"active":"";if(a=e.data.colorName?"color ".concat(e.data.colorName," ").concat(o):e.data.item?"item ".concat(e.type," ").concat(e.data.item," ").concat(o):"".concat(e.type," ").concat(o),e.data.image){if("colorCustom"===t)return m.a.createElement("button",{id:t,onClick:e.onClick,className:a},m.a.createElement("label",null,m.a.createElement("input",{type:"color",defaultValue:e.customColor,onChange:e.changeColor}),m.a.createElement("img",{alt:t,src:"/lazy-island-planner/"+e.data.image})));if("tree"===e.type){var r={background:e.data.color};return m.a.createElement("button",{id:t,onClick:e.onClick,className:a,style:r},m.a.createElement("img",{alt:t,src:"/lazy-island-planner/"+e.data.image}))}return m.a.createElement("button",{id:t,onClick:e.onClick,className:a},m.a.createElement("img",{alt:t,src:"/lazy-island-planner/"+e.data.image}))}var i={background:"flower"===e.type?e.data.item:e.data.color};return m.a.createElement("button",{id:t,onClick:e.onClick,className:a},m.a.createElement("div",{className:"colorBlock",style:i}))};var f=function(e){var a=Object(o.a)(e.toolData).map((function(a,t){return m.a.createElement("li",{key:t},m.a.createElement(b,{data:a[1],type:"mode",isActive:e.currentMode===a[1].mode,onClick:e.onClick}))}));return m.a.createElement("ul",null,a)};var y=function(e){var a=Object(o.a)(e.currentModeData.tools).map((function(a,t){return m.a.createElement("li",{key:t},m.a.createElement(b,{data:a[1],type:"tool",isActive:e.currentTool===a[1].tool,onClick:e.onClick}))}));return m.a.createElement("ul",null,a)};var S=function(e){var a,t,r=e.currentTool;"draw"===e.currentMode?(a=Object(o.a)(e.currentModeData.colors),t="colorName"):(a=Object(o.a)(e.currentModeData.tools.get(e.currentTool).items),t="item");var i=a.map((function(a,o){return m.a.createElement("li",{key:o},m.a.createElement(b,{data:a[1],type:r,isActive:a[1][t]===e.currentItem,onClick:e.onClick,customColor:e.customColor,changeColor:e.changeColor}))}));return m.a.createElement("div",{className:"menuItems"},m.a.createElement("hr",null),m.a.createElement("ul",null,i))},w=t(11),k=t.n(w),z=t(7),C=t(39),E=t(8),P=t(16);z.a.use(P.a).use(E.f).init({resources:{"zh-TW":{translation:{"This is a simple tool for Animal Crossing":"\u9019\u662f\u4e00\u500b\u7d66\u61f6\u4eba\u7528\u7684\u300a\u96c6\u5408\u5566\uff01\u52d5\u7269\u68ee\u53cb\u6703\u300b\u5cf6\u5dbc\u898f\u5283\u5de5\u5177\u3002","Upload your map screenshot to start":"\u4e0a\u50b3\u4f60\u64f7\u53d6\u7684\u5cf6\u5dbc\u5730\u5716\u756b\u9762\uff08\u5982\u4e0b\u5716\uff09\u5373\u53ef\u958b\u59cb\uff0c","or you can":"\u4e5f\u53ef\u4ee5","try with my map":"\u5148\u7528\u6211\u7684\u5730\u5716\u8a66\u8a66\u770b",period:"\u3002","This is for desktop browser":"\uff08\u5efa\u8b70\u65bc\u684c\u9762\u7248\u700f\u89bd\u5668\u4e2d\u4f7f\u7528\uff0c\u5728\u884c\u52d5\u88dd\u7f6e\u4e2d\u53ef\u80fd\u7121\u6cd5\u6b63\u5e38\u64cd\u4f5c\u3002\uff09","Upload image":"\u4e0a\u50b3\u5716\u6a94",or:"\u6216","Use the URL of uploaded image":"\u4f7f\u7528\u5df2\u4e0a\u50b3\u7684\u5716\u7247\u9023\u7d50\uff1a",Confirm:"\u78ba\u5b9a","Sorry this seems not a correct map image":"\u62b1\u6b49\uff0c\u9019\u597d\u50cf\u4e0d\u662f\u6b63\u78ba\u7684\u5730\u5716\u622a\u5716\u6545\u7121\u6cd5\u4f7f\u7528\u3002\u89e3\u6790\u5ea6\u61c9\u70ba 1280 x 720 px\u3002","Sorry this seems not a correct map image url":"\u62b1\u6b49\uff0c\u9019\u597d\u50cf\u4e0d\u662f\u6b63\u78ba\u7684\u5730\u5716\u622a\u5716\u9023\u7d50\u3002\u53ef\u5728\u5716\u7247\u4e0a\u6309\u53f3\u9375\u300c\u8907\u88fd\u5716\u7247\u4f4d\u5740\u300d\u518d\u8cbc\u4e0a\u3002","Sorry can not get image from URL":"\u62b1\u6b49\uff0c\u6b64\u5716\u7247\u7121\u6cd5\u7d93\u7531\u9023\u7d50\u53d6\u5f97\uff0c\u8acb\u5148\u4e0b\u8f09\u518d\u7528\u4e0a\u50b3\u7684\u65b9\u5f0f\u4f7f\u7528\u3002",info:"\u8aaa\u660e\u9801","download map":"\u4e0b\u8f09\u5730\u5716","This is a very simple tool":"\u9019\u662f\u500b\u529f\u80fd\u975e\u5e38\u967d\u6625\u7684\u61f6\u4eba\u5de5\u5177\uff0c","No undo":"\u6c92\u6709\u56de\u5fa9\u529f\u80fd\uff0c\u53ea\u80fd\u91cd\u65b0\u6574\u7406\u56de\u5230\u958b\u59cb\u756b\u9762\u8b80\u53d6\u6a94\u6848\u5f9e\u982d\u518d\u4f86\uff1b","No save":"\u4e5f\u4e0d\u80fd\u5132\u5b58\u7de8\u8f2f\u5230\u4e00\u534a\u7684\u72c0\u614b\uff0c\u53ea\u80fd\u628a\u6210\u54c1\u4e0b\u8f09\u6210\u5716\u6a94\u3002","You can try other great tools":"\u5982\u679c\u4f60\u89ba\u5f97\u9019\u500b\u7834\u5de5\u5177\u5f88\u96e3\u7528\uff0c\u53ef\u4ee5\u8a66\u8a66\u770b\u5176\u4ed6\u5c08\u696d\u958b\u767c\u8005\u505a\u7684\u9ad8\u7d1a\u5de5\u5177\uff1a",Close:"\u95dc\u9589"}},en:{translation:{"This is a simple tool for Animal Crossing":'This is a simple island planning tool for "Animal Crossing: New Horizons."',"Upload your map screenshot to start":"Upload the screenshot of your island map (like the image below\uff09to start, ","or you can":"or you can ","try with my map":"try with my map",period:".","This is for desktop browser":"(Strongly recommend to open in desktop browser. Might be very buggy in mobile browser.)","Upload image":"Upload image",or:"Or","Use the URL of uploaded image":"Use the URL of your uploaded image:",Confirm:"Confirm","Sorry this seems not a correct map image":"Sorry, this seems not a correct map image. The resolution should be 1280 x 720 px.","Sorry this seems not a correct map image url":'Sorry, this seems not a correct map image URL. You can right click the image then "Copy Image Address."',"Sorry can not get image from URL":'Sorry, this image can\'t be processed through URL, please download the image then use "Upload image."',Info:"Info","Download map":"Download map","This is a very simple tool":"This is a very simple tool. ","No undo":'"No undo feature." You can only reload the page and start from the beginning. ',"No save":'Also, "No save feature." You can only download the image file.',"You can try other great tools":"If this tool is too lame for you, you can try these great tools that made by skilled developers:",Close:"Close"}},ja:{translation:{"This is a simple tool for Animal Crossing":"\u3053\u308c\u306f\u30b7\u30f3\u30d7\u30eb\u306a\u300c\u3042\u3064\u307e\u308c \u3069\u3046\u3076\u3064\u306e\u68ee\u300d\u306e\u5cf6\u306e\u69cb\u60f3\u30c4\u30fc\u30eb\u3067\u3059\u3002","Upload your map screenshot to start":"\u81ea\u5206\u306e\u5cf6\u306e\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8\uff08\u4e0b\u56f3\u306e\u3088\u3046\u306a\uff09\u3092\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3057\u3066\u59cb\u3081\u3066\u304f\u3060\u3055\u3044\u3002","or you can":"","try with my map":"\u4e0b\u56f3\u3092\u4f7f\u3063\u3066\u4f53\u9a13\u3057\u305f\u3044\u4eba\u306f\u3053\u3061\u3089",period:"\u3002","This is for desktop browser":"\uff08\u30c7\u30b9\u30af\u30c8\u30c3\u30d7\u30d6\u30e9\u30a6\u30b6\u5411\u3051\u3002\u30e2\u30d0\u30a4\u30eb\u30d6\u30e9\u30a6\u30b6\u3067\u306f\u4f7f\u3048\u306a\u3044\u53ef\u80fd\u6027\u304c\u9ad8\u3044\u3067\u3059\u3002\uff09","Upload image":"\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9",or:"\u307e\u305f\u306f","Use the URL of uploaded image":"SNS\u306b\u6295\u7a3f\u3057\u305f\u753b\u50cf\u306eURL\u3092\u4f7f\u7528\uff1a",Confirm:"\u78ba\u5b9a","Sorry this seems not a correct map image":"\u3059\u307f\u307e\u305b\u3093\u3001\u3053\u308c\u306f\u6b63\u3057\u3044\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8\u3067\u306f\u306a\u3055\u305d\u3046\u3067\u3059\u3002\u3054\u5229\u7528\u53ef\u80fd\u306a\u753b\u50cf\u30b5\u30a4\u30ba\u306f 1280 x 720 \u30d4\u30af\u30bb\u30eb\u3068\u306a\u308a\u307e\u3059\u3002","Sorry this seems not a correct map image url":"\u3059\u307f\u307e\u305b\u3093\u3001\u3053\u308c\u306f\u6b63\u3057\u3044URL\u3067\u306f\u306a\u3055\u305d\u3046\u3067\u3059\u3002\u753b\u50cf\u3092\u53f3\u30af\u30ea\u30c3\u30af\u3057\u3066\u3001\u300c\u753b\u50cf\u306eURL\u3092\u30b3\u30d4\u30fc\u300d\u3092\u3057\u3066\u304f\u3060\u3055\u3044\u3002","Sorry can not get image from URL":"\u3059\u307f\u307e\u305b\u3093\u3001\u3053\u306e\u753b\u50cf\u306fURL\u304b\u3089\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093\u3002\u4e00\u56de\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3057\u3066\u3001\u300c\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u300d\u3092\u4f7f\u3063\u3066\u304f\u3060\u3055\u3044\u3002",info:"\u8aac\u660e","download map":"\u5730\u56f3\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9","This is a very simple tool":"\u3053\u308c\u306f\u3068\u3066\u3082\u30b7\u30f3\u30d7\u30eb\u306a\u30c4\u30fc\u30eb\u3067\u3059\u3002","No undo":"\u5143\u306b\u623b\u3059\u6a5f\u80fd\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u30ea\u30ed\u30fc\u30c9\u3057\u3066\u6700\u521d\u304b\u3089\u3084\u308a\u76f4\u3059\u3057\u304b\u3067\u304d\u307e\u305b\u3093\u3002","No save":"\u30bb\u30fc\u30d6\u6a5f\u80fd\u3082\u3042\u308a\u307e\u305b\u3093\u3002\u753b\u50cf\u306e\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3057\u304b\u3067\u304d\u307e\u305b\u3093\u3002","You can try other great tools":"\u3082\u3057\u3088\u308a\u672c\u683c\u7684\u306a\u30c4\u30fc\u30eb\u3092\u4f7f\u3044\u305f\u3044\u306a\u3089\u3001\u512a\u79c0\u306a\u958b\u767a\u8005\u304c\u4f5c\u3063\u305f\u3053\u3061\u3089\u306e\u30c4\u30fc\u30eb\u3092\u8a66\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044\uff1a",Close:"\u9589\u3058\u308b"}}},fallbackLng:"en",keySeparator:!1,interpolation:{escapeValue:!1}});z.a,t(31);var q=function(e){Object(s.a)(t,e);var a=Object(l.a)(t);function t(e){var i;return Object(r.a)(this,t),(i=a.call(this,e)).canvas=m.a.createRef(),i.urlInput=m.a.createRef(),i.upLoadImg=i.upLoadImg.bind(Object(n.a)(i)),i.loadMapFromUrl=i.loadMapFromUrl.bind(Object(n.a)(i)),i.downLoadCanvas=i.downLoadCanvas.bind(Object(n.a)(i)),i.changeMode=i.changeMode.bind(Object(n.a)(i)),i.changeTool=i.changeTool.bind(Object(n.a)(i)),i.changeItem=i.changeItem.bind(Object(n.a)(i)),i.changeColor=i.changeColor.bind(Object(n.a)(i)),i.state={language:z.a.language,isImgUploaded:!1,canvasSizeX:p.squareSize*p.squarePerBlock*p.mapXBlock+2*p.mapPadding,canvasSizeY:p.squareSize*p.squarePerBlock*p.mapYBlock+2*p.mapPadding,squareSize:p.squareSize,currentMode:Object(o.a)(v)[0][0],currentModeData:Object(o.a)(v)[0][1],currentTool:Object(o.a)(Object(o.a)(v)[0][1].tools)[0][0],currentItem:Object(o.a)(Object(o.a)(v)[0][1].colors)[0][0],customColor:Object(o.a)(Object(o.a)(v)[0][1].colors)[Object(o.a)(v)[0][1].colors.size-1][1].color[0]},i}return Object(i.a)(t,[{key:"changeLanguage",value:function(e){e.target.parentElement.querySelectorAll("button").forEach((function(e){e.classList.remove("active")})),e.target.classList.add("active"),z.a.changeLanguage(e.target.name)}},{key:"componentDidUpdate",value:function(e){g.a.project&&("draw"===this.state.currentMode?this.handleDraw():"build"!==this.state.currentMode&&"plant"!==this.state.currentMode||this.handleBuildAndPlant())}},{key:"upLoadImg",value:function(e){var a,t=e.target.nextElementSibling,o=t.innerHTML;a=e.target.value.split("\\").pop(),t.innerHTML=a||o;var r=e.target.files[0],i=new FileReader,n=this;if(r){var s=new Image;s.src=window.URL.createObjectURL(r),s.addEventListener("load",(function(){var e=document.getElementById("img-input-error");if((s.width!==p.imgWidth||s.height!==p.imgHeight)&&parseInt(s.width/s.height*1e3)!==parseInt(p.imgWidth/p.imgHeight*1e3))return e.classList.add("active"),!1;i.readAsDataURL(r)}))}i.addEventListener("load",(function(){n.setState({isImgUploaded:!0}),n.renderMap(i.result)}),!1)}},{key:"loadMapFromUrl",value:function(e){document.querySelectorAll(".error-message").forEach((function(e){e.classList.remove("active")}));var a,t=this;a="mapUseDefault"===e.target.id?k.a:this.urlInput.current.value,fetch(a).then((function(e){return e.blob()})).then((function(e){if(e.type.includes("image/jpeg")){var o=new Image;o.src=a,o.addEventListener("load",(function(){var a=document.getElementById("url-error");if((o.width!==p.imgWidth||o.height!==p.imgHeight)&&parseInt(o.width/o.height*1e3)!==parseInt(p.imgWidth/p.imgHeight*1e3))return a.classList.add("active"),!1;var r=new FileReader;r.readAsDataURL(e),r.addEventListener("load",(function(){t.setState({isImgUploaded:!0}),t.renderMap(r.result)}),!1)}))}else{document.getElementById("url-error").classList.add("active")}})).catch((function(e){document.getElementById("url-fetch-error").classList.add("active")}))}},{key:"openModal",value:function(){document.body.classList.add("modal-open")}},{key:"closeModal",value:function(){document.body.classList.remove("modal-open")}},{key:"downLoadCanvas",value:function(){var e=this.canvas.current.toDataURL("image/jpg"),a=document.createElement("a");a.href=e,a.download="myIslandImg.jpg",document.body.appendChild(a),a.click(),a.remove()}},{key:"renderMap",value:function(e){var a=this,t=this.canvas.current;t.width=this.state.canvasSizeX,t.height=this.state.canvasSizeY,g.a.setup(t);var o=new g.a.Raster(e),r=new g.a.Layer;r.name="mapLayer",(new g.a.Layer).name="drawLayer",(new g.a.Layer).name="buildLayer",r.activate(),new g.a.Shape.Rectangle({x:0,y:0,width:this.state.canvasSizeX,height:this.state.canvasSizeY}).fillColor=p.colorBg,o.onLoad=function(){var e=1;o.width!==p.imgWidth&&(e=o.width/p.imgWidth),r.activate();var t=p.sampleEndX*e-p.sampleStartX*e,i=p.sampleEndY*e-p.sampleStartY*e,n=o.getSubRaster(new g.a.Rectangle(p.sampleStartX*e,p.sampleStartY*e,t,i));o.remove(),n.visible=!1,n.size=new g.a.Size(p.squarePerBlock*p.mapXBlock,p.squarePerBlock*p.mapYBlock);for(var s=0;s<n.height;s++)for(var l=0;l<n.width;l++){var c=n.getPixel(l,s);new g.a.Shape.Rectangle({x:l*a.state.squareSize+p.mapPadding,y:s*a.state.squareSize+p.mapPadding,width:a.state.squareSize,height:a.state.squareSize}).fillColor=c}},this.renderGrid(),this.componentDidUpdate()}},{key:"renderGrid",value:function(){var e,a=new g.a.Layer;a.name="gridLayer",a.activate();for(var t=[this.state.squareSize+5,this.state.squareSize-2],o=0;o<=p.squarePerBlock*p.mapXBlock;o++)o%p.squarePerBlock===0?((e=new g.a.Path.Line(new g.a.Point(o*this.state.squareSize+p.mapPadding-.5,0),new g.a.Point(o*this.state.squareSize+p.mapPadding-.5,this.state.canvasSizeY))).strokeWidth=3,e.dashArray=t,e.strokeColor=p.colorMainGrid):(e=new g.a.Path.Line(new g.a.Point(o*this.state.squareSize+p.mapPadding-.5,p.mapPadding),new g.a.Point(o*this.state.squareSize+p.mapPadding-.5,this.state.canvasSizeY-p.mapPadding))).strokeColor=p.colorGrid,e.locked=!0;for(var r=0;r<=p.squarePerBlock*p.mapYBlock;r++)r%p.squarePerBlock===0?((e=new g.a.Path.Line(new g.a.Point(0,r*this.state.squareSize+p.mapPadding-.5),new g.a.Point(this.state.canvasSizeX,r*this.state.squareSize+p.mapPadding-.5))).strokeWidth=3,e.dashArray=t,e.strokeColor=p.colorMainGrid):(e=new g.a.Path.Line(new g.a.Point(p.mapPadding,r*this.state.squareSize+p.mapPadding-.5),new g.a.Point(this.state.canvasSizeX-p.mapPadding,r*this.state.squareSize+p.mapPadding-.5))).strokeColor=p.colorGrid,e.locked=!0;for(var i=0;i<p.mapYBlock;i++){var n=new g.a.PointText(new g.a.Point(p.mapPadding/5,this.state.squareSize*p.squarePerBlock*(i+.5)+p.mapPadding));n.fillColor=p.colorGridMark,n.fontSize=2*this.state.squareSize,n.content=String.fromCharCode(65+i),n.fontWeight="bold"}for(var s=0;s<p.mapXBlock;s++){var l=new g.a.PointText(new g.a.Point(this.state.squareSize*p.squarePerBlock*(s+.5)+p.mapPadding,this.state.squareSize*p.squarePerBlock*p.mapYBlock+1.8*p.mapPadding));l.fillColor=p.colorGridMark,l.fontSize=2*this.state.squareSize,l.content=s+1,l.fontWeight="bold"}}},{key:"changeMode",value:function(e){var a,t=e.target.closest("button").getAttribute("id"),r=v.get(t);a="draw"===t?Object(o.a)(r.colors)[0][0]:null,this.setState({currentMode:t,currentModeData:r,currentTool:Object(o.a)(r.tools)[0][0],currentItem:a}),this.clearBrushHover(),this.clearNotBuiltItem()}},{key:"changeTool",value:function(e){var a=e.target.closest("button").getAttribute("id"),t=this.state.currentItem;"draw"!==this.state.currentMode&&(t=Object(o.a)(this.state.currentModeData.tools.get(a).items)[0][0]),this.setState({currentTool:a,currentItem:t}),this.clearNotBuiltItem()}},{key:"changeItem",value:function(e){var a=e.target.closest("button").getAttribute("id");this.setState({currentItem:a}),this.clearNotBuiltItem()}},{key:"changeColor",value:function(e){this.setState({customColor:e.target.value})}},{key:"isEditableArea",value:function(e){return e.x>p.mapPadding&&e.x<this.state.squareSize*p.squarePerBlock*p.mapXBlock+p.mapPadding&&e.y>p.mapPadding&&e.y<this.state.squareSize*p.squarePerBlock*p.mapYBlock+p.mapPadding}},{key:"handleDraw",value:function(){var e=this;g.a.project.layers.buildLayer.children.forEach((function(e){e.children.deletBtn.opacity=0})),g.a.project.layers.drawLayer.activate();var a,t,o=new g.a.Tool;o.activate();var r=this.state.currentModeData.tools.get(this.state.currentTool);a=r.size?r.size:0,t="colorCustom"===this.state.currentItem?[this.state.customColor]:this.state.currentModeData.colors.get(this.state.currentItem).color;var i=(a-1)*p.squareSize;if(g.a.project.activeLayer.children.brush){if(g.a.project.activeLayer.children.brush.width/this.state.squareSize!==a){g.a.project.activeLayer.children.brush.remove();var n=new g.a.Shape.Rectangle({x:-1*p.hideDist,y:-1*p.hideDist,width:a*this.state.squareSize,height:a*this.state.squareSize});n.fillColor="rgba(255,255,255,0.1)",n.strokeColor="rgba(255,255,255,0.8)",n.name="brush"}}else{var s=new g.a.Shape.Rectangle({x:-1*p.hideDist,y:-1*p.hideDist,width:a*this.state.squareSize,height:a*this.state.squareSize});s.fillColor="rgba(255,255,255,0.1)",s.strokeColor="rgba(255,255,255,0.8)",s.name="brush"}var l=g.a.project.activeLayer.children.brush;o.onMouseMove=function(t){var o=new g.a.Point;o.x=t.point.x-(t.point.x-p.mapPadding)%e.state.squareSize-i+e.state.squareSize*a/2,o.y=t.point.y-(t.point.y-p.mapPadding)%e.state.squareSize-i+e.state.squareSize*a/2,l.position=o},o.onMouseDown=function(o){e.isEditableArea(o.point)&&e.draw(o,a,i,t)},o.onMouseDrag=function(o){e.isEditableArea(o.point)&&e.draw(o,a,i,t)}}},{key:"draw",value:function(e,a,t,o){g.a.project.layers.drawLayer.activate();var r=new g.a.Point(0,0),i=new g.a.Point(0,0),n=g.a.project.activeLayer.children.brush;r.x=e.point.x-(e.point.x-p.mapPadding)%this.state.squareSize-t,r.y=e.point.y-(e.point.y-p.mapPadding)%this.state.squareSize-t;for(var s=0;s<a;s++)for(var l=0;l<a;l++){var c=new g.a.Shape.Rectangle({x:r.x+s*this.state.squareSize,y:r.y+l*this.state.squareSize,width:this.state.squareSize,height:this.state.squareSize});n.position=[r.x+a*this.state.squareSize/2,r.y+a*this.state.squareSize/2],i.x=r.x+s*this.state.squareSize+this.state.squareSize/2,i.y=r.y+l*this.state.squareSize+this.state.squareSize/2;var m=g.a.project.layers[2].hitTest(i,{fill:!0});m&&"brush"!==m.item.name&&m.item.remove(),c.fillColor=o[Math.floor(Math.random()*o.length)]}}},{key:"handleBuildAndPlant",value:function(){var e=this;g.a.project.layers.buildLayer.activate();var a,t,o,r=new g.a.Tool;if(r.activate(),this.state.currentItem){var i,n,s,l;a=!0,t=!1;var c=this.state.currentTool,m=this.state.currentModeData.tools.get(c),u=m.items.get(this.state.currentItem);if("build"===this.state.currentMode?(i=u.size,n=new g.a.Shape.Rectangle({x:0,y:0,width:i[0]*this.state.squareSize,height:i[1]*this.state.squareSize}),"b45"!==this.state.currentItem&&"b135"!==this.state.currentItem||(n.size=[2*this.state.squareSize,4*this.state.squareSize],n.rotate(parseInt(this.state.currentItem.replace("b","")))),n.fillColor=u.color?u.color:m.color,n.strokeColor=p.strokeColorBilding,l=new g.a.Group([n])):"plant"===this.state.currentMode&&(i=m.size,s=new g.a.Shape.Rectangle({x:0,y:0,width:i[0]*this.state.squareSize,height:i[1]*this.state.squareSize}),l=new g.a.Group([s]),"tree"===this.state.currentTool?((n=new g.a.Shape.Circle(new g.a.Point(i[0]*this.state.squareSize/2,i[1]*this.state.squareSize/2),i[0]*this.state.squareSize*.7/2)).fillColor=u.color?u.color:m.color,n.strokeColor=p.strokeColorPlant,n.opacity=.5):"flower"===this.state.currentTool&&((n=new g.a.Shape.Circle(new g.a.Point(i[0]*this.state.squareSize/2,i[1]*this.state.squareSize/2),i[0]*this.state.squareSize/2)).fillColor=u.item,n.strokeColor=p.strokeColorPlant),l.addChild(n)),u.image&&"bridge"!==m.tool&&"slope"!==m.tool){var d=new g.a.Group,h=this;d.importSVG("/lazy-island-planner/"+u.image,(function(e){var a=h.state.squareSize*("tree"===c?1:2.8)/d.bounds.size._height;d.scale(a),d.position=l.position,d.locked=!0,l.addChild(d)}))}var v=new g.a.Shape.Circle({center:[l.bounds.size._width,0],radius:.8*this.state.squareSize});v.fillColor="#555";var b=new g.a.PointText(new g.a.Point(l.bounds.size._width-(1.6*this.state.squareSize-6)/2,(1.6*this.state.squareSize-6)/2));b.fillColor="#eee",b.content="\xd7",b.locked=!0;var f=new g.a.Group([v,b]);f.name="deletBtn",f.opacity=0,f.locked=!0,(o=new g.a.Group([l,f])).position=[-1*p.hideDist,-1*p.hideDist]}else a=!1,t=!0;r.onMouseMove=function(t){a&&(o.position.x=e.getSnapPoint(t.point.x,!0,o),o.position.y=e.getSnapPoint(t.point.y,!1,o))},r.onMouseDown=function(r){if(a)o.position.x=e.getSnapPoint(r.point.x,!0,o),o.position.y=e.getSnapPoint(r.point.y,!1,o),a=!1,o.data.built=!0;else{g.a.project.activeLayer.children.forEach((function(e){e.children.deletBtn.opacity=0}));var i=g.a.project.layers.buildLayer.hitTest(r.point,{fill:!0,tolerance:1});if(!i)return void(t=!1);"deletBtn"!==i.item.parent.name?(o=i.item.parent.parent,t=!0,o.children.deletBtn.opacity=1,o.children.deletBtn.locked=!1):(i.item.parent.parent.remove(),o=null)}},r.onMouseDrag=function(a){t&&o&&(o.position.x=e.getSnapPoint(a.point.x,!0,o),o.position.y=e.getSnapPoint(a.point.y,!1,o))},r.onMouseUp=function(a){e.setState({currentItem:null}),document.querySelectorAll("button.item").forEach((function(e){e.blur()}))}}},{key:"getSnapPoint",value:function(e,a,t){return a?e-(e-t.bounds._width/2-p.mapPadding)%this.state.squareSize:e-(e-t.bounds._height/2-p.mapPadding)%this.state.squareSize}},{key:"clearBrushHover",value:function(){g.a.project.layers.drawLayer.children.brush&&g.a.project.layers.drawLayer.children.brush.remove()}},{key:"clearNotBuiltItem",value:function(){var e=g.a.project.layers.buildLayer.children[g.a.project.layers.buildLayer.children.length-1];e&&!e.data.built&&e.remove()}},{key:"render",value:function(){var e=this;return this.state.isImgUploaded?m.a.createElement("div",{className:"wrapper"},m.a.createElement("div",{className:"editor"},m.a.createElement("aside",{className:"tool-aside"},m.a.createElement("div",{className:"modes"},m.a.createElement(f,{toolData:v,currentMode:this.state.currentMode,onClick:this.changeMode})),m.a.createElement("div",{className:"tools"},m.a.createElement(y,{currentTool:this.state.currentTool,currentModeData:this.state.currentModeData,onClick:this.changeTool}),m.a.createElement(S,{currentMode:this.state.currentMode,currentModeData:this.state.currentModeData,currentTool:this.state.currentTool,currentItem:this.state.currentItem,onClick:this.changeItem,customColor:this.state.customColor,changeColor:this.changeColor}))),m.a.createElement("canvas",{id:"canvas",ref:this.canvas}),m.a.createElement("aside",{className:"sub-aside"},m.a.createElement(C.a,null,(function(a,t){t.i18n;return m.a.createElement("ul",null,m.a.createElement("li",null,m.a.createElement("button",{type:"button",title:a("Info"),onClick:e.openModal},m.a.createElement("img",{src:"/lazy-island-planner/icon_question.svg",alt:a("Info")}))),m.a.createElement("li",null,m.a.createElement("button",{type:"button",title:a("Download map"),onClick:e.downLoadCanvas},m.a.createElement("img",{src:"/lazy-island-planner/icon_download.svg",alt:a("Download map")}))))})))),m.a.createElement(C.a,null,(function(a,t){t.i18n;return m.a.createElement("div",{id:"info-modal"},m.a.createElement("button",{className:"close-modal round",onClick:e.closeModal},"\xd7"),m.a.createElement("h1",null,m.a.createElement("div",null,"Lazy Island Planner")),m.a.createElement("p",null,a("This is a very simple tool"),m.a.createElement("strong",null,a("No undo"),a("No save"))),m.a.createElement("p",null,a("You can try other great tools")),m.a.createElement("ul",null,m.a.createElement("li",null,m.a.createElement("a",{href:"https://eugeneration.github.io/HappyIslandDesigner/",target:"_blank"},"Happy Island Designer")),m.a.createElement("li",null,m.a.createElement("a",{href:"https://bobacupcake.itch.io/island-planner",target:"_blank"},"Island Planner"))),m.a.createElement("button",{className:"btn close-modal",onClick:e.closeModal},a("Close")))}))):m.a.createElement("div",{className:"intro"},m.a.createElement("h1",null,m.a.createElement("div",null,"Lazy Island Planner")),m.a.createElement("div",{className:"lang-menu"},m.a.createElement("button",{name:"zh-TW",className:"zh-TW"===this.state.language||"zh"===this.state.language?"active":"",onClick:this.changeLanguage},"\u53f0\u7063\u83ef\u8a9e"),m.a.createElement("button",{name:"en",className:"zh-TW"!==this.state.language&&"zh"!==this.state.language&&"ja"!==this.state.language?"active":"",onClick:this.changeLanguage},"English"),m.a.createElement("button",{name:"ja",className:"ja"===this.state.language?"active":"",onClick:this.changeLanguage},"\u65e5\u672c\u8a9e")),m.a.createElement(C.a,null,(function(a,t){t.i18n;return m.a.createElement("div",null,m.a.createElement("p",null,a("This is a simple tool for Animal Crossing")),m.a.createElement("p",null,a("Upload your map screenshot to start"),a("or you can"),m.a.createElement("button",{className:"link",id:"mapUseDefault",onClick:e.loadMapFromUrl},a("try with my map")),a("period")),m.a.createElement("p",null,a("This is for desktop browser")))})),m.a.createElement("img",{src:k.a,alt:"Map sample",className:"island-map"}),m.a.createElement(C.a,null,(function(a,t){t.i18n;return m.a.createElement("form",null,m.a.createElement("input",{type:"file",accept:"image/.jpg, .jpeg",id:"img-input",onChange:e.upLoadImg}),m.a.createElement("label",{htmlFor:"img-input",className:"btn fake-input"},a("Upload image")),m.a.createElement("div",{id:"img-input-error",className:"error-message"},a("Sorry this seems not a correct map image")),m.a.createElement("div",{className:"or"},a("or")),m.a.createElement("div",{className:"use-url"},m.a.createElement("label",null,a("Use the URL of uploaded image")),m.a.createElement("input",{type:"text",ref:e.urlInput}),m.a.createElement("button",{type:"button",id:"mapFromUrl",onClick:e.loadMapFromUrl},a("Confirm"))),m.a.createElement("div",{id:"url-error",className:"error-message"},a("Sorry this seems not a correct map image url")),m.a.createElement("div",{id:"url-fetch-error",className:"error-message"},a("Sorry can not get image from URL")))})))}}]),t}(m.a.Component);d.a.render(m.a.createElement(q,null),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.11897873.chunk.js.map