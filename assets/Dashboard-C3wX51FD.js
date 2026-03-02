import{j as e,r as f,k as v,e as d}from"./vendor-9MAh3nQh.js";import{u as w,p as c,S as b,X as j,T as y}from"./index-DgRDm8a5.js";import{N,I as z,T as F}from"./NdebelePanel-C_YHhQqb.js";import{F as k}from"./ForexTable-CuCchoPr.js";import{P}from"./plus-FoA__LBu.js";import{T}from"./trending-down-D7xmou1l.js";import"./store-Dxzhro6a.js";import"./Sparkline-Sa5-OsUq.js";function q(r){const o=Date.now()-r,a=Math.floor(o/6e4);if(a<60)return`${a}m`;const t=Math.floor(a/60);return t<24?`${t}h`:`${Math.floor(t/24)}d`}function C({items:r}){return e.jsxs("div",{className:"panel news-feed",children:[r.map(o=>e.jsxs("a",{className:"news-item",href:o.url,target:"_blank",rel:"noopener",children:[e.jsxs("div",{className:"news-meta",children:[e.jsx("span",{className:"news-source",children:o.source}),o.exchange&&e.jsx("span",{className:"news-tag",children:o.exchange}),e.jsx("span",{className:"news-time",children:q(o.publishedAt)})]}),e.jsx("div",{className:"news-headline",children:o.headline})]},o.id)),e.jsx("style",{children:`
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
        .news-time {
          margin-left: auto; font-size: 10px; color: var(--color-text-muted);
          font-family: var(--font-mono);
        }
        .news-headline {
          font-size: 12px; color: var(--color-text-secondary); line-height: 1.45;
        }
        .news-item:hover .news-headline { color: var(--color-text-primary); }
      `})]})}const I=new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});function S(r){return r>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(r):I.format(r)}function A({items:r}){return e.jsxs("div",{className:"comm-table",children:[r.map(o=>e.jsxs("div",{className:"comm-row",children:[e.jsx("div",{className:"comm-name",children:o.name}),e.jsxs("div",{className:"comm-unit",children:["/",o.unit]}),e.jsxs("div",{className:"comm-price",children:["$",S(o.price)]}),e.jsxs("div",{className:`comm-chg ${o.changePct>=0?"up":"down"}`,children:[o.changePct>=0?"+":"",o.changePct.toFixed(2),"%"]})]},o.id)),e.jsx("style",{children:`
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
      `})]})}function D(){const{symbols:r,remove:o}=w(),[a,t]=f.useState(!1),[x,p]=f.useState(""),{add:g}=w(),u=v({queries:r.map(s=>({queryKey:["quote",s],queryFn:()=>c.getQuote(s),staleTime:6e4,refetchInterval:6e4}))});function h(s){s.preventDefault();const i=x.trim().toUpperCase();i&&(g(i),p(""),t(!1))}return e.jsxs("div",{className:"wl-panel",children:[e.jsxs("div",{className:"wl-list",children:[r.length===0&&e.jsx("div",{className:"wl-empty",children:"No symbols — add one below"}),r.map((s,i)=>{const l=u[i]?.data,n=(l?.changePct??0)>=0;return e.jsxs("div",{className:"wl-row",children:[e.jsx(b,{size:10,className:"wl-star"}),e.jsxs("div",{className:"wl-sym-col",children:[e.jsx("span",{className:"wl-sym",children:s}),l?.exchange&&e.jsx("span",{className:"wl-exch",children:l.exchange})]}),e.jsx("div",{className:"wl-price-col",children:l?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"wl-price",children:l.price.toFixed(2)}),e.jsxs("span",{className:`wl-chg ${n?"up":"down"}`,children:[n?"+":"",l.changePct.toFixed(2),"%"]})]}):e.jsx("span",{className:"wl-loading",children:"—"})}),e.jsx("button",{className:"wl-remove",onClick:()=>o(s),title:`Remove ${s}`,"aria-label":`Remove ${s}`,children:e.jsx(j,{size:10})})]},s)})]}),a?e.jsxs("form",{className:"wl-add-form",onSubmit:h,children:[e.jsx("input",{className:"wl-input",value:x,onChange:s=>p(s.target.value),placeholder:"e.g. SCOM.NR",autoFocus:!0}),e.jsx("button",{type:"submit",className:"wl-add-btn",children:"Add"}),e.jsx("button",{type:"button",className:"wl-cancel-btn",onClick:()=>t(!1),children:"✕"})]}):e.jsxs("button",{className:"wl-add-trigger",onClick:()=>t(!0),children:[e.jsx(P,{size:10})," Add symbol"]}),e.jsx("style",{children:`
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
          grid-template-columns: 10px 1fr auto 14px;
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
      `})]})}function _(){const{data:r,isLoading:o}=d({queryKey:["indices","all"],queryFn:()=>c.getIndices?.("all")??Promise.resolve([]),staleTime:6e4}),{data:a,isLoading:t}=d({queryKey:["forex","major"],queryFn:()=>c.getForex?.([])??Promise.resolve([]),staleTime:6e4}),{data:x,isLoading:p}=d({queryKey:["news","dashboard"],queryFn:()=>c.getNews?.("africa")??Promise.resolve([]),staleTime:5*6e4}),{data:g,isLoading:u}=d({queryKey:["commodities"],queryFn:()=>c.getCommodities?.()??Promise.resolve([]),staleTime:6e4}),{data:h,isLoading:s}=d({queryKey:["movers","all"],queryFn:()=>c.getTopMovers?.("all")??Promise.resolve({gainers:[],losers:[]}),staleTime:6e4}),i=r?.filter(n=>n.changePct>=0).length??0,l=(r?.length??0)-i;return e.jsxs("div",{className:"dashboard",children:[e.jsx("div",{className:"dash-header",children:e.jsxs("div",{className:"dash-title-row",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"dash-title",children:"African Markets"}),e.jsx("p",{className:"dash-subtitle",children:new Intl.DateTimeFormat("en-ZA",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(new Date)})]}),!o&&e.jsxs("div",{className:"dash-sentiment",children:[e.jsxs("span",{className:"sentiment-item up",children:[e.jsx(y,{size:13})," ",i," up"]}),e.jsxs("span",{className:"sentiment-item down",children:[e.jsx(T,{size:13})," ",l," down"]})]}),e.jsx(N,{width:80,height:80,opacity:.08,style:{position:"absolute",right:0,top:0}})]})}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Indices"}),o?e.jsx(M,{count:5}):e.jsx("div",{className:"idx-strip",children:r?.map(n=>e.jsx(z,{index:n},n.id))})]}),e.jsxs("div",{className:"dash-grid-3",children:[e.jsxs("div",{className:"dash-col",children:[e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Top Movers"}),s?e.jsx(m,{height:180}):e.jsx(F,{gainers:h?.gainers??[],losers:h?.losers??[]})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Watchlist"}),e.jsx(D,{})]})]}),e.jsxs("div",{className:"dash-col",children:[e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Forex Rates"}),t?e.jsx(m,{height:180}):e.jsx(k,{rates:a??[]})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Commodities"}),u?e.jsx(m,{height:200}):e.jsx(A,{items:g??[]})]})]}),e.jsx("div",{className:"dash-col",children:e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Latest News"}),p?e.jsx(m,{height:400}):e.jsx(C,{items:x??[]})]})})]}),e.jsx("style",{children:`
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
          .dash-grid-3 { grid-template-columns: 1fr; }
        }
      `})]})}function M({count:r}){return e.jsx("div",{style:{display:"flex",gap:"0.75rem"},children:Array.from({length:r}).map((o,a)=>e.jsx(m,{width:160,height:110},a))})}function m({width:r,height:o}){return e.jsx("div",{style:{width:r??"100%",height:o,background:"var(--color-bg-tertiary)",borderRadius:4,animation:"pulse 1.5s ease-in-out infinite"}})}export{_ as default};
