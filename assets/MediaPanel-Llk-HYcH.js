import{j as e}from"./vendor-9MAh3nQh.js";import{i as a}from"./index-DqzG0Ryv.js";const i=[{id:"al-jazeera",name:"Al Jazeera English",shortName:"Al Jazeera",region:"Global / Africa",flag:"🇶🇦",description:"24/7 English news — comprehensive Africa and Middle East coverage.",watchUrl:"https://www.aljazeera.com/live/",tag:"LIVE"},{id:"bbc-world-service",name:"BBC World Service",shortName:"BBC World",region:"Global / Africa",flag:"🇬🇧",description:"Global news with strong Africa Bureau reporting. Business and markets.",watchUrl:"https://www.bbc.co.uk/sounds/play/live:bbc_world_service",tag:"RADIO"},{id:"cnbc-africa",name:"CNBC Africa",shortName:"CNBC Africa",region:"Pan-African",flag:"🌍",description:"Sub-Saharan markets and business — JSE, NGX, NSE coverage.",watchUrl:"https://www.cnbcafrica.com/live-tv/",tag:"LIVE"},{id:"bloomberg-tv",name:"Bloomberg Television",shortName:"Bloomberg TV",region:"Global / Africa",flag:"🇺🇸",description:"Global markets and finance. Africa Equity Report airs weekdays.",watchUrl:"https://www.bloomberg.com/live",tag:"LIVE"},{id:"dw-africa",name:"DW Africa",shortName:"DW Africa",region:"Pan-African",flag:"🇩🇪",description:"Deutsche Welle's dedicated Africa channel. Business and economic reporting.",watchUrl:"https://www.dw.com/en/africa/s-11756"},{id:"channels-tv",name:"Channels Television",shortName:"Channels TV",region:"Nigeria",flag:"🇳🇬",description:"Nigeria's leading 24-hour news channel. NGX and Nigerian economy coverage.",watchUrl:"https://www.channelstv.com/live-tv/",tag:"LIVE"},{id:"arise-news",name:"Arise News",shortName:"Arise",region:"West Africa",flag:"🇳🇬",description:"Pan-African international TV, Nigeria-based. Business and markets programming.",watchUrl:"https://www.arise.tv/live",tag:"LIVE"},{id:"ntv-kenya",name:"NTV Kenya",shortName:"NTV Kenya",region:"East Africa",flag:"🇰🇪",description:"Kenyan broadcast news. Market updates from the Nairobi Securities Exchange.",watchUrl:"https://www.ntv.co.ke/live/",tag:"LIVE"}];function s(){return e.jsxs("div",{className:"mp-wrap",children:[e.jsx("div",{className:"mp-grid",children:i.map(r=>e.jsxs("a",{href:r.watchUrl,target:"_blank",rel:"noopener noreferrer",className:"mp-card",children:[e.jsxs("div",{className:"mp-card-top",children:[e.jsx("span",{className:"mp-flag",children:r.flag}),e.jsxs("div",{className:"mp-info",children:[e.jsx("span",{className:"mp-name",children:r.shortName}),e.jsx("span",{className:"mp-region",children:r.region})]}),r.tag&&e.jsx("span",{className:"mp-tag",children:r.tag})]}),e.jsx("p",{className:"mp-desc",children:r.description}),e.jsxs("div",{className:"mp-link-row",children:[e.jsx(a,{size:9}),e.jsx("span",{children:"Watch live"})]})]},r.id))}),e.jsx("style",{children:`
        .mp-wrap {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          padding: 0.625rem;
        }
        .mp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
        }
        .mp-card {
          display: flex; flex-direction: column; gap: 4px;
          padding: 7px 8px; border-radius: 3px;
          border: 1px solid var(--color-border);
          background: var(--color-bg-primary);
          text-decoration: none; transition: all 0.1s;
          cursor: pointer;
        }
        .mp-card:hover {
          border-color: var(--color-gold-dim);
          background: var(--color-gold-subtle);
        }
        .mp-card-top {
          display: flex; align-items: center; gap: 5px;
        }
        .mp-flag { font-size: 14px; flex-shrink: 0; }
        .mp-info { display: flex; flex-direction: column; gap: 1px; flex: 1; min-width: 0; }
        .mp-name {
          font-size: 10px; font-weight: 700;
          color: var(--color-text-primary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .mp-card:hover .mp-name { color: var(--color-gold); }
        .mp-region { font-size: 8px; color: var(--color-text-muted); }
        .mp-tag {
          font-size: 7px; font-weight: 800; letter-spacing: 0.06em;
          color: var(--color-up); flex-shrink: 0;
          border: 1px solid var(--color-up); border-radius: 2px;
          padding: 0 3px; opacity: 0.8;
        }
        .mp-desc {
          margin: 0; font-size: 9px;
          color: var(--color-text-muted); line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .mp-link-row {
          display: flex; align-items: center; gap: 3px;
          font-size: 8px; font-weight: 600;
          color: var(--color-text-muted); margin-top: 1px;
        }
        .mp-card:hover .mp-link-row { color: var(--color-gold); }
      `})]})}export{s as M};
