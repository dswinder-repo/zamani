import{r as l,k as N,j as o}from"./vendor-9MAh3nQh.js";import{p as z,X as S,G as w}from"./index-Dq8V_bUD.js";import{P as C}from"./plus-zrjx2Pzz.js";import{R as L,d as E,a as A,X as F,Y as R,T,e as $,L as M}from"./recharts-B7xQhVh9.js";import"./store-Dxzhro6a.js";const U=["jse","ngx","nse","gse","brvm","zse","bse","luse"],m=["#c9a84c","#4ade80","#60a5fa"],b=[{label:"1M",days:30},{label:"3M",days:90},{label:"6M",days:180},{label:"1Y",days:365}];function D(t){if(!t.length)return[];const s=t[0].close;return t.map(i=>({time:i.time,value:+(i.close/s*100).toFixed(2)}))}function O(){const[t,s]=l.useState([]),[i,x]=l.useState(""),[c,h]=l.useState("jse"),[p,v]=l.useState(b[0]);function g(){if(!i||t.length>=3)return;const e=i.trim().toUpperCase(),r=`${e} (${c.toUpperCase()})`;t.find(a=>a.label===r)||(s(a=>[...a,{symbol:e,exchange:c,label:r}]),x(""))}function y(e){s(r=>r.filter(a=>a.label!==e))}const f=N({queries:t.map(e=>({queryKey:["compare",e.symbol,e.exchange,p.days],queryFn:()=>z.getHistory(`${e.symbol}.${e.exchange.toUpperCase()}`,p.days),staleTime:5*6e4}))}),j=f.map((e,r)=>({label:t[r]?.label??"",normalized:D(e.data??[])})),n={};for(const{label:e,normalized:r}of j)for(const a of r){const d=new Date(a.time).toLocaleDateString("en-US",{month:"short",day:"numeric"});n[d]||(n[d]={}),n[d][e]=a.value}const u=Object.entries(n).map(([e,r])=>({date:e,...r})),k=f.some(e=>e.isLoading);return o.jsxs("div",{className:"compare-page",children:[o.jsxs("div",{children:[o.jsx("h1",{className:"cmp-h1",children:"Compare"}),o.jsx("p",{className:"cmp-sub",children:"Normalize up to 3 stocks to 100 and compare performance across exchanges"})]}),o.jsxs("div",{className:"panel cmp-selector",children:[o.jsxs("div",{className:"cmp-input-row",children:[o.jsx("select",{className:"cmp-select",value:c,onChange:e=>h(e.target.value),children:U.map(e=>o.jsx("option",{value:e,children:e.toUpperCase()},e))}),o.jsx("input",{className:"cmp-input",placeholder:"Ticker (e.g. NPN)",value:i,onChange:e=>x(e.target.value),onKeyDown:e=>e.key==="Enter"&&g()}),o.jsxs("button",{className:"cmp-add-btn",onClick:g,disabled:!i||t.length>=3,children:[o.jsx(C,{size:13})," Add"]})]}),o.jsxs("div",{className:"cmp-chips",children:[t.map((e,r)=>o.jsxs("span",{className:"cmp-chip",style:{borderColor:m[r],color:m[r]},children:[e.label,o.jsx("button",{className:"cmp-chip-remove",onClick:()=>y(e.label),children:o.jsx(S,{size:10})})]},e.label)),t.length===0&&o.jsx("span",{className:"cmp-hint",children:"Add up to 3 stocks to compare their normalized performance"})]})]}),t.length>0&&o.jsx("div",{className:"cmp-tf-row",children:b.map(e=>o.jsx("button",{className:`cmp-tf-btn ${p.label===e.label?"active":""}`,onClick:()=>v(e),children:e.label},e.label))}),t.length>0?o.jsx("div",{className:"panel cmp-chart-card",children:k?o.jsx("div",{className:"cmp-loading",children:"Loading history…"}):u.length>0?o.jsxs(o.Fragment,{children:[o.jsx(L,{width:"100%",height:340,children:o.jsxs(E,{data:u,margin:{top:12,right:20,bottom:0,left:0},children:[o.jsx(A,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),o.jsx(F,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),o.jsx(R,{domain:["auto","auto"],tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:48,tickFormatter:e=>`${e}`}),o.jsx(T,{formatter:(e,r)=>[`${(e??0).toFixed(2)}`,r??""],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11},labelStyle:{color:"var(--color-text-muted)",marginBottom:4}}),o.jsx($,{wrapperStyle:{fontSize:11,paddingTop:8}}),t.map((e,r)=>o.jsx(M,{type:"monotone",dataKey:e.label,stroke:m[r],strokeWidth:2,dot:!1,connectNulls:!0,isAnimationActive:!1},e.label))]})}),o.jsx("p",{className:"cmp-note",children:"All series normalized to 100 at start of period. Values above 100 indicate gains relative to start date."})]}):o.jsx("div",{className:"cmp-loading",children:"No history data for selected timeframe"})}):o.jsxs("div",{className:"panel cmp-empty",children:[o.jsx(w,{size:28,style:{opacity:.2,marginBottom:"0.75rem"}}),o.jsx("p",{children:"Select stocks above to compare their performance"})]}),o.jsx("style",{children:`
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
      `})]})}export{O as default};
