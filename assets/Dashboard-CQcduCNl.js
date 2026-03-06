import{j as e,r as v,k as S,e as x,u as D}from"./vendor-9MAh3nQh.js";import{c as C,u as E,p as u,S as T,X as q,g as R,a as U,T as $,b as K}from"./index-usIiblUo.js";import{N as Y,I as B,T as W}from"./NdebelePanel-C_YHhQqb.js";import{F as O}from"./ForexTable-CuCchoPr.js";import{S as _}from"./Sparkline-Sa5-OsUq.js";import{P as F}from"./plus-CnvyuxPO.js";import{R as X,L as J,C as V,X as Z,Y as Q,T as H,a as ee}from"./recharts-DK6PfPlO.js";import{T as oe}from"./trending-down-wAgnqZXa.js";import"./store-DR-NtvzW.js";const re=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],ae=C("chevron-down",re);const te=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],se=C("chevron-up",te),le=["surge","jump","gain","rise","record","profit","growth","strong","beat","higher","boost","rally","soar","climb","outperform","upgrade","buy"],ne=["drop","fall","plunge","lose","decline","loss","weak","miss","lower","cut","recession","crash","sell-off","downgrade","warning","risk","concern"];function ie(o){const r=o.toLowerCase();return le.some(a=>r.includes(a))?"pos":ne.some(a=>r.includes(a))?"neg":null}function ce(o){const r=Date.now()-o,a=Math.floor(r/6e4);if(a<60)return`${a}m`;const n=Math.floor(a/60);return n<24?`${n}h`:`${Math.floor(n/24)}d`}function de({items:o}){return e.jsxs("div",{className:"panel news-feed",children:[o.map(r=>{const a=ie(r.headline);return e.jsxs("a",{className:"news-item",href:r.url,target:"_blank",rel:"noopener",children:[e.jsxs("div",{className:"news-meta",children:[e.jsx("span",{className:"news-source",children:r.source}),r.exchange&&e.jsx("span",{className:"news-tag",children:r.exchange}),a==="pos"&&e.jsx("span",{className:"news-sent pos",children:"▲"}),a==="neg"&&e.jsx("span",{className:"news-sent neg",children:"▼"}),e.jsx("span",{className:"news-time",children:ce(r.publishedAt)})]}),e.jsx("div",{className:"news-headline",children:r.headline})]},r.id)}),e.jsx("style",{children:`
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
      `})]})}const me=new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});function xe(o){return o>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(o):me.format(o)}function pe({items:o}){return e.jsxs("div",{className:"comm-table",children:[o.map(r=>e.jsxs("div",{className:"comm-row",children:[e.jsx("div",{className:"comm-name",children:r.name}),e.jsxs("div",{className:"comm-unit",children:["/",r.unit]}),e.jsxs("div",{className:"comm-price",children:["$",xe(r.price)]}),e.jsxs("div",{className:`comm-chg ${r.changePct>=0?"up":"down"}`,children:[r.changePct>=0?"+":"",r.changePct.toFixed(2),"%"]})]},r.id)),e.jsx("style",{children:`
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
      `})]})}function he(){const{lists:o,activeId:r,symbols:a,add:n,remove:p,createList:l,setActive:d}=E(),[j,h]=v.useState(!1),[y,m]=v.useState(""),[b,f]=v.useState(""),[N,s]=v.useState(!1),i=S({queries:a.map(t=>({queryKey:["quote",t],queryFn:()=>u.getQuote(t),staleTime:6e4,refetchInterval:6e4}))}),A=S({queries:a.map(t=>({queryKey:["history",t,30],queryFn:()=>u.getHistory(t,30),staleTime:5*6e4}))});function I(t){t.preventDefault();const c=y.trim().toUpperCase();c&&(n(c),m(""),h(!1))}function P(t){t.preventDefault();const c=b.trim();c&&(l(c),f(""),s(!1))}return e.jsxs("div",{className:"wl-panel",children:[o.length>1&&e.jsx("div",{className:"wl-tabs",children:o.map(t=>e.jsx("button",{className:`wl-tab ${t.id===r?"active":""}`,onClick:()=>d(t.id),title:t.name,children:t.name},t.id))}),e.jsxs("div",{className:"wl-list",children:[a.length===0&&e.jsx("div",{className:"wl-empty",children:"No symbols — add one below"}),a.map((t,c)=>{const g=i[c]?.data,M=A[c]?.data,L=(g?.changePct??0)>=0,z=M?.map(G=>G.close)??[];return e.jsxs("div",{className:"wl-row",children:[e.jsx(T,{size:10,className:"wl-star"}),e.jsxs("div",{className:"wl-sym-col",children:[e.jsx("span",{className:"wl-sym",children:t}),g?.exchange&&e.jsx("span",{className:"wl-exch",children:g.exchange})]}),z.length>=5&&e.jsx("div",{className:"wl-spark",children:e.jsx(_,{data:z,up:L,height:24,width:56})}),e.jsx("div",{className:"wl-price-col",children:g?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"wl-price",children:g.price.toFixed(2)}),e.jsxs("span",{className:`wl-chg ${L?"up":"down"}`,children:[L?"+":"",g.changePct.toFixed(2),"%"]})]}):e.jsx("span",{className:"wl-loading",children:"—"})}),e.jsx("button",{className:"wl-remove",onClick:()=>p(t),title:`Remove ${t}`,"aria-label":`Remove ${t}`,children:e.jsx(q,{size:10})})]},t)})]}),j?e.jsxs("form",{className:"wl-add-form",onSubmit:I,children:[e.jsx("input",{className:"wl-input",value:y,onChange:t=>m(t.target.value),placeholder:"e.g. SCOM.NR",autoFocus:!0}),e.jsx("button",{type:"submit",className:"wl-add-btn",children:"Add"}),e.jsx("button",{type:"button",className:"wl-cancel-btn",onClick:()=>h(!1),children:"✕"})]}):e.jsxs("div",{className:"wl-footer",children:[e.jsxs("button",{className:"wl-add-trigger",onClick:()=>h(!0),children:[e.jsx(F,{size:10})," Add symbol"]}),N?e.jsxs("form",{className:"wl-newlist-form",onSubmit:P,children:[e.jsx("input",{className:"wl-input",value:b,onChange:t=>f(t.target.value),placeholder:"List name",autoFocus:!0,style:{width:80}}),e.jsx("button",{type:"submit",className:"wl-add-btn",children:"OK"}),e.jsx("button",{type:"button",className:"wl-cancel-btn",onClick:()=>s(!1),children:"✕"})]}):e.jsxs("button",{className:"wl-list-trigger",onClick:()=>s(!0),title:"New watchlist",children:[e.jsx(F,{size:9})," List"]})]}),e.jsx("style",{children:`
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
      `})]})}function ge(o){return o.id==="us10y"?o.value.toFixed(2)+"%":o.id==="vix"||o.id==="dxy"?o.value.toFixed(2):o.value>=1e4?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(o.value):o.value>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:1}).format(o.value):o.value.toFixed(2)}function ue({m:o}){const r=o.id==="vix"?o.changePct<=0:o.changePct>=0,a=o.changePct>=0?"+":"";return e.jsxs("div",{className:"gm-item",children:[e.jsx("span",{className:"gm-name",children:o.name}),e.jsx("span",{className:"gm-value",children:ge(o)}),e.jsxs("span",{className:`gm-pct ${r?"up":"down"}`,children:[a,o.changePct.toFixed(2),"%"]})]})}function fe(){const{data:o}=x({queryKey:["global-markets"],queryFn:R,staleTime:6e4,refetchInterval:6e4});return o?.length?e.jsxs("div",{className:"gm-bar",children:[e.jsx("div",{className:"gm-label",children:"GLOBAL"}),e.jsx("div",{className:"gm-scroll",children:o.map(r=>e.jsx(ue,{m:r},r.id))}),e.jsx("style",{children:`
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
      `})]}):null}function ve({active:o,payload:r}){if(!o||!r?.length)return null;const a=r[0]?.payload;return a?e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"6px 10px",fontSize:11,fontFamily:"var(--font-mono)"},children:[e.jsx("div",{style:{color:"var(--color-text-muted)",marginBottom:2},children:a.label}),e.jsxs("div",{style:{color:"var(--color-gold)",fontWeight:700},children:[a.yield.toFixed(3),"%"]})]}):null}function we(){const{data:o,isLoading:r}=x({queryKey:["yield-curve"],queryFn:U,staleTime:36e5,refetchInterval:36e5});if(r)return e.jsx("div",{style:{height:120,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--color-text-muted)"},children:"Loading yield curve…"});if(!o?.length)return e.jsx("div",{style:{height:60,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--color-text-muted)",fontStyle:"italic"},children:"Yield curve data unavailable"});const a=Math.max(0,Math.min(...o.map(l=>l.yield))-.2),n=Math.max(...o.map(l=>l.yield))+.2,p=o.some((l,d)=>d>0&&l.yield<o[d-1].yield);return e.jsxs("div",{className:"yc-panel",children:[e.jsxs("div",{className:"yc-header",children:[e.jsx("span",{className:"yc-title",children:"US Yield Curve"}),p&&e.jsx("span",{className:"yc-inverted",children:"⚠ Inverted"}),e.jsx("div",{className:"yc-values",children:o.map(l=>e.jsxs("span",{className:"yc-tick",children:[e.jsx("span",{className:"yc-mat",children:l.maturity}),e.jsxs("span",{className:"yc-yield",children:[l.yield.toFixed(2),"%"]})]},l.maturity))})]}),e.jsx(X,{width:"100%",height:90,children:e.jsxs(J,{data:o,margin:{top:4,right:4,bottom:0,left:0},children:[e.jsx(V,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(Z,{dataKey:"maturity",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"}}),e.jsx(Q,{domain:[a,n],tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:32,orientation:"right",tickFormatter:l=>`${l.toFixed(1)}%`}),e.jsx(H,{content:e.jsx(ve,{})}),e.jsx(ee,{type:"monotone",dataKey:"yield",stroke:p?"var(--color-down)":"var(--color-gold)",strokeWidth:2,dot:{fill:"var(--color-gold)",r:3},isAnimationActive:!1})]})}),e.jsx("style",{children:`
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
      `})]})}const ye=[{id:"jse",name:"JSE",country:"South Africa",x:124,y:238,color:"var(--color-jse)"},{id:"ngx",name:"NGX",country:"Nigeria",x:77,y:152,color:"var(--color-ngx)"},{id:"nse",name:"NSE",country:"Kenya",x:148,y:156,color:"var(--color-nse)"},{id:"gse",name:"GSE",country:"Ghana",x:67,y:144,color:"var(--color-gse)"},{id:"brvm",name:"BRVM",country:"Ivory Coast",x:62,y:148,color:"var(--color-brvm)"},{id:"zse",name:"ZSE",country:"Zimbabwe",x:134,y:218,color:"var(--color-zse)"},{id:"bse",name:"BSE",country:"Botswana",x:122,y:222,color:"var(--color-bse)"},{id:"luse",name:"LUSE",country:"Zambia",x:126,y:205,color:"var(--color-luse)"},{id:"use",name:"USE",country:"Uganda",x:140,y:148,color:"var(--color-use)"}],be=`
  M 100,2 L 120,2 L 135,8 L 150,10 L 165,15 L 175,20 L 180,30 L 185,45
  L 190,60 L 195,75 L 198,90 L 198,105 L 195,120 L 190,133 L 183,145
  L 175,158 L 168,168 L 165,180 L 163,193 L 158,205 L 150,218
  L 140,228 L 130,238 L 125,248 L 122,255 L 120,262 L 118,268
  L 116,262 L 114,255 L 112,248 L 108,240 L 100,228 L 90,218
  L 80,208 L 70,200 L 60,192 L 50,182 L 42,170 L 35,158 L 28,145
  L 22,132 L 18,118 L 15,103 L 12,88 L 10,73 L 10,58 L 14,43
  L 20,30 L 28,20 L 38,14 L 50,9 L 62,5 L 75,2 L 88,2 Z
`;function je(){const o=D();return e.jsxs("div",{className:"amap-wrap",children:[e.jsxs("svg",{viewBox:"0 0 210 280",className:"amap-svg","aria-label":"African exchanges map",children:[e.jsx("path",{d:be,className:"amap-continent"}),ye.map(r=>e.jsxs("g",{className:"amap-pin-group",onClick:()=>o(`/exchange/${r.id}`),role:"button","aria-label":`${r.name} — ${r.country}`,tabIndex:0,onKeyDown:a=>a.key==="Enter"&&o(`/exchange/${r.id}`),children:[e.jsx("circle",{cx:r.x,cy:r.y,r:8,fill:r.color,opacity:.15,className:"amap-ring"}),e.jsx("circle",{cx:r.x,cy:r.y,r:4.5,fill:r.color,className:"amap-dot"}),e.jsx("text",{x:r.x,y:r.y-11,className:"amap-label",fill:r.color,textAnchor:"middle",fontSize:"7",fontFamily:"var(--font-mono)",fontWeight:"700",children:r.name})]},r.id))]}),e.jsx("style",{children:`
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
      `})]})}function Me(){const[o,r]=v.useState(!0),{data:a,isLoading:n}=x({queryKey:["indices","all"],queryFn:()=>u.getIndices?.("all")??Promise.resolve([]),staleTime:6e4}),{data:p,isLoading:l}=x({queryKey:["forex","major"],queryFn:()=>K(),staleTime:6e4}),{data:d,isLoading:j}=x({queryKey:["news","dashboard"],queryFn:()=>u.getNews?.("africa")??Promise.resolve([]),staleTime:5*6e4}),{data:h,isLoading:y}=x({queryKey:["commodities"],queryFn:()=>u.getCommodities?.()??Promise.resolve([]),staleTime:6e4}),{data:m,isLoading:b}=x({queryKey:["movers","all"],queryFn:()=>u.getTopMovers?.("all")??Promise.resolve({gainers:[],losers:[]}),staleTime:6e4}),f=a?.filter(s=>s.changePct>=0).length??0,N=(a?.length??0)-f;return e.jsxs("div",{className:"dashboard",children:[e.jsx("div",{className:"dash-header",children:e.jsxs("div",{className:"dash-title-row",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"dash-title",children:"African Markets"}),e.jsx("p",{className:"dash-subtitle",children:new Intl.DateTimeFormat("en-ZA",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(new Date)})]}),!n&&e.jsxs("div",{className:"dash-sentiment",children:[e.jsxs("span",{className:"sentiment-item up",children:[e.jsx($,{size:13})," ",f," up"]}),e.jsxs("span",{className:"sentiment-item down",children:[e.jsx(oe,{size:13})," ",N," down"]})]}),e.jsx(Y,{width:80,height:80,opacity:.08,style:{position:"absolute",right:0,top:0}})]})}),e.jsx(fe,{}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Indices"}),n?e.jsx(Ne,{count:5}):e.jsx("div",{className:"idx-strip",children:a?.map(s=>e.jsx(B,{index:s},s.id))})]}),e.jsxs("div",{className:"dash-grid-3",children:[e.jsxs("div",{className:"dash-col",children:[e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Top Movers"}),b?e.jsx(w,{height:180}):(m?.gainers.length??0)+(m?.losers.length??0)>0?e.jsx(W,{gainers:m?.gainers??[],losers:m?.losers??[]}):e.jsx(k,{message:"Movers data not available"})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Watchlist"}),e.jsx(he,{})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Exchanges"}),e.jsx("div",{className:"panel",style:{padding:"0.5rem"},children:e.jsx(je,{})})]})]}),e.jsxs("div",{className:"dash-col",children:[e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Forex Rates"}),l?e.jsx(w,{height:180}):e.jsx(O,{rates:p??[]})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Commodities"}),y?e.jsx(w,{height:200}):(h?.length??0)>0?e.jsx(pe,{items:h??[]}):e.jsx(k,{message:"Commodity data unavailable"})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Yield Curve"}),e.jsx("div",{className:"panel",style:{padding:"0.75rem"},children:e.jsx(we,{})})]})]}),e.jsx("div",{className:"dash-col",children:e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Latest News"}),j?e.jsx(w,{height:400}):(d?.length??0)>0?e.jsx(de,{items:d??[]}):e.jsx(k,{message:"Live news feed not yet connected"})]})})]}),e.jsxs("div",{className:"cheat-wrap panel",children:[e.jsxs("button",{className:"cheat-toggle",onClick:()=>r(s=>!s),children:[e.jsx("span",{className:"cheat-toggle-label",children:"Quick Reference — Keyboard Shortcuts & Features"}),o?e.jsx(se,{size:12}):e.jsx(ae,{size:12})]}),o&&e.jsxs("div",{className:"cheat-body",children:[e.jsxs("div",{className:"cheat-col",children:[e.jsx("div",{className:"cheat-section-title",children:"Navigation (G + key)"}),[["G D","Dashboard"],["G J","JSE Exchange"],["G U","USE Exchange"],["G N","NGX Exchange"],["G F","Forex rates"],["G W","Watchlist"],["G P","Portfolio"],["G A","Alerts"],["G S","Screener"],["G I","Macro indicators"],["G M","Monitor mode"],["?","Show all shortcuts"]].map(([s,i])=>e.jsxs("div",{className:"cheat-row",children:[e.jsx("kbd",{className:"cheat-key",children:s}),e.jsx("span",{className:"cheat-desc",children:i})]},s))]}),e.jsxs("div",{className:"cheat-col",children:[e.jsx("div",{className:"cheat-section-title",children:"Chart Indicators"}),[["MA20 / MA50","20 & 50-day moving averages"],["BB","Bollinger Bands (20-period)"],["VWAP","Volume-weighted average price"],["RSI","Relative Strength Index (14)"],["MACD","Momentum oscillator (12/26/9)"],["LR","Linear regression trendline"],["FIB","Fibonacci retracement levels"],["PAT","Candlestick pattern detection"],["1D~","Simulated intraday view"]].map(([s,i])=>e.jsxs("div",{className:"cheat-row",children:[e.jsx("kbd",{className:"cheat-key",children:s}),e.jsx("span",{className:"cheat-desc",children:i})]},s))]}),e.jsxs("div",{className:"cheat-col",children:[e.jsx("div",{className:"cheat-section-title",children:"Live Data Sources"}),[["✅","JSE stocks — Yahoo Finance (.JO)"],["✅","USE stocks — use.or.ug live feed"],["✅","Commodities — Yahoo futures (GC=F, CL=F…)"],["✅","Forex — open.er-api.com (9 pairs)"],["✅","Macro — World Bank Open Data"],["✅","News — Google News RSS"],["✅","Yield curve — Yahoo (^IRX, ^TNX…)"],["⚠","NGX / NSE / GSE — no free source yet"]].map(([s,i])=>e.jsxs("div",{className:"cheat-row cheat-row--data",children:[e.jsx("span",{className:"cheat-icon",children:s}),e.jsx("span",{className:"cheat-desc",children:i})]},i))]}),e.jsxs("div",{className:"cheat-col",children:[e.jsx("div",{className:"cheat-section-title",children:"Features"}),[["Screener","Filter & rank stocks across exchanges"],["Compare","Normalized chart + correlation matrix"],["Portfolio","P&L, allocation donut, risk metrics"],["Monitor","Full-screen watchlist grid"],["Alerts","Price & % change triggers"],["Yield Curve","US Treasuries inversion detection"],["Africa Map","Click exchanges on the map"],["Macro","World Bank GDP, CPI, unemployment"],["Export","CSV download on Exchange + Portfolio"]].map(([s,i])=>e.jsxs("div",{className:"cheat-row",children:[e.jsx("span",{className:"cheat-feat",children:s}),e.jsx("span",{className:"cheat-desc",children:i})]},s))]})]})]}),e.jsx("style",{children:`
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
      `})]})}function k({message:o}){return e.jsx("div",{style:{padding:"1.25rem 0.75rem",fontSize:"11px",color:"var(--color-text-muted)",textAlign:"center",border:"1px dashed var(--color-border)",borderRadius:4},children:o})}function Ne({count:o}){return e.jsx("div",{style:{display:"flex",gap:"0.75rem"},children:Array.from({length:o}).map((r,a)=>e.jsx(w,{width:160,height:110},a))})}function w({width:o,height:r}){return e.jsx("div",{style:{width:o??"100%",height:r,background:"var(--color-bg-tertiary)",borderRadius:4,animation:"pulse 1.5s ease-in-out infinite"}})}export{Me as default};
