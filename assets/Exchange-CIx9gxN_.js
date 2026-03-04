import{r as p,j as e,L as P,l as R,e as v}from"./vendor-9MAh3nQh.js";import{c as A,a as O,b as F,d as z,E as G,X as D,Y as H,p as y}from"./index-D5FybYzw.js";import{N as $,I as K,T as V}from"./NdebelePanel-C_YHhQqb.js";import{c as X}from"./store-Dxzhro6a.js";import"./Sparkline-Sa5-OsUq.js";const Z=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}],["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}]],_=A("bookmark-check",Z);const W=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}]],Q=A("bookmark",W),Y="https://use.or.ug/api/delayed-data",J={"AIRTEL UGANDA":"Airtel Uganda",BATU:"BAT Uganda",BOBU:"Bank of Baroda Uganda",CENT:"Centum Investment",DFCU:"dfcu Limited",EABL:"East African Breweries",EBL:"Equity Bank Uganda",JHL:"Jubilee Holdings",KA:"Kenya Airways",KCB:"KCB Group",MTNU:"MTN Uganda",NIC:"National Insurance Corp",NMG:"Nation Media Group",NVL:"New Vision Group",QCIL:"Quality Chemical Industries",SBU:"Stanbic Uganda Holdings",UCL:"Uganda Clays",UMEM:"Umeme Limited"},q={"AIRTEL UGANDA":222,BATU:820,BOBU:395,CENT:380,DFCU:790,EABL:1600,EBL:380,JHL:420,KA:6,KCB:420,MTNU:185,NIC:16,NMG:180,NVL:58,QCIL:7800,SBU:540,UCL:30,UMEM:265};async function S(){const n=await fetch(Y,{mode:"cors"});if(!n.ok)throw new Error(`USE API ${n.status}`);return n.json()}const I="zamani_use_prev";function E(){try{const n=localStorage.getItem(I);if(!n)return{};const s=JSON.parse(n),i=new Date().toISOString().slice(0,10);return s.date!==i?s.prices??{}:{}}catch{return{}}}function ee(n){try{const s=new Date().toISOString().slice(0,10);localStorage.setItem(I,JSON.stringify({date:s,prices:n}))}catch{}}function ne(){return Object.entries(q).map(([n,s])=>({type:"EQUITY",stock:n,price:s,market_cap:0,volume:0,deals:0}))}async function k(){let n;try{n=await S()}catch(r){console.warn("[USE] API unreachable — using fallback prices:",r),n=ne()}const s=E(),i=n.filter(r=>r.type==="EQUITY"),a={};for(const r of i)a[r.stock]=r.price;return ee(a),i.map(r=>{const d=r.price,o=s[r.stock]??d,c=+(d-o).toFixed(2),l=o?+(c/o*100).toFixed(2):0;return{symbol:r.stock,name:J[r.stock]??r.stock,price:d,change:c,changePct:l,volume:r.volume,currency:"UGX",exchange:"USE",timestamp:Date.now()}})}async function se(){let n;try{n=await S()}catch{n=[]}const s=n.filter(a=>a.type==="INDEX"),i=E();return s.length?s.map(a=>{const r=a.price,d=i[a.stock]??r,o=+(r-d).toFixed(2),c=d?+(o/d*100).toFixed(2):0;return{id:`use-${a.stock.toLowerCase().replace(/\s+/g,"-")}`,name:a.stock==="LCI"?"USE Local Company Index":`USE ${a.stock}`,exchange:"USE",value:r,change:o,changePct:c,currency:"UGX",sparkline:[],timestamp:Date.now()}}):[{id:"use-lci",name:"USE LCI",exchange:"USE",value:0,change:0,changePct:0,currency:"UGX",sparkline:[],timestamp:Date.now()}]}async function re(){const s=[...await k()].sort((r,d)=>d.changePct-r.changePct),i=s.filter(r=>r.changePct>0).slice(0,5).map(r=>({symbol:r.symbol,name:r.name,exchange:"USE",price:r.price,changePct:r.changePct})),a=s.filter(r=>r.changePct<0).slice(-5).reverse().map(r=>({symbol:r.symbol,name:r.name,exchange:"USE",price:r.price,changePct:r.changePct}));return{gainers:i,losers:a}}function ae(n){const s=p.useRef(n),[i,a]=p.useState("");return p.useEffect(()=>{if(s.current===n)return;a(n>s.current?"flash-up":"flash-down"),s.current=n;const r=setTimeout(()=>a(""),800);return()=>clearTimeout(r)},[n]),i}function te({pct:n}){const s=n>=0;return e.jsxs("span",{className:`num stock-chg ${s?"text-up":"text-down"}`,style:{display:"inline-block",minWidth:52,textAlign:"right",padding:"1px 5px",borderRadius:3,background:s?"var(--color-up-subtle)":"var(--color-down-subtle)"},children:[s?"+":"",n.toFixed(2),"%"]})}function oe({q:n,exchangeId:s}){const i=ae(n.price);return e.jsxs(P,{to:`/exchange/${s}/stock/${encodeURIComponent(n.symbol)}`,className:`st-row ${i}`,children:[e.jsx("span",{className:"st-symbol num",children:n.symbol.replace(`.${s.toUpperCase()}`,"")}),e.jsx("span",{className:"st-name",children:n.name}),e.jsxs("span",{className:"st-price num st-align-r",children:[n.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsx("span",{style:{fontSize:9,color:"var(--color-text-muted)",marginLeft:3},children:n.currency})]}),e.jsx("span",{className:"st-align-r",children:e.jsx(te,{pct:n.changePct})}),e.jsx("span",{className:"st-vol num st-align-r",children:n.volume?(n.volume/1e3).toFixed(0)+"K":"—"})]})}function ie({exchangeId:n,quotes:s,isLoading:i,activeSector:a}){const[r,d]=p.useState(""),o=p.useMemo(()=>s.filter(l=>!r||l.symbol.toLowerCase().includes(r.toLowerCase())||l.name.toLowerCase().includes(r.toLowerCase())),[s,r]),c=o.length;return e.jsxs("div",{className:"stocks-table-wrap panel",children:[e.jsxs("div",{className:"st-search-row",children:[e.jsx(O,{size:12}),e.jsx("input",{className:"st-search",placeholder:"Search symbols or names…",value:r,onChange:l=>d(l.target.value)}),e.jsxs("span",{className:"st-count",children:[c," ",a?`(${a})`:"securities"]})]}),e.jsxs("div",{className:"st-header",children:[e.jsx("span",{children:"Symbol"}),e.jsx("span",{children:"Name"}),e.jsx("span",{className:"st-align-r",children:"Price"}),e.jsx("span",{className:"st-align-r",children:"Change"}),e.jsx("span",{className:"st-align-r",children:"Volume"})]}),i?e.jsx("div",{className:"st-empty",children:"Loading…"}):o.length===0?e.jsx("div",{className:"st-empty",children:r?`No results for "${r}"`:"No securities in this sector"}):o.map(l=>e.jsx(oe,{q:l,exchangeId:n},l.symbol)),e.jsx("style",{children:`
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
      `})]})}const ce={"jse:SBK":"Banking","jse:FSR":"Banking","jse:CPI":"Banking","jse:ABG":"Banking","jse:NED":"Banking","jse:INL":"Banking","jse:SLM":"Insurance","jse:MMH":"Insurance","jse:DSY":"Insurance","jse:OMU":"Insurance","jse:SNT":"Insurance","jse:JSE":"Financial Services","jse:NPN":"Technology","jse:PRX":"Technology","jse:MTN":"Telecoms","jse:VOD":"Telecoms","jse:TKG":"Telecoms","jse:AGL":"Mining","jse:BHP":"Mining","jse:AMS":"Mining","jse:IMP":"Mining","jse:SSW":"Mining","jse:GFI":"Mining","jse:HAR":"Mining","jse:SOL":"Energy","jse:SHP":"Consumer","jse:WHL":"Consumer","jse:PIK":"Consumer","jse:MRP":"Consumer","jse:TFG":"Consumer","jse:CLS":"Consumer","jse:PPH":"Consumer","jse:AVI":"Consumer","jse:BID":"Industrial","jse:REM":"Industrial","jse:MNP":"Industrial","jse:BAW":"Industrial","jse:LHC":"Healthcare","jse:GRT":"Property","jse:RDF":"Property","ngx:GTCO":"Banking","ngx:ZENITH":"Banking","ngx:ACCESS":"Banking","ngx:UBA":"Banking","ngx:FBNH":"Banking","ngx:STANBIC":"Banking","ngx:FIDELITY":"Banking","ngx:FCMB":"Banking","ngx:WEMA":"Banking","ngx:STERLING":"Banking","ngx:STERLNB":"Banking","ngx:MTNN":"Telecoms","ngx:AIRTELAFRI":"Telecoms","ngx:SEPLAT":"Energy","ngx:TOTAL":"Energy","ngx:CONOIL":"Energy","ngx:DANGCEM":"Industrial","ngx:BUACEMENT":"Industrial","ngx:WAPCO":"Industrial","ngx:JBERGER":"Industrial","ngx:NESTLE":"Consumer","ngx:NB":"Consumer","ngx:GUINNESS":"Consumer","ngx:BUAFOODS":"Consumer","ngx:FLOURMILL":"Consumer","ngx:DANGSUGAR":"Consumer","ngx:CADBURY":"Consumer","ngx:UNILEVER":"Consumer","ngx:VITAFOAM":"Consumer","ngx:INTBREW":"Consumer","ngx:PRESCO":"Agriculture","ngx:OKOMUOIL":"Agriculture","ngx:AIICO":"Insurance","ngx:MANSARD":"Insurance","ngx:CUSTODIAN":"Insurance","ngx:UCAP":"Financial Services","ngx:AFRIPRUD":"Financial Services","ngx:TRANSCORP":"Conglomerate","ngx:FIDSON":"Healthcare","nse:SCOM":"Telecoms","nse:EQTY":"Banking","nse:KCB":"Banking","nse:COOP":"Banking","nse:NCBA":"Banking","nse:DTK":"Banking","nse:ABSA":"Banking","nse:SBIC":"Banking","nse:SCBK":"Banking","nse:IMB":"Banking","nse:HF":"Banking","nse:NBK":"Banking","nse:BRIT":"Insurance","nse:JUB":"Insurance","nse:CIC":"Insurance","nse:SLAM":"Insurance","nse:LIB":"Insurance","nse:KNRE":"Insurance","nse:CTUM":"Financial Services","nse:NSE":"Financial Services","nse:KPLC":"Energy","nse:KEGN":"Energy","nse:TOTL":"Energy","nse:EABL":"Consumer","nse:BAT":"Consumer","nse:UNGA":"Consumer","nse:BOC":"Industrial","nse:CARB":"Industrial","nse:CGEN":"Industrial","nse:BAMB":"Industrial","nse:EAPC":"Industrial","nse:ARM":"Industrial","nse:KQ":"Transport","nse:SASN":"Agriculture","nse:WTK":"Agriculture","nse:KAPC":"Agriculture","nse:KUKUZI":"Agriculture","nse:LIMTEA":"Agriculture","nse:NMG":"Media","nse:SGL":"Media","nse:LHBL":"Media","nse:SCAN":"Media","nse:ILAM":"Property","nse:TPS":"Hospitality","gse:GCB":"Banking","gse:EGH":"Banking","gse:SCB":"Banking","gse:CAL":"Banking","gse:SOGEGH":"Banking","gse:ACCESS":"Banking","gse:RBGH":"Banking","gse:MTN":"Telecoms","gse:GGBL":"Consumer","gse:FML":"Consumer","gse:UNIL":"Consumer","gse:GOIL":"Energy","gse:TOTAL":"Energy","gse:BOPP":"Agriculture","gse:EGL":"Insurance","gse:AYRTN":"Healthcare","brvm:SNTS":"Telecoms","brvm:ORAC":"Telecoms","brvm:ONTBF":"Telecoms","brvm:ETIT":"Banking","brvm:SGBCI":"Banking","brvm:BICC":"Banking","brvm:NSBC":"Banking","brvm:BOABF":"Banking","brvm:BOAM":"Banking","brvm:BOAS":"Banking","brvm:PALC":"Agriculture","brvm:SIFCA":"Agriculture","brvm:SOLIBRA":"Consumer","brvm:UNXC":"Consumer","brvm:TTLCI":"Energy","brvm:CFACI":"Industrial","brvm:SMBC":"Industrial","zse:DELTA":"Consumer","zse:INNSCOR":"Consumer","zse:OK":"Consumer","zse:HIPPO":"Agriculture","zse:SEEDCO":"Agriculture","zse:PADENGA":"Agriculture","zse:ECONET":"Telecoms","zse:CBZ":"Banking","zse:FBC":"Banking","zse:ZB":"Banking","zse:NMB":"Banking","zse:FIRST":"Banking","zse:FMLRE":"Insurance","zse:NICOZ":"Insurance","zse:ZIMRE":"Insurance","zse:FIDELITY":"Insurance","zse:TSL":"Industrial","zse:ART":"Industrial","zse:MASIMBA":"Industrial","zse:TURNALL":"Industrial","zse:AFRICAN":"Hospitality","zse:RTG":"Hospitality","bse:FNBB":"Banking","bse:STANBIC":"Banking","bse:ABSA":"Banking","bse:ABCH":"Banking","bse:BIHL":"Insurance","bse:LETSHEGO":"Financial Services","bse:IMARA":"Financial Services","bse:OLYMPIA":"Financial Services","bse:SEFALANA":"Consumer","bse:SB":"Consumer","bse:CHOPPIES":"Consumer","bse:BTCL":"Telecoms","bse:ENGEN":"Energy","bse:CHOBE":"Hospitality","bse:WILDERNESS":"Hospitality","bse:CRESTA":"Hospitality","bse:TURNSTAR":"Property","bse:TLOU":"Energy","use:SBU":"Banking","use:DFCU":"Banking","use:BOBU":"Banking","use:EBL":"Banking","use:KCB":"Banking","use:NIC":"Insurance","use:JHL":"Insurance","use:MTNU":"Telecoms","use:AIRTEL UGANDA":"Telecoms","use:EABL":"Consumer","use:BATU":"Consumer","use:NMG":"Media","use:NVL":"Media","use:UMEM":"Energy","use:QCIL":"Healthcare","use:UCL":"Industrial","use:CENT":"Financial Services","use:KA":"Transport","luse:ZCCM":"Mining","luse:CEC":"Energy","luse:ZANACO":"Banking","luse:STANDARD":"Banking","luse:INVESTRUST":"Banking","luse:MADISON":"Insurance","luse:PRIMA":"Insurance","luse:ZAMBEEF":"Consumer","luse:ZSUG":"Agriculture","luse:NATBREW":"Consumer","luse:BATA":"Consumer","luse:LAFARGE":"Industrial","luse:REIZ":"Property","luse:PAMODZI":"Hospitality"};function C(n,s){return ce[`${n.toLowerCase()}:${s.toUpperCase()}`]??"Other"}const j=["Banking","Insurance","Financial Services","Telecoms","Technology","Mining","Energy","Consumer","Industrial","Agriculture","Healthcare","Media","Property","Hospitality","Transport","Conglomerate","Other"];function le({exchangeId:n,quotes:s,activeSector:i,onSectorClick:a}){const r=p.useMemo(()=>{const o=new Map;for(const c of s){const l=C(n,c.symbol),g=o.get(l)??{total:0,count:0};o.set(l,{total:g.total+c.changePct,count:g.count+1})}return j.filter(c=>o.has(c)).map(c=>{const{total:l,count:g}=o.get(c),m=l/g;return{sector:c,avg:m,count:g}})},[s,n]);if(r.length===0)return null;const d=Math.max(...r.map(o=>Math.abs(o.avg)),1);return e.jsxs("div",{children:[e.jsx("div",{className:"section-label",children:"Sector Performance"}),e.jsx("div",{className:"hm-grid",children:r.map(({sector:o,avg:c,count:l})=>{const g=Math.min(Math.abs(c)/d,1),m=c>=0,f=m?`rgba(74,222,128,${.05+g*.2})`:`rgba(248,113,113,${.05+g*.2})`,b=m?`rgba(74,222,128,${.18+g*.4})`:`rgba(248,113,113,${.18+g*.4})`,h=i===o;return e.jsxs("button",{className:`hm-cell ${h?"hm-cell--active":""}`,style:{background:f,borderColor:h?m?"var(--color-up)":"var(--color-down)":b},onClick:()=>a?.(h?null:o),title:`${o}: avg ${m?"+":""}${c.toFixed(2)}% across ${l} stock${l!==1?"s":""}`,children:[e.jsx("span",{className:"hm-name",children:o}),e.jsxs("span",{className:`hm-pct num ${m?"text-up":"text-down"}`,children:[m?"+":"",c.toFixed(2),"%"]}),e.jsx("span",{className:"hm-count num",children:l})]},o)})}),e.jsx("style",{children:`
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
      `})]})}const de=X()(F(n=>({presets:[],savePreset(s){const i={...s,id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,createdAt:Date.now()};n(a=>({presets:[...a.presets,i]}))},deletePreset(s){n(i=>({presets:i.presets.filter(a=>a.id!==s)}))}}),{name:"zamani-screener-presets"})),ge={jse:{name:"Johannesburg Stock Exchange",country:"South Africa",flag:"🇿🇦",currency:"ZAR",accentVar:"--color-jse",founded:"1887",mic:"XJSE"},ngx:{name:"Nigerian Exchange Group",country:"Nigeria",flag:"🇳🇬",currency:"NGN",accentVar:"--color-ngx",founded:"1960",mic:"XLAG"},nse:{name:"Nairobi Securities Exchange",country:"Kenya",flag:"🇰🇪",currency:"KES",accentVar:"--color-nse",founded:"1954",mic:"XNAI"},gse:{name:"Ghana Stock Exchange",country:"Ghana",flag:"🇬🇭",currency:"GHS",accentVar:"--color-gse",founded:"1989",mic:"XGHA"},brvm:{name:"Bourse Régionale UEMOA",country:"West Africa",flag:"🇨🇮",currency:"XOF",accentVar:"--color-brvm",founded:"1998",mic:"XBRV"},zse:{name:"Zimbabwe Stock Exchange",country:"Zimbabwe",flag:"🇿🇼",currency:"USD",accentVar:"--color-zse",founded:"1896",mic:"XZIM"},bse:{name:"Botswana Stock Exchange",country:"Botswana",flag:"🇧🇼",currency:"BWP",accentVar:"--color-bse",founded:"1989",mic:"XBOT"},luse:{name:"Lusaka Securities Exchange",country:"Zambia",flag:"🇿🇲",currency:"ZMW",accentVar:"--color-luse",founded:"1994",mic:"XLUS"},use:{name:"Uganda Securities Exchange",country:"Uganda",flag:"🇺🇬",currency:"UGX",accentVar:"--color-use",founded:"1997",mic:"XUGA"}};function be(){const{id:n=""}=R(),s=ge[n],i=z(n),[a,r]=p.useState(null),{presets:d,savePreset:o,deletePreset:c}=de(),l=d.filter(t=>t.exchange===n),g=n==="use",m=H.includes(n),{data:f,isLoading:b}=v({queryKey:["indices",n],queryFn:g?()=>se():()=>y.getIndices?.(n)??Promise.resolve([]),staleTime:6e4,refetchInterval:6e4}),{data:h,isLoading:T}=v({queryKey:["movers",n],queryFn:g?()=>re():()=>y.getTopMovers?.(n)??Promise.resolve({gainers:[],losers:[]}),staleTime:6e4,refetchInterval:6e4}),{data:u,isLoading:L}=v({queryKey:["stocks",n],queryFn:g?()=>k():()=>y.getExchangeStocks?.(n)??Promise.resolve([]),staleTime:6e4,refetchInterval:6e4}),B=p.useMemo(()=>{if(!u?.length)return[];const t=new Set(u.map(x=>C(n,x.symbol)));return j.filter(x=>t.has(x))},[u,n]),M=p.useMemo(()=>!a||!u?u??[]:u.filter(t=>C(n,t.symbol)===a),[u,a,n]);if(!s)return e.jsx("div",{style:{padding:"2rem",color:"var(--color-text-muted)"},children:"Exchange not found."});const N=(f??[]).filter(t=>t.exchange.toLowerCase()===n),w={"--color-gold":`var(${s.accentVar})`,"--color-gold-dim":`color-mix(in srgb, var(${s.accentVar}) 55%, #000)`,"--color-gold-bright":`color-mix(in srgb, var(${s.accentVar}) 140%, #fff)`,"--color-gold-subtle":`color-mix(in srgb, var(${s.accentVar}) 10%, transparent)`};function U(){if(!a)return;const t=`${n.toUpperCase()} — ${a}`;o({name:t,exchange:n,sectors:[a]})}return e.jsxs("div",{className:"exchange-page",style:w,children:[e.jsxs("div",{className:"ex-header panel",style:{borderLeftColor:`var(${s.accentVar})`},children:[e.jsxs("div",{className:"ex-header-left",children:[e.jsx("span",{className:"ex-flag",children:s.flag}),e.jsxs("div",{children:[e.jsxs("div",{className:"ex-title-row",children:[e.jsx("h1",{className:"ex-name",children:s.name}),e.jsx(G,{id:n})]}),e.jsxs("p",{className:"ex-meta",children:[s.country,s.mic&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-sep",children:"·"}),e.jsx("span",{children:s.mic})]}),s.founded&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-sep",children:"·"}),e.jsxs("span",{children:["Est. ",s.founded]})]}),e.jsx("span",{className:"ex-sep",children:"·"}),e.jsxs("span",{className:"num",children:[i," local"]})]})]})]}),e.jsx($,{width:80,height:80,color:`var(${s.accentVar})`,opacity:.08,style:{position:"absolute",right:0,top:0}})]}),e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Indices"}),b?e.jsx("p",{className:"ex-loading",children:"Loading…"}):N.length>0?e.jsx("div",{className:"idx-strip",children:N.map(t=>e.jsx(K,{index:t},t.id))}):e.jsx("p",{className:"ex-loading",children:m?`No index data available for ${s.name}.`:"Live index data for this exchange is not yet connected."})]}),m&&(u??[]).length>0&&e.jsx("section",{children:e.jsx(le,{exchangeId:n,quotes:u??[],activeSector:a,onSectorClick:r})}),m&&B.length>0&&e.jsxs("div",{className:"ex-sector-filters",children:[e.jsx("button",{className:`ex-sector-btn ${a?"":"active"}`,onClick:()=>r(null),children:"All"}),B.map(t=>e.jsx("button",{className:`ex-sector-btn ${a===t?"active":""}`,onClick:()=>r(x=>x===t?null:t),children:t},t)),a&&e.jsxs("button",{className:"ex-save-preset-btn",onClick:U,title:`Save "${a}" filter as preset`,children:[e.jsx(Q,{size:11})," Save filter"]}),l.length>0&&e.jsx("div",{className:"ex-presets",children:l.map(t=>e.jsxs("span",{className:`ex-preset-chip ${a===t.sectors[0]?"active":""}`,onClick:()=>r(x=>x===t.sectors[0]?null:t.sectors[0]),children:[e.jsx(_,{size:9}),t.name.split("—")[1]?.trim()??t.name,e.jsx("button",{className:"ex-preset-del",onClick:x=>{x.stopPropagation(),c(t.id)},"aria-label":"Remove preset",children:e.jsx(D,{size:8})})]},t.id))})]}),m?e.jsxs("div",{className:"ex-cols",children:[e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Top Movers"}),T?e.jsx("p",{className:"ex-loading",children:"Loading…"}):e.jsx(V,{gainers:h?.gainers??[],losers:h?.losers??[]})]}),e.jsxs("section",{className:"ex-stocks-col",children:[e.jsx("div",{className:"section-label",children:a?`${a} Securities`:"All Securities"}),e.jsx(ie,{exchangeId:n,quotes:M,isLoading:L,activeSector:a})]})]}):e.jsx(me,{name:s.name,accentVar:s.accentVar}),e.jsx("style",{children:`
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
      `})]})}function me({name:n,accentVar:s}){return e.jsxs("div",{className:"ex-unavailable",style:{borderColor:`color-mix(in srgb, var(${s}) 30%, var(--color-border))`},children:[e.jsxs("p",{className:"ex-unavail-title",children:["Live market data for ",n," is not yet available."]}),e.jsx("p",{className:"ex-unavail-body",children:"We're working to connect a live data feed for this exchange. Check back soon."})]})}export{be as default};
