import{r as a,k,j as e,L as z}from"./vendor-9MAh3nQh.js";import{Y as E,F as P,T as F,p as $}from"./index-CqMmOgDz.js";import{T as A}from"./trending-down-C_vbH7PM.js";import"./store-DR-NtvzW.js";const i=E;function I(){const[t,p]=a.useState(""),[d,h]=a.useState(""),[m,g]=a.useState(""),[l,S]=a.useState("changePct"),[u,f]=a.useState(!1),[x,b]=a.useState("all"),v=k({queries:i.map(r=>({queryKey:["exchange-stocks",r],queryFn:()=>$.getExchangeStocks?.(r)??Promise.resolve([]),staleTime:5*6e4}))}),j=[];for(let r=0;r<i.length;r++){const s=v[r].data;if(s)for(const n of s)j.push({...n,exchangeId:i[r]})}const N=v.some(r=>r.isLoading);function C(r){l===r?f(s=>!s):(S(r),f(!1))}const o=j.filter(r=>x==="all"||r.exchangeId===x).filter(r=>t===""||r.changePct>=Number(t)).filter(r=>d===""||r.changePct<=Number(d)).filter(r=>m===""||(r.volume??0)>=Number(m)*1e3).sort((r,s)=>{const n=r[l]??0,y=s[l]??0,w=typeof n=="string"?n.localeCompare(y):n-y;return u?w:-w}),c=({k:r,label:s})=>e.jsxs("span",{className:`scr-th-btn ${l===r?"active":""}`,onClick:()=>C(r),children:[s,l===r?u?" ↑":" ↓":""]});return e.jsxs("div",{className:"scr-page",children:[e.jsx("div",{className:"scr-head",children:e.jsxs("div",{children:[e.jsxs("h1",{className:"scr-h1",children:[e.jsx(P,{size:16,style:{verticalAlign:"middle",marginRight:6}}),"Screener"]}),e.jsx("p",{className:"scr-sub",children:"Filter and rank stocks across African exchanges with live data"})]})}),e.jsxs("div",{className:"panel scr-filters",children:[e.jsxs("div",{className:"scr-filter-row",children:[e.jsxs("label",{className:"scr-filter-group",children:[e.jsx("span",{className:"scr-filter-label",children:"Exchange"}),e.jsxs("select",{className:"scr-input",value:x,onChange:r=>b(r.target.value),children:[e.jsxs("option",{value:"all",children:["All (",i.join(", ").toUpperCase(),")"]}),i.map(r=>e.jsx("option",{value:r,children:r.toUpperCase()},r))]})]}),e.jsxs("label",{className:"scr-filter-group",children:[e.jsx("span",{className:"scr-filter-label",children:"Min Change %"}),e.jsx("input",{type:"number",step:"0.1",className:"scr-input",placeholder:"-100",value:t,onChange:r=>p(r.target.value)})]}),e.jsxs("label",{className:"scr-filter-group",children:[e.jsx("span",{className:"scr-filter-label",children:"Max Change %"}),e.jsx("input",{type:"number",step:"0.1",className:"scr-input",placeholder:"100",value:d,onChange:r=>h(r.target.value)})]}),e.jsxs("label",{className:"scr-filter-group",children:[e.jsx("span",{className:"scr-filter-label",children:"Min Vol (K)"}),e.jsx("input",{type:"number",className:"scr-input",placeholder:"0",value:m,onChange:r=>g(r.target.value)})]}),e.jsx("button",{className:"scr-reset",onClick:()=>{p(""),h(""),g(""),b("all")},children:"Reset"})]}),e.jsx("div",{className:"scr-result-count",children:N?"Loading…":`${o.length} stocks`})]}),N?e.jsx("div",{className:"panel scr-loading",children:"Loading exchange data…"}):o.length===0?e.jsx("div",{className:"panel scr-empty",children:"No stocks match your filters"}):e.jsxs("div",{className:"panel scr-table-wrap",children:[e.jsxs("table",{className:"scr-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:e.jsx(c,{k:"symbol",label:"Symbol"})}),e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Exchange"}),e.jsx("th",{className:"scr-r",children:e.jsx(c,{k:"price",label:"Price"})}),e.jsx("th",{className:"scr-r",children:e.jsx(c,{k:"changePct",label:"Change %"})}),e.jsx("th",{className:"scr-r",children:e.jsx(c,{k:"volume",label:"Volume"})}),e.jsx("th",{className:"scr-r",children:e.jsx(c,{k:"mktCap",label:"Mkt Cap"})})]})}),e.jsx("tbody",{children:o.slice(0,200).map(r=>{const s=r.changePct>=0;return e.jsxs("tr",{className:"scr-row",children:[e.jsx("td",{children:e.jsx(z,{to:`/exchange/${r.exchangeId}/stock/${encodeURIComponent(r.symbol)}`,className:"scr-sym",children:r.symbol.replace(/\.(JSE|USE|JO|UG)$/i,"")})}),e.jsx("td",{className:"scr-name",children:r.name}),e.jsx("td",{className:"scr-ex",children:r.exchangeId.toUpperCase()}),e.jsx("td",{className:"scr-r num",children:r.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}),e.jsxs("td",{className:`scr-r num scr-chg ${s?"text-up":"text-down"}`,children:[s?e.jsx(F,{size:10,style:{verticalAlign:"middle",marginRight:2}}):e.jsx(A,{size:10,style:{verticalAlign:"middle",marginRight:2}}),s?"+":"",r.changePct.toFixed(2),"%"]}),e.jsx("td",{className:"scr-r num",children:r.volume?(r.volume/1e3).toFixed(0)+"K":"—"}),e.jsx("td",{className:"scr-r num",children:r.mktCap?U(r.mktCap):"—"})]},`${r.exchangeId}-${r.symbol}`)})})]}),o.length>200&&e.jsxs("div",{className:"scr-truncate",children:["Showing top 200 of ",o.length," results"]})]}),e.jsx("style",{children:`
        .scr-page { display: flex; flex-direction: column; gap: 1rem; max-width: 1100px; }
        .scr-head { }
        .scr-h1 { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .scr-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .scr-filters { padding: 0.875rem 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .scr-filter-row { display: flex; gap: 0.75rem; align-items: flex-end; flex-wrap: wrap; }
        .scr-filter-group { display: flex; flex-direction: column; gap: 3px; font-size: 10px; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        .scr-input {
          background: var(--color-bg-tertiary); border: 1px solid var(--color-border);
          border-radius: 3px; padding: 5px 8px; color: var(--color-text-primary);
          font-size: 11px; font-family: var(--font-mono); outline: none; width: 120px;
        }
        .scr-input:focus { border-color: var(--color-gold-dim); }
        .scr-reset {
          padding: 5px 12px; border-radius: 3px; font-size: 11px; font-weight: 600;
          border: 1px solid var(--color-border); background: none;
          color: var(--color-text-muted); cursor: pointer; align-self: flex-end;
          transition: all 0.1s;
        }
        .scr-reset:hover { color: var(--color-text-primary); border-color: var(--color-border); }
        .scr-result-count { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }

        .scr-loading, .scr-empty {
          padding: 2.5rem; text-align: center;
          font-size: 12px; color: var(--color-text-muted);
        }

        .scr-table-wrap { overflow-x: auto; }
        .scr-table {
          width: 100%; border-collapse: collapse; font-size: 12px;
        }
        .scr-table thead tr {
          background: var(--color-bg-tertiary);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .scr-table th {
          padding: 0.375rem 0.75rem;
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600; white-space: nowrap;
          user-select: none;
        }
        .scr-th-btn {
          cursor: pointer; transition: color 0.1s;
        }
        .scr-th-btn:hover, .scr-th-btn.active { color: var(--color-gold); }
        .scr-r { text-align: right; }
        .scr-row {
          border-bottom: 1px solid var(--color-border-subtle);
          transition: background 0.1s;
        }
        .scr-row:hover { background: var(--color-bg-hover); }
        .scr-row td { padding: 0.4rem 0.75rem; }
        .scr-sym {
          font-family: var(--font-mono); font-weight: 700; font-size: 12px;
          color: var(--color-gold); text-decoration: none;
        }
        .scr-sym:hover { text-decoration: underline; }
        .scr-name { font-size: 11px; color: var(--color-text-secondary); max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .scr-ex { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); font-weight: 700; }
        .scr-chg { white-space: nowrap; }
        .scr-truncate {
          padding: 0.5rem 0.75rem; font-size: 10px;
          color: var(--color-text-muted); text-align: center;
          border-top: 1px solid var(--color-border-subtle);
        }
      `})]})}function U(t){return t>=1e12?`${(t/1e12).toFixed(1)}T`:t>=1e9?`${(t/1e9).toFixed(1)}B`:t>=1e6?`${(t/1e6).toFixed(1)}M`:t.toLocaleString("en-US")}export{I as default};
