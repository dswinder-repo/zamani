import{j as e,r as p,L as V,l as K,e as w}from"./vendor-9MAh3nQh.js";import{c as z,f as W,b as X,h as Z,E as _,X as Y,i as Q,Y as J,e as B,p as A}from"./index-4AEG-TBf.js";import{d as q}from"./csvExport-JVihQZGh.js";import{S as ee}from"./Sparkline-Sa5-OsUq.js";import{N as re,T as ne,g as se,a as ae,b as oe}from"./NdebelePanel-kXLuUIXd.js";import{R as te,b as ie,T as ce}from"./recharts-WEknt4oI.js";import{c as le}from"./store-DR-NtvzW.js";import{D as de}from"./download-BQC880ss.js";const xe=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}],["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}]],ge=z("bookmark-check",xe);const me=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}]],pe=z("bookmark",me);function P(r){return r>=1e6?(r/1e6).toFixed(2)+"M":r>=1e3?r.toLocaleString(void 0,{maximumFractionDigits:0}):r.toFixed(2)}function ue({index:r}){const n=r.changePct>=0,i=n?"+":"";return e.jsxs("div",{className:"idx-card panel",children:[e.jsxs("div",{className:"idx-header",children:[e.jsx("span",{className:"idx-exchange",children:r.exchange}),e.jsxs("span",{className:`idx-badge ${n?"up":"down"}`,children:[i,r.changePct.toFixed(2),"%"]})]}),e.jsx("div",{className:"idx-name",children:r.name}),e.jsxs("div",{className:"idx-body",children:[e.jsxs("div",{children:[e.jsx("span",{className:"num idx-value",children:P(r.value)}),e.jsxs("span",{className:"idx-currency",children:[" ",r.currency]})]}),e.jsxs("div",{className:`num idx-change ${n?"text-up":"text-down"}`,children:[i,P(r.change)]})]}),e.jsx(ee,{data:r.sparkline,up:n,height:36}),e.jsx("style",{children:`
        .idx-card {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          padding: 0.75rem;
          min-width: 160px;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .idx-card:hover { border-color: var(--color-border); }

        .idx-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .idx-exchange {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .idx-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 1px 5px;
          border-radius: 3px;
          font-weight: 600;
        }
        .idx-badge.up   { color: var(--color-up);   background: var(--color-up-subtle);   }
        .idx-badge.down { color: var(--color-down); background: var(--color-down-subtle); }

        .idx-name {
          font-size: 11px;
          color: var(--color-text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .idx-body {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .idx-value    { font-size: 18px; font-weight: 700; color: var(--color-text-primary); }
        .idx-currency { font-size: 10px; color: var(--color-text-muted); }
        .idx-change   { font-size: 11px; }
      `})]})}function he(r){const n=p.useRef(r),[i,o]=p.useState("");return p.useEffect(()=>{if(n.current===r)return;o(r>n.current?"flash-up":"flash-down"),n.current=r;const s=setTimeout(()=>o(""),800);return()=>clearTimeout(s)},[r]),i}function be({pct:r}){const n=r>=0;return e.jsxs("span",{className:`num stock-chg ${n?"text-up":"text-down"}`,style:{display:"inline-block",minWidth:52,textAlign:"right",padding:"1px 5px",borderRadius:3,background:n?"var(--color-up-subtle)":"var(--color-down-subtle)"},children:[n?"+":"",r.toFixed(2),"%"]})}function ve({q:r,exchangeId:n}){const i=he(r.price);return e.jsxs(V,{to:`/exchange/${n}/stock/${encodeURIComponent(r.symbol)}`,className:`st-row ${i}`,children:[e.jsx("span",{className:"st-symbol num",children:r.symbol.replace(`.${n.toUpperCase()}`,"")}),e.jsx("span",{className:"st-name",children:r.name}),e.jsxs("span",{className:"st-price num st-align-r",children:[r.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsx("span",{style:{fontSize:9,color:"var(--color-text-muted)",marginLeft:3},children:r.currency})]}),e.jsx("span",{className:"st-align-r",children:e.jsx(be,{pct:r.changePct})}),e.jsx("span",{className:"st-vol num st-align-r",children:r.volume?(r.volume/1e3).toFixed(0)+"K":"—"})]})}function fe({exchangeId:r,quotes:n,isLoading:i,activeSector:o}){const[s,l]=p.useState(""),c=p.useMemo(()=>n.filter(x=>!s||x.symbol.toLowerCase().includes(s.toLowerCase())||x.name.toLowerCase().includes(s.toLowerCase())),[n,s]),d=c.length;return e.jsxs("div",{className:"stocks-table-wrap panel",children:[e.jsxs("div",{className:"st-search-row",children:[e.jsx(W,{size:12}),e.jsx("input",{className:"st-search",placeholder:"Search symbols or names…",value:s,onChange:x=>l(x.target.value)}),e.jsxs("span",{className:"st-count",children:[d," ",o?`(${o})`:"securities"]})]}),e.jsxs("div",{className:"st-header",children:[e.jsx("span",{children:"Symbol"}),e.jsx("span",{children:"Name"}),e.jsx("span",{className:"st-align-r",children:"Price"}),e.jsx("span",{className:"st-align-r",children:"Change"}),e.jsx("span",{className:"st-align-r",children:"Volume"})]}),i?e.jsx("div",{className:"st-empty",children:"Loading…"}):c.length===0?e.jsx("div",{className:"st-empty",children:s?`No results for "${s}"`:"No securities in this sector"}):c.map(x=>e.jsx(ve,{q:x,exchangeId:r},x.symbol)),e.jsx("style",{children:`
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
      `})]})}const ye={"jse:SBK":"Banking","jse:FSR":"Banking","jse:CPI":"Banking","jse:ABG":"Banking","jse:NED":"Banking","jse:INL":"Banking","jse:SLM":"Insurance","jse:MMH":"Insurance","jse:DSY":"Insurance","jse:OMU":"Insurance","jse:SNT":"Insurance","jse:JSE":"Financial Services","jse:NPN":"Technology","jse:PRX":"Technology","jse:MTN":"Telecoms","jse:VOD":"Telecoms","jse:TKG":"Telecoms","jse:AGL":"Mining","jse:BHP":"Mining","jse:AMS":"Mining","jse:IMP":"Mining","jse:SSW":"Mining","jse:GFI":"Mining","jse:HAR":"Mining","jse:SOL":"Energy","jse:SHP":"Consumer","jse:WHL":"Consumer","jse:PIK":"Consumer","jse:MRP":"Consumer","jse:TFG":"Consumer","jse:CLS":"Consumer","jse:PPH":"Consumer","jse:AVI":"Consumer","jse:BID":"Industrial","jse:REM":"Industrial","jse:MNP":"Industrial","jse:BAW":"Industrial","jse:LHC":"Healthcare","jse:GRT":"Property","jse:RDF":"Property","ngx:GTCO":"Banking","ngx:ZENITH":"Banking","ngx:ACCESS":"Banking","ngx:UBA":"Banking","ngx:FBNH":"Banking","ngx:STANBIC":"Banking","ngx:FIDELITY":"Banking","ngx:FCMB":"Banking","ngx:WEMA":"Banking","ngx:STERLING":"Banking","ngx:STERLNB":"Banking","ngx:MTNN":"Telecoms","ngx:AIRTELAFRI":"Telecoms","ngx:SEPLAT":"Energy","ngx:TOTAL":"Energy","ngx:CONOIL":"Energy","ngx:DANGCEM":"Industrial","ngx:BUACEMENT":"Industrial","ngx:WAPCO":"Industrial","ngx:JBERGER":"Industrial","ngx:NESTLE":"Consumer","ngx:NB":"Consumer","ngx:GUINNESS":"Consumer","ngx:BUAFOODS":"Consumer","ngx:FLOURMILL":"Consumer","ngx:DANGSUGAR":"Consumer","ngx:CADBURY":"Consumer","ngx:UNILEVER":"Consumer","ngx:VITAFOAM":"Consumer","ngx:INTBREW":"Consumer","ngx:PRESCO":"Agriculture","ngx:OKOMUOIL":"Agriculture","ngx:AIICO":"Insurance","ngx:MANSARD":"Insurance","ngx:CUSTODIAN":"Insurance","ngx:UCAP":"Financial Services","ngx:AFRIPRUD":"Financial Services","ngx:TRANSCORP":"Conglomerate","ngx:FIDSON":"Healthcare","nse:SCOM":"Telecoms","nse:EQTY":"Banking","nse:KCB":"Banking","nse:COOP":"Banking","nse:NCBA":"Banking","nse:DTK":"Banking","nse:ABSA":"Banking","nse:SBIC":"Banking","nse:SCBK":"Banking","nse:IMB":"Banking","nse:HF":"Banking","nse:NBK":"Banking","nse:BRIT":"Insurance","nse:JUB":"Insurance","nse:CIC":"Insurance","nse:SLAM":"Insurance","nse:LIB":"Insurance","nse:KNRE":"Insurance","nse:CTUM":"Financial Services","nse:NSE":"Financial Services","nse:KPLC":"Energy","nse:KEGN":"Energy","nse:TOTL":"Energy","nse:EABL":"Consumer","nse:BAT":"Consumer","nse:UNGA":"Consumer","nse:BOC":"Industrial","nse:CARB":"Industrial","nse:CGEN":"Industrial","nse:BAMB":"Industrial","nse:EAPC":"Industrial","nse:ARM":"Industrial","nse:KQ":"Transport","nse:SASN":"Agriculture","nse:WTK":"Agriculture","nse:KAPC":"Agriculture","nse:KUKUZI":"Agriculture","nse:LIMTEA":"Agriculture","nse:NMG":"Media","nse:SGL":"Media","nse:LHBL":"Media","nse:SCAN":"Media","nse:ILAM":"Property","nse:TPS":"Hospitality","gse:GCB":"Banking","gse:EGH":"Banking","gse:SCB":"Banking","gse:CAL":"Banking","gse:SOGEGH":"Banking","gse:ACCESS":"Banking","gse:RBGH":"Banking","gse:MTN":"Telecoms","gse:GGBL":"Consumer","gse:FML":"Consumer","gse:UNIL":"Consumer","gse:GOIL":"Energy","gse:TOTAL":"Energy","gse:BOPP":"Agriculture","gse:EGL":"Insurance","gse:AYRTN":"Healthcare","brvm:SNTS":"Telecoms","brvm:ORAC":"Telecoms","brvm:ONTBF":"Telecoms","brvm:ETIT":"Banking","brvm:SGBCI":"Banking","brvm:BICC":"Banking","brvm:NSBC":"Banking","brvm:BOABF":"Banking","brvm:BOAM":"Banking","brvm:BOAS":"Banking","brvm:PALC":"Agriculture","brvm:SIFCA":"Agriculture","brvm:SOLIBRA":"Consumer","brvm:UNXC":"Consumer","brvm:TTLCI":"Energy","brvm:CFACI":"Industrial","brvm:SMBC":"Industrial","zse:DELTA":"Consumer","zse:INNSCOR":"Consumer","zse:OK":"Consumer","zse:HIPPO":"Agriculture","zse:SEEDCO":"Agriculture","zse:PADENGA":"Agriculture","zse:ECONET":"Telecoms","zse:CBZ":"Banking","zse:FBC":"Banking","zse:ZB":"Banking","zse:NMB":"Banking","zse:FIRST":"Banking","zse:FMLRE":"Insurance","zse:NICOZ":"Insurance","zse:ZIMRE":"Insurance","zse:FIDELITY":"Insurance","zse:TSL":"Industrial","zse:ART":"Industrial","zse:MASIMBA":"Industrial","zse:TURNALL":"Industrial","zse:AFRICAN":"Hospitality","zse:RTG":"Hospitality","bse:FNBB":"Banking","bse:STANBIC":"Banking","bse:ABSA":"Banking","bse:ABCH":"Banking","bse:BIHL":"Insurance","bse:LETSHEGO":"Financial Services","bse:IMARA":"Financial Services","bse:OLYMPIA":"Financial Services","bse:SEFALANA":"Consumer","bse:SB":"Consumer","bse:CHOPPIES":"Consumer","bse:BTCL":"Telecoms","bse:ENGEN":"Energy","bse:CHOBE":"Hospitality","bse:WILDERNESS":"Hospitality","bse:CRESTA":"Hospitality","bse:TURNSTAR":"Property","bse:TLOU":"Energy","use:SBU":"Banking","use:DFCU":"Banking","use:BOBU":"Banking","use:EBL":"Banking","use:KCB":"Banking","use:NIC":"Insurance","use:JHL":"Insurance","use:MTNU":"Telecoms","use:AIRTEL UGANDA":"Telecoms","use:EABL":"Consumer","use:BATU":"Consumer","use:NMG":"Media","use:NVL":"Media","use:UMEM":"Energy","use:QCIL":"Healthcare","use:UCL":"Industrial","use:CENT":"Financial Services","use:KA":"Transport","luse:ZCCM":"Mining","luse:CEC":"Energy","luse:ZANACO":"Banking","luse:STANDARD":"Banking","luse:INVESTRUST":"Banking","luse:MADISON":"Insurance","luse:PRIMA":"Insurance","luse:ZAMBEEF":"Consumer","luse:ZSUG":"Agriculture","luse:NATBREW":"Consumer","luse:BATA":"Consumer","luse:LAFARGE":"Industrial","luse:REIZ":"Property","luse:PAMODZI":"Hospitality"};function j(r,n){return ye[`${r.toLowerCase()}:${n.toUpperCase()}`]??"Other"}const R=["Banking","Insurance","Financial Services","Telecoms","Technology","Mining","Energy","Consumer","Industrial","Agriculture","Healthcare","Media","Property","Hospitality","Transport","Conglomerate","Other"];function je({exchangeId:r,quotes:n,activeSector:i,onSectorClick:o}){const s=p.useMemo(()=>{const c=new Map;for(const d of n){const x=j(r,d.symbol),m=c.get(x)??{total:0,count:0};c.set(x,{total:m.total+d.changePct,count:m.count+1})}return R.filter(d=>c.has(d)).map(d=>{const{total:x,count:m}=c.get(d),u=x/m;return{sector:d,avg:u,count:m}})},[n,r]);if(s.length===0)return null;const l=Math.max(...s.map(c=>Math.abs(c.avg)),1);return e.jsxs("div",{children:[e.jsx("div",{className:"section-label",children:"Sector Performance"}),e.jsx("div",{className:"hm-grid",children:s.map(({sector:c,avg:d,count:x})=>{const m=Math.min(Math.abs(d)/l,1),u=d>=0,y=u?`rgba(74,222,128,${.05+m*.2})`:`rgba(248,113,113,${.05+m*.2})`,v=u?`rgba(74,222,128,${.18+m*.4})`:`rgba(248,113,113,${.18+m*.4})`,h=i===c;return e.jsxs("button",{className:`hm-cell ${h?"hm-cell--active":""}`,style:{background:y,borderColor:h?u?"var(--color-up)":"var(--color-down)":v},onClick:()=>o?.(h?null:c),title:`${c}: avg ${u?"+":""}${d.toFixed(2)}% across ${x} stock${x!==1?"s":""}`,children:[e.jsx("span",{className:"hm-name",children:c}),e.jsxs("span",{className:`hm-pct num ${u?"text-up":"text-down"}`,children:[u?"+":"",d.toFixed(2),"%"]}),e.jsx("span",{className:"hm-count num",children:x})]},c)})}),e.jsx("style",{children:`
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
      `})]})}function Ne(r){return r>=4?"#00c853":r>=2?"#43a047":r>=.5?"#2e7d32":r>=-.5?"#455a64":r>=-2?"#c62828":r>=-4?"#e53935":"#b71c1c"}function Ce(r){const{x:n=0,y:i=0,width:o=0,height:s=0,changePct:l=0,symbol:c,name:d}=r,x=Ne(l),m=o>35&&s>20;return e.jsxs("g",{children:[e.jsx("rect",{x:n+1,y:i+1,width:o-2,height:s-2,fill:x,fillOpacity:.85,stroke:"rgba(0,0,0,0.3)",strokeWidth:1,rx:2}),m&&e.jsxs(e.Fragment,{children:[e.jsx("text",{x:n+o/2,y:i+s/2-(s>36?8:0),textAnchor:"middle",dominantBaseline:"middle",fill:"#fff",fontSize:Math.min(11,o/5),fontWeight:700,fontFamily:"var(--font-mono)",children:c??d}),s>36&&e.jsxs("text",{x:n+o/2,y:i+s/2+10,textAnchor:"middle",dominantBaseline:"middle",fill:"rgba(255,255,255,0.7)",fontSize:9,fontFamily:"var(--font-mono)",children:[l>=0?"+":"",l.toFixed(2),"%"]})]})]})}function ke({active:r,payload:n}){if(!r||!n?.length)return null;const i=n[0].payload;if(!i.symbol)return null;const o=i.changePct??0,s=o>=0;return e.jsxs("div",{style:{background:"var(--color-bg-elevated)",border:"1px solid var(--color-border)",borderRadius:4,padding:"6px 10px",fontSize:11,fontFamily:"var(--font-mono)",boxShadow:"0 4px 12px rgba(0,0,0,0.5)"},children:[e.jsx("div",{style:{fontWeight:700,color:"var(--color-gold)"},children:i.symbol}),e.jsxs("div",{style:{color:s?"var(--color-up)":"var(--color-down)",fontWeight:600},children:[s?"+":"",o.toFixed(2),"%"]})]})}function Se({exchangeId:r,quotes:n}){const i=p.useMemo(()=>{const o={};for(const s of n){const l=j(r,s.symbol);o[l]||(o[l]=[]);const c=Math.max(1,Math.round(s.price*(s.volume??1e3)));o[l].push({name:s.name??s.symbol,symbol:s.symbol,size:c,changePct:s.changePct})}return Object.entries(o).map(([s,l])=>({name:s,children:l.sort((c,d)=>(d.size??0)-(c.size??0))}))},[n,r]);return n.length?e.jsx("div",{style:{width:"100%",height:280},children:e.jsx(te,{children:e.jsx(ie,{data:i,dataKey:"size",aspectRatio:4/3,content:o=>{const s=o;return(s.depth??0)<2?e.jsx("rect",{x:s.x,y:s.y,width:s.width,height:s.height,fill:"none"}):e.jsx(Ce,{x:s.x,y:s.y,width:s.width,height:s.height,name:s.name,changePct:s.changePct??0,symbol:s.symbol})},children:e.jsx(ce,{content:e.jsx(ke,{})})})})}):null}const we=le()(X(r=>({presets:[],savePreset(n){const i={...n,id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,createdAt:Date.now()};r(o=>({presets:[...o.presets,i]}))},deletePreset(n){r(i=>({presets:i.presets.filter(o=>o.id!==n)}))}}),{name:"zamani-screener-presets"})),Be={jse:{name:"Johannesburg Stock Exchange",country:"South Africa",flag:"🇿🇦",currency:"ZAR",accentVar:"--color-jse",founded:"1887",mic:"XJSE"},ngx:{name:"Nigerian Exchange Group",country:"Nigeria",flag:"🇳🇬",currency:"NGN",accentVar:"--color-ngx",founded:"1960",mic:"XLAG"},nse:{name:"Nairobi Securities Exchange",country:"Kenya",flag:"🇰🇪",currency:"KES",accentVar:"--color-nse",founded:"1954",mic:"XNAI"},gse:{name:"Ghana Stock Exchange",country:"Ghana",flag:"🇬🇭",currency:"GHS",accentVar:"--color-gse",founded:"1989",mic:"XGHA"},brvm:{name:"Bourse Régionale UEMOA",country:"West Africa",flag:"🇨🇮",currency:"XOF",accentVar:"--color-brvm",founded:"1998",mic:"XBRV"},zse:{name:"Zimbabwe Stock Exchange",country:"Zimbabwe",flag:"🇿🇼",currency:"USD",accentVar:"--color-zse",founded:"1896",mic:"XZIM"},bse:{name:"Botswana Stock Exchange",country:"Botswana",flag:"🇧🇼",currency:"BWP",accentVar:"--color-bse",founded:"1989",mic:"XBOT"},luse:{name:"Lusaka Securities Exchange",country:"Zambia",flag:"🇿🇲",currency:"ZMW",accentVar:"--color-luse",founded:"1994",mic:"XLUS"},use:{name:"Uganda Securities Exchange",country:"Uganda",flag:"🇺🇬",currency:"UGX",accentVar:"--color-use",founded:"1997",mic:"XUGA"},egx:{name:"Egyptian Exchange",country:"Egypt",flag:"🇪🇬",currency:"EGP",accentVar:"--color-egx",founded:"1883",mic:"XCAI"}};function Oe(){const{id:r=""}=K(),n=Be[r],i=Z(r),[o,s]=p.useState(null),[l,c]=p.useState("all"),{presets:d,savePreset:x,deletePreset:m}=we(),u=d.filter(a=>a.exchange===r),y=r==="use",v=Q.includes(r),h=J.includes(r)||v,f=v?432e5:6e4,{data:F,isLoading:O}=w({queryKey:["indices",r],queryFn:y?()=>se():v?()=>B.getIndices(r):()=>A.getIndices?.(r)??Promise.resolve([]),staleTime:f,refetchInterval:f}),{data:I,isLoading:U}=w({queryKey:["movers",r],queryFn:y?()=>ae():v?()=>B.getTopMovers(r):()=>A.getTopMovers?.(r)??Promise.resolve({gainers:[],losers:[]}),staleTime:f,refetchInterval:f}),{data:g,isLoading:N}=w({queryKey:["stocks",r],queryFn:y?()=>oe():v?()=>B.getExchangeStocks(r):()=>A.getExchangeStocks?.(r)??Promise.resolve([]),staleTime:f,refetchInterval:f}),E=p.useMemo(()=>{if(!g?.length)return[];const a=new Set(g.map(t=>j(r,t.symbol)));return R.filter(t=>a.has(t))},[g,r]),C=p.useMemo(()=>{let a=g??[];return o&&(a=a.filter(t=>j(r,t.symbol)===o)),l==="gainers"&&(a=a.filter(t=>t.changePct>0)),l==="losers"&&(a=a.filter(t=>t.changePct<0)),l==="active"&&(a=[...a].sort((t,k)=>(k.volume??0)-(t.volume??0)).slice(0,15)),a},[g,o,l,r]),T=p.useMemo(()=>g?.length?[...g].filter(a=>Math.abs(a.changePct)>=2).sort((a,t)=>Math.abs(t.changePct)-Math.abs(a.changePct)).slice(0,12):[],[g]),M=p.useMemo(()=>{if(!g?.length)return null;const a=g.filter(b=>b.changePct>0).length,t=g.filter(b=>b.changePct<0).length,k=g.length-a-t,H=g.filter(b=>b.changePct>0).reduce((b,S)=>b+(S.volume??0),0),D=g.filter(b=>b.changePct<0).reduce((b,S)=>b+(S.volume??0),0);return{advancing:a,declining:t,unchanged:k,upVol:H,downVol:D,total:g.length}},[g]);if(!n)return e.jsx("div",{style:{padding:"2rem",color:"var(--color-text-muted)"},children:"Exchange not found."});const L=(F??[]).filter(a=>a.exchange.toLowerCase()===r),$={"--color-gold":`var(${n.accentVar})`,"--color-gold-dim":`color-mix(in srgb, var(${n.accentVar}) 55%, #000)`,"--color-gold-bright":`color-mix(in srgb, var(${n.accentVar}) 140%, #fff)`,"--color-gold-subtle":`color-mix(in srgb, var(${n.accentVar}) 10%, transparent)`};function G(){if(!o)return;const a=`${r.toUpperCase()} — ${o}`;x({name:a,exchange:r,sectors:[o]})}return e.jsxs("div",{className:"exchange-page",style:$,children:[e.jsxs("div",{className:"ex-header panel",style:{borderLeftColor:`var(${n.accentVar})`},children:[e.jsxs("div",{className:"ex-header-left",children:[e.jsx("span",{className:"ex-flag",children:n.flag}),e.jsxs("div",{children:[e.jsxs("div",{className:"ex-title-row",children:[e.jsx("h1",{className:"ex-name",children:n.name}),e.jsx(_,{id:r})]}),e.jsxs("p",{className:"ex-meta",children:[n.country,n.mic&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-sep",children:"·"}),e.jsx("span",{children:n.mic})]}),n.founded&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-sep",children:"·"}),e.jsxs("span",{children:["Est. ",n.founded]})]}),e.jsx("span",{className:"ex-sep",children:"·"}),e.jsxs("span",{className:"num",children:[i," local"]})]})]})]}),e.jsx(re,{width:80,height:80,color:`var(${n.accentVar})`,opacity:.08,style:{position:"absolute",right:0,top:0}})]}),e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Indices"}),O?e.jsx("p",{className:"ex-loading",children:"Loading…"}):L.length>0?e.jsx("div",{className:"idx-strip",children:L.map(a=>e.jsx(ue,{index:a},a.id))}):e.jsx("p",{className:"ex-loading",children:h?`No index data available for ${n.name}.`:"Live index data for this exchange is not yet connected."})]}),h&&(g??[]).length>0&&e.jsx("section",{children:e.jsx(je,{exchangeId:r,quotes:g??[],activeSector:o,onSectorClick:s})}),h&&(g??[]).length>0&&r==="jse"&&e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Sector Treemap"}),e.jsx("div",{className:"panel",style:{padding:"0.75rem"},children:e.jsx(Se,{exchangeId:r,quotes:g??[]})})]}),h&&E.length>0&&e.jsxs("div",{className:"ex-sector-filters",children:[e.jsx("button",{className:`ex-sector-btn ${o?"":"active"}`,onClick:()=>s(null),children:"All"}),E.map(a=>e.jsx("button",{className:`ex-sector-btn ${o===a?"active":""}`,onClick:()=>s(t=>t===a?null:a),children:a},a)),o&&e.jsxs("button",{className:"ex-save-preset-btn",onClick:G,title:`Save "${o}" filter as preset`,children:[e.jsx(pe,{size:11})," Save filter"]}),u.length>0&&e.jsx("div",{className:"ex-presets",children:u.map(a=>e.jsxs("span",{className:`ex-preset-chip ${o===a.sectors[0]?"active":""}`,onClick:()=>s(t=>t===a.sectors[0]?null:a.sectors[0]),children:[e.jsx(ge,{size:9}),a.name.split("—")[1]?.trim()??a.name,e.jsx("button",{className:"ex-preset-del",onClick:t=>{t.stopPropagation(),m(a.id)},"aria-label":"Remove preset",children:e.jsx(Y,{size:8})})]},a.id))})]}),h&&T.length>0&&!N&&e.jsxs("div",{className:"ex-moving-wrap",children:[e.jsx("span",{className:"ex-moving-label",children:"Moving"}),e.jsx("div",{className:"ex-moving-strip",children:T.map(a=>{const t=a.changePct>=0;return e.jsxs("span",{className:`ex-moving-chip ${t?"up":"down"}`,children:[e.jsx("span",{className:"ex-moving-sym",children:a.symbol}),e.jsxs("span",{className:"ex-moving-pct",children:[t?"+":"",a.changePct.toFixed(2),"%"]})]},a.symbol)})})]}),h&&M&&!N&&e.jsx(Ae,{breadth:M}),h?e.jsxs("div",{className:"ex-cols",children:[e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Top Movers"}),U?e.jsx("p",{className:"ex-loading",children:"Loading…"}):e.jsx(ne,{gainers:I?.gainers??[],losers:I?.losers??[]})]}),e.jsxs("section",{className:"ex-stocks-col",children:[e.jsxs("div",{className:"ex-stocks-header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx("div",{className:"section-label",children:o?`${o} Securities`:"All Securities"}),v&&e.jsx("span",{className:"ex-eod-badge",children:"End-of-day"})]}),e.jsxs("div",{className:"ex-screener-tabs",children:[["all","gainers","losers","active"].map(a=>e.jsx("button",{className:`ex-screener-tab ${l===a?"active":""}`,onClick:()=>c(a),children:a==="active"?"Most Active":a.charAt(0).toUpperCase()+a.slice(1)},a)),C.length>0&&e.jsx("button",{className:"ex-screener-tab",title:"Export CSV",onClick:()=>{const a=[["Symbol","Name","Price","Change","Change %","Volume","Currency"],...C.map(t=>[t.symbol,t.name,t.price,t.change,t.changePct,t.volume??"",t.currency])];q(a,`${r.toUpperCase()}-stocks.csv`)},children:e.jsx(de,{size:10})})]})]}),e.jsx(fe,{exchangeId:r,quotes:C,isLoading:N,activeSector:o})]})]}):e.jsx(Ie,{name:n.name,accentVar:n.accentVar}),e.jsx("style",{children:`
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
      `})]})}function Ae({breadth:r}){const n=r.advancing/r.total*100,i=r.declining/r.total*100,o=100-n-i,s=r.upVol+r.downVol,l=s?r.upVol/s*100:50;return e.jsxs("div",{className:"ex-breadth",children:[e.jsx("span",{className:"ex-breadth-label",children:"Breadth"}),e.jsxs("div",{className:"ex-breadth-stat",children:[e.jsx("span",{className:"ex-breadth-dot",style:{background:"var(--color-up)"}}),e.jsx("span",{style:{color:"var(--color-up)"},children:r.advancing}),e.jsx("span",{style:{color:"var(--color-text-muted)"},children:"adv"})]}),e.jsxs("div",{className:"ex-breadth-stat",children:[e.jsx("span",{className:"ex-breadth-dot",style:{background:"var(--color-down)"}}),e.jsx("span",{style:{color:"var(--color-down)"},children:r.declining}),e.jsx("span",{style:{color:"var(--color-text-muted)"},children:"dec"})]}),r.unchanged>0&&e.jsxs("div",{className:"ex-breadth-stat",children:[e.jsx("span",{className:"ex-breadth-dot",style:{background:"var(--color-text-muted)"}}),e.jsxs("span",{style:{color:"var(--color-text-muted)"},children:[r.unchanged," unch"]})]}),e.jsxs("div",{className:"ex-breadth-bar-wrap",title:`${n.toFixed(0)}% advancing`,children:[e.jsx("div",{className:"ex-breadth-seg",style:{width:`${n}%`,background:"var(--color-up)",opacity:.7}}),e.jsx("div",{className:"ex-breadth-seg",style:{width:`${o}%`,background:"var(--color-border)"}}),e.jsx("div",{className:"ex-breadth-seg",style:{width:`${i}%`,background:"var(--color-down)",opacity:.7}})]}),s>0&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-breadth-label",style:{marginLeft:4},children:"Vol"}),e.jsxs("div",{className:"ex-breadth-bar-wrap",title:`${l.toFixed(0)}% up-volume`,style:{maxWidth:80},children:[e.jsx("div",{className:"ex-breadth-seg",style:{width:`${l}%`,background:"var(--color-up)",opacity:.7}}),e.jsx("div",{className:"ex-breadth-seg",style:{width:`${100-l}%`,background:"var(--color-down)",opacity:.7}})]})]})]})}function Ie({name:r,accentVar:n}){return e.jsxs("div",{className:"ex-unavailable",style:{borderColor:`color-mix(in srgb, var(${n}) 30%, var(--color-border))`},children:[e.jsxs("p",{className:"ex-unavail-title",children:["Live market data for ",r," is not yet available."]}),e.jsx("p",{className:"ex-unavail-body",children:"We're working to connect a live data feed for this exchange. Check back soon."})]})}export{Oe as default};
