import{r as d,j as t}from"./vendor-9MAh3nQh.js";import{C as A,h as R}from"./index-Boqm83OZ.js";import"./store-Dxzhro6a.js";const l={earnings:"#c9a84c",rate_decision:"#60a5fa",ipo:"#a78bfa",dividend:"#4ade80",macro:"#fb923c",agm:"#f472b6"},k={earnings:"Earnings",rate_decision:"Rate Decision",ipo:"IPO",dividend:"Dividend",macro:"Macro",agm:"AGM"};function a(o){const r=new Date;return r.setDate(r.getDate()+o),r.toISOString().slice(0,10)}const G=[{id:"e1",date:a(-5),time:"14:00",title:"South African Reserve Bank — MPC Rate Decision",type:"rate_decision",impact:"high",country:"ZA",exchange:"JSE",notes:"Expected hold at 8.25%"},{id:"e2",date:a(3),time:"11:00",title:"Central Bank of Nigeria — MPC Meeting",type:"rate_decision",impact:"high",country:"NG",exchange:"NGX",notes:"CPI above target at 29.4%"},{id:"e3",date:a(14),time:"09:00",title:"Bank of Ghana — Policy Rate Announcement",type:"rate_decision",impact:"high",country:"GH",exchange:"GSE",notes:"Rate currently at 28%"},{id:"e4",date:a(21),time:"10:00",title:"Central Bank of Kenya — MPC Decision",type:"rate_decision",impact:"high",country:"KE",exchange:"NSE"},{id:"e5",date:a(-2),time:"07:30",title:"Naspers Full-Year Results",type:"earnings",impact:"high",exchange:"JSE",symbol:"NPN",notes:"H1 earnings beat by 4%"},{id:"e6",date:a(1),time:"08:00",title:"Safaricom H1 Results",type:"earnings",impact:"high",exchange:"NSE",symbol:"SCOM"},{id:"e7",date:a(2),time:"07:00",title:"MTN Group Interim Results",type:"earnings",impact:"high",exchange:"JSE",symbol:"MTN"},{id:"e8",date:a(4),time:"08:30",title:"Zenith Bank Q1 Earnings",type:"earnings",impact:"medium",exchange:"NGX",symbol:"ZENITH"},{id:"e9",date:a(5),time:"09:00",title:"Capitec Bank Full-Year Results",type:"earnings",impact:"high",exchange:"JSE",symbol:"CPI"},{id:"e10",date:a(7),time:"08:00",title:"Anglo American Quarterly Production",type:"earnings",impact:"medium",exchange:"JSE",symbol:"AGL"},{id:"e11",date:a(8),time:"07:30",title:"Equity Group Annual Results",type:"earnings",impact:"high",exchange:"NSE",symbol:"EQTY"},{id:"e12",date:a(10),time:"09:00",title:"FirstRand Interim Earnings",type:"earnings",impact:"high",exchange:"JSE",symbol:"FSR"},{id:"e13",date:a(12),time:"08:00",title:"Dangote Cement Annual Results",type:"earnings",impact:"high",exchange:"NGX",symbol:"DANGCEM"},{id:"e14",date:a(16),time:"07:00",title:"Standard Bank Full-Year Results",type:"earnings",impact:"high",exchange:"JSE",symbol:"SBK"},{id:"e15",date:a(0),title:"Shoprite Holdings — Ex-Dividend Date",type:"dividend",impact:"low",exchange:"JSE",symbol:"SHP",notes:"ZAR 4.50 per share"},{id:"e16",date:a(3),title:"KCB Group — Final Dividend Payment",type:"dividend",impact:"low",exchange:"NSE",symbol:"KCB",notes:"KES 2.00 per share"},{id:"e17",date:a(9),title:"Vodacom Group — Interim Dividend",type:"dividend",impact:"low",exchange:"JSE",symbol:"VOD",notes:"ZAR 3.75 per share"},{id:"e18",date:a(11),title:"MTN Nigeria — Final Dividend Ex-Date",type:"dividend",impact:"low",exchange:"NGX",symbol:"MTNN"},{id:"e19",date:a(-3),time:"10:00",title:"South Africa — CPI Inflation Data",type:"macro",impact:"high",country:"ZA"},{id:"e20",date:a(2),time:"09:00",title:"Nigeria — GDP Growth Q4 Release",type:"macro",impact:"high",country:"NG"},{id:"e21",date:a(6),time:"11:00",title:"Kenya — Balance of Payments Report",type:"macro",impact:"medium",country:"KE"},{id:"e22",date:a(13),time:"10:00",title:"Ghana — CPI Inflation Release",type:"macro",impact:"medium",country:"GH"},{id:"e23",date:a(17),time:"08:00",title:"AfDB — African Economic Outlook Report",type:"macro",impact:"medium",notes:"Annual flagship publication"},{id:"e24",date:a(20),time:"09:30",title:"South Africa — Q4 GDP Preliminary",type:"macro",impact:"high",country:"ZA"},{id:"e25",date:a(15),title:"Aradel Holdings — NGX Main Board Listing",type:"ipo",impact:"medium",exchange:"NGX",notes:"Oil & gas company, ₦702B market cap expected"},{id:"e26",date:a(22),title:"Tinubu Square — GSE Listing",type:"ipo",impact:"low",exchange:"GSE"},{id:"e27",date:a(4),time:"10:00",title:"Naspers Annual General Meeting",type:"agm",impact:"low",exchange:"JSE",symbol:"NPN"},{id:"e28",date:a(11),time:"09:00",title:"Safaricom AGM",type:"agm",impact:"low",exchange:"NSE",symbol:"SCOM"}],S=["earnings","rate_decision","ipo","dividend","macro","agm"];function w({type:o}){return t.jsx("span",{style:{display:"inline-block",fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:3,background:l[o]+"22",color:l[o],letterSpacing:"0.04em",textTransform:"uppercase"},children:k[o]})}function j({impact:o}){const r={high:"var(--color-down)",medium:"#fb923c",low:"var(--color-text-muted)"};return t.jsx("span",{style:{display:"inline-block",width:6,height:6,borderRadius:"50%",background:r[o],flexShrink:0},title:`${o} impact`})}function M(){const o=new Date().toISOString().slice(0,10),[r,h]=d.useState(0),[x,E]=d.useState(new Set(S)),[c,v]=d.useState(o),s=d.useMemo(()=>{const e=new Date,n=e.getDay()||7,i=new Date(e);return i.setDate(e.getDate()-(n-1)+r*7),Array.from({length:7},(b,p)=>{const g=new Date(i);return g.setDate(i.getDate()+p),g.toISOString().slice(0,10)})},[r]);function D(e){E(n=>{const i=new Set(n);return i.has(e)?i.size>1&&i.delete(e):i.add(e),i})}const y=G.filter(e=>x.has(e.type)),f=d.useMemo(()=>{const e=new Map;for(const n of y){const i=e.get(n.date)??[];i.push(n),e.set(n.date,i)}return e},[y]),m=c?f.get(c)??[]:[],u=y.filter(e=>e.date>=s[0]&&e.date<=s[6]),C=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];return t.jsxs("div",{className:"cal-page",children:[t.jsx("div",{className:"cal-header",children:t.jsxs("div",{children:[t.jsx("h1",{className:"cal-h1",children:"Economic Calendar"}),t.jsx("p",{className:"cal-sub",children:"Earnings, rate decisions, IPOs, dividends and macro events"})]})}),t.jsx("div",{className:"cal-filters",children:S.map(e=>t.jsx("button",{className:`cal-filter-btn ${x.has(e)?"active":""}`,style:x.has(e)?{background:l[e]+"22",color:l[e],borderColor:l[e]+"66"}:{},onClick:()=>D(e),children:k[e]},e))}),t.jsxs("div",{className:"cal-week-nav",children:[t.jsx("button",{className:"cal-nav-btn",onClick:()=>h(e=>e-1),children:t.jsx(A,{size:14})}),t.jsxs("span",{className:"cal-week-label",children:[new Date(s[0]).toLocaleDateString("en-US",{month:"short",day:"numeric"})," — ",new Date(s[6]).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})]}),t.jsx("button",{className:"cal-nav-btn",onClick:()=>h(e=>e+1),children:t.jsx(R,{size:14})}),r!==0&&t.jsx("button",{className:"cal-today-btn",onClick:()=>{h(0),v(o)},children:"Today"})]}),t.jsx("div",{className:"cal-grid",children:s.map((e,n)=>{const i=f.get(e)??[],b=e===o,p=e===c,g=n>=5;return t.jsxs("button",{className:`cal-day ${b?"today":""} ${p?"selected":""} ${g?"weekend":""}`,onClick:()=>v(p?null:e),children:[t.jsxs("div",{className:"cal-day-header",children:[t.jsx("span",{className:"cal-day-name",children:C[n]}),t.jsx("span",{className:"cal-day-num",children:new Date(e+"T12:00:00").getDate()})]}),t.jsxs("div",{className:"cal-day-dots",children:[i.slice(0,3).map(N=>t.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:l[N.type],flexShrink:0}},N.id)),i.length>3&&t.jsxs("span",{style:{fontSize:9,color:"var(--color-text-muted)"},children:["+",i.length-3]})]}),i.length>0&&t.jsxs("div",{className:"cal-day-count",children:[i.length," event",i.length>1?"s":""]})]},e)})}),c&&t.jsxs("section",{children:[t.jsxs("div",{className:"section-label",children:[new Date(c+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})," · ",m.length," event",m.length!==1?"s":""]}),m.length===0?t.jsx("div",{className:"cal-no-events panel",children:"No events on this day."}):t.jsx("div",{className:"cal-events panel",children:m.sort((e,n)=>(e.time??"99:99").localeCompare(n.time??"99:99")).map(e=>t.jsxs("div",{className:`cal-event impact-${e.impact}`,style:{borderLeftColor:l[e.type]},children:[t.jsxs("div",{className:"ce-top",children:[e.time&&t.jsx("span",{className:"ce-time num",children:e.time}),t.jsx(w,{type:e.type}),t.jsx(j,{impact:e.impact}),e.exchange&&t.jsx("span",{className:"ce-tag",children:e.exchange}),e.symbol&&t.jsx("span",{className:"ce-sym",children:e.symbol})]}),t.jsx("div",{className:"ce-title",children:e.title}),e.notes&&t.jsx("div",{className:"ce-notes",children:e.notes})]},e.id))})]}),!c&&u.length>0&&t.jsxs("section",{children:[t.jsxs("div",{className:"section-label",children:["This week — ",u.length," events"]}),t.jsx("div",{className:"cal-events panel",children:u.sort((e,n)=>e.date.localeCompare(n.date)||(e.time??"").localeCompare(n.time??"")).map(e=>t.jsxs("div",{className:`cal-event impact-${e.impact}`,style:{borderLeftColor:l[e.type]},children:[t.jsxs("div",{className:"ce-top",children:[t.jsxs("span",{className:"ce-date num",children:[new Date(e.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),e.time&&` · ${e.time}`]}),t.jsx(w,{type:e.type}),t.jsx(j,{impact:e.impact}),e.exchange&&t.jsx("span",{className:"ce-tag",children:e.exchange}),e.symbol&&t.jsx("span",{className:"ce-sym",children:e.symbol})]}),t.jsx("div",{className:"ce-title",children:e.title}),e.notes&&t.jsx("div",{className:"ce-notes",children:e.notes})]},e.id))})]}),t.jsx("style",{children:`
        .cal-page { display: flex; flex-direction: column; gap: 1rem; max-width: 1000px; }
        .cal-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .cal-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        /* Filters */
        .cal-filters { display: flex; gap: 4px; flex-wrap: wrap; }
        .cal-filter-btn {
          padding: 3px 9px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-border); border-radius: 3px;
          background: none; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.1s; letter-spacing: 0.03em;
        }
        .cal-filter-btn:hover { color: var(--color-text-secondary); }

        /* Week nav */
        .cal-week-nav {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .cal-nav-btn {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 4px;
          border: 1px solid var(--color-border); background: none;
          color: var(--color-text-muted); cursor: pointer; transition: all 0.1s;
        }
        .cal-nav-btn:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }
        .cal-week-label { font-size: 12px; font-weight: 600; color: var(--color-text-secondary); }
        .cal-today-btn {
          padding: 2px 8px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-gold-dim); border-radius: 3px;
          background: var(--color-gold-subtle); color: var(--color-gold);
          cursor: pointer;
        }

        /* Week grid */
        .cal-grid {
          display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px;
        }
        @media (max-width: 600px) {
          .cal-grid { grid-template-columns: repeat(7, 1fr); }
        }

        .cal-day {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px; padding: 0.5rem 0.5rem 0.375rem;
          cursor: pointer; text-align: left; transition: all 0.1s;
          min-height: 72px; display: flex; flex-direction: column; gap: 4px;
        }
        .cal-day:hover   { background: var(--color-bg-hover); border-color: var(--color-border); }
        .cal-day.today   { border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }
        .cal-day.selected { border-color: var(--color-gold); background: var(--color-gold-subtle); }
        .cal-day.weekend { opacity: 0.6; }

        .cal-day-header { display: flex; flex-direction: column; }
        .cal-day-name { font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); font-weight: 600; }
        .cal-day-num  { font-size: 16px; font-weight: 800; color: var(--color-text-primary); letter-spacing: -0.02em; line-height: 1.1; }
        .cal-day.today .cal-day-num { color: var(--color-gold); }

        .cal-day-dots { display: flex; align-items: center; gap: 3px; flex-wrap: wrap; }
        .cal-day-count { font-size: 9px; color: var(--color-text-muted); font-weight: 600; margin-top: auto; }

        /* Events */
        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
        }
        .cal-no-events { padding: 1.5rem; text-align: center; font-size: 12px; color: var(--color-text-muted); }
        .cal-events { overflow: hidden; }

        .cal-event {
          padding: 0.625rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
          border-left: 3px solid transparent;
        }
        .cal-event:last-child { border-bottom: none; }
        .cal-event.impact-high   { background: rgba(248,113,113,0.02); }
        .cal-event.impact-medium { }
        .cal-event.impact-low    { }

        .ce-top {
          display: flex; align-items: center; gap: 0.375rem;
          flex-wrap: wrap; margin-bottom: 0.25rem;
        }
        .ce-time { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .ce-date { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .ce-tag  {
          font-size: 9px; padding: 1px 4px; border-radius: 3px;
          background: var(--color-bg-elevated); color: var(--color-text-muted);
          font-weight: 600; letter-spacing: 0.04em;
        }
        .ce-sym  {
          font-size: 9px; padding: 1px 4px; border-radius: 3px;
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-family: var(--font-mono); font-weight: 700;
        }
        .ce-title { font-size: 13px; font-weight: 600; color: var(--color-text-primary); line-height: 1.3; }
        .ce-notes { font-size: 11px; color: var(--color-text-muted); margin-top: 0.2rem; }
      `})]})}export{M as default};
