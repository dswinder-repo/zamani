import{r as u,j as e,L as W,l as _,e as B}from"./vendor-9MAh3nQh.js";import{c as P,e as Z,b as Q,f as Y,E as J,X as q,h as ee,Y as ne,i as A,p as E}from"./index-CqMmOgDz.js";import{d as re}from"./csvExport-JVihQZGh.js";import{N as se,I as ae,T as te}from"./NdebelePanel-C_YHhQqb.js";import{R as oe,b as ce,T as ie}from"./recharts-WEknt4oI.js";import{c as le}from"./store-DR-NtvzW.js";import{D as de}from"./download-ox6mbwG2.js";import"./Sparkline-Sa5-OsUq.js";const ge=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}],["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}]],me=P("bookmark-check",ge);const xe=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}]],ue=P("bookmark",xe),pe="https://use.or.ug/api/delayed-data",he={"AIRTEL UGANDA":"Airtel Uganda",BATU:"BAT Uganda",BOBU:"Bank of Baroda Uganda",CENT:"Centum Investment",DFCU:"dfcu Limited",EABL:"East African Breweries",EBL:"Equity Bank Uganda",JHL:"Jubilee Holdings",KA:"Kenya Airways",KCB:"KCB Group",MTNU:"MTN Uganda",NIC:"National Insurance Corp",NMG:"Nation Media Group",NVL:"New Vision Group",QCIL:"Quality Chemical Industries",SBU:"Stanbic Uganda Holdings",UCL:"Uganda Clays",UMEM:"Umeme Limited"},be={"AIRTEL UGANDA":222,BATU:820,BOBU:395,CENT:380,DFCU:790,EABL:1600,EBL:380,JHL:420,KA:6,KCB:420,MTNU:185,NIC:16,NMG:180,NVL:58,QCIL:7800,SBU:540,UCL:30,UMEM:265};async function U(){const n=await fetch(pe,{mode:"cors"});if(!n.ok)throw new Error(`USE API ${n.status}`);return n.json()}const R="zamani_use_prev";function O(){try{const n=localStorage.getItem(R);if(!n)return{};const s=JSON.parse(n),o=new Date().toISOString().slice(0,10);return s.date!==o?s.prices??{}:{}}catch{return{}}}function ve(n){try{const s=new Date().toISOString().slice(0,10);localStorage.setItem(R,JSON.stringify({date:s,prices:n}))}catch{}}function fe(){return Object.entries(be).map(([n,s])=>({type:"EQUITY",stock:n,price:s,market_cap:0,volume:0,deals:0}))}async function z(){let n;try{n=await U()}catch(r){console.warn("[USE] API unreachable — using fallback prices:",r),n=fe()}const s=O(),o=n.filter(r=>r.type==="EQUITY"),a={};for(const r of o)a[r.stock]=r.price;return ve(a),o.map(r=>{const c=r.price,l=s[r.stock]??c,d=+(c-l).toFixed(2),g=l?+(d/l*100).toFixed(2):0;return{symbol:r.stock,name:he[r.stock]??r.stock,price:c,change:d,changePct:g,volume:r.volume,currency:"UGX",exchange:"USE",timestamp:Date.now()}})}async function ye(){let n;try{n=await U()}catch{n=[]}const s=n.filter(a=>a.type==="INDEX"),o=O();return s.length?s.map(a=>{const r=a.price,c=o[a.stock]??r,l=+(r-c).toFixed(2),d=c?+(l/c*100).toFixed(2):0;return{id:`use-${a.stock.toLowerCase().replace(/\s+/g,"-")}`,name:a.stock==="LCI"?"USE Local Company Index":`USE ${a.stock}`,exchange:"USE",value:r,change:l,changePct:d,currency:"UGX",sparkline:[],timestamp:Date.now()}}):[{id:"use-lci",name:"USE LCI",exchange:"USE",value:0,change:0,changePct:0,currency:"UGX",sparkline:[],timestamp:Date.now()}]}async function Ne(){const s=[...await z()].sort((r,c)=>c.changePct-r.changePct),o=s.filter(r=>r.changePct>0).slice(0,5).map(r=>({symbol:r.symbol,name:r.name,exchange:"USE",price:r.price,changePct:r.changePct})),a=s.filter(r=>r.changePct<0).slice(-5).reverse().map(r=>({symbol:r.symbol,name:r.name,exchange:"USE",price:r.price,changePct:r.changePct}));return{gainers:o,losers:a}}function Ce(n){const s=u.useRef(n),[o,a]=u.useState("");return u.useEffect(()=>{if(s.current===n)return;a(n>s.current?"flash-up":"flash-down"),s.current=n;const r=setTimeout(()=>a(""),800);return()=>clearTimeout(r)},[n]),o}function je({pct:n}){const s=n>=0;return e.jsxs("span",{className:`num stock-chg ${s?"text-up":"text-down"}`,style:{display:"inline-block",minWidth:52,textAlign:"right",padding:"1px 5px",borderRadius:3,background:s?"var(--color-up-subtle)":"var(--color-down-subtle)"},children:[s?"+":"",n.toFixed(2),"%"]})}function ke({q:n,exchangeId:s}){const o=Ce(n.price);return e.jsxs(W,{to:`/exchange/${s}/stock/${encodeURIComponent(n.symbol)}`,className:`st-row ${o}`,children:[e.jsx("span",{className:"st-symbol num",children:n.symbol.replace(`.${s.toUpperCase()}`,"")}),e.jsx("span",{className:"st-name",children:n.name}),e.jsxs("span",{className:"st-price num st-align-r",children:[n.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsx("span",{style:{fontSize:9,color:"var(--color-text-muted)",marginLeft:3},children:n.currency})]}),e.jsx("span",{className:"st-align-r",children:e.jsx(je,{pct:n.changePct})}),e.jsx("span",{className:"st-vol num st-align-r",children:n.volume?(n.volume/1e3).toFixed(0)+"K":"—"})]})}function Se({exchangeId:n,quotes:s,isLoading:o,activeSector:a}){const[r,c]=u.useState(""),l=u.useMemo(()=>s.filter(g=>!r||g.symbol.toLowerCase().includes(r.toLowerCase())||g.name.toLowerCase().includes(r.toLowerCase())),[s,r]),d=l.length;return e.jsxs("div",{className:"stocks-table-wrap panel",children:[e.jsxs("div",{className:"st-search-row",children:[e.jsx(Z,{size:12}),e.jsx("input",{className:"st-search",placeholder:"Search symbols or names…",value:r,onChange:g=>c(g.target.value)}),e.jsxs("span",{className:"st-count",children:[d," ",a?`(${a})`:"securities"]})]}),e.jsxs("div",{className:"st-header",children:[e.jsx("span",{children:"Symbol"}),e.jsx("span",{children:"Name"}),e.jsx("span",{className:"st-align-r",children:"Price"}),e.jsx("span",{className:"st-align-r",children:"Change"}),e.jsx("span",{className:"st-align-r",children:"Volume"})]}),o?e.jsx("div",{className:"st-empty",children:"Loading…"}):l.length===0?e.jsx("div",{className:"st-empty",children:r?`No results for "${r}"`:"No securities in this sector"}):l.map(g=>e.jsx(ke,{q:g,exchangeId:n},g.symbol)),e.jsx("style",{children:`
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
      `})]})}const Be={"jse:SBK":"Banking","jse:FSR":"Banking","jse:CPI":"Banking","jse:ABG":"Banking","jse:NED":"Banking","jse:INL":"Banking","jse:SLM":"Insurance","jse:MMH":"Insurance","jse:DSY":"Insurance","jse:OMU":"Insurance","jse:SNT":"Insurance","jse:JSE":"Financial Services","jse:NPN":"Technology","jse:PRX":"Technology","jse:MTN":"Telecoms","jse:VOD":"Telecoms","jse:TKG":"Telecoms","jse:AGL":"Mining","jse:BHP":"Mining","jse:AMS":"Mining","jse:IMP":"Mining","jse:SSW":"Mining","jse:GFI":"Mining","jse:HAR":"Mining","jse:SOL":"Energy","jse:SHP":"Consumer","jse:WHL":"Consumer","jse:PIK":"Consumer","jse:MRP":"Consumer","jse:TFG":"Consumer","jse:CLS":"Consumer","jse:PPH":"Consumer","jse:AVI":"Consumer","jse:BID":"Industrial","jse:REM":"Industrial","jse:MNP":"Industrial","jse:BAW":"Industrial","jse:LHC":"Healthcare","jse:GRT":"Property","jse:RDF":"Property","ngx:GTCO":"Banking","ngx:ZENITH":"Banking","ngx:ACCESS":"Banking","ngx:UBA":"Banking","ngx:FBNH":"Banking","ngx:STANBIC":"Banking","ngx:FIDELITY":"Banking","ngx:FCMB":"Banking","ngx:WEMA":"Banking","ngx:STERLING":"Banking","ngx:STERLNB":"Banking","ngx:MTNN":"Telecoms","ngx:AIRTELAFRI":"Telecoms","ngx:SEPLAT":"Energy","ngx:TOTAL":"Energy","ngx:CONOIL":"Energy","ngx:DANGCEM":"Industrial","ngx:BUACEMENT":"Industrial","ngx:WAPCO":"Industrial","ngx:JBERGER":"Industrial","ngx:NESTLE":"Consumer","ngx:NB":"Consumer","ngx:GUINNESS":"Consumer","ngx:BUAFOODS":"Consumer","ngx:FLOURMILL":"Consumer","ngx:DANGSUGAR":"Consumer","ngx:CADBURY":"Consumer","ngx:UNILEVER":"Consumer","ngx:VITAFOAM":"Consumer","ngx:INTBREW":"Consumer","ngx:PRESCO":"Agriculture","ngx:OKOMUOIL":"Agriculture","ngx:AIICO":"Insurance","ngx:MANSARD":"Insurance","ngx:CUSTODIAN":"Insurance","ngx:UCAP":"Financial Services","ngx:AFRIPRUD":"Financial Services","ngx:TRANSCORP":"Conglomerate","ngx:FIDSON":"Healthcare","nse:SCOM":"Telecoms","nse:EQTY":"Banking","nse:KCB":"Banking","nse:COOP":"Banking","nse:NCBA":"Banking","nse:DTK":"Banking","nse:ABSA":"Banking","nse:SBIC":"Banking","nse:SCBK":"Banking","nse:IMB":"Banking","nse:HF":"Banking","nse:NBK":"Banking","nse:BRIT":"Insurance","nse:JUB":"Insurance","nse:CIC":"Insurance","nse:SLAM":"Insurance","nse:LIB":"Insurance","nse:KNRE":"Insurance","nse:CTUM":"Financial Services","nse:NSE":"Financial Services","nse:KPLC":"Energy","nse:KEGN":"Energy","nse:TOTL":"Energy","nse:EABL":"Consumer","nse:BAT":"Consumer","nse:UNGA":"Consumer","nse:BOC":"Industrial","nse:CARB":"Industrial","nse:CGEN":"Industrial","nse:BAMB":"Industrial","nse:EAPC":"Industrial","nse:ARM":"Industrial","nse:KQ":"Transport","nse:SASN":"Agriculture","nse:WTK":"Agriculture","nse:KAPC":"Agriculture","nse:KUKUZI":"Agriculture","nse:LIMTEA":"Agriculture","nse:NMG":"Media","nse:SGL":"Media","nse:LHBL":"Media","nse:SCAN":"Media","nse:ILAM":"Property","nse:TPS":"Hospitality","gse:GCB":"Banking","gse:EGH":"Banking","gse:SCB":"Banking","gse:CAL":"Banking","gse:SOGEGH":"Banking","gse:ACCESS":"Banking","gse:RBGH":"Banking","gse:MTN":"Telecoms","gse:GGBL":"Consumer","gse:FML":"Consumer","gse:UNIL":"Consumer","gse:GOIL":"Energy","gse:TOTAL":"Energy","gse:BOPP":"Agriculture","gse:EGL":"Insurance","gse:AYRTN":"Healthcare","brvm:SNTS":"Telecoms","brvm:ORAC":"Telecoms","brvm:ONTBF":"Telecoms","brvm:ETIT":"Banking","brvm:SGBCI":"Banking","brvm:BICC":"Banking","brvm:NSBC":"Banking","brvm:BOABF":"Banking","brvm:BOAM":"Banking","brvm:BOAS":"Banking","brvm:PALC":"Agriculture","brvm:SIFCA":"Agriculture","brvm:SOLIBRA":"Consumer","brvm:UNXC":"Consumer","brvm:TTLCI":"Energy","brvm:CFACI":"Industrial","brvm:SMBC":"Industrial","zse:DELTA":"Consumer","zse:INNSCOR":"Consumer","zse:OK":"Consumer","zse:HIPPO":"Agriculture","zse:SEEDCO":"Agriculture","zse:PADENGA":"Agriculture","zse:ECONET":"Telecoms","zse:CBZ":"Banking","zse:FBC":"Banking","zse:ZB":"Banking","zse:NMB":"Banking","zse:FIRST":"Banking","zse:FMLRE":"Insurance","zse:NICOZ":"Insurance","zse:ZIMRE":"Insurance","zse:FIDELITY":"Insurance","zse:TSL":"Industrial","zse:ART":"Industrial","zse:MASIMBA":"Industrial","zse:TURNALL":"Industrial","zse:AFRICAN":"Hospitality","zse:RTG":"Hospitality","bse:FNBB":"Banking","bse:STANBIC":"Banking","bse:ABSA":"Banking","bse:ABCH":"Banking","bse:BIHL":"Insurance","bse:LETSHEGO":"Financial Services","bse:IMARA":"Financial Services","bse:OLYMPIA":"Financial Services","bse:SEFALANA":"Consumer","bse:SB":"Consumer","bse:CHOPPIES":"Consumer","bse:BTCL":"Telecoms","bse:ENGEN":"Energy","bse:CHOBE":"Hospitality","bse:WILDERNESS":"Hospitality","bse:CRESTA":"Hospitality","bse:TURNSTAR":"Property","bse:TLOU":"Energy","use:SBU":"Banking","use:DFCU":"Banking","use:BOBU":"Banking","use:EBL":"Banking","use:KCB":"Banking","use:NIC":"Insurance","use:JHL":"Insurance","use:MTNU":"Telecoms","use:AIRTEL UGANDA":"Telecoms","use:EABL":"Consumer","use:BATU":"Consumer","use:NMG":"Media","use:NVL":"Media","use:UMEM":"Energy","use:QCIL":"Healthcare","use:UCL":"Industrial","use:CENT":"Financial Services","use:KA":"Transport","luse:ZCCM":"Mining","luse:CEC":"Energy","luse:ZANACO":"Banking","luse:STANDARD":"Banking","luse:INVESTRUST":"Banking","luse:MADISON":"Insurance","luse:PRIMA":"Insurance","luse:ZAMBEEF":"Consumer","luse:ZSUG":"Agriculture","luse:NATBREW":"Consumer","luse:BATA":"Consumer","luse:LAFARGE":"Industrial","luse:REIZ":"Property","luse:PAMODZI":"Hospitality"};function N(n,s){return Be[`${n.toLowerCase()}:${s.toUpperCase()}`]??"Other"}const F=["Banking","Insurance","Financial Services","Telecoms","Technology","Mining","Energy","Consumer","Industrial","Agriculture","Healthcare","Media","Property","Hospitality","Transport","Conglomerate","Other"];function Ae({exchangeId:n,quotes:s,activeSector:o,onSectorClick:a}){const r=u.useMemo(()=>{const l=new Map;for(const d of s){const g=N(n,d.symbol),x=l.get(g)??{total:0,count:0};l.set(g,{total:x.total+d.changePct,count:x.count+1})}return F.filter(d=>l.has(d)).map(d=>{const{total:g,count:x}=l.get(d),p=g/x;return{sector:d,avg:p,count:x}})},[s,n]);if(r.length===0)return null;const c=Math.max(...r.map(l=>Math.abs(l.avg)),1);return e.jsxs("div",{children:[e.jsx("div",{className:"section-label",children:"Sector Performance"}),e.jsx("div",{className:"hm-grid",children:r.map(({sector:l,avg:d,count:g})=>{const x=Math.min(Math.abs(d)/c,1),p=d>=0,y=p?`rgba(74,222,128,${.05+x*.2})`:`rgba(248,113,113,${.05+x*.2})`,v=p?`rgba(74,222,128,${.18+x*.4})`:`rgba(248,113,113,${.18+x*.4})`,h=o===l;return e.jsxs("button",{className:`hm-cell ${h?"hm-cell--active":""}`,style:{background:y,borderColor:h?p?"var(--color-up)":"var(--color-down)":v},onClick:()=>a?.(h?null:l),title:`${l}: avg ${p?"+":""}${d.toFixed(2)}% across ${g} stock${g!==1?"s":""}`,children:[e.jsx("span",{className:"hm-name",children:l}),e.jsxs("span",{className:`hm-pct num ${p?"text-up":"text-down"}`,children:[p?"+":"",d.toFixed(2),"%"]}),e.jsx("span",{className:"hm-count num",children:g})]},l)})}),e.jsx("style",{children:`
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
      `})]})}function Ee(n){return n>=4?"#00c853":n>=2?"#43a047":n>=.5?"#2e7d32":n>=-.5?"#455a64":n>=-2?"#c62828":n>=-4?"#e53935":"#b71c1c"}function Ie(n){const{x:s=0,y:o=0,width:a=0,height:r=0,changePct:c=0,symbol:l,name:d}=n,g=Ee(c),x=a>35&&r>20;return e.jsxs("g",{children:[e.jsx("rect",{x:s+1,y:o+1,width:a-2,height:r-2,fill:g,fillOpacity:.85,stroke:"rgba(0,0,0,0.3)",strokeWidth:1,rx:2}),x&&e.jsxs(e.Fragment,{children:[e.jsx("text",{x:s+a/2,y:o+r/2-(r>36?8:0),textAnchor:"middle",dominantBaseline:"middle",fill:"#fff",fontSize:Math.min(11,a/5),fontWeight:700,fontFamily:"var(--font-mono)",children:l??d}),r>36&&e.jsxs("text",{x:s+a/2,y:o+r/2+10,textAnchor:"middle",dominantBaseline:"middle",fill:"rgba(255,255,255,0.7)",fontSize:9,fontFamily:"var(--font-mono)",children:[c>=0?"+":"",c.toFixed(2),"%"]})]})]})}function we({active:n,payload:s}){if(!n||!s?.length)return null;const o=s[0].payload;if(!o.symbol)return null;const a=o.changePct??0,r=a>=0;return e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"6px 10px",fontSize:11,fontFamily:"var(--font-mono)",boxShadow:"0 4px 12px rgba(0,0,0,0.5)"},children:[e.jsx("div",{style:{fontWeight:700,color:"var(--color-gold)"},children:o.symbol}),e.jsxs("div",{style:{color:r?"var(--color-up)":"var(--color-down)",fontWeight:600},children:[r?"+":"",a.toFixed(2),"%"]})]})}function Te({exchangeId:n,quotes:s}){const o=u.useMemo(()=>{const a={};for(const r of s){const c=N(n,r.symbol);a[c]||(a[c]=[]);const l=Math.max(1,Math.round(r.price*(r.volume??1e3)));a[c].push({name:r.name??r.symbol,symbol:r.symbol,size:l,changePct:r.changePct})}return Object.entries(a).map(([r,c])=>({name:r,children:c.sort((l,d)=>(d.size??0)-(l.size??0))}))},[s,n]);return s.length?e.jsx("div",{style:{width:"100%",height:280},children:e.jsx(oe,{children:e.jsx(ce,{data:o,dataKey:"size",aspectRatio:4/3,content:a=>{const r=a;return(r.depth??0)<2?e.jsx("rect",{x:r.x,y:r.y,width:r.width,height:r.height,fill:"none"}):e.jsx(Ie,{x:r.x,y:r.y,width:r.width,height:r.height,name:r.name,changePct:r.changePct??0,symbol:r.symbol})},children:e.jsx(ie,{content:e.jsx(we,{})})})})}):null}const Le=le()(Q(n=>({presets:[],savePreset(s){const o={...s,id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,createdAt:Date.now()};n(a=>({presets:[...a.presets,o]}))},deletePreset(s){n(o=>({presets:o.presets.filter(a=>a.id!==s)}))}}),{name:"zamani-screener-presets"})),Me={jse:{name:"Johannesburg Stock Exchange",country:"South Africa",flag:"🇿🇦",currency:"ZAR",accentVar:"--color-jse",founded:"1887",mic:"XJSE"},ngx:{name:"Nigerian Exchange Group",country:"Nigeria",flag:"🇳🇬",currency:"NGN",accentVar:"--color-ngx",founded:"1960",mic:"XLAG"},nse:{name:"Nairobi Securities Exchange",country:"Kenya",flag:"🇰🇪",currency:"KES",accentVar:"--color-nse",founded:"1954",mic:"XNAI"},gse:{name:"Ghana Stock Exchange",country:"Ghana",flag:"🇬🇭",currency:"GHS",accentVar:"--color-gse",founded:"1989",mic:"XGHA"},brvm:{name:"Bourse Régionale UEMOA",country:"West Africa",flag:"🇨🇮",currency:"XOF",accentVar:"--color-brvm",founded:"1998",mic:"XBRV"},zse:{name:"Zimbabwe Stock Exchange",country:"Zimbabwe",flag:"🇿🇼",currency:"USD",accentVar:"--color-zse",founded:"1896",mic:"XZIM"},bse:{name:"Botswana Stock Exchange",country:"Botswana",flag:"🇧🇼",currency:"BWP",accentVar:"--color-bse",founded:"1989",mic:"XBOT"},luse:{name:"Lusaka Securities Exchange",country:"Zambia",flag:"🇿🇲",currency:"ZMW",accentVar:"--color-luse",founded:"1994",mic:"XLUS"},use:{name:"Uganda Securities Exchange",country:"Uganda",flag:"🇺🇬",currency:"UGX",accentVar:"--color-use",founded:"1997",mic:"XUGA"},egx:{name:"Egyptian Exchange",country:"Egypt",flag:"🇪🇬",currency:"EGP",accentVar:"--color-egx",founded:"1883",mic:"XCAI"}};function Ve(){const{id:n=""}=_(),s=Me[n],o=Y(n),[a,r]=u.useState(null),[c,l]=u.useState("all"),{presets:d,savePreset:g,deletePreset:x}=Le(),p=d.filter(t=>t.exchange===n),y=n==="use",v=ee.includes(n),h=ne.includes(n)||v,f=v?432e5:6e4,{data:G,isLoading:D}=B({queryKey:["indices",n],queryFn:y?()=>ye():v?()=>A.getIndices(n):()=>E.getIndices?.(n)??Promise.resolve([]),staleTime:f,refetchInterval:f}),{data:I,isLoading:$}=B({queryKey:["movers",n],queryFn:y?()=>Ne():v?()=>A.getTopMovers(n):()=>E.getTopMovers?.(n)??Promise.resolve({gainers:[],losers:[]}),staleTime:f,refetchInterval:f}),{data:m,isLoading:C}=B({queryKey:["stocks",n],queryFn:y?()=>z():v?()=>A.getExchangeStocks(n):()=>E.getExchangeStocks?.(n)??Promise.resolve([]),staleTime:f,refetchInterval:f}),w=u.useMemo(()=>{if(!m?.length)return[];const t=new Set(m.map(i=>N(n,i.symbol)));return F.filter(i=>t.has(i))},[m,n]),j=u.useMemo(()=>{let t=m??[];return a&&(t=t.filter(i=>N(n,i.symbol)===a)),c==="gainers"&&(t=t.filter(i=>i.changePct>0)),c==="losers"&&(t=t.filter(i=>i.changePct<0)),c==="active"&&(t=[...t].sort((i,k)=>(k.volume??0)-(i.volume??0)).slice(0,15)),t},[m,a,c,n]),T=u.useMemo(()=>m?.length?[...m].filter(t=>Math.abs(t.changePct)>=2).sort((t,i)=>Math.abs(i.changePct)-Math.abs(t.changePct)).slice(0,12):[],[m]),L=u.useMemo(()=>{if(!m?.length)return null;const t=m.filter(b=>b.changePct>0).length,i=m.filter(b=>b.changePct<0).length,k=m.length-t-i,K=m.filter(b=>b.changePct>0).reduce((b,S)=>b+(S.volume??0),0),X=m.filter(b=>b.changePct<0).reduce((b,S)=>b+(S.volume??0),0);return{advancing:t,declining:i,unchanged:k,upVol:K,downVol:X,total:m.length}},[m]);if(!s)return e.jsx("div",{style:{padding:"2rem",color:"var(--color-text-muted)"},children:"Exchange not found."});const M=(G??[]).filter(t=>t.exchange.toLowerCase()===n),H={"--color-gold":`var(${s.accentVar})`,"--color-gold-dim":`color-mix(in srgb, var(${s.accentVar}) 55%, #000)`,"--color-gold-bright":`color-mix(in srgb, var(${s.accentVar}) 140%, #fff)`,"--color-gold-subtle":`color-mix(in srgb, var(${s.accentVar}) 10%, transparent)`};function V(){if(!a)return;const t=`${n.toUpperCase()} — ${a}`;g({name:t,exchange:n,sectors:[a]})}return e.jsxs("div",{className:"exchange-page",style:H,children:[e.jsxs("div",{className:"ex-header panel",style:{borderLeftColor:`var(${s.accentVar})`},children:[e.jsxs("div",{className:"ex-header-left",children:[e.jsx("span",{className:"ex-flag",children:s.flag}),e.jsxs("div",{children:[e.jsxs("div",{className:"ex-title-row",children:[e.jsx("h1",{className:"ex-name",children:s.name}),e.jsx(J,{id:n})]}),e.jsxs("p",{className:"ex-meta",children:[s.country,s.mic&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-sep",children:"·"}),e.jsx("span",{children:s.mic})]}),s.founded&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-sep",children:"·"}),e.jsxs("span",{children:["Est. ",s.founded]})]}),e.jsx("span",{className:"ex-sep",children:"·"}),e.jsxs("span",{className:"num",children:[o," local"]})]})]})]}),e.jsx(se,{width:80,height:80,color:`var(${s.accentVar})`,opacity:.08,style:{position:"absolute",right:0,top:0}})]}),e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Indices"}),D?e.jsx("p",{className:"ex-loading",children:"Loading…"}):M.length>0?e.jsx("div",{className:"idx-strip",children:M.map(t=>e.jsx(ae,{index:t},t.id))}):e.jsx("p",{className:"ex-loading",children:h?`No index data available for ${s.name}.`:"Live index data for this exchange is not yet connected."})]}),h&&(m??[]).length>0&&e.jsx("section",{children:e.jsx(Ae,{exchangeId:n,quotes:m??[],activeSector:a,onSectorClick:r})}),h&&(m??[]).length>0&&n==="jse"&&e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Sector Treemap"}),e.jsx("div",{className:"panel",style:{padding:"0.75rem"},children:e.jsx(Te,{exchangeId:n,quotes:m??[]})})]}),h&&w.length>0&&e.jsxs("div",{className:"ex-sector-filters",children:[e.jsx("button",{className:`ex-sector-btn ${a?"":"active"}`,onClick:()=>r(null),children:"All"}),w.map(t=>e.jsx("button",{className:`ex-sector-btn ${a===t?"active":""}`,onClick:()=>r(i=>i===t?null:t),children:t},t)),a&&e.jsxs("button",{className:"ex-save-preset-btn",onClick:V,title:`Save "${a}" filter as preset`,children:[e.jsx(ue,{size:11})," Save filter"]}),p.length>0&&e.jsx("div",{className:"ex-presets",children:p.map(t=>e.jsxs("span",{className:`ex-preset-chip ${a===t.sectors[0]?"active":""}`,onClick:()=>r(i=>i===t.sectors[0]?null:t.sectors[0]),children:[e.jsx(me,{size:9}),t.name.split("—")[1]?.trim()??t.name,e.jsx("button",{className:"ex-preset-del",onClick:i=>{i.stopPropagation(),x(t.id)},"aria-label":"Remove preset",children:e.jsx(q,{size:8})})]},t.id))})]}),h&&T.length>0&&!C&&e.jsxs("div",{className:"ex-moving-wrap",children:[e.jsx("span",{className:"ex-moving-label",children:"Moving"}),e.jsx("div",{className:"ex-moving-strip",children:T.map(t=>{const i=t.changePct>=0;return e.jsxs("span",{className:`ex-moving-chip ${i?"up":"down"}`,children:[e.jsx("span",{className:"ex-moving-sym",children:t.symbol}),e.jsxs("span",{className:"ex-moving-pct",children:[i?"+":"",t.changePct.toFixed(2),"%"]})]},t.symbol)})})]}),h&&L&&!C&&e.jsx(Pe,{breadth:L}),h?e.jsxs("div",{className:"ex-cols",children:[e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Top Movers"}),$?e.jsx("p",{className:"ex-loading",children:"Loading…"}):e.jsx(te,{gainers:I?.gainers??[],losers:I?.losers??[]})]}),e.jsxs("section",{className:"ex-stocks-col",children:[e.jsxs("div",{className:"ex-stocks-header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx("div",{className:"section-label",children:a?`${a} Securities`:"All Securities"}),v&&e.jsx("span",{className:"ex-eod-badge",children:"End-of-day"})]}),e.jsxs("div",{className:"ex-screener-tabs",children:[["all","gainers","losers","active"].map(t=>e.jsx("button",{className:`ex-screener-tab ${c===t?"active":""}`,onClick:()=>l(t),children:t==="active"?"Most Active":t.charAt(0).toUpperCase()+t.slice(1)},t)),j.length>0&&e.jsx("button",{className:"ex-screener-tab",title:"Export CSV",onClick:()=>{const t=[["Symbol","Name","Price","Change","Change %","Volume","Currency"],...j.map(i=>[i.symbol,i.name,i.price,i.change,i.changePct,i.volume??"",i.currency])];re(t,`${n.toUpperCase()}-stocks.csv`)},children:e.jsx(de,{size:10})})]})]}),e.jsx(Se,{exchangeId:n,quotes:j,isLoading:C,activeSector:a})]})]}):e.jsx(Ue,{name:s.name,accentVar:s.accentVar}),e.jsx("style",{children:`
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

        /* EOD data freshness badge */
        .ex-eod-badge {
          font-size: 9px; font-weight: 600; letter-spacing: 0.05em;
          text-transform: uppercase; padding: 1px 5px; border-radius: 3px;
          background: color-mix(in srgb, var(--color-gold) 12%, transparent);
          color: var(--color-gold); border: 1px solid var(--color-gold-dim);
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
      `})]})}function Pe({breadth:n}){const s=n.advancing/n.total*100,o=n.declining/n.total*100,a=100-s-o,r=n.upVol+n.downVol,c=r?n.upVol/r*100:50;return e.jsxs("div",{className:"ex-breadth",children:[e.jsx("span",{className:"ex-breadth-label",children:"Breadth"}),e.jsxs("div",{className:"ex-breadth-stat",children:[e.jsx("span",{className:"ex-breadth-dot",style:{background:"var(--color-up)"}}),e.jsx("span",{style:{color:"var(--color-up)"},children:n.advancing}),e.jsx("span",{style:{color:"var(--color-text-muted)"},children:"adv"})]}),e.jsxs("div",{className:"ex-breadth-stat",children:[e.jsx("span",{className:"ex-breadth-dot",style:{background:"var(--color-down)"}}),e.jsx("span",{style:{color:"var(--color-down)"},children:n.declining}),e.jsx("span",{style:{color:"var(--color-text-muted)"},children:"dec"})]}),n.unchanged>0&&e.jsxs("div",{className:"ex-breadth-stat",children:[e.jsx("span",{className:"ex-breadth-dot",style:{background:"var(--color-text-muted)"}}),e.jsxs("span",{style:{color:"var(--color-text-muted)"},children:[n.unchanged," unch"]})]}),e.jsxs("div",{className:"ex-breadth-bar-wrap",title:`${s.toFixed(0)}% advancing`,children:[e.jsx("div",{className:"ex-breadth-seg",style:{width:`${s}%`,background:"var(--color-up)",opacity:.7}}),e.jsx("div",{className:"ex-breadth-seg",style:{width:`${a}%`,background:"var(--color-border)"}}),e.jsx("div",{className:"ex-breadth-seg",style:{width:`${o}%`,background:"var(--color-down)",opacity:.7}})]}),r>0&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-breadth-label",style:{marginLeft:4},children:"Vol"}),e.jsxs("div",{className:"ex-breadth-bar-wrap",title:`${c.toFixed(0)}% up-volume`,style:{maxWidth:80},children:[e.jsx("div",{className:"ex-breadth-seg",style:{width:`${c}%`,background:"var(--color-up)",opacity:.7}}),e.jsx("div",{className:"ex-breadth-seg",style:{width:`${100-c}%`,background:"var(--color-down)",opacity:.7}})]})]})]})}function Ue({name:n,accentVar:s}){return e.jsxs("div",{className:"ex-unavailable",style:{borderColor:`color-mix(in srgb, var(${s}) 30%, var(--color-border))`},children:[e.jsxs("p",{className:"ex-unavail-title",children:["Live market data for ",n," is not yet available."]}),e.jsx("p",{className:"ex-unavail-body",children:"We're working to connect a live data feed for this exchange. Check back soon."})]})}export{Ve as default};
