import{k as g,j as e}from"./vendor-9MAh3nQh.js";import{T as h}from"./index-usIiblUo.js";import{R as v,L as y,C as j,X as b,Y as N,T as k,c as w,a as L}from"./recharts-DK6PfPlO.js";import"./store-DR-NtvzW.js";const S="https://api.worldbank.org/v2",u=[{id:"NY.GDP.MKTP.KD.ZG",label:"GDP Growth (%)",unit:"%"},{id:"FP.CPI.TOTL.ZG",label:"Inflation, CPI (%)",unit:"%"},{id:"SL.UEM.TOTL.ZS",label:"Unemployment Rate (%)",unit:"%"},{id:"BN.CAB.XOKA.GD.ZS",label:"Current Account (% GDP)",unit:"%"}],r=[{code:"ZA",name:"South Africa",color:"#c9a84c"},{code:"NG",name:"Nigeria",color:"#4ade80"},{code:"KE",name:"Kenya",color:"#60a5fa"},{code:"GH",name:"Ghana",color:"#f472b6"},{code:"UG",name:"Uganda",color:"#fb923c"},{code:"ET",name:"Ethiopia",color:"#a78bfa"}];async function A(l,m){const a=`${S}/country/${l}/indicator/${m}?format=json&mrv=12&per_page=12`,n=await fetch(a);if(!n.ok)return[];const i=(await n.json())[1];return i?i.filter(t=>t.value!=null).sort((t,f)=>t.date.localeCompare(f.date)).map(t=>({date:t.date,value:t.value})):[]}function z(){const l=g({queries:u.flatMap(a=>r.map(n=>({queryKey:["wb",n.code,a.id],queryFn:()=>A(n.code,a.id),staleTime:864e5})))}),m=l.some(a=>a.isLoading);return e.jsxs("div",{className:"eco-page",children:[e.jsxs("div",{children:[e.jsxs("h1",{className:"eco-h1",children:[e.jsx(h,{size:16,style:{verticalAlign:"middle",marginRight:6}}),"Macro — Economic Indicators"]}),e.jsxs("p",{className:"eco-sub",children:["World Bank data · Annual · ",r.map(a=>a.name).join(", ")]})]}),m?e.jsx("div",{className:"panel eco-loading",children:"Loading World Bank data…"}):e.jsx("div",{className:"eco-grid",children:u.map((a,n)=>{const p=new Set,i={};r.forEach((o,c)=>{const s=n*r.length+c,x=l[s]?.data??[];i[o.code]={},x.forEach(d=>{d.value!=null&&(p.add(d.date),i[o.code][d.date]=+d.value.toFixed(2))})});const t=[...p].sort().map(o=>{const c={year:o};return r.forEach(s=>{i[s.code][o]!=null&&(c[s.code]=i[s.code][o])}),c}),f=t.length>0;return e.jsxs("div",{className:"panel eco-card",children:[e.jsx("div",{className:"eco-card-title",children:a.label}),f?e.jsxs(e.Fragment,{children:[e.jsx(v,{width:"100%",height:220,children:e.jsxs(y,{data:t,margin:{top:8,right:8,bottom:0,left:0},children:[e.jsx(j,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(b,{dataKey:"year",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"}}),e.jsx(N,{tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:32,orientation:"right",tickFormatter:o=>`${o}${a.unit}`}),e.jsx(k,{formatter:(o,c)=>[`${Number(o??0).toFixed(2)}${a.unit}`,r.find(s=>s.code===c)?.name??c],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:10},labelStyle:{color:"var(--color-text-muted)",marginBottom:4}}),e.jsx(w,{y:0,stroke:"var(--color-border)",strokeOpacity:.6}),r.map(o=>e.jsx(L,{type:"monotone",dataKey:o.code,stroke:o.color,strokeWidth:1.5,dot:{r:2,fill:o.color},connectNulls:!0,isAnimationActive:!1},o.code))]})}),e.jsx("div",{className:"eco-legend",children:r.map(o=>e.jsx("span",{className:"eco-legend-item",style:{color:o.color},children:o.name},o.code))})]}):e.jsx("div",{className:"eco-no-data",children:"No data available"})]},a.id)})}),e.jsx("div",{className:"eco-source",children:"Source: World Bank Open Data · Last 12 years · Updated annually"}),e.jsx("style",{children:`
        .eco-page { display: flex; flex-direction: column; gap: 1.25rem; max-width: 1100px; }
        .eco-h1 { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .eco-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .eco-loading { padding: 2.5rem; text-align: center; font-size: 12px; color: var(--color-text-muted); }

        .eco-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (max-width: 800px) { .eco-grid { grid-template-columns: 1fr; } }

        .eco-card { padding: 0.875rem 0.75rem 0.625rem; }
        .eco-card-title {
          font-size: 11px; font-weight: 700; color: var(--color-text-secondary);
          text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.75rem;
        }
        .eco-no-data { height: 220px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--color-text-muted); }

        .eco-legend {
          display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem;
          padding: 0 0.25rem; font-size: 9px; font-family: var(--font-mono);
        }
        .eco-legend-item { font-weight: 600; }

        .eco-source {
          font-size: 10px; color: var(--color-text-muted); text-align: center; padding: 0.5rem;
        }
      `})]})}export{z as default};
