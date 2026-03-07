import{r as i,k as q,j as e,L as F}from"./vendor-9MAh3nQh.js";import{c as D,b as E,u as P,p as K,e as M,S as T,X as O}from"./index-BGhFdoHM.js";import{S as R}from"./Sparkline-Sa5-OsUq.js";import{c as U}from"./store-DR-NtvzW.js";import{P as y}from"./plus-B-V17sKn.js";import{T as W}from"./trash-2-Bt72ZZSa.js";const _=[["path",{d:"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",key:"1dfntj"}],["path",{d:"M15 3v5a1 1 0 0 0 1 1h5",key:"6s6qgf"}]],Q=D("sticky-note",_),B=U()(E((a,n)=>({notes:{},setNote(l,c){a(d=>({notes:{...d.notes,[l]:c}}))},getNote(l){return n().notes[l]??""}}),{name:"zamani-notes"}));function Z(){const{lists:a,activeId:n,symbols:l,add:c,remove:d,createList:j,deleteList:N,setActive:k}=P(),{getNote:u,setNote:z}=B(),[p,g]=i.useState(""),[w,f]=i.useState(""),[C,m]=i.useState(!1),[L,S]=i.useState({}),h=a.find(o=>o.id===n),$=q({queries:l.map(o=>({queryKey:["quote",o],queryFn:()=>K.getQuote(o),staleTime:3e4,refetchInterval:3e4}))});function v(){const o=p.trim().toUpperCase();o&&!l.includes(o)&&(c(o),g(""))}function b(){const o=w.trim();o&&(j(o),f(""),m(!1))}return e.jsxs("div",{className:"wl-page",children:[e.jsxs("div",{className:"wl-page-header",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"wl-h1",children:"Watchlist"}),e.jsx("p",{className:"wl-sub",children:"Your tracked securities — live quotes, refreshed every 30s"})]}),e.jsxs("button",{className:"wl-new-list-btn",onClick:()=>m(o=>!o),children:[e.jsx(y,{size:11})," New List"]})]}),e.jsxs("div",{className:"wl-list-tabs",children:[a.map(o=>e.jsxs("div",{className:`wl-list-tab ${o.id===n?"active":""}`,children:[e.jsxs("button",{className:"wl-list-tab-btn",onClick:()=>k(o.id),children:[o.name," ",e.jsx("span",{className:"wl-list-count",children:o.symbols.length})]}),a.length>1&&e.jsx("button",{className:"wl-list-del",onClick:()=>N(o.id),"aria-label":`Delete ${o.name}`,title:`Delete ${o.name}`,children:e.jsx(W,{size:9})})]},o.id)),C&&e.jsxs("div",{className:"wl-new-list-form",children:[e.jsx("input",{className:"wl-add-input",placeholder:"List name",value:w,onChange:o=>f(o.target.value),onKeyDown:o=>o.key==="Enter"&&b(),autoFocus:!0,style:{width:120}}),e.jsx("button",{className:"wl-add-btn",onClick:b,children:"Create"}),e.jsx("button",{className:"wl-add-btn",onClick:()=>m(!1),style:{borderColor:"var(--color-border)"},children:"✕"})]})]}),h&&e.jsx("div",{className:"wl-active-name",children:h.name}),e.jsxs("div",{className:"wl-add-row",children:[e.jsx(M,{size:12,style:{color:"var(--color-text-muted)",flexShrink:0}}),e.jsx("input",{className:"wl-add-input",placeholder:"Add symbol (e.g. NPN, SCOM)",value:p,onChange:o=>g(o.target.value),onKeyDown:o=>o.key==="Enter"&&v()}),e.jsxs("button",{className:"wl-add-btn",onClick:v,disabled:!p.trim(),children:[e.jsx(y,{size:12})," Add"]})]}),l.length===0?e.jsxs("div",{className:"wl-empty panel",children:[e.jsx(T,{size:24,style:{opacity:.2,marginBottom:"0.5rem"}}),e.jsx("p",{children:"No securities in your watchlist yet."}),e.jsx("p",{style:{fontSize:11},children:"Type a symbol above or use ⌘K to search and add."})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"wl-count",children:[l.length," securities tracked"]}),e.jsx("div",{className:"wl-grid",children:$.map((o,A)=>{const r=l[A],t=o.data,x=(t?.changePct??0)>=0;return e.jsxs("div",{className:"wl-card panel",children:[e.jsxs("div",{className:"wl-card-header",children:[e.jsxs("div",{children:[e.jsx("div",{className:"wl-card-symbol",children:r}),e.jsx("div",{className:"wl-card-name",children:t?.name??r})]}),e.jsx("button",{className:"wl-remove",onClick:()=>d(r),"aria-label":`Remove ${r}`,children:e.jsx(O,{size:11})})]}),e.jsxs("div",{className:"wl-card-body",children:[e.jsx("div",{className:"wl-card-price-col",children:o.isLoading?e.jsx("span",{className:"wl-loading",children:"…"}):t?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"wl-card-price num",children:[t.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsx("span",{className:"wl-card-cur",children:t.currency})]}),e.jsxs("div",{className:`wl-card-chg num ${x?"text-up":"text-down"}`,children:[x?"+":"",t.changePct.toFixed(2),"%"]})]}):e.jsx("span",{className:"wl-loading",children:"No data"})}),t&&e.jsx("div",{className:"wl-card-spark",children:e.jsx(R,{data:Array.from({length:20},(s,I)=>t.price*(1+Math.sin(I*.8+t.price)*.02)),up:x,width:70,height:32})})]}),e.jsxs("div",{className:"wl-card-footer",children:[e.jsx(F,{to:`/exchange/${t?.exchange?.toLowerCase()??"jse"}/stock/${encodeURIComponent(r)}`,className:"wl-card-link",children:"View detail →"}),e.jsx("button",{className:`wl-note-toggle ${u(r)?"has-note":""}`,onClick:()=>S(s=>({...s,[r]:!s[r]})),title:"Notes",children:e.jsx(Q,{size:10})})]}),L[r]&&e.jsx("textarea",{className:"wl-note-area",placeholder:`Notes for ${r}…`,value:u(r),onChange:s=>z(r,s.target.value),rows:3})]},r)})})]}),e.jsx("style",{children:`
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

        .wl-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid var(--color-border-subtle);
          padding-top: 0.375rem; margin-top: 0.125rem;
        }
        .wl-card-link {
          font-size: 10px; color: var(--color-text-muted);
          text-decoration: none; font-weight: 600; transition: color 0.1s;
        }
        .wl-card-link:hover { color: var(--color-gold); }
        .wl-note-toggle {
          background: none; border: none; cursor: pointer; padding: 2px 4px;
          color: var(--color-text-muted); border-radius: 3px; transition: all 0.1s;
          display: flex; align-items: center;
        }
        .wl-note-toggle:hover { color: var(--color-gold); background: var(--color-gold-subtle); }
        .wl-note-toggle.has-note { color: var(--color-gold); }
        .wl-note-area {
          width: 100%; box-sizing: border-box; resize: vertical;
          background: var(--color-bg-primary); border: 1px solid var(--color-border);
          border-radius: 3px; padding: 0.375rem 0.5rem;
          font-family: var(--font-sans); font-size: 11px; line-height: 1.5;
          color: var(--color-text-secondary); outline: none;
          transition: border-color 0.1s;
        }
        .wl-note-area:focus { border-color: var(--color-gold-dim); }
        .wl-note-area::placeholder { color: var(--color-text-muted); }
      `})]})}export{Z as default};
