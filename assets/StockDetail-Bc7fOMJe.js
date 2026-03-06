import{r as M,j as e,l as q,e as T,L as H}from"./vendor-9MAh3nQh.js";import{c as Y,u as G,E as X,T as Q,S as J,p as P}from"./index-BhwTJ1gr.js";import{D as Z}from"./download-BO9yvLvU.js";import{R as B,b as E,C as I,X as K,Y as W,T as V,B as U,a as L,c as $,A as ee,d as te}from"./recharts-DK6PfPlO.js";import{T as re}from"./trending-down-CQ2RJ6Bl.js";import"./store-DR-NtvzW.js";const oe=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],ae=Y("arrow-left",oe);function _(o){return new Date(o).toLocaleDateString("en-US",{month:"short",day:"numeric"})}function D(o,a){return`${a} ${o.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`}function O(o,a){return o.map((r,t)=>t<a-1?null:+(o.slice(t-a+1,t+1).reduce((m,c)=>m+c.close,0)/a).toFixed(2))}function se(o,a=20){const r=[],t=[];for(let u=0;u<o.length;u++){if(u<a-1){r.push(null),t.push(null);continue}const m=o.slice(u-a+1,u+1).map(x=>x.close),c=m.reduce((x,v)=>x+v,0)/a,n=Math.sqrt(m.reduce((x,v)=>x+(v-c)**2,0)/a);r.push(+(c+2*n).toFixed(2)),t.push(+(c-2*n).toFixed(2))}return{upper:r,lower:t}}function ne(o){let a=0,r=0;return o.map(t=>t.volume?(a+=(t.high+t.low+t.close)/3*t.volume,r+=t.volume,r>0?+(a/r).toFixed(2):null):null)}function le(o){const a=o.length,r=o.map(y=>y.close),t=a*(a-1)/2,u=a*(a-1)*(2*a-1)/6,m=r.reduce((y,b)=>y+b,0),c=r.reduce((y,b,k)=>y+k*b,0),n=a*u-t*t;if(n===0)return r;const x=(a*c-t*m)/n,v=(m-x*t)/a;return r.map((y,b)=>+(x*b+v).toFixed(2))}function ie(o,a){const r=o[a],t=Math.abs(r.close-r.open),u=r.high-r.low;if(u===0)return null;if(t/u<.1&&u>0)return"doji";const m=r.high-Math.max(r.open,r.close),c=Math.min(r.open,r.close)-r.low;if(c>2*t&&m<t*.5&&t>0)return"hammer";if(m>2*t&&c<t*.5&&t>0)return"shooting_star";if(a>0){const n=o[a-1],x=n.close<n.open,v=n.close>n.open;if(x&&r.close>r.open&&r.open<n.close&&r.close>n.open)return"bullish_engulfing";if(v&&r.close<r.open&&r.open>n.close&&r.close<n.open)return"bearish_engulfing"}return null}function ce(o){return o==="hammer"||o==="bullish_engulfing"}function de(o){switch(o){case"doji":return"D";case"hammer":return"H";case"shooting_star":return"SS";case"bullish_engulfing":return"BE";case"bearish_engulfing":return"BE";default:return""}}function me(o,a=14){const r=[];for(let t=0;t<o.length;t++){if(t<a){r.push(null);continue}let u=0,m=0;for(let n=t-a+1;n<=t;n++){const x=o[n].close-o[n-1].close;x>0?u+=x:m-=x}const c=m===0?100:+(100-100/(1+u/m)).toFixed(1);r.push(c)}return r}function ue({active:o,payload:a,currency:r="USD"}){if(!o||!a?.length)return null;const t=a[0]?.payload;return t?e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"0.5rem 0.75rem",fontSize:11,fontFamily:"var(--font-mono)"},children:[e.jsx("div",{style:{color:"var(--color-text-muted)",marginBottom:4},children:_(t.time)}),[["O",t.open],["H",t.high],["L",t.low],["C",t.close]].map(([u,m])=>{const c=u==="C",n=t.close>=t.open;return e.jsxs("div",{style:{display:"flex",gap:"1rem",justifyContent:"space-between",color:c?n?"var(--color-up)":"var(--color-down)":"var(--color-text-secondary)",fontWeight:c?700:400},children:[e.jsx("span",{children:u}),e.jsx("span",{children:D(m,r)})]},u)}),t.volume>0&&e.jsxs("div",{style:{color:"var(--color-text-muted)",marginTop:4,borderTop:"1px solid var(--color-border-subtle)",paddingTop:4},children:["Vol ",(t.volume/1e3).toFixed(0),"K"]}),t.ma20!=null&&e.jsxs("div",{style:{color:"#60a5fa",marginTop:2},children:["MA20 ",D(t.ma20,r)]}),t.ma50!=null&&e.jsxs("div",{style:{color:"#f59e0b",marginTop:2},children:["MA50 ",D(t.ma50,r)]}),t.rsi!=null&&e.jsxs("div",{style:{color:"#a78bfa",marginTop:2},children:["RSI  ",t.rsi.toFixed(1)]}),t.bbUpperAbs!=null&&t.bbLowerAbs!=null&&e.jsxs("div",{style:{color:"#06b6d4",marginTop:2},children:["BB ",t.bbLowerAbs.toFixed(2),"–",t.bbUpperAbs.toFixed(2)]}),t.vwapAbs!=null&&e.jsxs("div",{style:{color:"#8b5cf6",marginTop:2},children:["VWAP ",D(t.vwapAbs,r)]}),t.linregAbs!=null&&e.jsxs("div",{style:{color:"#fb923c",marginTop:2},children:["LinReg ",D(t.linregAbs,r)]}),t.patternLabel!=null&&e.jsxs("div",{style:{color:"var(--color-text-muted)",marginTop:2},children:["Pattern: ",t.patternLabel.replace(/_/g," ")]})]}):null}function pe({active:o,payload:a}){if(!o||!a?.length)return null;const r=a[0]?.value;if(r==null)return null;const t=r>=70?"var(--color-down)":r<=30?"var(--color-up)":"#a78bfa";return e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"4px 8px",fontSize:11,fontFamily:"var(--font-mono)",color:t},children:["RSI ",r.toFixed(1),r>=70?" OB":r<=30?" OS":""]})}function xe({data:o,height:a=240,currency:r="USD",indicators:t={},symbol:u="chart"}){const m=M.useRef(null);function c(){const l=m.current?.querySelector("svg");if(!l)return;const d=l.cloneNode(!0);d.setAttribute("style","background:#0a0a0a");const p=new XMLSerializer().serializeToString(d),g=new Image,i=new Blob([p],{type:"image/svg+xml"}),f=URL.createObjectURL(i);g.onload=()=>{const w=document.createElement("canvas");w.width=g.naturalWidth||l.clientWidth||800,w.height=g.naturalHeight||l.clientHeight||400;const S=w.getContext("2d");S.fillStyle="#0a0a0a",S.fillRect(0,0,w.width,w.height),S.drawImage(g,0,0),w.toBlob(R=>{if(!R)return;const C=document.createElement("a");C.href=URL.createObjectURL(R),C.download=`${u}-chart.png`,C.click()}),URL.revokeObjectURL(f)},g.src=f}if(!o.length)return e.jsx("div",{style:{height:a,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--color-text-muted)",fontSize:12},children:"No chart data"});const n=Math.min(...o.map(l=>l.low))*.999,x=Math.max(...o.map(l=>l.high))*1.001,v=x-n,y=t.ma20?O(o,20):[],b=t.ma50?O(o,50):[],k=t.rsi?me(o):[],N=t.bb?se(o):{upper:[],lower:[]},s=t.vwap?ne(o):[],j=t.linreg?le(o):[],A=t.rsi&&k.some(l=>l!=null),z=o.map((l,d)=>({...l,date:_(l.time),wickBase:l.low-n,wickRange:l.high-l.low,bodyBase:Math.min(l.open,l.close)-n,bodyRange:Math.abs(l.close-l.open)||.5,...t.ma20&&y[d]!=null?{ma20:y[d]-n,ma20abs:y[d]}:{},...t.ma50&&b[d]!=null?{ma50:b[d]-n,ma50abs:b[d]}:{},...A?{rsi:k[d]}:{},...t.bb&&N.upper[d]!=null?{bbUpper:N.upper[d]-n,bbLower:Math.max(0,N.lower[d]-n),bbUpperAbs:N.upper[d],bbLowerAbs:N.lower[d]}:{},...t.vwap&&s[d]!=null?{vwap:s[d]-n,vwapAbs:s[d]}:{},...t.linreg?{linreg:j[d]-n,linregAbs:j[d]}:{},...t.patterns?(()=>{const p=ie(o,d);if(!p)return{};const g=ce(p);return{patternPrice:g?l.low-n-v*.03:l.high-n+v*.03,patternLabel:p,patternBull:g}})():{}})),F=A?a-80:a;return e.jsxs("div",{ref:m,children:[e.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:2},children:e.jsxs("button",{onClick:c,style:{background:"none",border:"none",cursor:"pointer",padding:"2px 4px",color:"var(--color-text-muted)",display:"flex",alignItems:"center",gap:3,fontSize:10,borderRadius:3,transition:"color 0.1s"},title:"Download chart as PNG",onMouseEnter:l=>l.currentTarget.style.color="var(--color-text-primary)",onMouseLeave:l=>l.currentTarget.style.color="var(--color-text-muted)",children:[e.jsx(Z,{size:10})," PNG"]})}),e.jsx(B,{width:"100%",height:F,children:e.jsxs(E,{data:z,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx(I,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(K,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd",hide:A}),e.jsx(W,{domain:[n,x],tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,tickFormatter:l=>(l+n).toLocaleString("en-US",{maximumFractionDigits:0}),width:56,orientation:"right"}),e.jsx(V,{content:e.jsx(ue,{currency:r})}),e.jsx(U,{dataKey:"wickBase",stackId:"wick",fill:"transparent",isAnimationActive:!1}),e.jsx(U,{dataKey:"wickRange",stackId:"wick",fill:"var(--color-text-muted)",opacity:.4,barSize:1,isAnimationActive:!1}),e.jsx(U,{dataKey:"bodyBase",stackId:"body",fill:"transparent",isAnimationActive:!1}),e.jsx(U,{dataKey:"bodyRange",stackId:"body",barSize:Math.max(3,Math.floor(800/o.length)-2),isAnimationActive:!1,fill:"currentColor",shape:l=>{const d=l.payload,p=d.close>=d.open;return e.jsx("rect",{x:l.x+1,y:l.y,width:Math.max(l.width-2,1),height:Math.max(l.height,1),fill:p?"var(--color-up)":"var(--color-down)",rx:1})}}),t.ma20&&e.jsx(L,{type:"monotone",dataKey:"ma20",stroke:"#60a5fa",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0}),t.ma50&&e.jsx(L,{type:"monotone",dataKey:"ma50",stroke:"#f59e0b",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0,strokeDasharray:"4 2"}),t.bb&&e.jsxs(e.Fragment,{children:[e.jsx(L,{type:"monotone",dataKey:"bbUpper",stroke:"#06b6d4",strokeWidth:1,dot:!1,isAnimationActive:!1,connectNulls:!0,strokeDasharray:"3 2"}),e.jsx(L,{type:"monotone",dataKey:"bbLower",stroke:"#06b6d4",strokeWidth:1,dot:!1,isAnimationActive:!1,connectNulls:!0,strokeDasharray:"3 2"})]}),t.vwap&&e.jsx(L,{type:"monotone",dataKey:"vwap",stroke:"#8b5cf6",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0}),t.linreg&&e.jsx(L,{type:"monotone",dataKey:"linreg",stroke:"#fb923c",strokeWidth:1.5,dot:!1,isAnimationActive:!1,strokeDasharray:"6 3"}),t.patterns&&e.jsx(L,{type:"linear",dataKey:"patternPrice",stroke:"transparent",dot:l=>{if(!l.payload?.patternLabel)return e.jsx("g",{},l.key);const{cx:d,cy:p,payload:g}=l,i=g.patternBull,f=de(g.patternLabel),w=i?"var(--color-up)":"var(--color-down)";return e.jsxs("g",{children:[e.jsx("circle",{cx:d,cy:p,r:4,fill:w,fillOpacity:.8}),e.jsx("text",{x:d,y:i?p+11:p-6,fontSize:7,textAnchor:"middle",fill:w,fontFamily:"var(--font-mono)",fontWeight:"700",children:f})]},l.key)},isAnimationActive:!1,legendType:"none"})]})}),A&&e.jsx(B,{width:"100%",height:76,children:e.jsxs(E,{data:z,margin:{top:4,right:4,bottom:0,left:0},children:[e.jsx(I,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(K,{dataKey:"date",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(W,{domain:[0,100],ticks:[30,50,70],tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:30,orientation:"right"}),e.jsx(V,{content:e.jsx(pe,{})}),e.jsx($,{y:70,stroke:"var(--color-down)",strokeDasharray:"2 2",strokeOpacity:.5}),e.jsx($,{y:30,stroke:"var(--color-up)",strokeDasharray:"2 2",strokeOpacity:.5}),e.jsx($,{y:50,stroke:"var(--color-border)",strokeOpacity:.4}),e.jsx(L,{type:"monotone",dataKey:"rsi",stroke:"#a78bfa",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0})]})}),(t.ma20||t.ma50||t.bb||t.vwap||t.linreg||t.patterns)&&e.jsxs("div",{style:{display:"flex",gap:"0.75rem",padding:"4px 4px 0",fontSize:10,fontFamily:"var(--font-mono)",flexWrap:"wrap"},children:[t.ma20&&e.jsx("span",{style:{color:"#60a5fa"},children:"─ MA20"}),t.ma50&&e.jsx("span",{style:{color:"#f59e0b"},children:"╌ MA50"}),t.bb&&e.jsx("span",{style:{color:"#06b6d4"},children:"╌ BB(20)"}),t.vwap&&e.jsx("span",{style:{color:"#8b5cf6"},children:"─ VWAP"}),A&&e.jsx("span",{style:{color:"#a78bfa"},children:"─ RSI(14)"}),t.linreg&&e.jsx("span",{style:{color:"#fb923c"},children:"╌ LinReg"}),t.patterns&&e.jsx("span",{style:{color:"var(--color-text-muted)"},children:"● Patterns"})]})]})}function he(o,a=30){if(o.length<a+1)return null;const r=o.slice(-a-1),t=r.slice(1).map((c,n)=>Math.log(c.close/r[n].close)),u=t.reduce((c,n)=>c+n,0)/t.length,m=t.reduce((c,n)=>c+(n-u)**2,0)/t.length;return+(Math.sqrt(m)*Math.sqrt(252)*100).toFixed(1)}const ge=[{label:"1W",days:7},{label:"1M",days:30},{label:"3M",days:90},{label:"6M",days:180},{label:"1Y",days:365}];function h({label:o,value:a}){return e.jsxs("div",{className:"stat-row",children:[e.jsx("span",{className:"stat-label",children:o}),e.jsx("span",{className:"stat-value num",children:a})]})}function be(o){return o>=1e12?`${(o/1e12).toFixed(2)}T`:o>=1e9?`${(o/1e9).toFixed(2)}B`:o>=1e6?`${(o/1e6).toFixed(2)}M`:o.toLocaleString("en-US")}function fe({data:o,currency:a}){if(!o.length)return null;const r=o[0].price,m=o[o.length-1].price>=r?"var(--color-up)":"var(--color-down)";return e.jsx(B,{width:"100%",height:260,children:e.jsxs(ee,{data:o,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"intradayGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"5%",stopColor:m,stopOpacity:.25}),e.jsx("stop",{offset:"95%",stopColor:m,stopOpacity:0})]})}),e.jsx(I,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(K,{dataKey:"t",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(W,{domain:["auto","auto"],tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:56,orientation:"right",tickFormatter:c=>`${a} ${c.toFixed(0)}`}),e.jsx(V,{formatter:c=>[`${a} ${(c??0).toFixed(2)}`,"Price"],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11}}),e.jsx(te,{type:"monotone",dataKey:"price",stroke:m,strokeWidth:1.5,fill:"url(#intradayGrad)",dot:!1,isAnimationActive:!1})]})})}function Ne(){const{exchangeId:o="",symbol:a=""}=q(),r=decodeURIComponent(a),[t,u]=M.useState(30),[m,c]=M.useState({}),{symbols:n,add:x,remove:v}=G();function y(i){c(f=>({...f,[i]:!f[i]}))}const b=n.includes(r),[k,N]=M.useState(!1),{data:s}=T({queryKey:["quote",r],queryFn:()=>P.getQuote(r),staleTime:3e4,refetchInterval:3e4}),{data:j,isLoading:A}=T({queryKey:["history",r,t],queryFn:()=>P.getHistory(r,t),staleTime:6e4}),{data:z}=T({queryKey:["news",r],queryFn:()=>P.getNews?.(r)??Promise.resolve([]),staleTime:5*6e4}),F=(s?.changePct??0)>=0,l=M.useMemo(()=>j?he(j):null,[j]),d=M.useMemo(()=>{if(!s||!k)return[];const i=s.price;let f=i;const w=[];for(let S=0;S<390;S++){const R=Math.sin(S*9973+i*1234.5)*.5;if(f=Math.max(f*(1+R*5e-4),.01),S%10===0){const C=`${String(9+Math.floor((S+30)/60)).padStart(2,"0")}:${String((S+30)%60).padStart(2,"0")}`;w.push({t:C,price:+f.toFixed(2)})}}return w},[s,k]),p=j?.length?{high:Math.max(...j.map(i=>i.high)),low:Math.min(...j.map(i=>i.low)),avgVol:Math.floor(j.reduce((i,f)=>i+f.volume,0)/j.length)}:null,g=p&&s?Math.max(0,Math.min(100,(s.price-p.low)/(p.high-p.low)*100)):null;return e.jsxs("div",{className:"stock-detail",children:[e.jsxs("div",{className:"sd-breadcrumb",children:[e.jsxs(H,{to:`/exchange/${o}`,className:"sd-back",children:[e.jsx(ae,{size:12}),o.toUpperCase()]}),e.jsx("span",{className:"sd-sep",children:"/"}),e.jsx("span",{children:r})]}),e.jsxs("div",{className:"sd-header panel",children:[e.jsxs("div",{className:"sd-header-left",children:[e.jsxs("div",{className:"sd-symbol-row",children:[e.jsx("span",{className:"sd-symbol",children:r.replace(`.${o.toUpperCase()}`,"")}),e.jsx(X,{id:o})]}),e.jsx("div",{className:"sd-name",children:s?.name??r}),e.jsxs("div",{className:"sd-price-row",children:[e.jsx("span",{className:"sd-price num",children:s?s.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):"—"}),e.jsx("span",{className:"sd-currency",children:s?.currency??""})]}),e.jsxs("div",{className:"sd-change-row",children:[F?e.jsx(Q,{size:13}):e.jsx(re,{size:13}),e.jsx("span",{className:`num ${F?"text-up":"text-down"}`,children:s?(F?"+":"")+s.change.toFixed(2):"—"}),e.jsxs("span",{className:`num sd-pct ${F?"text-up":"text-down"}`,children:["(",s?(F?"+":"")+s.changePct.toFixed(2)+"%":"—",")"]})]})]}),e.jsxs("button",{className:`sd-wl-btn ${b?"sd-wl-active":""}`,onClick:()=>b?v(r):x(r),children:[e.jsx(J,{size:14}),b?"Watching":"Watch"]})]}),e.jsxs("div",{className:"sd-body",children:[e.jsxs("div",{className:"sd-chart-col",children:[e.jsxs("div",{className:"sd-chart-header",children:[e.jsx("span",{className:"section-label",children:"Price History"}),e.jsxs("div",{className:"sd-chart-controls",children:[e.jsxs("div",{className:"sd-range-tabs",children:[ge.map(i=>e.jsx("button",{className:`sd-range-tab ${!k&&t===i.days?"active":""}`,onClick:()=>{N(!1),u(i.days)},children:i.label},i.label)),e.jsx("button",{className:`sd-range-tab ${k?"active":""}`,onClick:()=>N(i=>!i),title:"Simulated intraday view — not real prices",children:"1D~"})]}),e.jsx("div",{className:"sd-indicator-tabs",children:["ma20","ma50","bb","vwap","rsi","linreg","patterns"].map(i=>e.jsx("button",{className:`sd-ind-tab ${m[i]?"active":""}`,onClick:()=>y(i),title:i==="linreg"?"Linear Regression":i==="patterns"?"Candlestick Patterns":void 0,children:i==="linreg"?"LR":i==="patterns"?"PAT":i.toUpperCase()},i))})]})]}),e.jsx("div",{className:"sd-chart panel",children:A?e.jsx("div",{className:"sd-chart-loading",children:"Loading chart…"}):k?e.jsxs("div",{className:"sd-intraday",children:[e.jsx("div",{className:"sd-intraday-badge",children:"⚠ SIMULATED INTRADAY — not real prices"}),e.jsx(fe,{data:d,currency:s?.currency??"USD"})]}):e.jsx(xe,{data:j??[],currency:s?.currency??"USD",height:280,indicators:m,symbol:r})})]}),e.jsxs("div",{className:"sd-stats-col",children:[e.jsx("div",{className:"section-label",children:"Key Stats"}),e.jsxs("div",{className:"sd-stats panel",children:[s&&e.jsxs(e.Fragment,{children:[e.jsx(h,{label:"Last Price",value:s.price.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(h,{label:"Change",value:`${s.change>=0?"+":""}${s.change.toFixed(2)}`}),e.jsx(h,{label:"Change %",value:`${s.changePct>=0?"+":""}${s.changePct.toFixed(2)}%`}),e.jsx(h,{label:"Volume",value:s.volume?(s.volume/1e3).toFixed(0)+"K":"—"}),e.jsx(h,{label:"Currency",value:s.currency}),e.jsx(h,{label:"Exchange",value:s.exchange})]}),(s?.pe!=null||s?.eps!=null||s?.divYield!=null||s?.mktCap!=null)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"stat-divider"}),s?.pe!=null&&e.jsx(h,{label:"P/E Ratio",value:s.pe.toFixed(1)}),s?.eps!=null&&e.jsx(h,{label:"EPS (TTM)",value:s.eps.toFixed(2)}),s?.divYield!=null&&e.jsx(h,{label:"Div Yield",value:`${s.divYield.toFixed(2)}%`}),s?.mktCap!=null&&e.jsx(h,{label:"Market Cap",value:be(s.mktCap)}),s?.high52!=null&&e.jsx(h,{label:"52w High",value:s.high52.toLocaleString("en-US",{minimumFractionDigits:2})}),s?.low52!=null&&e.jsx(h,{label:"52w Low",value:s.low52.toLocaleString("en-US",{minimumFractionDigits:2})})]}),p&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"stat-divider"}),e.jsx(h,{label:`${t}d High`,value:p.high.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(h,{label:`${t}d Low`,value:p.low.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(h,{label:"Avg Volume",value:(p.avgVol/1e3).toFixed(0)+"K"}),l!=null&&e.jsx(h,{label:"HV 30d Ann.",value:`${l}%`}),g!=null&&e.jsxs("div",{className:"stat-range-bar",children:[e.jsx("span",{className:"stat-range-lo",children:p.low.toLocaleString("en-US",{maximumFractionDigits:0})}),e.jsx("div",{className:"stat-range-track",children:e.jsx("div",{className:"stat-range-fill",style:{left:`${g}%`}})}),e.jsx("span",{className:"stat-range-hi",children:p.high.toLocaleString("en-US",{maximumFractionDigits:0})})]})]})]})]})]}),(z?.length??0)>0&&e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Related News"}),e.jsx("div",{className:"sd-news panel",children:(z??[]).map(i=>e.jsxs("a",{href:i.url,className:"sd-news-item",target:"_blank",rel:"noopener",children:[e.jsx("span",{className:"sd-news-src",children:i.source}),e.jsx("span",{className:"sd-news-headline",children:i.headline})]},i.id))})]}),e.jsx("style",{children:`
        .stock-detail { display: flex; flex-direction: column; gap: 1.25rem; max-width: 1100px; }

        /* Breadcrumb */
        .sd-breadcrumb {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 11px; color: var(--color-text-muted);
        }
        .sd-back {
          display: flex; align-items: center; gap: 0.25rem;
          color: var(--color-gold); text-decoration: none; font-weight: 600;
        }
        .sd-back:hover { text-decoration: underline; }
        .sd-sep { opacity: 0.4; }

        /* Price header */
        .sd-header {
          padding: 1rem 1.25rem;
          display: flex; align-items: flex-start; justify-content: space-between;
        }
        .sd-symbol-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.125rem; }
        .sd-symbol { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; font-family: var(--font-mono); color: var(--color-gold); }
        .sd-name   { font-size: 12px; color: var(--color-text-muted); margin-bottom: 0.5rem; }

        .sd-price-row { display: flex; align-items: baseline; gap: 0.375rem; }
        .sd-price    { font-size: 28px; font-weight: 800; letter-spacing: -0.03em; }
        .sd-currency { font-size: 11px; color: var(--color-text-muted); }

        .sd-change-row {
          display: flex; align-items: center; gap: 0.375rem;
          margin-top: 0.25rem; font-size: 13px;
        }
        .sd-pct { font-size: 12px; }

        /* Watchlist button */
        .sd-wl-btn {
          display: flex; align-items: center; gap: 0.375rem;
          padding: 0.375rem 0.75rem; border-radius: 4px;
          border: 1px solid var(--color-border);
          background: none; color: var(--color-text-muted);
          font-size: 11px; font-weight: 600; cursor: pointer;
          transition: all 0.15s;
        }
        .sd-wl-btn:hover   { border-color: var(--color-gold-dim); color: var(--color-gold); }
        .sd-wl-active      { border-color: var(--color-gold); color: var(--color-gold); background: var(--color-gold-subtle); }

        /* Body layout */
        .sd-body {
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 1rem;
          align-items: start;
        }
        @media (max-width: 750px) {
          .sd-body { grid-template-columns: 1fr; }
        }

        /* Chart */
        .sd-chart-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .sd-chart { padding: 0.5rem 0.25rem 0.25rem; }
        .sd-chart-loading {
          height: 280px; display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: var(--color-text-muted);
        }

        /* Chart controls row */
        .sd-chart-controls { display: flex; align-items: center; gap: 0.5rem; }

        /* Range tabs */
        .sd-range-tabs { display: flex; gap: 2px; }
        .sd-range-tab {
          padding: 2px 7px; font-size: 10px; font-weight: 600;
          border: 1px solid transparent; border-radius: 3px;
          background: none; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.1s;
        }
        .sd-range-tab:hover  { color: var(--color-text-secondary); border-color: var(--color-border); }
        .sd-range-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        /* Indicator toggle tabs */
        .sd-indicator-tabs { display: flex; gap: 2px; border-left: 1px solid var(--color-border-subtle); padding-left: 0.5rem; }
        .sd-ind-tab {
          padding: 2px 6px; font-size: 9px; font-weight: 700;
          border: 1px solid transparent; border-radius: 3px;
          background: none; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.1s; letter-spacing: 0.04em;
        }
        .sd-ind-tab:hover  { color: var(--color-text-secondary); border-color: var(--color-border); }
        .sd-ind-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        /* Stats */
        .sd-stats { padding: 0; overflow: hidden; }
        .stat-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.375rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
          font-size: 11px;
        }
        .stat-row:last-child { border-bottom: none; }
        .stat-label { color: var(--color-text-muted); }
        .stat-value { color: var(--color-text-primary); font-weight: 600; }
        .stat-divider { height: 1px; background: var(--color-border); margin: 0.25rem 0; }

        /* 52w range bar */
        .stat-range-bar {
          display: flex; align-items: center; gap: 4px;
          padding: 0.375rem 0.75rem;
          font-size: 9px; font-family: var(--font-mono);
          color: var(--color-text-muted);
        }
        .stat-range-track {
          flex: 1; height: 4px; background: var(--color-bg-tertiary);
          border-radius: 2px; position: relative;
        }
        .stat-range-fill {
          position: absolute; top: -2px;
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--color-gold);
          transform: translateX(-50%);
        }
        .stat-range-lo, .stat-range-hi { white-space: nowrap; }

        /* Section label */
        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
        }

        /* Intraday */
        .sd-intraday { }
        .sd-intraday-badge {
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.06em; color: #f59e0b;
          padding: 3px 8px; background: rgba(245,158,11,0.1); border-radius: 3px;
          margin-bottom: 8px; display: inline-block;
        }

        /* News */
        .sd-news { overflow: hidden; }
        .sd-news-item {
          display: flex; align-items: baseline; gap: 0.625rem;
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
          text-decoration: none; transition: background 0.1s;
        }
        .sd-news-item:last-child { border-bottom: none; }
        .sd-news-item:hover { background: var(--color-bg-hover); }
        .sd-news-src {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600; white-space: nowrap; flex-shrink: 0;
        }
        .sd-news-headline { font-size: 12px; color: var(--color-text-secondary); line-height: 1.4; }
        .sd-news-item:hover .sd-news-headline { color: var(--color-text-primary); }
      `})]})}export{Ne as default};
