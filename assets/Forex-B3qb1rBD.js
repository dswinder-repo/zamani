import{r as v,e as m,j as e}from"./vendor-9MAh3nQh.js";import{p as f}from"./index-C9A4Yjp8.js";import{F as y}from"./ForexTable-CuCchoPr.js";import{R as b,A as j,a as S,X as N,Y as D,T as w,b as F}from"./recharts-DZAYuskz.js";import"./store-Dxzhro6a.js";const U={USDZAR:"US Dollar / South African Rand",USDNGN:"US Dollar / Nigerian Naira",USDKES:"US Dollar / Kenyan Shilling",USDGHS:"US Dollar / Ghanaian Cedi",USDEGP:"US Dollar / Egyptian Pound",USDETB:"US Dollar / Ethiopian Birr",USDXOF:"US Dollar / West African CFA",ZARUSD:"South African Rand / US Dollar"};function c(o){return`${o.base}${o.quote}`}function k({active:o,payload:s}){if(!o||!s?.length)return null;const a=s[0]?.payload;return e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"0.375rem 0.625rem",fontSize:11,fontFamily:"var(--font-mono)"},children:[e.jsx("div",{style:{color:"var(--color-text-muted)",marginBottom:2},children:a?.date}),e.jsx("div",{style:{color:"var(--color-text-primary)",fontWeight:700},children:Number(s[0].value).toFixed(4)})]})}function C(){const[o,s]=v.useState(null),{data:a,isLoading:h}=m({queryKey:["forex","all"],queryFn:()=>f.getForex?.([])??Promise.resolve([]),staleTime:6e4,refetchInterval:6e4}),r=o??(a?.[0]?c(a[0]):null),{data:p,isLoading:g}=m({queryKey:["forex-history",r],queryFn:()=>r?f.getHistory(r,30):Promise.resolve([]),staleTime:5*6e4,enabled:!!r}),i=a?.find(t=>c(t)===r),n=(i?.changePct??0)>=0,d=(p??[]).map(t=>({date:new Date(t.time).toLocaleDateString("en-US",{month:"short",day:"numeric"}),close:t.close}));return e.jsxs("div",{className:"forex-page",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"fx-h1",children:"Forex"}),e.jsx("p",{className:"fx-sub",children:"African currency exchange rates vs USD — live, refreshed every minute"})]}),e.jsxs("div",{className:"fx-body",children:[e.jsxs("div",{children:[e.jsx("div",{className:"section-label",children:"Rates"}),h?e.jsx("p",{style:{fontSize:12,color:"var(--color-text-muted)"},children:"Loading…"}):e.jsx("div",{className:"fx-rate-list panel",children:(a??[]).map(t=>{const l=c(t),u=l===r,x=t.changePct>=0;return e.jsxs("button",{className:`fx-rate-row ${u?"active":""}`,onClick:()=>s(l),children:[e.jsxs("span",{className:"fx-pair num",children:[t.base,"/",t.quote]}),e.jsx("span",{className:"fx-rate num",children:t.rate.toLocaleString("en-US",{minimumFractionDigits:4,maximumFractionDigits:4})}),e.jsxs("span",{className:`fx-chg num ${x?"text-up":"text-down"}`,children:[x?"+":"",t.changePct.toFixed(2),"%"]})]},l)})})]}),e.jsxs("div",{children:[e.jsx("div",{className:"section-label",children:r?U[r]??r:"Select a pair"}),e.jsxs("div",{className:"fx-chart-card panel",children:[i&&e.jsxs("div",{className:"fx-chart-header",children:[e.jsxs("span",{className:"fx-chart-pair num",children:[i.base,"/",i.quote]}),e.jsx("span",{className:"fx-chart-rate num",children:i.rate.toLocaleString("en-US",{minimumFractionDigits:4,maximumFractionDigits:4})}),e.jsxs("span",{className:`fx-chart-chg num ${n?"text-up":"text-down"}`,children:[n?"+":"",i.changePct.toFixed(2),"%"]})]}),g?e.jsx("div",{className:"fx-chart-loading",children:"Loading chart…"}):d.length>0?e.jsx(b,{width:"100%",height:200,children:e.jsxs(j,{data:d,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"fxGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"5%",stopColor:n?"var(--color-up)":"var(--color-down)",stopOpacity:.2}),e.jsx("stop",{offset:"95%",stopColor:n?"var(--color-up)":"var(--color-down)",stopOpacity:0})]})}),e.jsx(S,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(N,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(D,{domain:["auto","auto"],tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:52,orientation:"right",tickFormatter:t=>Number(t).toFixed(2)}),e.jsx(w,{content:e.jsx(k,{})}),e.jsx(F,{type:"monotone",dataKey:"close",stroke:n?"var(--color-up)":"var(--color-down)",strokeWidth:1.5,fill:"url(#fxGrad)",dot:!1,isAnimationActive:!1})]})}):e.jsx("div",{className:"fx-chart-loading",children:"No history data"})]}),e.jsxs("div",{style:{marginTop:"1.5rem"},children:[e.jsx("div",{className:"section-label",children:"All Rates"}),e.jsx(y,{rates:a??[]})]})]})]}),e.jsx("style",{children:`
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
      `})]})}export{C as default};
