(this["webpackJsonpcore-app"]=this["webpackJsonpcore-app"]||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){e.exports=n(30)},,,,,,function(e,t,n){},function(e,t,n){},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var i,a=n(0),c=n.n(a),r=n(12),o=n.n(r),s=n(2),l=n(3),h=n.n(l),u=n(7),v=(n(19),n(8)),d=n(6),g=function(){function e(){Object(v.a)(this,e)}return Object(d.a)(e,null,[{key:"getPixelRGB",value:function(e,t,n){var i=t.getBoundingClientRect(),a=n.clientX-i.left,c=n.clientY-i.top,r=e.getImageData(a,c,1,1).data;return{r:r[0],g:r[1],b:r[2]}}},{key:"RGBtoHSV",value:function(e){var t=e.r,n=e.g,i=e.b,a={h:0,s:0,v:0},c=Math.min(t,n,i),r=Math.max(t,n,i);a.v=r;var o=r-c;return 0===r?(a.s=0,a.h=-1,a):(a.s=o/r*255,a.h=t===r?(n-i)/o:n===r?2+(i-t)/o:4+(t-n)/o,a.h*=60,a.h<0&&(a.h+=360),a.h/=2,a)}},{key:"GetHsvFormatted",value:function(e,t,n){return[e.h+=t,e.s+=t,e.v+=t,n]}}]),e}(),m=function(e){var t=e.cvHelper,n=e.hideWelcome,i=e.hideWelcomeFunc,r=Object(a.useRef)(null);return Object(a.useEffect)((function(){var e;if(r){var a=r.current;if(!a)return;var c=a.getContext("2d");if(!c)return;t.setCanvasElCurrent(a),a.addEventListener("mousedown",(function(e){n||i(!0);var r=g.getPixelRGB(c,a,e),o=g.RGBtoHSV(r);t.setHSVSelectColor(o)})),e=setInterval(Object(u.a)(h.a.mark((function e(){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.getLatestVideoFrame(),c.drawImage(n,0,0,window.innerWidth,.9*window.innerHeight),t.draw(c,a);case 3:case"end":return e.stop()}}),e)}))),.017)}return function(){clearInterval(e)}}),[r,t]),Object(a.useEffect)((function(){window.addEventListener("resize",(function(){r&&r.current&&(r.current.width=window.innerWidth,r.current.height=.9*window.innerHeight),t.setSourceAndDestination(.9*window.innerHeight,window.innerWidth)}))}),[r,t]),c.a.createElement("div",{className:"graphics-core"},c.a.createElement("canvas",{height:.9*window.innerHeight,width:window.innerWidth,ref:r}))};!function(e){e.CIRCLE="Circle",e.RECTANGLE="Rectangle",e.NONE="None"}(i||(i={}));var f={RED:[255,0,0,255],BLACK:[0,0,0,255],WHITE:[255,255,255,255],GREEN:[0,255,0,255],BLUE:[0,0,255,255],PURPLE:[102,0,204,255],YELLOW:[255,255,51,255],ORANGE:[255,153,51,255]},w=(n(20),[i.CIRCLE,i.RECTANGLE,i.NONE]),p=0,E=0,C=function(e){var t=e.cvHelper,n=e.hide,i=e.setHide,r=Object(a.useState)(0),o=Object(s.a)(r,2),l=o[0],h=o[1],u=Object(a.useState)(0),v=Object(s.a)(u,2),d=v[0],g=v[1],m=Object.keys(f).map((function(e){return e}));return c.a.createElement("div",{className:"settings-pane "+n},c.a.createElement("h1",null,"Settings"),c.a.createElement("div",{id:"shapes-pane"},c.a.createElement("h2",null,"Shape"),c.a.createElement("select",{value:w[l],onChange:function(e){var n=w[e.target.selectedIndex];t.setShape(n),h(e.target.selectedIndex)}},w.map((function(e){return c.a.createElement("option",{key:e},e)})))),c.a.createElement("div",{id:"colors-pane"},c.a.createElement("h2",null,"Color"),c.a.createElement("select",{value:m[d].toLowerCase(),onChange:function(e){var n=f[m[e.target.selectedIndex]];t.setHighlightColor(n),g(e.target.selectedIndex)}},m.map((function(e){return c.a.createElement("option",{key:e},e.toLowerCase())})))),c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){i(!0),E=l,p=d}},"Save"),c.a.createElement("button",{onClick:function(){var e=w[E],n=f[m[p]];t.setShape(e),t.setHighlightColor(n),g(p),h(E),i(!0)}},"Cancel")))},S={video:{facingMode:"environment",width:{exact:1280},height:{exact:720}}},H=function(e){var t=Object(a.useState)(void 0),n=Object(s.a)(t,2),i=n[0],c=n[1];return Object(a.useEffect)((function(){if(i)return function(){i.getTracks().forEach((function(e){e.stop()}))};!function(e,t){b.apply(this,arguments)}(e,c)}),[i,e]),i};function b(){return(b=Object(u.a)(h.a.mark((function e(t,n){var i;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.mediaDevices.getUserMedia(t);case 3:i=e.sent,n(i),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),n(null);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}var y=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.cv;Object(v.a)(this,e),this.cv=t,this.videoEl=void 0,this.height=void 0,this.width=void 0,this.cvVideoCapture=void 0,this.cvSource=void 0,this.cvDestination=void 0,this.cvHSV=void 0,this.cvHSVSelectColor=void 0,this.highlightColor=f.RED,this.shape=i.CIRCLE,this.canvasElCurrent=void 0}return Object(d.a)(e,null,[{key:"newOpenCVHelper",value:function(){return new e}}]),Object(d.a)(e,[{key:"setVideoEl",value:function(e,t,n){if(this.videoEl=e,e.current)try{this.videoEl.current&&(this.cvVideoCapture=new this.cv.VideoCapture(this.videoEl.current)),this.setHeightAndWidth(t,n),this.cv.Mat&&this.setSourceAndDestination(t,n)}catch(i){console.log("ERR: ",i)}}},{key:"setSourceAndDestination",value:function(e,t){this.setHeightAndWidth(e,t),this.cvSource=new this.cv.Mat(e,t,this.cv.CV_8UC4),this.cvDestination=new this.cv.Mat(e,t,this.cv.CV_8UC1),this.cvHSV=new this.cv.Mat}},{key:"getHighlightColor",value:function(){return this.highlightColor}},{key:"setHighlightColor",value:function(e){this.highlightColor=e}},{key:"getShape",value:function(){return this.shape}},{key:"setShape",value:function(e){this.shape=e}},{key:"setHSVSelectColor",value:function(e){this.cvHSVSelectColor=e}},{key:"setCanvasElCurrent",value:function(e){this.canvasElCurrent||(this.canvasElCurrent=e)}},{key:"getLatestVideoFrame",value:function(){if(!this.videoEl||!this.videoEl.current)throw new Error("Video is not provided");return this.videoEl.current}},{key:"getFrameAsImage",value:function(){var e,t=null===(e=this.canvasElCurrent)||void 0===e?void 0:e.toDataURL("image/png"),n=document.createElement("a");n.download="ScreenCapture".concat((new Date).toISOString(),".png"),n.href=t,n.click()}},{key:"draw",value:function(e,t){if(this.cv.Mat&&this.cv.MatVector&&this.cvVideoCapture&&this.cvDestination&&this.cvHSVSelectColor&&this.cvHSV&&this.cvSource&&this.height&&this.width){this.cvVideoCapture.read(this.cvSource),this.cvSource.copyTo(this.cvDestination);var n=g.GetHsvFormatted(this.cvHSVSelectColor,-60,0),a=g.GetHsvFormatted(this.cvHSVSelectColor,60,255);this.cv.cvtColor(this.cvSource,this.cvHSV,this.cv.COLOR_RGB2HSV),this.cvSource.convertTo(this.cvSource,-1,2,0);var c=new this.cv.Mat(this.cvHSV.rows,this.cvHSV.cols,this.cvHSV.type(),n),r=new this.cv.Mat(this.cvHSV.rows,this.cvHSV.cols,this.cvHSV.type(),a);this.cv.inRange(this.cvHSV,c,r,this.cvHSV);var o=new this.cv.MatVector,s=new this.cv.Mat;this.cv.findContours(this.cvHSV,o,s,this.cv.RETR_LIST,this.cv.CHAIN_APPROX_SIMPLE);var l=this.groupContoursAsRectangles(o);switch(this.shape){case i.RECTANGLE:this.drawRect(l);break;case i.CIRCLE:this.drawCircle(l)}this.cv.imshow(t,this.cvDestination),c.delete(),r.delete(),o.delete(),s.delete(),l.delete()}}},{key:"setHeightAndWidth",value:function(e,t){this.height=e,this.width=t}},{key:"groupContoursAsRectangles",value:function(e){for(var t=new this.cv.RectVector,n=new this.cv.IntVector,i=0;i<e.size();i++){var a=e.get(i),c=this.cv.boundingRect(a);t.push_back(c),t.push_back(c)}return this.cv.groupRectangles(t,n,1,.8),n.delete(),t}},{key:"drawRect",value:function(e){for(var t=0;t<e.size();t++){var n=e.get(t),i=new this.cv.Point(n.x,n.y),a=new this.cv.Point(n.x+n.width,n.y+n.height);n.width>20&&n.height>20&&this.cv.rectangle(this.cvDestination,i,a,this.highlightColor,5,8)}}},{key:"drawCircle",value:function(e){for(var t=0;t<e.size();t++){var n=e.get(t),i=Math.max(n.width,n.height)/2,a=n.x+n.width/2,c=n.y+n.height/2,r=new this.cv.Point(a,c);n.width>20&&n.height>20&&this.cv.circle(this.cvDestination,r,i,this.highlightColor,5,8)}}}]),e}(),k=n(4),O=n(5),V=(n(26),function(e){var t=e.cvHelper,n=e.height,i=e.setHideSetting,a=e.setHideHelp;return c.a.createElement(c.a.Fragment,null,c.a.createElement("nav",{style:{height:n}},c.a.createElement("button",{onClick:a},c.a.createElement(k.a,{icon:O.c,color:"white"})),c.a.createElement("button",{onClick:function(){t.getFrameAsImage()}},c.a.createElement(k.a,{icon:O.a})),c.a.createElement("button",{onClick:i},c.a.createElement(k.a,{icon:O.b}))))}),R=(n(27),function(e){var t=e.hide;return c.a.createElement("div",{id:"welcome-pu",className:t?"hidden":""},c.a.createElement("h1",null,c.a.createElement("span",null,"Welcome to"),c.a.createElement("br",null),"Bold Colors"),c.a.createElement("p",null,"Start by tapping an object below"))}),j=(n(28),[{image:"./img/person.png",desc:"Point application to climbing way"},{image:"./img/fingers.png",desc:"Tap on the location you'd like to route"},{image:"./img/brain.png",desc:"Memorize and/or photograph the route"}]),I=function(e){var t=e.hide,n=e.hideFunc,i=e.windowWidth,a=e.windowHeight,r=j.map((function(e,t){return c.a.createElement(L,{key:t,stepData:e})})),o={left:i/15+"px",top:a/15+"px"};return c.a.createElement("div",{style:o,className:"helpPane "+(t?"hidden":"")},c.a.createElement("button",{onClick:function(){n(!0)}},c.a.createElement(k.a,{icon:O.d})),c.a.createElement("h1",null,c.a.createElement("span",null,"How to use"),c.a.createElement("br",null),"Bold Colors"),c.a.createElement("ol",null,r))},L=function(e){var t=e.stepData,n="url('"+t.image+"')";return c.a.createElement("li",null,t.desc,c.a.createElement("div",{className:"instruct-img",style:{backgroundImage:n}}," "))},x=(n(29),y.newOpenCVHelper());var W=function(){var e=Object(a.useState)(!1),t=Object(s.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)(!0),o=Object(s.a)(r,2),l=o[0],h=o[1],u=Object(a.useState)(!0),v=Object(s.a)(u,2),d=v[0],g=v[1],f=Object(a.useState)(window.innerHeight),w=Object(s.a)(f,2),p=w[0],E=w[1],b=Object(a.useState)(window.innerWidth),y=Object(s.a)(b,2),k=y[0],O=y[1],j=Object(a.useRef)(null),L=H(S);return Object(a.useEffect)((function(){window.addEventListener("resize",(function(){E(window.innerHeight),O(window.innerWidth)}))})),j&&x.setVideoEl(j,.9*p,k),L&&j.current&&!j.current.srcObject&&(j.current.srcObject=L),c.a.createElement("div",{className:"main-app"},c.a.createElement(I,{hide:d,hideFunc:g,windowWidth:k,windowHeight:p}),c.a.createElement(R,{hide:n}),c.a.createElement(m,{cvHelper:x,hideWelcome:n,hideWelcomeFunc:i}),c.a.createElement(C,{cvHelper:x,hide:l?"hidden":"",setHide:h}),c.a.createElement("div",null,c.a.createElement("video",{autoPlay:!0,playsInline:!0,muted:!0,hidden:!0,onCanPlay:function(){return function(e){var t;null===(t=e.current)||void 0===t||t.play()}(j)},height:.9*p,width:k,ref:j,id:"video-el"})),c.a.createElement(V,{cvHelper:x,height:.08*p,setHideSetting:function(){h(!l)},setHideHelp:function(){g(!d)}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(W,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[13,1,2]]]);
//# sourceMappingURL=main.9eac67f0.chunk.js.map