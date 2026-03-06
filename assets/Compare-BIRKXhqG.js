import{r as k,k as L,j as r}from"./vendor-9MAh3nQh.js";import{p as A,X as E,G as F}from"./index-usIiblUo.js";import{P as M}from"./plus-CnvyuxPO.js";import{R,L as T,C as $,X as I,Y as G,T as U,g as q,a as B}from"./recharts-DK6PfPlO.js";import"./store-DR-NtvzW.js";const D=["jse","ngx","nse","gse","brvm","zse","bse","luse"],h=["#c9a84c","#4ade80","#60a5fa"];function K(o,s){const a=Math.min(o.length,s.length);if(a<2)return 0;const g=o.slice(0,a).reduce((n,x)=>n+x,0)/a,p=s.slice(0,a).reduce((n,x)=>n+x,0)/a;let b=0,m=0,v=0;for(let n=0;n<a;n++)b+=(o[n]-g)*(s[n]-p),m+=(o[n]-g)**2,v+=(s[n]-p)**2;const f=Math.sqrt(m*v);return f===0?0:+(b/f).toFixed(3)}function P(o){return o>.7?"rgba(74,222,128,0.25)":o>.3?"rgba(74,222,128,0.10)":o<-.7?"rgba(248,113,113,0.25)":o<-.3?"rgba(248,113,113,0.10)":"rgba(255,255,255,0.03)"}const w=[{label:"1M",days:30},{label:"3M",days:90},{label:"6M",days:180},{label:"1Y",days:365}];function X(o){if(!o.length)return[];const s=o[0].close;return o.map(a=>({time:a.time,value:+(a.close/s*100).toFixed(2)}))}function V(){const[o,s]=k.useState([]),[a,g]=k.useState(""),[p,b]=k.useState("jse"),[m,v]=k.useState(w[0]);function f(){if(!a||o.length>=3)return;const e=a.trim().toUpperCase(),t=`${e} (${p.toUpperCase()})`;o.find(l=>l.label===t)||(s(l=>[...l,{symbol:e,exchange:p,label:t}]),g(""))}function n(e){s(t=>t.filter(l=>l.label!==e))}const x=L({queries:o.map(e=>({queryKey:["compare",e.symbol,e.exchange,m.days],queryFn:()=>A.getHistory(`${e.symbol}.${e.exchange.toUpperCase()}`,m.days),staleTime:5*6e4}))}),N=x.map((e,t)=>({label:o[t]?.label??"",normalized:X(e.data??[])})),y={};for(const{label:e,normalized:t}of N)for(const l of t){const u=new Date(l.time).toLocaleDateString("en-US",{month:"short",day:"numeric"});y[u]||(y[u]={}),y[u][e]=l.value}const z=Object.entries(y).map(([e,t])=>({date:e,...t})),S=x.some(e=>e.isLoading);return r.jsxs("div",{className:"compare-page",children:[r.jsxs("div",{children:[r.jsx("h1",{className:"cmp-h1",children:"Compare"}),r.jsx("p",{className:"cmp-sub",children:"Normalize up to 3 stocks to 100 and compare performance across exchanges"})]}),r.jsxs("div",{className:"panel cmp-selector",children:[r.jsxs("div",{className:"cmp-input-row",children:[r.jsx("select",{className:"cmp-select",value:p,onChange:e=>b(e.target.value),children:D.map(e=>r.jsx("option",{value:e,children:e.toUpperCase()},e))}),r.jsx("input",{className:"cmp-input",placeholder:"Ticker (e.g. NPN)",value:a,onChange:e=>g(e.target.value),onKeyDown:e=>e.key==="Enter"&&f()}),r.jsxs("button",{className:"cmp-add-btn",onClick:f,disabled:!a||o.length>=3,children:[r.jsx(M,{size:13})," Add"]})]}),r.jsxs("div",{className:"cmp-chips",children:[o.map((e,t)=>r.jsxs("span",{className:"cmp-chip",style:{borderColor:h[t],color:h[t]},children:[e.label,r.jsx("button",{className:"cmp-chip-remove",onClick:()=>n(e.label),children:r.jsx(E,{size:10})})]},e.label)),o.length===0&&r.jsx("span",{className:"cmp-hint",children:"Add up to 3 stocks to compare their normalized performance"})]})]}),o.length>0&&r.jsx("div",{className:"cmp-tf-row",children:w.map(e=>r.jsx("button",{className:`cmp-tf-btn ${m.label===e.label?"active":""}`,onClick:()=>v(e),children:e.label},e.label))}),o.length>0?r.jsx("div",{className:"panel cmp-chart-card",children:S?r.jsx("div",{className:"cmp-loading",children:"Loading history…"}):z.length>0?r.jsxs(r.Fragment,{children:[r.jsx(R,{width:"100%",height:340,children:r.jsxs(T,{data:z,margin:{top:12,right:20,bottom:0,left:0},children:[r.jsx($,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),r.jsx(I,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),r.jsx(G,{domain:["auto","auto"],tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:48,tickFormatter:e=>`${e}`}),r.jsx(U,{formatter:(e,t)=>[`${(e??0).toFixed(2)}`,t??""],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11},labelStyle:{color:"var(--color-text-muted)",marginBottom:4}}),r.jsx(q,{wrapperStyle:{fontSize:11,paddingTop:8}}),o.map((e,t)=>r.jsx(B,{type:"monotone",dataKey:e.label,stroke:h[t],strokeWidth:2,dot:!1,connectNulls:!0,isAnimationActive:!1},e.label))]})}),r.jsx("p",{className:"cmp-note",children:"All series normalized to 100 at start of period. Values above 100 indicate gains relative to start date."})]}):r.jsx("div",{className:"cmp-loading",children:"No history data for selected timeframe"})}):null,(()=>{const e=N.filter(c=>c.normalized.length>1);if(e.length<2||S)return null;const t=e.map(c=>c.normalized.map(i=>i.value)),l=e.length,u=Array.from({length:l},(c,i)=>Array.from({length:l},(j,d)=>i===d?1:K(t[i],t[d])));return r.jsxs("div",{className:"panel cmp-corr-card",children:[r.jsx("div",{className:"cmp-corr-head",children:"Correlation Matrix"}),r.jsxs("table",{className:"cmp-matrix",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{}),e.map((c,i)=>{const j=o.findIndex(d=>d.label===c.label);return r.jsx("th",{className:"cmp-matrix-th",style:{color:h[j]},children:c.label.split(" ")[0]},i)})]})}),r.jsx("tbody",{children:u.map((c,i)=>{const j=o.findIndex(d=>d.label===e[i].label);return r.jsxs("tr",{children:[r.jsx("td",{className:"cmp-matrix-th",style:{color:h[j]},children:e[i].label.split(" ")[0]}),c.map((d,C)=>r.jsx("td",{className:"cmp-matrix-cell",style:{background:P(d)},children:d.toFixed(2)},C))]},i)})})]}),r.jsxs("p",{className:"cmp-note cmp-corr-note",children:["Pearson correlation over ",m.label," period. Green = positive, red = negative, ≥|0.7| = strong."]})]})})(),o.length===0&&r.jsxs("div",{className:"panel cmp-empty",children:[r.jsx(F,{size:28,style:{opacity:.2,marginBottom:"0.75rem"}}),r.jsx("p",{children:"Select stocks above to compare their performance"})]}),r.jsx("style",{children:`
        .compare-page { display: flex; flex-direction: column; gap: 1rem; max-width: 900px; }
        .cmp-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .cmp-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .cmp-selector { padding: 0.875rem 1rem; display: flex; flex-direction: column; gap: 0.625rem; }
        .cmp-input-row { display: flex; gap: 0.5rem; align-items: center; }

        .cmp-select {
          background: var(--color-bg-tertiary); border: 1px solid var(--color-border);
          border-radius: 4px; padding: 5px 8px; color: var(--color-text-primary);
          font-size: 11px; font-family: var(--font-mono); font-weight: 700;
          cursor: pointer; outline: none;
        }
        .cmp-input {
          flex: 1; background: var(--color-bg-tertiary); border: 1px solid var(--color-border);
          border-radius: 4px; padding: 5px 10px; color: var(--color-text-primary);
          font-size: 12px; font-family: var(--font-mono); outline: none;
        }
        .cmp-input:focus { border-color: var(--color-gold-dim); }
        .cmp-add-btn {
          display: flex; align-items: center; gap: 4px;
          padding: 5px 12px; border-radius: 4px;
          border: 1px solid var(--color-gold-dim);
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.1s;
        }
        .cmp-add-btn:disabled { opacity: 0.4; cursor: default; }
        .cmp-add-btn:not(:disabled):hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        .cmp-chips { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; min-height: 26px; }
        .cmp-chip {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 8px; border-radius: 12px; border: 1px solid;
          font-size: 11px; font-weight: 700; font-family: var(--font-mono);
          background: rgba(255,255,255,0.03);
        }
        .cmp-chip-remove {
          background: none; border: none; cursor: pointer; color: inherit;
          display: flex; align-items: center; padding: 0; opacity: 0.6;
          transition: opacity 0.1s;
        }
        .cmp-chip-remove:hover { opacity: 1; }
        .cmp-hint { font-size: 11px; color: var(--color-text-muted); }

        .cmp-tf-row { display: flex; gap: 4px; }
        .cmp-tf-btn {
          padding: 3px 10px; border-radius: 4px; font-size: 11px; font-weight: 600;
          border: 1px solid var(--color-border); background: none;
          color: var(--color-text-muted); cursor: pointer;
          font-family: var(--font-mono); transition: all 0.1s;
        }
        .cmp-tf-btn.active {
          color: var(--color-gold); border-color: var(--color-gold-dim);
          background: var(--color-gold-subtle);
        }

        .cmp-chart-card { padding: 1rem 0.5rem 0.75rem; }
        .cmp-loading {
          height: 340px; display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: var(--color-text-muted);
        }
        .cmp-note {
          margin: 0.625rem 0 0; padding: 0 0.5rem;
          font-size: 10px; color: var(--color-text-muted); line-height: 1.4;
        }

        .cmp-empty {
          padding: 3rem 2rem; text-align: center; display: flex; flex-direction: column;
          align-items: center; font-size: 13px; color: var(--color-text-muted);
        }
        .cmp-empty p { margin: 0; }

        /* Correlation matrix */
        .cmp-corr-card { padding: 0.875rem 1rem 0.75rem; }
        .cmp-corr-head {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.75rem;
        }
        .cmp-matrix { border-collapse: collapse; font-size: 12px; font-family: var(--font-mono); width: auto; }
        .cmp-matrix-th {
          padding: 6px 12px; font-size: 10px; font-weight: 700;
          text-align: left; color: var(--color-text-muted);
        }
        .cmp-matrix-cell {
          padding: 6px 14px; text-align: center; font-weight: 600;
          border: 1px solid var(--color-border-subtle); border-radius: 3px;
          transition: background 0.2s;
        }
        .cmp-corr-note { margin-top: 0.5rem; }
      `})]})}export{V as default};
