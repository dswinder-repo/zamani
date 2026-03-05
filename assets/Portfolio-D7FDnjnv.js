import{r as z,k as A,e as L,j as e}from"./vendor-9MAh3nQh.js";import{D as E,d as U}from"./csvExport-U8oHef0D.js";import{e as V,p as P,B as $}from"./index-DA4_4N8F.js";import{c as B}from"./store-Dxzhro6a.js";import{C as H}from"./circle-plus-CnylaYqd.js";import{R,A as q,C as G,X as J,Y as M,T as I,d as K}from"./recharts-BRfCWRCn.js";import{T as O}from"./trash-2-CBoK6GzW.js";function X(n){const m=new Map;for(const t of n){const s=m.get(t.symbol)??{shares:0,totalCost:0,name:t.name,exchange:t.exchange,currency:t.currency};if(t.type==="buy")s.totalCost+=t.shares*t.price,s.shares+=t.shares;else{const l=s.shares>0?s.totalCost/s.shares:0;s.totalCost-=l*t.shares,s.shares-=t.shares}m.set(t.symbol,s)}return[...m.entries()].filter(([,t])=>t.shares>1e-4).map(([t,s])=>({symbol:t,name:s.name,exchange:s.exchange,currency:s.currency,shares:+s.shares.toFixed(6),avgCost:s.shares>0?+(s.totalCost/s.shares).toFixed(4):0,totalCost:+s.totalCost.toFixed(2)}))}const Q=B()(V((n,m)=>({transactions:[],addTransaction(t){const s={...t,id:`${Date.now()}-${Math.random().toString(36).slice(2)}`};n(l=>({transactions:[...l.transactions,s]}))},removeTransaction(t){n(s=>({transactions:s.transactions.filter(l=>l.id!==t)}))},getHoldings(){return X(m().transactions)}}),{name:"zamani-portfolio"})),Z=["JSE","NGX","NSE","GSE","BRVM","ZSE","BSE","LUSE"];function W({onClose:n,onAdd:m}){const[t,s]=z.useState({type:"buy",symbol:"",name:"",exchange:"JSE",currency:"ZAR",shares:"",price:"",date:new Date().toISOString().slice(0,10),note:""}),l=(a,d)=>s(j=>({...j,[a]:d})),h=t.symbol&&t.name&&Number(t.shares)>0&&Number(t.price)>0;function b(){h&&(m({type:t.type,symbol:t.symbol.toUpperCase(),name:t.name,exchange:t.exchange,currency:t.currency,shares:Number(t.shares),price:Number(t.price),date:t.date,note:t.note||void 0}),n())}return e.jsx("div",{className:"modal-overlay",onClick:n,children:e.jsxs("div",{className:"modal-box",onClick:a=>a.stopPropagation(),children:[e.jsx("h2",{className:"modal-title",children:"Add Transaction"}),e.jsx("div",{className:"tx-type-row",children:["buy","sell"].map(a=>e.jsx("button",{className:`tx-type-btn ${t.type===a?"active-"+a:""}`,onClick:()=>l("type",a),children:a==="buy"?"Buy":"Sell"},a))}),e.jsxs("div",{className:"modal-grid",children:[e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Symbol"}),e.jsx("input",{value:t.symbol,onChange:a=>l("symbol",a.target.value),placeholder:"e.g. NPN",className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Exchange"}),e.jsx("select",{value:t.exchange,onChange:a=>l("exchange",a.target.value),className:"modal-input",children:Z.map(a=>e.jsx("option",{children:a},a))})]}),e.jsxs("label",{className:"modal-field",style:{gridColumn:"1 / -1"},children:[e.jsx("span",{children:"Company Name"}),e.jsx("input",{value:t.name,onChange:a=>l("name",a.target.value),placeholder:"e.g. Naspers",className:"modal-input"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Shares"}),e.jsx("input",{type:"number",min:"0",step:"any",value:t.shares,onChange:a=>l("shares",a.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Price per share"}),e.jsx("input",{type:"number",min:"0",step:"any",value:t.price,onChange:a=>l("price",a.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Currency"}),e.jsx("input",{value:t.currency,onChange:a=>l("currency",a.target.value),placeholder:"ZAR",className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Date"}),e.jsx("input",{type:"date",value:t.date,onChange:a=>l("date",a.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",style:{gridColumn:"1 / -1"},children:[e.jsx("span",{children:"Note (optional)"}),e.jsx("input",{value:t.note,onChange:a=>l("note",a.target.value),placeholder:"Optional note",className:"modal-input"})]})]}),e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{className:"modal-cancel",onClick:n,children:"Cancel"}),e.jsxs("button",{className:`modal-submit modal-submit-${t.type}`,onClick:b,disabled:!h,children:["Add ",t.type==="buy"?"Buy":"Sell"]})]}),e.jsx("style",{children:`
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
        `})]})})}function se(){const{transactions:n,addTransaction:m,removeTransaction:t,getHoldings:s}=Q(),[l,h]=z.useState(!1),[b,a]=z.useState("holdings"),d=s(),j=A({queries:d.map(r=>({queryKey:["quote",r.symbol],queryFn:()=>P.getQuote(r.symbol),staleTime:3e4,refetchInterval:3e4}))}),x=d.map((r,o)=>{const i=j[o]?.data,c=i?.price??r.avgCost,p=c*r.shares,u=r.totalCost,g=p-u,S=u>0?g/u*100:0;return{...r,currentPrice:c,currentValue:p,pnl:g,pnlPct:S,currency:i?.currency??r.currency}}),F=x.reduce((r,o)=>r+o.currentValue,0),f=x.reduce((r,o)=>r+o.totalCost,0),N=F-f,T=f>0?N/f*100:0,C=N>=0,w=n.length?[...n].sort((r,o)=>r.date.localeCompare(o.date))[0].date:null,{data:y}=L({queryKey:["history","^J200",365],queryFn:()=>P.getHistory("^J200",365),staleTime:60*6e4,enabled:!!w&&d.length>0}),v=(()=>{if(!y?.length||!w)return null;const r=new Date(w).getTime(),o=y.find(c=>c.time>=r),i=y[y.length-1];return!o||!i||o.close===0?null:+((i.close-o.close)/o.close*100).toFixed(2)})(),D=n.slice().sort((r,o)=>r.date.localeCompare(o.date)).reduce((r,o)=>{const i=r[r.length-1]?.value??0,c=o.type==="buy"?o.shares*o.price:-(o.shares*o.price);return r.push({date:o.date,value:+(i+c).toFixed(2)}),r},[]);return e.jsxs("div",{className:"port-page",children:[e.jsxs("div",{className:"port-header",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"port-h1",children:"Portfolio"}),e.jsx("p",{className:"port-sub",children:"Track your African market holdings and P&L"})]}),e.jsxs("button",{className:"port-add-btn",onClick:()=>h(!0),children:[e.jsx(H,{size:13})," Add Transaction"]})]}),d.length>0&&e.jsxs("div",{className:"port-summary",children:[e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Portfolio Value"}),e.jsx("div",{className:"ps-value num",children:F.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Total Cost Basis"}),e.jsx("div",{className:"ps-value num",children:f.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Total P&L"}),e.jsxs("div",{className:`ps-value num ${C?"text-up":"text-down"}`,children:[C?"+":"",N.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsxs("span",{style:{fontSize:12,marginLeft:6},children:["(",C?"+":"",T.toFixed(2),"%)"]})]})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Holdings"}),e.jsx("div",{className:"ps-value num",children:d.length})]}),v!=null&&e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"JSE Top 40 (same period)"}),e.jsxs("div",{className:`ps-value num ${v>=0?"text-up":"text-down"}`,style:{fontSize:13},children:[v>=0?"+":"",v.toFixed(2),"%",e.jsx("span",{style:{display:"block",fontSize:10,fontFamily:"var(--font-sans)",color:"var(--color-text-muted)",fontWeight:400,marginTop:2},children:T>=v?"▲ outperforming":"▼ underperforming"})]})]})]}),D.length>1&&e.jsxs("div",{className:"port-chart panel",children:[e.jsx("div",{className:"section-label",children:"Investment History"}),e.jsx(R,{width:"100%",height:160,children:e.jsxs(q,{data:D,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"portGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"5%",stopColor:"var(--color-gold)",stopOpacity:.25}),e.jsx("stop",{offset:"95%",stopColor:"var(--color-gold)",stopOpacity:0})]})}),e.jsx(G,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(J,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(M,{tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:60,orientation:"right",tickFormatter:r=>r.toLocaleString("en-US",{notation:"compact"})}),e.jsx(I,{formatter:r=>[(r??0).toLocaleString("en-US",{minimumFractionDigits:2}),"Value"],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11}}),e.jsx(K,{type:"monotone",dataKey:"value",stroke:"var(--color-gold)",strokeWidth:1.5,fill:"url(#portGrad)",dot:!1,isAnimationActive:!1})]})})]}),e.jsxs("div",{className:"port-tabs",children:[["holdings","transactions"].map(r=>e.jsx("button",{className:`port-tab ${b===r?"active":""}`,onClick:()=>a(r),children:r==="holdings"?`Holdings (${d.length})`:`Transactions (${n.length})`},r)),x.length>0&&e.jsxs("button",{className:"port-tab",title:"Export CSV",onClick:()=>{const r=[["Symbol","Name","Exchange","Shares","Avg Cost","Current Price","Value","P&L","P&L %","Currency"],...x.map(o=>[o.symbol,o.name,o.exchange,o.shares,o.avgCost.toFixed(2),o.currentPrice.toFixed(2),o.currentValue.toFixed(2),o.pnl.toFixed(2),o.pnlPct.toFixed(2),o.currency])];U(r,"portfolio-holdings.csv")},style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx(E,{size:11})," Export"]})]}),d.length===0&&n.length===0&&e.jsxs("div",{className:"port-empty panel",children:[e.jsx($,{size:28,style:{opacity:.2,marginBottom:"0.75rem"}}),e.jsx("p",{children:"No transactions yet."}),e.jsx("p",{style:{fontSize:11},children:'Click "Add Transaction" to log your first buy or sell.'})]}),b==="holdings"&&d.length>0&&e.jsxs("div",{className:"panel port-table",children:[e.jsxs("div",{className:"pt-header",children:[e.jsx("span",{children:"Symbol"}),e.jsx("span",{children:"Shares"}),e.jsx("span",{className:"pt-r",children:"Avg Cost"}),e.jsx("span",{className:"pt-r",children:"Current"}),e.jsx("span",{className:"pt-r",children:"Value"}),e.jsx("span",{className:"pt-r",children:"P&L"})]}),x.map(r=>{const o=r.pnl>=0;return e.jsxs("div",{className:"pt-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"pt-symbol",children:r.symbol}),e.jsxs("div",{className:"pt-name",children:[r.name," · ",r.exchange]})]}),e.jsx("span",{className:"num",children:r.shares.toLocaleString("en-US",{maximumFractionDigits:4})}),e.jsx("span",{className:"num pt-r",children:r.avgCost.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:r.currentPrice.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:r.currentValue.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsxs("span",{className:`num pt-r ${o?"text-up":"text-down"}`,children:[o?"+":"",r.pnl.toFixed(2),e.jsxs("span",{style:{fontSize:10,display:"block"},children:["(",o?"+":"",r.pnlPct.toFixed(2),"%)"]})]})]},r.symbol)})]}),b==="transactions"&&n.length>0&&e.jsxs("div",{className:"panel port-table",children:[e.jsxs("div",{className:"pt-header pt-tx-header",children:[e.jsx("span",{children:"Date"}),e.jsx("span",{children:"Type"}),e.jsx("span",{children:"Symbol"}),e.jsx("span",{className:"pt-r",children:"Shares"}),e.jsx("span",{className:"pt-r",children:"Price"}),e.jsx("span",{className:"pt-r",children:"Total"}),e.jsx("span",{})]}),[...n].reverse().map(r=>e.jsxs("div",{className:"pt-row pt-tx-row",children:[e.jsx("span",{className:"num",style:{fontSize:11},children:r.date}),e.jsx("span",{className:`pt-type-badge ${r.type}`,children:r.type.toUpperCase()}),e.jsxs("div",{children:[e.jsx("div",{className:"pt-symbol",children:r.symbol}),e.jsx("div",{className:"pt-name",children:r.exchange})]}),e.jsx("span",{className:"num pt-r",children:r.shares}),e.jsx("span",{className:"num pt-r",children:r.price.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:(r.shares*r.price).toFixed(2)}),e.jsx("button",{className:"pt-del",onClick:()=>t(r.id),"aria-label":"Delete",children:e.jsx(O,{size:11})})]},r.id))]}),x.length>0&&(()=>{const r=new Map;for(const i of x){const c=i.currency||"USD",p=r.get(c)??{value:0,cost:0,count:0};r.set(c,{value:p.value+i.currentValue,cost:p.cost+i.totalCost,count:p.count+1})}const o=[...r.entries()].sort((i,c)=>c[1].value-i[1].value);return o.length<=1?null:e.jsxs("div",{children:[e.jsx("div",{className:"section-label",style:{padding:0},children:"By Currency"}),e.jsx("div",{className:"port-currency-grid",children:o.map(([i,{value:c,cost:p,count:u}])=>{const g=c-p,S=p>0?g/p*100:0,k=g>=0;return e.jsxs("div",{className:"port-cur-card panel",children:[e.jsxs("div",{className:"port-cur-header",children:[e.jsx("span",{className:"port-cur-code num",children:i}),e.jsxs("span",{className:"port-cur-count",children:[u," holding",u!==1?"s":""]})]}),e.jsx("div",{className:"port-cur-value num",children:c.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}),e.jsxs("div",{className:`port-cur-pnl num ${k?"text-up":"text-down"}`,children:[k?"+":"",g.toFixed(2)," (",k?"+":"",S.toFixed(2),"%)"]})]},i)})})]})})(),l&&e.jsx(W,{onClose:()=>h(!1),onAdd:m}),e.jsx("style",{children:`
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

        .port-chart { padding: 0.75rem 0.5rem 0.5rem; }

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
      `})]})}export{se as default};
