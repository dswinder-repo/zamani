import{r as u,j as e,L as V,l as K,e as B}from"./vendor-9MAh3nQh.js";import{c as L,d as X,e as Z,f as _,E as W,X as Q,Y,p as j}from"./index-CXUK-kK_.js";import{d as J}from"./csvExport-JVihQZGh.js";import{N as q,I as ee,T as ne}from"./NdebelePanel-C_YHhQqb.js";import{c as re}from"./store-DR-NtvzW.js";import{D as se}from"./download-CqZH3SV4.js";import"./Sparkline-Sa5-OsUq.js";const ae=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}],["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}]],te=L("bookmark-check",ae);const oe=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}]],ce=L("bookmark",oe),ie="https://use.or.ug/api/delayed-data",le={"AIRTEL UGANDA":"Airtel Uganda",BATU:"BAT Uganda",BOBU:"Bank of Baroda Uganda",CENT:"Centum Investment",DFCU:"dfcu Limited",EABL:"East African Breweries",EBL:"Equity Bank Uganda",JHL:"Jubilee Holdings",KA:"Kenya Airways",KCB:"KCB Group",MTNU:"MTN Uganda",NIC:"National Insurance Corp",NMG:"Nation Media Group",NVL:"New Vision Group",QCIL:"Quality Chemical Industries",SBU:"Stanbic Uganda Holdings",UCL:"Uganda Clays",UMEM:"Umeme Limited"},de={"AIRTEL UGANDA":222,BATU:820,BOBU:395,CENT:380,DFCU:790,EABL:1600,EBL:380,JHL:420,KA:6,KCB:420,MTNU:185,NIC:16,NMG:180,NVL:58,QCIL:7800,SBU:540,UCL:30,UMEM:265};async function M(){const n=await fetch(ie,{mode:"cors"});if(!n.ok)throw new Error(`USE API ${n.status}`);return n.json()}const P="zamani_use_prev";function U(){try{const n=localStorage.getItem(P);if(!n)return{};const r=JSON.parse(n),c=new Date().toISOString().slice(0,10);return r.date!==c?r.prices??{}:{}}catch{return{}}}function ge(n){try{const r=new Date().toISOString().slice(0,10);localStorage.setItem(P,JSON.stringify({date:r,prices:n}))}catch{}}function me(){return Object.entries(de).map(([n,r])=>({type:"EQUITY",stock:n,price:r,market_cap:0,volume:0,deals:0}))}async function R(){let n;try{n=await M()}catch(s){console.warn("[USE] API unreachable — using fallback prices:",s),n=me()}const r=U(),c=n.filter(s=>s.type==="EQUITY"),t={};for(const s of c)t[s.stock]=s.price;return ge(t),c.map(s=>{const l=s.price,i=r[s.stock]??l,d=+(l-i).toFixed(2),g=i?+(d/i*100).toFixed(2):0;return{symbol:s.stock,name:le[s.stock]??s.stock,price:l,change:d,changePct:g,volume:s.volume,currency:"UGX",exchange:"USE",timestamp:Date.now()}})}async function xe(){let n;try{n=await M()}catch{n=[]}const r=n.filter(t=>t.type==="INDEX"),c=U();return r.length?r.map(t=>{const s=t.price,l=c[t.stock]??s,i=+(s-l).toFixed(2),d=l?+(i/l*100).toFixed(2):0;return{id:`use-${t.stock.toLowerCase().replace(/\s+/g,"-")}`,name:t.stock==="LCI"?"USE Local Company Index":`USE ${t.stock}`,exchange:"USE",value:s,change:i,changePct:d,currency:"UGX",sparkline:[],timestamp:Date.now()}}):[{id:"use-lci",name:"USE LCI",exchange:"USE",value:0,change:0,changePct:0,currency:"UGX",sparkline:[],timestamp:Date.now()}]}async function ue(){const r=[...await R()].sort((s,l)=>l.changePct-s.changePct),c=r.filter(s=>s.changePct>0).slice(0,5).map(s=>({symbol:s.symbol,name:s.name,exchange:"USE",price:s.price,changePct:s.changePct})),t=r.filter(s=>s.changePct<0).slice(-5).reverse().map(s=>({symbol:s.symbol,name:s.name,exchange:"USE",price:s.price,changePct:s.changePct}));return{gainers:c,losers:t}}function pe(n){const r=u.useRef(n),[c,t]=u.useState("");return u.useEffect(()=>{if(r.current===n)return;t(n>r.current?"flash-up":"flash-down"),r.current=n;const s=setTimeout(()=>t(""),800);return()=>clearTimeout(s)},[n]),c}function he({pct:n}){const r=n>=0;return e.jsxs("span",{className:`num stock-chg ${r?"text-up":"text-down"}`,style:{display:"inline-block",minWidth:52,textAlign:"right",padding:"1px 5px",borderRadius:3,background:r?"var(--color-up-subtle)":"var(--color-down-subtle)"},children:[r?"+":"",n.toFixed(2),"%"]})}function be({q:n,exchangeId:r}){const c=pe(n.price);return e.jsxs(V,{to:`/exchange/${r}/stock/${encodeURIComponent(n.symbol)}`,className:`st-row ${c}`,children:[e.jsx("span",{className:"st-symbol num",children:n.symbol.replace(`.${r.toUpperCase()}`,"")}),e.jsx("span",{className:"st-name",children:n.name}),e.jsxs("span",{className:"st-price num st-align-r",children:[n.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsx("span",{style:{fontSize:9,color:"var(--color-text-muted)",marginLeft:3},children:n.currency})]}),e.jsx("span",{className:"st-align-r",children:e.jsx(he,{pct:n.changePct})}),e.jsx("span",{className:"st-vol num st-align-r",children:n.volume?(n.volume/1e3).toFixed(0)+"K":"—"})]})}function ve({exchangeId:n,quotes:r,isLoading:c,activeSector:t}){const[s,l]=u.useState(""),i=u.useMemo(()=>r.filter(g=>!s||g.symbol.toLowerCase().includes(s.toLowerCase())||g.name.toLowerCase().includes(s.toLowerCase())),[r,s]),d=i.length;return e.jsxs("div",{className:"stocks-table-wrap panel",children:[e.jsxs("div",{className:"st-search-row",children:[e.jsx(X,{size:12}),e.jsx("input",{className:"st-search",placeholder:"Search symbols or names…",value:s,onChange:g=>l(g.target.value)}),e.jsxs("span",{className:"st-count",children:[d," ",t?`(${t})`:"securities"]})]}),e.jsxs("div",{className:"st-header",children:[e.jsx("span",{children:"Symbol"}),e.jsx("span",{children:"Name"}),e.jsx("span",{className:"st-align-r",children:"Price"}),e.jsx("span",{className:"st-align-r",children:"Change"}),e.jsx("span",{className:"st-align-r",children:"Volume"})]}),c?e.jsx("div",{className:"st-empty",children:"Loading…"}):i.length===0?e.jsx("div",{className:"st-empty",children:s?`No results for "${s}"`:"No securities in this sector"}):i.map(g=>e.jsx(be,{q:g,exchangeId:n},g.symbol)),e.jsx("style",{children:`
        .stocks-table-wrap { overflow: hidden; }

        .st-search-row {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
          color: var(--color-text-muted);
        }
        .st-search {
          flex: 1; background: none; border: none; outline: none;
          font-family: var(--font-sans); font-size: 12px;
          color: var(--color-text-primary);
        }
        .st-search::placeholder { color: var(--color-text-muted); }
        .st-count { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); white-space: nowrap; }

        .st-header {
          display: grid; grid-template-columns: 80px 1fr 90px 80px 70px;
          gap: 0.5rem; padding: 0.25rem 0.75rem;
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600;
          border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-tertiary);
        }
        .st-row {
          display: grid; grid-template-columns: 80px 1fr 90px 80px 70px;
          gap: 0.5rem; padding: 0.375rem 0.75rem;
          align-items: center;
          border-bottom: 1px solid var(--color-border-subtle);
          text-decoration: none;
          transition: background 0.1s;
          cursor: pointer;
        }
        .st-row:last-child { border-bottom: none; }
        .st-row:hover { background: color-mix(in srgb, var(--color-gold) 8%, var(--color-bg-tertiary)); }

        .st-symbol { font-size: 12px; font-weight: 700; color: var(--color-gold); }
        .st-name   { font-size: 11px; color: var(--color-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .st-price  { font-size: 12px; color: var(--color-text-primary); }
        .st-vol    { font-size: 11px; color: var(--color-text-muted); }
        .st-align-r { text-align: right; }

        .st-empty {
          padding: 2rem; text-align: center;
          font-size: 12px; color: var(--color-text-muted);
        }

        @media (max-width: 500px) {
          .st-header, .st-row { grid-template-columns: 70px 1fr 80px 70px; }
          .st-header span:last-child, .st-row span:last-child { display: none; }
        }
      `})]})}const fe={"jse:SBK":"Banking","jse:FSR":"Banking","jse:CPI":"Banking","jse:ABG":"Banking","jse:NED":"Banking","jse:INL":"Banking","jse:SLM":"Insurance","jse:MMH":"Insurance","jse:DSY":"Insurance","jse:OMU":"Insurance","jse:SNT":"Insurance","jse:JSE":"Financial Services","jse:NPN":"Technology","jse:PRX":"Technology","jse:MTN":"Telecoms","jse:VOD":"Telecoms","jse:TKG":"Telecoms","jse:AGL":"Mining","jse:BHP":"Mining","jse:AMS":"Mining","jse:IMP":"Mining","jse:SSW":"Mining","jse:GFI":"Mining","jse:HAR":"Mining","jse:SOL":"Energy","jse:SHP":"Consumer","jse:WHL":"Consumer","jse:PIK":"Consumer","jse:MRP":"Consumer","jse:TFG":"Consumer","jse:CLS":"Consumer","jse:PPH":"Consumer","jse:AVI":"Consumer","jse:BID":"Industrial","jse:REM":"Industrial","jse:MNP":"Industrial","jse:BAW":"Industrial","jse:LHC":"Healthcare","jse:GRT":"Property","jse:RDF":"Property","ngx:GTCO":"Banking","ngx:ZENITH":"Banking","ngx:ACCESS":"Banking","ngx:UBA":"Banking","ngx:FBNH":"Banking","ngx:STANBIC":"Banking","ngx:FIDELITY":"Banking","ngx:FCMB":"Banking","ngx:WEMA":"Banking","ngx:STERLING":"Banking","ngx:STERLNB":"Banking","ngx:MTNN":"Telecoms","ngx:AIRTELAFRI":"Telecoms","ngx:SEPLAT":"Energy","ngx:TOTAL":"Energy","ngx:CONOIL":"Energy","ngx:DANGCEM":"Industrial","ngx:BUACEMENT":"Industrial","ngx:WAPCO":"Industrial","ngx:JBERGER":"Industrial","ngx:NESTLE":"Consumer","ngx:NB":"Consumer","ngx:GUINNESS":"Consumer","ngx:BUAFOODS":"Consumer","ngx:FLOURMILL":"Consumer","ngx:DANGSUGAR":"Consumer","ngx:CADBURY":"Consumer","ngx:UNILEVER":"Consumer","ngx:VITAFOAM":"Consumer","ngx:INTBREW":"Consumer","ngx:PRESCO":"Agriculture","ngx:OKOMUOIL":"Agriculture","ngx:AIICO":"Insurance","ngx:MANSARD":"Insurance","ngx:CUSTODIAN":"Insurance","ngx:UCAP":"Financial Services","ngx:AFRIPRUD":"Financial Services","ngx:TRANSCORP":"Conglomerate","ngx:FIDSON":"Healthcare","nse:SCOM":"Telecoms","nse:EQTY":"Banking","nse:KCB":"Banking","nse:COOP":"Banking","nse:NCBA":"Banking","nse:DTK":"Banking","nse:ABSA":"Banking","nse:SBIC":"Banking","nse:SCBK":"Banking","nse:IMB":"Banking","nse:HF":"Banking","nse:NBK":"Banking","nse:BRIT":"Insurance","nse:JUB":"Insurance","nse:CIC":"Insurance","nse:SLAM":"Insurance","nse:LIB":"Insurance","nse:KNRE":"Insurance","nse:CTUM":"Financial Services","nse:NSE":"Financial Services","nse:KPLC":"Energy","nse:KEGN":"Energy","nse:TOTL":"Energy","nse:EABL":"Consumer","nse:BAT":"Consumer","nse:UNGA":"Consumer","nse:BOC":"Industrial","nse:CARB":"Industrial","nse:CGEN":"Industrial","nse:BAMB":"Industrial","nse:EAPC":"Industrial","nse:ARM":"Industrial","nse:KQ":"Transport","nse:SASN":"Agriculture","nse:WTK":"Agriculture","nse:KAPC":"Agriculture","nse:KUKUZI":"Agriculture","nse:LIMTEA":"Agriculture","nse:NMG":"Media","nse:SGL":"Media","nse:LHBL":"Media","nse:SCAN":"Media","nse:ILAM":"Property","nse:TPS":"Hospitality","gse:GCB":"Banking","gse:EGH":"Banking","gse:SCB":"Banking","gse:CAL":"Banking","gse:SOGEGH":"Banking","gse:ACCESS":"Banking","gse:RBGH":"Banking","gse:MTN":"Telecoms","gse:GGBL":"Consumer","gse:FML":"Consumer","gse:UNIL":"Consumer","gse:GOIL":"Energy","gse:TOTAL":"Energy","gse:BOPP":"Agriculture","gse:EGL":"Insurance","gse:AYRTN":"Healthcare","brvm:SNTS":"Telecoms","brvm:ORAC":"Telecoms","brvm:ONTBF":"Telecoms","brvm:ETIT":"Banking","brvm:SGBCI":"Banking","brvm:BICC":"Banking","brvm:NSBC":"Banking","brvm:BOABF":"Banking","brvm:BOAM":"Banking","brvm:BOAS":"Banking","brvm:PALC":"Agriculture","brvm:SIFCA":"Agriculture","brvm:SOLIBRA":"Consumer","brvm:UNXC":"Consumer","brvm:TTLCI":"Energy","brvm:CFACI":"Industrial","brvm:SMBC":"Industrial","zse:DELTA":"Consumer","zse:INNSCOR":"Consumer","zse:OK":"Consumer","zse:HIPPO":"Agriculture","zse:SEEDCO":"Agriculture","zse:PADENGA":"Agriculture","zse:ECONET":"Telecoms","zse:CBZ":"Banking","zse:FBC":"Banking","zse:ZB":"Banking","zse:NMB":"Banking","zse:FIRST":"Banking","zse:FMLRE":"Insurance","zse:NICOZ":"Insurance","zse:ZIMRE":"Insurance","zse:FIDELITY":"Insurance","zse:TSL":"Industrial","zse:ART":"Industrial","zse:MASIMBA":"Industrial","zse:TURNALL":"Industrial","zse:AFRICAN":"Hospitality","zse:RTG":"Hospitality","bse:FNBB":"Banking","bse:STANBIC":"Banking","bse:ABSA":"Banking","bse:ABCH":"Banking","bse:BIHL":"Insurance","bse:LETSHEGO":"Financial Services","bse:IMARA":"Financial Services","bse:OLYMPIA":"Financial Services","bse:SEFALANA":"Consumer","bse:SB":"Consumer","bse:CHOPPIES":"Consumer","bse:BTCL":"Telecoms","bse:ENGEN":"Energy","bse:CHOBE":"Hospitality","bse:WILDERNESS":"Hospitality","bse:CRESTA":"Hospitality","bse:TURNSTAR":"Property","bse:TLOU":"Energy","use:SBU":"Banking","use:DFCU":"Banking","use:BOBU":"Banking","use:EBL":"Banking","use:KCB":"Banking","use:NIC":"Insurance","use:JHL":"Insurance","use:MTNU":"Telecoms","use:AIRTEL UGANDA":"Telecoms","use:EABL":"Consumer","use:BATU":"Consumer","use:NMG":"Media","use:NVL":"Media","use:UMEM":"Energy","use:QCIL":"Healthcare","use:UCL":"Industrial","use:CENT":"Financial Services","use:KA":"Transport","luse:ZCCM":"Mining","luse:CEC":"Energy","luse:ZANACO":"Banking","luse:STANDARD":"Banking","luse:INVESTRUST":"Banking","luse:MADISON":"Insurance","luse:PRIMA":"Insurance","luse:ZAMBEEF":"Consumer","luse:ZSUG":"Agriculture","luse:NATBREW":"Consumer","luse:BATA":"Consumer","luse:LAFARGE":"Industrial","luse:REIZ":"Property","luse:PAMODZI":"Hospitality"};function S(n,r){return fe[`${n.toLowerCase()}:${r.toUpperCase()}`]??"Other"}const O=["Banking","Insurance","Financial Services","Telecoms","Technology","Mining","Energy","Consumer","Industrial","Agriculture","Healthcare","Media","Property","Hospitality","Transport","Conglomerate","Other"];function ye({exchangeId:n,quotes:r,activeSector:c,onSectorClick:t}){const s=u.useMemo(()=>{const i=new Map;for(const d of r){const g=S(n,d.symbol),x=i.get(g)??{total:0,count:0};i.set(g,{total:x.total+d.changePct,count:x.count+1})}return O.filter(d=>i.has(d)).map(d=>{const{total:g,count:x}=i.get(d),p=g/x;return{sector:d,avg:p,count:x}})},[r,n]);if(s.length===0)return null;const l=Math.max(...s.map(i=>Math.abs(i.avg)),1);return e.jsxs("div",{children:[e.jsx("div",{className:"section-label",children:"Sector Performance"}),e.jsx("div",{className:"hm-grid",children:s.map(({sector:i,avg:d,count:g})=>{const x=Math.min(Math.abs(d)/l,1),p=d>=0,v=p?`rgba(74,222,128,${.05+x*.2})`:`rgba(248,113,113,${.05+x*.2})`,b=p?`rgba(74,222,128,${.18+x*.4})`:`rgba(248,113,113,${.18+x*.4})`,f=c===i;return e.jsxs("button",{className:`hm-cell ${f?"hm-cell--active":""}`,style:{background:v,borderColor:f?p?"var(--color-up)":"var(--color-down)":b},onClick:()=>t?.(f?null:i),title:`${i}: avg ${p?"+":""}${d.toFixed(2)}% across ${g} stock${g!==1?"s":""}`,children:[e.jsx("span",{className:"hm-name",children:i}),e.jsxs("span",{className:`hm-pct num ${p?"text-up":"text-down"}`,children:[p?"+":"",d.toFixed(2),"%"]}),e.jsx("span",{className:"hm-count num",children:g})]},i)})}),e.jsx("style",{children:`
        .hm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 5px;
        }
        .hm-cell {
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 0.5rem 0.625rem; border-radius: 4px;
          border: 1px solid transparent;
          background: transparent; cursor: pointer; text-align: left;
          transition: filter 0.15s, transform 0.12s;
          outline: none;
        }
        .hm-cell:hover { filter: brightness(1.25); transform: translateY(-1px); }
        .hm-cell--active { box-shadow: 0 0 0 2px currentColor; }
        .hm-name  { font-size: 10px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
        .hm-pct   { font-size: 13px; font-weight: 800; }
        .hm-count { font-size: 9px; color: var(--color-text-muted); margin-top: 2px; }
      `})]})}const Ne=re()(Z(n=>({presets:[],savePreset(r){const c={...r,id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,createdAt:Date.now()};n(t=>({presets:[...t.presets,c]}))},deletePreset(r){n(c=>({presets:c.presets.filter(t=>t.id!==r)}))}}),{name:"zamani-screener-presets"})),Ce={jse:{name:"Johannesburg Stock Exchange",country:"South Africa",flag:"🇿🇦",currency:"ZAR",accentVar:"--color-jse",founded:"1887",mic:"XJSE"},ngx:{name:"Nigerian Exchange Group",country:"Nigeria",flag:"🇳🇬",currency:"NGN",accentVar:"--color-ngx",founded:"1960",mic:"XLAG"},nse:{name:"Nairobi Securities Exchange",country:"Kenya",flag:"🇰🇪",currency:"KES",accentVar:"--color-nse",founded:"1954",mic:"XNAI"},gse:{name:"Ghana Stock Exchange",country:"Ghana",flag:"🇬🇭",currency:"GHS",accentVar:"--color-gse",founded:"1989",mic:"XGHA"},brvm:{name:"Bourse Régionale UEMOA",country:"West Africa",flag:"🇨🇮",currency:"XOF",accentVar:"--color-brvm",founded:"1998",mic:"XBRV"},zse:{name:"Zimbabwe Stock Exchange",country:"Zimbabwe",flag:"🇿🇼",currency:"USD",accentVar:"--color-zse",founded:"1896",mic:"XZIM"},bse:{name:"Botswana Stock Exchange",country:"Botswana",flag:"🇧🇼",currency:"BWP",accentVar:"--color-bse",founded:"1989",mic:"XBOT"},luse:{name:"Lusaka Securities Exchange",country:"Zambia",flag:"🇿🇲",currency:"ZMW",accentVar:"--color-luse",founded:"1994",mic:"XLUS"},use:{name:"Uganda Securities Exchange",country:"Uganda",flag:"🇺🇬",currency:"UGX",accentVar:"--color-use",founded:"1997",mic:"XUGA"}};function Le(){const{id:n=""}=K(),r=Ce[n],c=_(n),[t,s]=u.useState(null),[l,i]=u.useState("all"),{presets:d,savePreset:g,deletePreset:x}=Ne(),p=d.filter(a=>a.exchange===n),v=n==="use",b=Y.includes(n),{data:f,isLoading:F}=B({queryKey:["indices",n],queryFn:v?()=>xe():()=>j.getIndices?.(n)??Promise.resolve([]),staleTime:6e4,refetchInterval:6e4}),{data:A,isLoading:z}=B({queryKey:["movers",n],queryFn:v?()=>ue():()=>j.getTopMovers?.(n)??Promise.resolve({gainers:[],losers:[]}),staleTime:6e4,refetchInterval:6e4}),{data:m,isLoading:y}=B({queryKey:["stocks",n],queryFn:v?()=>R():()=>j.getExchangeStocks?.(n)??Promise.resolve([]),staleTime:6e4,refetchInterval:6e4}),I=u.useMemo(()=>{if(!m?.length)return[];const a=new Set(m.map(o=>S(n,o.symbol)));return O.filter(o=>a.has(o))},[m,n]),N=u.useMemo(()=>{let a=m??[];return t&&(a=a.filter(o=>S(n,o.symbol)===t)),l==="gainers"&&(a=a.filter(o=>o.changePct>0)),l==="losers"&&(a=a.filter(o=>o.changePct<0)),l==="active"&&(a=[...a].sort((o,C)=>(C.volume??0)-(o.volume??0)).slice(0,15)),a},[m,t,l,n]),E=u.useMemo(()=>m?.length?[...m].filter(a=>Math.abs(a.changePct)>=2).sort((a,o)=>Math.abs(o.changePct)-Math.abs(a.changePct)).slice(0,12):[],[m]),w=u.useMemo(()=>{if(!m?.length)return null;const a=m.filter(h=>h.changePct>0).length,o=m.filter(h=>h.changePct<0).length,C=m.length-a-o,D=m.filter(h=>h.changePct>0).reduce((h,k)=>h+(k.volume??0),0),H=m.filter(h=>h.changePct<0).reduce((h,k)=>h+(k.volume??0),0);return{advancing:a,declining:o,unchanged:C,upVol:D,downVol:H,total:m.length}},[m]);if(!r)return e.jsx("div",{style:{padding:"2rem",color:"var(--color-text-muted)"},children:"Exchange not found."});const T=(f??[]).filter(a=>a.exchange.toLowerCase()===n),G={"--color-gold":`var(${r.accentVar})`,"--color-gold-dim":`color-mix(in srgb, var(${r.accentVar}) 55%, #000)`,"--color-gold-bright":`color-mix(in srgb, var(${r.accentVar}) 140%, #fff)`,"--color-gold-subtle":`color-mix(in srgb, var(${r.accentVar}) 10%, transparent)`};function $(){if(!t)return;const a=`${n.toUpperCase()} — ${t}`;g({name:a,exchange:n,sectors:[t]})}return e.jsxs("div",{className:"exchange-page",style:G,children:[e.jsxs("div",{className:"ex-header panel",style:{borderLeftColor:`var(${r.accentVar})`},children:[e.jsxs("div",{className:"ex-header-left",children:[e.jsx("span",{className:"ex-flag",children:r.flag}),e.jsxs("div",{children:[e.jsxs("div",{className:"ex-title-row",children:[e.jsx("h1",{className:"ex-name",children:r.name}),e.jsx(W,{id:n})]}),e.jsxs("p",{className:"ex-meta",children:[r.country,r.mic&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-sep",children:"·"}),e.jsx("span",{children:r.mic})]}),r.founded&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-sep",children:"·"}),e.jsxs("span",{children:["Est. ",r.founded]})]}),e.jsx("span",{className:"ex-sep",children:"·"}),e.jsxs("span",{className:"num",children:[c," local"]})]})]})]}),e.jsx(q,{width:80,height:80,color:`var(${r.accentVar})`,opacity:.08,style:{position:"absolute",right:0,top:0}})]}),e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Indices"}),F?e.jsx("p",{className:"ex-loading",children:"Loading…"}):T.length>0?e.jsx("div",{className:"idx-strip",children:T.map(a=>e.jsx(ee,{index:a},a.id))}):e.jsx("p",{className:"ex-loading",children:b?`No index data available for ${r.name}.`:"Live index data for this exchange is not yet connected."})]}),b&&(m??[]).length>0&&e.jsx("section",{children:e.jsx(ye,{exchangeId:n,quotes:m??[],activeSector:t,onSectorClick:s})}),b&&I.length>0&&e.jsxs("div",{className:"ex-sector-filters",children:[e.jsx("button",{className:`ex-sector-btn ${t?"":"active"}`,onClick:()=>s(null),children:"All"}),I.map(a=>e.jsx("button",{className:`ex-sector-btn ${t===a?"active":""}`,onClick:()=>s(o=>o===a?null:a),children:a},a)),t&&e.jsxs("button",{className:"ex-save-preset-btn",onClick:$,title:`Save "${t}" filter as preset`,children:[e.jsx(ce,{size:11})," Save filter"]}),p.length>0&&e.jsx("div",{className:"ex-presets",children:p.map(a=>e.jsxs("span",{className:`ex-preset-chip ${t===a.sectors[0]?"active":""}`,onClick:()=>s(o=>o===a.sectors[0]?null:a.sectors[0]),children:[e.jsx(te,{size:9}),a.name.split("—")[1]?.trim()??a.name,e.jsx("button",{className:"ex-preset-del",onClick:o=>{o.stopPropagation(),x(a.id)},"aria-label":"Remove preset",children:e.jsx(Q,{size:8})})]},a.id))})]}),b&&E.length>0&&!y&&e.jsxs("div",{className:"ex-moving-wrap",children:[e.jsx("span",{className:"ex-moving-label",children:"Moving"}),e.jsx("div",{className:"ex-moving-strip",children:E.map(a=>{const o=a.changePct>=0;return e.jsxs("span",{className:`ex-moving-chip ${o?"up":"down"}`,children:[e.jsx("span",{className:"ex-moving-sym",children:a.symbol}),e.jsxs("span",{className:"ex-moving-pct",children:[o?"+":"",a.changePct.toFixed(2),"%"]})]},a.symbol)})})]}),b&&w&&!y&&e.jsx(ke,{breadth:w}),b?e.jsxs("div",{className:"ex-cols",children:[e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Top Movers"}),z?e.jsx("p",{className:"ex-loading",children:"Loading…"}):e.jsx(ne,{gainers:A?.gainers??[],losers:A?.losers??[]})]}),e.jsxs("section",{className:"ex-stocks-col",children:[e.jsxs("div",{className:"ex-stocks-header",children:[e.jsx("div",{className:"section-label",children:t?`${t} Securities`:"All Securities"}),e.jsxs("div",{className:"ex-screener-tabs",children:[["all","gainers","losers","active"].map(a=>e.jsx("button",{className:`ex-screener-tab ${l===a?"active":""}`,onClick:()=>i(a),children:a==="active"?"Most Active":a.charAt(0).toUpperCase()+a.slice(1)},a)),N.length>0&&e.jsx("button",{className:"ex-screener-tab",title:"Export CSV",onClick:()=>{const a=[["Symbol","Name","Price","Change","Change %","Volume","Currency"],...N.map(o=>[o.symbol,o.name,o.price,o.change,o.changePct,o.volume??"",o.currency])];J(a,`${n.toUpperCase()}-stocks.csv`)},children:e.jsx(se,{size:10})})]})]}),e.jsx(ve,{exchangeId:n,quotes:N,isLoading:y,activeSector:t})]})]}):e.jsx(Be,{name:r.name,accentVar:r.accentVar}),e.jsx("style",{children:`
        .exchange-page { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1200px; }

        /* A 2px flag-colour gradient line runs across the very top of the header */
        .ex-header::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--color-gold);
          opacity: 0.8;
        }

        .ex-header {
          padding: 1rem 1.25rem; position: relative; overflow: hidden;
          border-left: 3px solid transparent;
          background: color-mix(in srgb, var(--color-gold) 4%, var(--color-bg-secondary));
        }
        .ex-header-left { display: flex; align-items: center; gap: 1rem; }
        .ex-flag   { font-size: 32px; line-height: 1; flex-shrink: 0; }
        .ex-title-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; }
        .ex-name   { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .ex-meta {
          margin: 0; font-size: 11px; color: var(--color-text-muted);
          display: flex; align-items: center; gap: 0.25rem; flex-wrap: wrap;
        }
        .ex-sep { opacity: 0.4; }

        .idx-strip { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .idx-strip > * { min-width: 160px; }

        .ex-loading { font-size: 12px; color: var(--color-text-muted); margin: 0; }

        /* Section labels on exchange pages get a country-colour left tick */
        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
          display: flex; align-items: center; gap: 0.375rem;
        }
        .section-label::before {
          content: '';
          display: inline-block; width: 2px; height: 10px;
          background: var(--color-gold); border-radius: 1px; flex-shrink: 0;
        }

        /* Sector filter tabs */
        .ex-sector-filters {
          display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
        }
        .ex-sector-btn {
          padding: 3px 9px; border-radius: 12px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-border); background: none;
          color: var(--color-text-muted); cursor: pointer; transition: all 0.1s;
          white-space: nowrap;
        }
        .ex-sector-btn:hover  { color: var(--color-text-primary); border-color: var(--color-text-muted); }
        .ex-sector-btn.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        .ex-save-preset-btn {
          display: flex; align-items: center; gap: 4px;
          padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-gold-dim); color: var(--color-gold);
          background: var(--color-gold-subtle); cursor: pointer;
          margin-left: 4px; transition: all 0.1s;
        }
        .ex-save-preset-btn:hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        .ex-presets {
          display: flex; align-items: center; gap: 4px;
          border-left: 1px solid var(--color-border-subtle); padding-left: 8px; margin-left: 4px;
        }
        .ex-preset-chip {
          display: inline-flex; align-items: center; gap: 3px;
          padding: 2px 6px; border-radius: 10px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-border); color: var(--color-text-muted);
          background: var(--color-bg-elevated); cursor: pointer; transition: all 0.1s;
        }
        .ex-preset-chip:hover, .ex-preset-chip.active {
          color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle);
        }
        .ex-preset-del {
          background: none; border: none; cursor: pointer; color: inherit;
          display: flex; align-items: center; padding: 0; margin-left: 1px;
          opacity: 0.6; transition: opacity 0.1s;
        }
        .ex-preset-del:hover { opacity: 1; }

        /* What's Moving banner */
        .ex-moving-wrap {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.375rem 0.75rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px; overflow: hidden;
        }
        .ex-moving-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          font-weight: 700; color: var(--color-text-muted);
          white-space: nowrap; flex-shrink: 0;
        }
        .ex-moving-strip {
          display: flex; gap: 0.375rem; overflow-x: auto;
          scrollbar-width: none; -ms-overflow-style: none;
        }
        .ex-moving-strip::-webkit-scrollbar { display: none; }
        .ex-moving-chip {
          display: inline-flex; align-items: center; gap: 0.25rem;
          padding: 2px 6px; border-radius: 3px;
          font-family: var(--font-mono); font-size: 10px; white-space: nowrap;
          flex-shrink: 0;
        }
        .ex-moving-chip.up   { background: var(--color-up-subtle);   border: 1px solid rgba(74,222,128,0.2); }
        .ex-moving-chip.down { background: var(--color-down-subtle); border: 1px solid rgba(248,113,113,0.2); }
        .ex-moving-sym  { font-weight: 700; color: var(--color-text-primary); }
        .ex-moving-pct.up, .ex-moving-chip.up .ex-moving-pct   { color: var(--color-up); }
        .ex-moving-chip.up .ex-moving-pct   { color: var(--color-up); }
        .ex-moving-chip.down .ex-moving-pct { color: var(--color-down); }

        /* Market breadth */
        .ex-breadth {
          display: flex; align-items: center; gap: 1rem;
          padding: 0.625rem 0.875rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px; flex-wrap: wrap;
        }
        .ex-breadth-stat {
          display: flex; align-items: center; gap: 0.375rem;
          font-size: 11px; font-family: var(--font-mono);
        }
        .ex-breadth-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
        }
        .ex-breadth-bar-wrap {
          flex: 1; min-width: 120px;
          height: 6px; background: var(--color-bg-tertiary);
          border-radius: 3px; overflow: hidden; display: flex;
        }
        .ex-breadth-seg { height: 100%; transition: width 0.3s; }
        .ex-breadth-label {
          font-size: 10px; color: var(--color-text-muted);
          letter-spacing: 0.04em; text-transform: uppercase; font-weight: 600;
        }

        /* Screener tabs */
        .ex-stocks-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;
        }
        .ex-stocks-header .section-label { margin-bottom: 0; }
        .ex-screener-tabs { display: flex; gap: 2px; }
        .ex-screener-tab {
          padding: 2px 8px; font-size: 10px; font-weight: 600;
          border: 1px solid transparent; border-radius: 3px;
          background: none; color: var(--color-text-muted); cursor: pointer;
          transition: all 0.1s;
        }
        .ex-screener-tab:hover  { color: var(--color-text-secondary); border-color: var(--color-border); }
        .ex-screener-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        .ex-cols {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        .ex-stocks-col { min-width: 0; }

        @media (max-width: 900px) {
          .ex-cols { grid-template-columns: 1fr; gap: 1rem; }
          .exchange-page { gap: 1rem; }
          .ex-name { font-size: 15px; }
          .ex-flag { font-size: 24px; }
        }

        @media (max-width: 560px) {
          .ex-sector-filters { gap: 3px; }
          .ex-sector-btn { padding: 2px 7px; font-size: 9px; }
          .hm-grid { grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); }
        }

        /* Unavailable exchange panel */
        .ex-unavailable {
          padding: 2rem 1.5rem;
          text-align: center;
          border: 1px dashed var(--color-border);
          background: var(--color-bg-secondary);
        }
        .ex-unavail-title {
          font-size: 14px; font-weight: 600;
          color: var(--color-text-secondary); margin: 0 0 0.5rem;
        }
        .ex-unavail-body {
          font-size: 12px; color: var(--color-text-muted); margin: 0;
          max-width: 420px; margin: 0 auto; line-height: 1.6;
        }
      `})]})}function ke({breadth:n}){const r=n.advancing/n.total*100,c=n.declining/n.total*100,t=100-r-c,s=n.upVol+n.downVol,l=s?n.upVol/s*100:50;return e.jsxs("div",{className:"ex-breadth",children:[e.jsx("span",{className:"ex-breadth-label",children:"Breadth"}),e.jsxs("div",{className:"ex-breadth-stat",children:[e.jsx("span",{className:"ex-breadth-dot",style:{background:"var(--color-up)"}}),e.jsx("span",{style:{color:"var(--color-up)"},children:n.advancing}),e.jsx("span",{style:{color:"var(--color-text-muted)"},children:"adv"})]}),e.jsxs("div",{className:"ex-breadth-stat",children:[e.jsx("span",{className:"ex-breadth-dot",style:{background:"var(--color-down)"}}),e.jsx("span",{style:{color:"var(--color-down)"},children:n.declining}),e.jsx("span",{style:{color:"var(--color-text-muted)"},children:"dec"})]}),n.unchanged>0&&e.jsxs("div",{className:"ex-breadth-stat",children:[e.jsx("span",{className:"ex-breadth-dot",style:{background:"var(--color-text-muted)"}}),e.jsxs("span",{style:{color:"var(--color-text-muted)"},children:[n.unchanged," unch"]})]}),e.jsxs("div",{className:"ex-breadth-bar-wrap",title:`${r.toFixed(0)}% advancing`,children:[e.jsx("div",{className:"ex-breadth-seg",style:{width:`${r}%`,background:"var(--color-up)",opacity:.7}}),e.jsx("div",{className:"ex-breadth-seg",style:{width:`${t}%`,background:"var(--color-border)"}}),e.jsx("div",{className:"ex-breadth-seg",style:{width:`${c}%`,background:"var(--color-down)",opacity:.7}})]}),s>0&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-breadth-label",style:{marginLeft:4},children:"Vol"}),e.jsxs("div",{className:"ex-breadth-bar-wrap",title:`${l.toFixed(0)}% up-volume`,style:{maxWidth:80},children:[e.jsx("div",{className:"ex-breadth-seg",style:{width:`${l}%`,background:"var(--color-up)",opacity:.7}}),e.jsx("div",{className:"ex-breadth-seg",style:{width:`${100-l}%`,background:"var(--color-down)",opacity:.7}})]})]})]})}function Be({name:n,accentVar:r}){return e.jsxs("div",{className:"ex-unavailable",style:{borderColor:`color-mix(in srgb, var(${r}) 30%, var(--color-border))`},children:[e.jsxs("p",{className:"ex-unavail-title",children:["Live market data for ",n," is not yet available."]}),e.jsx("p",{className:"ex-unavail-body",children:"We're working to connect a live data feed for this exchange. Check back soon."})]})}export{Le as default};
