import{ap as Ze,aq as ve,ar as Je,af as et,Y as p,a9 as tt,ag as ot,ah as T,ai as j,U as F,Z as I,a7 as _,aj as A,N as J,E as k,O as Se,as as he,at as B,r as P,d as nt,h as G,au as it,av as lt,aw as rt,ax as g,ay as st,ad as ke,w as q,o as at,g as He,z as ut,c as E,A as ct,W as dt,ao as ft}from"./index.946ad941.js";import{u as vt,a as ht,b as mt,d as pt,c as gt}from"./use-transition.0600edad.js";import{u as wt,a as yt}from"./QPageContainer.bca18837.js";import{c as me,d as bt,a as xt}from"./focus-manager.41046903.js";const Et=[null,document,document.body,document.scrollingElement,document.documentElement];function Ct(e,t){let i=Ze(t);if(i===void 0){if(e==null)return window;i=e.closest(".scroll,.scroll-y,.overflow-auto")}return Et.includes(i)?window:i}function Tt(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function qt(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let O;function Lt(){if(O!==void 0)return O;const e=document.createElement("p"),t=document.createElement("div");ve(e,{width:"100%",height:"200px"}),ve(t,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t);const i=e.offsetWidth;t.style.overflow="scroll";let r=e.offsetWidth;return i===r&&(r=t.clientWidth),t.remove(),O=i-r,O}function Pt(e,t=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:t?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}const ee={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},St=Object.keys(ee);ee.all=!0;function pe(e){const t={};for(const i of St)e[i]===!0&&(t[i]=!0);return Object.keys(t).length===0?ee:(t.horizontal===!0?t.left=t.right=!0:t.left===!0&&t.right===!0&&(t.horizontal=!0),t.vertical===!0?t.up=t.down=!0:t.up===!0&&t.down===!0&&(t.vertical=!0),t.horizontal===!0&&t.vertical===!0&&(t.all=!0),t)}function ge(e,t){return t.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof t.handler=="function"&&e.target.nodeName.toUpperCase()!=="INPUT"&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(t.uid)===-1)}function Me(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),Je.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function K(e,t,i){const r=_(e);let o,l=r.left-t.event.x,n=r.top-t.event.y,c=Math.abs(l),u=Math.abs(n);const s=t.direction;s.horizontal===!0&&s.vertical!==!0?o=l<0?"left":"right":s.horizontal!==!0&&s.vertical===!0?o=n<0?"up":"down":s.up===!0&&n<0?(o="up",c>u&&(s.left===!0&&l<0?o="left":s.right===!0&&l>0&&(o="right"))):s.down===!0&&n>0?(o="down",c>u&&(s.left===!0&&l<0?o="left":s.right===!0&&l>0&&(o="right"))):s.left===!0&&l<0?(o="left",c<u&&(s.up===!0&&n<0?o="up":s.down===!0&&n>0&&(o="down"))):s.right===!0&&l>0&&(o="right",c<u&&(s.up===!0&&n<0?o="up":s.down===!0&&n>0&&(o="down")));let d=!1;if(o===void 0&&i===!1){if(t.event.isFirst===!0||t.event.lastDir===void 0)return{};o=t.event.lastDir,d=!0,o==="left"||o==="right"?(r.left-=l,c=0,l=0):(r.top-=n,u=0,n=0)}return{synthetic:d,payload:{evt:e,touch:t.event.mouse!==!0,mouse:t.event.mouse===!0,position:r,direction:o,isFirst:t.event.isFirst,isFinal:i===!0,duration:Date.now()-t.event.time,distance:{x:c,y:u},offset:{x:l,y:n},delta:{x:r.left-t.event.lastX,y:r.top-t.event.lastY}}}}let kt=0;var oo=et({name:"touch-pan",beforeMount(e,{value:t,modifiers:i}){if(i.mouse!==!0&&p.has.touch!==!0)return;function r(l,n){i.mouse===!0&&n===!0?J(l):(i.stop===!0&&I(l),i.prevent===!0&&F(l))}const o={uid:"qvtp_"+kt++,handler:t,modifiers:i,direction:pe(i),noop:tt,mouseStart(l){ge(l,o)&&ot(l)&&(T(o,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),o.start(l,!0))},touchStart(l){if(ge(l,o)){const n=l.target;T(o,"temp",[[n,"touchmove","move","notPassiveCapture"],[n,"touchcancel","end","passiveCapture"],[n,"touchend","end","passiveCapture"]]),o.start(l)}},start(l,n){if(p.is.firefox===!0&&j(e,!0),o.lastEvt=l,n===!0||i.stop===!0){if(o.direction.all!==!0&&(n!==!0||o.modifiers.mouseAllDir!==!0)){const s=l.type.indexOf("mouse")>-1?new MouseEvent(l.type,l):new TouchEvent(l.type,l);l.defaultPrevented===!0&&F(s),l.cancelBubble===!0&&I(s),Object.assign(s,{qKeyEvent:l.qKeyEvent,qClickOutside:l.qClickOutside,qAnchorHandled:l.qAnchorHandled,qClonedBy:l.qClonedBy===void 0?[o.uid]:l.qClonedBy.concat(o.uid)}),o.initialEvent={target:l.target,event:s}}I(l)}const{left:c,top:u}=_(l);o.event={x:c,y:u,time:Date.now(),mouse:n===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:c,lastY:u}},move(l){if(o.event===void 0)return;const n=_(l),c=n.left-o.event.x,u=n.top-o.event.y;if(c===0&&u===0)return;o.lastEvt=l;const s=o.event.mouse===!0,d=()=>{r(l,s),i.preserveCursor!==!0&&(document.documentElement.style.cursor="grabbing"),s===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Me(),o.styleCleanup=a=>{if(o.styleCleanup=void 0,i.preserveCursor!==!0&&(document.documentElement.style.cursor=""),document.body.classList.remove("non-selectable"),s===!0){const m=()=>{document.body.classList.remove("no-pointer-events--children")};a!==void 0?setTimeout(()=>{m(),a()},50):m()}else a!==void 0&&a()}};if(o.event.detected===!0){o.event.isFirst!==!0&&r(l,o.event.mouse);const{payload:a,synthetic:m}=K(l,o,!1);a!==void 0&&(o.handler(a)===!1?o.end(l):(o.styleCleanup===void 0&&o.event.isFirst===!0&&d(),o.event.lastX=a.position.left,o.event.lastY=a.position.top,o.event.lastDir=m===!0?void 0:a.direction,o.event.isFirst=!1));return}if(o.direction.all===!0||s===!0&&o.modifiers.mouseAllDir===!0){d(),o.event.detected=!0,o.move(l);return}const v=Math.abs(c),h=Math.abs(u);v!==h&&(o.direction.horizontal===!0&&v>h||o.direction.vertical===!0&&v<h||o.direction.up===!0&&v<h&&u<0||o.direction.down===!0&&v<h&&u>0||o.direction.left===!0&&v>h&&c<0||o.direction.right===!0&&v>h&&c>0?(o.event.detected=!0,o.move(l)):o.end(l,!0))},end(l,n){if(o.event!==void 0){if(A(o,"temp"),p.is.firefox===!0&&j(e,!1),n===!0)o.styleCleanup!==void 0&&o.styleCleanup(),o.event.detected!==!0&&o.initialEvent!==void 0&&o.initialEvent.target.dispatchEvent(o.initialEvent.event);else if(o.event.detected===!0){o.event.isFirst===!0&&o.handler(K(l===void 0?o.lastEvt:l,o).payload);const{payload:c}=K(l===void 0?o.lastEvt:l,o,!0),u=()=>{o.handler(c)};o.styleCleanup!==void 0?o.styleCleanup(u):u()}o.event=void 0,o.initialEvent=void 0,o.lastEvt=void 0}}};e.__qtouchpan=o,i.mouse===!0&&T(o,"main",[[e,"mousedown","mouseStart",`passive${i.mouseCapture===!0?"Capture":""}`]]),p.has.touch===!0&&T(o,"main",[[e,"touchstart","touchStart",`passive${i.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,t){const i=e.__qtouchpan;i!==void 0&&(t.oldValue!==t.value&&(typeof value!="function"&&i.end(),i.handler=t.value),i.direction=pe(t.modifiers))},beforeUnmount(e){const t=e.__qtouchpan;t!==void 0&&(t.event!==void 0&&t.end(),A(t,"main"),A(t,"temp"),p.is.firefox===!0&&j(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(),delete e.__qtouchpan)}});function Ht(){let e;return k(()=>{e=void 0}),{registerTick(t){e=t,Se(()=>{e===t&&(e(),e=void 0)})},removeTick(){e=void 0}}}function Mt(){let e;return k(()=>{clearTimeout(e)}),{registerTimeout(t,i){clearTimeout(e),e=setTimeout(t,i)},removeTimeout(){clearTimeout(e)}}}function no(e,t,i){let r;function o(){r!==void 0&&(he.remove(r),r=void 0)}return k(()=>{e.value===!0&&o()}),{removeFromHistory:o,addToHistory(){r={condition:()=>i.value===!0,handler:t},he.add(r)}}}const L=[];function io(e){return L.find(t=>t.__qPortalInnerRef.value!==null&&t.__qPortalInnerRef.value.contains(e))}function We(e,t){do{if(e.$options.name==="QMenu"){if(e.hide(t),e.$props.separateClosePopup===!0)return B(e)}else if(e.__qPortalInnerRef!==void 0){const i=B(e);return i!==void 0&&i.$options.name==="QPopupProxy"?(e.hide(t),i):e}e=B(e)}while(e!=null)}function lo(e,t,i){for(;i!==0&&e!==void 0&&e!==null;){if(e.__qPortalInnerRef!==void 0){if(i--,e.$options.name==="QMenu"){e=We(e,t);continue}e.hide(t)}e=B(e)}}function Wt(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function Ot(e,t,i,r){const o=P(!1),l=P(!1);let n=null;const c={},u=r===!0&&Wt(e);function s(v){if(v===!0){me(c),l.value=!0;return}l.value=!1,o.value===!1&&(u===!1&&n===null&&(n=lt()),o.value=!0,L.push(e.proxy),bt(c))}function d(v){if(l.value=!1,v!==!0)return;me(c),o.value=!1;const h=L.indexOf(e.proxy);h>-1&&L.splice(h,1),n!==null&&(rt(n),n=null)}return nt(()=>{d(!0)}),Object.assign(e.proxy,{__qPortalInnerRef:t}),{showPortal:s,hidePortal:d,portalIsActive:o,portalIsAccessible:l,renderPortal:()=>u===!0?i():o.value===!0?[G(it,{to:n},i())]:void 0}}let M=0,N,Q,W,U=!1,we,ye,C;function zt(e){At(e)&&J(e)}function At(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const t=st(e),i=e.shiftKey&&!e.deltaX,r=!i&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),o=i||r?e.deltaY:e.deltaX;for(let l=0;l<t.length;l++){const n=t[l];if(Pt(n,r))return r?o<0&&n.scrollTop===0?!0:o>0&&n.scrollTop+n.clientHeight===n.scrollHeight:o<0&&n.scrollLeft===0?!0:o>0&&n.scrollLeft+n.clientWidth===n.scrollWidth}return!0}function be(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function z(e){U!==!0&&(U=!0,requestAnimationFrame(()=>{U=!1;const{height:t}=e.target,{clientHeight:i,scrollTop:r}=document.scrollingElement;(W===void 0||t!==window.innerHeight)&&(W=i-t,document.scrollingElement.scrollTop=r),r>W&&(document.scrollingElement.scrollTop-=Math.ceil((r-W)/8))}))}function xe(e){const t=document.body,i=window.visualViewport!==void 0;if(e==="add"){const{overflowY:r,overflowX:o}=window.getComputedStyle(t);N=qt(window),Q=Tt(window),we=t.style.left,ye=t.style.top,t.style.left=`-${N}px`,t.style.top=`-${Q}px`,o!=="hidden"&&(o==="scroll"||t.scrollWidth>window.innerWidth)&&t.classList.add("q-body--force-scrollbar-x"),r!=="hidden"&&(r==="scroll"||t.scrollHeight>window.innerHeight)&&t.classList.add("q-body--force-scrollbar-y"),t.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,p.is.ios===!0&&(i===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",z,g.passiveCapture),window.visualViewport.addEventListener("scroll",z,g.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",be,g.passiveCapture))}p.is.desktop===!0&&p.is.mac===!0&&window[`${e}EventListener`]("wheel",zt,g.notPassive),e==="remove"&&(p.is.ios===!0&&(i===!0?(window.visualViewport.removeEventListener("resize",z,g.passiveCapture),window.visualViewport.removeEventListener("scroll",z,g.passiveCapture)):window.removeEventListener("scroll",be,g.passiveCapture)),t.classList.remove("q-body--prevent-scroll"),t.classList.remove("q-body--force-scrollbar-x"),t.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,t.style.left=we,t.style.top=ye,window.scrollTo(N,Q),W=void 0)}function Bt(e){let t="add";if(e===!0){if(M++,C!==void 0){clearTimeout(C),C=void 0;return}if(M>1)return}else{if(M===0||(M--,M>0))return;if(t="remove",p.is.ios===!0&&p.is.nativeMobile===!0){clearTimeout(C),C=setTimeout(()=>{xe(t),C=void 0},100);return}}xe(t)}function ro(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,Bt(t))}}}const w=[];let S;function Ft(e){S=e.keyCode===27}function _t(){S===!0&&(S=!1)}function $t(e){S===!0&&(S=!1,ke(e,27)===!0&&w[w.length-1](e))}function Oe(e){window[e]("keydown",Ft),window[e]("blur",_t),window[e]("keyup",$t),S=!1}function Dt(e){p.is.desktop===!0&&(w.push(e),w.length===1&&Oe("addEventListener"))}function Ee(e){const t=w.indexOf(e);t>-1&&(w.splice(t,1),w.length===0&&Oe("removeEventListener"))}const y=[];function ze(e){y[y.length-1](e)}function Rt(e){p.is.desktop===!0&&(y.push(e),y.length===1&&document.body.addEventListener("focusin",ze))}function Yt(e){const t=y.indexOf(e);t>-1&&(y.splice(t,1),y.length===0&&document.body.removeEventListener("focusin",ze))}const Xt={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function Vt({showing:e,avoidEmit:t,configureAnchorEl:i}){const{props:r,proxy:o,emit:l}=He(),n=P(null);let c;function u(a){return n.value===null?!1:a===void 0||a.touches===void 0||a.touches.length<=1}const s={};i===void 0&&(Object.assign(s,{hide(a){o.hide(a)},toggle(a){o.toggle(a),a.qAnchorHandled=!0},toggleKey(a){ke(a,13)===!0&&s.toggle(a)},contextClick(a){o.hide(a),F(a),Se(()=>{o.show(a),a.qAnchorHandled=!0})},prevent:F,mobileTouch(a){if(s.mobileCleanup(a),u(a)!==!0)return;o.hide(a),n.value.classList.add("non-selectable");const m=a.target;T(s,"anchor",[[m,"touchmove","mobileCleanup","passive"],[m,"touchend","mobileCleanup","passive"],[m,"touchcancel","mobileCleanup","passive"],[n.value,"contextmenu","prevent","notPassive"]]),c=setTimeout(()=>{o.show(a),a.qAnchorHandled=!0},300)},mobileCleanup(a){n.value.classList.remove("non-selectable"),clearTimeout(c),e.value===!0&&a!==void 0&&Me()}}),i=function(a=r.contextMenu){if(r.noParentEvent===!0||n.value===null)return;let m;a===!0?o.$q.platform.is.mobile===!0?m=[[n.value,"touchstart","mobileTouch","passive"]]:m=[[n.value,"mousedown","hide","passive"],[n.value,"contextmenu","contextClick","notPassive"]]:m=[[n.value,"click","toggle","passive"],[n.value,"keyup","toggleKey","passive"]],T(s,"anchor",m)});function d(){A(s,"anchor")}function v(a){for(n.value=a;n.value.classList.contains("q-anchor--skip");)n.value=n.value.parentNode;i()}function h(){if(r.target===!1||r.target===""||o.$el.parentNode===null)n.value=null;else if(r.target===!0)v(o.$el.parentNode);else{let a=r.target;if(typeof r.target=="string")try{a=document.querySelector(r.target)}catch{a=void 0}a!=null?(n.value=a.$el||a,i()):(n.value=null,console.error(`Anchor: target "${r.target}" not found`))}}return q(()=>r.contextMenu,a=>{n.value!==null&&(d(),i(a))}),q(()=>r.target,()=>{n.value!==null&&d(),h()}),q(()=>r.noParentEvent,a=>{n.value!==null&&(a===!0?d():i())}),at(()=>{h(),t!==!0&&r.modelValue===!0&&n.value===null&&l("update:modelValue",!1)}),k(()=>{clearTimeout(c),d()}),{anchorEl:n,canShow:u,anchorEvents:s}}function jt(e,t){const i=P(null);let r;function o(c,u){const s=`${u!==void 0?"add":"remove"}EventListener`,d=u!==void 0?u:r;c!==window&&c[s]("scroll",d,g.passive),window[s]("scroll",d,g.passive),r=u}function l(){i.value!==null&&(o(i.value),i.value=null)}const n=q(()=>e.noParentEvent,()=>{i.value!==null&&(l(),t())});return k(n),{localScrollTarget:i,unconfigureScrollTarget:l,changeScrollEvent:o}}let Ae;const{notPassiveCapture:$}=g,b=[];function D(e){clearTimeout(Ae);const t=e.target;if(t===void 0||t.nodeType===8||t.classList.contains("no-pointer-events")===!0)return;let i=L.length-1;for(;i>=0;){const r=L[i].$;if(r.type.name!=="QDialog")break;if(r.props.seamless!==!0)return;i--}for(let r=b.length-1;r>=0;r--){const o=b[r];if((o.anchorEl.value===null||o.anchorEl.value.contains(t)===!1)&&(t===document.body||o.innerRef.value!==null&&o.innerRef.value.contains(t)===!1))e.qClickOutside=!0,o.onClickOutside(e);else return}}function It(e){b.push(e),b.length===1&&(document.addEventListener("mousedown",D,$),document.addEventListener("touchstart",D,$))}function Ce(e){const t=b.findIndex(i=>i===e);t>-1&&(b.splice(t,1),b.length===0&&(clearTimeout(Ae),document.removeEventListener("mousedown",D,$),document.removeEventListener("touchstart",D,$)))}let Te,qe;function Le(e){const t=e.split(" ");return t.length!==2?!1:["top","center","bottom"].includes(t[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(t[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function Kt(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const Z={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{Z[`${e}#ltr`]=e,Z[`${e}#rtl`]=e});function Pe(e,t){const i=e.split(" ");return{vertical:i[0],horizontal:Z[`${i[1]}#${t===!0?"rtl":"ltr"}`]}}function Nt(e,t){let{top:i,left:r,right:o,bottom:l,width:n,height:c}=e.getBoundingClientRect();return t!==void 0&&(i-=t[1],r-=t[0],l+=t[1],o+=t[0],n+=t[0],c+=t[1]),{top:i,left:r,right:o,bottom:l,width:n,height:c,middle:r+(o-r)/2,center:i+(l-i)/2}}function Qt(e){return{top:0,center:e.offsetHeight/2,bottom:e.offsetHeight,left:0,middle:e.offsetWidth/2,right:e.offsetWidth}}function Ut(e){if(p.is.ios===!0&&window.visualViewport!==void 0){const c=document.body.style,{offsetLeft:u,offsetTop:s}=window.visualViewport;u!==Te&&(c.setProperty("--q-pe-left",u+"px"),Te=u),s!==qe&&(c.setProperty("--q-pe-top",s+"px"),qe=s)}let t;const{scrollLeft:i,scrollTop:r}=e.el;if(e.absoluteOffset===void 0)t=Nt(e.anchorEl,e.cover===!0?[0,0]:e.offset);else{const{top:c,left:u}=e.anchorEl.getBoundingClientRect(),s=c+e.absoluteOffset.top,d=u+e.absoluteOffset.left;t={top:s,left:d,width:1,height:1,right:d+1,center:s,middle:d,bottom:s+1}}let o={maxHeight:e.maxHeight,maxWidth:e.maxWidth,visibility:"visible"};(e.fit===!0||e.cover===!0)&&(o.minWidth=t.width+"px",e.cover===!0&&(o.minHeight=t.height+"px")),Object.assign(e.el.style,o);const l=Qt(e.el),n={top:t[e.anchorOrigin.vertical]-l[e.selfOrigin.vertical],left:t[e.anchorOrigin.horizontal]-l[e.selfOrigin.horizontal]};Gt(n,t,l,e.anchorOrigin,e.selfOrigin),o={top:n.top+"px",left:n.left+"px"},n.maxHeight!==void 0&&(o.maxHeight=n.maxHeight+"px",t.height>n.maxHeight&&(o.minHeight=o.maxHeight)),n.maxWidth!==void 0&&(o.maxWidth=n.maxWidth+"px",t.width>n.maxWidth&&(o.minWidth=o.maxWidth)),Object.assign(e.el.style,o),e.el.scrollTop!==r&&(e.el.scrollTop=r),e.el.scrollLeft!==i&&(e.el.scrollLeft=i)}function Gt(e,t,i,r,o){const l=i.bottom,n=i.right,c=Lt(),u=window.innerHeight-c,s=document.body.clientWidth;if(e.top<0||e.top+l>u)if(o.vertical==="center")e.top=t[r.vertical]>u/2?Math.max(0,u-l):0,e.maxHeight=Math.min(l,u);else if(t[r.vertical]>u/2){const d=Math.min(u,r.vertical==="center"?t.center:r.vertical===o.vertical?t.bottom:t.top);e.maxHeight=Math.min(l,d),e.top=Math.max(0,d-l)}else e.top=Math.max(0,r.vertical==="center"?t.center:r.vertical===o.vertical?t.top:t.bottom),e.maxHeight=Math.min(l,u-e.top);if(e.left<0||e.left+n>s)if(e.maxWidth=Math.min(n,s),o.horizontal==="middle")e.left=t[r.horizontal]>s/2?Math.max(0,s-n):0;else if(t[r.horizontal]>s/2){const d=Math.min(s,r.horizontal==="middle"?t.middle:r.horizontal===o.horizontal?t.right:t.left);e.maxWidth=Math.min(n,d),e.left=Math.max(0,d-e.maxWidth)}else e.left=Math.max(0,r.horizontal==="middle"?t.middle:r.horizontal===o.horizontal?t.left:t.right),e.maxWidth=Math.min(n,s-e.left)}var so=ut({name:"QMenu",inheritAttrs:!1,props:{...Xt,...vt,...wt,...ht,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:Le},self:{type:String,validator:Le},offset:{type:Array,validator:Kt},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...mt,"click","escape-key"],setup(e,{slots:t,emit:i,attrs:r}){let o=null,l,n,c;const u=He(),{proxy:s}=u,{$q:d}=s,v=P(null),h=P(!1),a=E(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),m=yt(e,d),{registerTick:Be,removeTick:te}=Ht(),{registerTimeout:oe,removeTimeout:ne}=Mt(),{transition:Fe,transitionStyle:_e}=pt(e,h),{localScrollTarget:ie,changeScrollEvent:$e,unconfigureScrollTarget:De}=jt(e,de),{anchorEl:x,canShow:Re}=Vt({showing:h}),{hide:le}=gt({showing:h,canShow:Re,handleShow:Ie,handleHide:Ke,hideOnRouteChange:a,processOnMount:!0}),{showPortal:re,hidePortal:se,renderPortal:Ye}=Ot(u,v,Qe),R={anchorEl:x,innerRef:v,onClickOutside(f){if(e.persistent!==!0&&h.value===!0)return le(f),(f.type==="touchstart"||f.target.classList.contains("q-dialog__backdrop"))&&J(f),!0}},ae=E(()=>Pe(e.anchor||(e.cover===!0?"center middle":"bottom start"),d.lang.rtl)),Xe=E(()=>e.cover===!0?ae.value:Pe(e.self||"top start",d.lang.rtl)),Ve=E(()=>(e.square===!0?" q-menu--square":"")+(m.value===!0?" q-menu--dark q-dark":"")),je=E(()=>e.autoClose===!0?{onClick:Ne}:{}),ue=E(()=>h.value===!0&&e.persistent!==!0);q(ue,f=>{f===!0?(Dt(X),It(R)):(Ee(X),Ce(R))});function Y(){xt(()=>{let f=v.value;f&&f.contains(document.activeElement)!==!0&&(f=f.querySelector("[autofocus], [data-autofocus]")||f,f.focus({preventScroll:!0}))})}function Ie(f){if(te(),ne(),o=e.noRefocus===!1?document.activeElement:null,Rt(fe),re(),de(),l=void 0,f!==void 0&&(e.touchPosition||e.contextMenu)){const V=_(f);if(V.left!==void 0){const{top:Ue,left:Ge}=x.value.getBoundingClientRect();l={left:V.left-Ge,top:V.top-Ue}}}n===void 0&&(n=q(()=>d.screen.width+"|"+d.screen.height+"|"+e.self+"|"+e.anchor+"|"+d.lang.rtl,H)),e.noFocus!==!0&&document.activeElement.blur(),Be(()=>{H(),e.noFocus!==!0&&Y()}),oe(()=>{d.platform.is.ios===!0&&(c=e.autoClose,v.value.click()),H(),re(!0),i("show",f)},e.transitionDuration)}function Ke(f){te(),ne(),se(),ce(!0),o!==null&&(f===void 0||f.qClickOutside!==!0)&&(o.focus(),o=null),oe(()=>{se(!0),i("hide",f)},e.transitionDuration)}function ce(f){l=void 0,n!==void 0&&(n(),n=void 0),(f===!0||h.value===!0)&&(Yt(fe),De(),Ce(R),Ee(X)),f!==!0&&(o=null)}function de(){(x.value!==null||e.scrollTarget!==void 0)&&(ie.value=Ct(x.value,e.scrollTarget),$e(ie.value,H))}function Ne(f){c!==!0?(We(s,f),i("click",f)):c=!1}function fe(f){ue.value===!0&&e.noFocus!==!0&&ft(v.value,f.target)!==!0&&Y()}function X(f){i("escape-key"),le(f)}function H(){const f=v.value;f===null||x.value===null||Ut({el:f,offset:e.offset,anchorEl:x.value,anchorOrigin:ae.value,selfOrigin:Xe.value,absoluteOffset:l,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function Qe(){return G(dt,{name:Fe.value,appear:!0},()=>h.value===!0?G("div",{...r,ref:v,tabindex:-1,class:["q-menu q-position-engine scroll"+Ve.value,r.class],style:[r.style,_e.value],...je.value},ct(t.default)):null)}return k(ce),Object.assign(s,{focus:Y,updatePosition:H}),Ye}});export{so as Q,oo as T,Mt as a,Ot as b,Me as c,no as d,Ee as e,ro as f,pe as g,Rt as h,Dt as i,Xt as j,Vt as k,io as l,lo as m,Ct as n,Tt as o,qt as p,Lt as q,Yt as r,ge as s,Ht as u};
