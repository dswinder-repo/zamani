import{r as x,e as g,j as e}from"./vendor-9MAh3nQh.js";import{g as b,p as y}from"./index-DsDVfAGa.js";import{F as j}from"./ForexTable-CuCchoPr.js";import{R as S,A as w,a as D,X as N,Y as U,T as F,b as k}from"./recharts-Bc8jWMle.js";import"./store-Dxzhro6a.js";const z={USDZAR:"US Dollar / South African Rand",USDNGN:"US Dollar / Nigerian Naira",USDKES:"US Dollar / Kenyan Shilling",USDGHS:"US Dollar / Ghanaian Cedi",USDEGP:"US Dollar / Egyptian Pound",USDETB:"US Dollar / Ethiopian Birr",USDXOF:"US Dollar / West African CFA",USDUGX:"US Dollar / Ugandan Shilling",ZARUSD:"South African Rand / US Dollar"};function h(l){return`${l.base}${l.quote}`}function A({active:l,payload:a}){if(!l||!a?.length)return null;const n=a[0]?.payload;return e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"0.375rem 0.625rem",fontSize:11,fontFamily:"var(--font-mono)"},children:[e.jsx("div",{style:{color:"var(--color-text-muted)",marginBottom:2},children:n?.date}),e.jsx("div",{style:{color:"var(--color-text-primary)",fontWeight:700},children:Number(a[0].value).toFixed(4)})]})}function C({rates:l}){const a=x.useMemo(()=>{const r={USD:1};for(const i of l)i.base==="USD"&&(r[i.quote]=i.rate),i.quote==="USD"&&(r[i.base]=1/i.rate);return r},[l]),n=x.useMemo(()=>["USD",...Object.keys(a).filter(r=>r!=="USD").sort()],[a]),[m,s]=x.useState("1"),[c,f]=x.useState("USD"),[t,d]=x.useState("ZAR"),p=x.useMemo(()=>{const r=parseFloat(m);if(!isFinite(r)||!a[c]||!a[t])return null;const i=a[c],u=a[t],v=c==="USD"?r:r/i;return t==="USD"?v:v*u},[m,c,t,a]),o=()=>{f(t),d(c)};return e.jsxs("div",{className:"panel conv-card",children:[e.jsx("div",{className:"section-label",children:"Currency Converter"}),e.jsxs("div",{className:"conv-row",children:[e.jsx("input",{type:"number",className:"conv-amount",value:m,min:"0",step:"any",onChange:r=>s(r.target.value)}),e.jsx("select",{className:"conv-select",value:c,onChange:r=>f(r.target.value),children:n.map(r=>e.jsx("option",{children:r},r))}),e.jsx("button",{className:"conv-swap",onClick:o,title:"Swap currencies",children:"⇄"}),e.jsx("select",{className:"conv-select",value:t,onChange:r=>d(r.target.value),children:n.map(r=>e.jsx("option",{children:r},r))})]}),e.jsx("div",{className:"conv-result",children:p!=null?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"conv-from num",children:[parseFloat(m||"0").toLocaleString("en-US",{minimumFractionDigits:2})," ",c]}),e.jsx("span",{className:"conv-eq",children:" = "}),e.jsxs("span",{className:"conv-to num",children:[p.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:4})," ",t]})]}):e.jsx("span",{style:{color:"var(--color-text-muted)",fontSize:12},children:"Rate not available"})})]})}function T(){const[l,a]=x.useState(null),{data:n,isLoading:m}=g({queryKey:["forex","all"],queryFn:()=>b(),staleTime:6e4,refetchInterval:6e4}),s=l??(n?.[0]?h(n[0]):null),{data:c,isLoading:f}=g({queryKey:["forex-history",s],queryFn:()=>s?y.getHistory(s,30):Promise.resolve([]),staleTime:5*6e4,enabled:!!s}),t=n?.find(o=>h(o)===s),d=(t?.changePct??0)>=0,p=(c??[]).map(o=>({date:new Date(o.time).toLocaleDateString("en-US",{month:"short",day:"numeric"}),close:o.close}));return e.jsxs("div",{className:"forex-page",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"fx-h1",children:"Forex"}),e.jsx("p",{className:"fx-sub",children:"African currency exchange rates vs USD — live, refreshed every minute"})]}),e.jsxs("div",{className:"fx-body",children:[e.jsxs("div",{children:[e.jsx("div",{className:"section-label",children:"Rates"}),m?e.jsx("p",{style:{fontSize:12,color:"var(--color-text-muted)"},children:"Loading…"}):e.jsx("div",{className:"fx-rate-list panel",children:(n??[]).map(o=>{const r=h(o),i=r===s,u=o.changePct>=0;return e.jsxs("button",{className:`fx-rate-row ${i?"active":""}`,onClick:()=>a(r),children:[e.jsxs("span",{className:"fx-pair num",children:[o.base,"/",o.quote]}),e.jsx("span",{className:"fx-rate num",children:o.rate.toLocaleString("en-US",{minimumFractionDigits:4,maximumFractionDigits:4})}),e.jsxs("span",{className:`fx-chg num ${u?"text-up":"text-down"}`,children:[u?"+":"",o.changePct.toFixed(2),"%"]})]},r)})})]}),e.jsxs("div",{children:[e.jsx("div",{className:"section-label",children:s?z[s]??s:"Select a pair"}),e.jsxs("div",{className:"fx-chart-card panel",children:[t&&e.jsxs("div",{className:"fx-chart-header",children:[e.jsxs("span",{className:"fx-chart-pair num",children:[t.base,"/",t.quote]}),e.jsx("span",{className:"fx-chart-rate num",children:t.rate.toLocaleString("en-US",{minimumFractionDigits:4,maximumFractionDigits:4})}),e.jsxs("span",{className:`fx-chart-chg num ${d?"text-up":"text-down"}`,children:[d?"+":"",t.changePct.toFixed(2),"%"]})]}),f?e.jsx("div",{className:"fx-chart-loading",children:"Loading chart…"}):p.length>0?e.jsx(S,{width:"100%",height:200,children:e.jsxs(w,{data:p,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"fxGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"5%",stopColor:d?"var(--color-up)":"var(--color-down)",stopOpacity:.2}),e.jsx("stop",{offset:"95%",stopColor:d?"var(--color-up)":"var(--color-down)",stopOpacity:0})]})}),e.jsx(D,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(N,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(U,{domain:["auto","auto"],tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:52,orientation:"right",tickFormatter:o=>Number(o).toFixed(2)}),e.jsx(F,{content:e.jsx(A,{})}),e.jsx(k,{type:"monotone",dataKey:"close",stroke:d?"var(--color-up)":"var(--color-down)",strokeWidth:1.5,fill:"url(#fxGrad)",dot:!1,isAnimationActive:!1})]})}):e.jsx("div",{className:"fx-chart-loading",children:"No history data"})]}),e.jsxs("div",{style:{marginTop:"1.5rem"},children:[e.jsx("div",{className:"section-label",children:"All Rates"}),e.jsx(j,{rates:n??[]})]})]})]}),(n??[]).length>0&&e.jsx(C,{rates:n??[]}),e.jsx("style",{children:`
        .forex-page { display: flex; flex-direction: column; gap: 1rem; max-width: 1000px; }
        .fx-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .fx-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
        }

        .fx-body {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 700px) {
          .fx-body { grid-template-columns: 1fr; }
        }

        /* Rate list */
        .fx-rate-list { overflow: hidden; }
        .fx-rate-row {
          display: grid; grid-template-columns: 80px 1fr auto;
          gap: 0.5rem; align-items: center;
          padding: 0.5rem 0.75rem; width: 100%;
          background: none; border: none; cursor: pointer;
          border-bottom: 1px solid var(--color-border-subtle);
          transition: background 0.1s; text-align: left;
        }
        .fx-rate-row:last-child { border-bottom: none; }
        .fx-rate-row:hover  { background: var(--color-bg-hover); }
        .fx-rate-row.active { background: var(--color-gold-subtle); }

        .fx-pair { font-size: 11px; font-weight: 700; color: var(--color-text-primary); }
        .fx-rate { font-size: 11px; color: var(--color-text-secondary); }
        .fx-chg  { font-size: 10px; font-weight: 600; }

        /* Chart card */
        .fx-chart-card { padding: 0.75rem 0.5rem 0.5rem; }
        .fx-chart-header {
          display: flex; align-items: baseline; gap: 0.5rem;
          padding: 0 0.25rem; margin-bottom: 0.75rem;
        }
        .fx-chart-pair { font-size: 14px; font-weight: 800; color: var(--color-text-primary); }
        .fx-chart-rate { font-size: 20px; font-weight: 800; color: var(--color-text-primary); letter-spacing: -0.02em; }
        .fx-chart-chg  { font-size: 12px; font-weight: 600; }
        .fx-chart-loading {
          height: 200px; display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: var(--color-text-muted);
        }

        /* Currency converter */
        .conv-card { padding: 0.875rem 1rem; display: flex; flex-direction: column; gap: 0.625rem; }
        .conv-row {
          display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
        }
        .conv-amount {
          width: 100px; background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border); border-radius: 4px;
          padding: 5px 8px; color: var(--color-text-primary);
          font-size: 13px; font-family: var(--font-mono); font-weight: 700; outline: none;
        }
        .conv-amount:focus { border-color: var(--color-gold-dim); }
        .conv-select {
          background: var(--color-bg-tertiary); border: 1px solid var(--color-border);
          border-radius: 4px; padding: 5px 8px; color: var(--color-text-primary);
          font-size: 12px; font-family: var(--font-mono); font-weight: 700; cursor: pointer; outline: none;
        }
        .conv-swap {
          background: var(--color-bg-elevated); border: 1px solid var(--color-border);
          border-radius: 4px; padding: 4px 8px; color: var(--color-text-muted);
          font-size: 14px; cursor: pointer; transition: all 0.1s;
        }
        .conv-swap:hover { color: var(--color-gold); border-color: var(--color-gold-dim); }
        .conv-result { display: flex; align-items: baseline; gap: 4px; flex-wrap: wrap; }
        .conv-from { font-size: 13px; color: var(--color-text-secondary); font-weight: 600; }
        .conv-eq   { font-size: 13px; color: var(--color-text-muted); }
        .conv-to   { font-size: 18px; font-weight: 800; color: var(--color-gold); }
      `})]})}export{T as default};
