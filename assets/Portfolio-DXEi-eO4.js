import{r as C,k as F,j as e}from"./vendor-9MAh3nQh.js";import{b as A,p as T,B as D}from"./index-UWr_MPm4.js";import{c as P}from"./store-Dxzhro6a.js";import{C as L,T as E}from"./trash-2-DRf0_Y1d.js";import{R as U,A as $,a as B,X as V,Y as R,T as G,b as H}from"./recharts-Bc8jWMle.js";function q(n){const p=new Map;for(const a of n){const t=p.get(a.symbol)??{shares:0,totalCost:0,name:a.name,exchange:a.exchange,currency:a.currency};if(a.type==="buy")t.totalCost+=a.shares*a.price,t.shares+=a.shares;else{const l=t.shares>0?t.totalCost/t.shares:0;t.totalCost-=l*a.shares,t.shares-=a.shares}p.set(a.symbol,t)}return[...p.entries()].filter(([,a])=>a.shares>1e-4).map(([a,t])=>({symbol:a,name:t.name,exchange:t.exchange,currency:t.currency,shares:+t.shares.toFixed(6),avgCost:t.shares>0?+(t.totalCost/t.shares).toFixed(4):0,totalCost:+t.totalCost.toFixed(2)}))}const M=P()(A((n,p)=>({transactions:[],addTransaction(a){const t={...a,id:`${Date.now()}-${Math.random().toString(36).slice(2)}`};n(l=>({transactions:[...l.transactions,t]}))},removeTransaction(a){n(t=>({transactions:t.transactions.filter(l=>l.id!==a)}))},getHoldings(){return q(p().transactions)}}),{name:"zamani-portfolio"})),O=["JSE","NGX","NSE","GSE","BRVM","ZSE","BSE","LUSE"];function X({onClose:n,onAdd:p}){const[a,t]=C.useState({type:"buy",symbol:"",name:"",exchange:"JSE",currency:"ZAR",shares:"",price:"",date:new Date().toISOString().slice(0,10),note:""}),l=(o,m)=>t(f=>({...f,[o]:m})),g=a.symbol&&a.name&&Number(a.shares)>0&&Number(a.price)>0;function h(){g&&(p({type:a.type,symbol:a.symbol.toUpperCase(),name:a.name,exchange:a.exchange,currency:a.currency,shares:Number(a.shares),price:Number(a.price),date:a.date,note:a.note||void 0}),n())}return e.jsx("div",{className:"modal-overlay",onClick:n,children:e.jsxs("div",{className:"modal-box",onClick:o=>o.stopPropagation(),children:[e.jsx("h2",{className:"modal-title",children:"Add Transaction"}),e.jsx("div",{className:"tx-type-row",children:["buy","sell"].map(o=>e.jsx("button",{className:`tx-type-btn ${a.type===o?"active-"+o:""}`,onClick:()=>l("type",o),children:o==="buy"?"Buy":"Sell"},o))}),e.jsxs("div",{className:"modal-grid",children:[e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Symbol"}),e.jsx("input",{value:a.symbol,onChange:o=>l("symbol",o.target.value),placeholder:"e.g. NPN",className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Exchange"}),e.jsx("select",{value:a.exchange,onChange:o=>l("exchange",o.target.value),className:"modal-input",children:O.map(o=>e.jsx("option",{children:o},o))})]}),e.jsxs("label",{className:"modal-field",style:{gridColumn:"1 / -1"},children:[e.jsx("span",{children:"Company Name"}),e.jsx("input",{value:a.name,onChange:o=>l("name",o.target.value),placeholder:"e.g. Naspers",className:"modal-input"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Shares"}),e.jsx("input",{type:"number",min:"0",step:"any",value:a.shares,onChange:o=>l("shares",o.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Price per share"}),e.jsx("input",{type:"number",min:"0",step:"any",value:a.price,onChange:o=>l("price",o.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Currency"}),e.jsx("input",{value:a.currency,onChange:o=>l("currency",o.target.value),placeholder:"ZAR",className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Date"}),e.jsx("input",{type:"date",value:a.date,onChange:o=>l("date",o.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",style:{gridColumn:"1 / -1"},children:[e.jsx("span",{children:"Note (optional)"}),e.jsx("input",{value:a.note,onChange:o=>l("note",o.target.value),placeholder:"Optional note",className:"modal-input"})]})]}),e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{className:"modal-cancel",onClick:n,children:"Cancel"}),e.jsxs("button",{className:`modal-submit modal-submit-${a.type}`,onClick:h,disabled:!g,children:["Add ",a.type==="buy"?"Buy":"Sell"]})]}),e.jsx("style",{children:`
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
        `})]})})}function Y(){const{transactions:n,addTransaction:p,removeTransaction:a,getHoldings:t}=M(),[l,g]=C.useState(!1),[h,o]=C.useState("holdings"),m=t(),f=F({queries:m.map(r=>({queryKey:["quote",r.symbol],queryFn:()=>T.getQuote(r.symbol),staleTime:3e4,refetchInterval:3e4}))}),b=m.map((r,s)=>{const i=f[s]?.data,c=i?.price??r.avgCost,d=c*r.shares,x=r.totalCost,u=d-x,N=x>0?u/x*100:0;return{...r,currentPrice:c,currentValue:d,pnl:u,pnlPct:N,currency:i?.currency??r.currency}}),S=b.reduce((r,s)=>r+s.currentValue,0),v=b.reduce((r,s)=>r+s.totalCost,0),y=S-v,z=v>0?y/v*100:0,j=y>=0,k=n.slice().sort((r,s)=>r.date.localeCompare(s.date)).reduce((r,s)=>{const i=r[r.length-1]?.value??0,c=s.type==="buy"?s.shares*s.price:-(s.shares*s.price);return r.push({date:s.date,value:+(i+c).toFixed(2)}),r},[]);return e.jsxs("div",{className:"port-page",children:[e.jsxs("div",{className:"port-header",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"port-h1",children:"Portfolio"}),e.jsx("p",{className:"port-sub",children:"Track your African market holdings and P&L"})]}),e.jsxs("button",{className:"port-add-btn",onClick:()=>g(!0),children:[e.jsx(L,{size:13})," Add Transaction"]})]}),m.length>0&&e.jsxs("div",{className:"port-summary",children:[e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Portfolio Value"}),e.jsx("div",{className:"ps-value num",children:S.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Total Cost Basis"}),e.jsx("div",{className:"ps-value num",children:v.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Total P&L"}),e.jsxs("div",{className:`ps-value num ${j?"text-up":"text-down"}`,children:[j?"+":"",y.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsxs("span",{style:{fontSize:12,marginLeft:6},children:["(",j?"+":"",z.toFixed(2),"%)"]})]})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Holdings"}),e.jsx("div",{className:"ps-value num",children:m.length})]})]}),k.length>1&&e.jsxs("div",{className:"port-chart panel",children:[e.jsx("div",{className:"section-label",children:"Investment History"}),e.jsx(U,{width:"100%",height:160,children:e.jsxs($,{data:k,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"portGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"5%",stopColor:"var(--color-gold)",stopOpacity:.25}),e.jsx("stop",{offset:"95%",stopColor:"var(--color-gold)",stopOpacity:0})]})}),e.jsx(B,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(V,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(R,{tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:60,orientation:"right",tickFormatter:r=>r.toLocaleString("en-US",{notation:"compact"})}),e.jsx(G,{formatter:r=>[(r??0).toLocaleString("en-US",{minimumFractionDigits:2}),"Value"],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11}}),e.jsx(H,{type:"monotone",dataKey:"value",stroke:"var(--color-gold)",strokeWidth:1.5,fill:"url(#portGrad)",dot:!1,isAnimationActive:!1})]})})]}),e.jsx("div",{className:"port-tabs",children:["holdings","transactions"].map(r=>e.jsx("button",{className:`port-tab ${h===r?"active":""}`,onClick:()=>o(r),children:r==="holdings"?`Holdings (${m.length})`:`Transactions (${n.length})`},r))}),m.length===0&&n.length===0&&e.jsxs("div",{className:"port-empty panel",children:[e.jsx(D,{size:28,style:{opacity:.2,marginBottom:"0.75rem"}}),e.jsx("p",{children:"No transactions yet."}),e.jsx("p",{style:{fontSize:11},children:'Click "Add Transaction" to log your first buy or sell.'})]}),h==="holdings"&&m.length>0&&e.jsxs("div",{className:"panel port-table",children:[e.jsxs("div",{className:"pt-header",children:[e.jsx("span",{children:"Symbol"}),e.jsx("span",{children:"Shares"}),e.jsx("span",{className:"pt-r",children:"Avg Cost"}),e.jsx("span",{className:"pt-r",children:"Current"}),e.jsx("span",{className:"pt-r",children:"Value"}),e.jsx("span",{className:"pt-r",children:"P&L"})]}),b.map(r=>{const s=r.pnl>=0;return e.jsxs("div",{className:"pt-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"pt-symbol",children:r.symbol}),e.jsxs("div",{className:"pt-name",children:[r.name," · ",r.exchange]})]}),e.jsx("span",{className:"num",children:r.shares.toLocaleString("en-US",{maximumFractionDigits:4})}),e.jsx("span",{className:"num pt-r",children:r.avgCost.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:r.currentPrice.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:r.currentValue.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsxs("span",{className:`num pt-r ${s?"text-up":"text-down"}`,children:[s?"+":"",r.pnl.toFixed(2),e.jsxs("span",{style:{fontSize:10,display:"block"},children:["(",s?"+":"",r.pnlPct.toFixed(2),"%)"]})]})]},r.symbol)})]}),h==="transactions"&&n.length>0&&e.jsxs("div",{className:"panel port-table",children:[e.jsxs("div",{className:"pt-header pt-tx-header",children:[e.jsx("span",{children:"Date"}),e.jsx("span",{children:"Type"}),e.jsx("span",{children:"Symbol"}),e.jsx("span",{className:"pt-r",children:"Shares"}),e.jsx("span",{className:"pt-r",children:"Price"}),e.jsx("span",{className:"pt-r",children:"Total"}),e.jsx("span",{})]}),[...n].reverse().map(r=>e.jsxs("div",{className:"pt-row pt-tx-row",children:[e.jsx("span",{className:"num",style:{fontSize:11},children:r.date}),e.jsx("span",{className:`pt-type-badge ${r.type}`,children:r.type.toUpperCase()}),e.jsxs("div",{children:[e.jsx("div",{className:"pt-symbol",children:r.symbol}),e.jsx("div",{className:"pt-name",children:r.exchange})]}),e.jsx("span",{className:"num pt-r",children:r.shares}),e.jsx("span",{className:"num pt-r",children:r.price.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:(r.shares*r.price).toFixed(2)}),e.jsx("button",{className:"pt-del",onClick:()=>a(r.id),"aria-label":"Delete",children:e.jsx(E,{size:11})})]},r.id))]}),b.length>0&&(()=>{const r=new Map;for(const i of b){const c=i.currency||"USD",d=r.get(c)??{value:0,cost:0,count:0};r.set(c,{value:d.value+i.currentValue,cost:d.cost+i.totalCost,count:d.count+1})}const s=[...r.entries()].sort((i,c)=>c[1].value-i[1].value);return s.length<=1?null:e.jsxs("div",{children:[e.jsx("div",{className:"section-label",style:{padding:0},children:"By Currency"}),e.jsx("div",{className:"port-currency-grid",children:s.map(([i,{value:c,cost:d,count:x}])=>{const u=c-d,N=d>0?u/d*100:0,w=u>=0;return e.jsxs("div",{className:"port-cur-card panel",children:[e.jsxs("div",{className:"port-cur-header",children:[e.jsx("span",{className:"port-cur-code num",children:i}),e.jsxs("span",{className:"port-cur-count",children:[x," holding",x!==1?"s":""]})]}),e.jsx("div",{className:"port-cur-value num",children:c.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}),e.jsxs("div",{className:`port-cur-pnl num ${w?"text-up":"text-down"}`,children:[w?"+":"",u.toFixed(2)," (",w?"+":"",N.toFixed(2),"%)"]})]},i)})})]})})(),l&&e.jsx(X,{onClose:()=>g(!1),onAdd:p}),e.jsx("style",{children:`
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
      `})]})}export{Y as default};
