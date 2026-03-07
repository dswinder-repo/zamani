import{r as c,j as e}from"./vendor-9MAh3nQh.js";import{c as s,i as l}from"./index-epglPozG.js";const h=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478",key:"1fwjs5"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134",key:"ehdyv1"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134",key:"1q22gi"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478",key:"r2q7qm"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],g=s("radio",h);const x=[["path",{d:"m17 2-5 5-5-5",key:"16satq"}],["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",key:"1e6viu"}]],f=s("tv",x),o=[{id:"al-jazeera",name:"Al Jazeera English",shortName:"Al Jazeera",region:"Global / Africa",flag:"🇶🇦",description:"Al Jazeera's 24/7 English live stream — comprehensive Africa and Middle East coverage.",embedSrc:"https://www.youtube.com/embed/Z_3pcnlgZmo?autoplay=0&rel=0&modestbranding=1",watchUrl:"https://www.aljazeera.com/live/",embedType:"youtube-video"},{id:"bbc-world-service",name:"BBC World Service",shortName:"BBC World",region:"Global / Africa",flag:"🇬🇧",description:"BBC's global news service — strong Africa Bureau reporting, business and markets.",embedSrc:"https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA&autoplay=0&rel=0&modestbranding=1",watchUrl:"https://www.bbc.co.uk/sounds/play/live:bbc_world_service",embedType:"youtube-channel"},{id:"bloomberg-tv",name:"Bloomberg Television",shortName:"Bloomberg TV",region:"Global / Africa",flag:"🇺🇸",description:"Global markets and finance. Bloomberg's Africa Equity Report airs weekdays.",embedSrc:"https://www.youtube.com/embed/live_stream?channel=UCIALMKvObZNtJ6AmdCLP7Lg&autoplay=0&rel=0&modestbranding=1",watchUrl:"https://www.bloomberg.com/live",embedType:"youtube-channel"},{id:"cnbc-africa",name:"CNBC Africa",shortName:"CNBC Africa",region:"Pan-African",flag:"🌍",description:"Sub-Saharan African markets and business news — JSE, NGX, NSE coverage.",embedSrc:null,watchUrl:"https://www.cnbcafrica.com/live-tv/",embedType:"none"},{id:"dw-africa",name:"DW Africa",shortName:"DW Africa",region:"Pan-African",flag:"🇩🇪",description:"Deutsche Welle's dedicated Africa channel. Business and economic reporting.",embedSrc:"https://www.youtube.com/embed/live_stream?channel=UCNye-wNBqNL5ZzHSJj3l8Bg&autoplay=0&rel=0&modestbranding=1",watchUrl:"https://www.dw.com/en/africa/s-11756",embedType:"youtube-channel"},{id:"channels-tv",name:"Channels Television",shortName:"Channels TV",region:"Nigeria",flag:"🇳🇬",description:"Nigeria's leading 24-hour news channel. NGX and Nigerian economy coverage.",embedSrc:null,watchUrl:"https://www.channelstv.com/live-tv/",embedType:"none"},{id:"arise-news",name:"Arise News",shortName:"Arise",region:"West Africa",flag:"🇳🇬",description:"Pan-African international TV, Nigeria-based. Business and markets programming.",embedSrc:null,watchUrl:"https://www.arise.tv/live",embedType:"none"},{id:"ntv-kenya",name:"NTV Kenya",shortName:"NTV Kenya",region:"East Africa",flag:"🇰🇪",description:"Kenyan broadcast news. Market updates from the Nairobi Securities Exchange.",embedSrc:null,watchUrl:"https://www.ntv.co.ke/live/",embedType:"none"}];function w(){const[n,d]=c.useState(o[0].id),[m,i]=c.useState(!1),r=o.find(a=>a.id===n)??o[0];function t(a){d(a),i(!1)}const p=!!r.embedSrc&&!m;return e.jsxs("div",{className:"mp-wrap",children:[e.jsx("div",{className:"mp-tabs",children:o.map(a=>e.jsxs("button",{className:`mp-tab ${a.id===n?"mp-tab--active":""}`,onClick:()=>t(a.id),title:a.name,children:[e.jsx("span",{className:"mp-tab-flag",children:a.flag}),e.jsx("span",{className:"mp-tab-name",children:a.shortName}),a.embedSrc&&e.jsx("span",{className:"mp-live-dot",title:"Live embed available"})]},a.id))}),e.jsxs("div",{className:"mp-info-bar",children:[e.jsxs("div",{className:"mp-channel-meta",children:[e.jsx("span",{className:"mp-channel-name",children:r.name}),e.jsx("span",{className:"mp-channel-region",children:r.region})]}),e.jsxs("a",{href:r.watchUrl,target:"_blank",rel:"noopener noreferrer",className:"mp-external-btn",children:[e.jsx(l,{size:11})," Watch live"]})]}),p?e.jsx("div",{className:"mp-player-wrap",children:e.jsx("iframe",{src:r.embedSrc,title:r.name,className:"mp-iframe",allowFullScreen:!0,allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",onError:()=>i(!0)},r.id)}):e.jsxs("div",{className:"mp-no-embed",children:[r.embedType==="none"?e.jsx(g,{size:28,style:{opacity:.15,marginBottom:"0.625rem"}}):e.jsx(f,{size:28,style:{opacity:.15,marginBottom:"0.625rem"}}),e.jsx("p",{className:"mp-no-embed-desc",children:r.description}),r.embedType==="none"&&e.jsxs("p",{className:"mp-no-embed-note",children:[r.name," streams live on their website — embedding is not permitted."]}),e.jsxs("a",{href:r.watchUrl,target:"_blank",rel:"noopener noreferrer",className:"mp-watch-btn",children:[e.jsx(l,{size:12})," Watch ",r.shortName," live →"]})]}),e.jsxs("div",{className:"mp-all-channels",children:[e.jsx("div",{className:"mp-all-label",children:"All Channels"}),e.jsx("div",{className:"mp-channel-grid",children:o.map(a=>e.jsxs("button",{className:`mp-channel-card ${a.id===n?"mp-channel-card--active":""}`,onClick:()=>t(a.id),children:[e.jsx("span",{className:"mp-cc-flag",children:a.flag}),e.jsxs("div",{className:"mp-cc-info",children:[e.jsx("span",{className:"mp-cc-name",children:a.shortName}),e.jsx("span",{className:"mp-cc-region",children:a.region})]}),a.embedSrc?e.jsx("span",{className:"mp-cc-embed-badge",title:"Embeddable",children:"●"}):null,e.jsx("a",{href:a.watchUrl,target:"_blank",rel:"noopener noreferrer",className:"mp-cc-link",onClick:b=>b.stopPropagation(),title:"Open live stream",children:e.jsx(l,{size:9})})]},a.id))})]}),e.jsx("style",{children:`
        .mp-wrap {
          display: flex; flex-direction: column;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 4px; overflow: hidden;
        }

        /* Tabs */
        .mp-tabs {
          display: flex; overflow-x: auto; border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-tertiary);
          scrollbar-width: thin;
        }
        .mp-tab {
          display: flex; align-items: center; gap: 3px;
          padding: 6px 9px; font-size: 10px; font-weight: 600;
          color: var(--color-text-muted); background: none; border: none;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          border-bottom: 2px solid transparent; transition: all 0.15s;
          position: relative;
        }
        .mp-tab:hover { color: var(--color-text-primary); }
        .mp-tab--active { color: var(--color-gold); border-bottom-color: var(--color-gold); }
        .mp-tab-flag { font-size: 11px; }
        .mp-live-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--color-up); flex-shrink: 0;
          box-shadow: 0 0 4px var(--color-up);
        }

        /* Info bar */
        .mp-info-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.375rem 0.75rem; border-bottom: 1px solid var(--color-border-subtle);
        }
        .mp-channel-meta { display: flex; align-items: baseline; gap: 0.5rem; }
        .mp-channel-name { font-size: 11px; font-weight: 700; color: var(--color-text-primary); }
        .mp-channel-region { font-size: 9px; color: var(--color-text-muted); }
        .mp-external-btn {
          display: flex; align-items: center; gap: 3px;
          font-size: 9px; font-weight: 600; color: var(--color-text-muted);
          text-decoration: none; padding: 2px 7px; border-radius: 3px;
          border: 1px solid var(--color-border); transition: all 0.1s;
          white-space: nowrap;
        }
        .mp-external-btn:hover { color: var(--color-gold); border-color: var(--color-gold-dim); }

        /* Embed player */
        .mp-player-wrap {
          position: relative; width: 100%; aspect-ratio: 16/9;
          background: #000;
        }
        .mp-iframe { width: 100%; height: 100%; border: none; display: block; }

        /* Link-only fallback */
        .mp-no-embed {
          padding: 1.25rem 1rem; text-align: center;
          display: flex; flex-direction: column; align-items: center;
          background: var(--color-bg-primary); min-height: 100px; justify-content: center;
          gap: 0.5rem;
        }
        .mp-no-embed-desc { font-size: 11px; color: var(--color-text-muted); margin: 0; max-width: 320px; line-height: 1.5; }
        .mp-no-embed-note { font-size: 9px; color: var(--color-text-muted); margin: 0; font-style: italic; opacity: 0.7; }
        .mp-watch-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 6px 14px; border-radius: 3px; font-size: 11px; font-weight: 700;
          background: var(--color-gold-subtle); border: 1px solid var(--color-gold-dim);
          color: var(--color-gold); text-decoration: none; transition: all 0.1s;
          margin-top: 0.25rem;
        }
        .mp-watch-btn:hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        /* All-channels grid */
        .mp-all-channels { padding: 0.5rem 0.75rem; border-top: 1px solid var(--color-border-subtle); }
        .mp-all-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.375rem;
        }
        .mp-channel-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
        .mp-channel-card {
          display: flex; align-items: center; gap: 5px;
          padding: 4px 6px; border-radius: 3px; cursor: pointer;
          border: 1px solid transparent; background: none; transition: all 0.1s;
          text-align: left;
        }
        .mp-channel-card:hover { background: var(--color-bg-hover); border-color: var(--color-border); }
        .mp-channel-card--active { background: var(--color-gold-subtle); border-color: var(--color-gold-dim); }
        .mp-cc-flag { font-size: 13px; flex-shrink: 0; }
        .mp-cc-info { display: flex; flex-direction: column; gap: 1px; flex: 1; min-width: 0; }
        .mp-cc-name { font-size: 10px; font-weight: 600; color: var(--color-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mp-channel-card--active .mp-cc-name { color: var(--color-gold); }
        .mp-cc-region { font-size: 8px; color: var(--color-text-muted); }
        .mp-cc-embed-badge { font-size: 7px; color: var(--color-up); flex-shrink: 0; }
        .mp-cc-link {
          color: var(--color-text-muted); flex-shrink: 0; padding: 2px;
          border-radius: 2px; transition: color 0.1s; display: flex; align-items: center;
          text-decoration: none;
        }
        .mp-cc-link:hover { color: var(--color-gold); }
      `})]})}export{w as M};
