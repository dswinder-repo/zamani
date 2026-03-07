import{r as c,j as e}from"./vendor-9MAh3nQh.js";import{c as b,i as l}from"./index-B6J8VvEo.js";const h=[["path",{d:"m17 2-5 5-5-5",key:"16satq"}],["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",key:"1e6viu"}]],g=b("tv",h),o=[{id:"cnbc-africa",name:"CNBC Africa",shortName:"CNBC Africa",region:"Pan-African",flag:"🌍",description:"African markets, business, and economic news — live from Johannesburg.",youtubeHandle:"@CNBCAfrica",channelId:"UCy5OdcYp9L-gzFxGIBHsElQ",liveUrl:"https://www.youtube.com/@CNBCAfrica/live"},{id:"bloomberg-tv",name:"Bloomberg Television",shortName:"Bloomberg TV",region:"Global / Africa",flag:"🇺🇸",description:"Global markets and finance. Bloomberg's Africa Equity Report airs weekdays.",youtubeHandle:"@BloombergTelevision",channelId:"UCIALMKvObZNtJ6AmdCLP7Lg",liveUrl:"https://www.youtube.com/@BloombergTelevision/live"},{id:"arise-news",name:"Arise News",shortName:"Arise",region:"West Africa",flag:"🇳🇬",description:"Pan-African international news channel based in Nigeria. Business and markets coverage.",youtubeHandle:"@ARISENews",channelId:null,liveUrl:"https://www.youtube.com/@ARISENews/live"},{id:"channels-tv",name:"Channels Television",shortName:"Channels TV",region:"Nigeria",flag:"🇳🇬",description:"Nigeria's leading 24-hour news channel. Covers NGX and the Nigerian economy.",youtubeHandle:"@channelstelevision",channelId:null,liveUrl:"https://www.youtube.com/@channelstelevision/live"},{id:"ntv-kenya",name:"NTV Kenya",shortName:"NTV Kenya",region:"East Africa",flag:"🇰🇪",description:"Kenyan news and business coverage. Market updates from the NSE.",youtubeHandle:"@NTVKenyaOfficial",channelId:null,liveUrl:"https://www.youtube.com/@NTVKenyaOfficial/live"},{id:"dw-africa",name:"DW Africa",shortName:"DW Africa",region:"Pan-African",flag:"🇩🇪",description:"Deutsche Welle's dedicated Africa channel. Business and economic reporting from across the continent.",youtubeHandle:"@dwafrica",channelId:null,liveUrl:"https://www.youtube.com/@dwafrica"}];function u(){const[n,d]=c.useState(o[0].id),[m,i]=c.useState(!1),a=o.find(r=>r.id===n)??o[0],t=a.channelId?`https://www.youtube.com/embed/live_stream?channel=${a.channelId}&autoplay=0&rel=0&modestbranding=1`:null;function s(r){d(r),i(!1)}return e.jsxs("div",{className:"mp-wrap",children:[e.jsx("div",{className:"mp-tabs",children:o.map(r=>e.jsxs("button",{className:`mp-tab ${r.id===n?"mp-tab--active":""}`,onClick:()=>s(r.id),title:r.name,children:[e.jsx("span",{className:"mp-tab-flag",children:r.flag}),e.jsx("span",{className:"mp-tab-name",children:r.shortName})]},r.id))}),e.jsxs("div",{className:"mp-info-bar",children:[e.jsxs("div",{className:"mp-channel-meta",children:[e.jsx("span",{className:"mp-channel-name",children:a.name}),e.jsx("span",{className:"mp-channel-region",children:a.region})]}),e.jsxs("a",{href:a.liveUrl,target:"_blank",rel:"noopener noreferrer",className:"mp-external-btn",title:"Open on YouTube",children:[e.jsx(l,{size:11})," YouTube"]})]}),t&&!m?e.jsx("div",{className:"mp-player-wrap",children:e.jsx("iframe",{src:t,title:a.name,className:"mp-iframe",allowFullScreen:!0,allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",onError:()=>i(!0)})}):e.jsxs("div",{className:"mp-no-embed",children:[e.jsx(g,{size:32,style:{opacity:.15,marginBottom:"0.75rem"}}),e.jsx("p",{className:"mp-no-embed-desc",children:a.description}),e.jsxs("a",{href:a.liveUrl,target:"_blank",rel:"noopener noreferrer",className:"mp-watch-btn",children:[e.jsx(l,{size:12})," Watch on YouTube →"]})]}),e.jsxs("div",{className:"mp-all-channels",children:[e.jsx("div",{className:"mp-all-label",children:"All Channels"}),e.jsx("div",{className:"mp-channel-grid",children:o.map(r=>e.jsxs("button",{className:`mp-channel-card ${r.id===n?"mp-channel-card--active":""}`,onClick:()=>s(r.id),children:[e.jsx("span",{className:"mp-cc-flag",children:r.flag}),e.jsxs("div",{className:"mp-cc-info",children:[e.jsx("span",{className:"mp-cc-name",children:r.shortName}),e.jsx("span",{className:"mp-cc-region",children:r.region})]}),e.jsx("a",{href:r.liveUrl,target:"_blank",rel:"noopener noreferrer",className:"mp-cc-link",onClick:p=>p.stopPropagation(),title:"Open on YouTube",children:e.jsx(l,{size:9})})]},r.id))})]}),e.jsx("style",{children:`
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
        }
        .mp-tabs::-webkit-scrollbar { height: 2px; }
        .mp-tabs::-webkit-scrollbar-thumb { background: var(--color-border); }
        .mp-tab {
          display: flex; align-items: center; gap: 4px;
          padding: 6px 10px; font-size: 10px; font-weight: 600;
          color: var(--color-text-muted); background: none; border: none;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          border-bottom: 2px solid transparent; transition: all 0.15s;
        }
        .mp-tab:hover { color: var(--color-text-primary); }
        .mp-tab--active { color: var(--color-gold); border-bottom-color: var(--color-gold); }
        .mp-tab-flag { font-size: 12px; }
        .mp-tab-name { }

        /* Info bar */
        .mp-info-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.375rem 0.75rem; border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-secondary);
        }
        .mp-channel-meta { display: flex; align-items: baseline; gap: 0.5rem; }
        .mp-channel-name { font-size: 11px; font-weight: 700; color: var(--color-text-primary); }
        .mp-channel-region { font-size: 9px; color: var(--color-text-muted); }
        .mp-external-btn {
          display: flex; align-items: center; gap: 3px;
          font-size: 9px; font-weight: 600; color: var(--color-text-muted);
          text-decoration: none; padding: 2px 6px; border-radius: 3px;
          border: 1px solid var(--color-border); transition: all 0.1s;
        }
        .mp-external-btn:hover { color: var(--color-gold); border-color: var(--color-gold-dim); }

        /* Player */
        .mp-player-wrap {
          position: relative; width: 100%; aspect-ratio: 16/9;
          background: #000;
        }
        .mp-iframe {
          width: 100%; height: 100%; border: none; display: block;
        }

        /* No-embed fallback */
        .mp-no-embed {
          padding: 1.5rem 1rem; text-align: center;
          display: flex; flex-direction: column; align-items: center;
          background: var(--color-bg-primary); min-height: 120px;
          justify-content: center;
        }
        .mp-no-embed-desc { font-size: 11px; color: var(--color-text-muted); margin: 0 0 0.75rem; max-width: 300px; line-height: 1.5; }
        .mp-watch-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 6px 14px; border-radius: 3px; font-size: 11px; font-weight: 700;
          background: var(--color-gold-subtle); border: 1px solid var(--color-gold-dim);
          color: var(--color-gold); text-decoration: none; transition: all 0.1s;
        }
        .mp-watch-btn:hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        /* Channel grid */
        .mp-all-channels { padding: 0.625rem 0.75rem; border-top: 1px solid var(--color-border-subtle); }
        .mp-all-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.4rem;
        }
        .mp-channel-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 4px;
        }
        .mp-channel-card {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 7px; border-radius: 3px; cursor: pointer;
          border: 1px solid transparent; background: none; transition: all 0.1s;
          text-align: left;
        }
        .mp-channel-card:hover { background: var(--color-bg-hover); border-color: var(--color-border); }
        .mp-channel-card--active { background: var(--color-gold-subtle); border-color: var(--color-gold-dim); }
        .mp-cc-flag { font-size: 14px; flex-shrink: 0; }
        .mp-cc-info { display: flex; flex-direction: column; gap: 1px; flex: 1; min-width: 0; }
        .mp-cc-name { font-size: 10px; font-weight: 600; color: var(--color-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mp-channel-card--active .mp-cc-name { color: var(--color-gold); }
        .mp-cc-region { font-size: 8px; color: var(--color-text-muted); }
        .mp-cc-link {
          color: var(--color-text-muted); flex-shrink: 0; padding: 2px;
          border-radius: 2px; transition: color 0.1s; display: flex; align-items: center;
          text-decoration: none;
        }
        .mp-cc-link:hover { color: var(--color-gold); }
      `})]})}export{u as M};
