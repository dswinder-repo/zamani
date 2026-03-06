import{j as e,r as y,k,e as x,u as T}from"./vendor-9MAh3nQh.js";import{u as M,p as g,S as D,X as R,g as E,a as $,T as K,b as U}from"./index-BhwTJ1gr.js";import{N as Y,I as G,T as W}from"./NdebelePanel-C_YHhQqb.js";import{F as B}from"./ForexTable-CuCchoPr.js";import{S as O}from"./Sparkline-Sa5-OsUq.js";import{P as z}from"./plus-DPt9g1TS.js";import{R as _,L as X,C as Z,X as H,Y as Q,T as V,a as J}from"./recharts-DK6PfPlO.js";import{T as ee}from"./trending-down-CQ2RJ6Bl.js";import"./store-DR-NtvzW.js";const re=["surge","jump","gain","rise","record","profit","growth","strong","beat","higher","boost","rally","soar","climb","outperform","upgrade","buy"],oe=["drop","fall","plunge","lose","decline","loss","weak","miss","lower","cut","recession","crash","sell-off","downgrade","warning","risk","concern"];function ae(r){const o=r.toLowerCase();return re.some(a=>o.includes(a))?"pos":oe.some(a=>o.includes(a))?"neg":null}function te(r){const o=Date.now()-r,a=Math.floor(o/6e4);if(a<60)return`${a}m`;const l=Math.floor(a/60);return l<24?`${l}h`:`${Math.floor(l/24)}d`}function se({items:r}){return e.jsxs("div",{className:"panel news-feed",children:[r.map(o=>{const a=ae(o.headline);return e.jsxs("a",{className:"news-item",href:o.url,target:"_blank",rel:"noopener",children:[e.jsxs("div",{className:"news-meta",children:[e.jsx("span",{className:"news-source",children:o.source}),o.exchange&&e.jsx("span",{className:"news-tag",children:o.exchange}),a==="pos"&&e.jsx("span",{className:"news-sent pos",children:"▲"}),a==="neg"&&e.jsx("span",{className:"news-sent neg",children:"▼"}),e.jsx("span",{className:"news-time",children:te(o.publishedAt)})]}),e.jsx("div",{className:"news-headline",children:o.headline})]},o.id)}),e.jsx("style",{children:`
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
      `})]})}const le=new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});function ne(r){return r>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(r):le.format(r)}function ie({items:r}){return e.jsxs("div",{className:"comm-table",children:[r.map(o=>e.jsxs("div",{className:"comm-row",children:[e.jsx("div",{className:"comm-name",children:o.name}),e.jsxs("div",{className:"comm-unit",children:["/",o.unit]}),e.jsxs("div",{className:"comm-price",children:["$",ne(o.price)]}),e.jsxs("div",{className:`comm-chg ${o.changePct>=0?"up":"down"}`,children:[o.changePct>=0?"+":"",o.changePct.toFixed(2),"%"]})]},o.id)),e.jsx("style",{children:`
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
      `})]})}function ce(){const{lists:r,activeId:o,symbols:a,add:l,remove:c,createList:s,setActive:d}=M(),[w,n]=y.useState(!1),[f,h]=y.useState(""),[v,m]=y.useState(""),[F,b]=y.useState(!1),S=k({queries:a.map(t=>({queryKey:["quote",t],queryFn:()=>g.getQuote(t),staleTime:6e4,refetchInterval:6e4}))}),C=k({queries:a.map(t=>({queryKey:["history",t,30],queryFn:()=>g.getHistory(t,30),staleTime:5*6e4}))});function I(t){t.preventDefault();const i=f.trim().toUpperCase();i&&(l(i),h(""),n(!1))}function A(t){t.preventDefault();const i=v.trim();i&&(s(i),m(""),b(!1))}return e.jsxs("div",{className:"wl-panel",children:[r.length>1&&e.jsx("div",{className:"wl-tabs",children:r.map(t=>e.jsx("button",{className:`wl-tab ${t.id===o?"active":""}`,onClick:()=>d(t.id),title:t.name,children:t.name},t.id))}),e.jsxs("div",{className:"wl-list",children:[a.length===0&&e.jsx("div",{className:"wl-empty",children:"No symbols — add one below"}),a.map((t,i)=>{const p=S[i]?.data,P=C[i]?.data,j=(p?.changePct??0)>=0,L=P?.map(q=>q.close)??[];return e.jsxs("div",{className:"wl-row",children:[e.jsx(D,{size:10,className:"wl-star"}),e.jsxs("div",{className:"wl-sym-col",children:[e.jsx("span",{className:"wl-sym",children:t}),p?.exchange&&e.jsx("span",{className:"wl-exch",children:p.exchange})]}),L.length>=5&&e.jsx("div",{className:"wl-spark",children:e.jsx(O,{data:L,up:j,height:24,width:56})}),e.jsx("div",{className:"wl-price-col",children:p?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"wl-price",children:p.price.toFixed(2)}),e.jsxs("span",{className:`wl-chg ${j?"up":"down"}`,children:[j?"+":"",p.changePct.toFixed(2),"%"]})]}):e.jsx("span",{className:"wl-loading",children:"—"})}),e.jsx("button",{className:"wl-remove",onClick:()=>c(t),title:`Remove ${t}`,"aria-label":`Remove ${t}`,children:e.jsx(R,{size:10})})]},t)})]}),w?e.jsxs("form",{className:"wl-add-form",onSubmit:I,children:[e.jsx("input",{className:"wl-input",value:f,onChange:t=>h(t.target.value),placeholder:"e.g. SCOM.NR",autoFocus:!0}),e.jsx("button",{type:"submit",className:"wl-add-btn",children:"Add"}),e.jsx("button",{type:"button",className:"wl-cancel-btn",onClick:()=>n(!1),children:"✕"})]}):e.jsxs("div",{className:"wl-footer",children:[e.jsxs("button",{className:"wl-add-trigger",onClick:()=>n(!0),children:[e.jsx(z,{size:10})," Add symbol"]}),F?e.jsxs("form",{className:"wl-newlist-form",onSubmit:A,children:[e.jsx("input",{className:"wl-input",value:v,onChange:t=>m(t.target.value),placeholder:"List name",autoFocus:!0,style:{width:80}}),e.jsx("button",{type:"submit",className:"wl-add-btn",children:"OK"}),e.jsx("button",{type:"button",className:"wl-cancel-btn",onClick:()=>b(!1),children:"✕"})]}):e.jsxs("button",{className:"wl-list-trigger",onClick:()=>b(!0),title:"New watchlist",children:[e.jsx(z,{size:9})," List"]})]}),e.jsx("style",{children:`
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
      `})]})}function de(r){return r.id==="us10y"?r.value.toFixed(2)+"%":r.id==="vix"||r.id==="dxy"?r.value.toFixed(2):r.value>=1e4?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(r.value):r.value>=1e3?new Intl.NumberFormat("en-US",{maximumFractionDigits:1}).format(r.value):r.value.toFixed(2)}function me({m:r}){const o=r.id==="vix"?r.changePct<=0:r.changePct>=0,a=r.changePct>=0?"+":"";return e.jsxs("div",{className:"gm-item",children:[e.jsx("span",{className:"gm-name",children:r.name}),e.jsx("span",{className:"gm-value",children:de(r)}),e.jsxs("span",{className:`gm-pct ${o?"up":"down"}`,children:[a,r.changePct.toFixed(2),"%"]})]})}function xe(){const{data:r}=x({queryKey:["global-markets"],queryFn:E,staleTime:6e4,refetchInterval:6e4});return r?.length?e.jsxs("div",{className:"gm-bar",children:[e.jsx("div",{className:"gm-label",children:"GLOBAL"}),e.jsx("div",{className:"gm-scroll",children:r.map(o=>e.jsx(me,{m:o},o.id))}),e.jsx("style",{children:`
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
      `})]}):null}function pe({active:r,payload:o}){if(!r||!o?.length)return null;const a=o[0]?.payload;return a?e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"6px 10px",fontSize:11,fontFamily:"var(--font-mono)"},children:[e.jsx("div",{style:{color:"var(--color-text-muted)",marginBottom:2},children:a.label}),e.jsxs("div",{style:{color:"var(--color-gold)",fontWeight:700},children:[a.yield.toFixed(3),"%"]})]}):null}function ge(){const{data:r,isLoading:o}=x({queryKey:["yield-curve"],queryFn:$,staleTime:36e5,refetchInterval:36e5});if(o)return e.jsx("div",{style:{height:120,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--color-text-muted)"},children:"Loading yield curve…"});if(!r?.length)return e.jsx("div",{style:{height:60,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--color-text-muted)",fontStyle:"italic"},children:"Yield curve data unavailable"});const a=Math.max(0,Math.min(...r.map(s=>s.yield))-.2),l=Math.max(...r.map(s=>s.yield))+.2,c=r.some((s,d)=>d>0&&s.yield<r[d-1].yield);return e.jsxs("div",{className:"yc-panel",children:[e.jsxs("div",{className:"yc-header",children:[e.jsx("span",{className:"yc-title",children:"US Yield Curve"}),c&&e.jsx("span",{className:"yc-inverted",children:"⚠ Inverted"}),e.jsx("div",{className:"yc-values",children:r.map(s=>e.jsxs("span",{className:"yc-tick",children:[e.jsx("span",{className:"yc-mat",children:s.maturity}),e.jsxs("span",{className:"yc-yield",children:[s.yield.toFixed(2),"%"]})]},s.maturity))})]}),e.jsx(_,{width:"100%",height:90,children:e.jsxs(X,{data:r,margin:{top:4,right:4,bottom:0,left:0},children:[e.jsx(Z,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(H,{dataKey:"maturity",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"}}),e.jsx(Q,{domain:[a,l],tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:32,orientation:"right",tickFormatter:s=>`${s.toFixed(1)}%`}),e.jsx(V,{content:e.jsx(pe,{})}),e.jsx(J,{type:"monotone",dataKey:"yield",stroke:c?"var(--color-down)":"var(--color-gold)",strokeWidth:2,dot:{fill:"var(--color-gold)",r:3},isAnimationActive:!1})]})}),e.jsx("style",{children:`
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
      `})]})}const he=[{id:"jse",name:"JSE",country:"South Africa",x:124,y:238,color:"var(--color-jse)"},{id:"ngx",name:"NGX",country:"Nigeria",x:77,y:152,color:"var(--color-ngx)"},{id:"nse",name:"NSE",country:"Kenya",x:148,y:156,color:"var(--color-nse)"},{id:"gse",name:"GSE",country:"Ghana",x:67,y:144,color:"var(--color-gse)"},{id:"brvm",name:"BRVM",country:"Ivory Coast",x:62,y:148,color:"var(--color-brvm)"},{id:"zse",name:"ZSE",country:"Zimbabwe",x:134,y:218,color:"var(--color-zse)"},{id:"bse",name:"BSE",country:"Botswana",x:122,y:222,color:"var(--color-bse)"},{id:"luse",name:"LUSE",country:"Zambia",x:126,y:205,color:"var(--color-luse)"},{id:"use",name:"USE",country:"Uganda",x:140,y:148,color:"var(--color-use)"}],ue=`
  M 100,2 L 120,2 L 135,8 L 150,10 L 165,15 L 175,20 L 180,30 L 185,45
  L 190,60 L 195,75 L 198,90 L 198,105 L 195,120 L 190,133 L 183,145
  L 175,158 L 168,168 L 165,180 L 163,193 L 158,205 L 150,218
  L 140,228 L 130,238 L 125,248 L 122,255 L 120,262 L 118,268
  L 116,262 L 114,255 L 112,248 L 108,240 L 100,228 L 90,218
  L 80,208 L 70,200 L 60,192 L 50,182 L 42,170 L 35,158 L 28,145
  L 22,132 L 18,118 L 15,103 L 12,88 L 10,73 L 10,58 L 14,43
  L 20,30 L 28,20 L 38,14 L 50,9 L 62,5 L 75,2 L 88,2 Z
`;function fe(){const r=T();return e.jsxs("div",{className:"amap-wrap",children:[e.jsxs("svg",{viewBox:"0 0 210 280",className:"amap-svg","aria-label":"African exchanges map",children:[e.jsx("path",{d:ue,className:"amap-continent"}),he.map(o=>e.jsxs("g",{className:"amap-pin-group",onClick:()=>r(`/exchange/${o.id}`),role:"button","aria-label":`${o.name} — ${o.country}`,tabIndex:0,onKeyDown:a=>a.key==="Enter"&&r(`/exchange/${o.id}`),children:[e.jsx("circle",{cx:o.x,cy:o.y,r:8,fill:o.color,opacity:.15,className:"amap-ring"}),e.jsx("circle",{cx:o.x,cy:o.y,r:4.5,fill:o.color,className:"amap-dot"}),e.jsx("text",{x:o.x,y:o.y-11,className:"amap-label",fill:o.color,textAnchor:"middle",fontSize:"7",fontFamily:"var(--font-mono)",fontWeight:"700",children:o.name})]},o.id))]}),e.jsx("style",{children:`
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
      `})]})}function Se(){const{data:r,isLoading:o}=x({queryKey:["indices","all"],queryFn:()=>g.getIndices?.("all")??Promise.resolve([]),staleTime:6e4}),{data:a,isLoading:l}=x({queryKey:["forex","major"],queryFn:()=>U(),staleTime:6e4}),{data:c,isLoading:s}=x({queryKey:["news","dashboard"],queryFn:()=>g.getNews?.("africa")??Promise.resolve([]),staleTime:5*6e4}),{data:d,isLoading:w}=x({queryKey:["commodities"],queryFn:()=>g.getCommodities?.()??Promise.resolve([]),staleTime:6e4}),{data:n,isLoading:f}=x({queryKey:["movers","all"],queryFn:()=>g.getTopMovers?.("all")??Promise.resolve({gainers:[],losers:[]}),staleTime:6e4}),h=r?.filter(m=>m.changePct>=0).length??0,v=(r?.length??0)-h;return e.jsxs("div",{className:"dashboard",children:[e.jsx("div",{className:"dash-header",children:e.jsxs("div",{className:"dash-title-row",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"dash-title",children:"African Markets"}),e.jsx("p",{className:"dash-subtitle",children:new Intl.DateTimeFormat("en-ZA",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(new Date)})]}),!o&&e.jsxs("div",{className:"dash-sentiment",children:[e.jsxs("span",{className:"sentiment-item up",children:[e.jsx(K,{size:13})," ",h," up"]}),e.jsxs("span",{className:"sentiment-item down",children:[e.jsx(ee,{size:13})," ",v," down"]})]}),e.jsx(Y,{width:80,height:80,opacity:.08,style:{position:"absolute",right:0,top:0}})]})}),e.jsx(xe,{}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Indices"}),o?e.jsx(ve,{count:5}):e.jsx("div",{className:"idx-strip",children:r?.map(m=>e.jsx(G,{index:m},m.id))})]}),e.jsxs("div",{className:"dash-grid-3",children:[e.jsxs("div",{className:"dash-col",children:[e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Top Movers"}),f?e.jsx(u,{height:180}):(n?.gainers.length??0)+(n?.losers.length??0)>0?e.jsx(W,{gainers:n?.gainers??[],losers:n?.losers??[]}):e.jsx(N,{message:"Movers data not available"})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Watchlist"}),e.jsx(ce,{})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Exchanges"}),e.jsx("div",{className:"panel",style:{padding:"0.5rem"},children:e.jsx(fe,{})})]})]}),e.jsxs("div",{className:"dash-col",children:[e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Forex Rates"}),l?e.jsx(u,{height:180}):e.jsx(B,{rates:a??[]})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Commodities"}),w?e.jsx(u,{height:200}):(d?.length??0)>0?e.jsx(ie,{items:d??[]}):e.jsx(N,{message:"Commodity data unavailable"})]}),e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Yield Curve"}),e.jsx("div",{className:"panel",style:{padding:"0.75rem"},children:e.jsx(ge,{})})]})]}),e.jsx("div",{className:"dash-col",children:e.jsxs("section",{className:"dash-section",children:[e.jsx("div",{className:"section-label",children:"Latest News"}),s?e.jsx(u,{height:400}):(c?.length??0)>0?e.jsx(se,{items:c??[]}):e.jsx(N,{message:"Live news feed not yet connected"})]})})]}),e.jsx("style",{children:`
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
      `})]})}function N({message:r}){return e.jsx("div",{style:{padding:"1.25rem 0.75rem",fontSize:"11px",color:"var(--color-text-muted)",textAlign:"center",border:"1px dashed var(--color-border)",borderRadius:4},children:r})}function ve({count:r}){return e.jsx("div",{style:{display:"flex",gap:"0.75rem"},children:Array.from({length:r}).map((o,a)=>e.jsx(u,{width:160,height:110},a))})}function u({width:r,height:o}){return e.jsx("div",{style:{width:r??"100%",height:o,background:"var(--color-bg-tertiary)",borderRadius:4,animation:"pulse 1.5s ease-in-out infinite"}})}export{Se as default};
