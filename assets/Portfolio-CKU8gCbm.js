import{r as R,k as Z,e as Y,j as e}from"./vendor-9MAh3nQh.js";import{d as _}from"./csvExport-JVihQZGh.js";import{e as ee,p as $,B as re}from"./index-C7rZDH3k.js";import{c as te}from"./store-DR-NtvzW.js";import{C as ae}from"./circle-plus-CdXZcRYj.js";import{R as P,A as oe,C as q,X as O,Y as H,T as E,d as se,P as le,e as ne,f as G,g as ie,h as ce,B as de}from"./recharts-DK6PfPlO.js";import{D as pe}from"./download-JA9XrSwo.js";import{T as me}from"./trash-2-Db8Z9T1E.js";function xe(c){const v=new Map;for(const o of c){const i=v.get(o.symbol)??{shares:0,totalCost:0,name:o.name,exchange:o.exchange,currency:o.currency};if(o.type==="buy")i.totalCost+=o.shares*o.price,i.shares+=o.shares;else{const p=i.shares>0?i.totalCost/i.shares:0;i.totalCost-=p*o.shares,i.shares-=o.shares}v.set(o.symbol,i)}return[...v.entries()].filter(([,o])=>o.shares>1e-4).map(([o,i])=>({symbol:o,name:i.name,exchange:i.exchange,currency:i.currency,shares:+i.shares.toFixed(6),avgCost:i.shares>0?+(i.totalCost/i.shares).toFixed(4):0,totalCost:+i.totalCost.toFixed(2)}))}const ue=te()(ee((c,v)=>({transactions:[],addTransaction(o){const i={...o,id:`${Date.now()}-${Math.random().toString(36).slice(2)}`};c(p=>({transactions:[...p.transactions,i]}))},removeTransaction(o){c(i=>({transactions:i.transactions.filter(p=>p.id!==o)}))},getHoldings(){return xe(v().transactions)}}),{name:"zamani-portfolio"})),he=["JSE","NGX","NSE","GSE","BRVM","ZSE","BSE","LUSE"];function ge({onClose:c,onAdd:v}){const[o,i]=R.useState({type:"buy",symbol:"",name:"",exchange:"JSE",currency:"ZAR",shares:"",price:"",date:new Date().toISOString().slice(0,10),note:""}),p=(l,h)=>i(D=>({...D,[l]:h})),k=o.symbol&&o.name&&Number(o.shares)>0&&Number(o.price)>0;function w(){k&&(v({type:o.type,symbol:o.symbol.toUpperCase(),name:o.name,exchange:o.exchange,currency:o.currency,shares:Number(o.shares),price:Number(o.price),date:o.date,note:o.note||void 0}),c())}return e.jsx("div",{className:"modal-overlay",onClick:c,children:e.jsxs("div",{className:"modal-box",onClick:l=>l.stopPropagation(),children:[e.jsx("h2",{className:"modal-title",children:"Add Transaction"}),e.jsx("div",{className:"tx-type-row",children:["buy","sell"].map(l=>e.jsx("button",{className:`tx-type-btn ${o.type===l?"active-"+l:""}`,onClick:()=>p("type",l),children:l==="buy"?"Buy":"Sell"},l))}),e.jsxs("div",{className:"modal-grid",children:[e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Symbol"}),e.jsx("input",{value:o.symbol,onChange:l=>p("symbol",l.target.value),placeholder:"e.g. NPN",className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Exchange"}),e.jsx("select",{value:o.exchange,onChange:l=>p("exchange",l.target.value),className:"modal-input",children:he.map(l=>e.jsx("option",{children:l},l))})]}),e.jsxs("label",{className:"modal-field",style:{gridColumn:"1 / -1"},children:[e.jsx("span",{children:"Company Name"}),e.jsx("input",{value:o.name,onChange:l=>p("name",l.target.value),placeholder:"e.g. Naspers",className:"modal-input"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Shares"}),e.jsx("input",{type:"number",min:"0",step:"any",value:o.shares,onChange:l=>p("shares",l.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Price per share"}),e.jsx("input",{type:"number",min:"0",step:"any",value:o.price,onChange:l=>p("price",l.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Currency"}),e.jsx("input",{value:o.currency,onChange:l=>p("currency",l.target.value),placeholder:"ZAR",className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Date"}),e.jsx("input",{type:"date",value:o.date,onChange:l=>p("date",l.target.value),className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",style:{gridColumn:"1 / -1"},children:[e.jsx("span",{children:"Note (optional)"}),e.jsx("input",{value:o.note,onChange:l=>p("note",l.target.value),placeholder:"Optional note",className:"modal-input"})]})]}),e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{className:"modal-cancel",onClick:c,children:"Cancel"}),e.jsxs("button",{className:`modal-submit modal-submit-${o.type}`,onClick:w,disabled:!k,children:["Add ",o.type==="buy"?"Buy":"Sell"]})]}),e.jsx("style",{children:`
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
        `})]})})}function Ce(){const{transactions:c,addTransaction:v,removeTransaction:o,getHoldings:i}=ue(),[p,k]=R.useState(!1),[w,l]=R.useState("holdings"),h=i(),D=Z({queries:h.map(r=>({queryKey:["quote",r.symbol],queryFn:()=>$.getQuote(r.symbol),staleTime:3e4,refetchInterval:3e4}))}),b=h.map((r,t)=>{const a=D[t]?.data,s=a?.price??r.avgCost,x=s*r.shares,u=r.totalCost,g=x-u,j=u>0?g/u*100:0;return{...r,currentPrice:s,currentValue:x,pnl:g,pnlPct:j,currency:a?.currency??r.currency}}),U=b.reduce((r,t)=>r+t.currentValue,0),F=b.reduce((r,t)=>r+t.totalCost,0),L=U-F,z=F>0?L/F*100:0,A=L>=0,S=c.length?[...c].sort((r,t)=>r.date.localeCompare(t.date))[0].date:null,{data:f}=Y({queryKey:["history","^J200",365],queryFn:()=>$.getHistory("^J200",365),staleTime:60*6e4,enabled:!!S&&h.length>0}),y=(()=>{if(!f?.length||!S)return null;const r=new Date(S).getTime(),t=f.find(s=>s.time>=r),a=f[f.length-1];return!t||!a||t.close===0?null:+((a.close-t.close)/t.close*100).toFixed(2)})(),m=(()=>{if(!f||f.length<30||!S)return null;const r=new Date(S).getTime(),t=f.filter(n=>n.time>=r);if(t.length<10)return null;const a=t.slice(1).map((n,d)=>(n.close-t[d].close)/t[d].close),s=a.map(()=>z/100/Math.max(a.length,1)),x=a.reduce((n,d)=>n+d,0)/a.length,u=s.reduce((n,d)=>n+d,0)/s.length;let g=0,j=0;for(let n=0;n<a.length;n++)g+=(s[n]-u)*(a[n]-x),j+=(a[n]-x)**2;const N=j===0?0:+(g/j).toFixed(2),B=z/100,M=Math.sqrt(s.reduce((n,d)=>n+(d-u)**2,0)/s.length)*Math.sqrt(252),K=M===0?0:+((B-.05)/M).toFixed(2),I=y!=null?y/100:0,J=+((B-(.05+N*(I-.05)))*100).toFixed(2),X=c.slice().sort((n,d)=>n.date.localeCompare(d.date)).reduce((n,d)=>{const Q=n[n.length-1]??0,W=d.type==="buy"?d.shares*d.price:-(d.shares*d.price);return n.push(Q+W),n},[]);let C=-1/0,T=0;for(const n of X){n>C&&(C=n);const d=C>0?(C-n)/C:0;d>T&&(T=d)}return{beta:N,sharpe:K,alpha:J,maxDrawdown:+(T*100).toFixed(1)}})(),V=c.slice().sort((r,t)=>r.date.localeCompare(t.date)).reduce((r,t)=>{const a=r[r.length-1]?.value??0,s=t.type==="buy"?t.shares*t.price:-(t.shares*t.price);return r.push({date:t.date,value:+(a+s).toFixed(2)}),r},[]);return e.jsxs("div",{className:"port-page",children:[e.jsxs("div",{className:"port-header",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"port-h1",children:"Portfolio"}),e.jsx("p",{className:"port-sub",children:"Track your African market holdings and P&L"})]}),e.jsxs("button",{className:"port-add-btn",onClick:()=>k(!0),children:[e.jsx(ae,{size:13})," Add Transaction"]})]}),h.length>0&&e.jsxs("div",{className:"port-summary",children:[e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Portfolio Value"}),e.jsx("div",{className:"ps-value num",children:U.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Total Cost Basis"}),e.jsx("div",{className:"ps-value num",children:F.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Total P&L"}),e.jsxs("div",{className:`ps-value num ${A?"text-up":"text-down"}`,children:[A?"+":"",L.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsxs("span",{style:{fontSize:12,marginLeft:6},children:["(",A?"+":"",z.toFixed(2),"%)"]})]})]}),e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"Holdings"}),e.jsx("div",{className:"ps-value num",children:h.length})]}),y!=null&&e.jsxs("div",{className:"port-stat panel",children:[e.jsx("div",{className:"ps-label",children:"JSE Top 40 (same period)"}),e.jsxs("div",{className:`ps-value num ${y>=0?"text-up":"text-down"}`,style:{fontSize:13},children:[y>=0?"+":"",y.toFixed(2),"%",e.jsx("span",{style:{display:"block",fontSize:10,fontFamily:"var(--font-sans)",color:"var(--color-text-muted)",fontWeight:400,marginTop:2},children:z>=y?"▲ outperforming":"▼ underperforming"})]})]})]}),m&&e.jsxs("div",{className:"port-risk panel",children:[e.jsxs("div",{className:"section-label",children:["Risk Analytics ",e.jsx("span",{style:{fontWeight:400,textTransform:"none",letterSpacing:0},children:"vs JSE Top 40"})]}),e.jsxs("div",{className:"port-risk-grid",children:[e.jsxs("div",{className:"port-risk-item",children:[e.jsx("div",{className:"port-risk-label",children:"Beta"}),e.jsx("div",{className:"port-risk-value num",style:{color:Math.abs(m.beta)>1.2?"var(--color-down)":"var(--color-up)"},children:m.beta.toFixed(2)}),e.jsx("div",{className:"port-risk-sub",children:m.beta>1?"More volatile than market":m.beta<0?"Inverse to market":"Less volatile"})]}),e.jsxs("div",{className:"port-risk-item",children:[e.jsx("div",{className:"port-risk-label",children:"Sharpe Ratio"}),e.jsx("div",{className:"port-risk-value num",style:{color:m.sharpe>=1?"var(--color-up)":m.sharpe>=0?"var(--color-text-primary)":"var(--color-down)"},children:m.sharpe.toFixed(2)}),e.jsx("div",{className:"port-risk-sub",children:m.sharpe>=2?"Excellent":m.sharpe>=1?"Good":m.sharpe>=0?"Acceptable":"Poor"})]}),e.jsxs("div",{className:"port-risk-item",children:[e.jsx("div",{className:"port-risk-label",children:"Alpha"}),e.jsxs("div",{className:"port-risk-value num",style:{color:m.alpha>=0?"var(--color-up)":"var(--color-down)"},children:[m.alpha>=0?"+":"",m.alpha.toFixed(1),"%"]}),e.jsx("div",{className:"port-risk-sub",children:m.alpha>=0?"Outperforming benchmark":"Underperforming"})]}),e.jsxs("div",{className:"port-risk-item",children:[e.jsx("div",{className:"port-risk-label",children:"Max Drawdown"}),e.jsxs("div",{className:"port-risk-value num",style:{color:m.maxDrawdown>20?"var(--color-down)":"var(--color-text-primary)"},children:["-",m.maxDrawdown.toFixed(1),"%"]}),e.jsx("div",{className:"port-risk-sub",children:"Largest peak-to-trough"})]})]})]}),V.length>1&&e.jsxs("div",{className:"port-chart panel",children:[e.jsx("div",{className:"section-label",children:"Investment History"}),e.jsx(P,{width:"100%",height:160,children:e.jsxs(oe,{data:V,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"portGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"5%",stopColor:"var(--color-gold)",stopOpacity:.25}),e.jsx("stop",{offset:"95%",stopColor:"var(--color-gold)",stopOpacity:0})]})}),e.jsx(q,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(O,{dataKey:"date",tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"},interval:"preserveStartEnd"}),e.jsx(H,{tick:{fontSize:10,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:60,orientation:"right",tickFormatter:r=>r.toLocaleString("en-US",{notation:"compact"})}),e.jsx(E,{formatter:r=>[(r??0).toLocaleString("en-US",{minimumFractionDigits:2}),"Value"],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11}}),e.jsx(se,{type:"monotone",dataKey:"value",stroke:"var(--color-gold)",strokeWidth:1.5,fill:"url(#portGrad)",dot:!1,isAnimationActive:!1})]})})]}),b.length>0&&(()=>{const r=["#c9a84c","#4ade80","#60a5fa","#f472b6","#fb923c","#a78bfa","#34d399","#f87171","#38bdf8","#facc15"],t=b.map(a=>({name:a.symbol,value:+a.currentValue.toFixed(2)})).sort((a,s)=>s.value-a.value);return e.jsxs("div",{className:"port-alloc panel",children:[e.jsx("div",{className:"section-label",children:"Allocation"}),e.jsx(P,{width:"100%",height:200,children:e.jsxs(le,{children:[e.jsx(ne,{data:t,dataKey:"value",nameKey:"name",cx:"50%",cy:"50%",innerRadius:55,outerRadius:80,paddingAngle:2,isAnimationActive:!1,children:t.map((a,s)=>e.jsx(G,{fill:r[s%r.length]},s))}),e.jsx(E,{formatter:a=>[(a??0).toLocaleString("en-US",{minimumFractionDigits:2}),"Value"],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11}}),e.jsx(ie,{wrapperStyle:{fontSize:10,fontFamily:"var(--font-mono)"}})]})})]})})(),c.length>1&&(()=>{const r={};for(const a of c){const s=a.date.slice(0,7),x=a.type==="buy"?-(a.shares*a.price):a.shares*a.price;r[s]=(r[s]??0)+x}const t=Object.entries(r).sort(([a],[s])=>a.localeCompare(s)).map(([a,s])=>{const[x,u]=a.split("-");return{label:new Date(+x,+u-1).toLocaleDateString("en-US",{month:"short",year:"2-digit"}),pnl:+s.toFixed(2)}});return t.length<2?null:e.jsxs("div",{className:"port-pnl-chart panel",children:[e.jsx("div",{className:"section-label",children:"Monthly P&L"}),e.jsx(P,{width:"100%",height:120,children:e.jsxs(ce,{data:t,margin:{top:8,right:4,bottom:0,left:0},children:[e.jsx(q,{strokeDasharray:"3 3",stroke:"var(--color-border-subtle)",vertical:!1}),e.jsx(O,{dataKey:"label",tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:{stroke:"var(--color-border-subtle)"}}),e.jsx(H,{tick:{fontSize:9,fill:"var(--color-text-muted)",fontFamily:"var(--font-mono)"},tickLine:!1,axisLine:!1,width:56,orientation:"right",tickFormatter:a=>a.toLocaleString("en-US",{notation:"compact"})}),e.jsx(E,{formatter:a=>[(a??0).toLocaleString("en-US",{minimumFractionDigits:2}),"P&L"],contentStyle:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,fontSize:11}}),e.jsx(de,{dataKey:"pnl",radius:[2,2,0,0],isAnimationActive:!1,children:t.map((a,s)=>e.jsx(G,{fill:a.pnl>=0?"var(--color-up)":"var(--color-down)",fillOpacity:.8},s))})]})})]})})(),e.jsxs("div",{className:"port-tabs",children:[["holdings","transactions"].map(r=>e.jsx("button",{className:`port-tab ${w===r?"active":""}`,onClick:()=>l(r),children:r==="holdings"?`Holdings (${h.length})`:`Transactions (${c.length})`},r)),b.length>0&&e.jsxs("button",{className:"port-tab",title:"Export CSV",onClick:()=>{const r=[["Symbol","Name","Exchange","Shares","Avg Cost","Current Price","Value","P&L","P&L %","Currency"],...b.map(t=>[t.symbol,t.name,t.exchange,t.shares,t.avgCost.toFixed(2),t.currentPrice.toFixed(2),t.currentValue.toFixed(2),t.pnl.toFixed(2),t.pnlPct.toFixed(2),t.currency])];_(r,"portfolio-holdings.csv")},style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx(pe,{size:11})," Export"]})]}),h.length===0&&c.length===0&&e.jsxs("div",{className:"port-empty panel",children:[e.jsx(re,{size:28,style:{opacity:.2,marginBottom:"0.75rem"}}),e.jsx("p",{children:"No transactions yet."}),e.jsx("p",{style:{fontSize:11},children:'Click "Add Transaction" to log your first buy or sell.'})]}),w==="holdings"&&h.length>0&&e.jsxs("div",{className:"panel port-table",children:[e.jsxs("div",{className:"pt-header",children:[e.jsx("span",{children:"Symbol"}),e.jsx("span",{children:"Shares"}),e.jsx("span",{className:"pt-r",children:"Avg Cost"}),e.jsx("span",{className:"pt-r",children:"Current"}),e.jsx("span",{className:"pt-r",children:"Value"}),e.jsx("span",{className:"pt-r",children:"P&L"})]}),b.map(r=>{const t=r.pnl>=0;return e.jsxs("div",{className:"pt-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"pt-symbol",children:r.symbol}),e.jsxs("div",{className:"pt-name",children:[r.name," · ",r.exchange]})]}),e.jsx("span",{className:"num",children:r.shares.toLocaleString("en-US",{maximumFractionDigits:4})}),e.jsx("span",{className:"num pt-r",children:r.avgCost.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:r.currentPrice.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:r.currentValue.toLocaleString("en-US",{minimumFractionDigits:2})}),e.jsxs("span",{className:`num pt-r ${t?"text-up":"text-down"}`,children:[t?"+":"",r.pnl.toFixed(2),e.jsxs("span",{style:{fontSize:10,display:"block"},children:["(",t?"+":"",r.pnlPct.toFixed(2),"%)"]})]})]},r.symbol)})]}),w==="transactions"&&c.length>0&&e.jsxs("div",{className:"panel port-table",children:[e.jsxs("div",{className:"pt-header pt-tx-header",children:[e.jsx("span",{children:"Date"}),e.jsx("span",{children:"Type"}),e.jsx("span",{children:"Symbol"}),e.jsx("span",{className:"pt-r",children:"Shares"}),e.jsx("span",{className:"pt-r",children:"Price"}),e.jsx("span",{className:"pt-r",children:"Total"}),e.jsx("span",{})]}),[...c].reverse().map(r=>e.jsxs("div",{className:"pt-row pt-tx-row",children:[e.jsx("span",{className:"num",style:{fontSize:11},children:r.date}),e.jsx("span",{className:`pt-type-badge ${r.type}`,children:r.type.toUpperCase()}),e.jsxs("div",{children:[e.jsx("div",{className:"pt-symbol",children:r.symbol}),e.jsx("div",{className:"pt-name",children:r.exchange})]}),e.jsx("span",{className:"num pt-r",children:r.shares}),e.jsx("span",{className:"num pt-r",children:r.price.toFixed(2)}),e.jsx("span",{className:"num pt-r",children:(r.shares*r.price).toFixed(2)}),e.jsx("button",{className:"pt-del",onClick:()=>o(r.id),"aria-label":"Delete",children:e.jsx(me,{size:11})})]},r.id))]}),b.length>0&&(()=>{const r=new Map;for(const a of b){const s=a.currency||"USD",x=r.get(s)??{value:0,cost:0,count:0};r.set(s,{value:x.value+a.currentValue,cost:x.cost+a.totalCost,count:x.count+1})}const t=[...r.entries()].sort((a,s)=>s[1].value-a[1].value);return t.length<=1?null:e.jsxs("div",{children:[e.jsx("div",{className:"section-label",style:{padding:0},children:"By Currency"}),e.jsx("div",{className:"port-currency-grid",children:t.map(([a,{value:s,cost:x,count:u}])=>{const g=s-x,j=x>0?g/x*100:0,N=g>=0;return e.jsxs("div",{className:"port-cur-card panel",children:[e.jsxs("div",{className:"port-cur-header",children:[e.jsx("span",{className:"port-cur-code num",children:a}),e.jsxs("span",{className:"port-cur-count",children:[u," holding",u!==1?"s":""]})]}),e.jsx("div",{className:"port-cur-value num",children:s.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}),e.jsxs("div",{className:`port-cur-pnl num ${N?"text-up":"text-down"}`,children:[N?"+":"",g.toFixed(2)," (",N?"+":"",j.toFixed(2),"%)"]})]},a)})})]})})(),p&&e.jsx(ge,{onClose:()=>k(!1),onAdd:v}),e.jsx("style",{children:`
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

        .port-risk { padding: 0.75rem 1rem 1rem; }
        .port-risk-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-top: 0.5rem; }
        @media (max-width: 700px) { .port-risk-grid { grid-template-columns: repeat(2, 1fr); } }
        .port-risk-item { }
        .port-risk-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); font-weight: 600; margin-bottom: 3px; }
        .port-risk-value { font-size: 20px; font-weight: 800; }
        .port-risk-sub { font-size: 10px; color: var(--color-text-muted); margin-top: 2px; }

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
      `})]})}export{Ce as default};
