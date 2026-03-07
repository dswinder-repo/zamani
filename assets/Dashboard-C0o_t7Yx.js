import{r as c,R as O,b as Fe,j as a,k as $t,e as be}from"./vendor-9MAh3nQh.js";import{c as at,u as Pn,p as Re,S as Bn,X as $n,g as Gn,a as Wn,b as Yn,T as Xn,d as qn}from"./index-DqzG0Ryv.js";import{T as Kn,N as Un,I as Jn}from"./NdebelePanel-C_YHhQqb.js";import{F as Vn}from"./ForexTable-CuCchoPr.js";import{M as Hn}from"./MediaPanel-Llk-HYcH.js";import{S as _n}from"./Sparkline-Sa5-OsUq.js";import{P as Gt}from"./plus-D69hFGQB.js";import{R as Zn,L as Qn,C as er,X as tr,Y as nr,T as rr,a as or}from"./recharts-WEknt4oI.js";import{c as sr}from"./store-DR-NtvzW.js";import{T as ar}from"./trending-down-B-Vjm7qW.js";const ir=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],lr=at("chevron-down",ir);const cr=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],dr=at("chevron-up",cr);const ur=[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]],nn=at("grip-vertical",ur);const fr=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],hr=at("rotate-ccw",fr);function gr(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return c.useMemo(()=>r=>{t.forEach(o=>o(r))},t)}const it=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function ke(e){const t=Object.prototype.toString.call(e);return t==="[object Window]"||t==="[object global]"}function Dt(e){return"nodeType"in e}function Y(e){var t,n;return e?ke(e)?e:Dt(e)&&(t=(n=e.ownerDocument)==null?void 0:n.defaultView)!=null?t:window:window}function Rt(e){const{Document:t}=Y(e);return e instanceof t}function Xe(e){return ke(e)?!1:e instanceof Y(e).HTMLElement}function rn(e){return e instanceof Y(e).SVGElement}function Ee(e){return e?ke(e)?e.document:Dt(e)?Rt(e)?e:Xe(e)||rn(e)?e.ownerDocument:document:document:document}const ee=it?c.useLayoutEffect:c.useEffect;function lt(e){const t=c.useRef(e);return ee(()=>{t.current=e}),c.useCallback(function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return t.current==null?void 0:t.current(...r)},[])}function mr(){const e=c.useRef(null),t=c.useCallback((r,o)=>{e.current=setInterval(r,o)},[]),n=c.useCallback(()=>{e.current!==null&&(clearInterval(e.current),e.current=null)},[]);return[t,n]}function We(e,t){t===void 0&&(t=[e]);const n=c.useRef(e);return ee(()=>{n.current!==e&&(n.current=e)},t),n}function qe(e,t){const n=c.useRef();return c.useMemo(()=>{const r=e(n.current);return n.current=r,r},[...t])}function et(e){const t=lt(e),n=c.useRef(null),r=c.useCallback(o=>{o!==n.current&&t?.(o,n.current),n.current=o},[]);return[n,r]}function tt(e){const t=c.useRef();return c.useEffect(()=>{t.current=e},[e]),t.current}let mt={};function Ke(e,t){return c.useMemo(()=>{if(t)return t;const n=mt[e]==null?0:mt[e]+1;return mt[e]=n,e+"-"+n},[e,t])}function on(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.reduce((s,i)=>{const l=Object.entries(i);for(const[d,u]of l){const f=s[d];f!=null&&(s[d]=f+e*u)}return s},{...t})}}const je=on(1),nt=on(-1);function pr(e){return"clientX"in e&&"clientY"in e}function ct(e){if(!e)return!1;const{KeyboardEvent:t}=Y(e.target);return t&&e instanceof t}function vr(e){if(!e)return!1;const{TouchEvent:t}=Y(e.target);return t&&e instanceof t}function rt(e){if(vr(e)){if(e.touches&&e.touches.length){const{clientX:t,clientY:n}=e.touches[0];return{x:t,y:n}}else if(e.changedTouches&&e.changedTouches.length){const{clientX:t,clientY:n}=e.changedTouches[0];return{x:t,y:n}}}return pr(e)?{x:e.clientX,y:e.clientY}:null}const ve=Object.freeze({Translate:{toString(e){if(!e)return;const{x:t,y:n}=e;return"translate3d("+(t?Math.round(t):0)+"px, "+(n?Math.round(n):0)+"px, 0)"}},Scale:{toString(e){if(!e)return;const{scaleX:t,scaleY:n}=e;return"scaleX("+t+") scaleY("+n+")"}},Transform:{toString(e){if(e)return[ve.Translate.toString(e),ve.Scale.toString(e)].join(" ")}},Transition:{toString(e){let{property:t,duration:n,easing:r}=e;return t+" "+n+"ms "+r}}}),Wt="a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";function xr(e){return e.matches(Wt)?e:e.querySelector(Wt)}const br={display:"none"};function yr(e){let{id:t,value:n}=e;return O.createElement("div",{id:t,style:br},n)}function wr(e){let{id:t,announcement:n,ariaLiveType:r="assertive"}=e;const o={position:"fixed",top:0,left:0,width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(100%)",whiteSpace:"nowrap"};return O.createElement("div",{id:t,style:o,role:"status","aria-live":r,"aria-atomic":!0},n)}function Sr(){const[e,t]=c.useState("");return{announce:c.useCallback(r=>{r!=null&&t(r)},[]),announcement:e}}const sn=c.createContext(null);function Cr(e){const t=c.useContext(sn);c.useEffect(()=>{if(!t)throw new Error("useDndMonitor must be used within a children of <DndContext>");return t(e)},[e,t])}function Nr(){const[e]=c.useState(()=>new Set),t=c.useCallback(r=>(e.add(r),()=>e.delete(r)),[e]);return[c.useCallback(r=>{let{type:o,event:s}=r;e.forEach(i=>{var l;return(l=i[o])==null?void 0:l.call(i,s)})},[e]),t]}const Dr={draggable:`
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `},Rr={onDragStart(e){let{active:t}=e;return"Picked up draggable item "+t.id+"."},onDragOver(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was moved over droppable area "+n.id+".":"Draggable item "+t.id+" is no longer over a droppable area."},onDragEnd(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was dropped over droppable area "+n.id:"Draggable item "+t.id+" was dropped."},onDragCancel(e){let{active:t}=e;return"Dragging was cancelled. Draggable item "+t.id+" was dropped."}};function jr(e){let{announcements:t=Rr,container:n,hiddenTextDescribedById:r,screenReaderInstructions:o=Dr}=e;const{announce:s,announcement:i}=Sr(),l=Ke("DndLiveRegion"),[d,u]=c.useState(!1);if(c.useEffect(()=>{u(!0)},[]),Cr(c.useMemo(()=>({onDragStart(h){let{active:p}=h;s(t.onDragStart({active:p}))},onDragMove(h){let{active:p,over:g}=h;t.onDragMove&&s(t.onDragMove({active:p,over:g}))},onDragOver(h){let{active:p,over:g}=h;s(t.onDragOver({active:p,over:g}))},onDragEnd(h){let{active:p,over:g}=h;s(t.onDragEnd({active:p,over:g}))},onDragCancel(h){let{active:p,over:g}=h;s(t.onDragCancel({active:p,over:g}))}}),[s,t])),!d)return null;const f=O.createElement(O.Fragment,null,O.createElement(yr,{id:r,value:o.draggable}),O.createElement(wr,{id:l,announcement:i}));return n?Fe.createPortal(f,n):f}var P;(function(e){e.DragStart="dragStart",e.DragMove="dragMove",e.DragEnd="dragEnd",e.DragCancel="dragCancel",e.DragOver="dragOver",e.RegisterDroppable="registerDroppable",e.SetDroppableDisabled="setDroppableDisabled",e.UnregisterDroppable="unregisterDroppable"})(P||(P={}));function ot(){}function kr(e,t){return c.useMemo(()=>({sensor:e,options:t??{}}),[e,t])}function Er(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return c.useMemo(()=>[...t].filter(r=>r!=null),[...t])}const te=Object.freeze({x:0,y:0});function Ar(e,t){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function Tr(e,t){const n=rt(e);if(!n)return"0 0";const r={x:(n.x-t.left)/t.width*100,y:(n.y-t.top)/t.height*100};return r.x+"% "+r.y+"%"}function Ir(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return n-r}function Mr(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return r-n}function Or(e,t){if(!e||e.length===0)return null;const[n]=e;return n[t]}function Yt(e,t,n){return t===void 0&&(t=e.left),n===void 0&&(n=e.top),{x:t+e.width*.5,y:n+e.height*.5}}const zr=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e;const o=Yt(t,t.left,t.top),s=[];for(const i of r){const{id:l}=i,d=n.get(l);if(d){const u=Ar(Yt(d),o);s.push({id:l,data:{droppableContainer:i,value:u}})}}return s.sort(Ir)};function Lr(e,t){const n=Math.max(t.top,e.top),r=Math.max(t.left,e.left),o=Math.min(t.left+t.width,e.left+e.width),s=Math.min(t.top+t.height,e.top+e.height),i=o-r,l=s-n;if(r<o&&n<s){const d=t.width*t.height,u=e.width*e.height,f=i*l,h=f/(d+u-f);return Number(h.toFixed(4))}return 0}const Fr=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e;const o=[];for(const s of r){const{id:i}=s,l=n.get(i);if(l){const d=Lr(l,t);d>0&&o.push({id:i,data:{droppableContainer:s,value:d}})}}return o.sort(Mr)};function Pr(e,t,n){return{...e,scaleX:t&&n?t.width/n.width:1,scaleY:t&&n?t.height/n.height:1}}function an(e,t){return e&&t?{x:e.left-t.left,y:e.top-t.top}:te}function Br(e){return function(n){for(var r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return o.reduce((i,l)=>({...i,top:i.top+e*l.y,bottom:i.bottom+e*l.y,left:i.left+e*l.x,right:i.right+e*l.x}),{...n})}}const $r=Br(1);function ln(e){if(e.startsWith("matrix3d(")){const t=e.slice(9,-1).split(/, /);return{x:+t[12],y:+t[13],scaleX:+t[0],scaleY:+t[5]}}else if(e.startsWith("matrix(")){const t=e.slice(7,-1).split(/, /);return{x:+t[4],y:+t[5],scaleX:+t[0],scaleY:+t[3]}}return null}function Gr(e,t,n){const r=ln(t);if(!r)return e;const{scaleX:o,scaleY:s,x:i,y:l}=r,d=e.left-i-(1-o)*parseFloat(n),u=e.top-l-(1-s)*parseFloat(n.slice(n.indexOf(" ")+1)),f=o?e.width/o:e.width,h=s?e.height/s:e.height;return{width:f,height:h,top:u,right:d+f,bottom:u+h,left:d}}const Wr={ignoreTransform:!1};function Ae(e,t){t===void 0&&(t=Wr);let n=e.getBoundingClientRect();if(t.ignoreTransform){const{transform:u,transformOrigin:f}=Y(e).getComputedStyle(e);u&&(n=Gr(n,u,f))}const{top:r,left:o,width:s,height:i,bottom:l,right:d}=n;return{top:r,left:o,width:s,height:i,bottom:l,right:d}}function Xt(e){return Ae(e,{ignoreTransform:!0})}function Yr(e){const t=e.innerWidth,n=e.innerHeight;return{top:0,left:0,right:t,bottom:n,width:t,height:n}}function Xr(e,t){return t===void 0&&(t=Y(e).getComputedStyle(e)),t.position==="fixed"}function qr(e,t){t===void 0&&(t=Y(e).getComputedStyle(e));const n=/(auto|scroll|overlay)/;return["overflow","overflowX","overflowY"].some(o=>{const s=t[o];return typeof s=="string"?n.test(s):!1})}function jt(e,t){const n=[];function r(o){if(t!=null&&n.length>=t||!o)return n;if(Rt(o)&&o.scrollingElement!=null&&!n.includes(o.scrollingElement))return n.push(o.scrollingElement),n;if(!Xe(o)||rn(o)||n.includes(o))return n;const s=Y(e).getComputedStyle(o);return o!==e&&qr(o,s)&&n.push(o),Xr(o,s)?n:r(o.parentNode)}return e?r(e):n}function cn(e){const[t]=jt(e,1);return t??null}function pt(e){return!it||!e?null:ke(e)?e:Dt(e)?Rt(e)||e===Ee(e).scrollingElement?window:Xe(e)?e:null:null}function dn(e){return ke(e)?e.scrollX:e.scrollLeft}function un(e){return ke(e)?e.scrollY:e.scrollTop}function wt(e){return{x:dn(e),y:un(e)}}var $;(function(e){e[e.Forward=1]="Forward",e[e.Backward=-1]="Backward"})($||($={}));function fn(e){return!it||!e?!1:e===document.scrollingElement}function hn(e){const t={x:0,y:0},n=fn(e)?{height:window.innerHeight,width:window.innerWidth}:{height:e.clientHeight,width:e.clientWidth},r={x:e.scrollWidth-n.width,y:e.scrollHeight-n.height},o=e.scrollTop<=t.y,s=e.scrollLeft<=t.x,i=e.scrollTop>=r.y,l=e.scrollLeft>=r.x;return{isTop:o,isLeft:s,isBottom:i,isRight:l,maxScroll:r,minScroll:t}}const Kr={x:.2,y:.2};function Ur(e,t,n,r,o){let{top:s,left:i,right:l,bottom:d}=n;r===void 0&&(r=10),o===void 0&&(o=Kr);const{isTop:u,isBottom:f,isLeft:h,isRight:p}=hn(e),g={x:0,y:0},R={x:0,y:0},v={height:t.height*o.y,width:t.width*o.x};return!u&&s<=t.top+v.height?(g.y=$.Backward,R.y=r*Math.abs((t.top+v.height-s)/v.height)):!f&&d>=t.bottom-v.height&&(g.y=$.Forward,R.y=r*Math.abs((t.bottom-v.height-d)/v.height)),!p&&l>=t.right-v.width?(g.x=$.Forward,R.x=r*Math.abs((t.right-v.width-l)/v.width)):!h&&i<=t.left+v.width&&(g.x=$.Backward,R.x=r*Math.abs((t.left+v.width-i)/v.width)),{direction:g,speed:R}}function Jr(e){if(e===document.scrollingElement){const{innerWidth:s,innerHeight:i}=window;return{top:0,left:0,right:s,bottom:i,width:s,height:i}}const{top:t,left:n,right:r,bottom:o}=e.getBoundingClientRect();return{top:t,left:n,right:r,bottom:o,width:e.clientWidth,height:e.clientHeight}}function gn(e){return e.reduce((t,n)=>je(t,wt(n)),te)}function Vr(e){return e.reduce((t,n)=>t+dn(n),0)}function Hr(e){return e.reduce((t,n)=>t+un(n),0)}function mn(e,t){if(t===void 0&&(t=Ae),!e)return;const{top:n,left:r,bottom:o,right:s}=t(e);cn(e)&&(o<=0||s<=0||n>=window.innerHeight||r>=window.innerWidth)&&e.scrollIntoView({block:"center",inline:"center"})}const _r=[["x",["left","right"],Vr],["y",["top","bottom"],Hr]];class kt{constructor(t,n){this.rect=void 0,this.width=void 0,this.height=void 0,this.top=void 0,this.bottom=void 0,this.right=void 0,this.left=void 0;const r=jt(n),o=gn(r);this.rect={...t},this.width=t.width,this.height=t.height;for(const[s,i,l]of _r)for(const d of i)Object.defineProperty(this,d,{get:()=>{const u=l(r),f=o[s]-u;return this.rect[d]+f},enumerable:!0});Object.defineProperty(this,"rect",{enumerable:!1})}}class Be{constructor(t){this.target=void 0,this.listeners=[],this.removeAll=()=>{this.listeners.forEach(n=>{var r;return(r=this.target)==null?void 0:r.removeEventListener(...n)})},this.target=t}add(t,n,r){var o;(o=this.target)==null||o.addEventListener(t,n,r),this.listeners.push([t,n,r])}}function Zr(e){const{EventTarget:t}=Y(e);return e instanceof t?e:Ee(e)}function vt(e,t){const n=Math.abs(e.x),r=Math.abs(e.y);return typeof t=="number"?Math.sqrt(n**2+r**2)>t:"x"in t&&"y"in t?n>t.x&&r>t.y:"x"in t?n>t.x:"y"in t?r>t.y:!1}var Q;(function(e){e.Click="click",e.DragStart="dragstart",e.Keydown="keydown",e.ContextMenu="contextmenu",e.Resize="resize",e.SelectionChange="selectionchange",e.VisibilityChange="visibilitychange"})(Q||(Q={}));function qt(e){e.preventDefault()}function Qr(e){e.stopPropagation()}var E;(function(e){e.Space="Space",e.Down="ArrowDown",e.Right="ArrowRight",e.Left="ArrowLeft",e.Up="ArrowUp",e.Esc="Escape",e.Enter="Enter",e.Tab="Tab"})(E||(E={}));const pn={start:[E.Space,E.Enter],cancel:[E.Esc],end:[E.Space,E.Enter,E.Tab]},eo=(e,t)=>{let{currentCoordinates:n}=t;switch(e.code){case E.Right:return{...n,x:n.x+25};case E.Left:return{...n,x:n.x-25};case E.Down:return{...n,y:n.y+25};case E.Up:return{...n,y:n.y-25}}};class vn{constructor(t){this.props=void 0,this.autoScrollEnabled=!1,this.referenceCoordinates=void 0,this.listeners=void 0,this.windowListeners=void 0,this.props=t;const{event:{target:n}}=t;this.props=t,this.listeners=new Be(Ee(n)),this.windowListeners=new Be(Y(n)),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleCancel=this.handleCancel.bind(this),this.attach()}attach(){this.handleStart(),this.windowListeners.add(Q.Resize,this.handleCancel),this.windowListeners.add(Q.VisibilityChange,this.handleCancel),setTimeout(()=>this.listeners.add(Q.Keydown,this.handleKeyDown))}handleStart(){const{activeNode:t,onStart:n}=this.props,r=t.node.current;r&&mn(r),n(te)}handleKeyDown(t){if(ct(t)){const{active:n,context:r,options:o}=this.props,{keyboardCodes:s=pn,coordinateGetter:i=eo,scrollBehavior:l="smooth"}=o,{code:d}=t;if(s.end.includes(d)){this.handleEnd(t);return}if(s.cancel.includes(d)){this.handleCancel(t);return}const{collisionRect:u}=r.current,f=u?{x:u.left,y:u.top}:te;this.referenceCoordinates||(this.referenceCoordinates=f);const h=i(t,{active:n,context:r.current,currentCoordinates:f});if(h){const p=nt(h,f),g={x:0,y:0},{scrollableAncestors:R}=r.current;for(const v of R){const x=t.code,{isTop:S,isRight:N,isLeft:m,isBottom:w,maxScroll:b,minScroll:j}=hn(v),C=Jr(v),D={x:Math.min(x===E.Right?C.right-C.width/2:C.right,Math.max(x===E.Right?C.left:C.left+C.width/2,h.x)),y:Math.min(x===E.Down?C.bottom-C.height/2:C.bottom,Math.max(x===E.Down?C.top:C.top+C.height/2,h.y))},I=x===E.Right&&!N||x===E.Left&&!m,z=x===E.Down&&!w||x===E.Up&&!S;if(I&&D.x!==h.x){const A=v.scrollLeft+p.x,X=x===E.Right&&A<=b.x||x===E.Left&&A>=j.x;if(X&&!p.y){v.scrollTo({left:A,behavior:l});return}X?g.x=v.scrollLeft-A:g.x=x===E.Right?v.scrollLeft-b.x:v.scrollLeft-j.x,g.x&&v.scrollBy({left:-g.x,behavior:l});break}else if(z&&D.y!==h.y){const A=v.scrollTop+p.y,X=x===E.Down&&A<=b.y||x===E.Up&&A>=j.y;if(X&&!p.x){v.scrollTo({top:A,behavior:l});return}X?g.y=v.scrollTop-A:g.y=x===E.Down?v.scrollTop-b.y:v.scrollTop-j.y,g.y&&v.scrollBy({top:-g.y,behavior:l});break}}this.handleMove(t,je(nt(h,this.referenceCoordinates),g))}}}handleMove(t,n){const{onMove:r}=this.props;t.preventDefault(),r(n)}handleEnd(t){const{onEnd:n}=this.props;t.preventDefault(),this.detach(),n()}handleCancel(t){const{onCancel:n}=this.props;t.preventDefault(),this.detach(),n()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll()}}vn.activators=[{eventName:"onKeyDown",handler:(e,t,n)=>{let{keyboardCodes:r=pn,onActivation:o}=t,{active:s}=n;const{code:i}=e.nativeEvent;if(r.start.includes(i)){const l=s.activatorNode.current;return l&&e.target!==l?!1:(e.preventDefault(),o?.({event:e.nativeEvent}),!0)}return!1}}];function Kt(e){return!!(e&&"distance"in e)}function Ut(e){return!!(e&&"delay"in e)}class Et{constructor(t,n,r){var o;r===void 0&&(r=Zr(t.event.target)),this.props=void 0,this.events=void 0,this.autoScrollEnabled=!0,this.document=void 0,this.activated=!1,this.initialCoordinates=void 0,this.timeoutId=null,this.listeners=void 0,this.documentListeners=void 0,this.windowListeners=void 0,this.props=t,this.events=n;const{event:s}=t,{target:i}=s;this.props=t,this.events=n,this.document=Ee(i),this.documentListeners=new Be(this.document),this.listeners=new Be(r),this.windowListeners=new Be(Y(i)),this.initialCoordinates=(o=rt(s))!=null?o:te,this.handleStart=this.handleStart.bind(this),this.handleMove=this.handleMove.bind(this),this.handleEnd=this.handleEnd.bind(this),this.handleCancel=this.handleCancel.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.removeTextSelection=this.removeTextSelection.bind(this),this.attach()}attach(){const{events:t,props:{options:{activationConstraint:n,bypassActivationConstraint:r}}}=this;if(this.listeners.add(t.move.name,this.handleMove,{passive:!1}),this.listeners.add(t.end.name,this.handleEnd),t.cancel&&this.listeners.add(t.cancel.name,this.handleCancel),this.windowListeners.add(Q.Resize,this.handleCancel),this.windowListeners.add(Q.DragStart,qt),this.windowListeners.add(Q.VisibilityChange,this.handleCancel),this.windowListeners.add(Q.ContextMenu,qt),this.documentListeners.add(Q.Keydown,this.handleKeydown),n){if(r!=null&&r({event:this.props.event,activeNode:this.props.activeNode,options:this.props.options}))return this.handleStart();if(Ut(n)){this.timeoutId=setTimeout(this.handleStart,n.delay),this.handlePending(n);return}if(Kt(n)){this.handlePending(n);return}}this.handleStart()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll(),setTimeout(this.documentListeners.removeAll,50),this.timeoutId!==null&&(clearTimeout(this.timeoutId),this.timeoutId=null)}handlePending(t,n){const{active:r,onPending:o}=this.props;o(r,t,this.initialCoordinates,n)}handleStart(){const{initialCoordinates:t}=this,{onStart:n}=this.props;t&&(this.activated=!0,this.documentListeners.add(Q.Click,Qr,{capture:!0}),this.removeTextSelection(),this.documentListeners.add(Q.SelectionChange,this.removeTextSelection),n(t))}handleMove(t){var n;const{activated:r,initialCoordinates:o,props:s}=this,{onMove:i,options:{activationConstraint:l}}=s;if(!o)return;const d=(n=rt(t))!=null?n:te,u=nt(o,d);if(!r&&l){if(Kt(l)){if(l.tolerance!=null&&vt(u,l.tolerance))return this.handleCancel();if(vt(u,l.distance))return this.handleStart()}if(Ut(l)&&vt(u,l.tolerance))return this.handleCancel();this.handlePending(l,u);return}t.cancelable&&t.preventDefault(),i(d)}handleEnd(){const{onAbort:t,onEnd:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleCancel(){const{onAbort:t,onCancel:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleKeydown(t){t.code===E.Esc&&this.handleCancel()}removeTextSelection(){var t;(t=this.document.getSelection())==null||t.removeAllRanges()}}const to={cancel:{name:"pointercancel"},move:{name:"pointermove"},end:{name:"pointerup"}};class At extends Et{constructor(t){const{event:n}=t,r=Ee(n.target);super(t,to,r)}}At.activators=[{eventName:"onPointerDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return!n.isPrimary||n.button!==0?!1:(r?.({event:n}),!0)}}];const no={move:{name:"mousemove"},end:{name:"mouseup"}};var St;(function(e){e[e.RightClick=2]="RightClick"})(St||(St={}));class ro extends Et{constructor(t){super(t,no,Ee(t.event.target))}}ro.activators=[{eventName:"onMouseDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return n.button===St.RightClick?!1:(r?.({event:n}),!0)}}];const xt={cancel:{name:"touchcancel"},move:{name:"touchmove"},end:{name:"touchend"}};class oo extends Et{constructor(t){super(t,xt)}static setup(){return window.addEventListener(xt.move.name,t,{capture:!1,passive:!1}),function(){window.removeEventListener(xt.move.name,t)};function t(){}}}oo.activators=[{eventName:"onTouchStart",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;const{touches:o}=n;return o.length>1?!1:(r?.({event:n}),!0)}}];var $e;(function(e){e[e.Pointer=0]="Pointer",e[e.DraggableRect=1]="DraggableRect"})($e||($e={}));var st;(function(e){e[e.TreeOrder=0]="TreeOrder",e[e.ReversedTreeOrder=1]="ReversedTreeOrder"})(st||(st={}));function so(e){let{acceleration:t,activator:n=$e.Pointer,canScroll:r,draggingRect:o,enabled:s,interval:i=5,order:l=st.TreeOrder,pointerCoordinates:d,scrollableAncestors:u,scrollableAncestorRects:f,delta:h,threshold:p}=e;const g=io({delta:h,disabled:!s}),[R,v]=mr(),x=c.useRef({x:0,y:0}),S=c.useRef({x:0,y:0}),N=c.useMemo(()=>{switch(n){case $e.Pointer:return d?{top:d.y,bottom:d.y,left:d.x,right:d.x}:null;case $e.DraggableRect:return o}},[n,o,d]),m=c.useRef(null),w=c.useCallback(()=>{const j=m.current;if(!j)return;const C=x.current.x*S.current.x,D=x.current.y*S.current.y;j.scrollBy(C,D)},[]),b=c.useMemo(()=>l===st.TreeOrder?[...u].reverse():u,[l,u]);c.useEffect(()=>{if(!s||!u.length||!N){v();return}for(const j of b){if(r?.(j)===!1)continue;const C=u.indexOf(j),D=f[C];if(!D)continue;const{direction:I,speed:z}=Ur(j,D,N,t,p);for(const A of["x","y"])g[A][I[A]]||(z[A]=0,I[A]=0);if(z.x>0||z.y>0){v(),m.current=j,R(w,i),x.current=z,S.current=I;return}}x.current={x:0,y:0},S.current={x:0,y:0},v()},[t,w,r,v,s,i,JSON.stringify(N),JSON.stringify(g),R,u,b,f,JSON.stringify(p)])}const ao={x:{[$.Backward]:!1,[$.Forward]:!1},y:{[$.Backward]:!1,[$.Forward]:!1}};function io(e){let{delta:t,disabled:n}=e;const r=tt(t);return qe(o=>{if(n||!r||!o)return ao;const s={x:Math.sign(t.x-r.x),y:Math.sign(t.y-r.y)};return{x:{[$.Backward]:o.x[$.Backward]||s.x===-1,[$.Forward]:o.x[$.Forward]||s.x===1},y:{[$.Backward]:o.y[$.Backward]||s.y===-1,[$.Forward]:o.y[$.Forward]||s.y===1}}},[n,t,r])}function lo(e,t){const n=t!=null?e.get(t):void 0,r=n?n.node.current:null;return qe(o=>{var s;return t==null?null:(s=r??o)!=null?s:null},[r,t])}function co(e,t){return c.useMemo(()=>e.reduce((n,r)=>{const{sensor:o}=r,s=o.activators.map(i=>({eventName:i.eventName,handler:t(i.handler,r)}));return[...n,...s]},[]),[e,t])}var Ye;(function(e){e[e.Always=0]="Always",e[e.BeforeDragging=1]="BeforeDragging",e[e.WhileDragging=2]="WhileDragging"})(Ye||(Ye={}));var Ct;(function(e){e.Optimized="optimized"})(Ct||(Ct={}));const Jt=new Map;function uo(e,t){let{dragging:n,dependencies:r,config:o}=t;const[s,i]=c.useState(null),{frequency:l,measure:d,strategy:u}=o,f=c.useRef(e),h=x(),p=We(h),g=c.useCallback(function(S){S===void 0&&(S=[]),!p.current&&i(N=>N===null?S:N.concat(S.filter(m=>!N.includes(m))))},[p]),R=c.useRef(null),v=qe(S=>{if(h&&!n)return Jt;if(!S||S===Jt||f.current!==e||s!=null){const N=new Map;for(let m of e){if(!m)continue;if(s&&s.length>0&&!s.includes(m.id)&&m.rect.current){N.set(m.id,m.rect.current);continue}const w=m.node.current,b=w?new kt(d(w),w):null;m.rect.current=b,b&&N.set(m.id,b)}return N}return S},[e,s,n,h,d]);return c.useEffect(()=>{f.current=e},[e]),c.useEffect(()=>{h||g()},[n,h]),c.useEffect(()=>{s&&s.length>0&&i(null)},[JSON.stringify(s)]),c.useEffect(()=>{h||typeof l!="number"||R.current!==null||(R.current=setTimeout(()=>{g(),R.current=null},l))},[l,h,g,...r]),{droppableRects:v,measureDroppableContainers:g,measuringScheduled:s!=null};function x(){switch(u){case Ye.Always:return!1;case Ye.BeforeDragging:return n;default:return!n}}}function Tt(e,t){return qe(n=>e?n||(typeof t=="function"?t(e):e):null,[t,e])}function fo(e,t){return Tt(e,t)}function ho(e){let{callback:t,disabled:n}=e;const r=lt(t),o=c.useMemo(()=>{if(n||typeof window>"u"||typeof window.MutationObserver>"u")return;const{MutationObserver:s}=window;return new s(r)},[r,n]);return c.useEffect(()=>()=>o?.disconnect(),[o]),o}function dt(e){let{callback:t,disabled:n}=e;const r=lt(t),o=c.useMemo(()=>{if(n||typeof window>"u"||typeof window.ResizeObserver>"u")return;const{ResizeObserver:s}=window;return new s(r)},[n]);return c.useEffect(()=>()=>o?.disconnect(),[o]),o}function go(e){return new kt(Ae(e),e)}function Vt(e,t,n){t===void 0&&(t=go);const[r,o]=c.useState(null);function s(){o(d=>{if(!e)return null;if(e.isConnected===!1){var u;return(u=d??n)!=null?u:null}const f=t(e);return JSON.stringify(d)===JSON.stringify(f)?d:f})}const i=ho({callback(d){if(e)for(const u of d){const{type:f,target:h}=u;if(f==="childList"&&h instanceof HTMLElement&&h.contains(e)){s();break}}}}),l=dt({callback:s});return ee(()=>{s(),e?(l?.observe(e),i?.observe(document.body,{childList:!0,subtree:!0})):(l?.disconnect(),i?.disconnect())},[e]),r}function mo(e){const t=Tt(e);return an(e,t)}const Ht=[];function po(e){const t=c.useRef(e),n=qe(r=>e?r&&r!==Ht&&e&&t.current&&e.parentNode===t.current.parentNode?r:jt(e):Ht,[e]);return c.useEffect(()=>{t.current=e},[e]),n}function vo(e){const[t,n]=c.useState(null),r=c.useRef(e),o=c.useCallback(s=>{const i=pt(s.target);i&&n(l=>l?(l.set(i,wt(i)),new Map(l)):null)},[]);return c.useEffect(()=>{const s=r.current;if(e!==s){i(s);const l=e.map(d=>{const u=pt(d);return u?(u.addEventListener("scroll",o,{passive:!0}),[u,wt(u)]):null}).filter(d=>d!=null);n(l.length?new Map(l):null),r.current=e}return()=>{i(e),i(s)};function i(l){l.forEach(d=>{const u=pt(d);u?.removeEventListener("scroll",o)})}},[o,e]),c.useMemo(()=>e.length?t?Array.from(t.values()).reduce((s,i)=>je(s,i),te):gn(e):te,[e,t])}function _t(e,t){t===void 0&&(t=[]);const n=c.useRef(null);return c.useEffect(()=>{n.current=null},t),c.useEffect(()=>{const r=e!==te;r&&!n.current&&(n.current=e),!r&&n.current&&(n.current=null)},[e]),n.current?nt(e,n.current):te}function xo(e){c.useEffect(()=>{if(!it)return;const t=e.map(n=>{let{sensor:r}=n;return r.setup==null?void 0:r.setup()});return()=>{for(const n of t)n?.()}},e.map(t=>{let{sensor:n}=t;return n}))}function bo(e,t){return c.useMemo(()=>e.reduce((n,r)=>{let{eventName:o,handler:s}=r;return n[o]=i=>{s(i,t)},n},{}),[e,t])}function xn(e){return c.useMemo(()=>e?Yr(e):null,[e])}const Zt=[];function yo(e,t){t===void 0&&(t=Ae);const[n]=e,r=xn(n?Y(n):null),[o,s]=c.useState(Zt);function i(){s(()=>e.length?e.map(d=>fn(d)?r:new kt(t(d),d)):Zt)}const l=dt({callback:i});return ee(()=>{l?.disconnect(),i(),e.forEach(d=>l?.observe(d))},[e]),o}function bn(e){if(!e)return null;if(e.children.length>1)return e;const t=e.children[0];return Xe(t)?t:e}function wo(e){let{measure:t}=e;const[n,r]=c.useState(null),o=c.useCallback(u=>{for(const{target:f}of u)if(Xe(f)){r(h=>{const p=t(f);return h?{...h,width:p.width,height:p.height}:p});break}},[t]),s=dt({callback:o}),i=c.useCallback(u=>{const f=bn(u);s?.disconnect(),f&&s?.observe(f),r(f?t(f):null)},[t,s]),[l,d]=et(i);return c.useMemo(()=>({nodeRef:l,rect:n,setRef:d}),[n,l,d])}const So=[{sensor:At,options:{}},{sensor:vn,options:{}}],Co={current:{}},Qe={draggable:{measure:Xt},droppable:{measure:Xt,strategy:Ye.WhileDragging,frequency:Ct.Optimized},dragOverlay:{measure:Ae}};class Ge extends Map{get(t){var n;return t!=null&&(n=super.get(t))!=null?n:void 0}toArray(){return Array.from(this.values())}getEnabled(){return this.toArray().filter(t=>{let{disabled:n}=t;return!n})}getNodeFor(t){var n,r;return(n=(r=this.get(t))==null?void 0:r.node.current)!=null?n:void 0}}const No={activatorEvent:null,active:null,activeNode:null,activeNodeRect:null,collisions:null,containerNodeRect:null,draggableNodes:new Map,droppableRects:new Map,droppableContainers:new Ge,over:null,dragOverlay:{nodeRef:{current:null},rect:null,setRef:ot},scrollableAncestors:[],scrollableAncestorRects:[],measuringConfiguration:Qe,measureDroppableContainers:ot,windowRect:null,measuringScheduled:!1},yn={activatorEvent:null,activators:[],active:null,activeNodeRect:null,ariaDescribedById:{draggable:""},dispatch:ot,draggableNodes:new Map,over:null,measureDroppableContainers:ot},Ue=c.createContext(yn),wn=c.createContext(No);function Do(){return{draggable:{active:null,initialCoordinates:{x:0,y:0},nodes:new Map,translate:{x:0,y:0}},droppable:{containers:new Ge}}}function Ro(e,t){switch(t.type){case P.DragStart:return{...e,draggable:{...e.draggable,initialCoordinates:t.initialCoordinates,active:t.active}};case P.DragMove:return e.draggable.active==null?e:{...e,draggable:{...e.draggable,translate:{x:t.coordinates.x-e.draggable.initialCoordinates.x,y:t.coordinates.y-e.draggable.initialCoordinates.y}}};case P.DragEnd:case P.DragCancel:return{...e,draggable:{...e.draggable,active:null,initialCoordinates:{x:0,y:0},translate:{x:0,y:0}}};case P.RegisterDroppable:{const{element:n}=t,{id:r}=n,o=new Ge(e.droppable.containers);return o.set(r,n),{...e,droppable:{...e.droppable,containers:o}}}case P.SetDroppableDisabled:{const{id:n,key:r,disabled:o}=t,s=e.droppable.containers.get(n);if(!s||r!==s.key)return e;const i=new Ge(e.droppable.containers);return i.set(n,{...s,disabled:o}),{...e,droppable:{...e.droppable,containers:i}}}case P.UnregisterDroppable:{const{id:n,key:r}=t,o=e.droppable.containers.get(n);if(!o||r!==o.key)return e;const s=new Ge(e.droppable.containers);return s.delete(n),{...e,droppable:{...e.droppable,containers:s}}}default:return e}}function jo(e){let{disabled:t}=e;const{active:n,activatorEvent:r,draggableNodes:o}=c.useContext(Ue),s=tt(r),i=tt(n?.id);return c.useEffect(()=>{if(!t&&!r&&s&&i!=null){if(!ct(s)||document.activeElement===s.target)return;const l=o.get(i);if(!l)return;const{activatorNode:d,node:u}=l;if(!d.current&&!u.current)return;requestAnimationFrame(()=>{for(const f of[d.current,u.current]){if(!f)continue;const h=xr(f);if(h){h.focus();break}}})}},[r,t,o,i,s]),null}function Sn(e,t){let{transform:n,...r}=t;return e!=null&&e.length?e.reduce((o,s)=>s({transform:o,...r}),n):n}function ko(e){return c.useMemo(()=>({draggable:{...Qe.draggable,...e?.draggable},droppable:{...Qe.droppable,...e?.droppable},dragOverlay:{...Qe.dragOverlay,...e?.dragOverlay}}),[e?.draggable,e?.droppable,e?.dragOverlay])}function Eo(e){let{activeNode:t,measure:n,initialRect:r,config:o=!0}=e;const s=c.useRef(!1),{x:i,y:l}=typeof o=="boolean"?{x:o,y:o}:o;ee(()=>{if(!i&&!l||!t){s.current=!1;return}if(s.current||!r)return;const u=t?.node.current;if(!u||u.isConnected===!1)return;const f=n(u),h=an(f,r);if(i||(h.x=0),l||(h.y=0),s.current=!0,Math.abs(h.x)>0||Math.abs(h.y)>0){const p=cn(u);p&&p.scrollBy({top:h.y,left:h.x})}},[t,i,l,r,n])}const ut=c.createContext({...te,scaleX:1,scaleY:1});var pe;(function(e){e[e.Uninitialized=0]="Uninitialized",e[e.Initializing=1]="Initializing",e[e.Initialized=2]="Initialized"})(pe||(pe={}));const Ao=c.memo(function(t){var n,r,o,s;let{id:i,accessibility:l,autoScroll:d=!0,children:u,sensors:f=So,collisionDetection:h=Fr,measuring:p,modifiers:g,...R}=t;const v=c.useReducer(Ro,void 0,Do),[x,S]=v,[N,m]=Nr(),[w,b]=c.useState(pe.Uninitialized),j=w===pe.Initialized,{draggable:{active:C,nodes:D,translate:I},droppable:{containers:z}}=x,A=C!=null?D.get(C):null,X=c.useRef({initial:null,translated:null}),q=c.useMemo(()=>{var W;return C!=null?{id:C,data:(W=A?.data)!=null?W:Co,rect:X}:null},[C,A]),y=c.useRef(null),[k,B]=c.useState(null),[L,se]=c.useState(null),H=We(R,Object.values(R)),K=Ke("DndDescribedBy",i),ce=c.useMemo(()=>z.getEnabled(),[z]),M=ko(p),{droppableRects:F,measureDroppableContainers:xe,measuringScheduled:Te}=uo(ce,{dragging:j,dependencies:[I.x,I.y],config:M.droppable}),_=lo(D,C),Je=c.useMemo(()=>L?rt(L):null,[L]),de=Fn(),ae=fo(_,M.draggable.measure);Eo({activeNode:C!=null?D.get(C):null,config:de.layoutShiftCompensation,initialRect:ae,measure:M.draggable.measure});const T=Vt(_,M.draggable.measure,ae),Ie=Vt(_?_.parentElement:null),ne=c.useRef({activatorEvent:null,active:null,activeNode:_,collisionRect:null,collisions:null,droppableRects:F,draggableNodes:D,draggingNode:null,draggingNodeRect:null,droppableContainers:z,over:null,scrollableAncestors:[],scrollAdjustedTranslate:null}),ye=z.getNodeFor((n=ne.current.over)==null?void 0:n.id),ie=wo({measure:M.dragOverlay.measure}),we=(r=ie.nodeRef.current)!=null?r:_,Se=j?(o=ie.rect)!=null?o:T:null,It=!!(ie.nodeRef.current&&ie.rect),Mt=mo(It?null:T),ft=xn(we?Y(we):null),ue=po(j?ye??_:null),Ve=yo(ue),He=Sn(g,{transform:{x:I.x-Mt.x,y:I.y-Mt.y,scaleX:1,scaleY:1},activatorEvent:L,active:q,activeNodeRect:T,containerNodeRect:Ie,draggingNodeRect:Se,over:ne.current.over,overlayNodeRect:ie.rect,scrollableAncestors:ue,scrollableAncestorRects:Ve,windowRect:ft}),Ot=Je?je(Je,I):null,zt=vo(ue),An=_t(zt),Tn=_t(zt,[T]),Ce=je(He,An),Ne=Se?$r(Se,He):null,Me=q&&Ne?h({active:q,collisionRect:Ne,droppableRects:F,droppableContainers:ce,pointerCoordinates:Ot}):null,Lt=Or(Me,"id"),[fe,Ft]=c.useState(null),In=It?He:je(He,Tn),Mn=Pr(In,(s=fe?.rect)!=null?s:null,T),ht=c.useRef(null),Pt=c.useCallback((W,U)=>{let{sensor:J,options:he}=U;if(y.current==null)return;const Z=D.get(y.current);if(!Z)return;const V=W.nativeEvent,re=new J({active:y.current,activeNode:Z,event:V,options:he,context:ne,onAbort(G){if(!D.get(G))return;const{onDragAbort:oe}=H.current,le={id:G};oe?.(le),N({type:"onDragAbort",event:le})},onPending(G,ge,oe,le){if(!D.get(G))return;const{onDragPending:ze}=H.current,me={id:G,constraint:ge,initialCoordinates:oe,offset:le};ze?.(me),N({type:"onDragPending",event:me})},onStart(G){const ge=y.current;if(ge==null)return;const oe=D.get(ge);if(!oe)return;const{onDragStart:le}=H.current,Oe={activatorEvent:V,active:{id:ge,data:oe.data,rect:X}};Fe.unstable_batchedUpdates(()=>{le?.(Oe),b(pe.Initializing),S({type:P.DragStart,initialCoordinates:G,active:ge}),N({type:"onDragStart",event:Oe}),B(ht.current),se(V)})},onMove(G){S({type:P.DragMove,coordinates:G})},onEnd:De(P.DragEnd),onCancel:De(P.DragCancel)});ht.current=re;function De(G){return async function(){const{active:oe,collisions:le,over:Oe,scrollAdjustedTranslate:ze}=ne.current;let me=null;if(oe&&ze){const{cancelDrop:Le}=H.current;me={activatorEvent:V,active:oe,collisions:le,delta:ze,over:Oe},G===P.DragEnd&&typeof Le=="function"&&await Promise.resolve(Le(me))&&(G=P.DragCancel)}y.current=null,Fe.unstable_batchedUpdates(()=>{S({type:G}),b(pe.Uninitialized),Ft(null),B(null),se(null),ht.current=null;const Le=G===P.DragEnd?"onDragEnd":"onDragCancel";if(me){const gt=H.current[Le];gt?.(me),N({type:Le,event:me})}})}}},[D]),On=c.useCallback((W,U)=>(J,he)=>{const Z=J.nativeEvent,V=D.get(he);if(y.current!==null||!V||Z.dndKit||Z.defaultPrevented)return;const re={active:V};W(J,U.options,re)===!0&&(Z.dndKit={capturedBy:U.sensor},y.current=he,Pt(J,U))},[D,Pt]),Bt=co(f,On);xo(f),ee(()=>{T&&w===pe.Initializing&&b(pe.Initialized)},[T,w]),c.useEffect(()=>{const{onDragMove:W}=H.current,{active:U,activatorEvent:J,collisions:he,over:Z}=ne.current;if(!U||!J)return;const V={active:U,activatorEvent:J,collisions:he,delta:{x:Ce.x,y:Ce.y},over:Z};Fe.unstable_batchedUpdates(()=>{W?.(V),N({type:"onDragMove",event:V})})},[Ce.x,Ce.y]),c.useEffect(()=>{const{active:W,activatorEvent:U,collisions:J,droppableContainers:he,scrollAdjustedTranslate:Z}=ne.current;if(!W||y.current==null||!U||!Z)return;const{onDragOver:V}=H.current,re=he.get(Lt),De=re&&re.rect.current?{id:re.id,rect:re.rect.current,data:re.data,disabled:re.disabled}:null,G={active:W,activatorEvent:U,collisions:J,delta:{x:Z.x,y:Z.y},over:De};Fe.unstable_batchedUpdates(()=>{Ft(De),V?.(G),N({type:"onDragOver",event:G})})},[Lt]),ee(()=>{ne.current={activatorEvent:L,active:q,activeNode:_,collisionRect:Ne,collisions:Me,droppableRects:F,draggableNodes:D,draggingNode:we,draggingNodeRect:Se,droppableContainers:z,over:fe,scrollableAncestors:ue,scrollAdjustedTranslate:Ce},X.current={initial:Se,translated:Ne}},[q,_,Me,Ne,D,we,Se,F,z,fe,ue,Ce]),so({...de,delta:I,draggingRect:Ne,pointerCoordinates:Ot,scrollableAncestors:ue,scrollableAncestorRects:Ve});const zn=c.useMemo(()=>({active:q,activeNode:_,activeNodeRect:T,activatorEvent:L,collisions:Me,containerNodeRect:Ie,dragOverlay:ie,draggableNodes:D,droppableContainers:z,droppableRects:F,over:fe,measureDroppableContainers:xe,scrollableAncestors:ue,scrollableAncestorRects:Ve,measuringConfiguration:M,measuringScheduled:Te,windowRect:ft}),[q,_,T,L,Me,Ie,ie,D,z,F,fe,xe,ue,Ve,M,Te,ft]),Ln=c.useMemo(()=>({activatorEvent:L,activators:Bt,active:q,activeNodeRect:T,ariaDescribedById:{draggable:K},dispatch:S,draggableNodes:D,over:fe,measureDroppableContainers:xe}),[L,Bt,q,T,S,K,D,fe,xe]);return O.createElement(sn.Provider,{value:m},O.createElement(Ue.Provider,{value:Ln},O.createElement(wn.Provider,{value:zn},O.createElement(ut.Provider,{value:Mn},u)),O.createElement(jo,{disabled:l?.restoreFocus===!1})),O.createElement(jr,{...l,hiddenTextDescribedById:K}));function Fn(){const W=k?.autoScrollEnabled===!1,U=typeof d=="object"?d.enabled===!1:d===!1,J=j&&!W&&!U;return typeof d=="object"?{...d,enabled:J}:{enabled:J}}}),To=c.createContext(null),Qt="button",Io="Draggable";function Mo(e){let{id:t,data:n,disabled:r=!1,attributes:o}=e;const s=Ke(Io),{activators:i,activatorEvent:l,active:d,activeNodeRect:u,ariaDescribedById:f,draggableNodes:h,over:p}=c.useContext(Ue),{role:g=Qt,roleDescription:R="draggable",tabIndex:v=0}=o??{},x=d?.id===t,S=c.useContext(x?ut:To),[N,m]=et(),[w,b]=et(),j=bo(i,t),C=We(n);ee(()=>(h.set(t,{id:t,key:s,node:N,activatorNode:w,data:C}),()=>{const I=h.get(t);I&&I.key===s&&h.delete(t)}),[h,t]);const D=c.useMemo(()=>({role:g,tabIndex:v,"aria-disabled":r,"aria-pressed":x&&g===Qt?!0:void 0,"aria-roledescription":R,"aria-describedby":f.draggable}),[r,g,v,x,R,f.draggable]);return{active:d,activatorEvent:l,activeNodeRect:u,attributes:D,isDragging:x,listeners:r?void 0:j,node:N,over:p,setNodeRef:m,setActivatorNodeRef:b,transform:S}}function Cn(){return c.useContext(wn)}const Oo="Droppable",zo={timeout:25};function Nn(e){let{data:t,disabled:n=!1,id:r,resizeObserverConfig:o}=e;const s=Ke(Oo),{active:i,dispatch:l,over:d,measureDroppableContainers:u}=c.useContext(Ue),f=c.useRef({disabled:n}),h=c.useRef(!1),p=c.useRef(null),g=c.useRef(null),{disabled:R,updateMeasurementsFor:v,timeout:x}={...zo,...o},S=We(v??r),N=c.useCallback(()=>{if(!h.current){h.current=!0;return}g.current!=null&&clearTimeout(g.current),g.current=setTimeout(()=>{u(Array.isArray(S.current)?S.current:[S.current]),g.current=null},x)},[x]),m=dt({callback:N,disabled:R||!i}),w=c.useCallback((D,I)=>{m&&(I&&(m.unobserve(I),h.current=!1),D&&m.observe(D))},[m]),[b,j]=et(w),C=We(t);return c.useEffect(()=>{!m||!b.current||(m.disconnect(),h.current=!1,m.observe(b.current))},[b,m]),c.useEffect(()=>(l({type:P.RegisterDroppable,element:{id:r,key:s,disabled:n,node:b,rect:p,data:C}}),()=>l({type:P.UnregisterDroppable,key:s,id:r})),[r]),c.useEffect(()=>{n!==f.current.disabled&&(l({type:P.SetDroppableDisabled,id:r,key:s,disabled:n}),f.current.disabled=n)},[r,s,n,l]),{active:i,rect:p,isOver:d?.id===r,node:b,over:d,setNodeRef:j}}function Lo(e){let{animation:t,children:n}=e;const[r,o]=c.useState(null),[s,i]=c.useState(null),l=tt(n);return!n&&!r&&l&&o(l),ee(()=>{if(!s)return;const d=r?.key,u=r?.props.id;if(d==null||u==null){o(null);return}Promise.resolve(t(u,s)).then(()=>{o(null)})},[t,r,s]),O.createElement(O.Fragment,null,n,r?c.cloneElement(r,{ref:i}):null)}const Fo={x:0,y:0,scaleX:1,scaleY:1};function Po(e){let{children:t}=e;return O.createElement(Ue.Provider,{value:yn},O.createElement(ut.Provider,{value:Fo},t))}const Bo={position:"fixed",touchAction:"none"},$o=e=>ct(e)?"transform 250ms ease":void 0,Go=c.forwardRef((e,t)=>{let{as:n,activatorEvent:r,adjustScale:o,children:s,className:i,rect:l,style:d,transform:u,transition:f=$o}=e;if(!l)return null;const h=o?u:{...u,scaleX:1,scaleY:1},p={...Bo,width:l.width,height:l.height,top:l.top,left:l.left,transform:ve.Transform.toString(h),transformOrigin:o&&r?Tr(r,l):void 0,transition:typeof f=="function"?f(r):f,...d};return O.createElement(n,{className:i,style:p,ref:t},s)}),Wo=e=>t=>{let{active:n,dragOverlay:r}=t;const o={},{styles:s,className:i}=e;if(s!=null&&s.active)for(const[l,d]of Object.entries(s.active))d!==void 0&&(o[l]=n.node.style.getPropertyValue(l),n.node.style.setProperty(l,d));if(s!=null&&s.dragOverlay)for(const[l,d]of Object.entries(s.dragOverlay))d!==void 0&&r.node.style.setProperty(l,d);return i!=null&&i.active&&n.node.classList.add(i.active),i!=null&&i.dragOverlay&&r.node.classList.add(i.dragOverlay),function(){for(const[d,u]of Object.entries(o))n.node.style.setProperty(d,u);i!=null&&i.active&&n.node.classList.remove(i.active)}},Yo=e=>{let{transform:{initial:t,final:n}}=e;return[{transform:ve.Transform.toString(t)},{transform:ve.Transform.toString(n)}]},Xo={duration:250,easing:"ease",keyframes:Yo,sideEffects:Wo({styles:{active:{opacity:"0"}}})};function qo(e){let{config:t,draggableNodes:n,droppableContainers:r,measuringConfiguration:o}=e;return lt((s,i)=>{if(t===null)return;const l=n.get(s);if(!l)return;const d=l.node.current;if(!d)return;const u=bn(i);if(!u)return;const{transform:f}=Y(i).getComputedStyle(i),h=ln(f);if(!h)return;const p=typeof t=="function"?t:Ko(t);return mn(d,o.draggable.measure),p({active:{id:s,data:l.data,node:d,rect:o.draggable.measure(d)},draggableNodes:n,dragOverlay:{node:i,rect:o.dragOverlay.measure(u)},droppableContainers:r,measuringConfiguration:o,transform:h})})}function Ko(e){const{duration:t,easing:n,sideEffects:r,keyframes:o}={...Xo,...e};return s=>{let{active:i,dragOverlay:l,transform:d,...u}=s;if(!t)return;const f={x:l.rect.left-i.rect.left,y:l.rect.top-i.rect.top},h={scaleX:d.scaleX!==1?i.rect.width*d.scaleX/l.rect.width:1,scaleY:d.scaleY!==1?i.rect.height*d.scaleY/l.rect.height:1},p={x:d.x-f.x,y:d.y-f.y,...h},g=o({...u,active:i,dragOverlay:l,transform:{initial:d,final:p}}),[R]=g,v=g[g.length-1];if(JSON.stringify(R)===JSON.stringify(v))return;const x=r?.({active:i,dragOverlay:l,...u}),S=l.node.animate(g,{duration:t,easing:n,fill:"forwards"});return new Promise(N=>{S.onfinish=()=>{x?.(),N()}})}}let en=0;function Uo(e){return c.useMemo(()=>{if(e!=null)return en++,en},[e])}const Jo=O.memo(e=>{let{adjustScale:t=!1,children:n,dropAnimation:r,style:o,transition:s,modifiers:i,wrapperElement:l="div",className:d,zIndex:u=999}=e;const{activatorEvent:f,active:h,activeNodeRect:p,containerNodeRect:g,draggableNodes:R,droppableContainers:v,dragOverlay:x,over:S,measuringConfiguration:N,scrollableAncestors:m,scrollableAncestorRects:w,windowRect:b}=Cn(),j=c.useContext(ut),C=Uo(h?.id),D=Sn(i,{activatorEvent:f,active:h,activeNodeRect:p,containerNodeRect:g,draggingNodeRect:x.rect,over:S,overlayNodeRect:x.rect,scrollableAncestors:m,scrollableAncestorRects:w,transform:j,windowRect:b}),I=Tt(p),z=qo({config:r,draggableNodes:R,droppableContainers:v,measuringConfiguration:N}),A=I?x.setRef:void 0;return O.createElement(Po,null,O.createElement(Lo,{animation:z},h&&C?O.createElement(Go,{key:C,id:h.id,ref:A,as:l,activatorEvent:f,adjustScale:t,className:d,transition:s,rect:I,style:{zIndex:u,...o},transform:D},n):null))});function Dn(e,t,n){const r=e.slice();return r.splice(n<0?r.length+n:n,0,r.splice(t,1)[0]),r}function Vo(e,t){return e.reduce((n,r,o)=>{const s=t.get(r);return s&&(n[o]=s),n},Array(e.length))}function _e(e){return e!==null&&e>=0}function Ho(e,t){if(e===t)return!0;if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function _o(e){return typeof e=="boolean"?{draggable:e,droppable:e}:e}const Rn=e=>{let{rects:t,activeIndex:n,overIndex:r,index:o}=e;const s=Dn(t,r,n),i=t[o],l=s[o];return!l||!i?null:{x:l.left-i.left,y:l.top-i.top,scaleX:l.width/i.width,scaleY:l.height/i.height}},Ze={scaleX:1,scaleY:1},Zo=e=>{var t;let{activeIndex:n,activeNodeRect:r,index:o,rects:s,overIndex:i}=e;const l=(t=s[n])!=null?t:r;if(!l)return null;if(o===n){const u=s[i];return u?{x:0,y:n<i?u.top+u.height-(l.top+l.height):u.top-l.top,...Ze}:null}const d=Qo(s,o,n);return o>n&&o<=i?{x:0,y:-l.height-d,...Ze}:o<n&&o>=i?{x:0,y:l.height+d,...Ze}:{x:0,y:0,...Ze}};function Qo(e,t,n){const r=e[t],o=e[t-1],s=e[t+1];return r?n<t?o?r.top-(o.top+o.height):s?s.top-(r.top+r.height):0:s?s.top-(r.top+r.height):o?r.top-(o.top+o.height):0:0}const jn="Sortable",kn=O.createContext({activeIndex:-1,containerId:jn,disableTransforms:!1,items:[],overIndex:-1,useDragOverlay:!1,sortedRects:[],strategy:Rn,disabled:{draggable:!1,droppable:!1}});function es(e){let{children:t,id:n,items:r,strategy:o=Rn,disabled:s=!1}=e;const{active:i,dragOverlay:l,droppableRects:d,over:u,measureDroppableContainers:f}=Cn(),h=Ke(jn,n),p=l.rect!==null,g=c.useMemo(()=>r.map(j=>typeof j=="object"&&"id"in j?j.id:j),[r]),R=i!=null,v=i?g.indexOf(i.id):-1,x=u?g.indexOf(u.id):-1,S=c.useRef(g),N=!Ho(g,S.current),m=x!==-1&&v===-1||N,w=_o(s);ee(()=>{N&&R&&f(g)},[N,g,R,f]),c.useEffect(()=>{S.current=g},[g]);const b=c.useMemo(()=>({activeIndex:v,containerId:h,disabled:w,disableTransforms:m,items:g,overIndex:x,useDragOverlay:p,sortedRects:Vo(g,d),strategy:o}),[v,h,w.draggable,w.droppable,m,g,x,d,p,o]);return O.createElement(kn.Provider,{value:b},t)}const ts=e=>{let{id:t,items:n,activeIndex:r,overIndex:o}=e;return Dn(n,r,o).indexOf(t)},ns=e=>{let{containerId:t,isSorting:n,wasDragging:r,index:o,items:s,newIndex:i,previousItems:l,previousContainerId:d,transition:u}=e;return!u||!r||l!==s&&o===i?!1:n?!0:i!==o&&t===d},rs={duration:200,easing:"ease"},En="transform",os=ve.Transition.toString({property:En,duration:0,easing:"linear"}),ss={roleDescription:"sortable"};function as(e){let{disabled:t,index:n,node:r,rect:o}=e;const[s,i]=c.useState(null),l=c.useRef(n);return ee(()=>{if(!t&&n!==l.current&&r.current){const d=o.current;if(d){const u=Ae(r.current,{ignoreTransform:!0}),f={x:d.left-u.left,y:d.top-u.top,scaleX:d.width/u.width,scaleY:d.height/u.height};(f.x||f.y)&&i(f)}}n!==l.current&&(l.current=n)},[t,n,r,o]),c.useEffect(()=>{s&&i(null)},[s]),s}function is(e){let{animateLayoutChanges:t=ns,attributes:n,disabled:r,data:o,getNewIndex:s=ts,id:i,strategy:l,resizeObserverConfig:d,transition:u=rs}=e;const{items:f,containerId:h,activeIndex:p,disabled:g,disableTransforms:R,sortedRects:v,overIndex:x,useDragOverlay:S,strategy:N}=c.useContext(kn),m=ls(r,g),w=f.indexOf(i),b=c.useMemo(()=>({sortable:{containerId:h,index:w,items:f},...o}),[h,o,w,f]),j=c.useMemo(()=>f.slice(f.indexOf(i)),[f,i]),{rect:C,node:D,isOver:I,setNodeRef:z}=Nn({id:i,data:b,disabled:m.droppable,resizeObserverConfig:{updateMeasurementsFor:j,...d}}),{active:A,activatorEvent:X,activeNodeRect:q,attributes:y,setNodeRef:k,listeners:B,isDragging:L,over:se,setActivatorNodeRef:H,transform:K}=Mo({id:i,data:b,attributes:{...ss,...n},disabled:m.draggable}),ce=gr(z,k),M=!!A,F=M&&!R&&_e(p)&&_e(x),xe=!S&&L,Te=xe&&F?K:null,Je=F?Te??(l??N)({rects:v,activeNodeRect:q,activeIndex:p,overIndex:x,index:w}):null,de=_e(p)&&_e(x)?s({id:i,items:f,activeIndex:p,overIndex:x}):w,ae=A?.id,T=c.useRef({activeId:ae,items:f,newIndex:de,containerId:h}),Ie=f!==T.current.items,ne=t({active:A,containerId:h,isDragging:L,isSorting:M,id:i,index:w,items:f,newIndex:T.current.newIndex,previousItems:T.current.items,previousContainerId:T.current.containerId,transition:u,wasDragging:T.current.activeId!=null}),ye=as({disabled:!ne,index:w,node:D,rect:C});return c.useEffect(()=>{M&&T.current.newIndex!==de&&(T.current.newIndex=de),h!==T.current.containerId&&(T.current.containerId=h),f!==T.current.items&&(T.current.items=f)},[M,de,h,f]),c.useEffect(()=>{if(ae===T.current.activeId)return;if(ae!=null&&T.current.activeId==null){T.current.activeId=ae;return}const we=setTimeout(()=>{T.current.activeId=ae},50);return()=>clearTimeout(we)},[ae]),{active:A,activeIndex:p,attributes:y,data:b,rect:C,index:w,newIndex:de,items:f,isOver:I,isSorting:M,isDragging:L,listeners:B,node:D,overIndex:x,over:se,setNodeRef:ce,setActivatorNodeRef:H,setDroppableNodeRef:z,setDraggableNodeRef:k,transform:ye??Je,transition:ie()};function ie(){if(ye||Ie&&T.current.newIndex===w)return os;if(!(xe&&!ct(X)||!u)&&(M||ne))return ve.Transition.toString({...u,property:En})}}function ls(e,t){var n,r;return typeof e=="boolean"?{draggable:e,droppable:!1}:{draggable:(n=e?.draggable)!=null?n:t.draggable,droppable:(r=e?.droppable)!=null?r:t.droppable}}E.Down,E.Right,E.Up,E.Left;const bt=[{date:"01-13",year:1887,text:"The Johannesburg Stock Exchange opens, just one year after gold was discovered on the Witwatersrand. The first listings are mining companies. Nobody is surprised."},{date:"02-04",year:1994,text:"The JSE opens to foreign investors for the first time as South Africa transitions toward democracy. The rand strengthens. History is made."},{date:"03-19",year:1961,text:"The Nairobi Stock Exchange is formally constituted. Kenya becomes one of the first African nations with an organized securities market."},{date:"04-27",year:1994,text:"South Africa holds its first democratic election. The JSE surges. Nelson Mandela will become President. The market understands what this means."},{date:"05-07",year:2001,text:"MTN lists on the JSE. The South African telco will go on to become the most valuable brand on the African continent. Subscribers: 2 million. Today: 280 million."},{date:"06-12",year:1989,text:"The Ghana Stock Exchange is established. It will go on to be one of the best-performing exchanges in the world in 2023. Ghana knows what it is doing."},{date:"07-02",year:1960,text:"The Lagos Stock Exchange — later renamed the Nigerian Exchange Group — begins operations in a borrowed conference room with 19 securities listed."},{date:"08-14",year:2007,text:"The Dangote Group, founded on ₦500,000 borrowed from Aliko Dangote's uncle in 1977, announces it will list Dangote Cement. Cement. The empire begins."},{date:"09-15",year:2008,text:"Lehman Brothers collapses. African markets feel the shockwave — though the JSE, NSE, and NGX had less exposure to subprime mortgages than their Western counterparts. One small mercy."},{date:"10-31",year:2017,text:"Naspers, the South African media giant, announces it will spin off its global internet assets. Its 31% stake in Tencent is worth more than the JSE's entire banking sector. This is a normal thing that happened."},{date:"11-17",year:1997,text:"The Uganda Securities Exchange is founded. The exchange will eventually modernize to fully electronic trading — making it one of Africa's most technologically advanced small exchanges."},{date:"12-09",year:1994,text:"The Lusaka Stock Exchange opens in Zambia with 7 listed companies. The original trading floor consists of a small room and considerable optimism."},{date:"01-22",year:2019,text:"Zimbabwe's ZSE is temporarily suspended by the government amid hyperinflation. When it reopens, stocks are priced in Zimbabwe dollars. Then USD. The accountants are tired."},{date:"02-19",year:2020,text:"COVID-19 begins reaching African shores. The JSE falls 8% in a single day — its worst single-day drop since the 2008 crisis. The continent braces."},{date:"03-23",year:2020,text:"The JSE halts trading as circuit breakers trigger during the COVID-19 crash. Every exchange on the continent is red. Zamani would have shown a lot of red that day."},{date:"04-20",year:2020,text:"WTI crude oil futures go negative for the first time in history — traders literally paying people to take oil. Nigeria's budget is based on $57/barrel. The math does not work."},{date:"05-26",year:2022,text:"The Africa Continental Free Trade Agreement (AfCFTA) begins to show early signs of cross-border capital flows increasing. Pan-African investing becomes less theoretical."},{date:"06-22",year:1998,text:"The BRVM (Bourse Régionale des Valeurs Mobilières) opens, serving 8 West African nations. A single exchange for the entire UEMOA zone. Ambitious. Impressively functional."},{date:"07-28",year:2022,text:"Ghana's GSE Composite Index has its best year on record in 2022, rising over 40% — making it the world's best-performing stock exchange that year. Jollof rice and equity returns."},{date:"08-30",year:2011,text:"Africa's combined stock market capitalisation passes $1 trillion for the first time. The continent's markets have grown 500% in 10 years. The world starts paying attention."},{date:"09-03",year:1954,text:"The Nairobi Securities Exchange traces its roots to this period, when trading in shares first began in Kenya under the East African Stock Exchange Committee."},{date:"10-17",year:2023,text:"The JSE celebrates 136 years of operation — making it not just Africa's oldest and largest exchange, but one of the 20 largest in the world by market capitalisation."},{date:"11-09",year:2011,text:"Equity Bank Kenya lists on the Uganda Securities Exchange via a cross-listing — one of the first examples of true pan-African equity integration. The borders are getting thinner."},{date:"12-31",year:2023,text:"The JSE All Share Index closes the year up 8.2%. In a year where South Africa dealt with load-shedding, political uncertainty, and a 10%+ inflation peak, investors take the win."}];function cs(){const e=new Date,t=`${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return bt.find(n=>n.date===t)??bt[e.getDate()%bt.length]}const ds=["surge","jump","gain","rise","record","profit","growth","strong","beat","higher","boost","rally","soar","climb","outperform","upgrade","buy"],us=["drop","fall","plunge","lose","decline","loss","weak","miss","lower","cut","recession","crash","sell-off","downgrade","warning","risk","concern"];function fs(e){const t=e.toLowerCase();return ds.some(n=>t.includes(n))?"pos":us.some(n=>t.includes(n))?"neg":null}function hs(e){const t=Date.now()-e,n=Math.floor(t/6e4);if(n<60)return`${n}m`;const r=Math.floor(n/60);return r<24?`${r}h`:`${Math.floor(r/24)}d`}function gs({items:e}){return a.jsxs("div",{className:"panel news-feed",children:[e.map(t=>{const n=fs(t.headline);return a.jsxs("a",{className:"news-item",href:t.url,target:"_blank",rel:"noopener",children:[a.jsxs("div",{className:"news-meta",children:[a.jsx("span",{className:"news-source",children:t.source}),t.exchange&&a.jsx("span",{className:"news-tag",children:t.exchange}),n==="pos"&&a.jsx("span",{className:"news-sent pos",children:"▲"}),n==="neg"&&a.jsx("span",{className:"news-sent neg",children:"▼"}),a.jsx("span",{className:"news-time",children:hs(t.publishedAt)})]}),a.jsx("div",{className:"news-headline",children:t.headline})]},t.id)}),a.jsx("style",{children:`
        .news-feed { overflow: hidden; }
        .news-item {
          display: block;
          padding: 0.625rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
          text-decoration: none;
          transition: background 0.1s;
        }
        .news-item:last-child { border-bottom: none; }
        .news-item:hover { background: var(--color-bg-hover); }

        .news-meta {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.25rem;
        }
        .news-source {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600;
        }
        .news-tag {
          font-size: 9px; padding: 1px 4px; border-radius: 3px;
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-weight: 600; letter-spacing: 0.04em;
        }
        .news-sent {
          font-size: 9px; font-weight: 800;
        }
        .news-sent.pos { color: var(--color-up); }
        .news-sent.neg { color: var(--color-down); }
        .news-time {
          margin-left: auto; font-size: 10px; color: var(--color-text-muted);
          font-family: var(--font-mono);
        }
        .news-headline {
          font-size: 12px; color: var(--color-text-secondary); line-height: 1.45;
        }
        .news-item:hover .news-headline { color: var(--color-text-primary); }
      `})]})}const ms=new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});function ps(e){return e>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(e):ms.format(e)}function vs({items:e}){return a.jsxs("div",{className:"comm-table",children:[e.map(t=>a.jsxs("div",{className:"comm-row",children:[a.jsx("div",{className:"comm-name",children:t.name}),a.jsxs("div",{className:"comm-unit",children:["/",t.unit]}),a.jsxs("div",{className:"comm-price",children:["$",ps(t.price)]}),a.jsxs("div",{className:`comm-chg ${t.changePct>=0?"up":"down"}`,children:[t.changePct>=0?"+":"",t.changePct.toFixed(2),"%"]})]},t.id)),a.jsx("style",{children:`
        .comm-table {
          display: flex;
          flex-direction: column;
        }

        .comm-row {
          display: grid;
          grid-template-columns: 1fr auto auto auto;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .comm-row:last-child { border-bottom: none; }

        .comm-name {
          font-size: 12px;
          color: var(--color-text-primary);
          font-weight: 500;
        }
        .comm-unit {
          font-size: 10px;
          color: var(--color-text-muted);
          text-align: right;
        }
        .comm-price {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--color-text-secondary);
          text-align: right;
          min-width: 60px;
        }
        .comm-chg {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          text-align: right;
          min-width: 52px;
        }
        .comm-chg.up   { color: var(--color-up); }
        .comm-chg.down { color: var(--color-down); }
      `})]})}function xs(){const{lists:e,activeId:t,symbols:n,add:r,remove:o,createList:s,setActive:i}=Pn(),[l,d]=c.useState(!1),[u,f]=c.useState(""),[h,p]=c.useState(""),[g,R]=c.useState(!1),v=$t({queries:n.map(m=>({queryKey:["quote",m],queryFn:()=>Re.getQuote(m),staleTime:6e4,refetchInterval:6e4}))}),x=$t({queries:n.map(m=>({queryKey:["history",m,30],queryFn:()=>Re.getHistory(m,30),staleTime:5*6e4}))});function S(m){m.preventDefault();const w=u.trim().toUpperCase();w&&(r(w),f(""),d(!1))}function N(m){m.preventDefault();const w=h.trim();w&&(s(w),p(""),R(!1))}return a.jsxs("div",{className:"wl-panel",children:[e.length>1&&a.jsx("div",{className:"wl-tabs",children:e.map(m=>a.jsx("button",{className:`wl-tab ${m.id===t?"active":""}`,onClick:()=>i(m.id),title:m.name,children:m.name},m.id))}),a.jsxs("div",{className:"wl-list",children:[n.length===0&&a.jsx("div",{className:"wl-empty",children:"No symbols — add one below"}),n.map((m,w)=>{const b=v[w]?.data,j=x[w]?.data,C=(b?.changePct??0)>=0,D=j?.map(I=>I.close)??[];return a.jsxs("div",{className:"wl-row",children:[a.jsx(Bn,{size:10,className:"wl-star"}),a.jsxs("div",{className:"wl-sym-col",children:[a.jsx("span",{className:"wl-sym",children:m}),b?.exchange&&a.jsx("span",{className:"wl-exch",children:b.exchange})]}),D.length>=5&&a.jsx("div",{className:"wl-spark",children:a.jsx(_n,{data:D,up:C,height:24,width:56})}),a.jsx("div",{className:"wl-price-col",children:b?a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"wl-price",children:b.price.toFixed(2)}),a.jsxs("span",{className:`wl-chg ${C?"up":"down"}`,children:[C?"+":"",b.changePct.toFixed(2),"%"]})]}):a.jsx("span",{className:"wl-loading",children:"—"})}),a.jsx("button",{className:"wl-remove",onClick:()=>o(m),title:`Remove ${m}`,"aria-label":`Remove ${m}`,children:a.jsx($n,{size:10})})]},m)})]}),l?a.jsxs("form",{className:"wl-add-form",onSubmit:S,children:[a.jsx("input",{className:"wl-input",value:u,onChange:m=>f(m.target.value),placeholder:"e.g. SCOM.NR",autoFocus:!0}),a.jsx("button",{type:"submit",className:"wl-add-btn",children:"Add"}),a.jsx("button",{type:"button",className:"wl-cancel-btn",onClick:()=>d(!1),children:"✕"})]}):a.jsxs("div",{className:"wl-footer",children:[a.jsxs("button",{className:"wl-add-trigger",onClick:()=>d(!0),children:[a.jsx(Gt,{size:10})," Add symbol"]}),g?a.jsxs("form",{className:"wl-newlist-form",onSubmit:N,children:[a.jsx("input",{className:"wl-input",value:h,onChange:m=>p(m.target.value),placeholder:"List name",autoFocus:!0,style:{width:80}}),a.jsx("button",{type:"submit",className:"wl-add-btn",children:"OK"}),a.jsx("button",{type:"button",className:"wl-cancel-btn",onClick:()=>R(!1),children:"✕"})]}):a.jsxs("button",{className:"wl-list-trigger",onClick:()=>R(!0),title:"New watchlist",children:[a.jsx(Gt,{size:9})," List"]})]}),a.jsx("style",{children:`
        .wl-panel { display: flex; flex-direction: column; gap: 0.5rem; }

        .wl-tabs { display: flex; gap: 2px; flex-wrap: wrap; }
        .wl-tab {
          padding: 2px 7px; font-size: 9px; font-weight: 600;
          border: 1px solid var(--color-border); border-radius: 3px;
          background: none; color: var(--color-text-muted); cursor: pointer;
          transition: all 0.1s; white-space: nowrap;
        }
        .wl-tab:hover  { color: var(--color-text-secondary); }
        .wl-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        .wl-list  { display: flex; flex-direction: column; }

        .wl-empty {
          font-size: 11px;
          color: var(--color-text-muted);
          padding: 0.5rem 0;
          font-style: italic;
        }

        .wl-row {
          display: grid;
          grid-template-columns: 10px 1fr 56px auto 14px;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .wl-row:last-child { border-bottom: none; }
        .wl-row:hover .wl-remove { opacity: 1; }

        .wl-star { color: var(--color-gold); flex-shrink: 0; }

        .wl-sym-col { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .wl-sym {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .wl-exch {
          font-size: 9px;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }

        .wl-spark { display: flex; align-items: center; opacity: 0.85; }

        .wl-price-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1px;
        }
        .wl-price {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-text-secondary);
        }
        .wl-chg {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
        }
        .wl-chg.up   { color: var(--color-up); }
        .wl-chg.down { color: var(--color-down); }
        .wl-loading  { font-size: 11px; color: var(--color-text-muted); }

        .wl-remove {
          opacity: 0;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-muted);
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.15s, opacity 0.15s;
        }
        .wl-remove:hover { color: var(--color-down); }

        .wl-footer { display: flex; gap: 0.35rem; align-items: center; }

        .wl-add-trigger {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: none;
          border: 1px dashed var(--color-border-subtle);
          color: var(--color-text-muted);
          font-size: 11px;
          padding: 0.35rem 0.6rem;
          border-radius: 3px;
          cursor: pointer;
          flex: 1;
          justify-content: center;
          transition: color 0.15s, border-color 0.15s;
        }
        .wl-add-trigger:hover {
          color: var(--color-gold);
          border-color: var(--color-gold);
        }
        .wl-list-trigger {
          display: flex; align-items: center; gap: 2px;
          background: none; border: 1px dashed var(--color-border-subtle);
          color: var(--color-text-muted); font-size: 9px;
          padding: 0.35rem 0.4rem; border-radius: 3px; cursor: pointer;
          transition: color 0.15s, border-color 0.15s; flex-shrink: 0;
          white-space: nowrap;
        }
        .wl-list-trigger:hover { color: var(--color-gold); border-color: var(--color-gold); }

        .wl-add-form, .wl-newlist-form {
          display: flex;
          gap: 0.35rem;
          align-items: center;
        }
        .wl-input {
          flex: 1;
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 0.3rem 0.5rem;
          border-radius: 3px;
          outline: none;
        }
        .wl-input:focus { border-color: var(--color-gold); }
        .wl-add-btn, .wl-cancel-btn {
          background: none;
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          font-size: 11px;
          padding: 0.3rem 0.5rem;
          border-radius: 3px;
          cursor: pointer;
          white-space: nowrap;
        }
        .wl-add-btn:hover    { border-color: var(--color-gold); color: var(--color-gold); }
        .wl-cancel-btn:hover { border-color: var(--color-down); color: var(--color-down); }
      `})]})}function bs(e){return e.id==="us10y"?e.value.toFixed(2)+"%":e.id==="vix"||e.id==="dxy"?e.value.toFixed(2):e.value>=1e4?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(e.value):e.value>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:1}).format(e.value):e.value.toFixed(2)}function ys({m:e}){const t=e.id==="vix"?e.changePct<=0:e.changePct>=0,n=e.changePct>=0?"+":"";return a.jsxs("div",{className:"gm-item",children:[a.jsx("span",{className:"gm-name",children:e.name}),a.jsx("span",{className:"gm-value",children:bs(e)}),a.jsxs("span",{className:`gm-pct ${t?"up":"down"}`,children:[n,e.changePct.toFixed(2),"%"]})]})}function ws(){const{data:e}=be({queryKey:["global-markets"],queryFn:Gn,staleTime:6e4,refetchInterval:6e4});return e?.length?a.jsxs("div",{className:"gm-bar",children:[a.jsx("div",{className:"gm-label",children:"GLOBAL"}),a.jsx("div",{className:"gm-scroll",children:e.map(t=>a.jsx(ys,{m:t},t.id))}),a.jsx("style",{children:`
        .gm-bar {
          display: flex;
          align-items: stretch;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px;
          overflow-x: auto;
          scrollbar-width: none;
          flex-shrink: 0;
        }
        .gm-bar::-webkit-scrollbar { display: none; }

        .gm-label {
          flex-shrink: 0;
          padding: 0 0.75rem;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--color-text-muted);
          border-right: 1px solid var(--color-border-subtle);
          display: flex; align-items: center;
          background: var(--color-bg-tertiary);
        }

        .gm-scroll {
          display: flex;
          align-items: stretch;
          flex: 1;
          min-width: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .gm-scroll::-webkit-scrollbar { display: none; }

        .gm-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          border-right: 1px solid var(--color-border-subtle);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .gm-item:last-child { border-right: none; }

        .gm-name {
          font-size: 10px;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .gm-value {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-primary);
        }
        .gm-pct {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
        }
        .gm-pct.up   { color: var(--color-up); }
        .gm-pct.down { color: var(--color-down); }
      `})]}):null}function Ss({active:e,payload:t}){if(!e||!t?.length)return null;const n=t[0]?.payload;return n?a.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"6px 10px",fontSize:11,fontFamily:"var(--font-mono)"},children:[a.jsx("div",{style:{color:"var(--color-text-muted)",marginBottom:2},children:n.label}),a.jsxs("div",{style:{color:"var(--color-gold)",fontWeight:700},children:[n.yield.toFixed(3),"%"]})]}):null}function Cs(){const{data:e,isLoading:t}=be({queryKey:["yield-curve"],queryFn:Wn,staleTime:36e5,refetchInterval:36e5});if(t)return a.jsx("div",{style:{height:120,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--color-text-muted)"},children:"Loading yield curve…"});if(!e?.length)return a.jsx("div",{style:{height:60,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--color-text-muted)",fontStyle:"italic"},children:"Yield curve data unavailable"});const n=Math.max(0,Math.min(...e.map(s=>s.yield))-.2),r=Math.max(...e.map(s=>s.yield))+.2,o=e.some((s,i)=>i>0&&s.yield<e[i-1].yield);return a.jsxs("div",{className:"yc-panel",children:[a.jsxs("div",{className:"yc-header",children:[a.jsx("span",{className:"yc-title",children:"US Yield Curve"}),o&&a.jsx("span",{className:"yc-inverted",children:"⚠ Inverted"}),a.jsx("div",{className:"yc-values",children:e.map(s=>a.jsxs("span",{className:"yc-tick",children:[a.jsx("span",{className:"yc-mat",children:s.maturity}),a.jsxs("span",{className:"yc-yield",children:[s.yield.toFixed(2),"%"]})]},s.maturity))})]}),a.jsx(Zn,{width:"100%",height:90,children:a.jsxs(Qn,{data:e,margin:{top:4,right:4,bottom:0,left:0},children:[a.jsx(er,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),a.jsx(tr,{dataKey:"maturity",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"}}),a.jsx(nr,{domain:[n,r],tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:32,orientation:"right",tickFormatter:s=>`${s.toFixed(1)}%`}),a.jsx(rr,{content:a.jsx(Ss,{})}),a.jsx(or,{type:"monotone",dataKey:"yield",stroke:o?"var(--color-down)":"var(--color-gold)",strokeWidth:2,dot:{fill:"var(--color-gold)",r:3},isAnimationActive:!1})]})}),a.jsx("style",{children:`
        .yc-panel { display: flex; flex-direction: column; gap: 0.25rem; }
        .yc-header { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .yc-title {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600;
        }
        .yc-inverted {
          font-size: 10px; font-weight: 700; color: var(--color-down);
          padding: 1px 5px; border-radius: 3px; background: var(--color-down-subtle);
        }
        .yc-values { display: flex; gap: 0.5rem; margin-left: auto; flex-wrap: wrap; }
        .yc-tick { display: flex; flex-direction: column; align-items: center; gap: 1px; }
        .yc-mat  { font-size: 9px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .yc-yield { font-size: 10px; color: var(--color-gold); font-family: var(--font-mono); font-weight: 600; }
      `})]})}const tn=[["movers","watchlist"],["forex","commodities","yield-curve"],["live-tv","news","on-this-day"]],Ns=sr()(Yn(e=>({columns:tn,setColumns(t){e({columns:t})},resetLayout(){e({columns:tn})}}),{name:"zamani-dash-layout"})),Nt={movers:"Top Movers",watchlist:"Watchlist",forex:"Forex Rates",commodities:"Commodities","yield-curve":"Yield Curve","live-tv":"Live Business TV",news:"Latest News","on-this-day":"On This Day"};function Ds({id:e,children:t}){const{attributes:n,listeners:r,setNodeRef:o,transform:s,transition:i,isDragging:l}=is({id:e}),d={transform:ve.Transform.toString(s),transition:i,opacity:l?.4:1,position:"relative"};return a.jsxs("section",{ref:o,style:d,className:"dash-section sortable-panel",children:[a.jsxs("div",{className:"section-label-row",children:[a.jsx("span",{className:"section-label",children:Nt[e]}),a.jsx("button",{className:"drag-handle",...r,...n,"aria-label":`Drag ${Nt[e]}`,tabIndex:-1,children:a.jsx(nn,{size:12})})]}),t]})}function Rs({colId:e,panels:t,children:n}){const{setNodeRef:r}=Nn({id:e});return a.jsx(es,{id:e,items:t,strategy:Zo,children:a.jsx("div",{ref:r,className:"dash-col",children:n})})}function Ps(){const[e,t]=c.useState(!0),{columns:n,setColumns:r,resetLayout:o}=Ns(),[s,i]=c.useState(null),[l,d]=c.useState(null),u=c.useRef(null);function f(y){u.current=y,d(y)}const h=l??n,p=Er(kr(At,{activationConstraint:{distance:6}})),{data:g,isLoading:R}=be({queryKey:["indices","all"],queryFn:()=>Re.getIndices?.("all")??Promise.resolve([]),staleTime:6e4}),{data:v,isLoading:x}=be({queryKey:["forex","major"],queryFn:()=>qn(),staleTime:6e4}),{data:S,isLoading:N}=be({queryKey:["news","dashboard"],queryFn:()=>Re.getNews?.("africa")??Promise.resolve([]),staleTime:5*6e4}),{data:m,isLoading:w}=be({queryKey:["commodities"],queryFn:()=>Re.getCommodities?.()??Promise.resolve([]),staleTime:6e4}),{data:b,isLoading:j}=be({queryKey:["movers","all"],queryFn:()=>Re.getTopMovers?.("all")??Promise.resolve({gainers:[],losers:[]}),staleTime:6e4}),C=g?.filter(y=>y.changePct>=0).length??0,D=(g?.length??0)-C,I=c.useCallback(y=>{switch(y){case"movers":return j?a.jsx(Pe,{height:180}):(b?.gainers.length??0)+(b?.losers.length??0)>0?a.jsx(Kn,{gainers:b?.gainers??[],losers:b?.losers??[]}):a.jsx(yt,{message:"Movers data not available"});case"watchlist":return a.jsx(xs,{});case"forex":return x?a.jsx(Pe,{height:180}):a.jsx(Vn,{rates:v??[]});case"commodities":return w?a.jsx(Pe,{height:200}):(m?.length??0)>0?a.jsx(vs,{items:m??[]}):a.jsx(yt,{message:"Commodity data unavailable"});case"yield-curve":return a.jsx("div",{className:"panel",style:{padding:"0.75rem"},children:a.jsx(Cs,{})});case"live-tv":return a.jsx(Hn,{});case"news":return N?a.jsx(Pe,{height:200}):(S?.length??0)>0?a.jsx(gs,{items:S??[]}):a.jsx(yt,{message:"Live news feed not yet connected"});case"on-this-day":{const k=cs();return k?a.jsxs("div",{className:"panel otd-panel",children:[a.jsx("div",{className:"otd-year",children:k.year}),a.jsx("p",{className:"otd-text",children:k.text})]}):null}}},[b,j,v,x,m,w,S,N]);function z({active:y}){i(y.id);const k=n.map(B=>[...B]);f(k)}function A({active:y,over:k}){if(!k)return;const B=u.current;if(!B)return;const L=y.id,se=k.id,H=["col-0","col-1","col-2"].includes(se),K=H?parseInt(se.slice(4)):B.findIndex(F=>F.includes(se));if(K<0)return;const ce=B.findIndex(F=>F.includes(L));if(ce<0)return;const M=B.map(F=>[...F]);if(M[ce]=M[ce].filter(F=>F!==L),H)M[K]=[...M[K],L];else{const F=M[K].indexOf(se);F<0?M[K]=[...M[K],L]:M[K].splice(F,0,L)}f(M)}function X({over:y}){const k=u.current;y&&k&&r(k),i(null),f(null)}function q(){i(null),f(null)}return a.jsxs("div",{className:"dashboard",children:[a.jsx("div",{className:"dash-header",children:a.jsxs("div",{className:"dash-title-row",children:[a.jsxs("div",{children:[a.jsx("h1",{className:"dash-title",children:"African Markets"}),a.jsx("p",{className:"dash-subtitle",children:new Intl.DateTimeFormat("en-ZA",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(new Date)})]}),!R&&a.jsxs("div",{className:"dash-sentiment",children:[a.jsxs("span",{className:"sentiment-item up",children:[a.jsx(Xn,{size:13})," ",C," up"]}),a.jsxs("span",{className:"sentiment-item down",children:[a.jsx(ar,{size:13})," ",D," down"]})]}),a.jsxs("button",{className:"dash-reset-btn",onClick:o,title:"Reset dashboard layout",children:[a.jsx(hr,{size:11})," Reset layout"]}),a.jsx(Un,{width:80,height:80,opacity:.08,style:{position:"absolute",right:0,top:0}})]})}),a.jsx(ws,{}),a.jsxs("section",{className:"dash-section",children:[a.jsx("div",{className:"section-label",children:"Indices"}),R?a.jsx(js,{count:5}):a.jsx("div",{className:"idx-strip",children:g?.map(y=>a.jsx(Jn,{index:y},y.id))})]}),a.jsxs(Ao,{sensors:p,collisionDetection:zr,onDragStart:z,onDragOver:A,onDragEnd:X,onDragCancel:q,children:[a.jsx("div",{className:"dash-grid-3",children:h.map((y,k)=>a.jsx(Rs,{colId:`col-${k}`,panels:y,children:y.map(B=>a.jsx(Ds,{id:B,children:I(B)},B))},`col-${k}`))}),a.jsx(Jo,{children:s&&a.jsx("div",{className:"drag-ghost panel",children:a.jsxs("div",{className:"section-label-row",children:[a.jsx("span",{className:"section-label",children:Nt[s]}),a.jsx(nn,{size:12,style:{color:"var(--color-gold)",opacity:.6}})]})})})]}),a.jsxs("div",{className:"cheat-wrap panel",children:[a.jsxs("button",{className:"cheat-toggle",onClick:()=>t(y=>!y),children:[a.jsx("span",{className:"cheat-toggle-label",children:"Quick Reference — Keyboard Shortcuts & Features"}),e?a.jsx(dr,{size:12}):a.jsx(lr,{size:12})]}),e&&a.jsxs("div",{className:"cheat-body",children:[a.jsxs("div",{className:"cheat-col",children:[a.jsx("div",{className:"cheat-section-title",children:"Navigation (G + key)"}),[["G D","Dashboard"],["G J","JSE Exchange"],["G U","USE Exchange"],["G N","NGX Exchange"],["G F","Forex rates"],["G W","Watchlist"],["G P","Portfolio"],["G A","Alerts"],["G S","Screener"],["G I","Macro indicators"],["G M","Monitor mode"],["G X","Beat the Index"],["?","Show all shortcuts"]].map(([y,k])=>a.jsxs("div",{className:"cheat-row",children:[a.jsx("kbd",{className:"cheat-key",children:y}),a.jsx("span",{className:"cheat-desc",children:k})]},y))]}),a.jsxs("div",{className:"cheat-col",children:[a.jsx("div",{className:"cheat-section-title",children:"Chart Indicators"}),[["MA20 / MA50","20 & 50-day moving averages"],["BB","Bollinger Bands (20-period)"],["VWAP","Volume-weighted average price"],["RSI","Relative Strength Index (14)"],["MACD","Momentum oscillator (12/26/9)"],["LR","Linear regression trendline"],["FIB","Fibonacci retracement levels"],["PAT","Candlestick pattern detection"],["1D~","Simulated intraday view"]].map(([y,k])=>a.jsxs("div",{className:"cheat-row",children:[a.jsx("kbd",{className:"cheat-key",children:y}),a.jsx("span",{className:"cheat-desc",children:k})]},y))]}),a.jsxs("div",{className:"cheat-col",children:[a.jsx("div",{className:"cheat-section-title",children:"Live Data Sources"}),[["✅","JSE stocks — Yahoo Finance (.JO)"],["✅","USE stocks — use.or.ug live feed"],["✅","Commodities — Yahoo futures (GC=F, CL=F…)"],["✅","Forex — open.er-api.com (9 pairs)"],["✅","Macro — World Bank Open Data"],["✅","News — Google News RSS"],["✅","Yield curve — Yahoo (^IRX, ^TNX…)"],["⚠","NGX / NSE / GSE — no free source yet"]].map(([y,k])=>a.jsxs("div",{className:"cheat-row cheat-row--data",children:[a.jsx("span",{className:"cheat-icon",children:y}),a.jsx("span",{className:"cheat-desc",children:k})]},k))]}),a.jsxs("div",{className:"cheat-col",children:[a.jsx("div",{className:"cheat-section-title",children:"Features"}),[["Screener","Filter & rank stocks across exchanges"],["Compare","Normalized chart + correlation matrix"],["Portfolio","P&L, allocation donut, risk metrics"],["Monitor","Full-screen watchlist grid"],["Alerts","Price & % change triggers"],["Yield Curve","US Treasuries inversion detection"],["Beat Index","Pick stocks vs JSE Top 40"],["Macro","World Bank GDP, CPI, unemployment"],["Export","CSV download on Exchange + Portfolio"],["Drag panels","Rearrange dashboard via drag handles"]].map(([y,k])=>a.jsxs("div",{className:"cheat-row",children:[a.jsx("span",{className:"cheat-feat",children:y}),a.jsx("span",{className:"cheat-desc",children:k})]},y))]}),a.jsxs("div",{className:"cheat-eggs",children:[a.jsx("div",{className:"cheat-eggs-label",children:"🥚 Secret Codes"}),a.jsx("div",{className:"cheat-eggs-row",children:[{trigger:"↑↑↓↓←→←→BA",reveal:null,name:"Bloomberg Beast Mode",desc:"Konami code — activates a 30-day Bloomberg Terminal trial (fake)"},{trigger:"G O",reveal:null,name:"Oracle of Lagos",desc:"Summons the keeper of African market wisdom for a prophecy"},{trigger:"G B",reveal:null,name:"The Great Jollof War",desc:"Nigeria vs Ghana — the eternal rice debate, settled by markets"},{trigger:"G L",reveal:null,name:"SIMBA!",desc:"Also fires automatically when a stock hits its 52-week high"},{trigger:"[???]",reveal:"G T",name:"Merchant of the Savanna",desc:"A Dope Wars–style commodity trading game across 6 African cities"},{trigger:"[???]",reveal:"G Z",name:"What Would Dangote Do?",desc:"Wisdom from Africa's richest person, delivered with authority"},{trigger:"[???]",reveal:"G H",name:"Hakuna Matata",desc:"Also fires automatically when your portfolio is down more than 5%"},{trigger:"[???]",reveal:"G R",name:"Circle of Life",desc:"Also fires automatically when your portfolio hits a new all-time high"}].map(({trigger:y,reveal:k,name:B,desc:L})=>a.jsxs("div",{className:"cheat-egg-item",children:[a.jsxs("kbd",{className:"cheat-egg-key","data-reveal":k??void 0,style:k?{cursor:"help",position:"relative"}:void 0,children:[y,k&&a.jsx("span",{className:"cheat-egg-tooltip",children:k})]}),a.jsxs("div",{className:"cheat-egg-body",children:[a.jsx("span",{className:"cheat-egg-name",children:B}),a.jsx("span",{className:"cheat-egg-desc",children:L})]})]},B))})]})]})]}),a.jsx("style",{children:`
        .dashboard { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1400px; }

        .dash-header {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px;
          padding: 1rem 1.25rem;
          position: relative;
          overflow: hidden;
        }
        .dash-title-row { display: flex; align-items: center; gap: 1.5rem; }
        .dash-title     { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
        .dash-subtitle  { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .dash-sentiment {
          display: flex; gap: 0.75rem;
          padding-right: 1rem;
        }
        .sentiment-item {
          display: flex; align-items: center; gap: 0.25rem;
          font-size: 12px; font-family: var(--font-mono);
        }
        .sentiment-item.up   { color: var(--color-up); }
        .sentiment-item.down { color: var(--color-down); }

        .dash-reset-btn {
          display: flex; align-items: center; gap: 4px;
          margin-left: auto;
          background: none; border: 1px solid var(--color-border);
          border-radius: 3px; padding: 3px 8px;
          font-size: 9px; font-weight: 600; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.15s; letter-spacing: 0.03em;
          text-transform: uppercase; white-space: nowrap;
        }
        .dash-reset-btn:hover { color: var(--color-text-primary); border-color: var(--color-text-muted); }

        .dash-section   { display: flex; flex-direction: column; gap: 0.5rem; }
        .section-label  {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600;
        }

        /* Drag handle row */
        .section-label-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 0.5rem;
        }
        .drag-handle {
          background: none; border: none; cursor: grab; padding: 2px 3px;
          color: var(--color-text-muted); border-radius: 3px;
          display: flex; align-items: center; opacity: 0;
          transition: opacity 0.15s, color 0.15s, background 0.15s;
          flex-shrink: 0;
        }
        .drag-handle:active { cursor: grabbing; }
        .sortable-panel:hover .drag-handle { opacity: 1; }
        .drag-handle:hover { color: var(--color-gold); background: var(--color-gold-subtle); opacity: 1; }

        /* Ghost overlay during drag */
        .drag-ghost {
          padding: 0.75rem 1rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          opacity: 0.9;
          cursor: grabbing;
        }

        .idx-strip {
          display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 0.25rem;
        }
        .idx-strip > * { flex-shrink: 0; width: 160px; }

        /* 3-column main grid */
        .dash-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1.2fr;
          gap: 1.5rem;
          align-items: start;
        }

        .dash-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          min-height: 80px;
        }

        @media (max-width: 1100px) {
          .dash-grid-3 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 700px) {
          .dash-grid-3 { grid-template-columns: 1fr; gap: 1rem; }
          .dash-title     { font-size: 16px; }
          .dash-subtitle  { display: none; }
          .dash-sentiment { gap: 0.5rem; }
          .dashboard      { gap: 1rem; }
        }

        /* ── Cheat sheet ── */
        .cheat-wrap { overflow: hidden; }
        .cheat-toggle {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 0.625rem 0.875rem;
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.06em;
          transition: color 0.15s; gap: 0.5rem;
        }
        .cheat-toggle:hover { color: var(--color-text-primary); }
        .cheat-toggle-label { flex: 1; text-align: left; }
        .cheat-body {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem; padding: 0.75rem 0.875rem 1rem;
          border-top: 1px solid var(--color-border-subtle);
        }
        @media (max-width: 1100px) { .cheat-body { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .cheat-body { grid-template-columns: 1fr; } }
        .cheat-section-title {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-gold); font-weight: 700; margin-bottom: 0.5rem;
        }
        .cheat-row {
          display: flex; align-items: baseline; gap: 0.5rem;
          margin-bottom: 4px; font-size: 11px;
        }
        .cheat-row--data { align-items: center; }
        .cheat-key {
          font-family: var(--font-mono); font-size: 9px; font-weight: 700;
          color: var(--color-gold); background: var(--color-gold-subtle);
          border: 1px solid var(--color-gold-dim); border-radius: 3px;
          padding: 1px 5px; white-space: nowrap; flex-shrink: 0; min-width: 40px;
          text-align: center;
        }
        .cheat-feat {
          font-family: var(--font-mono); font-size: 9px; font-weight: 700;
          color: var(--color-text-secondary); white-space: nowrap; flex-shrink: 0;
          min-width: 72px;
        }
        .cheat-icon { font-size: 11px; flex-shrink: 0; width: 16px; }
        .cheat-desc { color: var(--color-text-muted); font-size: 10px; line-height: 1.3; }

        /* Easter eggs row */
        .cheat-eggs {
          grid-column: 1 / -1;
          border-top: 1px solid var(--color-border-subtle);
          padding-top: 0.75rem; margin-top: 0.25rem;
        }
        .cheat-eggs-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-gold); font-weight: 700; margin-bottom: 0.5rem;
        }
        .cheat-eggs-row {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem;
        }
        .cheat-egg-item {
          display: flex; align-items: flex-start; gap: 0.5rem;
          background: var(--color-gold-subtle);
          border: 1px solid var(--color-gold-dim);
          border-radius: 4px; padding: 0.5rem 0.625rem;
        }
        .cheat-egg-key {
          font-family: var(--font-mono); font-size: 8px; font-weight: 700;
          color: var(--color-gold); white-space: nowrap; flex-shrink: 0;
          padding-top: 1px;
        }
        .cheat-egg-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .cheat-egg-name { font-size: 10px; font-weight: 700; color: var(--color-text-secondary); }
        .cheat-egg-desc { font-size: 9px; color: var(--color-text-muted); line-height: 1.4; }
        .cheat-egg-tooltip {
          display: none; position: absolute; bottom: calc(100% + 4px); left: 50%;
          transform: translateX(-50%);
          background: var(--color-bg-primary); border: 1px solid var(--color-gold);
          color: var(--color-gold); font-size: 9px; font-weight: 700;
          padding: 2px 7px; border-radius: 3px; white-space: nowrap;
          pointer-events: none; z-index: 10;
        }
        .cheat-egg-key:hover .cheat-egg-tooltip { display: block; }

        /* On This Day */
        .otd-panel { padding: 0.875rem 1rem; }
        .otd-year {
          font-family: var(--font-mono); font-size: 28px; font-weight: 900;
          color: var(--color-gold); opacity: 0.4; line-height: 1; margin-bottom: 0.375rem;
        }
        .otd-text {
          margin: 0; font-size: 12px; color: var(--color-text-secondary);
          line-height: 1.6;
        }
      `})]})}function yt({message:e}){return a.jsx("div",{style:{padding:"1.25rem 0.75rem",fontSize:"11px",color:"var(--color-text-muted)",textAlign:"center",border:"1px dashed var(--color-border)",borderRadius:4},children:e})}function js({count:e}){return a.jsx("div",{style:{display:"flex",gap:"0.75rem"},children:Array.from({length:e}).map((t,n)=>a.jsx(Pe,{width:160,height:110},n))})}function Pe({width:e,height:t}){return a.jsx("div",{style:{width:e??"100%",height:t,background:"var(--color-bg-tertiary)",borderRadius:4,animation:"pulse 1.5s ease-in-out infinite"}})}export{Ps as default};
