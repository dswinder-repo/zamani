import{k as l,j as o,L as i}from"./vendor-9MAh3nQh.js";import{c as m,u as d,p as u,X as p}from"./index-DIq9QPrS.js";import"./store-DR-NtvzW.js";const x=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],g=m("maximize-2",x);function f(n){switch(n.split(".").pop()?.toLowerCase()??""){case"jo":return"jse";case"use":return"use";case"ngx":return"ngx";case"nse":return"nse";case"gse":return"gse";case"brvm":return"brvm";case"zse":return"zse";case"bse":return"bse";case"luse":return"luse";default:return"jse"}}function y(){const{symbols:n}=d(),t=l({queries:n.map(r=>({queryKey:["quote",r],queryFn:()=>u.getQuote(r),staleTime:3e4,refetchInterval:3e4}))});return n.length?o.jsxs("div",{className:"mon-root",children:[o.jsxs("div",{className:"mon-topbar",children:[o.jsx("span",{className:"mon-title",children:"Monitor"}),o.jsxs("span",{className:"mon-count",children:[n.length," symbols"]}),o.jsx(i,{to:"/",className:"mon-close",title:"Exit monitor mode",children:o.jsx(p,{size:14})}),o.jsx("button",{className:"mon-fs-btn",title:"Toggle fullscreen",onClick:()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})},children:o.jsx(g,{size:12})})]}),o.jsx("div",{className:"mon-grid",children:n.map((r,a)=>{const e=t[a]?.data,s=(e?.changePct??0)>=0,c=t[a]?.isLoading;return o.jsxs(i,{to:`/exchange/${f(r)}/stock/${encodeURIComponent(r)}`,className:`mon-card ${c?"loading":""} ${e?s?"up":"down":""}`,children:[o.jsx("div",{className:"mon-sym",children:r.split(".")[0]}),e?.name&&o.jsx("div",{className:"mon-name",children:e.name}),o.jsx("div",{className:"mon-price num",children:c?"…":e?e.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):"—"}),o.jsx("div",{className:`mon-chg num ${s?"up":"down"}`,children:e?`${s?"+":""}${e.changePct.toFixed(2)}%`:""}),e?.currency&&o.jsx("div",{className:"mon-cur",children:e.currency})]},r)})}),o.jsx("style",{children:`
        .mon-root {
          position: fixed; inset: 0; z-index: 9000;
          background: var(--color-bg-primary);
          display: flex; flex-direction: column;
          overflow: hidden;
        }

        .mon-topbar {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: var(--color-bg-secondary);
          border-bottom: 1px solid var(--color-border-subtle);
          flex-shrink: 0;
        }
        .mon-title {
          font-size: 11px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--color-gold);
        }
        .mon-count {
          font-size: 10px; color: var(--color-text-muted);
          font-family: var(--font-mono);
        }
        .mon-close, .mon-fs-btn {
          margin-left: auto; display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 4px;
          color: var(--color-text-muted); background: none; border: none;
          text-decoration: none; cursor: pointer;
          transition: color 0.15s, background 0.15s;
        }
        .mon-fs-btn { margin-left: 0; }
        .mon-close:hover { color: var(--color-down); background: var(--color-down-subtle); }
        .mon-fs-btn:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }

        .mon-grid {
          flex: 1; overflow-y: auto; padding: 1rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 0.75rem;
          align-content: start;
        }

        .mon-card {
          display: flex; flex-direction: column; justify-content: center;
          padding: 1rem 1.25rem; border-radius: 6px;
          text-decoration: none;
          border: 1px solid var(--color-border-subtle);
          background: var(--color-bg-secondary);
          transition: transform 0.15s, border-color 0.15s;
          min-height: 110px;
        }
        .mon-card:hover { transform: translateY(-2px); border-color: var(--color-gold-dim); }
        .mon-card.loading { opacity: 0.6; }
        .mon-card.up   { border-top: 2px solid var(--color-up); }
        .mon-card.down { border-top: 2px solid var(--color-down); }

        .mon-sym {
          font-family: var(--font-mono); font-size: 14px; font-weight: 800;
          color: var(--color-gold); letter-spacing: 0.02em; margin-bottom: 2px;
        }
        .mon-name {
          font-size: 9px; color: var(--color-text-muted);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          margin-bottom: 0.5rem;
        }
        .mon-price {
          font-size: 22px; font-weight: 800; letter-spacing: -0.03em;
          color: var(--color-text-primary); line-height: 1;
        }
        .mon-chg {
          font-size: 13px; font-weight: 600; margin-top: 3px;
        }
        .mon-chg.up   { color: var(--color-up); }
        .mon-chg.down { color: var(--color-down); }
        .mon-cur {
          font-size: 9px; color: var(--color-text-muted);
          font-family: var(--font-mono); margin-top: 4px;
        }

        .mon-empty {
          position: fixed; inset: 0; z-index: 9000;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 1rem; background: var(--color-bg-primary);
          font-size: 14px; color: var(--color-text-muted);
        }
        .mon-link {
          color: var(--color-gold); text-decoration: none; font-weight: 600;
        }
        .mon-link:hover { text-decoration: underline; }
      `})]}):o.jsxs("div",{className:"mon-empty",children:[o.jsx("div",{children:"No symbols in your watchlist."}),o.jsx(i,{to:"/watchlist",className:"mon-link",children:"Add symbols →"})]})}export{y as default};
