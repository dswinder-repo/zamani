import{r as c,e as x,j as e}from"./vendor-9MAh3nQh.js";import{e as h,p as u}from"./index-BGhFdoHM.js";import{M as g}from"./MediaPanel-CTB4QIjI.js";import"./store-DR-NtvzW.js";const f=["All","JSE","NGX","NSE","GSE","BRVM","ZSE","BSE","LUSE"];function v(r){const a=Date.now()-r,s=Math.floor(a/6e4);if(s<60)return`${s}m ago`;const n=Math.floor(s/60);return n<24?`${n}h ago`:`${Math.floor(n/24)}d ago`}function w({item:r}){return e.jsxs("a",{href:r.url,target:"_blank",rel:"noopener",className:"news-card",children:[e.jsxs("div",{className:"nc-meta",children:[e.jsx("span",{className:"nc-source",children:r.source}),r.exchange&&e.jsx("span",{className:"nc-tag",children:r.exchange}),(r.symbols??[]).slice(0,2).map(a=>e.jsx("span",{className:"nc-sym",children:a.split(".")[0]},a)),e.jsx("span",{className:"nc-time",children:v(r.publishedAt)})]}),e.jsx("div",{className:"nc-headline",children:r.headline}),r.summary&&e.jsx("div",{className:"nc-summary",children:r.summary})]})}function k(){const[r,a]=c.useState("All"),[s,n]=c.useState(""),{data:i,isLoading:l}=x({queryKey:["news","all"],queryFn:()=>u.getNews?.("africa markets")??Promise.resolve([]),staleTime:5*6e4,refetchInterval:5*6e4}),t=(i??[]).filter(o=>{const d=r==="All"||o.exchange===r||(o.symbols??[]).some(p=>p.includes(r)),m=!s||o.headline.toLowerCase().includes(s.toLowerCase())||o.source.toLowerCase().includes(s.toLowerCase());return d&&m});return e.jsxs("div",{className:"news-page",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"news-h1",children:"Market News"}),e.jsx("p",{className:"news-sub",children:"African markets headlines — auto-refreshes every 5 minutes"})]}),e.jsxs("div",{className:"news-controls",children:[e.jsx("div",{className:"news-filters",children:f.map(o=>e.jsx("button",{className:`nf-tab ${r===o?"active":""}`,onClick:()=>a(o),children:o},o))}),e.jsxs("div",{className:"news-search-wrap",children:[e.jsx(h,{size:11,className:"news-search-icon"}),e.jsx("input",{className:"news-search-input",placeholder:"Search headlines…",value:s,onChange:o=>n(o.target.value)}),s&&e.jsx("button",{className:"news-search-clear",onClick:()=>n(""),children:"✕"})]})]}),e.jsxs("details",{className:"news-tv-details",children:[e.jsx("summary",{className:"news-tv-summary",children:"📺 Live Business TV"}),e.jsx("div",{className:"news-tv-panel",children:e.jsx(g,{})})]}),e.jsx("div",{className:"news-count",children:l?"Loading…":`${t.length} article${t.length!==1?"s":""}`}),!l&&t.length===0?e.jsxs("div",{className:"news-empty panel",children:["No news for ",r," right now."]}):e.jsx("div",{className:"news-grid",children:t.map(o=>e.jsx(w,{item:o},o.id))}),e.jsx("style",{children:`
        .news-page { display: flex; flex-direction: column; gap: 1rem; max-width: 860px; }
        .news-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .news-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .news-controls { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .news-filters { display: flex; gap: 4px; flex-wrap: wrap; flex: 1; }

        .news-search-wrap {
          display: flex; align-items: center; gap: 0.375rem;
          background: var(--color-bg-secondary); border: 1px solid var(--color-border);
          border-radius: 4px; padding: 0.25rem 0.5rem; min-width: 180px;
        }
        .news-search-icon { color: var(--color-text-muted); flex-shrink: 0; }
        .news-search-input {
          flex: 1; background: none; border: none; outline: none;
          font-size: 11px; color: var(--color-text-primary);
        }
        .news-search-input::placeholder { color: var(--color-text-muted); }
        .news-search-clear {
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); font-size: 10px; padding: 0;
          transition: color 0.1s;
        }
        .news-search-clear:hover { color: var(--color-down); }
        .nf-tab {
          padding: 3px 9px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-border); border-radius: 3px;
          background: none; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.1s; letter-spacing: 0.03em;
        }
        .nf-tab:hover  { color: var(--color-text-secondary); border-color: var(--color-text-muted); }
        .nf-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        /* Live TV */
        .news-tv-details { }
        .news-tv-summary {
          font-size: 11px; font-weight: 700; cursor: pointer;
          color: var(--color-text-muted); padding: 4px 2px;
          list-style: none; display: flex; align-items: center; gap: 6px;
          user-select: none; transition: color 0.1s;
        }
        .news-tv-summary::-webkit-details-marker { display: none; }
        .news-tv-summary:hover { color: var(--color-gold); }
        details[open] .news-tv-summary { color: var(--color-gold); }
        .news-tv-panel { margin-top: 0.5rem; max-width: 600px; }

        .news-count { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }

        .news-grid { display: flex; flex-direction: column; }
        .news-empty {
          padding: 2rem; text-align: center;
          font-size: 12px; color: var(--color-text-muted);
        }

        .news-card {
          display: block; padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-secondary);
          text-decoration: none; transition: background 0.1s;
        }
        .news-card:first-child { border-radius: 4px 4px 0 0; border: 1px solid var(--color-border-subtle); border-bottom-color: transparent; }
        .news-card:last-child  { border-radius: 0 0 4px 4px; border: 1px solid var(--color-border-subtle); }
        .news-card:only-child  { border-radius: 4px; border: 1px solid var(--color-border-subtle); }
        .news-card:hover { background: var(--color-bg-hover); }

        .nc-meta { display: flex; align-items: center; gap: 0.375rem; margin-bottom: 0.375rem; flex-wrap: wrap; }
        .nc-source {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600;
        }
        .nc-tag {
          font-size: 9px; padding: 1px 4px; border-radius: 3px;
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-weight: 700; letter-spacing: 0.04em;
        }
        .nc-sym {
          font-size: 9px; padding: 1px 4px; border-radius: 3px;
          background: var(--color-bg-elevated); color: var(--color-text-muted);
          font-family: var(--font-mono); font-weight: 600;
        }
        .nc-time { margin-left: auto; font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }

        .nc-headline {
          font-size: 13px; font-weight: 600; color: var(--color-text-primary);
          line-height: 1.4; letter-spacing: -0.01em;
        }
        .news-card:hover .nc-headline { color: var(--color-gold-bright); }

        .nc-summary {
          margin-top: 0.25rem; font-size: 11px;
          color: var(--color-text-muted); line-height: 1.5;
        }
      `})]})}export{k as default};
