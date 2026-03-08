import{r as n,e as j,j as e}from"./vendor-9MAh3nQh.js";import{o as N,f as E,T as k,X as T,p as b}from"./index-4AEG-TBf.js";import{P as J}from"./plus-DyOHlirB.js";import{T as S}from"./trending-down-DkK-TB6W.js";import{R as A,L as B,X as F,Y as q,T as C,h as D,d as R,a as w}from"./recharts-WEknt4oI.js";import"./store-DR-NtvzW.js";function I(){try{return JSON.parse(localStorage.getItem("zamani-beat-picks")??"[]")}catch{return[]}}function z(o){localStorage.setItem("zamani-beat-picks",JSON.stringify(o))}const K=["#f59e0b","#60a5fa","#a78bfa"];function G(){const[o,u]=n.useState(I),[p,f]=n.useState(""),[d,g]=n.useState(!1),[h,l]=n.useState(null),x=j({queryKey:["beat-index-quotes",o.map(r=>r.symbol)],queryFn:async()=>(await Promise.allSettled(o.map(t=>b.getQuote(t.symbol)))).filter(t=>t.status==="fulfilled").map(t=>t.value),enabled:o.length>0,staleTime:3e4,refetchInterval:3e4}),a=j({queryKey:["beat-index-bench"],queryFn:()=>b.getQuote("^J200").catch(()=>b.getQuote("NPN.JO")),staleTime:3e4,refetchInterval:3e4});async function y(){const r=p.trim().toUpperCase();if(r){if(o.length>=3){l("Maximum 3 picks. Remove one first.");return}if(o.some(t=>t.symbol===r)){l(`${r} already in your picks.`);return}g(!0),l(null);try{const t=await b.getQuote(r);if(!t||!t.price)throw new Error("No price data");const i={symbol:r,addedDate:new Date().toISOString().slice(0,10),addedPrice:t.price},m=[...o,i];u(m),z(m),f("")}catch{l(`Could not find "${r}". Try a JSE symbol like NPN, BHG, SBK.`)}finally{g(!1)}}}function P(r){const t=o.filter(i=>i.symbol!==r);u(t),z(t)}const s=n.useMemo(()=>x.data?o.map((r,t)=>{const i=x.data?.find(L=>L.symbol===r.symbol);if(!i)return null;const m=(i.price-r.addedPrice)/r.addedPrice*100;return{...r,currentPrice:i.price,pct:m,name:i.name??r.symbol,color:K[t]}}).filter(Boolean):[],[o,x.data]),c=a.data?a.data.changePct??0:null,v=n.useMemo(()=>s.length?[{label:"At Pick",...Object.fromEntries(s.map(r=>[r.symbol,0])),JSE:0},{label:"Now",...Object.fromEntries(s.map(r=>[r.symbol,r.pct])),JSE:c??0}]:[],[s,c]);return e.jsxs("div",{className:"bi-page",children:[e.jsx("div",{className:"bi-header",children:e.jsxs("div",{children:[e.jsxs("h1",{className:"bi-title",children:[e.jsx(N,{size:20,style:{verticalAlign:"middle",marginRight:8}}),"Beat the Index"]}),e.jsx("p",{className:"bi-sub",children:"Pick up to 3 JSE stocks. Track their return vs the JSE Top 40 since you added them."})]})}),o.length<3&&e.jsxs("div",{className:"bi-add-row",children:[e.jsx(E,{size:12,style:{color:"var(--color-text-muted)",flexShrink:0}}),e.jsx("input",{className:"bi-input",placeholder:"Add JSE symbol (e.g. NPN, BHG, SBK)",value:p,onChange:r=>{f(r.target.value),l(null)},onKeyDown:r=>r.key==="Enter"&&!d&&y(),disabled:d}),e.jsx("button",{className:"bi-add-btn",onClick:y,disabled:!p.trim()||d,children:d?"…":e.jsxs(e.Fragment,{children:[e.jsx(J,{size:11})," Add"]})})]}),h&&e.jsx("div",{className:"bi-error",children:h}),o.length===0&&e.jsxs("div",{className:"bi-empty panel",children:[e.jsx(N,{size:28,style:{opacity:.2,marginBottom:"0.5rem"}}),e.jsx("p",{children:"No picks yet."}),e.jsx("p",{style:{fontSize:11},children:"Add up to 3 JSE stock symbols above to start tracking."})]}),o.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"bi-scoreboard",children:[e.jsxs("div",{className:"bi-card panel bi-card--bench",children:[e.jsx("div",{className:"bi-card-label",children:"JSE Top 40 (today)"}),e.jsx("div",{className:"bi-card-sym",children:"^J200"}),a.isLoading?e.jsx("div",{className:"bi-loading",children:"…"}):a.data?e.jsxs("div",{className:`bi-card-pct ${(a.data.changePct??0)>=0?"up":"down"}`,children:[(a.data.changePct??0)>=0?"+":"",(a.data.changePct??0).toFixed(2),"%",(a.data.changePct??0)>=0?e.jsx(k,{size:14,style:{marginLeft:4}}):e.jsx(S,{size:14,style:{marginLeft:4}})]}):e.jsx("div",{className:"bi-loading",children:"N/A"}),e.jsx("div",{className:"bi-card-note",children:"Today's index change (benchmark)"})]}),s.map(r=>{const t=c!==null&&r.pct>c;return e.jsxs("div",{className:"bi-card panel",style:{borderTopColor:r.color},children:[e.jsx("button",{className:"bi-remove",onClick:()=>P(r.symbol),"aria-label":`Remove ${r.symbol}`,children:e.jsx(T,{size:10})}),e.jsx("div",{className:"bi-card-label",children:r.name}),e.jsx("div",{className:"bi-card-sym",style:{color:r.color},children:r.symbol}),e.jsxs("div",{className:`bi-card-pct ${r.pct>=0?"up":"down"}`,children:[r.pct>=0?"+":"",r.pct.toFixed(2),"%",r.pct>=0?e.jsx(k,{size:14,style:{marginLeft:4}}):e.jsx(S,{size:14,style:{marginLeft:4}})]}),e.jsxs("div",{className:"bi-card-since",children:["Since ",r.addedDate," @ ",r.addedPrice.toLocaleString("en-US",{minimumFractionDigits:2})," ZAR"]}),e.jsx("div",{className:"bi-card-vs",children:c!==null?t?e.jsx("span",{className:"bi-beating",children:"✓ Beating the index"}):e.jsx("span",{className:"bi-losing",children:"✗ Lagging the index"}):null})]},r.symbol)})]}),v.length>0&&e.jsxs("div",{className:"panel bi-chart-wrap",children:[e.jsx("div",{className:"section-label",style:{marginBottom:"0.5rem"},children:"Performance Since Added (%)"}),e.jsx(A,{width:"100%",height:220,children:e.jsxs(B,{data:v,margin:{top:8,right:24,left:0,bottom:0},children:[e.jsx(F,{dataKey:"label",tick:{fontSize:10,fill:"var(--color-text-muted)"},axisLine:!1,tickLine:!1}),e.jsx(q,{tickFormatter:r=>`${r}%`,tick:{fontSize:9,fill:"var(--color-text-muted)"},axisLine:!1,tickLine:!1,width:40}),e.jsx(C,{formatter:r=>[`${Number(r??0)>=0?"+":""}${Number(r??0).toFixed(2)}%`],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",fontSize:11,fontFamily:"var(--font-mono)"},labelStyle:{color:"var(--color-text-muted)"}}),e.jsx(D,{wrapperStyle:{fontSize:10,paddingTop:8}}),e.jsx(R,{y:0,stroke:"var(--color-border)",strokeDasharray:"3 3"}),s.map(r=>e.jsx(w,{type:"monotone",dataKey:r.symbol,stroke:r.color,strokeWidth:2,dot:{fill:r.color,r:4}},r.symbol)),e.jsx(w,{type:"monotone",dataKey:"JSE",stroke:"var(--color-text-muted)",strokeWidth:1.5,strokeDasharray:"4 3",dot:{fill:"var(--color-text-muted)",r:3}})]})})]}),e.jsx("p",{className:"bi-disclaimer",children:"Performance calculated from the price at time of adding vs current quote. Not financial advice."})]}),e.jsx("style",{children:`
        .bi-page { display: flex; flex-direction: column; gap: 1rem; max-width: 900px; }
        .bi-header { }
        .bi-title { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; display: flex; align-items: center; }
        .bi-sub { margin: 0.25rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .bi-add-row {
          display: flex; align-items: center; gap: 0.5rem;
          background: var(--color-bg-secondary); border: 1px solid var(--color-border);
          border-radius: 4px; padding: 0.375rem 0.75rem; max-width: 360px;
        }
        .bi-input {
          flex: 1; background: none; border: none; outline: none;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--color-text-primary); text-transform: uppercase;
        }
        .bi-input::placeholder { text-transform: none; color: var(--color-text-muted); font-family: var(--font-sans); }
        .bi-add-btn {
          display: flex; align-items: center; gap: 4px;
          background: var(--color-gold-subtle); border: 1px solid var(--color-gold-dim);
          color: var(--color-gold); border-radius: 3px; padding: 2px 8px;
          font-size: 10px; font-weight: 600; cursor: pointer; transition: all 0.1s;
        }
        .bi-add-btn:hover:not(:disabled) { background: var(--color-gold-dim); color: var(--color-bg-primary); }
        .bi-add-btn:disabled { opacity: 0.4; cursor: default; }
        .bi-error { font-size: 11px; color: var(--color-down); font-family: var(--font-mono); }

        .bi-empty {
          padding: 3rem 2rem; text-align: center; max-width: 400px;
          color: var(--color-text-muted); font-size: 13px;
          display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
        }
        .bi-empty p { margin: 0; }

        .bi-scoreboard {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
        }
        .bi-card {
          padding: 0.875rem; position: relative;
          border-top: 3px solid var(--color-border);
          display: flex; flex-direction: column; gap: 4px;
        }
        .bi-card--bench { border-top-color: var(--color-text-muted); }
        .bi-card-label { font-size: 10px; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bi-card-sym { font-family: var(--font-mono); font-size: 16px; font-weight: 800; color: var(--color-gold); }
        .bi-card-pct {
          font-size: 22px; font-weight: 800; display: flex; align-items: center;
        }
        .bi-card-pct.up   { color: var(--color-up); }
        .bi-card-pct.down { color: var(--color-down); }
        .bi-card-since { font-size: 9px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .bi-card-note  { font-size: 9px; color: var(--color-text-muted); font-style: italic; }
        .bi-card-vs    { font-size: 10px; font-weight: 600; margin-top: 2px; }
        .bi-beating { color: var(--color-up); }
        .bi-losing  { color: var(--color-down); }
        .bi-loading { font-size: 12px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .bi-remove {
          position: absolute; top: 0.5rem; right: 0.5rem;
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); padding: 2px; border-radius: 3px; transition: all 0.1s;
        }
        .bi-remove:hover { color: var(--color-down); background: var(--color-down-subtle); }

        .bi-chart-wrap { padding: 0.875rem; }
        .bi-disclaimer { font-size: 10px; color: var(--color-text-muted); font-style: italic; }
      `})]})}export{G as default};
