import{r as M,j as e,l as J,e as O,L as Z}from"./vendor-9MAh3nQh.js";import{c as ee,u as te,h as oe,E as re,T as ae,S as se,p as _}from"./index-DIq9QPrS.js";import{D as ne}from"./download-W-SpcVJq.js";import{R as B,b as q,C as I,X as $,Y as K,T as V,B as T,a as F,c as U,A as le,d as ie}from"./recharts-DK6PfPlO.js";import{T as ce}from"./trending-down-Boj6-9en.js";import"./store-DR-NtvzW.js";const de=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],me=ee("arrow-left",de);function Q(r){return new Date(r).toLocaleDateString("en-US",{month:"short",day:"numeric"})}function P(r,s){return`${s} ${r.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`}function X(r,s){return r.map((o,t)=>t<s-1?null:+(r.slice(t-s+1,t+1).reduce((m,d)=>m+d.close,0)/s).toFixed(2))}function ue(r,s=20){const o=[],t=[];for(let c=0;c<r.length;c++){if(c<s-1){o.push(null),t.push(null);continue}const m=r.slice(c-s+1,c+1).map(p=>p.close),d=m.reduce((p,v)=>p+v,0)/s,l=Math.sqrt(m.reduce((p,v)=>p+(v-d)**2,0)/s);o.push(+(d+2*l).toFixed(2)),t.push(+(d-2*l).toFixed(2))}return{upper:o,lower:t}}function pe(r){let s=0,o=0;return r.map(t=>t.volume?(s+=(t.high+t.low+t.close)/3*t.volume,o+=t.volume,o>0?+(s/o).toFixed(2):null):null)}function he(r){const s=r.length,o=r.map(x=>x.close),t=s*(s-1)/2,c=s*(s-1)*(2*s-1)/6,m=o.reduce((x,g)=>x+g,0),d=o.reduce((x,g,L)=>x+L*g,0),l=s*c-t*t;if(l===0)return o;const p=(s*d-t*m)/l,v=(m-p*t)/s;return o.map((x,g)=>+(p*g+v).toFixed(2))}function xe(r,s){const o=r[s],t=Math.abs(o.close-o.open),c=o.high-o.low;if(c===0)return null;if(t/c<.1&&c>0)return"doji";const m=o.high-Math.max(o.open,o.close),d=Math.min(o.open,o.close)-o.low;if(d>2*t&&m<t*.5&&t>0)return"hammer";if(m>2*t&&d<t*.5&&t>0)return"shooting_star";if(s>0){const l=r[s-1],p=l.close<l.open,v=l.close>l.open;if(p&&o.close>o.open&&o.open<l.close&&o.close>l.open)return"bullish_engulfing";if(v&&o.close<o.open&&o.open>l.close&&o.close<l.open)return"bearish_engulfing"}return null}function ge(r){return r==="hammer"||r==="bullish_engulfing"}function fe(r){switch(r){case"doji":return"D";case"hammer":return"H";case"shooting_star":return"SS";case"bullish_engulfing":return"BE";case"bearish_engulfing":return"BE";default:return""}}function Y(r,s){const o=2/(s+1),t=[];for(let c=0;c<r.length;c++){if(c===0){t.push(r[0]);continue}t.push(r[c]*o+t[c-1]*(1-o))}return t}function be(r,s=12,o=26,t=9){const c=r.map(h=>h.close),m=Y(c,s),d=Y(c,o),l=m.map((h,y)=>y<o-1?null:+(h-d[y]).toFixed(4)),p=l.filter(h=>h!=null),v=Y(p,t),x=[];let g=0;for(let h=0;h<l.length;h++){if(l[h]==null){x.push(null);continue}x.push(g<v.length?+v[g].toFixed(4):null),g++}const L=l.map((h,y)=>h!=null&&x[y]!=null?+(h-x[y]).toFixed(4):null);return{macd:l,signal:x,hist:L}}function ve(r){const s=Math.max(...r.map(c=>c.high)),o=Math.min(...r.map(c=>c.low)),t=s-o;return{high:s,low:o,r236:+(s-t*.236).toFixed(4),r382:+(s-t*.382).toFixed(4),r500:+(s-t*.5).toFixed(4),r618:+(s-t*.618).toFixed(4),r786:+(s-t*.786).toFixed(4)}}function ye(r,s=14){const o=[];for(let t=0;t<r.length;t++){if(t<s){o.push(null);continue}let c=0,m=0;for(let l=t-s+1;l<=t;l++){const p=r[l].close-r[l-1].close;p>0?c+=p:m-=p}const d=m===0?100:+(100-100/(1+c/m)).toFixed(1);o.push(d)}return o}function je({active:r,payload:s,currency:o="USD"}){if(!r||!s?.length)return null;const t=s[0]?.payload;return t?e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"0.5rem 0.75rem",fontSize:11,fontFamily:"var(--font-mono)"},children:[e.jsx("div",{style:{color:"var(--color-text-muted)",marginBottom:4},children:Q(t.time)}),[["O",t.open],["H",t.high],["L",t.low],["C",t.close]].map(([c,m])=>{const d=c==="C",l=t.close>=t.open;return e.jsxs("div",{style:{display:"flex",gap:"1rem",justifyContent:"space-between",color:d?l?"var(--color-up)":"var(--color-down)":"var(--color-text-secondary)",fontWeight:d?700:400},children:[e.jsx("span",{children:c}),e.jsx("span",{children:P(m,o)})]},c)}),t.volume>0&&e.jsxs("div",{style:{color:"var(--color-text-muted)",marginTop:4,borderTop:"1px solid var(--color-border-subtle)",paddingTop:4},children:["Vol ",(t.volume/1e3).toFixed(0),"K"]}),t.ma20!=null&&e.jsxs("div",{style:{color:"#60a5fa",marginTop:2},children:["MA20 ",P(t.ma20,o)]}),t.ma50!=null&&e.jsxs("div",{style:{color:"#f59e0b",marginTop:2},children:["MA50 ",P(t.ma50,o)]}),t.rsi!=null&&e.jsxs("div",{style:{color:"#a78bfa",marginTop:2},children:["RSI  ",t.rsi.toFixed(1)]}),t.bbUpperAbs!=null&&t.bbLowerAbs!=null&&e.jsxs("div",{style:{color:"#06b6d4",marginTop:2},children:["BB ",t.bbLowerAbs.toFixed(2),"–",t.bbUpperAbs.toFixed(2)]}),t.vwapAbs!=null&&e.jsxs("div",{style:{color:"#8b5cf6",marginTop:2},children:["VWAP ",P(t.vwapAbs,o)]}),t.linregAbs!=null&&e.jsxs("div",{style:{color:"#fb923c",marginTop:2},children:["LinReg ",P(t.linregAbs,o)]}),t.patternLabel!=null&&e.jsxs("div",{style:{color:"var(--color-text-muted)",marginTop:2},children:["Pattern: ",t.patternLabel.replace(/_/g," ")]}),t.macdVal!=null&&e.jsxs("div",{style:{color:"#e879f9",marginTop:2},children:["MACD ",t.macdVal.toFixed(3)," / Sig ",t.macdSig?.toFixed(3)]})]}):null}function we({active:r,payload:s}){if(!r||!s?.length)return null;const o=s[0]?.payload;return o?e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"4px 8px",fontSize:11,fontFamily:"var(--font-mono)"},children:[o.macdVal!=null&&e.jsxs("div",{style:{color:"#e879f9"},children:["MACD ",o.macdVal.toFixed(4)]}),o.macdSig!=null&&e.jsxs("div",{style:{color:"#fbbf24"},children:["Sig  ",o.macdSig.toFixed(4)]}),o.macdHist!=null&&e.jsxs("div",{style:{color:o.macdHist>=0?"var(--color-up)":"var(--color-down)"},children:["Hist ",o.macdHist.toFixed(4)]})]}):null}function ke({active:r,payload:s}){if(!r||!s?.length)return null;const o=s[0]?.value;if(o==null)return null;const t=o>=70?"var(--color-down)":o<=30?"var(--color-up)":"#a78bfa";return e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"4px 8px",fontSize:11,fontFamily:"var(--font-mono)",color:t},children:["RSI ",o.toFixed(1),o>=70?" OB":o<=30?" OS":""]})}function Se({data:r,height:s=240,currency:o="USD",indicators:t={},symbol:c="chart"}){const m=M.useRef(null);function d(){const i=m.current?.querySelector("svg");if(!i)return;const a=i.cloneNode(!0);a.setAttribute("style","background:#0a0a0a");const u=new XMLSerializer().serializeToString(a),j=new Image,k=new Blob([u],{type:"image/svg+xml"}),D=URL.createObjectURL(k);j.onload=()=>{const S=document.createElement("canvas");S.width=j.naturalWidth||i.clientWidth||800,S.height=j.naturalHeight||i.clientHeight||400;const E=S.getContext("2d");E.fillStyle="#0a0a0a",E.fillRect(0,0,S.width,S.height),E.drawImage(j,0,0),S.toBlob(G=>{if(!G)return;const H=document.createElement("a");H.href=URL.createObjectURL(G),H.download=`${c}-chart.png`,H.click()}),URL.revokeObjectURL(D)},j.src=D}if(!r.length)return e.jsx("div",{style:{height:s,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--color-text-muted)",fontSize:12},children:"No chart data"});const l=Math.min(...r.map(i=>i.low))*.999,p=Math.max(...r.map(i=>i.high))*1.001,v=p-l,x=t.ma20?X(r,20):[],g=t.ma50?X(r,50):[],L=t.rsi?ye(r):[],h=t.bb?ue(r):{upper:[],lower:[]},y=t.vwap?pe(r):[],C=t.linreg?he(r):[],n=t.macd?be(r):null,f=t.fib?ve(r):null,N=t.rsi&&L.some(i=>i!=null),z=t.macd&&!!n?.macd.some(i=>i!=null),A=r.map((i,a)=>({...i,date:Q(i.time),wickBase:i.low-l,wickRange:i.high-i.low,bodyBase:Math.min(i.open,i.close)-l,bodyRange:Math.abs(i.close-i.open)||.5,...t.ma20&&x[a]!=null?{ma20:x[a]-l,ma20abs:x[a]}:{},...t.ma50&&g[a]!=null?{ma50:g[a]-l,ma50abs:g[a]}:{},...N?{rsi:L[a]}:{},...t.bb&&h.upper[a]!=null?{bbUpper:h.upper[a]-l,bbLower:Math.max(0,h.lower[a]-l),bbUpperAbs:h.upper[a],bbLowerAbs:h.lower[a]}:{},...t.vwap&&y[a]!=null?{vwap:y[a]-l,vwapAbs:y[a]}:{},...t.linreg?{linreg:C[a]-l,linregAbs:C[a]}:{},...n&&n.macd[a]!=null?{macdVal:n.macd[a],macdSig:n.signal[a],macdHist:n.hist[a]}:{},...t.patterns?(()=>{const u=xe(r,a);if(!u)return{};const j=ge(u);return{patternPrice:j?i.low-l-v*.03:i.high-l+v*.03,patternLabel:u,patternBull:j}})():{}})),R=80,W=(N?1:0)+(z?1:0),w=s-R*W;return e.jsxs("div",{ref:m,children:[e.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:2},children:e.jsxs("button",{onClick:d,style:{background:"none",border:"none",cursor:"pointer",padding:"2px 4px",color:"var(--color-text-muted)",display:"flex",alignItems:"center",gap:3,fontSize:10,borderRadius:3,transition:"color 0.1s"},title:"Download chart as PNG",onMouseEnter:i=>i.currentTarget.style.color="var(--color-text-primary)",onMouseLeave:i=>i.currentTarget.style.color="var(--color-text-muted)",children:[e.jsx(ne,{size:10})," PNG"]})}),e.jsx(B,{width:"100%",height:w,children:e.jsxs(q,{data:A,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx(I,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx($,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd",hide:N}),e.jsx(K,{domain:[l,p],tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,tickFormatter:i=>(i+l).toLocaleString("en-US",{maximumFractionDigits:0}),width:56,orientation:"right"}),e.jsx(V,{content:e.jsx(je,{currency:o})}),e.jsx(T,{dataKey:"wickBase",stackId:"wick",fill:"transparent",isAnimationActive:!1}),e.jsx(T,{dataKey:"wickRange",stackId:"wick",fill:"var(--color-text-muted)",opacity:.4,barSize:1,isAnimationActive:!1}),e.jsx(T,{dataKey:"bodyBase",stackId:"body",fill:"transparent",isAnimationActive:!1}),e.jsx(T,{dataKey:"bodyRange",stackId:"body",barSize:Math.max(3,Math.floor(800/r.length)-2),isAnimationActive:!1,fill:"currentColor",shape:i=>{const a=i.payload,u=a.close>=a.open;return e.jsx("rect",{x:i.x+1,y:i.y,width:Math.max(i.width-2,1),height:Math.max(i.height,1),fill:u?"var(--color-up)":"var(--color-down)",rx:1})}}),t.ma20&&e.jsx(F,{type:"monotone",dataKey:"ma20",stroke:"#60a5fa",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0}),t.ma50&&e.jsx(F,{type:"monotone",dataKey:"ma50",stroke:"#f59e0b",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0,strokeDasharray:"4 2"}),t.bb&&e.jsxs(e.Fragment,{children:[e.jsx(F,{type:"monotone",dataKey:"bbUpper",stroke:"#06b6d4",strokeWidth:1,dot:!1,isAnimationActive:!1,connectNulls:!0,strokeDasharray:"3 2"}),e.jsx(F,{type:"monotone",dataKey:"bbLower",stroke:"#06b6d4",strokeWidth:1,dot:!1,isAnimationActive:!1,connectNulls:!0,strokeDasharray:"3 2"})]}),t.vwap&&e.jsx(F,{type:"monotone",dataKey:"vwap",stroke:"#8b5cf6",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0}),t.linreg&&e.jsx(F,{type:"monotone",dataKey:"linreg",stroke:"#fb923c",strokeWidth:1.5,dot:!1,isAnimationActive:!1,strokeDasharray:"6 3"}),f&&[{label:"78.6%",price:f.r786,color:"#f87171"},{label:"61.8%",price:f.r618,color:"#fb923c"},{label:"50.0%",price:f.r500,color:"#facc15"},{label:"38.2%",price:f.r382,color:"#4ade80"},{label:"23.6%",price:f.r236,color:"#60a5fa"}].map(a=>{const u=a.price-l;return u<0||u>p-l?null:e.jsx(U,{y:u,stroke:a.color,strokeDasharray:"4 3",strokeWidth:1,strokeOpacity:.7,label:{value:a.label,position:"insideTopLeft",fontSize:8,fill:a.color,fontFamily:"var(--font-mono)"}},a.label)}),t.patterns&&e.jsx(F,{type:"linear",dataKey:"patternPrice",stroke:"transparent",dot:i=>{if(!i.payload?.patternLabel)return e.jsx("g",{},i.key);const{cx:a,cy:u,payload:j}=i,k=j.patternBull,D=fe(j.patternLabel),S=k?"var(--color-up)":"var(--color-down)";return e.jsxs("g",{children:[e.jsx("circle",{cx:a,cy:u,r:4,fill:S,fillOpacity:.8}),e.jsx("text",{x:a,y:k?u+11:u-6,fontSize:7,textAnchor:"middle",fill:S,fontFamily:"var(--font-mono)",fontWeight:"700",children:D})]},i.key)},isAnimationActive:!1,legendType:"none"})]})}),N&&e.jsx(B,{width:"100%",height:76,children:e.jsxs(q,{data:A,margin:{top:4,right:4,bottom:0,left:0},children:[e.jsx(I,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx($,{dataKey:"date",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(K,{domain:[0,100],ticks:[30,50,70],tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:30,orientation:"right"}),e.jsx(V,{content:e.jsx(ke,{})}),e.jsx(U,{y:70,stroke:"var(--color-down)",strokeDasharray:"2 2",strokeOpacity:.5}),e.jsx(U,{y:30,stroke:"var(--color-up)",strokeDasharray:"2 2",strokeOpacity:.5}),e.jsx(U,{y:50,stroke:"var(--color-border)",strokeOpacity:.4}),e.jsx(F,{type:"monotone",dataKey:"rsi",stroke:"#a78bfa",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0})]})}),z&&n&&e.jsx(B,{width:"100%",height:R,children:e.jsxs(q,{data:A,margin:{top:2,right:4,bottom:0,left:0},children:[e.jsx(I,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx($,{dataKey:"date",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd",hide:N}),e.jsx(K,{domain:["auto","auto"],tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:30,orientation:"right"}),e.jsx(V,{content:e.jsx(we,{})}),e.jsx(U,{y:0,stroke:"var(--color-border)",strokeOpacity:.5}),e.jsx(T,{dataKey:"macdHist",isAnimationActive:!1,shape:i=>{const a=i.payload?.macdHist;if(a==null)return e.jsx("g",{});const u=a>=0?"var(--color-up)":"var(--color-down)";return e.jsx("rect",{x:i.x,y:i.y,width:Math.max(i.width-1,1),height:Math.max(i.height,1),fill:u,fillOpacity:.5})}}),e.jsx(F,{type:"monotone",dataKey:"macdVal",stroke:"#e879f9",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0}),e.jsx(F,{type:"monotone",dataKey:"macdSig",stroke:"#fbbf24",strokeWidth:1,dot:!1,isAnimationActive:!1,connectNulls:!0,strokeDasharray:"3 2"})]})}),(t.ma20||t.ma50||t.bb||t.vwap||t.linreg||t.patterns||t.macd||t.fib)&&e.jsxs("div",{style:{display:"flex",gap:"0.75rem",padding:"4px 4px 0",fontSize:10,fontFamily:"var(--font-mono)",flexWrap:"wrap"},children:[t.ma20&&e.jsx("span",{style:{color:"#60a5fa"},children:"─ MA20"}),t.ma50&&e.jsx("span",{style:{color:"#f59e0b"},children:"╌ MA50"}),t.bb&&e.jsx("span",{style:{color:"#06b6d4"},children:"╌ BB(20)"}),t.vwap&&e.jsx("span",{style:{color:"#8b5cf6"},children:"─ VWAP"}),N&&e.jsx("span",{style:{color:"#a78bfa"},children:"─ RSI(14)"}),t.linreg&&e.jsx("span",{style:{color:"#fb923c"},children:"╌ LinReg"}),t.patterns&&e.jsx("span",{style:{color:"var(--color-text-muted)"},children:"● Patterns"}),t.macd&&e.jsxs("span",{style:{color:"#e879f9"},children:["─ MACD  ",e.jsx("span",{style:{color:"#fbbf24"},children:"╌ Signal"})]}),t.fib&&e.jsx("span",{style:{color:"#4ade80"},children:"─ Fib"})]})]})}function Fe(r,s=30){if(r.length<s+1)return null;const o=r.slice(-s-1),t=o.slice(1).map((d,l)=>Math.log(d.close/o[l].close)),c=t.reduce((d,l)=>d+l,0)/t.length,m=t.reduce((d,l)=>d+(l-c)**2,0)/t.length;return+(Math.sqrt(m)*Math.sqrt(252)*100).toFixed(1)}const Ae=[{label:"1W",days:7},{label:"1M",days:30},{label:"3M",days:90},{label:"6M",days:180},{label:"1Y",days:365}];function b({label:r,value:s}){return e.jsxs("div",{className:"stat-row",children:[e.jsx("span",{className:"stat-label",children:r}),e.jsx("span",{className:"stat-value num",children:s})]})}function Le(r){return r>=1e12?`${(r/1e12).toFixed(2)}T`:r>=1e9?`${(r/1e9).toFixed(2)}B`:r>=1e6?`${(r/1e6).toFixed(2)}M`:r.toLocaleString("en-US")}function Ne({data:r,currency:s}){if(!r.length)return null;const o=r[0].price,m=r[r.length-1].price>=o?"var(--color-up)":"var(--color-down)";return e.jsx(B,{width:"100%",height:260,children:e.jsxs(le,{data:r,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"intradayGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"5%",stopColor:m,stopOpacity:.25}),e.jsx("stop",{offset:"95%",stopColor:m,stopOpacity:0})]})}),e.jsx(I,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx($,{dataKey:"t",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(K,{domain:["auto","auto"],tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:56,orientation:"right",tickFormatter:d=>`${s} ${d.toFixed(0)}`}),e.jsx(V,{formatter:d=>[`${s} ${(d??0).toFixed(2)}`,"Price"],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11}}),e.jsx(ie,{type:"monotone",dataKey:"price",stroke:m,strokeWidth:1.5,fill:"url(#intradayGrad)",dot:!1,isAnimationActive:!1})]})})}function Ue(){const{exchangeId:r="",symbol:s=""}=J(),o=decodeURIComponent(s),[t,c]=M.useState(30),[m,d]=M.useState({}),{symbols:l,add:p,remove:v}=te(),{triggerSimba:x}=oe(),g=M.useRef(!1);function L(a){d(u=>({...u,[a]:!u[a]}))}const h=l.includes(o),[y,C]=M.useState(!1),{data:n}=O({queryKey:["quote",o],queryFn:()=>_.getQuote(o),staleTime:3e4,refetchInterval:3e4}),{data:f,isLoading:N}=O({queryKey:["history",o,t],queryFn:()=>_.getHistory(o,t),staleTime:6e4}),{data:z}=O({queryKey:["news",o],queryFn:()=>_.getNews?.(o)??Promise.resolve([]),staleTime:5*6e4}),A=(n?.changePct??0)>=0;M.useEffect(()=>{!n||g.current||n.high52&&n.price>=n.high52*.999&&(g.current=!0,x(o))},[n,o,x]);const R=M.useMemo(()=>f?Fe(f):null,[f]),W=M.useMemo(()=>{if(!n||!y)return[];const a=n.price;let u=a;const j=[];for(let k=0;k<390;k++){const D=Math.sin(k*9973+a*1234.5)*.5;if(u=Math.max(u*(1+D*5e-4),.01),k%10===0){const S=`${String(9+Math.floor((k+30)/60)).padStart(2,"0")}:${String((k+30)%60).padStart(2,"0")}`;j.push({t:S,price:+u.toFixed(2)})}}return j},[n,y]),w=f?.length?{high:Math.max(...f.map(a=>a.high)),low:Math.min(...f.map(a=>a.low)),avgVol:Math.floor(f.reduce((a,u)=>a+u.volume,0)/f.length)}:null,i=w&&n?Math.max(0,Math.min(100,(n.price-w.low)/(w.high-w.low)*100)):null;return e.jsxs("div",{className:"stock-detail",children:[e.jsxs("div",{className:"sd-breadcrumb",children:[e.jsxs(Z,{to:`/exchange/${r}`,className:"sd-back",children:[e.jsx(me,{size:12}),r.toUpperCase()]}),e.jsx("span",{className:"sd-sep",children:"/"}),e.jsx("span",{children:o})]}),e.jsxs("div",{className:"sd-header panel",children:[e.jsxs("div",{className:"sd-header-left",children:[e.jsxs("div",{className:"sd-symbol-row",children:[e.jsx("span",{className:"sd-symbol",children:o.replace(`.${r.toUpperCase()}`,"")}),e.jsx(re,{id:r})]}),e.jsx("div",{className:"sd-name",children:n?.name??o}),e.jsxs("div",{className:"sd-price-row",children:[e.jsx("span",{className:"sd-price num",children:n?n.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):"—"}),e.jsx("span",{className:"sd-currency",children:n?.currency??""})]}),e.jsxs("div",{className:"sd-change-row",children:[A?e.jsx(ae,{size:13}):e.jsx(ce,{size:13}),e.jsx("span",{className:`num ${A?"text-up":"text-down"}`,children:n?(A?"+":"")+n.change.toFixed(2):"—"}),e.jsxs("span",{className:`num sd-pct ${A?"text-up":"text-down"}`,children:["(",n?(A?"+":"")+n.changePct.toFixed(2)+"%":"—",")"]})]})]}),e.jsxs("button",{className:`sd-wl-btn ${h?"sd-wl-active":""}`,onClick:()=>h?v(o):p(o),children:[e.jsx(se,{size:14}),h?"Watching":"Watch"]})]}),e.jsxs("div",{className:"sd-body",children:[e.jsxs("div",{className:"sd-chart-col",children:[e.jsxs("div",{className:"sd-chart-header",children:[e.jsx("span",{className:"section-label",children:"Price History"}),e.jsxs("div",{className:"sd-chart-controls",children:[e.jsxs("div",{className:"sd-range-tabs",children:[Ae.map(a=>e.jsx("button",{className:`sd-range-tab ${!y&&t===a.days?"active":""}`,onClick:()=>{C(!1),c(a.days)},children:a.label},a.label)),e.jsx("button",{className:`sd-range-tab ${y?"active":""}`,onClick:()=>C(a=>!a),title:"Simulated intraday view — not real prices",children:"1D~"})]}),e.jsx("div",{className:"sd-indicator-tabs",children:["ma20","ma50","bb","vwap","rsi","macd","linreg","fib","patterns"].map(a=>e.jsx("button",{className:`sd-ind-tab ${m[a]?"active":""}`,onClick:()=>L(a),title:a==="linreg"?"Linear Regression":a==="patterns"?"Candlestick Patterns":a==="fib"?"Fibonacci Retracement":void 0,children:a==="linreg"?"LR":a==="patterns"?"PAT":a==="fib"?"FIB":a.toUpperCase()},a))})]})]}),e.jsx("div",{className:"sd-chart panel",children:N?e.jsx("div",{className:"sd-chart-loading",children:"Loading chart…"}):y?e.jsxs("div",{className:"sd-intraday",children:[e.jsx("div",{className:"sd-intraday-badge",children:"⚠ SIMULATED INTRADAY — not real prices"}),e.jsx(Ne,{data:W,currency:n?.currency??"USD"})]}):e.jsx(Se,{data:f??[],currency:n?.currency??"USD",height:280,indicators:m,symbol:o})})]}),e.jsxs("div",{className:"sd-stats-col",children:[e.jsx("div",{className:"section-label",children:"Key Stats"}),e.jsxs("div",{className:"sd-stats panel",children:[n&&e.jsxs(e.Fragment,{children:[e.jsx(b,{label:"Last Price",value:n.price.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(b,{label:"Change",value:`${n.change>=0?"+":""}${n.change.toFixed(2)}`}),e.jsx(b,{label:"Change %",value:`${n.changePct>=0?"+":""}${n.changePct.toFixed(2)}%`}),e.jsx(b,{label:"Volume",value:n.volume?(n.volume/1e3).toFixed(0)+"K":"—"}),e.jsx(b,{label:"Currency",value:n.currency}),e.jsx(b,{label:"Exchange",value:n.exchange})]}),(n?.pe!=null||n?.eps!=null||n?.divYield!=null||n?.mktCap!=null)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"stat-divider"}),n?.pe!=null&&e.jsx(b,{label:"P/E Ratio",value:n.pe.toFixed(1)}),n?.eps!=null&&e.jsx(b,{label:"EPS (TTM)",value:n.eps.toFixed(2)}),n?.divYield!=null&&e.jsx(b,{label:"Div Yield",value:`${n.divYield.toFixed(2)}%`}),n?.mktCap!=null&&e.jsx(b,{label:"Market Cap",value:Le(n.mktCap)}),n?.high52!=null&&e.jsx(b,{label:"52w High",value:n.high52.toLocaleString("en-US",{minimumFractionDigits:2})}),n?.low52!=null&&e.jsx(b,{label:"52w Low",value:n.low52.toLocaleString("en-US",{minimumFractionDigits:2})})]}),w&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"stat-divider"}),e.jsx(b,{label:`${t}d High`,value:w.high.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(b,{label:`${t}d Low`,value:w.low.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(b,{label:"Avg Volume",value:(w.avgVol/1e3).toFixed(0)+"K"}),R!=null&&e.jsx(b,{label:"HV 30d Ann.",value:`${R}%`}),i!=null&&e.jsxs("div",{className:"stat-range-bar",children:[e.jsx("span",{className:"stat-range-lo",children:w.low.toLocaleString("en-US",{maximumFractionDigits:0})}),e.jsx("div",{className:"stat-range-track",children:e.jsx("div",{className:"stat-range-fill",style:{left:`${i}%`}})}),e.jsx("span",{className:"stat-range-hi",children:w.high.toLocaleString("en-US",{maximumFractionDigits:0})})]})]})]})]})]}),(z?.length??0)>0&&e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Related News"}),e.jsx("div",{className:"sd-news panel",children:(z??[]).map(a=>e.jsxs("a",{href:a.url,className:"sd-news-item",target:"_blank",rel:"noopener",children:[e.jsx("span",{className:"sd-news-src",children:a.source}),e.jsx("span",{className:"sd-news-headline",children:a.headline})]},a.id))})]}),e.jsx("style",{children:`
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
      `})]})}export{Ue as default};
