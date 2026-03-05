import{j as e,l as $,r as C,e as w,L as P}from"./vendor-9MAh3nQh.js";import{c as B,u as W,E as q,T as E,S as O,p as k}from"./index-Dq8V_bUD.js";import{R as A,C as D,a as M,X as R,Y as I,T,B as y,L as N,b as S}from"./recharts-B7xQhVh9.js";import{T as V}from"./trending-down-CxdhOZdR.js";import"./store-Dxzhro6a.js";const H=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],_=B("arrow-left",H);function K(s){return new Date(s).toLocaleDateString("en-US",{month:"short",day:"numeric"})}function F(s,l){return`${l} ${s.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`}function U(s,l){return s.map((o,a)=>a<l-1?null:+(s.slice(a-l+1,a+1).reduce((c,d)=>c+d.close,0)/l).toFixed(2))}function X(s,l=14){const o=[];for(let a=0;a<s.length;a++){if(a<l){o.push(null);continue}let i=0,c=0;for(let m=a-l+1;m<=a;m++){const p=s[m].close-s[m-1].close;p>0?i+=p:c-=p}const d=c===0?100:+(100-100/(1+i/c)).toFixed(1);o.push(d)}return o}function Y({active:s,payload:l,currency:o="USD"}){if(!s||!l?.length)return null;const a=l[0]?.payload;return a?e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"0.5rem 0.75rem",fontSize:11,fontFamily:"var(--font-mono)"},children:[e.jsx("div",{style:{color:"var(--color-text-muted)",marginBottom:4},children:K(a.time)}),[["O",a.open],["H",a.high],["L",a.low],["C",a.close]].map(([i,c])=>{const d=i==="C",m=a.close>=a.open;return e.jsxs("div",{style:{display:"flex",gap:"1rem",justifyContent:"space-between",color:d?m?"var(--color-up)":"var(--color-down)":"var(--color-text-secondary)",fontWeight:d?700:400},children:[e.jsx("span",{children:i}),e.jsx("span",{children:F(c,o)})]},i)}),a.volume>0&&e.jsxs("div",{style:{color:"var(--color-text-muted)",marginTop:4,borderTop:"1px solid var(--color-border-subtle)",paddingTop:4},children:["Vol ",(a.volume/1e3).toFixed(0),"K"]}),a.ma20!=null&&e.jsxs("div",{style:{color:"#60a5fa",marginTop:2},children:["MA20 ",F(a.ma20,o)]}),a.ma50!=null&&e.jsxs("div",{style:{color:"#f59e0b",marginTop:2},children:["MA50 ",F(a.ma50,o)]}),a.rsi!=null&&e.jsxs("div",{style:{color:"#a78bfa",marginTop:2},children:["RSI  ",a.rsi.toFixed(1)]})]}):null}function G({active:s,payload:l}){if(!s||!l?.length)return null;const o=l[0]?.value;if(o==null)return null;const a=o>=70?"var(--color-down)":o<=30?"var(--color-up)":"#a78bfa";return e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"4px 8px",fontSize:11,fontFamily:"var(--font-mono)",color:a},children:["RSI ",o.toFixed(1),o>=70?" OB":o<=30?" OS":""]})}function Q({data:s,height:l=240,currency:o="USD",indicators:a={}}){if(!s.length)return e.jsx("div",{style:{height:l,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--color-text-muted)",fontSize:12},children:"No chart data"});const i=Math.min(...s.map(t=>t.low))*.999,c=Math.max(...s.map(t=>t.high))*1.001,d=a.ma20?U(s,20):[],m=a.ma50?U(s,50):[],p=a.rsi?X(s):[],g=a.rsi&&p.some(t=>t!=null),f=s.map((t,n)=>({...t,date:K(t.time),wickBase:t.low-i,wickRange:t.high-t.low,bodyBase:Math.min(t.open,t.close)-i,bodyRange:Math.abs(t.close-t.open)||.5,...a.ma20&&d[n]!=null?{ma20:d[n]-i,ma20abs:d[n]}:{},...a.ma50&&m[n]!=null?{ma50:m[n]-i,ma50abs:m[n]}:{},...g?{rsi:p[n]}:{}})),u=g?l-80:l;return e.jsxs("div",{children:[e.jsx(A,{width:"100%",height:u,children:e.jsxs(D,{data:f,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx(M,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(R,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd",hide:g}),e.jsx(I,{domain:[i,c],tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,tickFormatter:t=>(t+i).toLocaleString("en-US",{maximumFractionDigits:0}),width:56,orientation:"right"}),e.jsx(T,{content:e.jsx(Y,{currency:o})}),e.jsx(y,{dataKey:"wickBase",stackId:"wick",fill:"transparent",isAnimationActive:!1}),e.jsx(y,{dataKey:"wickRange",stackId:"wick",fill:"var(--color-text-muted)",opacity:.4,barSize:1,isAnimationActive:!1}),e.jsx(y,{dataKey:"bodyBase",stackId:"body",fill:"transparent",isAnimationActive:!1}),e.jsx(y,{dataKey:"bodyRange",stackId:"body",barSize:Math.max(3,Math.floor(800/s.length)-2),isAnimationActive:!1,fill:"currentColor",shape:t=>{const n=t.payload,j=n.close>=n.open;return e.jsx("rect",{x:t.x+1,y:t.y,width:Math.max(t.width-2,1),height:Math.max(t.height,1),fill:j?"var(--color-up)":"var(--color-down)",rx:1})}}),a.ma20&&e.jsx(N,{type:"monotone",dataKey:"ma20",stroke:"#60a5fa",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0}),a.ma50&&e.jsx(N,{type:"monotone",dataKey:"ma50",stroke:"#f59e0b",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0,strokeDasharray:"4 2"})]})}),g&&e.jsx(A,{width:"100%",height:76,children:e.jsxs(D,{data:f,margin:{top:4,right:4,bottom:0,left:0},children:[e.jsx(M,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(R,{dataKey:"date",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(I,{domain:[0,100],ticks:[30,50,70],tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:30,orientation:"right"}),e.jsx(T,{content:e.jsx(G,{})}),e.jsx(S,{y:70,stroke:"var(--color-down)",strokeDasharray:"2 2",strokeOpacity:.5}),e.jsx(S,{y:30,stroke:"var(--color-up)",strokeDasharray:"2 2",strokeOpacity:.5}),e.jsx(S,{y:50,stroke:"var(--color-border)",strokeOpacity:.4}),e.jsx(N,{type:"monotone",dataKey:"rsi",stroke:"#a78bfa",strokeWidth:1.5,dot:!1,isAnimationActive:!1,connectNulls:!0})]})}),(a.ma20||a.ma50)&&e.jsxs("div",{style:{display:"flex",gap:"0.75rem",padding:"4px 4px 0",fontSize:10,fontFamily:"var(--font-mono)"},children:[a.ma20&&e.jsx("span",{style:{color:"#60a5fa"},children:"─ MA20"}),a.ma50&&e.jsx("span",{style:{color:"#f59e0b"},children:"╌ MA50"}),g&&e.jsx("span",{style:{color:"#a78bfa"},children:"─ RSI(14)"})]})]})}const J=[{label:"1W",days:7},{label:"1M",days:30},{label:"3M",days:90},{label:"6M",days:180},{label:"1Y",days:365}];function h({label:s,value:l}){return e.jsxs("div",{className:"stat-row",children:[e.jsx("span",{className:"stat-label",children:s}),e.jsx("span",{className:"stat-value num",children:l})]})}function oe(){const{exchangeId:s="",symbol:l=""}=$(),o=decodeURIComponent(l),[a,i]=C.useState(30),[c,d]=C.useState({}),{symbols:m,add:p,remove:g}=W();function f(r){d(b=>({...b,[r]:!b[r]}))}const u=m.includes(o),{data:t}=w({queryKey:["quote",o],queryFn:()=>k.getQuote(o),staleTime:3e4,refetchInterval:3e4}),{data:n,isLoading:j}=w({queryKey:["history",o,a],queryFn:()=>k.getHistory(o,a),staleTime:6e4}),{data:z}=w({queryKey:["news",o],queryFn:()=>k.getNews?.(o)??Promise.resolve([]),staleTime:5*6e4}),v=(t?.changePct??0)>=0,x=n?.length?{high:Math.max(...n.map(r=>r.high)),low:Math.min(...n.map(r=>r.low)),avgVol:Math.floor(n.reduce((r,b)=>r+b.volume,0)/n.length)}:null,L=x&&t?Math.max(0,Math.min(100,(t.price-x.low)/(x.high-x.low)*100)):null;return e.jsxs("div",{className:"stock-detail",children:[e.jsxs("div",{className:"sd-breadcrumb",children:[e.jsxs(P,{to:`/exchange/${s}`,className:"sd-back",children:[e.jsx(_,{size:12}),s.toUpperCase()]}),e.jsx("span",{className:"sd-sep",children:"/"}),e.jsx("span",{children:o})]}),e.jsxs("div",{className:"sd-header panel",children:[e.jsxs("div",{className:"sd-header-left",children:[e.jsxs("div",{className:"sd-symbol-row",children:[e.jsx("span",{className:"sd-symbol",children:o.replace(`.${s.toUpperCase()}`,"")}),e.jsx(q,{id:s})]}),e.jsx("div",{className:"sd-name",children:t?.name??o}),e.jsxs("div",{className:"sd-price-row",children:[e.jsx("span",{className:"sd-price num",children:t?t.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):"—"}),e.jsx("span",{className:"sd-currency",children:t?.currency??""})]}),e.jsxs("div",{className:"sd-change-row",children:[v?e.jsx(E,{size:13}):e.jsx(V,{size:13}),e.jsx("span",{className:`num ${v?"text-up":"text-down"}`,children:t?(v?"+":"")+t.change.toFixed(2):"—"}),e.jsxs("span",{className:`num sd-pct ${v?"text-up":"text-down"}`,children:["(",t?(v?"+":"")+t.changePct.toFixed(2)+"%":"—",")"]})]})]}),e.jsxs("button",{className:`sd-wl-btn ${u?"sd-wl-active":""}`,onClick:()=>u?g(o):p(o),children:[e.jsx(O,{size:14}),u?"Watching":"Watch"]})]}),e.jsxs("div",{className:"sd-body",children:[e.jsxs("div",{className:"sd-chart-col",children:[e.jsxs("div",{className:"sd-chart-header",children:[e.jsx("span",{className:"section-label",children:"Price History"}),e.jsxs("div",{className:"sd-chart-controls",children:[e.jsx("div",{className:"sd-range-tabs",children:J.map(r=>e.jsx("button",{className:`sd-range-tab ${a===r.days?"active":""}`,onClick:()=>i(r.days),children:r.label},r.label))}),e.jsx("div",{className:"sd-indicator-tabs",children:["ma20","ma50","rsi"].map(r=>e.jsx("button",{className:`sd-ind-tab ${c[r]?"active":""}`,onClick:()=>f(r),children:r.toUpperCase()},r))})]})]}),e.jsx("div",{className:"sd-chart panel",children:j?e.jsx("div",{className:"sd-chart-loading",children:"Loading chart…"}):e.jsx(Q,{data:n??[],currency:t?.currency??"USD",height:280,indicators:c})})]}),e.jsxs("div",{className:"sd-stats-col",children:[e.jsx("div",{className:"section-label",children:"Key Stats"}),e.jsxs("div",{className:"sd-stats panel",children:[t&&e.jsxs(e.Fragment,{children:[e.jsx(h,{label:"Last Price",value:t.price.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(h,{label:"Change",value:`${t.change>=0?"+":""}${t.change.toFixed(2)}`}),e.jsx(h,{label:"Change %",value:`${t.changePct>=0?"+":""}${t.changePct.toFixed(2)}%`}),e.jsx(h,{label:"Volume",value:t.volume?(t.volume/1e3).toFixed(0)+"K":"—"}),e.jsx(h,{label:"Currency",value:t.currency}),e.jsx(h,{label:"Exchange",value:t.exchange})]}),x&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"stat-divider"}),e.jsx(h,{label:`${a}d High`,value:x.high.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(h,{label:`${a}d Low`,value:x.low.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(h,{label:"Avg Volume",value:(x.avgVol/1e3).toFixed(0)+"K"}),L!=null&&e.jsxs("div",{className:"stat-range-bar",children:[e.jsx("span",{className:"stat-range-lo",children:x.low.toLocaleString("en-US",{maximumFractionDigits:0})}),e.jsx("div",{className:"stat-range-track",children:e.jsx("div",{className:"stat-range-fill",style:{left:`${L}%`}})}),e.jsx("span",{className:"stat-range-hi",children:x.high.toLocaleString("en-US",{maximumFractionDigits:0})})]})]})]})]})]}),(z?.length??0)>0&&e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Related News"}),e.jsx("div",{className:"sd-news panel",children:(z??[]).map(r=>e.jsxs("a",{href:r.url,className:"sd-news-item",target:"_blank",rel:"noopener",children:[e.jsx("span",{className:"sd-news-src",children:r.source}),e.jsx("span",{className:"sd-news-headline",children:r.headline})]},r.id))})]}),e.jsx("style",{children:`
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
      `})]})}export{oe as default};
