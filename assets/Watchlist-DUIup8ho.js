import{r as d,k as L,j as e,L as S}from"./vendor-9MAh3nQh.js";import{u as A,p as F,d as I,S as $,X as q}from"./index-CXUK-kK_.js";import{S as D}from"./Sparkline-Sa5-OsUq.js";import{P as f}from"./plus-DOfc3eX6.js";import{T as E}from"./trash-2-VEhy9fp5.js";import"./store-DR-NtvzW.js";function Q(){const{lists:a,activeId:c,symbols:t,add:h,remove:v,createList:b,deleteList:y,setActive:j}=A(),[s,m]=d.useState(""),[p,x]=d.useState(""),[N,i]=d.useState(!1),u=a.find(r=>r.id===c),k=L({queries:t.map(r=>({queryKey:["quote",r],queryFn:()=>F.getQuote(r),staleTime:3e4,refetchInterval:3e4}))});function w(){const r=s.trim().toUpperCase();r&&!t.includes(r)&&(h(r),m(""))}function g(){const r=p.trim();r&&(b(r),x(""),i(!1))}return e.jsxs("div",{className:"wl-page",children:[e.jsxs("div",{className:"wl-page-header",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"wl-h1",children:"Watchlist"}),e.jsx("p",{className:"wl-sub",children:"Your tracked securities — live quotes, refreshed every 30s"})]}),e.jsxs("button",{className:"wl-new-list-btn",onClick:()=>i(r=>!r),children:[e.jsx(f,{size:11})," New List"]})]}),e.jsxs("div",{className:"wl-list-tabs",children:[a.map(r=>e.jsxs("div",{className:`wl-list-tab ${r.id===c?"active":""}`,children:[e.jsxs("button",{className:"wl-list-tab-btn",onClick:()=>j(r.id),children:[r.name," ",e.jsx("span",{className:"wl-list-count",children:r.symbols.length})]}),a.length>1&&e.jsx("button",{className:"wl-list-del",onClick:()=>y(r.id),"aria-label":`Delete ${r.name}`,title:`Delete ${r.name}`,children:e.jsx(E,{size:9})})]},r.id)),N&&e.jsxs("div",{className:"wl-new-list-form",children:[e.jsx("input",{className:"wl-add-input",placeholder:"List name",value:p,onChange:r=>x(r.target.value),onKeyDown:r=>r.key==="Enter"&&g(),autoFocus:!0,style:{width:120}}),e.jsx("button",{className:"wl-add-btn",onClick:g,children:"Create"}),e.jsx("button",{className:"wl-add-btn",onClick:()=>i(!1),style:{borderColor:"var(--color-border)"},children:"✕"})]})]}),u&&e.jsx("div",{className:"wl-active-name",children:u.name}),e.jsxs("div",{className:"wl-add-row",children:[e.jsx(I,{size:12,style:{color:"var(--color-text-muted)",flexShrink:0}}),e.jsx("input",{className:"wl-add-input",placeholder:"Add symbol (e.g. NPN, SCOM)",value:s,onChange:r=>m(r.target.value),onKeyDown:r=>r.key==="Enter"&&w()}),e.jsxs("button",{className:"wl-add-btn",onClick:w,disabled:!s.trim(),children:[e.jsx(f,{size:12})," Add"]})]}),t.length===0?e.jsxs("div",{className:"wl-empty panel",children:[e.jsx($,{size:24,style:{opacity:.2,marginBottom:"0.5rem"}}),e.jsx("p",{children:"No securities in your watchlist yet."}),e.jsx("p",{style:{fontSize:11},children:"Type a symbol above or use ⌘K to search and add."})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"wl-count",children:[t.length," securities tracked"]}),e.jsx("div",{className:"wl-grid",children:k.map((r,z)=>{const l=t[z],o=r.data,n=(o?.changePct??0)>=0;return e.jsxs("div",{className:"wl-card panel",children:[e.jsxs("div",{className:"wl-card-header",children:[e.jsxs("div",{children:[e.jsx("div",{className:"wl-card-symbol",children:l}),e.jsx("div",{className:"wl-card-name",children:o?.name??l})]}),e.jsx("button",{className:"wl-remove",onClick:()=>v(l),"aria-label":`Remove ${l}`,children:e.jsx(q,{size:11})})]}),e.jsxs("div",{className:"wl-card-body",children:[e.jsx("div",{className:"wl-card-price-col",children:r.isLoading?e.jsx("span",{className:"wl-loading",children:"…"}):o?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"wl-card-price num",children:[o.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsx("span",{className:"wl-card-cur",children:o.currency})]}),e.jsxs("div",{className:`wl-card-chg num ${n?"text-up":"text-down"}`,children:[n?"+":"",o.changePct.toFixed(2),"%"]})]}):e.jsx("span",{className:"wl-loading",children:"No data"})}),o&&e.jsx("div",{className:"wl-card-spark",children:e.jsx(D,{data:Array.from({length:20},(P,C)=>o.price*(1+Math.sin(C*.8+o.price)*.02)),up:n,width:70,height:32})})]}),e.jsx(S,{to:`/exchange/${o?.exchange?.toLowerCase()??"jse"}/stock/${encodeURIComponent(l)}`,className:"wl-card-link",children:"View detail →"})]},l)})})]}),e.jsx("style",{children:`
        .wl-page { display: flex; flex-direction: column; gap: 1rem; max-width: 900px; }
        .wl-page-header { display: flex; align-items: flex-start; justify-content: space-between; }
        .wl-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .wl-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .wl-new-list-btn {
          display: flex; align-items: center; gap: 4px;
          padding: 5px 10px; border-radius: 4px; font-size: 11px; font-weight: 600;
          border: 1px solid var(--color-border); background: none;
          color: var(--color-text-muted); cursor: pointer; transition: all 0.1s;
        }
        .wl-new-list-btn:hover { color: var(--color-gold); border-color: var(--color-gold-dim); }

        .wl-list-tabs { display: flex; gap: 4px; flex-wrap: wrap; align-items: center; }
        .wl-list-tab {
          display: flex; align-items: center;
          border: 1px solid var(--color-border); border-radius: 4px; overflow: hidden;
        }
        .wl-list-tab.active { border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }
        .wl-list-tab-btn {
          display: flex; align-items: center; gap: 4px;
          padding: 3px 8px; background: none; border: none;
          font-size: 11px; font-weight: 600; cursor: pointer;
          color: var(--color-text-muted); transition: color 0.1s;
        }
        .wl-list-tab.active .wl-list-tab-btn { color: var(--color-gold); }
        .wl-list-count {
          font-size: 9px; color: var(--color-text-muted);
          font-family: var(--font-mono);
        }
        .wl-list-del {
          padding: 3px 5px; background: none; border: none;
          border-left: 1px solid var(--color-border);
          color: var(--color-text-muted); cursor: pointer; opacity: 0.5;
          transition: all 0.1s; display: flex; align-items: center;
        }
        .wl-list-del:hover { opacity: 1; color: var(--color-down); }

        .wl-new-list-form {
          display: flex; align-items: center; gap: 4px;
        }
        .wl-active-name {
          font-size: 11px; font-weight: 700; color: var(--color-gold);
          text-transform: uppercase; letter-spacing: 0.05em;
        }

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
      `})]})}export{Q as default};
