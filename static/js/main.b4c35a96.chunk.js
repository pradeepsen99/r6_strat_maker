(this.webpackJsonpr6_strat_maker=this.webpackJsonpr6_strat_maker||[]).push([[0],[,,,function(e,t,a){e.exports=a(25)},,,,,function(e,t,a){},function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},function(e,t,a){},,,,,,,function(e,t){},function(e,t){},function(e,t){},,,,,,function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(1),c=a.n(r),o=(a(8),a(9),a(10),a(11).fabric),l=a(20),s=a(21),d=new l.Reactor({debug:!0}),u=function(e){var t,a={};if(!(e instanceof Object)||Array.isArray(e))throw new Error("keyMirror(...): Argument must be an object.");for(t in e)e.hasOwnProperty(t)&&(a[t]=t);return a}({fabricData:null,activeObject:null}),f=new o.Canvas,m=l.Store({getInitialState:function(){return l.toImmutable({fabricData:{objects:[]},activeObject:!1})},initialize:function(){this.on(u.fabricData,this.saveFabricData),this.on(u.activeObject,this.saveActiveObject)},saveFabricData:function(e,t){return e.set("fabricData",l.toImmutable(t))},saveActiveObject:function(e,t){return e.set("activeObject",t)}});d.registerStores({fabricStore:m});var b=s({displayName:"Fabric",componentDidMount:function(){var e=c.a.findDOMNode(this);f.initialize(e,{height:window.innerHeight,width:window.innerWidth-200,backgroundColor:"#000"}),f.on("mouse:up",(function(){d.dispatch(u.fabricData,f.toObject()),d.dispatch(u.activeObject,!!f.getActiveObject())})),f.on("saveData",(function(){d.dispatch(u.fabricData,f.toObject()),d.dispatch(u.activeObject,!!f.getActiveObject()),f.renderAll()}))},render:function(){return i.a.createElement("canvas",null)}}),g=s({displayName:"NewObjects",mixins:[d.ReactMixin],getDataBindings:function(){return{fabricData:["fabricStore","fabricData"],activeObject:["fabricStore","activeObject"]}},render:function(){return i.a.createElement("div",{style:{float:"right"}},i.a.createElement("button",{onClick:this.addKanalImg},"Add Kanal Map "),i.a.createElement("br",null),i.a.createElement("button",{onClick:this.addSmokeImg},"Add Square"),i.a.createElement("br",null),i.a.createElement("input",{placeholder:"Name",type:"text",name:"username",id:"username",value:this.state.value,maxlength:"50"}),i.a.createElement("br",null),i.a.createElement("button",{onClick:this.addPlayer},"ADD PLAYER"))},addPlayer:function(){var e="http://webpage.com/images/"+document.getElementById("og:image").value+".png",t=document.createElement("img");t.src=e,document.body.appendChild(t)},addCircle:function(){f.add(new o.Circle({radius:50,originX:"center",originY:"center",fill:"#FFF",top:f.height/2,left:f.width/2})),f.setActiveObject(f.getObjects()[0]),f.fire("saveData")},addSquare:function(){f.add(new o.Rect({height:100,width:100,originX:"center",originY:"center",fill:"#FFF",top:f.height/2,left:f.width/2})),f.setActiveObject(f.getObjects()[0]),f.fire("saveData")},addKanalImg:function(){o.Image.fromURL("https://vignette.wikia.nocookie.net/rainbowsix/images/8/8f/Kanal_1st_floor_227430.png/revision/latest?cb=20151202214817",(function(e){f.setBackgroundImage(e,f.renderAll.bind(f),{scaleX:f.width/e.width,scaleY:f.height/e.height})}))},addSmokeImg:function(){o.Image.fromURL("https://www.vhv.rs/dpng/d/579-5793740_rainbow-six-operator-icons-hd-png-download.png",(function(e){e.set({left:0,top:0,angle:0}).scale(.05).setCoords(),f.add(e)}))},setRed:function(){f.getActiveObject().fill="red",f.fire("saveData")},setGreen:function(){f.getActiveObject().fill="green",f.fire("saveData")},setBlue:function(){f.getActiveObject().fill="blue",f.fire("saveData")},remove:function(){f.remove(f.getActiveObject()),f.fire("saveData")}}),h=s({displayName:"ActiveObject",mixins:[d.ReactMixin],getDataBindings:function(){return{fabricObject:["fabricStore","fabricData","objects",0]}},render:function(){return null}});var v=function(){return i.a.createElement("div",{className:"App"},i.a.createElement("div",{style:{float:"right"}},i.a.createElement(h,null),i.a.createElement(g,null)),i.a.createElement(b,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[3,1,2]]]);
//# sourceMappingURL=main.b4c35a96.chunk.js.map