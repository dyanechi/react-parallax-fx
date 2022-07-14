import*as t from"react";import e,{useState as r,useLayoutEffect as n,useEffect as o}from"react";function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){c(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function l(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==r)return;var n,o,i=[],a=!0,c=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){c=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(c)throw o}}return i}(t,e)||u(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t){return function(t){if(Array.isArray(t))return f(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||u(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){if(t){if("string"==typeof t)return f(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?f(t,e):void 0}}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}const d=new Map,p=new WeakMap;let g,h=0;function y(t){return Object.keys(t).sort().filter((e=>void 0!==t[e])).map((e=>{return`${e}_${"root"===e?(r=t.root,r?(p.has(r)||(h+=1,p.set(r,h.toString())),p.get(r)):"0"):t[e]}`;var r})).toString()}function v(t,e,r={},n=g){if(void 0===window.IntersectionObserver&&void 0!==n){const o=t.getBoundingClientRect();return e(n,{isIntersecting:n,target:t,intersectionRatio:"number"==typeof r.threshold?r.threshold:0,time:0,boundingClientRect:o,intersectionRect:o,rootBounds:o}),()=>{}}const{id:o,observer:i,elements:a}=function(t){let e=y(t),r=d.get(e);if(!r){const n=new Map;let o;const i=new IntersectionObserver((e=>{e.forEach((e=>{var r;const i=e.isIntersecting&&o.some((t=>e.intersectionRatio>=t));t.trackVisibility&&void 0===e.isVisible&&(e.isVisible=i),null==(r=n.get(e.target))||r.forEach((t=>{t(i,e)}))}))}),t);o=i.thresholds||(Array.isArray(t.threshold)?t.threshold:[t.threshold||0]),r={id:e,observer:i,elements:n},d.set(e,r)}return r}(r);let c=a.get(t)||[];return a.has(t)||a.set(t,c),c.push(e),i.observe(t),function(){c.splice(c.indexOf(e),1),0===c.length&&(a.delete(t),i.unobserve(t)),0===a.size&&(i.disconnect(),d.delete(o))}}var b=function(t){var e=[];if("string"==typeof t){if(4===t.length?t+="f":7===t.length&&(t+="ff"),/^#[0-9a-fA-F]{8}$/i.test(t))t.replace("#","").split(/(..)/g).filter((function(t){return t})).forEach((function(t){return e.push(Number("0x"+t))})),e[e.length-1]=e[e.length-1]/255;else{if(!/^#[0-9a-fA-F]{4}$/i.test(t))throw new Error("".concat(t," is invalid. 'Color' must be valid Hex or RGBA value. "));t.replace("#","").split(/(.)/g).filter((function(t){return t})).forEach((function(t){return e.push(17*Number("0x"+t))})),e[e.length-1]=e[e.length-1]/255}return e}return t},w=function(t,e,r,n){if(t===e)return t;var o=t<e?e*r+(t-t*r):t-t*r+e*r;return n?n(o):o},m=function(t,e,r){var n=b(t),o=b(e);return n.map((function(t,e){return w(t,o[e],r)}))},O=function(i){var c=i.startScroll,u=i.endScroll,f=i.speed,d=i.opacity,p=i.transform,g=i.offset,h=i.background,y=i.gradient,b=i.filter,O=i.disabled,S=i.children,j=function({threshold:e,delay:r,trackVisibility:n,rootMargin:o,root:i,triggerOnce:a,skip:c,initialInView:l,fallbackInView:s,onChange:u}={}){const f=t.useRef(),d=t.useRef(),[p,g]=t.useState({inView:!!l});d.current=u;const h=t.useCallback((t=>{void 0!==f.current&&(f.current(),f.current=void 0),c||t&&(f.current=v(t,((t,e)=>{g({inView:t,entry:e}),d.current&&d.current(t,e),e.isIntersecting&&a&&f.current&&(f.current(),f.current=void 0)}),{root:i,rootMargin:o,threshold:e,trackVisibility:n,delay:r},s))}),[Array.isArray(e)?e.toString():e,i,o,a,c,n,s,r]);t.useEffect((()=>{f.current||!p.entry||a||c||g({inView:!!l})}));const y=[h,p.inView,p.entry];return y.ref=y[0],y.inView=y[1],y.entry=y[2],y}({}),E=j.ref,A=j.inView,I=j.entry,k=null==I?void 0:I.target,x=function(t){var e=l(r(0),2),o=e[0],i=e[1];return n((function(){function e(){i(Math.floor(window.pageYOffset/t)*t)}return window.addEventListener("scroll",e),e(),function(){return window.removeEventListener("scroll",e)}}),[]),o}(1),V=l(r(0),2),P=V[0],C=V[1],R=function(t){switch(t){case"top":return x;case"center":return x+window.innerHeight/2;case"bottom":return x+window.innerHeight;default:return t||x+window.innerHeight}},M=l(r({startScroll:R(c||"top"),endScroll:u?u.toString().includes("%")?1e3:parseInt(u.toString()):300,speed:(f||20)/100}),2),H=M[0],$=M[1],D=function(){var t=I&&I.target;if(t){var e=t.offsetParent.offsetTop+(g||0),r=e+H.endScroll-e,n=(H.startScroll+x-e)/r;C(n<0?0:n>1?1:n)}},F=function(){if(k){if(d){var t=w.apply(void 0,s(d).concat([P]));k.style.opacity=t.toFixed(3)}if(h){var e=m.apply(void 0,s(h).concat([P]));k.style.backgroundColor="rgba(".concat(e.join(","),") ")}else if(y){var r=y.type,n=y.dir,o=y.start,i=y.end;if(o.length<2||i.length<2)throw new Error("'start' and 'end' must have at least 2 elements");if(o.length!==i.length)throw new Error("'start' and 'end' array length must be the same");for(var a=[],c=0;c<o.length;c++){var l=m(o[c],i[c],P);a.push("rgba(".concat(l.join(","),")"))}console.log(r,n,o,i),k.style.background="".concat(r||"linear","-gradient(").concat(n?n+"deg,":"").concat(a.join(","),")")}var u="";if(p){var f=p.translate,g=p.translateX,v=p.translateY,O=p.scale,S=p.rotate;if(f){var j=w.apply(void 0,s(f[0]).concat([P])),E=w.apply(void 0,s(f[1]).concat([P]));u+="translate(".concat(j,"px, ").concat(E,"px) ")}else g?u+="translateX(".concat(w.apply(void 0,s(g).concat([P])),"px "):v&&(u+="translateY(".concat(w.apply(void 0,s(v).concat([P])),"px "));O&&(u+="scale(".concat(w.apply(void 0,s(O).concat([P])),") ")),S&&(u+="rotate(".concat(w.apply(void 0,s(S).concat([P])),"deg) ")),""!==u&&(k.style.transform=u)}if(b){var A=w.apply(void 0,s(b.blur||[0,0]).concat([P]));k.style.filter="blur(".concat(A,"px) ")}}};o((function(){if(!O)return D(),function(){}}),[x]),o((function(){requestAnimationFrame(F)}),[P]);var L=function(){$(a(a({},H),{},{startScroll:R(c||"top")}))};return o((function(){return function(){if(k){console.log(A);var t=null==u?void 0:u.toString(),e=t?t.includes("%")?parseInt(t)/100*k.offsetHeight:parseInt(t):k.offsetParent.offsetHeight;$(a(a({},H),{},{endScroll:e})),D(),F()}}(),function(){}}),[k]),o((function(){return C(0),window.addEventListener("resize",L),function(){return window.removeEventListener("resize",L)}}),[]),e.createElement("div",{style:{position:"relative",width:"100%",height:"fit-content"}},e.createElement("div",{ref:E,style:{position:"relative",width:"100%",height:"fit-content",willChange:"transform, opacity, background"}},S))};export{O as Parallax,b as getRGBA};
//# sourceMappingURL=indes.js.map