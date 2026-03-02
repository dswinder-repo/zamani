import{r as y,k as z,j as e}from"./vendor-9MAh3nQh.js";import{b as F,p as A,B as T}from"./index-DgRDm8a5.js";import{c as P}from"./store-Dxzhro6a.js";import{C as D,T as L}from"./trash-2-DZdPMN-9.js";import{R as E,A as U,a as $,X as B,Y as R,T as V,b as G}from"./recharts-DZAYuskz.js";function H(n){const i=new Map;for(const r of n){const s=i.get(r.symbol)??{shares:0,totalCost:0,name:r.name,exchange:r.exchange,currency:r.currency};if(r.type==="buy")s.totalCost+=r.shares*r.price,s.shares+=r.shares;else{const l=s.shares>0?s.totalCost/s.shares:0;s.totalCost-=l*r.shares,s.shares-=r.shares}i.set(r.symbol,s)}return[...i.entries()].filter(([,r])=>r.shares>1e-4).map(([r,s])=>({symbol:r,name:s.name,exchange:s.exchange,currency:s.currency,shares:+s.shares.toFixed(6),avgCost:s.shares>0?+(s.totalCost/s.shares).toFixed(4):0,totalCost:+s.totalCost.toFixed(2)}))}const q=P()(F((n,i)=>({transactions:[],addTransaction(r){const s={...r,id:`${Date.now()}-${Math.random().toString(36).slice(2)}`};n(l=>({transactions:[...l.transactions,s]}))},removeTransaction(r){n(s=>({transactions:s.transactions.filter(l=>l.id!==r)}))},getHoldings(){return H(i().transactions)}}),{name:"zamani-portfolio"})),M=["JSE","NGX","NSE","GSE","BRVM","ZSE","BSE","LUSE"];function O({onClose:n,onAdd:i}){const[r,s]=y.useState({type:"buy",symbol:"",name:"",exchange:"JSE",currency:"ZAR",shares:"",price:"",date:new Date().toISOString().slice(0,10),note:""}),l=(o,c)=>s(g=>({...g,[o]:c})),d=r.symbol&&r.name&&Number(r.shares)>0&&Number(r.price)>0;function p(){d&&(i({type:r.type,symbol:r.symbol.toUpperCase(),name:r.name,exchange:r.exchange,currency:r.currency,shares:Number(r.shares),price:Number(r.price),date:r.date,note:r.note||void 0}),n())}return e.jsx("div",{className:"modal-overlay",onClick:n,children:e.jsxs("div",{className:"modal-box",onClick:o=>o.stopPropagation(),children:[e.jsx("h2",{className:"modal-title",children:"Add Transaction"}),e.jsx("div",{className:"tx-type-row",children:["buy","sell"].map(o=>e.jsx("button",{className:`tx-type-btn ${r.type===o?"active-"+o:""}`,onClick:()=>l("type",o),children:o==="buy"?"Buy":"Sell"},o))}),e.jsxs("div",{className:"modal-grid",children:[e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Symbol"}),e.jsx("input",{value:r.symbol,onChange:o=>l("symbol",o.target.value),placeholder:"e.g. NPN",className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Exchange"}),e.jsx("select",{value:r.exchange,onChange:o=>l("exchange",o.target.value),className:"modal-input",children:M.map(o=>e.jsx("option",{children:o},o))})]}),e.jsxs("label",{className:"modal-field",style:{gridColumn:"1 / -1"},children:[e.jsx("span",{children:"Company Name"}),e.jsx("input",{value:r.name,onChange:o=>l("name",o.target.value),placeholder:"e.g. Naspers",className:"modal-input"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Shares"}),e.jsx("input",{type:"number",min:"0",step:"any",value:r.shares,onChange:o=>l("shares",o.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Price per share"}),e.jsx("input",{type:"number",min:"0",step:"any",value:r.price,onChange:o=>l("price",o.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Currency"}),e.jsx("input",{value:r.currency,onChange:o=>l("currency",o.target.value),placeholder:"ZAR",className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Date"}),e.jsx("input",{type:"date",value:r.date,onChange:o=>l("date",o.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",style:{gridColumn:"1 / -1"},children:[e.jsx("span",{children:"Note (optional)"}),e.jsx("input",{value:r.note,onChange:o=>l("note",o.target.value),placeholder:"Optional note",className:"modal-input"})]})]}),e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{className:"modal-cancel",onClick:n,children:"Cancel"}),e.jsxs("button",{className:`modal-submit modal-submit-${r.type}`,onClick:p,disabled:!d,children:["Add ",r.type==="buy"?"Buy":"Sell"]})]}),e.jsx("style",{children:`
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
        `})]})})}function Q(){const{transactions:n,addTransaction:i,removeTransaction:r,getHoldings:s}=q(),[l,d]=y.useState(!1),[p,o]=y.useState("holdings"),c=s(),g=z({queries:c.map(a=>({queryKey:["quote",a.symbol],queryFn:()=>A.getQuote(a.symbol),staleTime:3e4,refetchInterval:3e4}))}),h=c.map((a,t)=>{const x=g[t]?.data,u=x?.price??a.avgCost,C=u*a.shares,f=a.totalCost,w=C-f,k=f>0?w/f*100:0;return{...a,currentPrice:u,currentValue:C,pnl:w,pnlPct:k,currency:x?.currency??a.currency}}),j=h.reduce((a,t)=>a+t.currentValue,0),m=h.reduce((a,t)=>a+t.totalCost,0),b=j-m,S=m>0?b/m*100:0,v=b>=0,N=n.slice().sort((a,t)=>a.date.localeCompare(t.date)).reduce((a,t)=>{const x=a[a.length-1]?.value??0,u=t.type==="buy"?t.shares*t.price:-(t.shares*t.price);return a.push({date:t.date,value:+(x+u).toFixed(2)}),a},[]);return e.jsxs("div",{className:"port-page",children:[e.jsxs("div",{className:"port-header",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"port-h1",children:"Portfolio"}),e.jsx("p",{className:"port-sub",children:"Track your African market holdings and P&L"})]}),e.jsxs("button",{className:"port-add-btn",onClick:()=>d(!0),children:[e.jsx(D,{size:13})," Add Transaction"]})]}),c.length>0&&e.jsxs("div",{className:"port-summary",children:[e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Portfolio Value"}),e.jsx("div",{className:"ps-value num",children:j.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Total Cost Basis"}),e.jsx("div",{className:"ps-value num",children:m.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Total P&L"}),e.jsxs("div",{className:`ps-value num ${v?"text-up":"text-down"}`,children:[v?"+":"",b.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsxs("span",{style:{fontSize:12,marginLeft:6},children:["(",v?"+":"",S.toFixed(2),"%)"]})]})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Holdings"}),e.jsx("div",{className:"ps-value num",children:c.length})]})]}),N.length>1&&e.jsxs("div",{className:"port-chart panel",children:[e.jsx("div",{className:"section-label",children:"Investment History"}),e.jsx(E,{width:"100%",height:160,children:e.jsxs(U,{data:N,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"portGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"5%",stopColor:"var(--color-gold)",stopOpacity:.25}),e.jsx("stop",{offset:"95%",stopColor:"var(--color-gold)",stopOpacity:0})]})}),e.jsx($,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(B,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(R,{tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:60,orientation:"right",tickFormatter:a=>a.toLocaleString("en-US",{notation:"compact"})}),e.jsx(V,{formatter:a=>[(a??0).toLocaleString("en-US",{minimumFractionDigits:2}),"Value"],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11}}),e.jsx(G,{type:"monotone",dataKey:"value",stroke:"var(--color-gold)",strokeWidth:1.5,fill:"url(#portGrad)",dot:!1,isAnimationActive:!1})]})})]}),e.jsx("div",{className:"port-tabs",children:["holdings","transactions"].map(a=>e.jsx("button",{className:`port-tab ${p===a?"active":""}`,onClick:()=>o(a),children:a==="holdings"?`Holdings (${c.length})`:`Transactions (${n.length})`},a))}),c.length===0&&n.length===0&&e.jsxs("div",{className:"port-empty panel",children:[e.jsx(T,{size:28,style:{opacity:.2,marginBottom:"0.75rem"}}),e.jsx("p",{children:"No transactions yet."}),e.jsx("p",{style:{fontSize:11},children:'Click "Add Transaction" to log your first buy or sell.'})]}),p==="holdings"&&c.length>0&&e.jsxs("div",{className:"panel port-table",children:[e.jsxs("div",{className:"pt-header",children:[e.jsx("span",{children:"Symbol"}),e.jsx("span",{children:"Shares"}),e.jsx("span",{className:"pt-r",children:"Avg Cost"}),e.jsx("span",{className:"pt-r",children:"Current"}),e.jsx("span",{className:"pt-r",children:"Value"}),e.jsx("span",{className:"pt-r",children:"P&L"})]}),h.map(a=>{const t=a.pnl>=0;return e.jsxs("div",{className:"pt-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"pt-symbol",children:a.symbol}),e.jsxs("div",{className:"pt-name",children:[a.name," · ",a.exchange]})]}),e.jsx("span",{className:"num",children:a.shares.toLocaleString("en-US",{maximumFractionDigits:4})}),e.jsx("span",{className:"num pt-r",children:a.avgCost.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:a.currentPrice.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:a.currentValue.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsxs("span",{className:`num pt-r ${t?"text-up":"text-down"}`,children:[t?"+":"",a.pnl.toFixed(2),e.jsxs("span",{style:{fontSize:10,display:"block"},children:["(",t?"+":"",a.pnlPct.toFixed(2),"%)"]})]})]},a.symbol)})]}),p==="transactions"&&n.length>0&&e.jsxs("div",{className:"panel port-table",children:[e.jsxs("div",{className:"pt-header pt-tx-header",children:[e.jsx("span",{children:"Date"}),e.jsx("span",{children:"Type"}),e.jsx("span",{children:"Symbol"}),e.jsx("span",{className:"pt-r",children:"Shares"}),e.jsx("span",{className:"pt-r",children:"Price"}),e.jsx("span",{className:"pt-r",children:"Total"}),e.jsx("span",{})]}),[...n].reverse().map(a=>e.jsxs("div",{className:"pt-row pt-tx-row",children:[e.jsx("span",{className:"num",style:{fontSize:11},children:a.date}),e.jsx("span",{className:`pt-type-badge ${a.type}`,children:a.type.toUpperCase()}),e.jsxs("div",{children:[e.jsx("div",{className:"pt-symbol",children:a.symbol}),e.jsx("div",{className:"pt-name",children:a.exchange})]}),e.jsx("span",{className:"num pt-r",children:a.shares}),e.jsx("span",{className:"num pt-r",children:a.price.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:(a.shares*a.price).toFixed(2)}),e.jsx("button",{className:"pt-del",onClick:()=>r(a.id),"aria-label":"Delete",children:e.jsx(L,{size:11})})]},a.id))]}),l&&e.jsx(O,{onClose:()=>d(!1),onAdd:i}),e.jsx("style",{children:`
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
      `})]})}export{Q as default};
