import{j as n}from"./vendor-9MAh3nQh.js";const U="https://use.or.ug/api/delayed-data",w={"AIRTEL UGANDA":"Airtel Uganda",BATU:"BAT Uganda",BOBU:"Bank of Baroda Uganda",CENT:"Centum Investment",DFCU:"dfcu Limited",EABL:"East African Breweries",EBL:"Equity Bank Uganda",JHL:"Jubilee Holdings",KA:"Kenya Airways",KCB:"KCB Group",MTNU:"MTN Uganda",NIC:"National Insurance Corp",NMG:"Nation Media Group",NVL:"New Vision Group",QCIL:"Quality Chemical Industries",SBU:"Stanbic Uganda Holdings",UCL:"Uganda Clays",UMEM:"Umeme Limited"},E={"AIRTEL UGANDA":222,BATU:820,BOBU:395,CENT:380,DFCU:790,EABL:1600,EBL:380,JHL:420,KA:6,KCB:420,MTNU:185,NIC:16,NMG:180,NVL:58,QCIL:7800,SBU:540,UCL:30,UMEM:265};async function g(){const t=await fetch(U,{mode:"cors"});if(!t.ok)throw new Error(`USE API ${t.status}`);return t.json()}const v="zamani_use_prev";function x(){try{const t=localStorage.getItem(v);if(!t)return{};const o=JSON.parse(t),s=new Date().toISOString().slice(0,10);return o.date!==s?o.prices??{}:{}}catch{return{}}}function N(t){try{const o=new Date().toISOString().slice(0,10);localStorage.setItem(v,JSON.stringify({date:o,prices:t}))}catch{}}function $(){return Object.entries(E).map(([t,o])=>({type:"EQUITY",stock:t,price:o,market_cap:0,volume:0,deals:0}))}async function b(){let t;try{t=await g()}catch(e){console.warn("[USE] API unreachable — using fallback prices:",e),t=$()}const o=x(),s=t.filter(e=>e.type==="EQUITY"),i={};for(const e of s)i[e.stock]=e.price;return N(i),s.map(e=>{const l=e.price,r=o[e.stock]??l,c=+(l-r).toFixed(2),a=r?+(c/r*100).toFixed(2):0;return{symbol:e.stock,name:w[e.stock]??e.stock,price:l,change:c,changePct:a,volume:e.volume,currency:"UGX",exchange:"USE",timestamp:Date.now()}})}async function j(){let t;try{t=await g()}catch{t=[]}const o=t.filter(i=>i.type==="INDEX"),s=x();return o.length?o.map(i=>{const e=i.price,l=s[i.stock]??e,r=+(e-l).toFixed(2),c=l?+(r/l*100).toFixed(2):0;return{id:`use-${i.stock.toLowerCase().replace(/\s+/g,"-")}`,name:i.stock==="LCI"?"USE Local Company Index":`USE ${i.stock}`,exchange:"USE",value:e,change:r,changePct:c,currency:"UGX",sparkline:[],timestamp:Date.now()}}):[{id:"use-lci",name:"USE LCI",exchange:"USE",value:0,change:0,changePct:0,currency:"UGX",sparkline:[],timestamp:Date.now()}]}async function S(){const o=[...await b()].sort((e,l)=>l.changePct-e.changePct),s=o.filter(e=>e.changePct>0).slice(0,5).map(e=>({symbol:e.symbol,name:e.name,exchange:"USE",price:e.price,changePct:e.changePct})),i=o.filter(e=>e.changePct<0).slice(-5).reverse().map(e=>({symbol:e.symbol,name:e.name,exchange:"USE",price:e.price,changePct:e.changePct}));return{gainers:s,losers:i}}function I({gainers:t,losers:o}){return n.jsxs("div",{className:"movers-wrap",children:[n.jsxs("div",{className:"movers-col",children:[n.jsx("div",{className:"movers-header up",children:"Gainers"}),t.map(s=>n.jsx(u,{mover:s,direction:"up"},s.symbol))]}),n.jsxs("div",{className:"movers-col",children:[n.jsx("div",{className:"movers-header down",children:"Losers"}),o.map(s=>n.jsx(u,{mover:s,direction:"down"},s.symbol))]}),n.jsx("style",{children:`
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
      `})]})}function u({mover:t,direction:o}){const s=o==="up"?"+":"";return n.jsxs("div",{className:"mover-row",children:[n.jsxs("div",{className:"mover-left",children:[n.jsx("span",{className:"mover-sym",children:t.symbol}),n.jsx("span",{className:"mover-exch",children:t.exchange})]}),n.jsx("div",{className:"mover-right",children:n.jsxs("span",{className:`mover-pct ${o}`,children:[s,t.changePct.toFixed(2),"%"]})})]})}function L({width:t=120,height:o=120,color:s="var(--color-gold)",opacity:i=.12,className:e,style:l}){const r=t/2,c=o/2,a=Math.min(t,o)/6;return n.jsxs("svg",{width:t,height:o,viewBox:`0 0 ${t} ${o}`,xmlns:"http://www.w3.org/2000/svg",className:e,style:{opacity:i,...l},"aria-hidden":!0,children:[n.jsx("polygon",{points:`${r},${c-a*2} ${r+a*2},${c} ${r},${c+a*2} ${r-a*2},${c}`,fill:"none",stroke:s,strokeWidth:"1"}),n.jsx("polygon",{points:`${r},${c-a} ${r+a},${c} ${r},${c+a} ${r-a},${c}`,fill:s}),[[0,0],[t,0],[t,o],[0,o]].map(([m,p],d)=>{const f=d*90,h=m===0?a*.5:-a*.5,y=p===0?a*.5:-a*.5;return n.jsx("polygon",{points:`${m},${p} ${m+a*1.5},${p} ${m},${p+a*1.5}`,fill:s,transform:`rotate(${f} ${m} ${p}) translate(${h} ${y})`},d)}),n.jsx("line",{x1:0,y1:c,x2:r-a*2,y2:c,stroke:s,strokeWidth:"0.5"}),n.jsx("line",{x1:r+a*2,y1:c,x2:t,y2:c,stroke:s,strokeWidth:"0.5"}),n.jsx("line",{x1:r,y1:0,x2:r,y2:c-a*2,stroke:s,strokeWidth:"0.5"}),n.jsx("line",{x1:r,y1:c+a*2,x2:r,y2:o,stroke:s,strokeWidth:"0.5"})]})}export{L as N,I as T,S as a,b,j as g};
