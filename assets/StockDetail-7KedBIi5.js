import{j as e,l as N,r as k,e as v,L as S}from"./vendor-9MAh3nQh.js";import{c as z,u as F,E as L,T as C,S as D,p as b}from"./index-Boqm83OZ.js";import{R as U,C as A,a as M,X as T,Y as $,T as K,B as u,L as R}from"./recharts-Bc8jWMle.js";import{T as P}from"./trending-down-CV83Evls.js";import"./store-Dxzhro6a.js";const B=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],I=z("arrow-left",B);function y(s){return new Date(s).toLocaleDateString("en-US",{month:"short",day:"numeric"})}function q(s,l){return`${l} ${s.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`}function W({active:s,payload:l,currency:r="USD"}){if(!s||!l?.length)return null;const o=l[0]?.payload;return o?e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"0.5rem 0.75rem",fontSize:11,fontFamily:"var(--font-mono)"},children:[e.jsx("div",{style:{color:"var(--color-text-muted)",marginBottom:4},children:y(o.time)}),[["O",o.open],["H",o.high],["L",o.low],["C",o.close]].map(([i,h])=>{const d=i==="C",a=o.close>=o.open;return e.jsxs("div",{style:{display:"flex",gap:"1rem",justifyContent:"space-between",color:d?a?"var(--color-up)":"var(--color-down)":"var(--color-text-secondary)",fontWeight:d?700:400},children:[e.jsx("span",{children:i}),e.jsx("span",{children:q(Number(h),r)})]},String(i))}),o.volume>0&&e.jsxs("div",{style:{color:"var(--color-text-muted)",marginTop:4,borderTop:"1px solid var(--color-border-subtle)",paddingTop:4},children:["Vol ",(o.volume/1e3).toFixed(0),"K"]})]}):null}function E({data:s,height:l=240,currency:r="USD"}){if(!s.length)return e.jsx("div",{style:{height:l,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--color-text-muted)",fontSize:12},children:"No chart data"});const o=a=>a.close>=a.open,i=Math.min(...s.map(a=>a.low))*.999,h=Math.max(...s.map(a=>a.high))*1.001,d=s.map(a=>({...a,date:y(a.time),wickBase:a.low-i,wickRange:a.high-a.low,bodyBase:Math.min(a.open,a.close)-i,bodyRange:Math.abs(a.close-a.open)||.5,color:o(a)?"var(--color-up)":"var(--color-down)"}));return e.jsx(U,{width:"100%",height:l,children:e.jsxs(A,{data:d,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx(M,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(T,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx($,{domain:[i,h],tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,tickFormatter:a=>(a+i).toLocaleString("en-US",{maximumFractionDigits:0}),width:56,orientation:"right"}),e.jsx(K,{content:e.jsx(W,{currency:r})}),e.jsx(u,{dataKey:"wickBase",stackId:"wick",fill:"transparent",isAnimationActive:!1}),e.jsx(u,{dataKey:"wickRange",stackId:"wick",fill:"var(--color-text-muted)",opacity:.4,barSize:1,isAnimationActive:!1}),e.jsx(u,{dataKey:"bodyBase",stackId:"body",fill:"transparent",isAnimationActive:!1}),e.jsx(u,{dataKey:"bodyRange",stackId:"body",barSize:Math.max(3,Math.floor(800/s.length)-2),isAnimationActive:!1,fill:"currentColor",shape:a=>{const m=a.payload,t=m.close>=m.open;return e.jsx("rect",{x:a.x+1,y:a.y,width:Math.max(a.width-2,1),height:Math.max(a.height,1),fill:t?"var(--color-up)":"var(--color-down)",rx:1})}}),e.jsx(R,{type:"monotone",dataKey:"close",stroke:"var(--color-gold)",strokeWidth:1,dot:!1,isAnimationActive:!1,strokeOpacity:0})]})})}const V=[{label:"1W",days:7},{label:"1M",days:30},{label:"3M",days:90},{label:"6M",days:180},{label:"1Y",days:365}];function c({label:s,value:l}){return e.jsxs("div",{className:"stat-row",children:[e.jsx("span",{className:"stat-label",children:s}),e.jsx("span",{className:"stat-value num",children:l})]})}function Q(){const{exchangeId:s="",symbol:l=""}=N(),r=decodeURIComponent(l),[o,i]=k.useState(30),{symbols:h,add:d,remove:a}=F(),m=h.includes(r),{data:t}=v({queryKey:["quote",r],queryFn:()=>b.getQuote(r),staleTime:3e4,refetchInterval:3e4}),{data:x,isLoading:j}=v({queryKey:["history",r,o],queryFn:()=>b.getHistory(r,o),staleTime:6e4}),{data:f}=v({queryKey:["news",r],queryFn:()=>b.getNews?.(r)??Promise.resolve([]),staleTime:5*6e4}),p=(t?.changePct??0)>=0,g=x?.length?{high52:Math.max(...x.map(n=>n.high)),low52:Math.min(...x.map(n=>n.low)),avgVol:Math.floor(x.reduce((n,w)=>n+w.volume,0)/x.length)}:null;return e.jsxs("div",{className:"stock-detail",children:[e.jsxs("div",{className:"sd-breadcrumb",children:[e.jsxs(S,{to:`/exchange/${s}`,className:"sd-back",children:[e.jsx(I,{size:12}),s.toUpperCase()]}),e.jsx("span",{className:"sd-sep",children:"/"}),e.jsx("span",{children:r})]}),e.jsxs("div",{className:"sd-header panel",children:[e.jsxs("div",{className:"sd-header-left",children:[e.jsxs("div",{className:"sd-symbol-row",children:[e.jsx("span",{className:"sd-symbol",children:r.replace(`.${s.toUpperCase()}`,"")}),e.jsx(L,{id:s})]}),e.jsx("div",{className:"sd-name",children:t?.name??r}),e.jsxs("div",{className:"sd-price-row",children:[e.jsx("span",{className:"sd-price num",children:t?t.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):"—"}),e.jsx("span",{className:"sd-currency",children:t?.currency??""})]}),e.jsxs("div",{className:"sd-change-row",children:[p?e.jsx(C,{size:13}):e.jsx(P,{size:13}),e.jsx("span",{className:`num ${p?"text-up":"text-down"}`,children:t?(p?"+":"")+t.change.toFixed(2):"—"}),e.jsxs("span",{className:`num sd-pct ${p?"text-up":"text-down"}`,children:["(",t?(p?"+":"")+t.changePct.toFixed(2)+"%":"—",")"]})]})]}),e.jsxs("button",{className:`sd-wl-btn ${m?"sd-wl-active":""}`,onClick:()=>m?a(r):d(r),children:[e.jsx(D,{size:14}),m?"Watching":"Watch"]})]}),e.jsxs("div",{className:"sd-body",children:[e.jsxs("div",{className:"sd-chart-col",children:[e.jsxs("div",{className:"sd-chart-header",children:[e.jsx("span",{className:"section-label",children:"Price History"}),e.jsx("div",{className:"sd-range-tabs",children:V.map(n=>e.jsx("button",{className:`sd-range-tab ${o===n.days?"active":""}`,onClick:()=>i(n.days),children:n.label},n.label))})]}),e.jsx("div",{className:"sd-chart panel",children:j?e.jsx("div",{className:"sd-chart-loading",children:"Loading chart…"}):e.jsx(E,{data:x??[],currency:t?.currency??"USD",height:280})})]}),e.jsxs("div",{className:"sd-stats-col",children:[e.jsx("div",{className:"section-label",children:"Key Stats"}),e.jsxs("div",{className:"sd-stats panel",children:[t&&e.jsxs(e.Fragment,{children:[e.jsx(c,{label:"Last Price",value:t.price.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(c,{label:"Change",value:`${t.change>=0?"+":""}${t.change.toFixed(2)}`}),e.jsx(c,{label:"Change %",value:`${t.changePct>=0?"+":""}${t.changePct.toFixed(2)}%`}),e.jsx(c,{label:"Volume",value:t.volume?(t.volume/1e3).toFixed(0)+"K":"—"}),e.jsx(c,{label:"Currency",value:t.currency}),e.jsx(c,{label:"Exchange",value:t.exchange})]}),g&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"stat-divider"}),e.jsx(c,{label:`${o}d High`,value:g.high52.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(c,{label:`${o}d Low`,value:g.low52.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsx(c,{label:"Avg Volume",value:(g.avgVol/1e3).toFixed(0)+"K"})]})]})]})]}),(f?.length??0)>0&&e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Related News"}),e.jsx("div",{className:"sd-news panel",children:(f??[]).map(n=>e.jsxs("a",{href:n.url,className:"sd-news-item",target:"_blank",rel:"noopener",children:[e.jsx("span",{className:"sd-news-src",children:n.source}),e.jsx("span",{className:"sd-news-headline",children:n.headline})]},n.id))})]}),e.jsx("style",{children:`
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
      `})]})}export{Q as default};
