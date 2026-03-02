import{r as g,j as e}from"./vendor-9MAh3nQh.js";import{c as u,d as b,e as p}from"./index-C9A4Yjp8.js";import{C as v,T as j}from"./trash-2-mjC_c0U_.js";import"./store-Dxzhro6a.js";const y=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",key:"178tsu"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05",key:"1hqiys"}]],h=u("bell-off",y);const N=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],w=u("circle-check-big",N),f={above:"Price above",below:"Price below",change_up:"% gain ≥",change_down:"% drop ≥"};function k({onClose:r}){const{addAlert:t}=b(),[o,s]=g.useState({symbol:"",name:"",condition:"above",threshold:"",currency:"USD"}),n=(l,i)=>s(d=>({...d,[l]:i})),c=o.symbol&&Number(o.threshold)>0;function m(){c&&(t({symbol:o.symbol.toUpperCase(),name:o.name||o.symbol.toUpperCase(),condition:o.condition,threshold:Number(o.threshold),currency:o.currency,enabled:!0}),Notification.permission==="default"&&Notification.requestPermission(),r())}return e.jsx("div",{className:"modal-overlay",onClick:r,children:e.jsxs("div",{className:"modal-box",onClick:l=>l.stopPropagation(),children:[e.jsx("h2",{className:"modal-title",children:"New Price Alert"}),e.jsxs("div",{className:"modal-grid",children:[e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Symbol"}),e.jsx("input",{value:o.symbol,onChange:l=>n("symbol",l.target.value),placeholder:"e.g. NPN",className:"modal-input mono"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Name (optional)"}),e.jsx("input",{value:o.name,onChange:l=>n("name",l.target.value),placeholder:"e.g. Naspers",className:"modal-input"})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:"Condition"}),e.jsx("select",{value:o.condition,onChange:l=>n("condition",l.target.value),className:"modal-input",children:Object.entries(f).map(([l,i])=>e.jsx("option",{value:l,children:i},l))})]}),e.jsxs("label",{className:"modal-field",children:[e.jsx("span",{children:o.condition.startsWith("change")?"Percentage (%)":`Price (${o.currency})`}),e.jsx("input",{type:"number",min:"0",step:"any",value:o.threshold,onChange:l=>n("threshold",l.target.value),placeholder:o.condition.startsWith("change")?"5":"100.00",className:"modal-input mono"})]})]}),e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{className:"modal-cancel",onClick:r,children:"Cancel"}),e.jsx("button",{className:"modal-submit-alert",onClick:m,disabled:!c,children:"Create Alert"})]}),e.jsx("style",{children:`
          .modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.7);
            display: flex; align-items: center; justify-content: center; }
          .modal-box {
            background: var(--color-bg-elevated); border: 1px solid var(--color-border);
            border-radius: 6px; padding: 1.5rem; width: 400px; max-width: 92vw;
            box-shadow: 0 24px 48px rgba(0,0,0,0.6);
          }
          .modal-title { margin: 0 0 1rem; font-size: 15px; font-weight: 800; }
          .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
          .modal-field { display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--color-text-muted); }
          .modal-input {
            background: var(--color-bg-secondary); border: 1px solid var(--color-border);
            border-radius: 3px; padding: 0.375rem 0.5rem; color: var(--color-text-primary);
            font-size: 12px; font-family: var(--font-sans); outline: none;
          }
          .modal-input.mono { font-family: var(--font-mono); }
          .modal-input:focus { border-color: var(--color-gold-dim); }
          .modal-actions { display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1.25rem; }
          .modal-cancel {
            padding: 5px 14px; border-radius: 4px; border: 1px solid var(--color-border);
            background: none; color: var(--color-text-muted); font-size: 12px; cursor: pointer;
          }
          .modal-submit-alert {
            padding: 5px 14px; border-radius: 4px; font-size: 12px; font-weight: 700;
            cursor: pointer; background: var(--color-gold-subtle);
            border: 1px solid var(--color-gold-dim); color: var(--color-gold);
          }
          .modal-submit-alert:disabled { opacity: 0.4; cursor: default; }
        `})]})})}function T(){const{alerts:r,removeAlert:t,toggleAlert:o,clearTriggered:s,markRead:n}=b(),[c,m]=g.useState(!1),l=r.filter(a=>a.enabled&&!a.triggeredAt),i=r.filter(a=>!a.enabled&&!a.triggeredAt),d=r.filter(a=>!!a.triggeredAt);return g.useState(()=>{n()}),e.jsxs("div",{className:"alerts-page",children:[e.jsxs("div",{className:"alerts-header",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"alerts-h1",children:"Price Alerts"}),e.jsx("p",{className:"alerts-sub",children:"Get notified when securities hit your price targets"})]}),e.jsxs("button",{className:"alerts-add-btn",onClick:()=>m(!0),children:[e.jsx(v,{size:13})," New Alert"]})]}),typeof Notification<"u"&&Notification.permission==="default"&&e.jsxs("div",{className:"alerts-banner",onClick:()=>Notification.requestPermission(),children:[e.jsx(p,{size:13}),"Enable browser notifications to receive alerts even when Zamani is in the background.",e.jsx("span",{className:"alerts-banner-cta",children:"Enable →"})]}),r.length===0&&e.jsxs("div",{className:"alerts-empty panel",children:[e.jsx(p,{size:28,style:{opacity:.2,marginBottom:"0.75rem"}}),e.jsx("p",{children:"No alerts set."}),e.jsx("p",{style:{fontSize:11},children:"Create a price alert to get notified when a security hits your target."})]}),l.length>0&&e.jsxs("section",{children:[e.jsxs("div",{className:"section-label",children:["Active (",l.length,")"]}),e.jsx("div",{className:"alerts-list panel",children:l.map(a=>e.jsx(x,{alert:a,onRemove:t,onToggle:o},a.id))})]}),i.length>0&&e.jsxs("section",{children:[e.jsxs("div",{className:"section-label",children:["Paused (",i.length,")"]}),e.jsx("div",{className:"alerts-list panel",children:i.map(a=>e.jsx(x,{alert:a,onRemove:t,onToggle:o},a.id))})]}),d.length>0&&e.jsxs("section",{children:[e.jsxs("div",{className:"section-label-row",children:[e.jsxs("div",{className:"section-label",children:["Triggered (",d.length,")"]}),e.jsx("button",{className:"alerts-clear-btn",onClick:s,children:"Clear all"})]}),e.jsx("div",{className:"alerts-list panel",children:d.map(a=>e.jsx(x,{alert:a,onRemove:t,onToggle:o},a.id))})]}),c&&e.jsx(k,{onClose:()=>m(!1)}),e.jsx("style",{children:`
        .alerts-page { display: flex; flex-direction: column; gap: 1rem; max-width: 700px; }
        .alerts-header { display: flex; align-items: flex-start; justify-content: space-between; }
        .alerts-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .alerts-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .alerts-add-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 4px;
          border: 1px solid var(--color-gold-dim);
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.1s;
        }
        .alerts-add-btn:hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        .alerts-banner {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.625rem 0.875rem; border-radius: 4px;
          background: var(--color-gold-subtle); border: 1px solid var(--color-gold-dim);
          font-size: 12px; color: var(--color-text-secondary); cursor: pointer;
        }
        .alerts-banner-cta { color: var(--color-gold); font-weight: 700; margin-left: auto; }

        .alerts-empty {
          padding: 3rem 2rem; text-align: center; display: flex; flex-direction: column;
          align-items: center; font-size: 13px; color: var(--color-text-muted);
        }
        .alerts-empty p { margin: 0.125rem 0; }

        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
        }
        .section-label-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
        .section-label-row .section-label { margin-bottom: 0; }
        .alerts-clear-btn {
          font-size: 10px; color: var(--color-text-muted); background: none; border: none;
          cursor: pointer; font-weight: 600;
        }
        .alerts-clear-btn:hover { color: var(--color-down); }

        .alerts-list { overflow: hidden; }
      `})]})}function x({alert:r,onRemove:t,onToggle:o}){const s=!!r.triggeredAt;return e.jsxs("div",{className:`alert-row ${s?"triggered":""}`,children:[e.jsx("div",{className:"ar-icon",children:s?e.jsx(w,{size:14,style:{color:"var(--color-up)"}}):r.enabled?e.jsx(p,{size:14,style:{color:"var(--color-gold)"}}):e.jsx(h,{size:14,style:{color:"var(--color-text-muted)"}})}),e.jsxs("div",{className:"ar-body",children:[e.jsxs("div",{className:"ar-title",children:[e.jsx("span",{className:"ar-symbol",children:r.symbol}),e.jsx("span",{className:"ar-cond",children:f[r.condition]}),e.jsx("span",{className:"ar-threshold num",children:r.condition.startsWith("change")?`${r.threshold}%`:`${r.threshold} ${r.currency}`})]}),e.jsxs("div",{className:"ar-meta",children:[r.name&&e.jsx("span",{children:r.name}),s&&r.triggeredAt&&e.jsxs("span",{style:{color:"var(--color-up)"},children:["Triggered ",new Date(r.triggeredAt).toLocaleString()]})]})]}),e.jsxs("div",{className:"ar-actions",children:[!s&&e.jsx("button",{className:"ar-toggle",onClick:()=>o(r.id),title:r.enabled?"Pause":"Enable",children:r.enabled?e.jsx(h,{size:12}):e.jsx(p,{size:12})}),e.jsx("button",{className:"ar-del",onClick:()=>t(r.id),children:e.jsx(j,{size:12})})]}),e.jsx("style",{children:`
        .alert-row {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.625rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .alert-row:last-child { border-bottom: none; }
        .alert-row.triggered { opacity: 0.7; }
        .ar-icon { flex-shrink: 0; }
        .ar-body { flex: 1; min-width: 0; }
        .ar-title { display: flex; align-items: center; gap: 0.375rem; font-size: 12px; }
        .ar-symbol { font-family: var(--font-mono); font-weight: 700; color: var(--color-gold); }
        .ar-cond   { color: var(--color-text-secondary); }
        .ar-threshold { color: var(--color-text-primary); font-weight: 700; }
        .ar-meta { font-size: 10px; color: var(--color-text-muted); margin-top: 2px; display: flex; gap: 0.5rem; }
        .ar-actions { display: flex; gap: 4px; flex-shrink: 0; }
        .ar-toggle, .ar-del {
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); padding: 4px; border-radius: 3px; transition: all 0.1s;
        }
        .ar-toggle:hover { color: var(--color-gold); background: var(--color-gold-subtle); }
        .ar-del:hover    { color: var(--color-down); background: var(--color-down-subtle); }
      `})]})}export{T as default};
