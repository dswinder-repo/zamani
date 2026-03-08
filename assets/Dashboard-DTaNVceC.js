import{j as e,r as h,k as U,e as j}from"./vendor-9MAh3nQh.js";import{c as C,y as J,e as g,T as K,u as Y,p as G,S as V,X as Z,g as H,a as Q,b as ee,d as te}from"./index-4AEG-TBf.js";import{T as X}from"./trending-down-DkK-TB6W.js";import{F as re}from"./ForexTable-CuCchoPr.js";import{M as oe}from"./MediaPanel-BuGjYwC-.js";import{g as ae,a as se,T as ne,N as ie}from"./NdebelePanel-kXLuUIXd.js";import{S as le}from"./Sparkline-Sa5-OsUq.js";import{P as $}from"./plus-DyOHlirB.js";import{R as ce,L as de,C as me,X as ge,Y as he,T as pe,a as xe}from"./recharts-WEknt4oI.js";import{c as ue}from"./store-DR-NtvzW.js";const fe=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],ve=C("chevron-down",fe);const ye=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],be=C("chevron-up",ye);const we=[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]],je=C("grip-vertical",we);const Ne=[["path",{d:"M5 12h14",key:"1ays0h"}]],ke=C("minus",Ne);const Se=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Te=C("rotate-ccw",Se),q=["JSE","NGX","EGX","NSE","USE","GSE","BRVM","BSE","LUSE","ZSE"],ze={JSE:{open:7,close:15},NGX:{open:9,close:14},NSE:{open:6,close:12},GSE:{open:9,close:15},BRVM:{open:8,close:13},ZSE:{open:7,close:15},BSE:{open:7,close:14},LUSE:{open:7,close:14},USE:{open:6,close:13},EGX:{open:8,close:12}};function Ee(t){const o=ze[t];if(!o)return!1;const r=new Date;if(r.getDay()===0||r.getDay()===6)return!1;const l=r.getUTCHours();return l>=o.open&&l<o.close}const W=[{exchangeId:"jse",isLive:!0,fetch:()=>J.getIndices("jse")},{exchangeId:"use",isLive:!0,fetch:()=>ae()},{exchangeId:"ngx",isLive:!1,fetch:()=>g.getIndices("ngx")},{exchangeId:"nse",isLive:!1,fetch:()=>g.getIndices("nse")},{exchangeId:"gse",isLive:!1,fetch:()=>g.getIndices("gse")},{exchangeId:"brvm",isLive:!1,fetch:()=>g.getIndices("brvm")},{exchangeId:"egx",isLive:!1,fetch:()=>g.getIndices("egx")},{exchangeId:"bse",isLive:!1,fetch:()=>g.getIndices("bse")},{exchangeId:"luse",isLive:!1,fetch:()=>g.getIndices("luse")},{exchangeId:"zse",isLive:!1,fetch:()=>g.getIndices("zse")}];async function De(){const t=await Promise.allSettled(W.map(r=>r.fetch())),o=[];return t.forEach((r,l)=>{if(r.status!=="fulfilled"||!r.value.length)return;const a=r.value[0],{exchangeId:i,isLive:d}=W[l];o.push({exchangeId:i,exchange:a.exchange,name:a.name,value:a.value,change:a.change,changePct:a.changePct,currency:a.currency,isOpen:Ee(a.exchange),isLive:d,timestamp:a.timestamp})}),o.sort((r,l)=>{const a=q.indexOf(r.exchange),i=q.indexOf(l.exchange);return(a===-1?99:a)-(i===-1?99:i)}),o}const Ae=[()=>J.getTopMovers("jse"),()=>se(),()=>g.getTopMovers("ngx"),()=>g.getTopMovers("nse"),()=>g.getTopMovers("gse"),()=>g.getTopMovers("brvm"),()=>g.getTopMovers("egx"),()=>g.getTopMovers("bse"),()=>g.getTopMovers("luse"),()=>g.getTopMovers("zse")];async function Ce(){const t=await Promise.allSettled(Ae.map(a=>a())),o=[],r=[];for(const a of t)a.status==="fulfilled"&&(o.push(...a.value.gainers),r.push(...a.value.losers));function l(a){const i=new Set;return a.filter(d=>{const f=`${d.symbol}:${d.exchange}`;return i.has(f)?!1:(i.add(f),!0)})}return{gainers:l([...o].sort((a,i)=>i.changePct-a.changePct)).slice(0,7),losers:l([...r].sort((a,i)=>a.changePct-i.changePct)).slice(0,7)}}const R=[{date:"01-13",year:1887,text:"The Johannesburg Stock Exchange opens, just one year after gold was discovered on the Witwatersrand. The first listings are mining companies. Nobody is surprised."},{date:"02-04",year:1994,text:"The JSE opens to foreign investors for the first time as South Africa transitions toward democracy. The rand strengthens. History is made."},{date:"03-19",year:1961,text:"The Nairobi Stock Exchange is formally constituted. Kenya becomes one of the first African nations with an organized securities market."},{date:"04-27",year:1994,text:"South Africa holds its first democratic election. The JSE surges. Nelson Mandela will become President. The market understands what this means."},{date:"05-07",year:2001,text:"MTN lists on the JSE. The South African telco will go on to become the most valuable brand on the African continent. Subscribers: 2 million. Today: 280 million."},{date:"06-12",year:1989,text:"The Ghana Stock Exchange is established. It will go on to be one of the best-performing exchanges in the world in 2023. Ghana knows what it is doing."},{date:"07-02",year:1960,text:"The Lagos Stock Exchange — later renamed the Nigerian Exchange Group — begins operations in a borrowed conference room with 19 securities listed."},{date:"08-14",year:2007,text:"The Dangote Group, founded on ₦500,000 borrowed from Aliko Dangote's uncle in 1977, announces it will list Dangote Cement. Cement. The empire begins."},{date:"09-15",year:2008,text:"Lehman Brothers collapses. African markets feel the shockwave — though the JSE, NSE, and NGX had less exposure to subprime mortgages than their Western counterparts. One small mercy."},{date:"10-31",year:2017,text:"Naspers, the South African media giant, announces it will spin off its global internet assets. Its 31% stake in Tencent is worth more than the JSE's entire banking sector. This is a normal thing that happened."},{date:"11-17",year:1997,text:"The Uganda Securities Exchange is founded. The exchange will eventually modernize to fully electronic trading — making it one of Africa's most technologically advanced small exchanges."},{date:"12-09",year:1994,text:"The Lusaka Stock Exchange opens in Zambia with 7 listed companies. The original trading floor consists of a small room and considerable optimism."},{date:"01-22",year:2019,text:"Zimbabwe's ZSE is temporarily suspended by the government amid hyperinflation. When it reopens, stocks are priced in Zimbabwe dollars. Then USD. The accountants are tired."},{date:"02-19",year:2020,text:"COVID-19 begins reaching African shores. The JSE falls 8% in a single day — its worst single-day drop since the 2008 crisis. The continent braces."},{date:"03-23",year:2020,text:"The JSE halts trading as circuit breakers trigger during the COVID-19 crash. Every exchange on the continent is red. Zamani would have shown a lot of red that day."},{date:"04-20",year:2020,text:"WTI crude oil futures go negative for the first time in history — traders literally paying people to take oil. Nigeria's budget is based on $57/barrel. The math does not work."},{date:"05-26",year:2022,text:"The Africa Continental Free Trade Agreement (AfCFTA) begins to show early signs of cross-border capital flows increasing. Pan-African investing becomes less theoretical."},{date:"06-22",year:1998,text:"The BRVM (Bourse Régionale des Valeurs Mobilières) opens, serving 8 West African nations. A single exchange for the entire UEMOA zone. Ambitious. Impressively functional."},{date:"07-28",year:2022,text:"Ghana's GSE Composite Index has its best year on record in 2022, rising over 40% — making it the world's best-performing stock exchange that year. Jollof rice and equity returns."},{date:"08-30",year:2011,text:"Africa's combined stock market capitalisation passes $1 trillion for the first time. The continent's markets have grown 500% in 10 years. The world starts paying attention."},{date:"09-03",year:1954,text:"The Nairobi Securities Exchange traces its roots to this period, when trading in shares first began in Kenya under the East African Stock Exchange Committee."},{date:"10-17",year:2023,text:"The JSE celebrates 136 years of operation — making it not just Africa's oldest and largest exchange, but one of the 20 largest in the world by market capitalisation."},{date:"11-09",year:2011,text:"Equity Bank Kenya lists on the Uganda Securities Exchange via a cross-listing — one of the first examples of true pan-African equity integration. The borders are getting thinner."},{date:"12-31",year:2023,text:"The JSE All Share Index closes the year up 8.2%. In a year where South Africa dealt with load-shedding, political uncertainty, and a 10%+ inflation peak, investors take the win."}];function Le(){const t=new Date,o=`${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;return R.find(r=>r.date===o)??R[t.getDate()%R.length]}const Fe={jse:"🇿🇦",use:"🇺🇬",ngx:"🇳🇬",nse:"🇰🇪",gse:"🇬🇭",egx:"🇪🇬",bse:"🇧🇼",luse:"🇿🇲",zse:"🇿🇼",brvm:"🇨🇮"},Ie={jse:"var(--color-jse)",use:"var(--color-use)",ngx:"var(--color-ngx)",nse:"var(--color-nse)",gse:"var(--color-gse)",egx:"var(--color-egx)",bse:"var(--color-bse)",luse:"var(--color-luse)",zse:"var(--color-zse)",brvm:"var(--color-brvm)"};function Me({cards:t,isLoading:o}){return o?e.jsx("div",{style:{display:"flex",gap:"0.75rem",overflow:"hidden"},children:Array.from({length:7}).map((r,l)=>e.jsx("div",{style:{width:152,height:90,flexShrink:0,background:"var(--color-bg-tertiary)",borderRadius:4,animation:"pulse 1.5s ease-in-out infinite"}},l))}):t.length?e.jsx("div",{style:{display:"flex",gap:"0.75rem",overflowX:"auto",paddingBottom:"0.25rem"},children:t.map(r=>{const l=r.changePct>0,a=r.changePct<0,i=l?"var(--color-up)":a?"var(--color-down)":"var(--color-text-muted)",d=Ie[r.exchangeId]??"var(--color-gold)";return e.jsxs("div",{style:{flexShrink:0,width:152,background:"var(--color-bg-secondary)",border:"1px solid var(--color-border-subtle)",borderTop:`2px solid ${d}`,borderRadius:4,padding:"0.5rem 0.625rem"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4},children:[e.jsxs("span",{style:{fontSize:11,fontWeight:800,color:"var(--color-text-primary)",letterSpacing:"-0.01em"},children:[Fe[r.exchangeId]??""," ",r.exchange]}),e.jsx("span",{style:{fontSize:8,fontWeight:700,padding:"1px 4px",borderRadius:3,background:r.isOpen?"rgba(74,222,128,0.1)":"rgba(100,100,100,0.1)",color:r.isOpen?"var(--color-up)":"var(--color-text-muted)",border:`1px solid ${r.isOpen?"rgba(74,222,128,0.25)":"var(--color-border-subtle)"}`},children:r.isOpen?"OPEN":"CLOSED"})]}),e.jsx("div",{style:{fontSize:9,color:"var(--color-text-muted)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:6},children:r.name}),e.jsx("div",{style:{fontSize:13,fontWeight:700,fontFamily:"var(--font-mono)",color:"var(--color-text-primary)",marginBottom:3},children:r.value>0?r.value.toLocaleString("en-US",{maximumFractionDigits:0}):"—"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:i,display:"flex",alignItems:"center",gap:2},children:[l?e.jsx(K,{size:9}):a?e.jsx(X,{size:9}):e.jsx(ke,{size:9}),l?"+":"",r.changePct.toFixed(2),"%"]}),!r.isLive&&e.jsx("span",{style:{fontSize:7,fontWeight:700,padding:"1px 4px",borderRadius:3,background:"rgba(251,191,36,0.08)",color:"var(--color-gold-dim)",border:"1px solid rgba(251,191,36,0.15)",textTransform:"uppercase",letterSpacing:"0.05em"},children:"EOD"})]})]},r.exchangeId)})}):e.jsx("div",{style:{padding:"1rem",fontSize:11,color:"var(--color-text-muted)",textAlign:"center",border:"1px dashed var(--color-border)",borderRadius:4},children:"Africa market data unavailable"})}const Pe=["surge","jump","gain","rise","record","profit","growth","strong","beat","higher","boost","rally","soar","climb","outperform","upgrade","buy"],Ge=["drop","fall","plunge","lose","decline","loss","weak","miss","lower","cut","recession","crash","sell-off","downgrade","warning","risk","concern"];function Oe(t){const o=t.toLowerCase();return Pe.some(r=>o.includes(r))?"pos":Ge.some(r=>o.includes(r))?"neg":null}function Re(t){const o=Date.now()-t,r=Math.floor(o/6e4);if(r<60)return`${r}m`;const l=Math.floor(r/60);return l<24?`${l}h`:`${Math.floor(l/24)}d`}function Be({items:t}){return e.jsxs("div",{className:"panel news-feed",children:[t.map(o=>{const r=Oe(o.headline);return e.jsxs("a",{className:"news-item",href:o.url,target:"_blank",rel:"noopener",children:[e.jsxs("div",{className:"news-meta",children:[e.jsx("span",{className:"news-source",children:o.source}),o.exchange&&e.jsx("span",{className:"news-tag",children:o.exchange}),r==="pos"&&e.jsx("span",{className:"news-sent pos",children:"▲"}),r==="neg"&&e.jsx("span",{className:"news-sent neg",children:"▼"}),e.jsx("span",{className:"news-time",children:Re(o.publishedAt)})]}),e.jsx("div",{className:"news-headline",children:o.headline})]},o.id)}),e.jsx("style",{children:`
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
      `})]})}const Ue=new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});function $e(t){return t>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(t):Ue.format(t)}function qe({items:t}){return e.jsxs("div",{className:"comm-table",children:[t.map(o=>e.jsxs("div",{className:"comm-row",children:[e.jsx("div",{className:"comm-name",children:o.name}),e.jsxs("div",{className:"comm-unit",children:["/",o.unit]}),e.jsxs("div",{className:"comm-price",children:["$",$e(o.price)]}),e.jsxs("div",{className:`comm-chg ${o.changePct>=0?"up":"down"}`,children:[o.changePct>=0?"+":"",o.changePct.toFixed(2),"%"]})]},o.id)),e.jsx("style",{children:`
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
      `})]})}function We(){const{lists:t,activeId:o,symbols:r,add:l,remove:a,createList:i,setActive:d}=Y(),[f,x]=h.useState(!1),[v,p]=h.useState(""),[S,T]=h.useState(""),[z,N]=h.useState(!1),E=U({queries:r.map(c=>({queryKey:["quote",c],queryFn:()=>G.getQuote(c),staleTime:6e4,refetchInterval:6e4}))}),L=U({queries:r.map(c=>({queryKey:["history",c,30],queryFn:()=>G.getHistory(c,30),staleTime:5*6e4}))});function b(c){c.preventDefault();const u=v.trim().toUpperCase();u&&(l(u),p(""),x(!1))}function F(c){c.preventDefault();const u=S.trim();u&&(i(u),T(""),N(!1))}return e.jsxs("div",{className:"wl-panel",children:[t.length>1&&e.jsx("div",{className:"wl-tabs",children:t.map(c=>e.jsx("button",{className:`wl-tab ${c.id===o?"active":""}`,onClick:()=>d(c.id),title:c.name,children:c.name},c.id))}),e.jsxs("div",{className:"wl-list",children:[r.length===0&&e.jsx("div",{className:"wl-empty",children:"No symbols — add one below"}),r.map((c,u)=>{const y=E[u]?.data,O=L[u]?.data,D=(y?.changePct??0)>=0,A=O?.map(I=>I.close)??[];return e.jsxs("div",{className:"wl-row",children:[e.jsx(V,{size:10,className:"wl-star"}),e.jsxs("div",{className:"wl-sym-col",children:[e.jsx("span",{className:"wl-sym",children:c}),y?.exchange&&e.jsx("span",{className:"wl-exch",children:y.exchange})]}),A.length>=5&&e.jsx("div",{className:"wl-spark",children:e.jsx(le,{data:A,up:D,height:24,width:56})}),e.jsx("div",{className:"wl-price-col",children:y?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"wl-price",children:y.price.toFixed(2)}),e.jsxs("span",{className:`wl-chg ${D?"up":"down"}`,children:[D?"+":"",y.changePct.toFixed(2),"%"]})]}):e.jsx("span",{className:"wl-loading",children:"—"})}),e.jsx("button",{className:"wl-remove",onClick:()=>a(c),title:`Remove ${c}`,"aria-label":`Remove ${c}`,children:e.jsx(Z,{size:10})})]},c)})]}),f?e.jsxs("form",{className:"wl-add-form",onSubmit:b,children:[e.jsx("input",{className:"wl-input",value:v,onChange:c=>p(c.target.value),placeholder:"e.g. SCOM.NR",autoFocus:!0}),e.jsx("button",{type:"submit",className:"wl-add-btn",children:"Add"}),e.jsx("button",{type:"button",className:"wl-cancel-btn",onClick:()=>x(!1),children:"✕"})]}):e.jsxs("div",{className:"wl-footer",children:[e.jsxs("button",{className:"wl-add-trigger",onClick:()=>x(!0),children:[e.jsx($,{size:10})," Add symbol"]}),z?e.jsxs("form",{className:"wl-newlist-form",onSubmit:F,children:[e.jsx("input",{className:"wl-input",value:S,onChange:c=>T(c.target.value),placeholder:"List name",autoFocus:!0,style:{width:80}}),e.jsx("button",{type:"submit",className:"wl-add-btn",children:"OK"}),e.jsx("button",{type:"button",className:"wl-cancel-btn",onClick:()=>N(!1),children:"✕"})]}):e.jsxs("button",{className:"wl-list-trigger",onClick:()=>N(!0),title:"New watchlist",children:[e.jsx($,{size:9})," List"]})]}),e.jsx("style",{children:`
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
      `})]})}function _e(t){return t.id==="us10y"?t.value.toFixed(2)+"%":t.id==="vix"||t.id==="dxy"?t.value.toFixed(2):t.value>=1e4?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(t.value):t.value>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:1}).format(t.value):t.value.toFixed(2)}function Je({m:t}){const o=t.id==="vix"?t.changePct<=0:t.changePct>=0,r=t.changePct>=0?"+":"";return e.jsxs("div",{className:"gm-item",children:[e.jsx("span",{className:"gm-name",children:t.name}),e.jsx("span",{className:"gm-value",children:_e(t)}),e.jsxs("span",{className:`gm-pct ${o?"up":"down"}`,children:[r,t.changePct.toFixed(2),"%"]})]})}function Ke(){const{data:t}=j({queryKey:["global-markets"],queryFn:H,staleTime:6e4,refetchInterval:6e4});return t?.length?e.jsxs("div",{className:"gm-bar",children:[e.jsx("div",{className:"gm-label",children:"GLOBAL"}),e.jsx("div",{className:"gm-scroll",children:t.map(o=>e.jsx(Je,{m:o},o.id))}),e.jsx("style",{children:`
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
      `})]}):null}function Xe({active:t,payload:o}){if(!t||!o?.length)return null;const r=o[0]?.payload;return r?e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"6px 10px",fontSize:11,fontFamily:"var(--font-mono)"},children:[e.jsx("div",{style:{color:"var(--color-text-muted)",marginBottom:2},children:r.label}),e.jsxs("div",{style:{color:"var(--color-gold)",fontWeight:700},children:[r.yield.toFixed(3),"%"]})]}):null}function Ye(){const{data:t,isLoading:o}=j({queryKey:["yield-curve"],queryFn:Q,staleTime:36e5,refetchInterval:36e5});if(o)return e.jsx("div",{style:{height:120,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--color-text-muted)"},children:"Loading yield curve…"});if(!t?.length)return e.jsx("div",{style:{height:60,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--color-text-muted)",fontStyle:"italic"},children:"Yield curve data unavailable"});const r=Math.max(0,Math.min(...t.map(i=>i.yield))-.2),l=Math.max(...t.map(i=>i.yield))+.2,a=t.some((i,d)=>d>0&&i.yield<t[d-1].yield);return e.jsxs("div",{className:"yc-panel",children:[e.jsxs("div",{className:"yc-header",children:[e.jsx("span",{className:"yc-title",children:"US Yield Curve"}),a&&e.jsx("span",{className:"yc-inverted",children:"⚠ Inverted"}),e.jsx("div",{className:"yc-values",children:t.map(i=>e.jsxs("span",{className:"yc-tick",children:[e.jsx("span",{className:"yc-mat",children:i.maturity}),e.jsxs("span",{className:"yc-yield",children:[i.yield.toFixed(2),"%"]})]},i.maturity))})]}),e.jsx(ce,{width:"100%",height:90,children:e.jsxs(de,{data:t,margin:{top:4,right:4,bottom:0,left:0},children:[e.jsx(me,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(ge,{dataKey:"maturity",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"}}),e.jsx(he,{domain:[r,l],tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:32,orientation:"right",tickFormatter:i=>`${i.toFixed(1)}%`}),e.jsx(pe,{content:e.jsx(Xe,{})}),e.jsx(xe,{type:"monotone",dataKey:"yield",stroke:a?"var(--color-down)":"var(--color-gold)",strokeWidth:2,dot:{fill:"var(--color-gold)",r:3},isAnimationActive:!1})]})}),e.jsx("style",{children:`
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
      `})]})}const _=[["cross-movers","watchlist"],["forex","commodities","yield-curve"],["live-tv","news","on-this-day"]],Ve=ue()(ee(t=>({columns:_,setColumns(o){t({columns:o})},resetLayout(){t({columns:_})}}),{name:"zamani-dash-layout",version:1,migrate(t,o){if(o===0){const r=t;return{...r,columns:r.columns.map(l=>l.map(a=>a==="movers"?"cross-movers":a))}}return t}})),Ze={"cross-movers":"Top Movers — All Africa",watchlist:"Watchlist",forex:"Forex Rates",commodities:"Commodities","yield-curve":"Yield Curve","live-tv":"Live Business TV",news:"Latest News","on-this-day":"On This Day"};function He({id:t,dragId:o,dropOver:r,onDragStart:l,onDragEnd:a,onDrop:i,onDragOver:d,children:f}){const x=o===t,v=r===t&&o!==t;return e.jsxs("section",{className:`dash-section draggable-panel${x?" panel-dragging":""}${v?" panel-drop-over":""}`,draggable:!0,onDragStart:p=>l(t,p),onDragEnd:a,onDragOver:p=>d(t,p),onDrop:p=>i(t,p),children:[e.jsxs("div",{className:"section-label-row",children:[e.jsx("span",{className:"section-label",children:Ze[t]}),e.jsx("span",{className:"drag-handle",title:"Drag to reorder",children:e.jsx(je,{size:12})})]}),f]})}function ct(){const[t,o]=h.useState(!0),{columns:r,setColumns:l,resetLayout:a}=Ve(),[i,d]=h.useState(null),[f,x]=h.useState(null),{data:v,isLoading:p}=j({queryKey:["africa-overview"],queryFn:()=>De(),staleTime:5*6e4}),{data:S,isLoading:T}=j({queryKey:["forex","major"],queryFn:()=>te(),staleTime:6e4}),{data:z,isLoading:N}=j({queryKey:["news","dashboard"],queryFn:()=>G.getNews?.("africa")??Promise.resolve([]),staleTime:5*6e4}),{data:E,isLoading:L}=j({queryKey:["commodities"],queryFn:()=>G.getCommodities?.()??Promise.resolve([]),staleTime:6e4}),{data:b,isLoading:F}=j({queryKey:["cross-movers"],queryFn:()=>Ce(),staleTime:5*6e4}),c=v?.filter(s=>s.changePct>=0).length??0,u=(v?.length??0)-c,y=h.useCallback(s=>{switch(s){case"cross-movers":return F?e.jsx(P,{height:180}):(b?.gainers.length??0)+(b?.losers.length??0)>0?e.jsx(ne,{gainers:b?.gainers??[],losers:b?.losers??[]}):e.jsx(B,{message:"Movers data not available"});case"watchlist":return e.jsx(We,{});case"forex":return T?e.jsx(P,{height:180}):e.jsx(re,{rates:S??[]});case"commodities":return L?e.jsx(P,{height:200}):(E?.length??0)>0?e.jsx(qe,{items:E??[]}):e.jsx(B,{message:"Commodity data unavailable"});case"yield-curve":return e.jsx("div",{className:"panel",style:{padding:"0.75rem"},children:e.jsx(Ye,{})});case"live-tv":return e.jsx(oe,{});case"news":return N?e.jsx(P,{height:200}):(z?.length??0)>0?e.jsx(Be,{items:z??[]}):e.jsx(B,{message:"Live news feed not yet connected"});case"on-this-day":{const n=Le();return n?e.jsxs("div",{className:"panel otd-panel",children:[e.jsx("div",{className:"otd-year",children:n.year}),e.jsx("p",{className:"otd-text",children:n.text})]}):null}}},[b,F,S,T,E,L,z,N]),O=h.useCallback((s,n)=>{n.dataTransfer.effectAllowed="move",n.dataTransfer.setData("text/plain",s),d(s)},[]),D=h.useCallback(()=>{d(null),x(null)},[]),A=h.useCallback((s,n)=>{n.preventDefault(),n.stopPropagation(),n.dataTransfer.dropEffect="move",x(s)},[]),I=h.useCallback((s,n)=>{n.preventDefault(),n.stopPropagation();const m=n.dataTransfer.getData("text/plain");if(!m||m===s){d(null),x(null);return}l((()=>{const w=r.map(k=>k.filter(M=>M!==m));if(s==="col-0"||s==="col-1"||s==="col-2")w[parseInt(s.slice(4))]=[...w[parseInt(s.slice(4))],m];else for(let k=0;k<3;k++){const M=w[k].indexOf(s);if(M>=0){w[k].splice(M,0,m);break}}return w})()),d(null),x(null)},[r,l]);return e.jsxs("div",{className:"dashboard",children:[e.jsx("div",{className:"dash-header",children:e.jsxs("div",{className:"dash-title-row",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"dash-title",children:"African Markets"}),e.jsx("p",{className:"dash-subtitle",children:new Intl.DateTimeFormat("en-ZA",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(new Date)})]}),!p&&e.jsxs("div",{className:"dash-sentiment",children:[e.jsxs("span",{className:"sentiment-item up",children:[e.jsx(K,{size:13})," ",c," up"]}),e.jsxs("span",{className:"sentiment-item down",children:[e.jsx(X,{size:13})," ",u," down"]})]}),e.jsxs("button",{className:"dash-reset-btn",onClick:a,title:"Reset dashboard layout",children:[e.jsx(Te,{size:11})," Reset layout"]}),e.jsx(ie,{width:80,height:80,opacity:.08,style:{position:"absolute",right:0,top:0}})]})}),e.jsx(Ke,{}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Africa Market Overview"}),e.jsx(Me,{cards:v??[],isLoading:p})]}),e.jsx("div",{className:"dash-grid-3",children:r.map((s,n)=>e.jsx("div",{className:`dash-col${f===`col-${n}`?" col-drop-over":""}`,onDragOver:m=>A(`col-${n}`,m),onDrop:m=>I(`col-${n}`,m),children:s.map(m=>e.jsx(He,{id:m,dragId:i,dropOver:f,onDragStart:O,onDragEnd:D,onDragOver:A,onDrop:I,children:y(m)},m))},`col-${n}`))}),e.jsxs("div",{className:"cheat-wrap panel",children:[e.jsxs("button",{className:"cheat-toggle",onClick:()=>o(s=>!s),children:[e.jsx("span",{className:"cheat-toggle-label",children:"Quick Reference — Keyboard Shortcuts & Features"}),t?e.jsx(be,{size:12}):e.jsx(ve,{size:12})]}),t&&e.jsxs("div",{className:"cheat-body",children:[e.jsxs("div",{className:"cheat-col",children:[e.jsx("div",{className:"cheat-section-title",children:"Navigation (G + key)"}),[["G D","Dashboard"],["G J","JSE Exchange"],["G U","USE Exchange"],["G N","NGX Exchange"],["G F","Forex rates"],["G W","Watchlist"],["G P","Portfolio"],["G A","Alerts"],["G S","Screener"],["G I","Macro indicators"],["G M","Monitor mode"],["G X","Beat the Index"],["?","Show all shortcuts"]].map(([s,n])=>e.jsxs("div",{className:"cheat-row",children:[e.jsx("kbd",{className:"cheat-key",children:s}),e.jsx("span",{className:"cheat-desc",children:n})]},s))]}),e.jsxs("div",{className:"cheat-col",children:[e.jsx("div",{className:"cheat-section-title",children:"Chart Indicators"}),[["MA20 / MA50","20 & 50-day moving averages"],["BB","Bollinger Bands (20-period)"],["VWAP","Volume-weighted average price"],["RSI","Relative Strength Index (14)"],["MACD","Momentum oscillator (12/26/9)"],["LR","Linear regression trendline"],["FIB","Fibonacci retracement levels"],["PAT","Candlestick pattern detection"],["1D~","Simulated intraday view"]].map(([s,n])=>e.jsxs("div",{className:"cheat-row",children:[e.jsx("kbd",{className:"cheat-key",children:s}),e.jsx("span",{className:"cheat-desc",children:n})]},s))]}),e.jsxs("div",{className:"cheat-col",children:[e.jsx("div",{className:"cheat-section-title",children:"Live Data Sources"}),[["✅","JSE stocks — Yahoo Finance (.JO)"],["✅","USE stocks — use.or.ug live feed"],["✅","Commodities — Yahoo futures (GC=F, CL=F…)"],["✅","Forex — open.er-api.com (9 pairs)"],["✅","Macro — World Bank Open Data"],["✅","Yield curve — Yahoo (^IRX, ^TNX…)"],["📅","NGX / NSE / GSE / EGX — EODHD end-of-day"],["⚠","BRVM / ZSE / BSE / LUSE — EOD, limited coverage"]].map(([s,n])=>e.jsxs("div",{className:"cheat-row cheat-row--data",children:[e.jsx("span",{className:"cheat-icon",children:s}),e.jsx("span",{className:"cheat-desc",children:n})]},n))]}),e.jsxs("div",{className:"cheat-col",children:[e.jsx("div",{className:"cheat-section-title",children:"Features"}),[["Screener","Filter & rank stocks across exchanges"],["Compare","Normalized chart + correlation matrix"],["Portfolio","P&L, allocation donut, risk metrics"],["Monitor","Full-screen watchlist grid"],["Alerts","Price & % change triggers"],["Yield Curve","US Treasuries inversion detection"],["Beat Index","Pick stocks vs JSE Top 40"],["Macro","World Bank GDP, CPI, unemployment"],["Export","CSV download on Exchange + Portfolio"],["Drag panels","Rearrange dashboard via drag handles"]].map(([s,n])=>e.jsxs("div",{className:"cheat-row",children:[e.jsx("span",{className:"cheat-feat",children:s}),e.jsx("span",{className:"cheat-desc",children:n})]},s))]}),e.jsxs("div",{className:"cheat-eggs",children:[e.jsx("div",{className:"cheat-eggs-label",children:"🥚 Secret Codes"}),e.jsx("div",{className:"cheat-eggs-row",children:[{trigger:"↑↑↓↓←→←→BA",reveal:null,name:"Bloomberg Beast Mode",desc:"Konami code — activates a 30-day Bloomberg Terminal trial (fake)"},{trigger:"G O",reveal:null,name:"Oracle of Lagos",desc:"Summons the keeper of African market wisdom for a prophecy"},{trigger:"G B",reveal:null,name:"The Great Jollof War",desc:"Nigeria vs Ghana — the eternal rice debate, settled by markets"},{trigger:"G L",reveal:null,name:"SIMBA!",desc:"Also fires automatically when a stock hits its 52-week high"},{trigger:"[???]",reveal:"G T",name:"Merchant of the Savanna",desc:"A Dope Wars–style commodity trading game across 6 African cities"},{trigger:"[???]",reveal:"G Z",name:"What Would Dangote Do?",desc:"Wisdom from Africa's richest person, delivered with authority"},{trigger:"[???]",reveal:"G H",name:"Hakuna Matata",desc:"Also fires automatically when your portfolio is down more than 5%"},{trigger:"[???]",reveal:"G R",name:"Circle of Life",desc:"Also fires automatically when your portfolio hits a new all-time high"}].map(({trigger:s,reveal:n,name:m,desc:w})=>e.jsxs("div",{className:"cheat-egg-item",children:[e.jsxs("kbd",{className:"cheat-egg-key","data-reveal":n??void 0,style:n?{cursor:"help",position:"relative"}:void 0,children:[s,n&&e.jsx("span",{className:"cheat-egg-tooltip",children:n})]}),e.jsxs("div",{className:"cheat-egg-body",children:[e.jsx("span",{className:"cheat-egg-name",children:m}),e.jsx("span",{className:"cheat-egg-desc",children:w})]})]},m))})]})]})]}),e.jsx("style",{children:`
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
          padding-right: 1rem;
        }
        .sentiment-item {
          display: flex; align-items: center; gap: 0.25rem;
          font-size: 12px; font-family: var(--font-mono);
        }
        .sentiment-item.up   { color: var(--color-up); }
        .sentiment-item.down { color: var(--color-down); }

        .dash-reset-btn {
          display: flex; align-items: center; gap: 4px;
          margin-left: auto;
          background: none; border: 1px solid var(--color-border);
          border-radius: 3px; padding: 3px 8px;
          font-size: 9px; font-weight: 600; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.15s; letter-spacing: 0.03em;
          text-transform: uppercase; white-space: nowrap;
        }
        .dash-reset-btn:hover { color: var(--color-text-primary); border-color: var(--color-text-muted); }

        .dash-section   { display: flex; flex-direction: column; gap: 0.5rem; }
        .section-label  {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600;
        }

        /* Drag handle row */
        .section-label-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 0.5rem;
        }
        .drag-handle {
          cursor: grab; padding: 2px 3px;
          color: var(--color-text-muted); border-radius: 3px;
          display: flex; align-items: center; opacity: 0;
          transition: opacity 0.15s, color 0.15s;
          flex-shrink: 0; user-select: none;
        }
        .drag-handle:active { cursor: grabbing; }
        .draggable-panel:hover .drag-handle { opacity: 1; }
        .drag-handle:hover { color: var(--color-gold); opacity: 1; }

        /* HTML5 DnD visual feedback */
        .draggable-panel { cursor: default; }
        .panel-dragging { opacity: 0.4; }
        .panel-drop-over {
          outline: 2px solid var(--color-gold-dim);
          outline-offset: 2px;
        }
        .col-drop-over { background: var(--color-gold-subtle); border-radius: 4px; }

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
          min-height: 80px;
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
      `})]})}function B({message:t}){return e.jsx("div",{style:{padding:"1.25rem 0.75rem",fontSize:"11px",color:"var(--color-text-muted)",textAlign:"center",border:"1px dashed var(--color-border)",borderRadius:4},children:t})}function P({width:t,height:o}){return e.jsx("div",{style:{width:t??"100%",height:o,background:"var(--color-bg-tertiary)",borderRadius:4,animation:"pulse 1.5s ease-in-out infinite"}})}export{ct as default};
