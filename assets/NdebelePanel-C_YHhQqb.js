import{j as e}from"./vendor-9MAh3nQh.js";import{S as g}from"./Sparkline-Sa5-OsUq.js";function d(r){return r>=1e6?(r/1e6).toFixed(2)+"M":r>=1e3?r.toLocaleString(void 0,{maximumFractionDigits:0}):r.toFixed(2)}function b({index:r}){const t=r.changePct>=0,o=t?"+":"";return e.jsxs("div",{className:"idx-card panel",children:[e.jsxs("div",{className:"idx-header",children:[e.jsx("span",{className:"idx-exchange",children:r.exchange}),e.jsxs("span",{className:`idx-badge ${t?"up":"down"}`,children:[o,r.changePct.toFixed(2),"%"]})]}),e.jsx("div",{className:"idx-name",children:r.name}),e.jsxs("div",{className:"idx-body",children:[e.jsxs("div",{children:[e.jsx("span",{className:"num idx-value",children:d(r.value)}),e.jsxs("span",{className:"idx-currency",children:[" ",r.currency]})]}),e.jsxs("div",{className:`num idx-change ${t?"text-up":"text-down"}`,children:[o,d(r.change)]})]}),e.jsx(g,{data:r.sparkline,up:t,height:36}),e.jsx("style",{children:`
        .idx-card {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          padding: 0.75rem;
          min-width: 160px;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .idx-card:hover { border-color: var(--color-border); }

        .idx-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .idx-exchange {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .idx-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 1px 5px;
          border-radius: 3px;
          font-weight: 600;
        }
        .idx-badge.up   { color: var(--color-up);   background: var(--color-up-subtle);   }
        .idx-badge.down { color: var(--color-down); background: var(--color-down-subtle); }

        .idx-name {
          font-size: 11px;
          color: var(--color-text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .idx-body {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .idx-value    { font-size: 18px; font-weight: 700; color: var(--color-text-primary); }
        .idx-currency { font-size: 10px; color: var(--color-text-muted); }
        .idx-change   { font-size: 11px; }
      `})]})}function w({gainers:r,losers:t}){return e.jsxs("div",{className:"movers-wrap",children:[e.jsxs("div",{className:"movers-col",children:[e.jsx("div",{className:"movers-header up",children:"Gainers"}),r.map(o=>e.jsx(x,{mover:o,direction:"up"},o.symbol))]}),e.jsxs("div",{className:"movers-col",children:[e.jsx("div",{className:"movers-header down",children:"Losers"}),t.map(o=>e.jsx(x,{mover:o,direction:"down"},o.symbol))]}),e.jsx("style",{children:`
        .movers-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .movers-header {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding-bottom: 0.35rem;
          border-bottom: 1px solid var(--color-border-subtle);
          margin-bottom: 0.25rem;
        }
        .movers-header.up   { color: var(--color-up); }
        .movers-header.down { color: var(--color-down); }

        .mover-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.3rem 0;
          border-bottom: 1px solid var(--color-border-subtle);
          gap: 0.5rem;
        }
        .mover-row:last-child { border-bottom: none; }

        .mover-left { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .mover-sym  {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--color-text-primary);
          white-space: nowrap;
        }
        .mover-exch {
          font-size: 9px;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .mover-right { text-align: right; flex-shrink: 0; }
        .mover-pct {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
        }
        .mover-pct.up   { color: var(--color-up); }
        .mover-pct.down { color: var(--color-down); }
      `})]})}function x({mover:r,direction:t}){const o=t==="up"?"+":"";return e.jsxs("div",{className:"mover-row",children:[e.jsxs("div",{className:"mover-left",children:[e.jsx("span",{className:"mover-sym",children:r.symbol}),e.jsx("span",{className:"mover-exch",children:r.exchange})]}),e.jsx("div",{className:"mover-right",children:e.jsxs("span",{className:`mover-pct ${t}`,children:[o,r.changePct.toFixed(2),"%"]})})]})}function $({width:r=120,height:t=120,color:o="var(--color-gold)",opacity:m=.12,className:p,style:v}){const n=r/2,a=t/2,s=Math.min(r,t)/6;return e.jsxs("svg",{width:r,height:t,viewBox:`0 0 ${r} ${t}`,xmlns:"http://www.w3.org/2000/svg",className:p,style:{opacity:m,...v},"aria-hidden":!0,children:[e.jsx("polygon",{points:`${n},${a-s*2} ${n+s*2},${a} ${n},${a+s*2} ${n-s*2},${a}`,fill:"none",stroke:o,strokeWidth:"1"}),e.jsx("polygon",{points:`${n},${a-s} ${n+s},${a} ${n},${a+s} ${n-s},${a}`,fill:o}),[[0,0],[r,0],[r,t],[0,t]].map(([i,l],c)=>{const f=c*90,u=i===0?s*.5:-s*.5,h=l===0?s*.5:-s*.5;return e.jsx("polygon",{points:`${i},${l} ${i+s*1.5},${l} ${i},${l+s*1.5}`,fill:o,transform:`rotate(${f} ${i} ${l}) translate(${u} ${h})`},c)}),e.jsx("line",{x1:0,y1:a,x2:n-s*2,y2:a,stroke:o,strokeWidth:"0.5"}),e.jsx("line",{x1:n+s*2,y1:a,x2:r,y2:a,stroke:o,strokeWidth:"0.5"}),e.jsx("line",{x1:n,y1:0,x2:n,y2:a-s*2,stroke:o,strokeWidth:"0.5"}),e.jsx("line",{x1:n,y1:a+s*2,x2:n,y2:t,stroke:o,strokeWidth:"0.5"})]})}export{b as I,$ as N,w as T};
