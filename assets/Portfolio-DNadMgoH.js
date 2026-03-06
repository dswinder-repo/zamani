import{r as D,k as B,e as $,j as e}from"./vendor-9MAh3nQh.js";import{d as H}from"./csvExport-JVihQZGh.js";import{e as O,p as T,B as q}from"./index-BhwTJ1gr.js";import{c as K}from"./store-DR-NtvzW.js";import{C as G}from"./circle-plus-DAXfug7C.js";import{R as F,A as M,C as E,X as U,Y as V,T as z,d as J,P as I,e as X,f as R,g as Q,h as Z,B as W}from"./recharts-DK6PfPlO.js";import{D as Y}from"./download-BO9yvLvU.js";import{T as _}from"./trash-2-CSPaHK1n.js";function ee(i){const m=new Map;for(const t of i){const n=m.get(t.symbol)??{shares:0,totalCost:0,name:t.name,exchange:t.exchange,currency:t.currency};if(t.type==="buy")n.totalCost+=t.shares*t.price,n.shares+=t.shares;else{const c=n.shares>0?n.totalCost/n.shares:0;n.totalCost-=c*t.shares,n.shares-=t.shares}m.set(t.symbol,n)}return[...m.entries()].filter(([,t])=>t.shares>1e-4).map(([t,n])=>({symbol:t,name:n.name,exchange:n.exchange,currency:n.currency,shares:+n.shares.toFixed(6),avgCost:n.shares>0?+(n.totalCost/n.shares).toFixed(4):0,totalCost:+n.totalCost.toFixed(2)}))}const re=K()(O((i,m)=>({transactions:[],addTransaction(t){const n={...t,id:`${Date.now()}-${Math.random().toString(36).slice(2)}`};i(c=>({transactions:[...c.transactions,n]}))},removeTransaction(t){i(n=>({transactions:n.transactions.filter(c=>c.id!==t)}))},getHoldings(){return ee(m().transactions)}}),{name:"zamani-portfolio"})),te=["JSE","NGX","NSE","GSE","BRVM","ZSE","BSE","LUSE"];function ae({onClose:i,onAdd:m}){const[t,n]=D.useState({type:"buy",symbol:"",name:"",exchange:"JSE",currency:"ZAR",shares:"",price:"",date:new Date().toISOString().slice(0,10),note:""}),c=(s,p)=>n(j=>({...j,[s]:p})),h=t.symbol&&t.name&&Number(t.shares)>0&&Number(t.price)>0;function b(){h&&(m({type:t.type,symbol:t.symbol.toUpperCase(),name:t.name,exchange:t.exchange,currency:t.currency,shares:Number(t.shares),price:Number(t.price),date:t.date,note:t.note||void 0}),i())}return e.jsx("div",{className:"modal-overlay",onClick:i,children:e.jsxs("div",{className:"modal-box",onClick:s=>s.stopPropagation(),children:[e.jsx("h2",{className:"modal-title",children:"Add Transaction"}),e.jsx("div",{className:"tx-type-row",children:["buy","sell"].map(s=>e.jsx("button",{className:`tx-type-btn ${t.type===s?"active-"+s:""}`,onClick:()=>c("type",s),children:s==="buy"?"Buy":"Sell"},s))}),e.jsxs("div",{className:"modal-grid",children:[e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Symbol"}),e.jsx("input",{value:t.symbol,onChange:s=>c("symbol",s.target.value),placeholder:"e.g. NPN",className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Exchange"}),e.jsx("select",{value:t.exchange,onChange:s=>c("exchange",s.target.value),className:"modal-input",children:te.map(s=>e.jsx("option",{children:s},s))})]}),e.jsxs("label",{className:"modal-field",style:{gridColumn:"1 / -1"},children:[e.jsx("span",{children:"Company Name"}),e.jsx("input",{value:t.name,onChange:s=>c("name",s.target.value),placeholder:"e.g. Naspers",className:"modal-input"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Shares"}),e.jsx("input",{type:"number",min:"0",step:"any",value:t.shares,onChange:s=>c("shares",s.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Price per share"}),e.jsx("input",{type:"number",min:"0",step:"any",value:t.price,onChange:s=>c("price",s.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Currency"}),e.jsx("input",{value:t.currency,onChange:s=>c("currency",s.target.value),placeholder:"ZAR",className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Date"}),e.jsx("input",{type:"date",value:t.date,onChange:s=>c("date",s.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",style:{gridColumn:"1 / -1"},children:[e.jsx("span",{children:"Note (optional)"}),e.jsx("input",{value:t.note,onChange:s=>c("note",s.target.value),placeholder:"Optional note",className:"modal-input"})]})]}),e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{className:"modal-cancel",onClick:i,children:"Cancel"}),e.jsxs("button",{className:`modal-submit modal-submit-${t.type}`,onClick:b,disabled:!h,children:["Add ",t.type==="buy"?"Buy":"Sell"]})]}),e.jsx("style",{children:`
          .modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.7);
            display: flex; align-items: center; justify-content: center; }
          .modal-box {
            background: var(--color-bg-elevated); border: 1px solid var(--color-border);
            border-radius: 6px; padding: 1.5rem; width: 440px; max-width: 92vw;
            box-shadow: 0 24px 48px rgba(0,0,0,0.6);
          }
          .modal-title { margin: 0 0 1rem; font-size: 15px; font-weight: 800; }
          .tx-type-row { display: flex; gap: 4px; margin-bottom: 1rem; }
          .tx-type-btn {
            flex: 1; padding: 5px; border-radius: 4px; font-size: 12px; font-weight: 700;
            border: 1px solid var(--color-border); background: none; cursor: pointer;
            color: var(--color-text-muted); transition: all 0.1s;
          }
          .active-buy  { background: var(--color-up-subtle); color: var(--color-up); border-color: var(--color-up); }
          .active-sell { background: var(--color-down-subtle); color: var(--color-down); border-color: var(--color-down); }
          .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
          .modal-field { display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--color-text-muted); }
          .modal-input {
            background: var(--color-bg-secondary); border: 1px solid var(--color-border);
            border-radius: 3px; padding: 0.375rem 0.5rem; color: var(--color-text-primary);
            font-size: 12px; font-family: var(--font-sans); outline: none;
          }
          .modal-input.mono { font-family: var(--font-mono); }
          .modal-input:focus { border-color: var(--color-gold-dim); }
          .modal-actions { display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1.25rem; }
          .modal-cancel {
            padding: 5px 14px; border-radius: 4px; border: 1px solid var(--color-border);
            background: none; color: var(--color-text-muted); font-size: 12px; cursor: pointer;
          }
          .modal-submit {
            padding: 5px 14px; border-radius: 4px; font-size: 12px; font-weight: 700;
            cursor: pointer; border: 1px solid;
          }
          .modal-submit:disabled { opacity: 0.4; cursor: default; }
          .modal-submit-buy  { background: var(--color-up-subtle); color: var(--color-up); border-color: var(--color-up); }
          .modal-submit-sell { background: var(--color-down-subtle); color: var(--color-down); border-color: var(--color-down); }
        `})]})})}function me(){const{transactions:i,addTransaction:m,removeTransaction:t,getHoldings:n}=re(),[c,h]=D.useState(!1),[b,s]=D.useState("holdings"),p=n(),j=B({queries:p.map(r=>({queryKey:["quote",r.symbol],queryFn:()=>T.getQuote(r.symbol),staleTime:3e4,refetchInterval:3e4}))}),x=p.map((r,a)=>{const o=j[a]?.data,l=o?.price??r.avgCost,d=l*r.shares,u=r.totalCost,g=d-u,w=u>0?g/u*100:0;return{...r,currentPrice:l,currentValue:d,pnl:g,pnlPct:w,currency:o?.currency??r.currency}}),L=x.reduce((r,a)=>r+a.currentValue,0),f=x.reduce((r,a)=>r+a.totalCost,0),N=L-f,A=f>0?N/f*100:0,S=N>=0,C=i.length?[...i].sort((r,a)=>r.date.localeCompare(a.date))[0].date:null,{data:y}=$({queryKey:["history","^J200",365],queryFn:()=>T.getHistory("^J200",365),staleTime:60*6e4,enabled:!!C&&p.length>0}),v=(()=>{if(!y?.length||!C)return null;const r=new Date(C).getTime(),a=y.find(l=>l.time>=r),o=y[y.length-1];return!a||!o||a.close===0?null:+((o.close-a.close)/a.close*100).toFixed(2)})(),P=i.slice().sort((r,a)=>r.date.localeCompare(a.date)).reduce((r,a)=>{const o=r[r.length-1]?.value??0,l=a.type==="buy"?a.shares*a.price:-(a.shares*a.price);return r.push({date:a.date,value:+(o+l).toFixed(2)}),r},[]);return e.jsxs("div",{className:"port-page",children:[e.jsxs("div",{className:"port-header",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"port-h1",children:"Portfolio"}),e.jsx("p",{className:"port-sub",children:"Track your African market holdings and P&L"})]}),e.jsxs("button",{className:"port-add-btn",onClick:()=>h(!0),children:[e.jsx(G,{size:13})," Add Transaction"]})]}),p.length>0&&e.jsxs("div",{className:"port-summary",children:[e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Portfolio Value"}),e.jsx("div",{className:"ps-value num",children:L.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Total Cost Basis"}),e.jsx("div",{className:"ps-value num",children:f.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Total P&L"}),e.jsxs("div",{className:`ps-value num ${S?"text-up":"text-down"}`,children:[S?"+":"",N.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsxs("span",{style:{fontSize:12,marginLeft:6},children:["(",S?"+":"",A.toFixed(2),"%)"]})]})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Holdings"}),e.jsx("div",{className:"ps-value num",children:p.length})]}),v!=null&&e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"JSE Top 40 (same period)"}),e.jsxs("div",{className:`ps-value num ${v>=0?"text-up":"text-down"}`,style:{fontSize:13},children:[v>=0?"+":"",v.toFixed(2),"%",e.jsx("span",{style:{display:"block",fontSize:10,fontFamily:"var(--font-sans)",color:"var(--color-text-muted)",fontWeight:400,marginTop:2},children:A>=v?"▲ outperforming":"▼ underperforming"})]})]})]}),P.length>1&&e.jsxs("div",{className:"port-chart panel",children:[e.jsx("div",{className:"section-label",children:"Investment History"}),e.jsx(F,{width:"100%",height:160,children:e.jsxs(M,{data:P,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"portGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"5%",stopColor:"var(--color-gold)",stopOpacity:.25}),e.jsx("stop",{offset:"95%",stopColor:"var(--color-gold)",stopOpacity:0})]})}),e.jsx(E,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(U,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(V,{tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:60,orientation:"right",tickFormatter:r=>r.toLocaleString("en-US",{notation:"compact"})}),e.jsx(z,{formatter:r=>[(r??0).toLocaleString("en-US",{minimumFractionDigits:2}),"Value"],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11}}),e.jsx(J,{type:"monotone",dataKey:"value",stroke:"var(--color-gold)",strokeWidth:1.5,fill:"url(#portGrad)",dot:!1,isAnimationActive:!1})]})})]}),x.length>0&&(()=>{const r=["#c9a84c","#4ade80","#60a5fa","#f472b6","#fb923c","#a78bfa","#34d399","#f87171","#38bdf8","#facc15"],a=x.map(o=>({name:o.symbol,value:+o.currentValue.toFixed(2)})).sort((o,l)=>l.value-o.value);return e.jsxs("div",{className:"port-alloc panel",children:[e.jsx("div",{className:"section-label",children:"Allocation"}),e.jsx(F,{width:"100%",height:200,children:e.jsxs(I,{children:[e.jsx(X,{data:a,dataKey:"value",nameKey:"name",cx:"50%",cy:"50%",innerRadius:55,outerRadius:80,paddingAngle:2,isAnimationActive:!1,children:a.map((o,l)=>e.jsx(R,{fill:r[l%r.length]},l))}),e.jsx(z,{formatter:o=>[(o??0).toLocaleString("en-US",{minimumFractionDigits:2}),"Value"],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11}}),e.jsx(Q,{wrapperStyle:{fontSize:10,fontFamily:"var(--font-mono)"}})]})})]})})(),i.length>1&&(()=>{const r={};for(const o of i){const l=o.date.slice(0,7),d=o.type==="buy"?-(o.shares*o.price):o.shares*o.price;r[l]=(r[l]??0)+d}const a=Object.entries(r).sort(([o],[l])=>o.localeCompare(l)).map(([o,l])=>{const[d,u]=o.split("-");return{label:new Date(+d,+u-1).toLocaleDateString("en-US",{month:"short",year:"2-digit"}),pnl:+l.toFixed(2)}});return a.length<2?null:e.jsxs("div",{className:"port-pnl-chart panel",children:[e.jsx("div",{className:"section-label",children:"Monthly P&L"}),e.jsx(F,{width:"100%",height:120,children:e.jsxs(Z,{data:a,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx(E,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(U,{dataKey:"label",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"}}),e.jsx(V,{tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:56,orientation:"right",tickFormatter:o=>o.toLocaleString("en-US",{notation:"compact"})}),e.jsx(z,{formatter:o=>[(o??0).toLocaleString("en-US",{minimumFractionDigits:2}),"P&L"],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11}}),e.jsx(W,{dataKey:"pnl",radius:[2,2,0,0],isAnimationActive:!1,children:a.map((o,l)=>e.jsx(R,{fill:o.pnl>=0?"var(--color-up)":"var(--color-down)",fillOpacity:.8},l))})]})})]})})(),e.jsxs("div",{className:"port-tabs",children:[["holdings","transactions"].map(r=>e.jsx("button",{className:`port-tab ${b===r?"active":""}`,onClick:()=>s(r),children:r==="holdings"?`Holdings (${p.length})`:`Transactions (${i.length})`},r)),x.length>0&&e.jsxs("button",{className:"port-tab",title:"Export CSV",onClick:()=>{const r=[["Symbol","Name","Exchange","Shares","Avg Cost","Current Price","Value","P&L","P&L %","Currency"],...x.map(a=>[a.symbol,a.name,a.exchange,a.shares,a.avgCost.toFixed(2),a.currentPrice.toFixed(2),a.currentValue.toFixed(2),a.pnl.toFixed(2),a.pnlPct.toFixed(2),a.currency])];H(r,"portfolio-holdings.csv")},style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx(Y,{size:11})," Export"]})]}),p.length===0&&i.length===0&&e.jsxs("div",{className:"port-empty panel",children:[e.jsx(q,{size:28,style:{opacity:.2,marginBottom:"0.75rem"}}),e.jsx("p",{children:"No transactions yet."}),e.jsx("p",{style:{fontSize:11},children:'Click "Add Transaction" to log your first buy or sell.'})]}),b==="holdings"&&p.length>0&&e.jsxs("div",{className:"panel port-table",children:[e.jsxs("div",{className:"pt-header",children:[e.jsx("span",{children:"Symbol"}),e.jsx("span",{children:"Shares"}),e.jsx("span",{className:"pt-r",children:"Avg Cost"}),e.jsx("span",{className:"pt-r",children:"Current"}),e.jsx("span",{className:"pt-r",children:"Value"}),e.jsx("span",{className:"pt-r",children:"P&L"})]}),x.map(r=>{const a=r.pnl>=0;return e.jsxs("div",{className:"pt-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"pt-symbol",children:r.symbol}),e.jsxs("div",{className:"pt-name",children:[r.name," · ",r.exchange]})]}),e.jsx("span",{className:"num",children:r.shares.toLocaleString("en-US",{maximumFractionDigits:4})}),e.jsx("span",{className:"num pt-r",children:r.avgCost.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:r.currentPrice.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:r.currentValue.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsxs("span",{className:`num pt-r ${a?"text-up":"text-down"}`,children:[a?"+":"",r.pnl.toFixed(2),e.jsxs("span",{style:{fontSize:10,display:"block"},children:["(",a?"+":"",r.pnlPct.toFixed(2),"%)"]})]})]},r.symbol)})]}),b==="transactions"&&i.length>0&&e.jsxs("div",{className:"panel port-table",children:[e.jsxs("div",{className:"pt-header pt-tx-header",children:[e.jsx("span",{children:"Date"}),e.jsx("span",{children:"Type"}),e.jsx("span",{children:"Symbol"}),e.jsx("span",{className:"pt-r",children:"Shares"}),e.jsx("span",{className:"pt-r",children:"Price"}),e.jsx("span",{className:"pt-r",children:"Total"}),e.jsx("span",{})]}),[...i].reverse().map(r=>e.jsxs("div",{className:"pt-row pt-tx-row",children:[e.jsx("span",{className:"num",style:{fontSize:11},children:r.date}),e.jsx("span",{className:`pt-type-badge ${r.type}`,children:r.type.toUpperCase()}),e.jsxs("div",{children:[e.jsx("div",{className:"pt-symbol",children:r.symbol}),e.jsx("div",{className:"pt-name",children:r.exchange})]}),e.jsx("span",{className:"num pt-r",children:r.shares}),e.jsx("span",{className:"num pt-r",children:r.price.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:(r.shares*r.price).toFixed(2)}),e.jsx("button",{className:"pt-del",onClick:()=>t(r.id),"aria-label":"Delete",children:e.jsx(_,{size:11})})]},r.id))]}),x.length>0&&(()=>{const r=new Map;for(const o of x){const l=o.currency||"USD",d=r.get(l)??{value:0,cost:0,count:0};r.set(l,{value:d.value+o.currentValue,cost:d.cost+o.totalCost,count:d.count+1})}const a=[...r.entries()].sort((o,l)=>l[1].value-o[1].value);return a.length<=1?null:e.jsxs("div",{children:[e.jsx("div",{className:"section-label",style:{padding:0},children:"By Currency"}),e.jsx("div",{className:"port-currency-grid",children:a.map(([o,{value:l,cost:d,count:u}])=>{const g=l-d,w=d>0?g/d*100:0,k=g>=0;return e.jsxs("div",{className:"port-cur-card panel",children:[e.jsxs("div",{className:"port-cur-header",children:[e.jsx("span",{className:"port-cur-code num",children:o}),e.jsxs("span",{className:"port-cur-count",children:[u," holding",u!==1?"s":""]})]}),e.jsx("div",{className:"port-cur-value num",children:l.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}),e.jsxs("div",{className:`port-cur-pnl num ${k?"text-up":"text-down"}`,children:[k?"+":"",g.toFixed(2)," (",k?"+":"",w.toFixed(2),"%)"]})]},o)})})]})})(),c&&e.jsx(ae,{onClose:()=>h(!1),onAdd:m}),e.jsx("style",{children:`
        .port-page { display: flex; flex-direction: column; gap: 1rem; max-width: 1000px; }
        .port-header { display: flex; align-items: flex-start; justify-content: space-between; }
        .port-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .port-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .port-add-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 4px;
          border: 1px solid var(--color-gold-dim);
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.1s;
        }
        .port-add-btn:hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        .port-summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
        @media (max-width: 700px) { .port-summary { grid-template-columns: repeat(2, 1fr); } }

        .port-stat { padding: 0.75rem 1rem; }
        .ps-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.25rem; }
        .ps-value { font-size: 16px; font-weight: 800; color: var(--color-text-primary); }

        .port-chart    { padding: 0.75rem 0.5rem 0.5rem; }
        .port-alloc    { padding: 0.75rem 0.5rem 0.5rem; }
        .port-pnl-chart { padding: 0.75rem 0.5rem 0.5rem; }

        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
          padding: 0 0.25rem;
        }

        .port-tabs { display: flex; gap: 4px; }
        .port-tab {
          padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 600;
          border: 1px solid var(--color-border); background: none; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.1s;
        }
        .port-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        .port-empty {
          padding: 3rem 2rem; text-align: center; display: flex; flex-direction: column;
          align-items: center; font-size: 13px; color: var(--color-text-muted);
        }
        .port-empty p { margin: 0.125rem 0; }

        .port-table { overflow: hidden; }
        .pt-header {
          display: grid; grid-template-columns: 1fr 80px 80px 90px 100px 100px;
          gap: 0.5rem; padding: 0.25rem 0.75rem;
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600;
          background: var(--color-bg-tertiary);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .pt-tx-header { grid-template-columns: 80px 50px 1fr 70px 80px 90px 28px; }
        .pt-row {
          display: grid; grid-template-columns: 1fr 80px 80px 90px 100px 100px;
          gap: 0.5rem; padding: 0.5rem 0.75rem; align-items: center;
          border-bottom: 1px solid var(--color-border-subtle); font-size: 12px;
        }
        .pt-row:last-child { border-bottom: none; }
        .pt-tx-row { grid-template-columns: 80px 50px 1fr 70px 80px 90px 28px; }
        .pt-r { text-align: right; }
        .pt-symbol { font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: var(--color-gold); }
        .pt-name   { font-size: 10px; color: var(--color-text-muted); }
        .pt-type-badge {
          font-size: 9px; font-weight: 700; padding: 2px 5px; border-radius: 3px;
          text-align: center;
        }
        .pt-type-badge.buy  { background: var(--color-up-subtle);   color: var(--color-up); }
        .pt-type-badge.sell { background: var(--color-down-subtle); color: var(--color-down); }
        .pt-del {
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); padding: 3px; border-radius: 3px;
          transition: all 0.1s;
        }
        .pt-del:hover { color: var(--color-down); background: var(--color-down-subtle); }

        /* Currency breakdown */
        .port-currency-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.5rem; }
        .port-cur-card { padding: 0.625rem 0.875rem; }
        .port-cur-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem; }
        .port-cur-code  { font-size: 13px; font-weight: 800; color: var(--color-gold); }
        .port-cur-count { font-size: 10px; color: var(--color-text-muted); }
        .port-cur-value { font-size: 15px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 2px; }
        .port-cur-pnl   { font-size: 10px; font-weight: 600; }
      `})]})}export{me as default};
