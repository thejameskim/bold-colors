(this["webpackJsonpcore-app"]=this["webpackJsonpcore-app"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var i,c=n(0),r=n.n(c),a=n(7),o=n.n(a),s=n(3),h=n(1),v=n.n(h),u=n(4),l=(n(14),n(5)),d=n(2),w=function(){function e(){Object(l.a)(this,e)}return Object(d.a)(e,null,[{key:"getPixelRGB",value:function(e,t,n){var i=t.getBoundingClientRect(),c=n.clientX-i.left,r=n.clientY-i.top,a=e.getImageData(c,r,1,1).data;return{r:a[0],g:a[1],b:a[2]}}},{key:"RGBtoHSV",value:function(e){var t=e.r,n=e.g,i=e.b,c={h:0,s:0,v:0},r=Math.min(t,n,i),a=Math.max(t,n,i);c.v=a;var o=a-r;return 0===a?(c.s=0,c.h=-1,c):(c.s=o/a*255,c.h=t===a?(n-i)/o:n===a?2+(i-t)/o:4+(t-n)/o,c.h*=60,c.h<0&&(c.h+=360),c.h/=2,c)}},{key:"GetHsvFormatted",value:function(e,t,n){return[e.h+=t,e.s+=t,e.v+=t,n]}}]),e}(),f=function(e){var t=e.cvHelper,n=Object(c.useRef)(null);return Object(c.useEffect)((function(){var e;if(n){var i=n.current;if(!i)return;var c=i.getContext("2d");if(!c)return;t.setCanvasElCurrent(i),i.addEventListener("mousedown",(function(e){var n=w.getPixelRGB(c,i,e),r=w.RGBtoHSV(n);t.setHSVSelectColor(r)})),e=setInterval(Object(u.a)(v.a.mark((function e(){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.getLatestVideoFrame(),c.drawImage(n,0,0,window.innerWidth,.9*window.innerHeight),t.draw(c,i);case 3:case"end":return e.stop()}}),e)}))),.017)}return function(){clearInterval(e)}}),[n,t]),Object(c.useEffect)((function(){window.addEventListener("resize",(function(){n&&n.current&&(n.current.width=window.innerWidth,n.current.height=.9*window.innerHeight),t.setSourceAndDestination(.9*window.innerHeight,window.innerWidth)}))}),[n,t]),r.a.createElement("div",{className:"graphics-core"},r.a.createElement("canvas",{height:.9*window.innerHeight,width:window.innerWidth,ref:n}))};!function(e){e.CIRCLE="Circle",e.RECTANGLE="Rectangle",e.NONE="None"}(i||(i={}));var g={RED:[255,0,0,255],BLACK:[0,0,0,255],WHITE:[255,255,255,255],GREEN:[0,255,0,255],BLUE:[0,0,255,255],PURPLE:[102,0,204,255],YELLOW:[255,255,51,255],ORANGE:[255,153,51,255]},p=[i.CIRCLE,i.RECTANGLE,i.NONE],E=function(e){var t=e.cvHelper,n=Object.keys(g).map((function(e){return e}));return r.a.createElement("div",{className:"settings-pane"},r.a.createElement("div",{id:"shapes-pane"},r.a.createElement("select",{onChange:function(e){var n=p[e.target.selectedIndex];t.setShape(n)}},p.map((function(e){return r.a.createElement("option",{key:e},e)})))),r.a.createElement("div",{id:"camera-pane"},r.a.createElement("button",{onClick:function(){t.getFrameAsImage()}},"Take picture")),r.a.createElement("div",{id:"colors-pane"},r.a.createElement("select",{onChange:function(e){var i=g[n[e.target.selectedIndex]];t.setHighlightColor(i)}},n.map((function(e){return r.a.createElement("option",{key:e},e.toLowerCase())})))))},C={video:{facingMode:"environment",width:{exact:1280},height:{exact:720}}},m=function(e){var t=Object(c.useState)(void 0),n=Object(s.a)(t,2),i=n[0],r=n[1];return Object(c.useEffect)((function(){if(i)return function(){i.getTracks().forEach((function(e){e.stop()}))};!function(e,t){S.apply(this,arguments)}(e,r)}),[i,e]),i};function S(){return(S=Object(u.a)(v.a.mark((function e(t,n){var i;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.mediaDevices.getUserMedia(t);case 3:i=e.sent,n(i),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),n(null);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}var H=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.cv;Object(l.a)(this,e),this.cv=t,this.videoEl=void 0,this.height=void 0,this.width=void 0,this.cvVideoCapture=void 0,this.cvSource=void 0,this.cvDestination=void 0,this.cvHSV=void 0,this.cvHSVSelectColor=void 0,this.highlightColor=g.RED,this.shape=i.CIRCLE,this.canvasElCurrent=void 0}return Object(d.a)(e,null,[{key:"newOpenCVHelper",value:function(){return new e}}]),Object(d.a)(e,[{key:"setVideoEl",value:function(e,t,n){if(this.videoEl=e,e.current)try{this.videoEl.current&&(this.cvVideoCapture=new this.cv.VideoCapture(this.videoEl.current)),this.setHeightAndWidth(t,n),this.cv.Mat&&this.setSourceAndDestination(t,n)}catch(i){console.log("ERR: ",i)}}},{key:"setSourceAndDestination",value:function(e,t){this.setHeightAndWidth(e,t),this.cvSource=new this.cv.Mat(e,t,this.cv.CV_8UC4),this.cvDestination=new this.cv.Mat(e,t,this.cv.CV_8UC1),this.cvHSV=new this.cv.Mat}},{key:"setHighlightColor",value:function(e){this.highlightColor=e}},{key:"setShape",value:function(e){this.shape=e}},{key:"setHSVSelectColor",value:function(e){this.cvHSVSelectColor=e}},{key:"setCanvasElCurrent",value:function(e){this.canvasElCurrent||(this.canvasElCurrent=e)}},{key:"getLatestVideoFrame",value:function(){if(!this.videoEl||!this.videoEl.current)throw new Error("Video is not provided");return this.videoEl.current}},{key:"getFrameAsImage",value:function(){var e,t=null===(e=this.canvasElCurrent)||void 0===e?void 0:e.toDataURL("image/png"),n=document.createElement("a");n.download="ScreenCapture".concat((new Date).toISOString(),".png"),n.href=t,n.click()}},{key:"draw",value:function(e,t){if(this.cv.Mat&&this.cv.MatVector&&this.cvVideoCapture&&this.cvDestination&&this.cvHSVSelectColor&&this.cvHSV&&this.cvSource&&this.height&&this.width){this.cvVideoCapture.read(this.cvSource),this.cvSource.copyTo(this.cvDestination);var n=w.GetHsvFormatted(this.cvHSVSelectColor,-60,0),c=w.GetHsvFormatted(this.cvHSVSelectColor,60,255);this.cv.cvtColor(this.cvSource,this.cvHSV,this.cv.COLOR_RGB2HSV),this.cvSource.convertTo(this.cvSource,-1,2,0);var r=new this.cv.Mat(this.cvHSV.rows,this.cvHSV.cols,this.cvHSV.type(),n),a=new this.cv.Mat(this.cvHSV.rows,this.cvHSV.cols,this.cvHSV.type(),c);this.cv.inRange(this.cvHSV,r,a,this.cvHSV);var o=new this.cv.MatVector,s=new this.cv.Mat;this.cv.findContours(this.cvHSV,o,s,this.cv.RETR_LIST,this.cv.CHAIN_APPROX_SIMPLE);var h=this.groupContoursAsRectangles(o);switch(this.shape){case i.RECTANGLE:this.drawRect(h);break;case i.CIRCLE:this.drawCircle(h)}this.cv.imshow(t,this.cvDestination),r.delete(),a.delete(),o.delete(),s.delete(),h.delete()}}},{key:"setHeightAndWidth",value:function(e,t){this.height=e,this.width=t}},{key:"groupContoursAsRectangles",value:function(e){for(var t=new this.cv.RectVector,n=new this.cv.IntVector,i=0;i<e.size();i++){var c=e.get(i),r=this.cv.boundingRect(c);t.push_back(r),t.push_back(r)}return this.cv.groupRectangles(t,n,1,.8),n.delete(),t}},{key:"drawRect",value:function(e){for(var t=0;t<e.size();t++){var n=e.get(t),i=new this.cv.Point(n.x,n.y),c=new this.cv.Point(n.x+n.width,n.y+n.height);n.width>20&&n.height>20&&this.cv.rectangle(this.cvDestination,i,c,this.highlightColor,5,8)}}},{key:"drawCircle",value:function(e){for(var t=0;t<e.size();t++){var n=e.get(t),i=Math.max(n.width,n.height)/2,c=n.x+n.width/2,r=n.y+n.height/2,a=new this.cv.Point(c,r);n.width>20&&n.height>20&&this.cv.circle(this.cvDestination,a,i,this.highlightColor,5,8)}}}]),e}(),V=(n(15),H.newOpenCVHelper());var R=function(){var e=Object(c.useState)(window.innerHeight),t=Object(s.a)(e,2),n=t[0],i=t[1],a=Object(c.useState)(window.innerWidth),o=Object(s.a)(a,2),h=o[0],v=o[1],u=Object(c.useRef)(null),l=m(C);return Object(c.useEffect)((function(){window.addEventListener("resize",(function(){i(window.innerHeight),v(window.innerWidth)}))})),u&&V.setVideoEl(u,.9*n,h),l&&u.current&&!u.current.srcObject&&(u.current.srcObject=l),r.a.createElement("div",{className:"main-app"},r.a.createElement(f,{cvHelper:V}),r.a.createElement(E,{cvHelper:V}),r.a.createElement("div",null,r.a.createElement("video",{autoPlay:!0,playsInline:!0,muted:!0,hidden:!0,onCanPlay:function(){return function(e){var t;null===(t=e.current)||void 0===t||t.play()}(u)},height:.9*n,width:h,ref:u,id:"video-el"})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.8b32112f.chunk.js.map