import{r as g,S as z,o as l,z as y,O as f,E as v,a9 as x,h as O,g as w,ax as b}from"./index.946ad941.js";function R(){const i=g(!z.value);return i.value===!1&&l(()=>{i.value=!0}),i}const h=typeof ResizeObserver!="undefined",m=h===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var L=y({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(i,{emit:p}){let o=null,t,r={width:-1,height:-1};function s(e){e===!0||i.debounce===0||i.debounce==="0"?a():o===null&&(o=setTimeout(a,i.debounce))}function a(){if(clearTimeout(o),o=null,t){const{offsetWidth:e,offsetHeight:n}=t;(e!==r.width||n!==r.height)&&(r={width:e,height:n},p("resize",r))}}const u=w();if(Object.assign(u.proxy,{trigger:s}),h===!0){let e;return l(()=>{f(()=>{t=u.proxy.$el.parentNode,t&&(e=new ResizeObserver(s),e.observe(t),a())})}),v(()=>{clearTimeout(o),e!==void 0&&(e.disconnect!==void 0?e.disconnect():t&&e.unobserve(t))}),x}else{let d=function(){clearTimeout(o),n!==void 0&&(n.removeEventListener!==void 0&&n.removeEventListener("resize",s,b.passive),n=void 0)},c=function(){d(),t&&t.contentDocument&&(n=t.contentDocument.defaultView,n.addEventListener("resize",s,b.passive),a())};const e=R();let n;return l(()=>{f(()=>{t=u.proxy.$el,t&&c()})}),v(d),()=>{if(e.value===!0)return O("object",{style:m.style,tabindex:-1,type:"text/html",data:m.url,"aria-hidden":"true",onLoad:c})}}}});export{L as Q};
