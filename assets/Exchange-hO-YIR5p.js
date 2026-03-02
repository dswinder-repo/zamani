import{r as x,j as e,L as h,l as u,e as i}from"./vendor-9MAh3nQh.js";import{a as f,g as v,E as y,p as d}from"./index-C9A4Yjp8.js";import{N as j,I as b,T as N}from"./NdebelePanel-C_YHhQqb.js";import"./store-Dxzhro6a.js";import"./Sparkline-Sa5-OsUq.js";function w({pct:a}){const s=a>=0;return e.jsxs("span",{className:`num stock-chg ${s?"text-up":"text-down"}`,style:{display:"inline-block",minWidth:52,textAlign:"right",padding:"1px 5px",borderRadius:3,background:s?"var(--color-up-subtle)":"var(--color-down-subtle)"},children:[s?"+":"",a.toFixed(2),"%"]})}function k({exchangeId:a,quotes:s,isLoading:c}){const[o,l]=x.useState(""),n=x.useMemo(()=>s.filter(r=>!o||r.symbol.toLowerCase().includes(o.toLowerCase())||r.name.toLowerCase().includes(o.toLowerCase())),[s,o]);return e.jsxs("div",{className:"stocks-table-wrap panel",children:[e.jsxs("div",{className:"st-search-row",children:[e.jsx(f,{size:12}),e.jsx("input",{className:"st-search",placeholder:"Search symbols or names…",value:o,onChange:r=>l(r.target.value)}),e.jsxs("span",{className:"st-count",children:[n.length," securities"]})]}),e.jsxs("div",{className:"st-header",children:[e.jsx("span",{children:"Symbol"}),e.jsx("span",{children:"Name"}),e.jsx("span",{className:"st-align-r",children:"Price"}),e.jsx("span",{className:"st-align-r",children:"Change"}),e.jsx("span",{className:"st-align-r",children:"Volume"})]}),c?e.jsx("div",{className:"st-empty",children:"Loading…"}):n.length===0?e.jsxs("div",{className:"st-empty",children:['No results for "',o,'"']}):n.map(r=>e.jsxs(h,{to:`/exchange/${a}/stock/${encodeURIComponent(r.symbol)}`,className:"st-row",children:[e.jsx("span",{className:"st-symbol num",children:r.symbol.replace(`.${a.toUpperCase()}`,"")}),e.jsx("span",{className:"st-name",children:r.name}),e.jsxs("span",{className:"st-price num st-align-r",children:[r.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),e.jsx("span",{style:{fontSize:9,color:"var(--color-text-muted)",marginLeft:3},children:r.currency})]}),e.jsx("span",{className:"st-align-r",children:e.jsx(w,{pct:r.changePct})}),e.jsx("span",{className:"st-vol num st-align-r",children:r.volume?(r.volume/1e3).toFixed(0)+"K":"—"})]},r.symbol)),e.jsx("style",{children:`
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
        .st-count { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }

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
      `})]})}const L={jse:{name:"Johannesburg Stock Exchange",country:"South Africa",flag:"🇿🇦",currency:"ZAR",accentVar:"--color-jse",founded:"1887",mic:"XJSE"},ngx:{name:"Nigerian Exchange Group",country:"Nigeria",flag:"🇳🇬",currency:"NGN",accentVar:"--color-ngx",founded:"1960",mic:"XLAG"},nse:{name:"Nairobi Securities Exchange",country:"Kenya",flag:"🇰🇪",currency:"KES",accentVar:"--color-nse",founded:"1954",mic:"XNAI"},gse:{name:"Ghana Stock Exchange",country:"Ghana",flag:"🇬🇭",currency:"GHS",accentVar:"--color-gse",founded:"1989",mic:"XGHA"},brvm:{name:"Bourse Régionale UEMOA",country:"West Africa",flag:"🇨🇮",currency:"XOF",accentVar:"--color-brvm",founded:"1998",mic:"XBRV"},zse:{name:"Zimbabwe Stock Exchange",country:"Zimbabwe",flag:"🇿🇼",currency:"USD",accentVar:"--color-zse",founded:"1896",mic:"XZIM"},bse:{name:"Botswana Stock Exchange",country:"Botswana",flag:"🇧🇼",currency:"BWP",accentVar:"--color-bse",founded:"1989",mic:"XBOT"},luse:{name:"Lusaka Securities Exchange",country:"Zambia",flag:"🇿🇲",currency:"ZMW",accentVar:"--color-luse",founded:"1994",mic:"XLUS"}};function V(){const{id:a=""}=u(),s=L[a],c=v(a),{data:o,isLoading:l}=i({queryKey:["indices",a],queryFn:()=>d.getIndices?.(a)??Promise.resolve([]),staleTime:6e4,refetchInterval:6e4}),{data:n,isLoading:r}=i({queryKey:["movers",a],queryFn:()=>d.getTopMovers?.(a)??Promise.resolve({gainers:[],losers:[]}),staleTime:6e4,refetchInterval:6e4}),{data:p,isLoading:g}=i({queryKey:["stocks",a],queryFn:()=>d.getExchangeStocks?.(a)??Promise.resolve([]),staleTime:6e4,refetchInterval:6e4});if(!s)return e.jsx("div",{style:{padding:"2rem",color:"var(--color-text-muted)"},children:"Exchange not found."});const m=(o??[]).filter(t=>t.exchange.toLowerCase()===a);return e.jsxs("div",{className:"exchange-page",children:[e.jsxs("div",{className:"ex-header panel",style:{borderLeftColor:`var(${s.accentVar})`},children:[e.jsxs("div",{className:"ex-header-left",children:[e.jsx("span",{className:"ex-flag",children:s.flag}),e.jsxs("div",{children:[e.jsxs("div",{className:"ex-title-row",children:[e.jsx("h1",{className:"ex-name",children:s.name}),e.jsx(y,{id:a})]}),e.jsxs("p",{className:"ex-meta",children:[s.country,s.mic&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-sep",children:"·"}),e.jsx("span",{children:s.mic})]}),s.founded&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ex-sep",children:"·"}),e.jsxs("span",{children:["Est. ",s.founded]})]}),e.jsx("span",{className:"ex-sep",children:"·"}),e.jsxs("span",{className:"num",children:[c," local"]})]})]})]}),e.jsx(j,{width:80,height:80,color:`var(${s.accentVar})`,opacity:.08,style:{position:"absolute",right:0,top:0}})]}),e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Indices"}),l?e.jsx("p",{className:"ex-loading",children:"Loading…"}):m.length>0?e.jsx("div",{className:"idx-strip",children:m.map(t=>e.jsx(b,{index:t},t.id))}):e.jsxs("p",{className:"ex-loading",children:["No index data for ",s.name," yet."]})]}),e.jsxs("div",{className:"ex-cols",children:[e.jsxs("section",{children:[e.jsx("div",{className:"section-label",children:"Top Movers"}),r?e.jsx("p",{className:"ex-loading",children:"Loading…"}):e.jsx(N,{gainers:n?.gainers??[],losers:n?.losers??[]})]}),e.jsxs("section",{className:"ex-stocks-col",children:[e.jsx("div",{className:"section-label",children:"All Securities"}),e.jsx(k,{exchangeId:a,quotes:p??[],isLoading:g})]})]}),e.jsx("style",{children:`
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
      `})]})}export{V as default};
