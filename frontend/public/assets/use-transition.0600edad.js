import{w as d,az as h,o as H,g as U,O as f,r as q,c as M}from"./index.946ad941.js";const P={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},A=["before-show","show","before-hide","hide"];function D({showing:t,canShow:l,hideOnRouteChange:n,handleShow:r,handleHide:c,processOnMount:S}){const m=U(),{props:o,emit:a,proxy:p}=m;let u;function T(e){t.value===!0?s(e):V(e)}function V(e){if(o.disable===!0||e!==void 0&&e.qAnchorHandled===!0||l!==void 0&&l(e)!==!0)return;const i=o["onUpdate:modelValue"]!==void 0;i===!0&&(a("update:modelValue",!0),u=e,f(()=>{u===e&&(u=void 0)})),(o.modelValue===null||i===!1)&&b(e)}function b(e){t.value!==!0&&(t.value=!0,a("before-show",e),r!==void 0?r(e):a("show",e))}function s(e){if(o.disable===!0)return;const i=o["onUpdate:modelValue"]!==void 0;i===!0&&(a("update:modelValue",!1),u=e,f(()=>{u===e&&(u=void 0)})),(o.modelValue===null||i===!1)&&v(e)}function v(e){t.value!==!1&&(t.value=!1,a("before-hide",e),c!==void 0?c(e):a("hide",e))}function y(e){o.disable===!0&&e===!0?o["onUpdate:modelValue"]!==void 0&&a("update:modelValue",!1):e===!0!==t.value&&(e===!0?b:v)(u)}d(()=>o.modelValue,y),n!==void 0&&h(m)===!0&&d(()=>p.$route.fullPath,()=>{n.value===!0&&t.value===!0&&s()}),S===!0&&H(()=>{y(o.modelValue)});const g={show:V,hide:s,toggle:T};return Object.assign(p,g),g}const $={transitionShow:{type:String,default:"fade"},transitionHide:{type:String,default:"fade"},transitionDuration:{type:[String,Number],default:300}};function j(t,l){const n=q(l.value);return d(l,r=>{f(()=>{n.value=r})}),{transition:M(()=>"q-transition--"+(n.value===!0?t.transitionHide:t.transitionShow)),transitionStyle:M(()=>`--q-transition-duration: ${t.transitionDuration}ms`)}}export{$ as a,A as b,D as c,j as d,P as u};
