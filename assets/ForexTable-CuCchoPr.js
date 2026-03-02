import{j as e}from"./vendor-9MAh3nQh.js";function l({rates:o}){return e.jsxs("div",{className:"panel fx-table-wrap",children:[e.jsxs("table",{className:"fx-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Pair"}),e.jsx("th",{className:"num",children:"Rate"}),e.jsx("th",{className:"num",children:"Chg%"})]})}),e.jsx("tbody",{children:o.map(t=>{const r=t.changePct>=0,a=`${t.base}/${t.quote}`;return e.jsxs("tr",{className:"fx-row",children:[e.jsx("td",{className:"fx-pair",children:a}),e.jsx("td",{className:"num fx-rate",children:t.rate.toLocaleString(void 0,{maximumFractionDigits:4})}),e.jsxs("td",{className:`num fx-chg ${r?"text-up":"text-down"}`,children:[r?"+":"",t.changePct.toFixed(2),"%"]})]},a)})})]}),e.jsx("style",{children:`
        .fx-table-wrap { overflow: hidden; }
        .fx-table {
          width: 100%; border-collapse: collapse; font-size: 12px;
        }
        .fx-table th {
          padding: 0.5rem 0.75rem;
          text-align: left; font-size: 10px; text-transform: uppercase;
          letter-spacing: 0.06em; color: var(--color-text-muted);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .fx-table th.num { text-align: right; }
        .fx-row { border-bottom: 1px solid var(--color-border-subtle); }
        .fx-row:last-child { border-bottom: none; }
        .fx-row:hover td { background: var(--color-bg-hover); }
        .fx-row td { padding: 0.4375rem 0.75rem; }

        .fx-pair { font-family: var(--font-mono); font-weight: 600; font-size: 12px; }
        .fx-rate { text-align: right; font-size: 12px; }
        .fx-chg  { text-align: right; font-weight: 500; }
      `})]})}export{l as F};
