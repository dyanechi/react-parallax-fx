"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("react"),e=require("styled-components");function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function r(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}})),e.default=t,Object.freeze(e)}var o=r(t),i=n(t),a=n(e);function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}function f(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==n)return;var r,o,i=[],a=!0,c=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){c=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}(t,e)||g(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t){return function(t){if(Array.isArray(t))return p(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||g(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(t,e){if(t){if("string"==typeof t)return p(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(t,e):void 0}}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}const h=new Map,m=new WeakMap;let v,y=0;function b(t){return Object.keys(t).sort().filter((e=>void 0!==t[e])).map((e=>{return`${e}_${"root"===e?(n=t.root,n?(m.has(n)||(y+=1,m.set(n,y.toString())),m.get(n)):"0"):t[e]}`;var n})).toString()}function w(t,e,n={},r=v){if(void 0===window.IntersectionObserver&&void 0!==r){const o=t.getBoundingClientRect();return e(r,{isIntersecting:r,target:t,intersectionRatio:"number"==typeof n.threshold?n.threshold:0,time:0,boundingClientRect:o,intersectionRect:o,rootBounds:o}),()=>{}}const{id:o,observer:i,elements:a}=function(t){let e=b(t),n=h.get(e);if(!n){const r=new Map;let o;const i=new IntersectionObserver((e=>{e.forEach((e=>{var n;const i=e.isIntersecting&&o.some((t=>e.intersectionRatio>=t));t.trackVisibility&&void 0===e.isVisible&&(e.isVisible=i),null==(n=r.get(e.target))||n.forEach((t=>{t(i,e)}))}))}),t);o=i.thresholds||(Array.isArray(t.threshold)?t.threshold:[t.threshold||0]),n={id:e,observer:i,elements:r},h.set(e,n)}return n}(n);let c=a.get(t)||[];return a.has(t)||a.set(t,c),c.push(e),i.observe(t),function(){c.splice(c.indexOf(e),1),0===c.length&&(a.delete(t),i.unobserve(t)),0===a.size&&(i.disconnect(),h.delete(o))}}function E({threshold:t,delay:e,trackVisibility:n,rootMargin:r,root:i,triggerOnce:a,skip:c,initialInView:l,fallbackInView:s,onChange:u}={}){const f=o.useRef(),d=o.useRef(),[g,p]=o.useState({inView:!!l});d.current=u;const h=o.useCallback((o=>{void 0!==f.current&&(f.current(),f.current=void 0),c||o&&(f.current=w(o,((t,e)=>{p({inView:t,entry:e}),d.current&&d.current(t,e),e.isIntersecting&&a&&f.current&&(f.current(),f.current=void 0)}),{root:i,rootMargin:r,threshold:t,trackVisibility:n,delay:e},s))}),[Array.isArray(t)?t.toString():t,i,r,a,c,n,s,e]);o.useEffect((()=>{f.current||!g.entry||a||c||p({inView:!!l})}));const m=[h,g.inView,g.entry];return m.ref=m[0],m.inView=m[1],m.entry=m[2],m}function S(e){var n=f(t.useState(0),2),r=n[0],o=n[1];return t.useLayoutEffect((function(){function t(){o(Math.floor(window.pageYOffset/e)*e)}return window.addEventListener("scroll",t),t(),function(){return window.removeEventListener("scroll",t)}}),[]),r}var O,j,I,x={TRANSFORM:["translate","translateX","translateY","scale","rotate"],FILTERS:["blur","brightness","contrast","grayscale","hueRotate","saturate","sepia","dropShadow"]},F=function(t){var e=[];if("string"==typeof t){if(4===t.length?t+="f":7===t.length&&(t+="ff"),/^#[0-9a-fA-F]{8}$/i.test(t))t.replace("#","").split(/(..)/g).filter((function(t){return t})).forEach((function(t){return e.push(Number("0x"+t))})),e[e.length-1]=e[e.length-1]/255;else{if(!/^#[0-9a-fA-F]{4}$/i.test(t))throw new Error("".concat(t," is invalid. 'Color' must be valid Hex or RGBA value. "));t.replace("#","").split(/(.)/g).filter((function(t){return t})).forEach((function(t){return e.push(17*Number("0x"+t))})),e[e.length-1]=e[e.length-1]/255}return e}return t},A=function(t,e,n,r){if(t===e)return t;var o=t<e?e*n+(t-t*n):t-t*n+e*n;return r?r(o):o},T=function(t,e,n){var r=F(t),o=F(e);return r.map((function(t,e){return A(t,o[e],n)}))},k=function(t,e,n,r,o){var i=t+(r||0),a=i+e-i;if(a<=0)throw new Error("'scrollHeight' must be greater than zero");var c=(n-i)/a,l=c<0?0:c>1?1:c;return o&&o({isTransitioning:!!(l>0&&l<1),result:l,scrollHeight:a}),l},H=function(t,e){if("number"==typeof t)return t;if("string"==typeof t){if(/[0-9]%$/g.test(t.toString()))return e?e*(parseInt(t)/100):parseInt(t)/100;if(/[0-9](px)$/g.test(t.toString()))return console.log("".concat(t," is in pixels!")),parseInt(t);if(/[0-9](em)$/g.test(t.toString()))return console.log("".concat(t," is in em!")),16*parseInt(t);if(/^[0-9](vh)$/g.test(t.toString()))return console.log("".concat(t," is in vh!")),parseInt(t)/100*window.innerHeight;if(/^[0-9](vw)$/g.test(t.toString()))return console.log("".concat(t," is in vw!")),parseInt(t)/100*window.innerWidth}return console.warn("Couldn't find any match for",t),0},P=function(){var e=f(t.useState({totalLength:0,frames:new Array,currentFrame:0,extend:!1,isInitialized:!1,onChange:function(t){return 0}}),2),n=e[0],r=e[1],o=f(t.useState(),2),i=o[0];o[1],t.useEffect((function(){console.log("useKeyframes: frame changed to",i)}),[i]);t.useLayoutEffect((function(){console.info("frames updated")}),[n.frames]);return{get:n,set:function(t){if(n.isInitialized)console.warn("useKeyframes 'config' is already initialized.");else{var e=0;t.forEach((function(t){return e+=H(t.length)})),r(l(l({},n),{},{frames:l({},t),totalLength:e}))}return console.log("'useKeyframe': config updated"),n},init:function(t,e){if(n.isInitialized)console.warn("useKeyframes 'config' is already initialized.");else{var o=new Array,i=0,a=0,c={},s={};t.forEach((function(t){Object.assign(s,t),o.push(l(l({},s),{},{start:i})),console.log(c,o[a-1],s,o[a]),Object.assign(c,s),i+=t.length,a++})),console.log(o),r(l(l({},n),{},{frames:o,totalLength:i,isInitialized:!0})),e&&e(i),console.log("'useKeyframe': initialized")}},getLength:function(){return n.totalLength},getFrames:function(){return n.frames},getCurrentFrame:function(t){var e=function(t){var e=n.frames,o=t*n.totalLength;if(o>e[e.length-1].start)return r(l(l({},n),{},{currentFrame:e.length-1})),e.length-1;if(o<e[0].length)return r(l(l({},n),{},{currentFrame:0})),0;if(o>e[n.currentFrame].start&&o<e[n.currentFrame].length)return n.currentFrame;var i=0,a=0,c=e.length-1,s=Math.floor((c+a)/2),u=!1;for(;!u&&a<=c&&i<10;){i++;var f=e[s],d=f.start,g=d+f.length;if(o<d?c=s-1:o>g&&(a=s+1),u=d<o&&o<g)return r(l(l({},n),{},{currentFrame:s})),s;s=Math.floor((c+a)/2)}return n.currentFrame}(t),o=e<=1?0:e>n.frames.length-2?n.frames.length-1:e-1,i=e>=n.frames.length-2?n.frames.length-1:e+1,a=n.frames[e];n.frames[o];var c=n.frames[i],s=a.start/n.totalLength,u=s+a.length/n.totalLength;return{curFrame:a,nextFrame:c,curProgress:1/(u-s)*t-u/(u-s)+1}},getAllFrames:function(){return n.frames},isInitialized:n.isInitialized}},z=["length","offset"],L=["length","offset"],R=function(e){var n=e.startScroll,r=e.endScroll,o=e.fadeIn,i=e.fadeOut,a=e.keyframes,c=e.offset,g=e.disabled,p=e.extend,h=e.callback,m=E(),v=m.ref,y=m.inView,b=m.entry,w=null==b?void 0:b.target,O=S(1),j=f(t.useState(0),2),I=j[0],F=j[1],R=f(t.useState({isTransitioning:!1,inView:y}),2),V=R[0],C=R[1],M=f(t.useState({startScroll:function(t){switch(t){case"top":return document.documentElement.scrollTop;case"center":return+document.documentElement.scrollTop+document.documentElement.clientHeight/2;case"bottom":return+document.documentElement.scrollTop+document.documentElement.clientHeight;default:return t||+document.documentElement.scrollTop+document.documentElement.clientHeight}}(n||"bottom"),endScroll:r?H(r):300,scrollHeight:0}),2),$=M[0],N=M[1],q=P();function Y(t,e){var n=t.opacity,r=t.transform,o=t.background,i=t.gradient,a=t.filter,c=e;n&&(w.style.opacity=function(t,e){return A.apply(void 0,d(t).concat([e])).toFixed(3)}(d(n),c)).toString(),r&&(w.style.transform=function(t,e){var n=t.translate,r=t.translateX,o=t.translateY,i=t.scale,a=t.rotate,c="";if(n){var l=A.apply(void 0,d(n[0]).concat([e])),s=A.apply(void 0,d(n[1]).concat([e]));c+="translate(".concat(l,"px, ").concat(s,"px) ")}else r?c+="translateX(".concat(A.apply(void 0,d(r).concat([e])),"px) "):o&&(c+="translateY(".concat(A.apply(void 0,d(o).concat([e])),"px) "));return i&&(c+="scale(".concat(A.apply(void 0,d(i).concat([e])),") ")),a&&(c+="rotate(".concat(A.apply(void 0,d(a).concat([e])),"deg) ")),c}(l({},r),c)),o&&(w.style.backgroundColor=function(t,e){var n=T.apply(void 0,d(t).concat([e]));return"rgba(".concat(n.join(","),") ")}(d(o),c)),i&&(w.style.background=function(t,e){var n=t.type,r=t.dir,o=t.start,i=t.end;if(o.length<2||i.length<2)throw new Error("'start' and 'end' must have at least 2 elements");if(o.length!==i.length)throw new Error("'start' and 'end' array length must be the same");for(var a=[],c=0;c<o.length;c++){var l=T(o[c],i[c],e);a.push("rgba(".concat(l.join(","),")"))}var s=r&&"radial"!==n?A.apply(void 0,d(r).concat([e]))+"deg,":"";return"".concat(n&&n||"linear","-gradient(").concat(s).concat(a.join(","),")")}(l({},i),c)),a&&(w.style.filter=function(t,e){var n=t.blur,r=t.brightness,o=t.contrast,i=t.dropShadow,a=t.grayscale,c=t.hueRotate,l=t.opacity,s=t.saturate,u=t.sepia,f="";return n&&(f+="blur(".concat(A.apply(void 0,d(n).concat([e])),"px) ")),r&&(f+="brightness(".concat(A.apply(void 0,d(r).concat([e])),"%) ")),o&&(f+="contrast(".concat(A.apply(void 0,d(o).concat([e])),"%) ")),a&&(f+="grayscale(".concat(A.apply(void 0,d(a).concat([e])),"%) ")),c&&(f+="hue-rotate(".concat(A.apply(void 0,d(c).concat([e])),"deg) ")),l&&(f+="opacity(".concat(A.apply(void 0,d(l).concat([e])),"%) ")),s&&(f+="saturate(".concat(A.apply(void 0,d(s).concat([e])),"%) ")),u&&(f+="sepia(".concat(A.apply(void 0,d(u).concat([e])),"%) ")),i&&(f+="drop-shadow(".concat(A.apply(void 0,d(i).concat([e])),"px) ")),f}(l({},a),c))}function B(){var t={progress:o?0:i?1:0,animations:o||(i||{opacity:[1,1]})},e={progress:i?0:o?1:0,animations:i||(o||{opacity:[1,1]})};I<=0&&Y(t.animations,t.progress),I>=1&&Y(e.animations,e.progress)}function D(){var t=o.length,e=o.offset,n=u(o,z),r=_(H(t,w.offsetHeight),e),i=r.end,a=r.current/i/i,c=a<0?0:a>1?1:a;c>0&&c<1&&Y(l({},n),c)}function K(){var t=i.length,e=i.offset,n=u(i,L),r=_(H(t,w.offsetHeight),e),o=r.end,a=r.current/o/o-(1-o)/o,c=a<0?0:a>1?1:a;c>0&&c<1&&Y(l({},n),c)}function X(){if(!q.isInitialized)return function(){if(!q.isInitialized){var t=a.map((function(t){return l(l({},t),{},{start:0,length:H(t.length,w.offsetHeight)})}));q.init(t,(function(t){p&&t>$.scrollHeight&&N(l(l({},$),{},{scrollHeight:t,endScroll:t}))}))}}();var t=q.getCurrentFrame(I),e=t.curFrame,n=t.nextFrame,r=t.curProgress,o=function(t,e){var n={transform:{},filter:{}};return Object.entries(t).forEach((function(r){var o=f(r,2),i=o[0];o[1];var a,c,u={};"gradient"===i?u.gradient={type:t.gradient.type,dir:[t.gradient.dir||0,(null===(a=e.gradient)||void 0===a?void 0:a.dir)||t.gradient.dir],start:t.gradient.colors,end:(null===(c=e.gradient)||void 0===c?void 0:c.colors)||t.gradient.colors}:x.FILTERS.includes(i)?u.filter=l(l({},n.filter),{},s({},i,[t[i]||0,e[i]||t[i]])):x.TRANSFORM.includes(i)?u.transform=l(l({},n.transform),{},s({},i,[t[i]||0,e&&e[i]||0])):u=s({},i,[t[i],e[i]]),n=l(l({},n),u)})),console.log("Merged",n),n}(e,n),i={};return"number"!=typeof e&&"number"!=typeof n&&(Object.entries(e).forEach((function(t){var r=f(t,2),o=r[0];r[1];var a=s({},o,[e[o],n[o]]);i=l(l({},i),a)})),console.log(i),requestAnimationFrame((function(){return Y(o,r)}))),i}function _(t,e){var n=(e||0)/$.scrollHeight,r=t/$.scrollHeight+n;return{start:n,end:r,current:n+r*I}}t.useEffect((function(){q.isInitialized&&console.info(q.getCurrentFrame(.6))}),[q.isInitialized]),t.useEffect((function(){return!g&&w&&function(){var t=k(w.offsetTop,$.endScroll,$.startScroll+O,c,(function(t){var e=t.isTransitioning;C(l(l({},V),{},{isTransitioning:e}))}));F(t)}(),function(){}}),[O]),t.useLayoutEffect((function(){V.isTransitioning&&(a?requestAnimationFrame(X):(o&&requestAnimationFrame(D),i&&requestAnimationFrame(K)))}),[I,V.isTransitioning,o,i,a]),t.useLayoutEffect((function(){console.info("Transitioning changed to: ",V.isTransitioning),w&&requestAnimationFrame(B),h&&h()}),[V.isTransitioning,h]),t.useEffect((function(){return C(l(l({},V),{},{inView:y}))}),[y]);var G=function(){if(w){var t=null==r?void 0:r.toString(),e=t?t.includes("%")?H(t)*w.offsetHeight:parseInt(t):w.offsetHeight;k(w.offsetTop,e,$.startScroll+O,c,(function(t){var n=t.isTransitioning,r=t.scrollHeight;C(l(l({},V),{},{isTransitioning:n})),N(l(l({},$),{},{endScroll:e,scrollHeight:r})),B()})),w.style.background=function(t){if("string"==typeof t){if(0===t.length)return"";if(4===t.length?t+="f":7===t.length&&(t+="ff"),!/^#[0-9a-fA-F]{8}$/i.test(t)&&!/^#[0-9a-fA-F]{4}$/i.test(t))throw new Error("".concat(t," is invalid. 'Color' must be valid Hex or RGBA value. "))}return t}(o&&o.background&&o.background[0]||i&&i.background&&i.background[0]||""),a&&X()}};return t.useEffect((function(){return G()}),[w]),t.useEffect((function(){}),[]),{ref:v,status:V}},V=function(e){var n=e.startScroll,r=e.endScroll,o=e.speed,a=e.opacity,c=e.transform,s=e.offset,u=e.background,g=e.gradient,p=e.filter,h=e.disabled,m=e.className,v=e.children,y=E({}),b=y.ref,w=y.inView,O=y.entry,j=null==O?void 0:O.target,I=S(1),x=f(t.useState(0),2),F=x[0],k=x[1],H=function(t){switch(t){case"top":return document.documentElement.scrollTop;case"center":return+document.documentElement.scrollTop+document.documentElement.clientHeight/2;case"bottom":return+document.documentElement.scrollTop+document.documentElement.clientHeight;default:return t||+document.documentElement.scrollTop+document.documentElement.clientHeight}},P=f(t.useState({startScroll:H(n||"top"),endScroll:r?r.toString().includes("%")?1e3:parseInt(r.toString()):300,speed:(o||20)/100}),2),z=P[0],L=P[1],R=function(){if(j){var t=j.offsetParent.offsetTop+(s||0),e=t+z.endScroll-t,n=(z.startScroll+I-t)/e;k(n<0?0:n>1?1:n)}},V=function(){if(j){if(a){var t=A.apply(void 0,d(a).concat([F]));j.style.opacity=t.toFixed(3)}if(u){var e=T.apply(void 0,d(u).concat([F]));j.style.backgroundColor="rgba(".concat(e.join(","),") ")}else if(g){var n=g.type,r=g.dir,o=g.start,i=g.end;if(o.length<2||i.length<2)throw new Error("'start' and 'end' must have at least 2 elements");if(o.length!==i.length)throw new Error("'start' and 'end' array length must be the same");for(var l=[],s=0;s<o.length;s++){var f=T(o[s],i[s],F);l.push("rgba(".concat(f.join(","),")"))}var h=r&&"radial"!==n?A.apply(void 0,d(r).concat([F]))+"deg,":"";console.log(n,r,o,i),console.log("".concat(n&&n||"linear","-gradient(").concat(h).concat(l.join(" "),")")),j.style.background="".concat(n&&n||"linear","-gradient(").concat(h).concat(l.join(","),")")}var m="";if(c){var v=c.translate,y=c.translateX,b=c.translateY,w=c.scale,E=c.rotate;if(v){var S=A.apply(void 0,d(v[0]).concat([F])),O=A.apply(void 0,d(v[1]).concat([F]));m+="translate(".concat(S,"px, ").concat(O,"px) ")}else y?m+="translateX(".concat(A.apply(void 0,d(y).concat([F])),"px) "):b&&(m+="translateY(".concat(A.apply(void 0,d(b).concat([F])),"px) "));w&&(m+="scale(".concat(A.apply(void 0,d(w).concat([F])),") ")),E&&(m+="rotate(".concat(A.apply(void 0,d(E).concat([F])),"deg) ")),""!==m&&(j.style.transform=m)}if(p){var I=A.apply(void 0,d(p.blur||[0,0]).concat([F]));j.style.filter="blur(".concat(I,"px) ")}}};t.useEffect((function(){if(!h)return R(),function(){}}),[I]),t.useEffect((function(){requestAnimationFrame(V)}),[F]);var C=function(){L(l(l({},z),{},{startScroll:H(n||"top")}))};return t.useEffect((function(){return function(){if(j){console.log(w);var t=null==r?void 0:r.toString(),e=t?t.includes("%")?parseInt(t)/100*j.offsetHeight:parseInt(t):j.offsetParent.offsetHeight;L(l(l({},z),{},{endScroll:e})),R(),V()}}(),function(){}}),[j]),t.useEffect((function(){return k(0),window.addEventListener("resize",C),function(){return window.removeEventListener("resize",C)}}),[]),i.default.createElement("div",{style:{position:"relative",width:"100%",height:"fit-content"}},i.default.createElement("div",{ref:b,style:{position:"relative",width:"100%",height:"fit-content",willChange:"transform, opacity, background"},className:m},v&&"function"==typeof v?v({isTransitioning:F>0&&F<1,inView:w}):v))},C=["children","className"],M=a.default.div(O||(j=["\n  width: 100%;\n  height: fit-content;\n"],I||(I=j.slice(0)),O=Object.freeze(Object.defineProperties(j,{raw:{value:Object.freeze(I)}})))),$=function(t){var e=t.children,n=t.className,r=u(t,C),o=R(l({},r)),a=o.ref,c=o.status;return i.default.createElement(M,{ref:a,className:n},e&&"function"==typeof e?e(c):e)};exports.Parallax=V,exports.UseParallax=$,exports.getRGBA=F,exports.useParallax=R;
//# sourceMappingURL=index.js.map
