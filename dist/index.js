!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("react"),require("styled-components")):"function"==typeof define&&define.amd?define(["exports","react","styled-components"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["react-parallax-pro"]={},t.React,t.styled)}(this,(function(t,e,n){"use strict";function r(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function o(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}})),e.default=t,Object.freeze(e)}var i=o(e),a=r(e),c=r(n);function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}function d(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==n)return;var r,o,i=[],a=!0,c=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){c=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}(t,e)||p(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(t){return function(t){if(Array.isArray(t))return h(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||p(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){if(t){if("string"==typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(t,e):void 0}}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}const m=new Map,y=new WeakMap;let v,b=0;function w(t){return Object.keys(t).sort().filter((e=>void 0!==t[e])).map((e=>{return`${e}_${"root"===e?(n=t.root,n?(y.has(n)||(b+=1,y.set(n,b.toString())),y.get(n)):"0"):t[e]}`;var n})).toString()}function E(t,e,n={},r=v){if(void 0===window.IntersectionObserver&&void 0!==r){const o=t.getBoundingClientRect();return e(r,{isIntersecting:r,target:t,intersectionRatio:"number"==typeof n.threshold?n.threshold:0,time:0,boundingClientRect:o,intersectionRect:o,rootBounds:o}),()=>{}}const{id:o,observer:i,elements:a}=function(t){let e=w(t),n=m.get(e);if(!n){const r=new Map;let o;const i=new IntersectionObserver((e=>{e.forEach((e=>{var n;const i=e.isIntersecting&&o.some((t=>e.intersectionRatio>=t));t.trackVisibility&&void 0===e.isVisible&&(e.isVisible=i),null==(n=r.get(e.target))||n.forEach((t=>{t(i,e)}))}))}),t);o=i.thresholds||(Array.isArray(t.threshold)?t.threshold:[t.threshold||0]),n={id:e,observer:i,elements:r},m.set(e,n)}return n}(n);let c=a.get(t)||[];return a.has(t)||a.set(t,c),c.push(e),i.observe(t),function(){c.splice(c.indexOf(e),1),0===c.length&&(a.delete(t),i.unobserve(t)),0===a.size&&(i.disconnect(),m.delete(o))}}function S({threshold:t,delay:e,trackVisibility:n,rootMargin:r,root:o,triggerOnce:a,skip:c,initialInView:l,fallbackInView:s,onChange:u}={}){const f=i.useRef(),d=i.useRef(),[g,p]=i.useState({inView:!!l});d.current=u;const h=i.useCallback((i=>{void 0!==f.current&&(f.current(),f.current=void 0),c||i&&(f.current=E(i,((t,e)=>{p({inView:t,entry:e}),d.current&&d.current(t,e),e.isIntersecting&&a&&f.current&&(f.current(),f.current=void 0)}),{root:o,rootMargin:r,threshold:t,trackVisibility:n,delay:e},s))}),[Array.isArray(t)?t.toString():t,o,r,a,c,n,s,e]);i.useEffect((()=>{f.current||!g.entry||a||c||p({inView:!!l})}));const m=[h,g.inView,g.entry];return m.ref=m[0],m.inView=m[1],m.entry=m[2],m}function O(t){var n=d(e.useState(0),2),r=n[0],o=n[1];return e.useLayoutEffect((function(){function e(){o(Math.floor(window.pageYOffset/t)*t)}return window.addEventListener("scroll",e),e(),function(){return window.removeEventListener("scroll",e)}}),[]),r}var j,I,x,F={TRANSFORM:["translate","translateX","translateY","scale","rotate"],FILTERS:["blur","brightness","contrast","grayscale","hueRotate","saturate","sepia","dropShadow"]},A=function(t){var e=[];if("string"==typeof t){if(4===t.length?t+="f":7===t.length&&(t+="ff"),/^#[0-9a-fA-F]{8}$/i.test(t))t.replace("#","").split(/(..)/g).filter((function(t){return t})).forEach((function(t){return e.push(Number("0x"+t))})),e[e.length-1]=e[e.length-1]/255;else{if(!/^#[0-9a-fA-F]{4}$/i.test(t))throw new Error("".concat(t," is invalid. 'Color' must be valid Hex or RGBA value. "));t.replace("#","").split(/(.)/g).filter((function(t){return t})).forEach((function(t){return e.push(17*Number("0x"+t))})),e[e.length-1]=e[e.length-1]/255}return e}return t},T=function(t,e,n,r){if(t===e)return t;var o=t<e?e*n+(t-t*n):t-t*n+e*n;return r?r(o):o},k=function(t,e,n){var r=A(t),o=A(e);return r.map((function(t,e){return T(t,o[e],n)}))},H=function(t,e,n,r,o){var i=t+(r||0),a=i+e-i;if(a<=0)throw new Error("'scrollHeight' must be greater than zero");var c=(n-i)/a,l=c<0?0:c>1?1:c;return o&&o({isTransitioning:!!(l>0&&l<1),result:l,scrollHeight:a}),l},P=function(t,e){if("number"==typeof t)return t;if("string"==typeof t){if(/[0-9]%$/g.test(t.toString()))return e?e*(parseInt(t)/100):parseInt(t)/100;if(/[0-9](px)$/g.test(t.toString()))return console.log("".concat(t," is in pixels!")),parseInt(t);if(/[0-9](em)$/g.test(t.toString()))return console.log("".concat(t," is in em!")),16*parseInt(t);if(/^[0-9](vh)$/g.test(t.toString()))return console.log("".concat(t," is in vh!")),parseInt(t)/100*window.innerHeight;if(/^[0-9](vw)$/g.test(t.toString()))return console.log("".concat(t," is in vw!")),parseInt(t)/100*window.innerWidth}return console.warn("Couldn't find any match for",t),0},z=function(){var t=d(e.useState({totalLength:0,frames:new Array,currentFrame:0,extend:!1,isInitialized:!1,onChange:function(t){return 0}}),2),n=t[0],r=t[1],o=d(e.useState(),2),i=o[0];o[1],e.useEffect((function(){console.log("useKeyframes: frame changed to",i)}),[i]);e.useLayoutEffect((function(){console.info("frames updated")}),[n.frames]);return{get:n,set:function(t){if(n.isInitialized)console.warn("useKeyframes 'config' is already initialized.");else{var e=0;t.forEach((function(t){return e+=P(t.length)})),r(s(s({},n),{},{frames:s({},t),totalLength:e}))}return console.log("'useKeyframe': config updated"),n},init:function(t,e){if(n.isInitialized)console.warn("useKeyframes 'config' is already initialized.");else{var o=new Array,i=0,a=0,c={},l={};t.forEach((function(t){Object.assign(l,t),o.push(s(s({},l),{},{start:i})),console.log(c,o[a-1],l,o[a]),Object.assign(c,l),i+=t.length,a++})),console.log(o),r(s(s({},n),{},{frames:o,totalLength:i,isInitialized:!0})),e&&e(i),console.log("'useKeyframe': initialized")}},getLength:function(){return n.totalLength},getFrames:function(){return n.frames},getCurrentFrame:function(t){var e=function(t){var e=n.frames,o=t*n.totalLength;if(o>e[e.length-1].start)return r(s(s({},n),{},{currentFrame:e.length-1})),e.length-1;if(o<e[0].length)return r(s(s({},n),{},{currentFrame:0})),0;if(o>e[n.currentFrame].start&&o<e[n.currentFrame].length)return n.currentFrame;var i=0,a=0,c=e.length-1,l=Math.floor((c+a)/2),u=!1;for(;!u&&a<=c&&i<10;){i++;var f=e[l],d=f.start,g=d+f.length;if(o<d?c=l-1:o>g&&(a=l+1),u=d<o&&o<g)return r(s(s({},n),{},{currentFrame:l})),l;l=Math.floor((c+a)/2)}return n.currentFrame}(t),o=e<=1?0:e>n.frames.length-2?n.frames.length-1:e-1,i=e>=n.frames.length-2?n.frames.length-1:e+1,a=n.frames[e];n.frames[o];var c=n.frames[i],l=a.start/n.totalLength,u=l+a.length/n.totalLength;return{curFrame:a,nextFrame:c,curProgress:1/(u-l)*t-u/(u-l)+1}},getAllFrames:function(){return n.frames},isInitialized:n.isInitialized}},R=["length","offset"],L=["length","offset"],V=function(t){var n=t.startScroll,r=t.endScroll,o=t.fadeIn,i=t.fadeOut,a=t.keyframes,c=t.offset,l=t.disabled,p=t.extend,h=t.callback,m=S(),y=m.ref,v=m.inView,b=m.entry,w=null==b?void 0:b.target,E=O(1),j=d(e.useState(0),2),I=j[0],x=j[1],A=d(e.useState({isTransitioning:!1,inView:v}),2),V=A[0],C=A[1],M=d(e.useState({startScroll:function(t){switch(t){case"top":return document.documentElement.scrollTop;case"center":return+document.documentElement.scrollTop+document.documentElement.clientHeight/2;case"bottom":return+document.documentElement.scrollTop+document.documentElement.clientHeight;default:return t||+document.documentElement.scrollTop+document.documentElement.clientHeight}}(n||"bottom"),endScroll:r?P(r):300,scrollHeight:0}),2),$=M[0],N=M[1],q=z();function Y(t,e){var n=t.opacity,r=t.transform,o=t.background,i=t.gradient,a=t.filter,c=e;n&&(w.style.opacity=function(t,e){return T.apply(void 0,g(t).concat([e])).toFixed(3)}(g(n),c)).toString(),r&&(w.style.transform=function(t,e){var n=t.translate,r=t.translateX,o=t.translateY,i=t.scale,a=t.rotate,c="";if(n){var l=T.apply(void 0,g(n[0]).concat([e])),s=T.apply(void 0,g(n[1]).concat([e]));c+="translate(".concat(l,"px, ").concat(s,"px) ")}else r?c+="translateX(".concat(T.apply(void 0,g(r).concat([e])),"px) "):o&&(c+="translateY(".concat(T.apply(void 0,g(o).concat([e])),"px) "));return i&&(c+="scale(".concat(T.apply(void 0,g(i).concat([e])),") ")),a&&(c+="rotate(".concat(T.apply(void 0,g(a).concat([e])),"deg) ")),c}(s({},r),c)),o&&(w.style.backgroundColor=function(t,e){var n=k.apply(void 0,g(t).concat([e]));return"rgba(".concat(n.join(","),") ")}(g(o),c)),i&&(w.style.background=function(t,e){var n=t.type,r=t.dir,o=t.start,i=t.end;if(o.length<2||i.length<2)throw new Error("'start' and 'end' must have at least 2 elements");if(o.length!==i.length)throw new Error("'start' and 'end' array length must be the same");for(var a=[],c=0;c<o.length;c++){var l=k(o[c],i[c],e);a.push("rgba(".concat(l.join(","),")"))}var s=r&&"radial"!==n?T.apply(void 0,g(r).concat([e]))+"deg,":"";return"".concat(n&&n||"linear","-gradient(").concat(s).concat(a.join(","),")")}(s({},i),c)),a&&(w.style.filter=function(t,e){var n=t.blur,r=t.brightness,o=t.contrast,i=t.dropShadow,a=t.grayscale,c=t.hueRotate,l=t.opacity,s=t.saturate,u=t.sepia,f="";return n&&(f+="blur(".concat(T.apply(void 0,g(n).concat([e])),"px) ")),r&&(f+="brightness(".concat(T.apply(void 0,g(r).concat([e])),"%) ")),o&&(f+="contrast(".concat(T.apply(void 0,g(o).concat([e])),"%) ")),a&&(f+="grayscale(".concat(T.apply(void 0,g(a).concat([e])),"%) ")),c&&(f+="hue-rotate(".concat(T.apply(void 0,g(c).concat([e])),"deg) ")),l&&(f+="opacity(".concat(T.apply(void 0,g(l).concat([e])),"%) ")),s&&(f+="saturate(".concat(T.apply(void 0,g(s).concat([e])),"%) ")),u&&(f+="sepia(".concat(T.apply(void 0,g(u).concat([e])),"%) ")),i&&(f+="drop-shadow(".concat(T.apply(void 0,g(i).concat([e])),"px) ")),f}(s({},a),c))}function B(){var t={progress:o?0:i?1:0,animations:o||(i||{opacity:[1,1]})},e={progress:i?0:o?1:0,animations:i||(o||{opacity:[1,1]})};I<=0&&Y(t.animations,t.progress),I>=1&&Y(e.animations,e.progress)}function D(){var t=o.length,e=o.offset,n=f(o,R),r=G(P(t,w.offsetHeight),e),i=r.end,a=r.current/i/i,c=a<0?0:a>1?1:a;c>0&&c<1&&Y(s({},n),c)}function K(){var t=i.length,e=i.offset,n=f(i,L),r=G(P(t,w.offsetHeight),e),o=r.end,a=r.current/o/o-(1-o)/o,c=a<0?0:a>1?1:a;c>0&&c<1&&Y(s({},n),c)}function X(){if(!q.isInitialized)return function(){if(!q.isInitialized){var t=a.map((function(t){return s(s({},t),{},{start:0,length:P(t.length,w.offsetHeight)})}));q.init(t,(function(t){p&&t>$.scrollHeight&&N(s(s({},$),{},{scrollHeight:t,endScroll:t}))}))}}();var t=q.getCurrentFrame(I),e=t.curFrame,n=t.nextFrame,r=t.curProgress,o=function(t,e){var n={transform:{},filter:{}};return Object.entries(t).forEach((function(r){var o=d(r,2),i=o[0];o[1];var a,c,l={};"gradient"===i?l.gradient={type:t.gradient.type,dir:[t.gradient.dir||0,(null===(a=e.gradient)||void 0===a?void 0:a.dir)||t.gradient.dir],start:t.gradient.colors,end:(null===(c=e.gradient)||void 0===c?void 0:c.colors)||t.gradient.colors}:F.FILTERS.includes(i)?l.filter=s(s({},n.filter),{},u({},i,[t[i]||0,e[i]||t[i]])):F.TRANSFORM.includes(i)?l.transform=s(s({},n.transform),{},u({},i,[t[i]||0,e&&e[i]||0])):l=u({},i,[t[i],e[i]]),n=s(s({},n),l)})),console.log("Merged",n),n}(e,n),i={};return"number"!=typeof e&&"number"!=typeof n&&(Object.entries(e).forEach((function(t){var r=d(t,2),o=r[0];r[1];var a=u({},o,[e[o],n[o]]);i=s(s({},i),a)})),console.log(i),requestAnimationFrame((function(){return Y(o,r)}))),i}function G(t,e){var n=(e||0)/$.scrollHeight,r=t/$.scrollHeight+n;return{start:n,end:r,current:n+r*I}}e.useEffect((function(){q.isInitialized&&console.info(q.getCurrentFrame(.6))}),[q.isInitialized]),e.useEffect((function(){return!l&&w&&function(){var t=H(w.offsetTop,$.endScroll,$.startScroll+E,c,(function(t){var e=t.isTransitioning;C(s(s({},V),{},{isTransitioning:e}))}));x(t)}(),function(){}}),[E]),e.useLayoutEffect((function(){V.isTransitioning&&(a?requestAnimationFrame(X):(o&&requestAnimationFrame(D),i&&requestAnimationFrame(K)))}),[I,V.isTransitioning,o,i,a]),e.useLayoutEffect((function(){console.info("Transitioning changed to: ",V.isTransitioning),w&&requestAnimationFrame(B),h&&h()}),[V.isTransitioning,h]),e.useEffect((function(){return C(s(s({},V),{},{inView:v}))}),[v]);var _=function(){if(w){var t=null==r?void 0:r.toString(),e=t?t.includes("%")?P(t)*w.offsetHeight:parseInt(t):w.offsetHeight;H(w.offsetTop,e,$.startScroll+E,c,(function(t){var n=t.isTransitioning,r=t.scrollHeight;C(s(s({},V),{},{isTransitioning:n})),N(s(s({},$),{},{endScroll:e,scrollHeight:r})),B()})),w.style.background=function(t){if("string"==typeof t){if(0===t.length)return"";if(4===t.length?t+="f":7===t.length&&(t+="ff"),!/^#[0-9a-fA-F]{8}$/i.test(t)&&!/^#[0-9a-fA-F]{4}$/i.test(t))throw new Error("".concat(t," is invalid. 'Color' must be valid Hex or RGBA value. "))}return t}(o&&o.background&&o.background[0]||i&&i.background&&i.background[0]||""),a&&X()}};return e.useEffect((function(){return _()}),[w]),e.useEffect((function(){}),[]),{ref:y,status:V}},C=function(t){var n=t.startScroll,r=t.endScroll,o=t.speed,i=t.opacity,c=t.transform,l=t.offset,u=t.background,f=t.gradient,p=t.filter,h=t.disabled,m=t.className,y=t.children,v=S({}),b=v.ref,w=v.inView,E=v.entry,j=null==E?void 0:E.target,I=O(1),x=d(e.useState(0),2),F=x[0],A=x[1],H=function(t){switch(t){case"top":return document.documentElement.scrollTop;case"center":return+document.documentElement.scrollTop+document.documentElement.clientHeight/2;case"bottom":return+document.documentElement.scrollTop+document.documentElement.clientHeight;default:return t||+document.documentElement.scrollTop+document.documentElement.clientHeight}},P=d(e.useState({startScroll:H(n||"top"),endScroll:r?r.toString().includes("%")?1e3:parseInt(r.toString()):300,speed:(o||20)/100}),2),z=P[0],R=P[1],L=function(){if(j){var t=j.offsetParent.offsetTop+(l||0),e=t+z.endScroll-t,n=(z.startScroll+I-t)/e;A(n<0?0:n>1?1:n)}},V=function(){if(j){if(i){var t=T.apply(void 0,g(i).concat([F]));j.style.opacity=t.toFixed(3)}if(u){var e=k.apply(void 0,g(u).concat([F]));j.style.backgroundColor="rgba(".concat(e.join(","),") ")}else if(f){var n=f.type,r=f.dir,o=f.start,a=f.end;if(o.length<2||a.length<2)throw new Error("'start' and 'end' must have at least 2 elements");if(o.length!==a.length)throw new Error("'start' and 'end' array length must be the same");for(var l=[],s=0;s<o.length;s++){var d=k(o[s],a[s],F);l.push("rgba(".concat(d.join(","),")"))}var h=r&&"radial"!==n?T.apply(void 0,g(r).concat([F]))+"deg,":"";console.log(n,r,o,a),console.log("".concat(n&&n||"linear","-gradient(").concat(h).concat(l.join(" "),")")),j.style.background="".concat(n&&n||"linear","-gradient(").concat(h).concat(l.join(","),")")}var m="";if(c){var y=c.translate,v=c.translateX,b=c.translateY,w=c.scale,E=c.rotate;if(y){var S=T.apply(void 0,g(y[0]).concat([F])),O=T.apply(void 0,g(y[1]).concat([F]));m+="translate(".concat(S,"px, ").concat(O,"px) ")}else v?m+="translateX(".concat(T.apply(void 0,g(v).concat([F])),"px) "):b&&(m+="translateY(".concat(T.apply(void 0,g(b).concat([F])),"px) "));w&&(m+="scale(".concat(T.apply(void 0,g(w).concat([F])),") ")),E&&(m+="rotate(".concat(T.apply(void 0,g(E).concat([F])),"deg) ")),""!==m&&(j.style.transform=m)}if(p){var I=T.apply(void 0,g(p.blur||[0,0]).concat([F]));j.style.filter="blur(".concat(I,"px) ")}}};e.useEffect((function(){if(!h)return L(),function(){}}),[I]),e.useEffect((function(){requestAnimationFrame(V)}),[F]);var C=function(){R(s(s({},z),{},{startScroll:H(n||"top")}))};return e.useEffect((function(){return function(){if(j){console.log(w);var t=null==r?void 0:r.toString(),e=t?t.includes("%")?parseInt(t)/100*j.offsetHeight:parseInt(t):j.offsetParent.offsetHeight;R(s(s({},z),{},{endScroll:e})),L(),V()}}(),function(){}}),[j]),e.useEffect((function(){return A(0),window.addEventListener("resize",C),function(){return window.removeEventListener("resize",C)}}),[]),a.default.createElement("div",{style:{position:"relative",width:"100%",height:"fit-content"}},a.default.createElement("div",{ref:b,style:{position:"relative",width:"100%",height:"fit-content",willChange:"transform, opacity, background"},className:m},y&&"function"==typeof y?y({isTransitioning:F>0&&F<1,inView:w}):y))},M=["children","className"],$=c.default.div(j||(I=["\n  width: 100%;\n  height: fit-content;\n"],x||(x=I.slice(0)),j=Object.freeze(Object.defineProperties(I,{raw:{value:Object.freeze(x)}})))),N=function(t){var e=t.children,n=t.className,r=f(t,M),o=V(s({},r)),i=o.ref,c=o.status;return a.default.createElement($,{ref:i,className:n},e&&"function"==typeof e?e(c):e)};t.Parallax=C,t.UseParallax=N,t.getRGBA=A,t.useParallax=V}));
//# sourceMappingURL=index.js.map
