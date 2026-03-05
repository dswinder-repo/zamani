import{j as e,r as b,k as y,e as c}from"./vendor-9MAh3nQh.js";import{u as j,p as d,S as z,X as F,g as q,T as P,a as S}from"./index-Dq8V_bUD.js";import{N as T,I as C,T as D}from"./NdebelePanel-C_YHhQqb.js";import{F as I}from"./ForexTable-CuCchoPr.js";import{S as M}from"./Sparkline-Sa5-OsUq.js";import{P as R}from"./plus-zrjx2Pzz.js";import{T as A}from"./trending-down-CxdhOZdR.js";import"./store-Dxzhro6a.js";const L=["surge","jump","gain","rise","record","profit","growth","strong","beat","higher","boost","rally","soar","climb","outperform","upgrade","buy"],$=["drop","fall","plunge","lose","decline","loss","weak","miss","lower","cut","recession","crash","sell-off","downgrade","warning","risk","concern"];function K(o){const r=o.toLowerCase();return L.some(s=>r.includes(s))?"pos":$.some(s=>r.includes(s))?"neg":null}function U(o){const r=Date.now()-o,s=Math.floor(r/6e4);if(s<60)return`${s}m`;const n=Math.floor(s/60);return n<24?`${n}h`:`${Math.floor(n/24)}d`}function O({items:o}){return e.jsxs("div",{className:"panel news-feed",children:[o.map(r=>{const s=K(r.headline);return e.jsxs("a",{className:"news-item",href:r.url,target:"_blank",rel:"noopener",children:[e.jsxs("div",{className:"news-meta",children:[e.jsx("span",{className:"news-source",children:r.source}),r.exchange&&e.jsx("span",{className:"news-tag",children:r.exchange}),s==="pos"&&e.jsx("span",{className:"news-sent pos",children:"▲"}),s==="neg"&&e.jsx("span",{className:"news-sent neg",children:"▼"}),e.jsx("span",{className:"news-time",children:U(r.publishedAt)})]}),e.jsx("div",{className:"news-headline",children:r.headline})]},r.id)}),e.jsx("style",{children:`
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
      `})]})}const W=new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});function E(o){return o>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(o):W.format(o)}function G({items:o}){return e.jsxs("div",{className:"comm-table",children:[o.map(r=>e.jsxs("div",{className:"comm-row",children:[e.jsx("div",{className:"comm-name",children:r.name}),e.jsxs("div",{className:"comm-unit",children:["/",r.unit]}),e.jsxs("div",{className:"comm-price",children:["$",E(r.price)]}),e.jsxs("div",{className:`comm-chg ${r.changePct>=0?"up":"down"}`,children:[r.changePct>=0?"+":"",r.changePct.toFixed(2),"%"]})]},r.id)),e.jsx("style",{children:`
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
      `})]})}function _(){const{symbols:o,remove:r}=j(),[s,n]=b.useState(!1),[m,x]=b.useState(""),{add:g}=j(),h=y({queries:o.map(a=>({queryKey:["quote",a],queryFn:()=>d.getQuote(a),staleTime:6e4,refetchInterval:6e4}))}),i=y({queries:o.map(a=>({queryKey:["history",a,30],queryFn:()=>d.getHistory(a,30),staleTime:5*6e4}))});function u(a){a.preventDefault();const l=m.trim().toUpperCase();l&&(g(l),x(""),n(!1))}return e.jsxs("div",{className:"wl-panel",children:[e.jsxs("div",{className:"wl-list",children:[o.length===0&&e.jsx("div",{className:"wl-empty",children:"No symbols — add one below"}),o.map((a,l)=>{const t=h[l]?.data,N=i[l]?.data,f=(t?.changePct??0)>=0,w=N?.map(k=>k.close)??[];return e.jsxs("div",{className:"wl-row",children:[e.jsx(z,{size:10,className:"wl-star"}),e.jsxs("div",{className:"wl-sym-col",children:[e.jsx("span",{className:"wl-sym",children:a}),t?.exchange&&e.jsx("span",{className:"wl-exch",children:t.exchange})]}),w.length>=5&&e.jsx("div",{className:"wl-spark",children:e.jsx(M,{data:w,up:f,height:24,width:56})}),e.jsx("div",{className:"wl-price-col",children:t?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"wl-price",children:t.price.toFixed(2)}),e.jsxs("span",{className:`wl-chg ${f?"up":"down"}`,children:[f?"+":"",t.changePct.toFixed(2),"%"]})]}):e.jsx("span",{className:"wl-loading",children:"—"})}),e.jsx("button",{className:"wl-remove",onClick:()=>r(a),title:`Remove ${a}`,"aria-label":`Remove ${a}`,children:e.jsx(F,{size:10})})]},a)})]}),s?e.jsxs("form",{className:"wl-add-form",onSubmit:u,children:[e.jsx("input",{className:"wl-input",value:m,onChange:a=>x(a.target.value),placeholder:"e.g. SCOM.NR",autoFocus:!0}),e.jsx("button",{type:"submit",className:"wl-add-btn",children:"Add"}),e.jsx("button",{type:"button",className:"wl-cancel-btn",onClick:()=>n(!1),children:"✕"})]}):e.jsxs("button",{className:"wl-add-trigger",onClick:()=>n(!0),children:[e.jsx(R,{size:10})," Add symbol"]}),e.jsx("style",{children:`
        .wl-panel { display: flex; flex-direction: column; gap: 0.5rem; }
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
          width: 100%;
          justify-content: center;
          transition: color 0.15s, border-color 0.15s;
        }
        .wl-add-trigger:hover {
          color: var(--color-gold);
          border-color: var(--color-gold);
        }

        .wl-add-form {
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
        }
        .wl-add-btn:hover    { border-color: var(--color-gold); color: var(--color-gold); }
        .wl-cancel-btn:hover { border-color: var(--color-down); color: var(--color-down); }
      `})]})}function Q(o){return o.id==="us10y"?o.value.toFixed(2)+"%":o.id==="vix"||o.id==="dxy"?o.value.toFixed(2):o.value>=1e4?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(o.value):o.value>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:1}).format(o.value):o.value.toFixed(2)}function B({m:o}){const r=o.id==="vix"?o.changePct<=0:o.changePct>=0,s=o.changePct>=0?"+":"";return e.jsxs("div",{className:"gm-item",children:[e.jsx("span",{className:"gm-name",children:o.name}),e.jsx("span",{className:"gm-value",children:Q(o)}),e.jsxs("span",{className:`gm-pct ${r?"up":"down"}`,children:[s,o.changePct.toFixed(2),"%"]})]})}function H(){const{data:o}=c({queryKey:["global-markets"],queryFn:q,staleTime:6e4,refetchInterval:6e4});return o?.length?e.jsxs("div",{className:"gm-bar",children:[e.jsx("div",{className:"gm-label",children:"GLOBAL"}),e.jsx("div",{className:"gm-scroll",children:o.map(r=>e.jsx(B,{m:r},r.id))}),e.jsx("style",{children:`
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
      `})]}):null}function ae(){const{data:o,isLoading:r}=c({queryKey:["indices","all"],queryFn:()=>d.getIndices?.("all")??Promise.resolve([]),staleTime:6e4}),{data:s,isLoading:n}=c({queryKey:["forex","major"],queryFn:()=>S(),staleTime:6e4}),{data:m,isLoading:x}=c({queryKey:["news","dashboard"],queryFn:()=>d.getNews?.("africa")??Promise.resolve([]),staleTime:5*6e4}),{data:g,isLoading:h}=c({queryKey:["commodities"],queryFn:()=>d.getCommodities?.()??Promise.resolve([]),staleTime:6e4}),{data:i,isLoading:u}=c({queryKey:["movers","all"],queryFn:()=>d.getTopMovers?.("all")??Promise.resolve({gainers:[],losers:[]}),staleTime:6e4}),a=o?.filter(t=>t.changePct>=0).length??0,l=(o?.length??0)-a;return e.jsxs("div",{className:"dashboard",children:[e.jsx("div",{className:"dash-header",children:e.jsxs("div",{className:"dash-title-row",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"dash-title",children:"African Markets"}),e.jsx("p",{className:"dash-subtitle",children:new Intl.DateTimeFormat("en-ZA",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(new Date)})]}),!r&&e.jsxs("div",{className:"dash-sentiment",children:[e.jsxs("span",{className:"sentiment-item up",children:[e.jsx(P,{size:13})," ",a," up"]}),e.jsxs("span",{className:"sentiment-item down",children:[e.jsx(A,{size:13})," ",l," down"]})]}),e.jsx(T,{width:80,height:80,opacity:.08,style:{position:"absolute",right:0,top:0}})]})}),e.jsx(H,{}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Indices"}),r?e.jsx(V,{count:5}):e.jsx("div",{className:"idx-strip",children:o?.map(t=>e.jsx(C,{index:t},t.id))})]}),e.jsxs("div",{className:"dash-grid-3",children:[e.jsxs("div",{className:"dash-col",children:[e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Top Movers"}),u?e.jsx(p,{height:180}):(i?.gainers.length??0)+(i?.losers.length??0)>0?e.jsx(D,{gainers:i?.gainers??[],losers:i?.losers??[]}):e.jsx(v,{message:"Movers data not available"})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Watchlist"}),e.jsx(_,{})]})]}),e.jsxs("div",{className:"dash-col",children:[e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Forex Rates"}),n?e.jsx(p,{height:180}):e.jsx(I,{rates:s??[]})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Commodities"}),h?e.jsx(p,{height:200}):(g?.length??0)>0?e.jsx(G,{items:g??[]}):e.jsx(v,{message:"Commodity data unavailable"})]})]}),e.jsx("div",{className:"dash-col",children:e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Latest News"}),x?e.jsx(p,{height:400}):(m?.length??0)>0?e.jsx(O,{items:m??[]}):e.jsx(v,{message:"Live news feed not yet connected"})]})})]}),e.jsx("style",{children:`
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
          margin-left: auto; padding-right: 1rem;
        }
        .sentiment-item {
          display: flex; align-items: center; gap: 0.25rem;
          font-size: 12px; font-family: var(--font-mono);
        }
        .sentiment-item.up   { color: var(--color-up); }
        .sentiment-item.down { color: var(--color-down); }

        .dash-section   { display: flex; flex-direction: column; gap: 0.5rem; }
        .section-label  {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600;
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
      `})]})}function v({message:o}){return e.jsx("div",{style:{padding:"1.25rem 0.75rem",fontSize:"11px",color:"var(--color-text-muted)",textAlign:"center",border:"1px dashed var(--color-border)",borderRadius:4},children:o})}function V({count:o}){return e.jsx("div",{style:{display:"flex",gap:"0.75rem"},children:Array.from({length:o}).map((r,s)=>e.jsx(p,{width:160,height:110},s))})}function p({width:o,height:r}){return e.jsx("div",{style:{width:o??"100%",height:r,background:"var(--color-bg-tertiary)",borderRadius:4,animation:"pulse 1.5s ease-in-out infinite"}})}export{ae as default};
