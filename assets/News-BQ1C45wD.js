import{r as c,e as i,j as e}from"./vendor-9MAh3nQh.js";import{p as d}from"./index-p1Nft5WN.js";import"./store-Dxzhro6a.js";const m=["All","JSE","NGX","NSE","GSE","BRVM","ZSE","BSE","LUSE"];function p(r){const a=Date.now()-r,n=Math.floor(a/6e4);if(n<60)return`${n}m ago`;const s=Math.floor(n/60);return s<24?`${s}h ago`:`${Math.floor(s/24)}d ago`}function x({item:r}){return e.jsxs("a",{href:r.url,target:"_blank",rel:"noopener",className:"news-card",children:[e.jsxs("div",{className:"nc-meta",children:[e.jsx("span",{className:"nc-source",children:r.source}),r.exchange&&e.jsx("span",{className:"nc-tag",children:r.exchange}),(r.symbols??[]).slice(0,2).map(a=>e.jsx("span",{className:"nc-sym",children:a.split(".")[0]},a)),e.jsx("span",{className:"nc-time",children:p(r.publishedAt)})]}),e.jsx("div",{className:"nc-headline",children:r.headline}),r.summary&&e.jsx("div",{className:"nc-summary",children:r.summary})]})}function h(){const[r,a]=c.useState("All"),{data:n,isLoading:s}=i({queryKey:["news","all"],queryFn:()=>d.getNews?.("africa markets")??Promise.resolve([]),staleTime:5*6e4,refetchInterval:5*6e4}),t=(n??[]).filter(o=>r==="All"||o.exchange===r||(o.symbols??[]).some(l=>l.includes(r)));return e.jsxs("div",{className:"news-page",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"news-h1",children:"Market News"}),e.jsx("p",{className:"news-sub",children:"African markets headlines — auto-refreshes every 5 minutes"})]}),e.jsx("div",{className:"news-filters",children:m.map(o=>e.jsx("button",{className:`nf-tab ${r===o?"active":""}`,onClick:()=>a(o),children:o},o))}),e.jsx("div",{className:"news-count",children:s?"Loading…":`${t.length} article${t.length!==1?"s":""}`}),!s&&t.length===0?e.jsxs("div",{className:"news-empty panel",children:["No news for ",r," right now."]}):e.jsx("div",{className:"news-grid",children:t.map(o=>e.jsx(x,{item:o},o.id))}),e.jsx("style",{children:`
        .news-page { display: flex; flex-direction: column; gap: 1rem; max-width: 860px; }
        .news-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .news-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .news-filters { display: flex; gap: 4px; flex-wrap: wrap; }
        .nf-tab {
          padding: 3px 9px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-border); border-radius: 3px;
          background: none; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.1s; letter-spacing: 0.03em;
        }
        .nf-tab:hover  { color: var(--color-text-secondary); border-color: var(--color-text-muted); }
        .nf-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

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
      `})]})}export{h as default};
