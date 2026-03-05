import{j as e,l as B,r as z,e as S,L as W}from"./vendor-9MAh3nQh.js";import{c as P,u as $,E as V,T as q,S as E,p as A}from"./index-DA4_4N8F.js";import{R as C,b as D,C as M,X as U,Y as R,T,B as k,a as y,c as F}from"./recharts-BRfCWRCn.js";import{T as O}from"./trending-down-BZEamqhh.js";import"./store-Dxzhro6a.js";const H=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],_=P("arrow-left",H);function K(s){return new Date(s).toLocaleDateString("en-US",{month:"short",day:"numeric"})}function N(s,o){return`${o} ${s.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`}function I(s,o){return s.map((a,t)=>t<o-1?null:+(s.slice(t-o+1,t+1).reduce((m,d)=>m+d.close,0)/o).toFixed(2))}function X(s,o=20){const a=[],t=[];for(let r=0;r<s.length;r++){if(r<o-1){a.push(null),t.push(null);continue}const m=s.slice(r-o+1,r+1).map(x=>x.close),d=m.reduce((x,h)=>x+h,0)/o,p=Math.sqrt(m.reduce((x,h)=>x+(h-d)**2,0)/o);a.push(+(d+2*p).toFixed(2)),t.push(+(d-2*p).toFixed(2))}return{upper:a,lower:t}}function Y(s){let o=0,a=0;return s.map(t=>t.volume?(o+=(t.high+t.low+t.close)/3*t.volume,a+=t.volume,a>0?+(o/a).toFixed(2):null):null)}function G(s,o=14){const a=[];for(let t=0;t<s.length;t++){if(t<o){a.push(null);continue}let r=0,m=0;for(let p=t-o+1;p<=t;p++){const x=s[p].close-s[p-1].close;x>0?r+=x:m-=x}const d=m===0?100:+(100-100/(1+r/m)).toFixed(1);a.push(d)}return a}function Q({active:s,payload:o,currency:a="USD"}){if(!s||!o?.length)return null;const t=o[0]?.payload;return t?e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"0.5rem 0.75rem",fontSize:11,fontFamily:"var(--font-mono)"},children:[e.jsx("div",{style:{color:"var(--color-text-muted)",marginBottom:4},children:K(t.time)}),[["O",t.open],["H",t.high],["L",t.low],["C",t.close]].map(([r,m])=>{const d=r==="C",p=t.close>=t.open;return e.jsxs("div",{style:{display:"flex",gap:"1rem",justifyContent:"space-between",color:d?p?"var(--color-up)":"var(--color-down)":"var(--color-text-secondary)",fontWeight:d?700:400},children:[e.jsx("span",{children:r}),e.jsx("span",{children:N(m,a)})]},r)}),t.volume>0&&e.jsxs("div",{style:{color:"var(--color-text-muted)",marginTop:4,borderTop:"1px solid var(--color-border-subtle)",paddingTop:4},children:["Vol ",(t.volume/1e3).toFixed(0),"K"]}),t.ma20!=null&&e.jsxs("div",{style:{color:"#60a5fa",marginTop:2},children:["MA20 ",N(t.ma20,a)]}),t.ma50!=null&&e.jsxs("div",{style:{color:"#f59e0b",marginTop:2},children:["MA50 ",N(t.ma50,a)]}),t.rsi!=null&&e.jsxs("div",{style:{color:"#a78bfa",marginTop:2},children:["RSI  ",t.rsi.toFixed(1)]}),t.bbUpperAbs!=null&&t.bbLowerAbs!=null&&e.jsxs("div",{style:{color:"#06b6d4",marginTop:2},children:["BB ",t.bbLowerAbs.toFixed(2),"–",t.bbUpperAbs.toFixed(2)]}),t.vwapAbs!=null&&e.jsxs("div",{style:{color:"#8b5cf6",marginTop:2},children:["VWAP ",N(t.vwapAbs,a)]})]}):null}function J({active:s,payload:o}){if(!s||!o?.length)return null;const a=o[0]?.value;if(a==null)return null;const t=a>=70?"var(--color-down)":a<=30?"var(--color-up)":"#a78bfa";return e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"4px 8px",fontSize:11,fontFamily:"var(--font-mono)",color:t},children:["RSI ",a.toFixed(1),a>=70?" OB":a<=30?" OS":""]})}function Z({data:s,height:o=240,currency:a="USD",indicators:t={}}){if(!s.length)return e.jsx("div",{style:{height:o,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--color-text-muted)",fontSize:12},children:"No chart data"});const r=Math.min(...s.map(n=>n.low))*.999,m=Math.max(...s.map(n=>n.high))*1.001,d=t.ma20?I(s,20):[],p=t.ma50?I(s,50):[],x=t.rsi?G(s):[],h=t.bb?X(s):{upper:[],lower:[]},j=t.vwap?Y(s):[],g=t.rsi&&x.some(n=>n!=null),l=s.map((n,c)=>({...n,date:K(n.time),wickBase:n.low-r,wickRange:n.high-n.low,bodyBase:Math.min(n.open,n.close)-r,bodyRange:Math.abs(n.close-n.open)||.5,...t.ma20&&d[c]!=null?{ma20:d[c]-r,ma20abs:d[c]}:{},...t.ma50&&p[c]!=null?{ma50:p[c]-r,ma50abs:p[c]}:{},...g?{rsi:x[c]}:{},...t.bb&&h.upper[c]!=null?{bbUpper:h.upper[c]-r,bbLower:Math.max(0,h.lower[c]-r),bbUpperAbs:h.upper[c],bbLowerAbs:h.lower[c]}:{},...t.vwap&&j[c]!=null?{vwap:j[c]-r,vwapAbs:j[c]}:{}})),v=g?o-80:o;return e.jsxs("div",{children:[e.jsx(C,{width:"100%",height:v,children:e.jsxs(D,{data:l,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx(M,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(U,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd",hide:g}),e.jsx(R,{domain:[r,m],tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,tickFormatter:n=>(n+r).toLocaleString("en-US",{maximumFractionDigits:0}),width:56,orientation:"right"}),e.jsx(T,{content:e.jsx(Q,{currency:a})}),e.jsx(k,{dataKey:"wickBase",stackId:"wick",fill:"transparent",isAnimationActive:!1}),e.jsx(k,{dataKey:"wickRange",stackId:"wick",fill:"var(--color-text-muted)",opacity:.4,barSize:1,isAnimationActive:!1}),e.jsx(k,{dataKey:"bodyBase",stackId:"body",fill:"transparent",isAnimationActive:!1}),e.jsx(k,{dataKey:"bodyRange",stackId:"body",barSize:Math.max(3,Math.floor(800/s.length)-2),isAnimationActive:!1,fill:"currentColor",shape:n=>{const c=n.payload,f=c.close>=c.open;return e.jsx("rect",{x:n.x+1,y:n.y,width:Math.max(n.width-2,1),height:Math.max(n.height,1),fill:f?"var(--color-up)":"var(--color-down)",rx:1})}}),t.ma20&&e.jsx(y,{type:"monotone",dataKey:"ma20",stroke:"#60a5fa",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0}),t.ma50&&e.jsx(y,{type:"monotone",dataKey:"ma50",stroke:"#f59e0b",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0,strokeDasharray:"4 2"}),t.bb&&e.jsxs(e.Fragment,{children:[e.jsx(y,{type:"monotone",dataKey:"bbUpper",stroke:"#06b6d4",strokeWidth:1,dot:!1,isAnimationActive:!1,connectNulls:!0,strokeDasharray:"3 2"}),e.jsx(y,{type:"monotone",dataKey:"bbLower",stroke:"#06b6d4",strokeWidth:1,dot:!1,isAnimationActive:!1,connectNulls:!0,strokeDasharray:"3 2"})]}),t.vwap&&e.jsx(y,{type:"monotone",dataKey:"vwap",stroke:"#8b5cf6",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0})]})}),g&&e.jsx(C,{width:"100%",height:76,children:e.jsxs(D,{data:l,margin:{top:4,right:4,bottom:0,left:0},children:[e.jsx(M,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(U,{dataKey:"date",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(R,{domain:[0,100],ticks:[30,50,70],tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:30,orientation:"right"}),e.jsx(T,{content:e.jsx(J,{})}),e.jsx(F,{y:70,stroke:"var(--color-down)",strokeDasharray:"2 2",strokeOpacity:.5}),e.jsx(F,{y:30,stroke:"var(--color-up)",strokeDasharray:"2 2",strokeOpacity:.5}),e.jsx(F,{y:50,stroke:"var(--color-border)",strokeOpacity:.4}),e.jsx(y,{type:"monotone",dataKey:"rsi",stroke:"#a78bfa",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0})]})}),(t.ma20||t.ma50||t.bb||t.vwap)&&e.jsxs("div",{style:{display:"flex",gap:"0.75rem",padding:"4px 4px 0",fontSize:10,fontFamily:"var(--font-mono)",flexWrap:"wrap"},children:[t.ma20&&e.jsx("span",{style:{color:"#60a5fa"},children:"─ MA20"}),t.ma50&&e.jsx("span",{style:{color:"#f59e0b"},children:"╌ MA50"}),t.bb&&e.jsx("span",{style:{color:"#06b6d4"},children:"╌ BB(20)"}),t.vwap&&e.jsx("span",{style:{color:"#8b5cf6"},children:"─ VWAP"}),g&&e.jsx("span",{style:{color:"#a78bfa"},children:"─ RSI(14)"})]})]})}const ee=[{label:"1W",days:7},{label:"1M",days:30},{label:"3M",days:90},{label:"6M",days:180},{label:"1Y",days:365}];function b({label:s,value:o}){return e.jsxs("div",{className:"stat-row",children:[e.jsx("span",{className:"stat-label",children:s}),e.jsx("span",{className:"stat-value num",children:o})]})}function le(){const{exchangeId:s="",symbol:o=""}=B(),a=decodeURIComponent(o),[t,r]=z.useState(30),[m,d]=z.useState({}),{symbols:p,add:x,remove:h}=$();function j(i){d(w=>({...w,[i]:!w[i]}))}const g=p.includes(a),{data:l}=S({queryKey:["quote",a],queryFn:()=>A.getQuote(a),staleTime:3e4,refetchInterval:3e4}),{data:v,isLoading:n}=S({queryKey:["history",a,t],queryFn:()=>A.getHistory(a,t),staleTime:6e4}),{data:c}=S({queryKey:["news",a],queryFn:()=>A.getNews?.(a)??Promise.resolve([]),staleTime:5*6e4}),f=(l?.changePct??0)>=0,u=v?.length?{high:Math.max(...v.map(i=>i.high)),low:Math.min(...v.map(i=>i.low)),avgVol:Math.floor(v.reduce((i,w)=>i+w.volume,0)/v.length)}:null,L=u&&l?Math.max(0,Math.min(100,(l.price-u.low)/(u.high-u.low)*100)):null;return e.jsxs("div",{className:"stock-detail",children:[e.jsxs("div",{className:"sd-breadcrumb",children:[e.jsxs(W,{to:`/exchange/${s}`,className:"sd-back",children:[e.jsx(_,{size:12}),s.toUpperCase()]}),e.jsx("span",{className:"sd-sep",children:"/"}),e.jsx("span",{children:a})]}),e.jsxs("div",{className:"sd-header panel",children:[e.jsxs("div",{className:"sd-header-left",children:[e.jsxs("div",{className:"sd-symbol-row",children:[e.jsx("span",{className:"sd-symbol",children:a.replace(`.${s.toUpperCase()}`,"")}),e.jsx(V,{id:s})]}),e.jsx("div",{className:"sd-name",children:l?.name??a}),e.jsxs("div",{className:"sd-price-row",children:[e.jsx("span",{className:"sd-price num",children:l?l.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):"—"}),e.jsx("span",{className:"sd-currency",children:l?.currency??""})]}),e.jsxs("div",{className:"sd-change-row",children:[f?e.jsx(q,{size:13}):e.jsx(O,{size:13}),e.jsx("span",{className:`num ${f?"text-up":"text-down"}`,children:l?(f?"+":"")+l.change.toFixed(2):"—"}),e.jsxs("span",{className:`num sd-pct ${f?"text-up":"text-down"}`,children:["(",l?(f?"+":"")+l.changePct.toFixed(2)+"%":"—",")"]})]})]}),e.jsxs("button",{className:`sd-wl-btn ${g?"sd-wl-active":""}`,onClick:()=>g?h(a):x(a),children:[e.jsx(E,{size:14}),g?"Watching":"Watch"]})]}),e.jsxs("div",{className:"sd-body",children:[e.jsxs("div",{className:"sd-chart-col",children:[e.jsxs("div",{className:"sd-chart-header",children:[e.jsx("span",{className:"section-label",children:"Price History"}),e.jsxs("div",{className:"sd-chart-controls",children:[e.jsx("div",{className:"sd-range-tabs",children:ee.map(i=>e.jsx("button",{className:`sd-range-tab ${t===i.days?"active":""}`,onClick:()=>r(i.days),children:i.label},i.label))}),e.jsx("div",{className:"sd-indicator-tabs",children:["ma20","ma50","bb","vwap","rsi"].map(i=>e.jsx("button",{className:`sd-ind-tab ${m[i]?"active":""}`,onClick:()=>j(i),children:i.toUpperCase()},i))})]})]}),e.jsx("div",{className:"sd-chart panel",children:n?e.jsx("div",{className:"sd-chart-loading",children:"Loading chart…"}):e.jsx(Z,{data:v??[],currency:l?.currency??"USD",height:280,indicators:m})})]}),e.jsxs("div",{className:"sd-stats-col",children:[e.jsx("div",{className:"section-label",children:"Key Stats"}),e.jsxs("div",{className:"sd-stats panel",children:[l&&e.jsxs(e.Fragment,{children:[e.jsx(b,{label:"Last Price",value:l.price.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(b,{label:"Change",value:`${l.change>=0?"+":""}${l.change.toFixed(2)}`}),e.jsx(b,{label:"Change %",value:`${l.changePct>=0?"+":""}${l.changePct.toFixed(2)}%`}),e.jsx(b,{label:"Volume",value:l.volume?(l.volume/1e3).toFixed(0)+"K":"—"}),e.jsx(b,{label:"Currency",value:l.currency}),e.jsx(b,{label:"Exchange",value:l.exchange})]}),u&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"stat-divider"}),e.jsx(b,{label:`${t}d High`,value:u.high.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(b,{label:`${t}d Low`,value:u.low.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(b,{label:"Avg Volume",value:(u.avgVol/1e3).toFixed(0)+"K"}),L!=null&&e.jsxs("div",{className:"stat-range-bar",children:[e.jsx("span",{className:"stat-range-lo",children:u.low.toLocaleString("en-US",{maximumFractionDigits:0})}),e.jsx("div",{className:"stat-range-track",children:e.jsx("div",{className:"stat-range-fill",style:{left:`${L}%`}})}),e.jsx("span",{className:"stat-range-hi",children:u.high.toLocaleString("en-US",{maximumFractionDigits:0})})]})]})]})]})]}),(c?.length??0)>0&&e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Related News"}),e.jsx("div",{className:"sd-news panel",children:(c??[]).map(i=>e.jsxs("a",{href:i.url,className:"sd-news-item",target:"_blank",rel:"noopener",children:[e.jsx("span",{className:"sd-news-src",children:i.source}),e.jsx("span",{className:"sd-news-headline",children:i.headline})]},i.id))})]}),e.jsx("style",{children:`
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
      `})]})}export{le as default};
