import t,{useState as e,useLayoutEffect as r,useEffect as n}from"react";import{useInView as o}from"react-intersection-observer";const s=t=>{const e=[];if("string"==typeof t){if(4===t.length?t+="f":7===t.length&&(t+="ff"),/^#[0-9a-fA-F]{8}$/i.test(t))t.replace("#","").split(/(..)/g).filter((t=>t)).forEach((t=>e.push(Number("0x"+t)))),e[e.length-1]=e[e.length-1]/255;else{if(!/^#[0-9a-fA-F]{4}$/i.test(t))throw new Error(`${t} is invalid. 'Color' must be valid Hex or RGBA value. `);t.replace("#","").split(/(.)/g).filter((t=>t)).forEach((t=>e.push(17*Number("0x"+t)))),e[e.length-1]=e[e.length-1]/255}return e}return t},i=(t,e,r,n)=>{if(t===e)return t;const o=t<e?e*r+(t-t*r):t-t*r+e*r;return n?n(o):o},l=(t,e,r)=>{let n=s(t),o=s(e);return n.map(((t,e)=>i(t,o[e],r)))};function a({startScroll:s,endScroll:a,speed:c,opacity:f,transform:d,offset:g,background:h,gradient:u,filter:p,disabled:w,children:m}){const{ref:b,inView:v,entry:$}=o({});console.log(v);const y=$?.target,E=function(t){const[n,o]=e(0);return r((()=>{function e(){o(Math.floor(window.pageYOffset/t)*t)}return window.addEventListener("scroll",e),e(),()=>window.removeEventListener("scroll",e)}),[]),n}(1),[S,x]=e(0),H=t=>{switch(t){case"top":return E;case"center":return E+window.innerHeight/2;case"bottom":return E+window.innerHeight;default:return t||E}},[k,A]=e({startScroll:H(s||"top"),endScroll:a?a.toString().includes("%")?1e3:parseInt(a.toString()):300,speed:(c||20)/100}),F=()=>{const t=$&&$.target;if(!t)return;const e=t.offsetParent.offsetTop+(g||0),r=e+k.endScroll-e,n=(k.startScroll+E-e)/r;x(n<0?0:n>1?1:n)},L=()=>{if(y){if(f){const t=i(...f,S);y.style.opacity=t.toFixed(3)}if(h){const t=l(...h,S);y.style.backgroundColor=`rgba(${t.join(",")}) `}else if(u){const{type:t,dir:e,start:r,end:n}=u;if(r.length<2||n.length<2)throw new Error("'start' and 'end' must have at least 2 elements");if(r.length!==n.length)throw new Error("'start' and 'end' array length must be the same");const o=[];for(let t=0;t<r.length;t++){const e=l(r[t],n[t],S);o.push(`rgba(${e.join(",")})`)}console.log(t,e,r,n),y.style.background=`${t||"linear"}-gradient(${e?e+"deg,":""}${o.join(",")})`}let t="";if(d){const{translate:e,translateX:r,translateY:n,scale:o,rotate:s}=d;if(e){t+=`translate(${i(...e[0],S)}px, ${i(...e[1],S)}px) `}else r?t+=`translateX(${i(...r,S)}px `:n&&(t+=`translateY(${i(...n,S)}px `);o&&(t+=`scale(${i(...o,S)}) `),s&&(t+=`rotate(${i(...s,S)}deg) `),""!==t&&(y.style.transform=t)}if(p){const t=i(...p.blur||[0,0],S);y.style.filter=`blur(${t}px) `}}};n((()=>{if(!w)return F(),()=>{}}),[E]),n((()=>{requestAnimationFrame(L)}),[S]);const j=()=>{A({...k,startScroll:H(s||"top")})};return n((()=>((()=>{if(y){const t=a?.toString(),e=t?t.includes("%")?parseInt(t)/100*y.offsetHeight:parseInt(t):y.offsetParent.offsetHeight;A({...k,endScroll:e}),F(),L()}})(),()=>{})),[y]),n((()=>(x(0),window.addEventListener("resize",j),()=>window.removeEventListener("resize",j))),[]),t.createElement("div",{style:{position:"relative",width:"100%",height:"fit-content"}},t.createElement("div",{ref:b,style:{position:"relative",width:"100%",height:"fit-content",willChange:"transform, opacity, background"}},m))}export{a as Parallax};
//# sourceMappingURL=index.esm.js.map