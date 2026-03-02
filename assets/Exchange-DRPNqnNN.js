import{r as x,j as e,L as E,l as T,e as f}from"./vendor-9MAh3nQh.js";import{c as y,a as L,b as M,g as w,E as R,X as O,p as v}from"./index-CF7uYZ8u.js";import{N as P,I as z,T as F}from"./NdebelePanel-C_YHhQqb.js";import{c as G}from"./store-Dxzhro6a.js";import"./Sparkline-Sa5-OsUq.js";const H=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}],["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}]],$=y("bookmark-check",H);const U=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}]],D=y("bookmark",U);function K(s){const n=x.useRef(s),[l,r]=x.useState("");return x.useEffect(()=>{if(n.current===s)return;r(s>n.current?"flash-up":"flash-down"),n.current=s;const o=setTimeout(()=>r(""),800);return()=>clearTimeout(o)},[s]),l}function V({pct:s}){const n=s>=0;return e.jsxs("span",{className:`num stock-chg ${n?"text-up":"text-down"}`,style:{display:"inline-block",minWidth:52,textAlign:"right",padding:"1px 5px",borderRadius:3,background:n?"var(--color-up-subtle)":"var(--color-down-subtle)"},children:[n?"+":"",s.toFixed(2),"%"]})}function Z({q:s,exchangeId:n}){const l=K(s.price);return e.jsxs(E,{to:`/exchange/${n}/stock/${encodeURIComponent(s.symbol)}`,className:`st-row ${l}`,children:[e.jsx("span",{className:"st-symbol num",children:s.symbol.replace(`.${n.toUpperCase()}`,"")}),e.jsx("span",{className:"st-name",children:s.name}),e.jsxs("span",{className:"st-price num st-align-r",children:[s.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsx("span",{style:{fontSize:9,color:"var(--color-text-muted)",marginLeft:3},children:s.currency})]}),e.jsx("span",{className:"st-align-r",children:e.jsx(V,{pct:s.changePct})}),e.jsx("span",{className:"st-vol num st-align-r",children:s.volume?(s.volume/1e3).toFixed(0)+"K":"—"})]})}function W({exchangeId:s,quotes:n,isLoading:l,activeSector:r}){const[o,p]=x.useState(""),i=x.useMemo(()=>n.filter(t=>!o||t.symbol.toLowerCase().includes(o.toLowerCase())||t.name.toLowerCase().includes(o.toLowerCase())),[n,o]),c=i.length;return e.jsxs("div",{className:"stocks-table-wrap panel",children:[e.jsxs("div",{className:"st-search-row",children:[e.jsx(L,{size:12}),e.jsx("input",{className:"st-search",placeholder:"Search symbols or names…",value:o,onChange:t=>p(t.target.value)}),e.jsxs("span",{className:"st-count",children:[c," ",r?`(${r})`:"securities"]})]}),e.jsxs("div",{className:"st-header",children:[e.jsx("span",{children:"Symbol"}),e.jsx("span",{children:"Name"}),e.jsx("span",{className:"st-align-r",children:"Price"}),e.jsx("span",{className:"st-align-r",children:"Change"}),e.jsx("span",{className:"st-align-r",children:"Volume"})]}),l?e.jsx("div",{className:"st-empty",children:"Loading…"}):i.length===0?e.jsx("div",{className:"st-empty",children:o?`No results for "${o}"`:"No securities in this sector"}):i.map(t=>e.jsx(Z,{q:t,exchangeId:s},t.symbol)),e.jsx("style",{children:`
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
        .st-row:hover { background: var(--color-bg-hover); }

        .st-symbol { font-size: 12px; font-weight: 700; color: var(--color-gold); }
        .st-name   { font-size: 11px; color: var(--color-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .st-price  { font-size: 12px; color: var(--color-text-primary); }
        .st-vol    { font-size: 11px; color: var(--color-text-muted); }
        .st-align-r { text-align: right; }

        .st-empty {
          padding: 2rem; text-align: center;
          font-size: 12px; color: var(--color-text-muted);
        }
      `})]})}const X={"jse:SBK":"Banking","jse:FSR":"Banking","jse:CPI":"Banking","jse:ABG":"Banking","jse:NED":"Banking","jse:INL":"Banking","jse:SLM":"Insurance","jse:MMH":"Insurance","jse:DSY":"Insurance","jse:OMU":"Insurance","jse:SNT":"Insurance","jse:JSE":"Financial Services","jse:NPN":"Technology","jse:PRX":"Technology","jse:MTN":"Telecoms","jse:VOD":"Telecoms","jse:TKG":"Telecoms","jse:AGL":"Mining","jse:BHP":"Mining","jse:AMS":"Mining","jse:IMP":"Mining","jse:SSW":"Mining","jse:GFI":"Mining","jse:HAR":"Mining","jse:SOL":"Energy","jse:SHP":"Consumer","jse:WHL":"Consumer","jse:PIK":"Consumer","jse:MRP":"Consumer","jse:TFG":"Consumer","jse:CLS":"Consumer","jse:PPH":"Consumer","jse:AVI":"Consumer","jse:BID":"Industrial","jse:REM":"Industrial","jse:MNP":"Industrial","jse:BAW":"Industrial","jse:LHC":"Healthcare","jse:GRT":"Property","jse:RDF":"Property","ngx:GTCO":"Banking","ngx:ZENITH":"Banking","ngx:ACCESS":"Banking","ngx:UBA":"Banking","ngx:FBNH":"Banking","ngx:STANBIC":"Banking","ngx:FIDELITY":"Banking","ngx:FCMB":"Banking","ngx:WEMA":"Banking","ngx:STERLING":"Banking","ngx:STERLNB":"Banking","ngx:MTNN":"Telecoms","ngx:AIRTELAFRI":"Telecoms","ngx:SEPLAT":"Energy","ngx:TOTAL":"Energy","ngx:CONOIL":"Energy","ngx:DANGCEM":"Industrial","ngx:BUACEMENT":"Industrial","ngx:WAPCO":"Industrial","ngx:JBERGER":"Industrial","ngx:NESTLE":"Consumer","ngx:NB":"Consumer","ngx:GUINNESS":"Consumer","ngx:BUAFOODS":"Consumer","ngx:FLOURMILL":"Consumer","ngx:DANGSUGAR":"Consumer","ngx:CADBURY":"Consumer","ngx:UNILEVER":"Consumer","ngx:VITAFOAM":"Consumer","ngx:INTBREW":"Consumer","ngx:PRESCO":"Agriculture","ngx:OKOMUOIL":"Agriculture","ngx:AIICO":"Insurance","ngx:MANSARD":"Insurance","ngx:CUSTODIAN":"Insurance","ngx:UCAP":"Financial Services","ngx:AFRIPRUD":"Financial Services","ngx:TRANSCORP":"Conglomerate","ngx:FIDSON":"Healthcare","nse:SCOM":"Telecoms","nse:EQTY":"Banking","nse:KCB":"Banking","nse:COOP":"Banking","nse:NCBA":"Banking","nse:DTK":"Banking","nse:ABSA":"Banking","nse:SBIC":"Banking","nse:SCBK":"Banking","nse:IMB":"Banking","nse:HF":"Banking","nse:NBK":"Banking","nse:BRIT":"Insurance","nse:JUB":"Insurance","nse:CIC":"Insurance","nse:SLAM":"Insurance","nse:LIB":"Insurance","nse:KNRE":"Insurance","nse:CTUM":"Financial Services","nse:NSE":"Financial Services","nse:KPLC":"Energy","nse:KEGN":"Energy","nse:TOTL":"Energy","nse:EABL":"Consumer","nse:BAT":"Consumer","nse:UNGA":"Consumer","nse:BOC":"Industrial","nse:CARB":"Industrial","nse:CGEN":"Industrial","nse:BAMB":"Industrial","nse:EAPC":"Industrial","nse:ARM":"Industrial","nse:KQ":"Transport","nse:SASN":"Agriculture","nse:WTK":"Agriculture","nse:KAPC":"Agriculture","nse:KUKUZI":"Agriculture","nse:LIMTEA":"Agriculture","nse:NMG":"Media","nse:SGL":"Media","nse:LHBL":"Media","nse:SCAN":"Media","nse:ILAM":"Property","nse:TPS":"Hospitality","gse:GCB":"Banking","gse:EGH":"Banking","gse:SCB":"Banking","gse:CAL":"Banking","gse:SOGEGH":"Banking","gse:ACCESS":"Banking","gse:RBGH":"Banking","gse:MTN":"Telecoms","gse:GGBL":"Consumer","gse:FML":"Consumer","gse:UNIL":"Consumer","gse:GOIL":"Energy","gse:TOTAL":"Energy","gse:BOPP":"Agriculture","gse:EGL":"Insurance","gse:AYRTN":"Healthcare","brvm:SNTS":"Telecoms","brvm:ORAC":"Telecoms","brvm:ONTBF":"Telecoms","brvm:ETIT":"Banking","brvm:SGBCI":"Banking","brvm:BICC":"Banking","brvm:NSBC":"Banking","brvm:BOABF":"Banking","brvm:BOAM":"Banking","brvm:BOAS":"Banking","brvm:PALC":"Agriculture","brvm:SIFCA":"Agriculture","brvm:SOLIBRA":"Consumer","brvm:UNXC":"Consumer","brvm:TTLCI":"Energy","brvm:CFACI":"Industrial","brvm:SMBC":"Industrial","zse:DELTA":"Consumer","zse:INNSCOR":"Consumer","zse:OK":"Consumer","zse:HIPPO":"Agriculture","zse:SEEDCO":"Agriculture","zse:PADENGA":"Agriculture","zse:ECONET":"Telecoms","zse:CBZ":"Banking","zse:FBC":"Banking","zse:ZB":"Banking","zse:NMB":"Banking","zse:FIRST":"Banking","zse:FMLRE":"Insurance","zse:NICOZ":"Insurance","zse:ZIMRE":"Insurance","zse:FIDELITY":"Insurance","zse:TSL":"Industrial","zse:ART":"Industrial","zse:MASIMBA":"Industrial","zse:TURNALL":"Industrial","zse:AFRICAN":"Hospitality","zse:RTG":"Hospitality","bse:FNBB":"Banking","bse:STANBIC":"Banking","bse:ABSA":"Banking","bse:ABCH":"Banking","bse:BIHL":"Insurance","bse:LETSHEGO":"Financial Services","bse:IMARA":"Financial Services","bse:OLYMPIA":"Financial Services","bse:SEFALANA":"Consumer","bse:SB":"Consumer","bse:CHOPPIES":"Consumer","bse:BTCL":"Telecoms","bse:ENGEN":"Energy","bse:CHOBE":"Hospitality","bse:WILDERNESS":"Hospitality","bse:CRESTA":"Hospitality","bse:TURNSTAR":"Property","bse:TLOU":"Energy","luse:ZCCM":"Mining","luse:CEC":"Energy","luse:ZANACO":"Banking","luse:STANDARD":"Banking","luse:INVESTRUST":"Banking","luse:MADISON":"Insurance","luse:PRIMA":"Insurance","luse:ZAMBEEF":"Consumer","luse:ZSUG":"Agriculture","luse:NATBREW":"Consumer","luse:BATA":"Consumer","luse:LAFARGE":"Industrial","luse:REIZ":"Property","luse:PAMODZI":"Hospitality"};function C(s,n){return X[`${s.toLowerCase()}:${n.toUpperCase()}`]??"Other"}const A=["Banking","Insurance","Financial Services","Telecoms","Technology","Mining","Energy","Consumer","Industrial","Agriculture","Healthcare","Media","Property","Hospitality","Transport","Conglomerate","Other"];function Y({exchangeId:s,quotes:n,activeSector:l,onSectorClick:r}){const o=x.useMemo(()=>{const i=new Map;for(const c of n){const t=C(s,c.symbol),d=i.get(t)??{total:0,count:0};i.set(t,{total:d.total+c.changePct,count:d.count+1})}return A.filter(c=>i.has(c)).map(c=>{const{total:t,count:d}=i.get(c),m=t/d;return{sector:c,avg:m,count:d}})},[n,s]);if(o.length===0)return null;const p=Math.max(...o.map(i=>Math.abs(i.avg)),1);return e.jsxs("div",{children:[e.jsx("div",{className:"section-label",children:"Sector Performance"}),e.jsx("div",{className:"hm-grid",children:o.map(({sector:i,avg:c,count:t})=>{const d=Math.min(Math.abs(c)/p,1),m=c>=0,h=m?`rgba(74,222,128,${.05+d*.2})`:`rgba(248,113,113,${.05+d*.2})`,b=m?`rgba(74,222,128,${.18+d*.4})`:`rgba(248,113,113,${.18+d*.4})`,g=l===i;return e.jsxs("button",{className:`hm-cell ${g?"hm-cell--active":""}`,style:{background:h,borderColor:g?m?"var(--color-up)":"var(--color-down)":b},onClick:()=>r?.(g?null:i),title:`${i}: avg ${m?"+":""}${c.toFixed(2)}% across ${t} stock${t!==1?"s":""}`,children:[e.jsx("span",{className:"hm-name",children:i}),e.jsxs("span",{className:`hm-pct num ${m?"text-up":"text-down"}`,children:[m?"+":"",c.toFixed(2),"%"]}),e.jsx("span",{className:"hm-count num",children:t})]},i)})}),e.jsx("style",{children:`
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
      `})]})}const _=G()(M(s=>({presets:[],savePreset(n){const l={...n,id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,createdAt:Date.now()};s(r=>({presets:[...r.presets,l]}))},deletePreset(n){s(l=>({presets:l.presets.filter(r=>r.id!==n)}))}}),{name:"zamani-screener-presets"})),Q={jse:{name:"Johannesburg Stock Exchange",country:"South Africa",flag:"🇿🇦",currency:"ZAR",accentVar:"--color-jse",founded:"1887",mic:"XJSE"},ngx:{name:"Nigerian Exchange Group",country:"Nigeria",flag:"🇳🇬",currency:"NGN",accentVar:"--color-ngx",founded:"1960",mic:"XLAG"},nse:{name:"Nairobi Securities Exchange",country:"Kenya",flag:"🇰🇪",currency:"KES",accentVar:"--color-nse",founded:"1954",mic:"XNAI"},gse:{name:"Ghana Stock Exchange",country:"Ghana",flag:"🇬🇭",currency:"GHS",accentVar:"--color-gse",founded:"1989",mic:"XGHA"},brvm:{name:"Bourse Régionale UEMOA",country:"West Africa",flag:"🇨🇮",currency:"XOF",accentVar:"--color-brvm",founded:"1998",mic:"XBRV"},zse:{name:"Zimbabwe Stock Exchange",country:"Zimbabwe",flag:"🇿🇼",currency:"USD",accentVar:"--color-zse",founded:"1896",mic:"XZIM"},bse:{name:"Botswana Stock Exchange",country:"Botswana",flag:"🇧🇼",currency:"BWP",accentVar:"--color-bse",founded:"1989",mic:"XBOT"},luse:{name:"Lusaka Securities Exchange",country:"Zambia",flag:"🇿🇲",currency:"ZMW",accentVar:"--color-luse",founded:"1994",mic:"XLUS"}};function re(){const{id:s=""}=T(),n=Q[s],l=w(s),[r,o]=x.useState(null),{presets:p,savePreset:i,deletePreset:c}=_(),t=p.filter(a=>a.exchange===s),{data:d,isLoading:m}=f({queryKey:["indices",s],queryFn:()=>v.getIndices?.(s)??Promise.resolve([]),staleTime:6e4,refetchInterval:6e4}),{data:h,isLoading:b}=f({queryKey:["movers",s],queryFn:()=>v.getTopMovers?.(s)??Promise.resolve({gainers:[],losers:[]}),staleTime:6e4,refetchInterval:6e4}),{data:g,isLoading:S}=f({queryKey:["stocks",s],queryFn:()=>v.getExchangeStocks?.(s)??Promise.resolve([]),staleTime:6e4,refetchInterval:6e4}),N=x.useMemo(()=>{if(!g?.length)return[];const a=new Set(g.map(u=>C(s,u.symbol)));return A.filter(u=>a.has(u))},[g,s]),j=x.useMemo(()=>!r||!g?g??[]:g.filter(a=>C(s,a.symbol)===r),[g,r,s]);if(!n)return e.jsx("div",{style:{padding:"2rem",color:"var(--color-text-muted)"},children:"Exchange not found."});const B=(d??[]).filter(a=>a.exchange.toLowerCase()===s),I={"--color-gold":`var(${n.accentVar})`,"--color-gold-dim":`color-mix(in srgb, var(${n.accentVar}) 55%, #000)`,"--color-gold-bright":`color-mix(in srgb, var(${n.accentVar}) 140%, #fff)`,"--color-gold-subtle":`color-mix(in srgb, var(${n.accentVar}) 10%, transparent)`};function k(){if(!r)return;const a=`${s.toUpperCase()} — ${r}`;i({name:a,exchange:s,sectors:[r]})}return e.jsxs("div",{className:"exchange-page",style:I,children:[e.jsxs("div",{className:"ex-header panel",style:{borderLeftColor:`var(${n.accentVar})`},children:[e.jsxs("div",{className:"ex-header-left",children:[e.jsx("span",{className:"ex-flag",children:n.flag}),e.jsxs("div",{children:[e.jsxs("div",{className:"ex-title-row",children:[e.jsx("h1",{className:"ex-name",children:n.name}),e.jsx(R,{id:s})]}),e.jsxs("p",{className:"ex-meta",children:[n.country,n.mic&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-sep",children:"·"}),e.jsx("span",{children:n.mic})]}),n.founded&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-sep",children:"·"}),e.jsxs("span",{children:["Est. ",n.founded]})]}),e.jsx("span",{className:"ex-sep",children:"·"}),e.jsxs("span",{className:"num",children:[l," local"]})]})]})]}),e.jsx(P,{width:80,height:80,color:`var(${n.accentVar})`,opacity:.08,style:{position:"absolute",right:0,top:0}})]}),e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Indices"}),m?e.jsx("p",{className:"ex-loading",children:"Loading…"}):B.length>0?e.jsx("div",{className:"idx-strip",children:B.map(a=>e.jsx(z,{index:a},a.id))}):e.jsxs("p",{className:"ex-loading",children:["No index data for ",n.name," yet."]})]}),(g??[]).length>0&&e.jsx("section",{children:e.jsx(Y,{exchangeId:s,quotes:g??[],activeSector:r,onSectorClick:o})}),N.length>0&&e.jsxs("div",{className:"ex-sector-filters",children:[e.jsx("button",{className:`ex-sector-btn ${r?"":"active"}`,onClick:()=>o(null),children:"All"}),N.map(a=>e.jsx("button",{className:`ex-sector-btn ${r===a?"active":""}`,onClick:()=>o(u=>u===a?null:a),children:a},a)),r&&e.jsxs("button",{className:"ex-save-preset-btn",onClick:k,title:`Save "${r}" filter as preset`,children:[e.jsx(D,{size:11})," Save filter"]}),t.length>0&&e.jsx("div",{className:"ex-presets",children:t.map(a=>e.jsxs("span",{className:`ex-preset-chip ${r===a.sectors[0]?"active":""}`,onClick:()=>o(u=>u===a.sectors[0]?null:a.sectors[0]),children:[e.jsx($,{size:9}),a.name.split("—")[1]?.trim()??a.name,e.jsx("button",{className:"ex-preset-del",onClick:u=>{u.stopPropagation(),c(a.id)},"aria-label":"Remove preset",children:e.jsx(O,{size:8})})]},a.id))})]}),e.jsxs("div",{className:"ex-cols",children:[e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Top Movers"}),b?e.jsx("p",{className:"ex-loading",children:"Loading…"}):e.jsx(F,{gainers:h?.gainers??[],losers:h?.losers??[]})]}),e.jsxs("section",{className:"ex-stocks-col",children:[e.jsx("div",{className:"section-label",children:r?`${r} Securities`:"All Securities"}),e.jsx(W,{exchangeId:s,quotes:j,isLoading:S,activeSector:r})]})]}),e.jsx("style",{children:`
        .exchange-page { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1200px; }

        .ex-header {
          padding: 1rem 1.25rem; position: relative; overflow: hidden;
          border-left: 3px solid transparent;
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

        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
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
          .ex-cols { grid-template-columns: 1fr; }
        }
      `})]})}export{re as default};
