import{r as u,k as g,j as e,L as h}from"./vendor-9MAh3nQh.js";import{u as w,p as f,a as v,S as y,X as b}from"./index-p1Nft5WN.js";import{S as j}from"./Sparkline-Sa5-OsUq.js";import{P as N}from"./plus-8LM81lBQ.js";import"./store-Dxzhro6a.js";function F(){const{symbols:l,add:d,remove:c}=w(),[t,i]=u.useState(""),m=g({queries:l.map(r=>({queryKey:["quote",r],queryFn:()=>f.getQuote(r),staleTime:3e4,refetchInterval:3e4}))});function n(){const r=t.trim().toUpperCase();r&&!l.includes(r)&&(d(r),i(""))}return e.jsxs("div",{className:"wl-page",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"wl-h1",children:"Watchlist"}),e.jsx("p",{className:"wl-sub",children:"Your tracked securities — live quotes, refreshed every 30s"})]}),e.jsxs("div",{className:"wl-add-row",children:[e.jsx(v,{size:12,style:{color:"var(--color-text-muted)",flexShrink:0}}),e.jsx("input",{className:"wl-add-input",placeholder:"Add symbol (e.g. NPN, SCOM)",value:t,onChange:r=>i(r.target.value),onKeyDown:r=>r.key==="Enter"&&n()}),e.jsxs("button",{className:"wl-add-btn",onClick:n,disabled:!t.trim(),children:[e.jsx(N,{size:12})," Add"]})]}),l.length===0?e.jsxs("div",{className:"wl-empty panel",children:[e.jsx(y,{size:24,style:{opacity:.2,marginBottom:"0.5rem"}}),e.jsx("p",{children:"No securities in your watchlist yet."}),e.jsx("p",{style:{fontSize:11},children:"Type a symbol above or use ⌘K to search and add."})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"wl-count",children:[l.length," securities tracked"]}),e.jsx("div",{className:"wl-grid",children:m.map((r,p)=>{const a=l[p],o=r.data,s=(o?.changePct??0)>=0;return e.jsxs("div",{className:"wl-card panel",children:[e.jsxs("div",{className:"wl-card-header",children:[e.jsxs("div",{children:[e.jsx("div",{className:"wl-card-symbol",children:a}),e.jsx("div",{className:"wl-card-name",children:o?.name??a})]}),e.jsx("button",{className:"wl-remove",onClick:()=>c(a),"aria-label":`Remove ${a}`,children:e.jsx(b,{size:11})})]}),e.jsxs("div",{className:"wl-card-body",children:[e.jsx("div",{className:"wl-card-price-col",children:r.isLoading?e.jsx("span",{className:"wl-loading",children:"…"}):o?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"wl-card-price num",children:[o.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsx("span",{className:"wl-card-cur",children:o.currency})]}),e.jsxs("div",{className:`wl-card-chg num ${s?"text-up":"text-down"}`,children:[s?"+":"",o.changePct.toFixed(2),"%"]})]}):e.jsx("span",{className:"wl-loading",children:"No data"})}),o&&e.jsx("div",{className:"wl-card-spark",children:e.jsx(j,{data:Array.from({length:20},(k,x)=>o.price*(1+Math.sin(x*.8+o.price)*.02)),up:s,width:70,height:32})})]}),e.jsx(h,{to:`/exchange/${o?.exchange?.toLowerCase()??"jse"}/stock/${encodeURIComponent(a)}`,className:"wl-card-link",children:"View detail →"})]},a)})})]}),e.jsx("style",{children:`
        .wl-page { display: flex; flex-direction: column; gap: 1rem; max-width: 900px; }
        .wl-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .wl-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .wl-count { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }

        /* Add row */
        .wl-add-row {
          display: flex; align-items: center; gap: 0.5rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 4px; padding: 0.375rem 0.75rem;
          max-width: 320px;
        }
        .wl-add-input {
          flex: 1; background: none; border: none; outline: none;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--color-text-primary); text-transform: uppercase;
        }
        .wl-add-input::placeholder { text-transform: none; color: var(--color-text-muted); font-family: var(--font-sans); }
        .wl-add-btn {
          display: flex; align-items: center; gap: 4px;
          background: var(--color-gold-subtle); border: 1px solid var(--color-gold-dim);
          color: var(--color-gold); border-radius: 3px;
          padding: 2px 8px; font-size: 10px; font-weight: 600;
          cursor: pointer; transition: all 0.1s;
        }
        .wl-add-btn:hover:not(:disabled) { background: var(--color-gold-dim); color: var(--color-bg-primary); }
        .wl-add-btn:disabled { opacity: 0.4; cursor: default; }

        /* Empty */
        .wl-empty {
          padding: 3rem 2rem; text-align: center;
          color: var(--color-text-muted); font-size: 13px;
          display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
        }
        .wl-empty p { margin: 0; }

        /* Grid of cards */
        .wl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
        }

        .wl-card { padding: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem; }

        .wl-card-header { display: flex; align-items: flex-start; justify-content: space-between; }
        .wl-card-symbol {
          font-family: var(--font-mono); font-size: 13px; font-weight: 700;
          color: var(--color-gold); letter-spacing: 0.02em;
        }
        .wl-card-name { font-size: 10px; color: var(--color-text-muted); margin-top: 1px; }

        .wl-remove {
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); padding: 2px;
          border-radius: 3px; transition: all 0.1s;
        }
        .wl-remove:hover { color: var(--color-down); background: var(--color-down-subtle); }

        .wl-card-body { display: flex; align-items: center; justify-content: space-between; }
        .wl-card-price-col { display: flex; flex-direction: column; gap: 2px; }

        .wl-card-price {
          font-size: 16px; font-weight: 800; letter-spacing: -0.02em;
          color: var(--color-text-primary);
        }
        .wl-card-cur { font-size: 9px; color: var(--color-text-muted); margin-left: 3px; }
        .wl-card-chg { font-size: 11px; font-weight: 600; }

        .wl-loading { font-size: 11px; color: var(--color-text-muted); font-family: var(--font-mono); }

        .wl-card-link {
          font-size: 10px; color: var(--color-text-muted);
          text-decoration: none; font-weight: 600;
          border-top: 1px solid var(--color-border-subtle);
          padding-top: 0.375rem; margin-top: 0.125rem;
          transition: color 0.1s;
        }
        .wl-card-link:hover { color: var(--color-gold); }
      `})]})}export{F as default};
