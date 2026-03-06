import{j as e,r as v,k as F,e as h,u as D}from"./vendor-9MAh3nQh.js";import{c as E,u as P,p as u,S as q,X as R,g as B,a as W,T as K,b as U}from"./index-Br9bE2jI.js";import{N as $,I as O,T as J}from"./NdebelePanel-C_YHhQqb.js";import{F as Y}from"./ForexTable-CuCchoPr.js";import{S as X}from"./Sparkline-Sa5-OsUq.js";import{P as C}from"./plus-J27WU0cl.js";import{R as Z,L as _,C as V,X as H,Y as Q,T as ee,a as ae}from"./recharts-WEknt4oI.js";import{T as te}from"./trending-down-CobajspW.js";import"./store-DR-NtvzW.js";const re=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],oe=E("chevron-down",re);const se=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],ie=E("chevron-up",se),T=[{date:"01-13",year:1887,text:"The Johannesburg Stock Exchange opens, just one year after gold was discovered on the Witwatersrand. The first listings are mining companies. Nobody is surprised."},{date:"02-04",year:1994,text:"The JSE opens to foreign investors for the first time as South Africa transitions toward democracy. The rand strengthens. History is made."},{date:"03-19",year:1961,text:"The Nairobi Stock Exchange is formally constituted. Kenya becomes one of the first African nations with an organized securities market."},{date:"04-27",year:1994,text:"South Africa holds its first democratic election. The JSE surges. Nelson Mandela will become President. The market understands what this means."},{date:"05-07",year:2001,text:"MTN lists on the JSE. The South African telco will go on to become the most valuable brand on the African continent. Subscribers: 2 million. Today: 280 million."},{date:"06-12",year:1989,text:"The Ghana Stock Exchange is established. It will go on to be one of the best-performing exchanges in the world in 2023. Ghana knows what it is doing."},{date:"07-02",year:1960,text:"The Lagos Stock Exchange — later renamed the Nigerian Exchange Group — begins operations in a borrowed conference room with 19 securities listed."},{date:"08-14",year:2007,text:"The Dangote Group, founded on ₦500,000 borrowed from Aliko Dangote's uncle in 1977, announces it will list Dangote Cement. Cement. The empire begins."},{date:"09-15",year:2008,text:"Lehman Brothers collapses. African markets feel the shockwave — though the JSE, NSE, and NGX had less exposure to subprime mortgages than their Western counterparts. One small mercy."},{date:"10-31",year:2017,text:"Naspers, the South African media giant, announces it will spin off its global internet assets. Its 31% stake in Tencent is worth more than the JSE's entire banking sector. This is a normal thing that happened."},{date:"11-17",year:1997,text:"The Uganda Securities Exchange is founded. The exchange will eventually modernize to fully electronic trading — making it one of Africa's most technologically advanced small exchanges."},{date:"12-09",year:1994,text:"The Lusaka Stock Exchange opens in Zambia with 7 listed companies. The original trading floor consists of a small room and considerable optimism."},{date:"01-22",year:2019,text:"Zimbabwe's ZSE is temporarily suspended by the government amid hyperinflation. When it reopens, stocks are priced in Zimbabwe dollars. Then USD. The accountants are tired."},{date:"02-19",year:2020,text:"COVID-19 begins reaching African shores. The JSE falls 8% in a single day — its worst single-day drop since the 2008 crisis. The continent braces."},{date:"03-23",year:2020,text:"The JSE halts trading as circuit breakers trigger during the COVID-19 crash. Every exchange on the continent is red. Zamani would have shown a lot of red that day."},{date:"04-20",year:2020,text:"WTI crude oil futures go negative for the first time in history — traders literally paying people to take oil. Nigeria's budget is based on $57/barrel. The math does not work."},{date:"05-26",year:2022,text:"The Africa Continental Free Trade Agreement (AfCFTA) begins to show early signs of cross-border capital flows increasing. Pan-African investing becomes less theoretical."},{date:"06-22",year:1998,text:"The BRVM (Bourse Régionale des Valeurs Mobilières) opens, serving 8 West African nations. A single exchange for the entire UEMOA zone. Ambitious. Impressively functional."},{date:"07-28",year:2022,text:"Ghana's GSE Composite Index has its best year on record in 2022, rising over 40% — making it the world's best-performing stock exchange that year. Jollof rice and equity returns."},{date:"08-30",year:2011,text:"Africa's combined stock market capitalisation passes $1 trillion for the first time. The continent's markets have grown 500% in 10 years. The world starts paying attention."},{date:"09-03",year:1954,text:"The Nairobi Securities Exchange traces its roots to this period, when trading in shares first began in Kenya under the East African Stock Exchange Committee."},{date:"10-17",year:2023,text:"The JSE celebrates 136 years of operation — making it not just Africa's oldest and largest exchange, but one of the 20 largest in the world by market capitalisation."},{date:"11-09",year:2011,text:"Equity Bank Kenya lists on the Uganda Securities Exchange via a cross-listing — one of the first examples of true pan-African equity integration. The borders are getting thinner."},{date:"12-31",year:2023,text:"The JSE All Share Index closes the year up 8.2%. In a year where South Africa dealt with load-shedding, political uncertainty, and a 10%+ inflation peak, investors take the win."}];function ne(){const a=new Date,t=`${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`;return T.find(r=>r.date===t)??T[a.getDate()%T.length]}const le=["surge","jump","gain","rise","record","profit","growth","strong","beat","higher","boost","rally","soar","climb","outperform","upgrade","buy"],ce=["drop","fall","plunge","lose","decline","loss","weak","miss","lower","cut","recession","crash","sell-off","downgrade","warning","risk","concern"];function de(a){const t=a.toLowerCase();return le.some(r=>t.includes(r))?"pos":ce.some(r=>t.includes(r))?"neg":null}function me(a){const t=Date.now()-a,r=Math.floor(t/6e4);if(r<60)return`${r}m`;const l=Math.floor(r/60);return l<24?`${l}h`:`${Math.floor(l/24)}d`}function he({items:a}){return e.jsxs("div",{className:"panel news-feed",children:[a.map(t=>{const r=de(t.headline);return e.jsxs("a",{className:"news-item",href:t.url,target:"_blank",rel:"noopener",children:[e.jsxs("div",{className:"news-meta",children:[e.jsx("span",{className:"news-source",children:t.source}),t.exchange&&e.jsx("span",{className:"news-tag",children:t.exchange}),r==="pos"&&e.jsx("span",{className:"news-sent pos",children:"▲"}),r==="neg"&&e.jsx("span",{className:"news-sent neg",children:"▼"}),e.jsx("span",{className:"news-time",children:me(t.publishedAt)})]}),e.jsx("div",{className:"news-headline",children:t.headline})]},t.id)}),e.jsx("style",{children:`
        .news-feed { overflow: hidden; }
        .news-item {
          display: block;
          padding: 0.625rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
          text-decoration: none;
          transition: background 0.1s;
        }
        .news-item:last-child { border-bottom: none; }
        .news-item:hover { background: var(--color-bg-hover); }

        .news-meta {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.25rem;
        }
        .news-source {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600;
        }
        .news-tag {
          font-size: 9px; padding: 1px 4px; border-radius: 3px;
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-weight: 600; letter-spacing: 0.04em;
        }
        .news-sent {
          font-size: 9px; font-weight: 800;
        }
        .news-sent.pos { color: var(--color-up); }
        .news-sent.neg { color: var(--color-down); }
        .news-time {
          margin-left: auto; font-size: 10px; color: var(--color-text-muted);
          font-family: var(--font-mono);
        }
        .news-headline {
          font-size: 12px; color: var(--color-text-secondary); line-height: 1.45;
        }
        .news-item:hover .news-headline { color: var(--color-text-primary); }
      `})]})}const ge=new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});function pe(a){return a>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(a):ge.format(a)}function xe({items:a}){return e.jsxs("div",{className:"comm-table",children:[a.map(t=>e.jsxs("div",{className:"comm-row",children:[e.jsx("div",{className:"comm-name",children:t.name}),e.jsxs("div",{className:"comm-unit",children:["/",t.unit]}),e.jsxs("div",{className:"comm-price",children:["$",pe(t.price)]}),e.jsxs("div",{className:`comm-chg ${t.changePct>=0?"up":"down"}`,children:[t.changePct>=0?"+":"",t.changePct.toFixed(2),"%"]})]},t.id)),e.jsx("style",{children:`
        .comm-table {
          display: flex;
          flex-direction: column;
        }

        .comm-row {
          display: grid;
          grid-template-columns: 1fr auto auto auto;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .comm-row:last-child { border-bottom: none; }

        .comm-name {
          font-size: 12px;
          color: var(--color-text-primary);
          font-weight: 500;
        }
        .comm-unit {
          font-size: 10px;
          color: var(--color-text-muted);
          text-align: right;
        }
        .comm-price {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--color-text-secondary);
          text-align: right;
          min-width: 60px;
        }
        .comm-chg {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          text-align: right;
          min-width: 52px;
        }
        .comm-chg.up   { color: var(--color-up); }
        .comm-chg.down { color: var(--color-down); }
      `})]})}function ue(){const{lists:a,activeId:t,symbols:r,add:l,remove:g,createList:i,setActive:d}=P(),[N,p]=v.useState(!1),[w,m]=v.useState(""),[b,f]=v.useState(""),[k,s]=v.useState(!1),n=F({queries:r.map(o=>({queryKey:["quote",o],queryFn:()=>u.getQuote(o),staleTime:6e4,refetchInterval:6e4}))}),j=F({queries:r.map(o=>({queryKey:["history",o,30],queryFn:()=>u.getHistory(o,30),staleTime:5*6e4}))});function S(o){o.preventDefault();const c=w.trim().toUpperCase();c&&(l(c),m(""),p(!1))}function I(o){o.preventDefault();const c=b.trim();c&&(i(c),f(""),s(!1))}return e.jsxs("div",{className:"wl-panel",children:[a.length>1&&e.jsx("div",{className:"wl-tabs",children:a.map(o=>e.jsx("button",{className:`wl-tab ${o.id===t?"active":""}`,onClick:()=>d(o.id),title:o.name,children:o.name},o.id))}),e.jsxs("div",{className:"wl-list",children:[r.length===0&&e.jsx("div",{className:"wl-empty",children:"No symbols — add one below"}),r.map((o,c)=>{const x=n[c]?.data,G=j[c]?.data,L=(x?.changePct??0)>=0,A=G?.map(M=>M.close)??[];return e.jsxs("div",{className:"wl-row",children:[e.jsx(q,{size:10,className:"wl-star"}),e.jsxs("div",{className:"wl-sym-col",children:[e.jsx("span",{className:"wl-sym",children:o}),x?.exchange&&e.jsx("span",{className:"wl-exch",children:x.exchange})]}),A.length>=5&&e.jsx("div",{className:"wl-spark",children:e.jsx(X,{data:A,up:L,height:24,width:56})}),e.jsx("div",{className:"wl-price-col",children:x?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"wl-price",children:x.price.toFixed(2)}),e.jsxs("span",{className:`wl-chg ${L?"up":"down"}`,children:[L?"+":"",x.changePct.toFixed(2),"%"]})]}):e.jsx("span",{className:"wl-loading",children:"—"})}),e.jsx("button",{className:"wl-remove",onClick:()=>g(o),title:`Remove ${o}`,"aria-label":`Remove ${o}`,children:e.jsx(R,{size:10})})]},o)})]}),N?e.jsxs("form",{className:"wl-add-form",onSubmit:S,children:[e.jsx("input",{className:"wl-input",value:w,onChange:o=>m(o.target.value),placeholder:"e.g. SCOM.NR",autoFocus:!0}),e.jsx("button",{type:"submit",className:"wl-add-btn",children:"Add"}),e.jsx("button",{type:"button",className:"wl-cancel-btn",onClick:()=>p(!1),children:"✕"})]}):e.jsxs("div",{className:"wl-footer",children:[e.jsxs("button",{className:"wl-add-trigger",onClick:()=>p(!0),children:[e.jsx(C,{size:10})," Add symbol"]}),k?e.jsxs("form",{className:"wl-newlist-form",onSubmit:I,children:[e.jsx("input",{className:"wl-input",value:b,onChange:o=>f(o.target.value),placeholder:"List name",autoFocus:!0,style:{width:80}}),e.jsx("button",{type:"submit",className:"wl-add-btn",children:"OK"}),e.jsx("button",{type:"button",className:"wl-cancel-btn",onClick:()=>s(!1),children:"✕"})]}):e.jsxs("button",{className:"wl-list-trigger",onClick:()=>s(!0),title:"New watchlist",children:[e.jsx(C,{size:9})," List"]})]}),e.jsx("style",{children:`
        .wl-panel { display: flex; flex-direction: column; gap: 0.5rem; }

        .wl-tabs { display: flex; gap: 2px; flex-wrap: wrap; }
        .wl-tab {
          padding: 2px 7px; font-size: 9px; font-weight: 600;
          border: 1px solid var(--color-border); border-radius: 3px;
          background: none; color: var(--color-text-muted); cursor: pointer;
          transition: all 0.1s; white-space: nowrap;
        }
        .wl-tab:hover  { color: var(--color-text-secondary); }
        .wl-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        .wl-list  { display: flex; flex-direction: column; }

        .wl-empty {
          font-size: 11px;
          color: var(--color-text-muted);
          padding: 0.5rem 0;
          font-style: italic;
        }

        .wl-row {
          display: grid;
          grid-template-columns: 10px 1fr 56px auto 14px;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .wl-row:last-child { border-bottom: none; }
        .wl-row:hover .wl-remove { opacity: 1; }

        .wl-star { color: var(--color-gold); flex-shrink: 0; }

        .wl-sym-col { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .wl-sym {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .wl-exch {
          font-size: 9px;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }

        .wl-spark { display: flex; align-items: center; opacity: 0.85; }

        .wl-price-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1px;
        }
        .wl-price {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-text-secondary);
        }
        .wl-chg {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
        }
        .wl-chg.up   { color: var(--color-up); }
        .wl-chg.down { color: var(--color-down); }
        .wl-loading  { font-size: 11px; color: var(--color-text-muted); }

        .wl-remove {
          opacity: 0;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-muted);
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.15s, opacity 0.15s;
        }
        .wl-remove:hover { color: var(--color-down); }

        .wl-footer { display: flex; gap: 0.35rem; align-items: center; }

        .wl-add-trigger {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: none;
          border: 1px dashed var(--color-border-subtle);
          color: var(--color-text-muted);
          font-size: 11px;
          padding: 0.35rem 0.6rem;
          border-radius: 3px;
          cursor: pointer;
          flex: 1;
          justify-content: center;
          transition: color 0.15s, border-color 0.15s;
        }
        .wl-add-trigger:hover {
          color: var(--color-gold);
          border-color: var(--color-gold);
        }
        .wl-list-trigger {
          display: flex; align-items: center; gap: 2px;
          background: none; border: 1px dashed var(--color-border-subtle);
          color: var(--color-text-muted); font-size: 9px;
          padding: 0.35rem 0.4rem; border-radius: 3px; cursor: pointer;
          transition: color 0.15s, border-color 0.15s; flex-shrink: 0;
          white-space: nowrap;
        }
        .wl-list-trigger:hover { color: var(--color-gold); border-color: var(--color-gold); }

        .wl-add-form, .wl-newlist-form {
          display: flex;
          gap: 0.35rem;
          align-items: center;
        }
        .wl-input {
          flex: 1;
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 0.3rem 0.5rem;
          border-radius: 3px;
          outline: none;
        }
        .wl-input:focus { border-color: var(--color-gold); }
        .wl-add-btn, .wl-cancel-btn {
          background: none;
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          font-size: 11px;
          padding: 0.3rem 0.5rem;
          border-radius: 3px;
          cursor: pointer;
          white-space: nowrap;
        }
        .wl-add-btn:hover    { border-color: var(--color-gold); color: var(--color-gold); }
        .wl-cancel-btn:hover { border-color: var(--color-down); color: var(--color-down); }
      `})]})}function fe(a){return a.id==="us10y"?a.value.toFixed(2)+"%":a.id==="vix"||a.id==="dxy"?a.value.toFixed(2):a.value>=1e4?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(a.value):a.value>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:1}).format(a.value):a.value.toFixed(2)}function ve({m:a}){const t=a.id==="vix"?a.changePct<=0:a.changePct>=0,r=a.changePct>=0?"+":"";return e.jsxs("div",{className:"gm-item",children:[e.jsx("span",{className:"gm-name",children:a.name}),e.jsx("span",{className:"gm-value",children:fe(a)}),e.jsxs("span",{className:`gm-pct ${t?"up":"down"}`,children:[r,a.changePct.toFixed(2),"%"]})]})}function ye(){const{data:a}=h({queryKey:["global-markets"],queryFn:B,staleTime:6e4,refetchInterval:6e4});return a?.length?e.jsxs("div",{className:"gm-bar",children:[e.jsx("div",{className:"gm-label",children:"GLOBAL"}),e.jsx("div",{className:"gm-scroll",children:a.map(t=>e.jsx(ve,{m:t},t.id))}),e.jsx("style",{children:`
        .gm-bar {
          display: flex;
          align-items: stretch;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px;
          overflow-x: auto;
          scrollbar-width: none;
          flex-shrink: 0;
        }
        .gm-bar::-webkit-scrollbar { display: none; }

        .gm-label {
          flex-shrink: 0;
          padding: 0 0.75rem;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--color-text-muted);
          border-right: 1px solid var(--color-border-subtle);
          display: flex; align-items: center;
          background: var(--color-bg-tertiary);
        }

        .gm-scroll {
          display: flex;
          align-items: stretch;
          flex: 1;
          min-width: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .gm-scroll::-webkit-scrollbar { display: none; }

        .gm-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          border-right: 1px solid var(--color-border-subtle);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .gm-item:last-child { border-right: none; }

        .gm-name {
          font-size: 10px;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .gm-value {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-primary);
        }
        .gm-pct {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
        }
        .gm-pct.up   { color: var(--color-up); }
        .gm-pct.down { color: var(--color-down); }
      `})]}):null}function we({active:a,payload:t}){if(!a||!t?.length)return null;const r=t[0]?.payload;return r?e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"6px 10px",fontSize:11,fontFamily:"var(--font-mono)"},children:[e.jsx("div",{style:{color:"var(--color-text-muted)",marginBottom:2},children:r.label}),e.jsxs("div",{style:{color:"var(--color-gold)",fontWeight:700},children:[r.yield.toFixed(3),"%"]})]}):null}function be(){const{data:a,isLoading:t}=h({queryKey:["yield-curve"],queryFn:W,staleTime:36e5,refetchInterval:36e5});if(t)return e.jsx("div",{style:{height:120,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--color-text-muted)"},children:"Loading yield curve…"});if(!a?.length)return e.jsx("div",{style:{height:60,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--color-text-muted)",fontStyle:"italic"},children:"Yield curve data unavailable"});const r=Math.max(0,Math.min(...a.map(i=>i.yield))-.2),l=Math.max(...a.map(i=>i.yield))+.2,g=a.some((i,d)=>d>0&&i.yield<a[d-1].yield);return e.jsxs("div",{className:"yc-panel",children:[e.jsxs("div",{className:"yc-header",children:[e.jsx("span",{className:"yc-title",children:"US Yield Curve"}),g&&e.jsx("span",{className:"yc-inverted",children:"⚠ Inverted"}),e.jsx("div",{className:"yc-values",children:a.map(i=>e.jsxs("span",{className:"yc-tick",children:[e.jsx("span",{className:"yc-mat",children:i.maturity}),e.jsxs("span",{className:"yc-yield",children:[i.yield.toFixed(2),"%"]})]},i.maturity))})]}),e.jsx(Z,{width:"100%",height:90,children:e.jsxs(_,{data:a,margin:{top:4,right:4,bottom:0,left:0},children:[e.jsx(V,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(H,{dataKey:"maturity",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"}}),e.jsx(Q,{domain:[r,l],tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:32,orientation:"right",tickFormatter:i=>`${i.toFixed(1)}%`}),e.jsx(ee,{content:e.jsx(we,{})}),e.jsx(ae,{type:"monotone",dataKey:"yield",stroke:g?"var(--color-down)":"var(--color-gold)",strokeWidth:2,dot:{fill:"var(--color-gold)",r:3},isAnimationActive:!1})]})}),e.jsx("style",{children:`
        .yc-panel { display: flex; flex-direction: column; gap: 0.25rem; }
        .yc-header { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .yc-title {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600;
        }
        .yc-inverted {
          font-size: 10px; font-weight: 700; color: var(--color-down);
          padding: 1px 5px; border-radius: 3px; background: var(--color-down-subtle);
        }
        .yc-values { display: flex; gap: 0.5rem; margin-left: auto; flex-wrap: wrap; }
        .yc-tick { display: flex; flex-direction: column; align-items: center; gap: 1px; }
        .yc-mat  { font-size: 9px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .yc-yield { font-size: 10px; color: var(--color-gold); font-family: var(--font-mono); font-weight: 600; }
      `})]})}const je=[{id:"jse",name:"JSE",country:"South Africa",x:124,y:238,color:"var(--color-jse)"},{id:"ngx",name:"NGX",country:"Nigeria",x:77,y:152,color:"var(--color-ngx)"},{id:"nse",name:"NSE",country:"Kenya",x:148,y:156,color:"var(--color-nse)"},{id:"gse",name:"GSE",country:"Ghana",x:67,y:144,color:"var(--color-gse)"},{id:"brvm",name:"BRVM",country:"Ivory Coast",x:62,y:148,color:"var(--color-brvm)"},{id:"zse",name:"ZSE",country:"Zimbabwe",x:134,y:218,color:"var(--color-zse)"},{id:"bse",name:"BSE",country:"Botswana",x:122,y:222,color:"var(--color-bse)"},{id:"luse",name:"LUSE",country:"Zambia",x:126,y:205,color:"var(--color-luse)"},{id:"use",name:"USE",country:"Uganda",x:140,y:148,color:"var(--color-use)"}],Ne=`
  M 100,2 L 120,2 L 135,8 L 150,10 L 165,15 L 175,20 L 180,30 L 185,45
  L 190,60 L 195,75 L 198,90 L 198,105 L 195,120 L 190,133 L 183,145
  L 175,158 L 168,168 L 165,180 L 163,193 L 158,205 L 150,218
  L 140,228 L 130,238 L 125,248 L 122,255 L 120,262 L 118,268
  L 116,262 L 114,255 L 112,248 L 108,240 L 100,228 L 90,218
  L 80,208 L 70,200 L 60,192 L 50,182 L 42,170 L 35,158 L 28,145
  L 22,132 L 18,118 L 15,103 L 12,88 L 10,73 L 10,58 L 14,43
  L 20,30 L 28,20 L 38,14 L 50,9 L 62,5 L 75,2 L 88,2 Z
`;function ke(){const a=D();return e.jsxs("div",{className:"amap-wrap",children:[e.jsxs("svg",{viewBox:"0 0 210 280",className:"amap-svg","aria-label":"African exchanges map",children:[e.jsx("path",{d:Ne,className:"amap-continent"}),je.map(t=>e.jsxs("g",{className:"amap-pin-group",onClick:()=>a(`/exchange/${t.id}`),role:"button","aria-label":`${t.name} — ${t.country}`,tabIndex:0,onKeyDown:r=>r.key==="Enter"&&a(`/exchange/${t.id}`),children:[e.jsx("circle",{cx:t.x,cy:t.y,r:8,fill:t.color,opacity:.15,className:"amap-ring"}),e.jsx("circle",{cx:t.x,cy:t.y,r:4.5,fill:t.color,className:"amap-dot"}),e.jsx("text",{x:t.x,y:t.y-11,className:"amap-label",fill:t.color,textAnchor:"middle",fontSize:"7",fontFamily:"var(--font-mono)",fontWeight:"700",children:t.name})]},t.id))]}),e.jsx("style",{children:`
        .amap-wrap {
          display: flex;
          justify-content: center;
          padding: 0.25rem;
        }
        .amap-svg {
          width: 100%;
          max-width: 200px;
          height: auto;
          overflow: visible;
        }
        .amap-continent {
          fill: var(--color-bg-tertiary);
          stroke: var(--color-border);
          stroke-width: 1;
        }
        .amap-pin-group {
          cursor: pointer;
          transition: filter 0.15s;
          outline: none;
        }
        .amap-pin-group:hover .amap-dot {
          r: 6;
          filter: brightness(1.3);
        }
        .amap-pin-group:hover .amap-ring {
          r: 10;
          opacity: 0.25;
        }
        .amap-ring { transition: r 0.15s, opacity 0.15s; }
        .amap-dot  { transition: r 0.15s; }
        .amap-label {
          pointer-events: none;
          letter-spacing: 0.04em;
          font-size: 7px;
        }
      `})]})}function De(){const[a,t]=v.useState(!0),{data:r,isLoading:l}=h({queryKey:["indices","all"],queryFn:()=>u.getIndices?.("all")??Promise.resolve([]),staleTime:6e4}),{data:g,isLoading:i}=h({queryKey:["forex","major"],queryFn:()=>U(),staleTime:6e4}),{data:d,isLoading:N}=h({queryKey:["news","dashboard"],queryFn:()=>u.getNews?.("africa")??Promise.resolve([]),staleTime:5*6e4}),{data:p,isLoading:w}=h({queryKey:["commodities"],queryFn:()=>u.getCommodities?.()??Promise.resolve([]),staleTime:6e4}),{data:m,isLoading:b}=h({queryKey:["movers","all"],queryFn:()=>u.getTopMovers?.("all")??Promise.resolve({gainers:[],losers:[]}),staleTime:6e4}),f=r?.filter(s=>s.changePct>=0).length??0,k=(r?.length??0)-f;return e.jsxs("div",{className:"dashboard",children:[e.jsx("div",{className:"dash-header",children:e.jsxs("div",{className:"dash-title-row",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"dash-title",children:"African Markets"}),e.jsx("p",{className:"dash-subtitle",children:new Intl.DateTimeFormat("en-ZA",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(new Date)})]}),!l&&e.jsxs("div",{className:"dash-sentiment",children:[e.jsxs("span",{className:"sentiment-item up",children:[e.jsx(K,{size:13})," ",f," up"]}),e.jsxs("span",{className:"sentiment-item down",children:[e.jsx(te,{size:13})," ",k," down"]})]}),e.jsx($,{width:80,height:80,opacity:.08,style:{position:"absolute",right:0,top:0}})]})}),e.jsx(ye,{}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Indices"}),l?e.jsx(Le,{count:5}):e.jsx("div",{className:"idx-strip",children:r?.map(s=>e.jsx(O,{index:s},s.id))})]}),e.jsxs("div",{className:"dash-grid-3",children:[e.jsxs("div",{className:"dash-col",children:[e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Top Movers"}),b?e.jsx(y,{height:180}):(m?.gainers.length??0)+(m?.losers.length??0)>0?e.jsx(J,{gainers:m?.gainers??[],losers:m?.losers??[]}):e.jsx(z,{message:"Movers data not available"})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Watchlist"}),e.jsx(ue,{})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Exchanges"}),e.jsx("div",{className:"panel",style:{padding:"0.5rem"},children:e.jsx(ke,{})})]})]}),e.jsxs("div",{className:"dash-col",children:[e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Forex Rates"}),i?e.jsx(y,{height:180}):e.jsx(Y,{rates:g??[]})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Commodities"}),w?e.jsx(y,{height:200}):(p?.length??0)>0?e.jsx(xe,{items:p??[]}):e.jsx(z,{message:"Commodity data unavailable"})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Yield Curve"}),e.jsx("div",{className:"panel",style:{padding:"0.75rem"},children:e.jsx(be,{})})]})]}),e.jsxs("div",{className:"dash-col",children:[e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Latest News"}),N?e.jsx(y,{height:400}):(d?.length??0)>0?e.jsx(he,{items:d??[]}):e.jsx(z,{message:"Live news feed not yet connected"})]}),e.jsx(Se,{})]})]}),e.jsxs("div",{className:"cheat-wrap panel",children:[e.jsxs("button",{className:"cheat-toggle",onClick:()=>t(s=>!s),children:[e.jsx("span",{className:"cheat-toggle-label",children:"Quick Reference — Keyboard Shortcuts & Features"}),a?e.jsx(ie,{size:12}):e.jsx(oe,{size:12})]}),a&&e.jsxs("div",{className:"cheat-body",children:[e.jsxs("div",{className:"cheat-col",children:[e.jsx("div",{className:"cheat-section-title",children:"Navigation (G + key)"}),[["G D","Dashboard"],["G J","JSE Exchange"],["G U","USE Exchange"],["G N","NGX Exchange"],["G F","Forex rates"],["G W","Watchlist"],["G P","Portfolio"],["G A","Alerts"],["G S","Screener"],["G I","Macro indicators"],["G M","Monitor mode"],["G X","Beat the Index"],["?","Show all shortcuts"]].map(([s,n])=>e.jsxs("div",{className:"cheat-row",children:[e.jsx("kbd",{className:"cheat-key",children:s}),e.jsx("span",{className:"cheat-desc",children:n})]},s))]}),e.jsxs("div",{className:"cheat-col",children:[e.jsx("div",{className:"cheat-section-title",children:"Chart Indicators"}),[["MA20 / MA50","20 & 50-day moving averages"],["BB","Bollinger Bands (20-period)"],["VWAP","Volume-weighted average price"],["RSI","Relative Strength Index (14)"],["MACD","Momentum oscillator (12/26/9)"],["LR","Linear regression trendline"],["FIB","Fibonacci retracement levels"],["PAT","Candlestick pattern detection"],["1D~","Simulated intraday view"]].map(([s,n])=>e.jsxs("div",{className:"cheat-row",children:[e.jsx("kbd",{className:"cheat-key",children:s}),e.jsx("span",{className:"cheat-desc",children:n})]},s))]}),e.jsxs("div",{className:"cheat-col",children:[e.jsx("div",{className:"cheat-section-title",children:"Live Data Sources"}),[["✅","JSE stocks — Yahoo Finance (.JO)"],["✅","USE stocks — use.or.ug live feed"],["✅","Commodities — Yahoo futures (GC=F, CL=F…)"],["✅","Forex — open.er-api.com (9 pairs)"],["✅","Macro — World Bank Open Data"],["✅","News — Google News RSS"],["✅","Yield curve — Yahoo (^IRX, ^TNX…)"],["⚠","NGX / NSE / GSE — no free source yet"]].map(([s,n])=>e.jsxs("div",{className:"cheat-row cheat-row--data",children:[e.jsx("span",{className:"cheat-icon",children:s}),e.jsx("span",{className:"cheat-desc",children:n})]},n))]}),e.jsxs("div",{className:"cheat-col",children:[e.jsx("div",{className:"cheat-section-title",children:"Features"}),[["Screener","Filter & rank stocks across exchanges"],["Compare","Normalized chart + correlation matrix"],["Portfolio","P&L, allocation donut, risk metrics"],["Monitor","Full-screen watchlist grid"],["Alerts","Price & % change triggers"],["Yield Curve","US Treasuries inversion detection"],["Africa Map","Click exchanges on the map"],["Macro","World Bank GDP, CPI, unemployment"],["Export","CSV download on Exchange + Portfolio"]].map(([s,n])=>e.jsxs("div",{className:"cheat-row",children:[e.jsx("span",{className:"cheat-feat",children:s}),e.jsx("span",{className:"cheat-desc",children:n})]},s))]}),e.jsxs("div",{className:"cheat-eggs",children:[e.jsx("div",{className:"cheat-eggs-label",children:"🥚 Secret Codes"}),e.jsx("div",{className:"cheat-eggs-row",children:[{trigger:"↑↑↓↓←→←→BA",reveal:null,name:"Bloomberg Beast Mode",desc:"Konami code — activates a 30-day Bloomberg Terminal trial (fake)"},{trigger:"G O",reveal:null,name:"Oracle of Lagos",desc:"Summons the keeper of African market wisdom for a prophecy"},{trigger:"G B",reveal:null,name:"The Great Jollof War",desc:"Nigeria vs Ghana — the eternal rice debate, settled by markets"},{trigger:"G L",reveal:null,name:"SIMBA!",desc:"Also fires automatically when a stock hits its 52-week high"},{trigger:"[???]",reveal:"G T",name:"Merchant of the Savanna",desc:"A Dope Wars–style commodity trading game across 6 African cities"},{trigger:"[???]",reveal:"G Z",name:"What Would Dangote Do?",desc:"Wisdom from Africa's richest person, delivered with authority"},{trigger:"[???]",reveal:"G H",name:"Hakuna Matata",desc:"Also fires automatically when your portfolio is down more than 5%"},{trigger:"[???]",reveal:"G R",name:"Circle of Life",desc:"Also fires automatically when your portfolio hits a new all-time high"}].map(({trigger:s,reveal:n,name:j,desc:S})=>e.jsxs("div",{className:"cheat-egg-item",children:[e.jsxs("kbd",{className:"cheat-egg-key","data-reveal":n??void 0,style:n?{cursor:"help",position:"relative"}:void 0,children:[s,n&&e.jsx("span",{className:"cheat-egg-tooltip",children:n})]}),e.jsxs("div",{className:"cheat-egg-body",children:[e.jsx("span",{className:"cheat-egg-name",children:j}),e.jsx("span",{className:"cheat-egg-desc",children:S})]})]},j))})]})]})]}),e.jsx("style",{children:`
        .dashboard { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1400px; }

        .dash-header {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px;
          padding: 1rem 1.25rem;
          position: relative;
          overflow: hidden;
        }
        .dash-title-row { display: flex; align-items: center; gap: 1.5rem; }
        .dash-title     { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
        .dash-subtitle  { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .dash-sentiment {
          display: flex; gap: 0.75rem;
          margin-left: auto; padding-right: 1rem;
        }
        .sentiment-item {
          display: flex; align-items: center; gap: 0.25rem;
          font-size: 12px; font-family: var(--font-mono);
        }
        .sentiment-item.up   { color: var(--color-up); }
        .sentiment-item.down { color: var(--color-down); }

        .dash-section   { display: flex; flex-direction: column; gap: 0.5rem; }
        .section-label  {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600;
        }

        .idx-strip {
          display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 0.25rem;
        }
        .idx-strip > * { flex-shrink: 0; width: 160px; }

        /* 3-column main grid */
        .dash-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1.2fr;
          gap: 1.5rem;
          align-items: start;
        }

        .dash-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (max-width: 1100px) {
          .dash-grid-3 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 700px) {
          .dash-grid-3 { grid-template-columns: 1fr; gap: 1rem; }
          .dash-title     { font-size: 16px; }
          .dash-subtitle  { display: none; }
          .dash-sentiment { gap: 0.5rem; }
          .dashboard      { gap: 1rem; }
        }

        /* ── Cheat sheet ── */
        .cheat-wrap { overflow: hidden; }
        .cheat-toggle {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 0.625rem 0.875rem;
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.06em;
          transition: color 0.15s; gap: 0.5rem;
        }
        .cheat-toggle:hover { color: var(--color-text-primary); }
        .cheat-toggle-label { flex: 1; text-align: left; }
        .cheat-body {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem; padding: 0.75rem 0.875rem 1rem;
          border-top: 1px solid var(--color-border-subtle);
        }
        @media (max-width: 1100px) { .cheat-body { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .cheat-body { grid-template-columns: 1fr; } }
        .cheat-section-title {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-gold); font-weight: 700; margin-bottom: 0.5rem;
        }
        .cheat-row {
          display: flex; align-items: baseline; gap: 0.5rem;
          margin-bottom: 4px; font-size: 11px;
        }
        .cheat-row--data { align-items: center; }
        .cheat-key {
          font-family: var(--font-mono); font-size: 9px; font-weight: 700;
          color: var(--color-gold); background: var(--color-gold-subtle);
          border: 1px solid var(--color-gold-dim); border-radius: 3px;
          padding: 1px 5px; white-space: nowrap; flex-shrink: 0; min-width: 40px;
          text-align: center;
        }
        .cheat-feat {
          font-family: var(--font-mono); font-size: 9px; font-weight: 700;
          color: var(--color-text-secondary); white-space: nowrap; flex-shrink: 0;
          min-width: 72px;
        }
        .cheat-icon { font-size: 11px; flex-shrink: 0; width: 16px; }
        .cheat-desc { color: var(--color-text-muted); font-size: 10px; line-height: 1.3; }

        /* Easter eggs row */
        .cheat-eggs {
          grid-column: 1 / -1;
          border-top: 1px solid var(--color-border-subtle);
          padding-top: 0.75rem; margin-top: 0.25rem;
        }
        .cheat-eggs-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-gold); font-weight: 700; margin-bottom: 0.5rem;
        }
        .cheat-eggs-row {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem;
        }
        .cheat-egg-item {
          display: flex; align-items: flex-start; gap: 0.5rem;
          background: var(--color-gold-subtle);
          border: 1px solid var(--color-gold-dim);
          border-radius: 4px; padding: 0.5rem 0.625rem;
        }
        .cheat-egg-key {
          font-family: var(--font-mono); font-size: 8px; font-weight: 700;
          color: var(--color-gold); white-space: nowrap; flex-shrink: 0;
          padding-top: 1px;
        }
        .cheat-egg-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .cheat-egg-name { font-size: 10px; font-weight: 700; color: var(--color-text-secondary); }
        .cheat-egg-desc { font-size: 9px; color: var(--color-text-muted); line-height: 1.4; }
        .cheat-egg-tooltip {
          display: none; position: absolute; bottom: calc(100% + 4px); left: 50%;
          transform: translateX(-50%);
          background: var(--color-bg-primary); border: 1px solid var(--color-gold);
          color: var(--color-gold); font-size: 9px; font-weight: 700;
          padding: 2px 7px; border-radius: 3px; white-space: nowrap;
          pointer-events: none; z-index: 10;
        }
        .cheat-egg-key:hover .cheat-egg-tooltip { display: block; }

        /* On This Day */
        .otd-panel { padding: 0.875rem 1rem; }
        .otd-year {
          font-family: var(--font-mono); font-size: 28px; font-weight: 900;
          color: var(--color-gold); opacity: 0.4; line-height: 1; margin-bottom: 0.375rem;
        }
        .otd-text {
          margin: 0; font-size: 12px; color: var(--color-text-secondary);
          line-height: 1.6;
        }
      `})]})}function Se(){const a=ne();return a?e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"On This Day in African Markets"}),e.jsxs("div",{className:"panel otd-panel",children:[e.jsx("div",{className:"otd-year",children:a.year}),e.jsx("p",{className:"otd-text",children:a.text})]})]}):null}function z({message:a}){return e.jsx("div",{style:{padding:"1.25rem 0.75rem",fontSize:"11px",color:"var(--color-text-muted)",textAlign:"center",border:"1px dashed var(--color-border)",borderRadius:4},children:a})}function Le({count:a}){return e.jsx("div",{style:{display:"flex",gap:"0.75rem"},children:Array.from({length:a}).map((t,r)=>e.jsx(y,{width:160,height:110},r))})}function y({width:a,height:t}){return e.jsx("div",{style:{width:a??"100%",height:t,background:"var(--color-bg-tertiary)",borderRadius:4,animation:"pulse 1.5s ease-in-out infinite"}})}export{De as default};
