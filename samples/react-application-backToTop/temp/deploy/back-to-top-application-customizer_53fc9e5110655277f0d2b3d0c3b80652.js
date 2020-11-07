define("c0e7ee97-a9a1-41d2-9c62-865976677a00_0.0.1",["BackToTopApplicationCustomizerStrings","@microsoft/sp-application-base","@microsoft/sp-core-library","react","react-dom","@microsoft/decorators"],function(t,e,o,r,n,i){return function(t){var e={};function o(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(r,n,function(e){return t[e]}.bind(null,n));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",function(){var t,e=document.getElementsByTagName("script"),r=new RegExp("\\/back-to-top-application-customizer(_[a-z0-9-]+)*\\.js","i");if(e&&e.length)for(var n=0;n<e.length;n++)if(e[n]){var i=e[n].getAttribute("src");if(i&&i.match(r)){t=i.substring(0,i.lastIndexOf("/")+1);break}}if(!t)for(var c in window.__setWebpackPublicPathLoaderSrcRegistry__)if(c&&c.match(r)){t=c.substring(0,c.lastIndexOf("/")+1);break}o.p=t}(),o(o.s="f2k8")}({"F/07":function(e,o){e.exports=t},GPet:function(t,o){t.exports=e},"L4/P":function(t,e,o){t.exports=o.p+"top_4be806c8347fd3986c4e63e3a9a4d241.png"},UWqr:function(t,e){t.exports=o},cDcd:function(t,e){t.exports=r},f2k8:function(t,e,o){"use strict";o.r(e);var r,n=o("wxtz"),i=o("UWqr"),c=o("GPet"),s=o("cDcd"),p=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.topClick=function(){document.querySelectorAll('[role="main"]')[0].scrollTo({top:0,behavior:"smooth"})},e}return p(e,t),e.prototype.render=function(){var t=this;return s.createElement("div",{onClick:function(){t.topClick()}},this.props.isRight?s.createElement("a",{href:"#",style:{position:"fixed",bottom:this.props.bottom,right:this.props.right,width:this.props.width,height:this.props.height,zIndex:9999,cursor:"pointer",textDecoration:"none",transition:"opacity 0.3s ease-out",backgroundImage:"url("+this.props.imageURL+")"}}):s.createElement("a",{href:"#",style:{position:"fixed",bottom:this.props.bottom,left:this.props.right,width:this.props.width,height:this.props.height,zIndex:9999,cursor:"pointer",textDecoration:"none",transition:"opacity 0.3s ease-out",backgroundImage:"url("+this.props.imageURL+")"}}))},e}(s.Component),a=o("F/07"),u=o("faye"),f=function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),h=function(t,e,o,r){var n,i=arguments.length,c=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,r);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},d=o("L4/P"),m=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return f(e,t),e.prototype._onDispose=function(){console.log("Disposed custom bottom placeholders.")},e.prototype._renderPlaceHolders=function(){if(!this._bottomPlaceholder||this._bottomPlaceholder.isDisposed){if(this._bottomPlaceholder=this.context.placeholderProvider.tryCreateContent(c.PlaceholderName.Bottom,{onDispose:this._onDispose}),!this._bottomPlaceholder)return void console.error("The expected placeholder (Bottom) was not found.");if(this.properties){var t=this.properties.width?this.properties.width:64,e=this.properties.height?this.properties.height:64,o=this.properties.right?this.properties.right:30,r=this.properties.bottom?this.properties.bottom:60,n=this.properties.imageURL?this.properties.imageURL:d;if(this._bottomPlaceholder.domElement){var i=s.createElement(l,{width:t,height:e,right:o,bottom:r,imageURL:n});u.render(i,this._bottomPlaceholder.domElement)}}}},e.prototype.onInit=function(){var t=this;return i.Log.info("BackToTopApplicationCustomizer","Initialized "+a.Title),document.querySelectorAll('[role="main"]').length>0&&(document.querySelectorAll('[role="main"]')[0].onscroll=function(){document.querySelectorAll('[role="main"]')[0].scrollTop>20?t.context.placeholderProvider.changedEvent.add(t,t._renderPlaceHolders):t._bottomPlaceholder&&(t._bottomPlaceholder.dispose(),console.log(t._bottomPlaceholder.isDisposed))}),Promise.resolve()},h([n.override],e.prototype,"onInit",null),e}(c.BaseApplicationCustomizer);e.default=m},faye:function(t,e){t.exports=n},wxtz:function(t,e){t.exports=i}})});