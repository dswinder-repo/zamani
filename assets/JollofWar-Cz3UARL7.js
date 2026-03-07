import{k as h,j as e}from"./vendor-9MAh3nQh.js";import{p as f}from"./index-epglPozG.js";import"./store-DR-NtvzW.js";const m=["Jollof rice was invented in the Senegambia region of West Africa. Both Nigeria and Ghana have been arguing about this since approximately 1492.","Nigerian jollof is cooked over high heat on the stove, giving it a distinctive smoky bottom (party jollof). Ghanaians call this 'burnt rice' and they are wrong.","Ghanaian jollof (waakye) uses a different rice variety and tomato base. Nigerians call this 'tomato stew with rice' and they are also wrong.","The Jollof War is fought primarily on Twitter/X. No blood has been shed. Many feelings have been hurt.","Senegal invented jollof rice (ceebu jën). Both Nigeria and Ghana prefer to ignore this fact.","The word 'jollof' derives from the Wolof people of Senegal and The Gambia. The Wolof remain calm. They know the truth."];function u(){const a=h({queries:[{queryKey:["indices","ngx"],queryFn:()=>f.getIndices?.("ngx")??Promise.resolve([]),staleTime:6e4},{queryKey:["indices","gse"],queryFn:()=>f.getIndices?.("gse")??Promise.resolve([]),staleTime:6e4}]}),r=a[0].data??[],i=a[1].data??[],o=r.length>0?r.reduce((n,c)=>n+c.changePct,0)/r.length:null,l=i.length>0?i.reduce((n,c)=>n+c.changePct,0)/i.length:null,s=o!=null&&l!=null&&o>l,t=o!=null&&l!=null&&l>o,d=o!=null&&l!=null&&o===l,j=m[new Date().getDate()%m.length];return e.jsxs("div",{className:"jollof-page",children:[e.jsxs("div",{className:"jollof-header",children:[e.jsx("div",{className:"jollof-title",children:"🍚 The Great Jollof War Index 🍚"}),e.jsx("div",{className:"jollof-subtitle",children:"Nigeria vs Ghana — The eternal debate, now with financial data"})]}),e.jsxs("div",{className:"jollof-arena",children:[e.jsxs("div",{className:`jollof-side ng ${s?"winner":t?"loser":""}`,children:[e.jsx("div",{className:"jollof-flag",children:"🇳🇬"}),e.jsx("div",{className:"jollof-country",children:"Nigeria"}),e.jsx("div",{className:"jollof-exchange",children:"NGX Exchange"}),e.jsx("div",{className:`jollof-pct num ${o!=null&&o>=0?"up":"down"}`,children:o!=null?`${o>=0?"+":""}${o.toFixed(2)}%`:a[0].isLoading?"…":"No data"}),s&&e.jsx("div",{className:"jollof-crown",children:"👑 WINNING TODAY"}),e.jsxs("div",{className:"jollof-claim",children:['"Party jollof is the only jollof. ',e.jsx("br",{}),'The smoky bottom is not a mistake."']})]}),e.jsxs("div",{className:"jollof-vs",children:[e.jsx("div",{className:"jollof-vs-text",children:"VS"}),d&&e.jsx("div",{className:"jollof-tied",children:"🤝 TIED"}),!d&&!s&&!t&&e.jsxs("div",{className:"jollof-nodatatext",children:["No market data —",e.jsx("br",{}),"the war continues"]})]}),e.jsxs("div",{className:`jollof-side gh ${t?"winner":s?"loser":""}`,children:[e.jsx("div",{className:"jollof-flag",children:"🇬🇭"}),e.jsx("div",{className:"jollof-country",children:"Ghana"}),e.jsx("div",{className:"jollof-exchange",children:"GSE Exchange"}),e.jsx("div",{className:`jollof-pct num ${l!=null&&l>=0?"up":"down"}`,children:l!=null?`${l>=0?"+":""}${l.toFixed(2)}%`:a[1].isLoading?"…":"No data"}),t&&e.jsx("div",{className:"jollof-crown",children:"👑 WINNING TODAY"}),e.jsxs("div",{className:"jollof-claim",children:['"Waakye is an art form. ',e.jsx("br",{}),'You cannot rush greatness."']})]})]}),e.jsxs("div",{className:"panel jollof-scoreboard",children:[e.jsx("div",{className:"jollof-score-title",children:"All-Time Record (simulated)"}),e.jsxs("div",{className:"jollof-score-row",children:[e.jsxs("div",{className:"jollof-score-item ng",children:[e.jsx("span",{className:"jollof-score-flag",children:"🇳🇬"}),e.jsx("span",{className:"jollof-score-count num",children:"247"}),e.jsx("span",{className:"jollof-score-label",children:"days Nigeria led"})]}),e.jsxs("div",{className:"jollof-score-item draw",children:[e.jsx("span",{children:"🤝"}),e.jsx("span",{className:"jollof-score-count num",children:"31"}),e.jsx("span",{className:"jollof-score-label",children:"days tied"})]}),e.jsxs("div",{className:"jollof-score-item gh",children:[e.jsx("span",{className:"jollof-score-flag",children:"🇬🇭"}),e.jsx("span",{className:"jollof-score-count num",children:"218"}),e.jsx("span",{className:"jollof-score-label",children:"days Ghana led"})]})]}),e.jsx("div",{className:"jollof-score-note",children:"* These numbers are made up. Both countries have excellent jollof and good markets."})]}),e.jsxs("div",{className:"panel jollof-fact",children:[e.jsx("div",{className:"jollof-fact-label",children:"📚 Jollof War Intelligence Report"}),e.jsx("div",{className:"jollof-fact-text",children:j})]}),e.jsxs("div",{className:"jollof-disclaimer",children:["This page is satire. Zamani loves both Nigeria and Ghana deeply and without prejudice.",e.jsx("br",{}),"We also love Senegalese ceebu jën but are afraid to say that too loudly."]}),e.jsx("style",{children:`
        .jollof-page { display: flex; flex-direction: column; gap: 1.5rem; max-width: 800px; margin: 0 auto; }

        .jollof-header { text-align: center; padding: 1rem 0; }
        .jollof-title  { font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
        .jollof-subtitle { font-size: 12px; color: var(--color-text-muted); margin-top: 4px; }

        .jollof-arena {
          display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5rem; align-items: center;
        }

        .jollof-side {
          background: var(--color-bg-secondary); border: 1px solid var(--color-border);
          border-radius: 8px; padding: 1.5rem 1.25rem; text-align: center;
          transition: all 0.3s;
        }
        .jollof-side.winner {
          border-color: var(--color-up); box-shadow: 0 0 20px rgba(74,222,128,0.15);
        }
        .jollof-side.loser { opacity: 0.6; }

        .jollof-flag    { font-size: 36px; margin-bottom: 0.5rem; }
        .jollof-country { font-size: 18px; font-weight: 800; margin-bottom: 2px; }
        .jollof-exchange { font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
        .jollof-pct { font-size: 28px; font-weight: 800; letter-spacing: -0.03em; }
        .jollof-pct.up   { color: var(--color-up); }
        .jollof-pct.down { color: var(--color-down); }
        .jollof-crown { margin-top: 0.5rem; font-size: 11px; font-weight: 700; color: var(--color-up); letter-spacing: 0.04em; }
        .jollof-claim {
          margin-top: 1rem; font-size: 11px; color: var(--color-text-muted);
          font-style: italic; line-height: 1.5;
          border-top: 1px solid var(--color-border-subtle); padding-top: 0.75rem;
        }

        .jollof-vs { text-align: center; }
        .jollof-vs-text { font-size: 28px; font-weight: 900; color: var(--color-gold); }
        .jollof-tied { margin-top: 0.5rem; font-size: 11px; color: var(--color-text-muted); }
        .jollof-nodatatext { margin-top: 0.5rem; font-size: 10px; color: var(--color-text-muted); line-height: 1.4; }

        .jollof-scoreboard { padding: 1rem 1.25rem; }
        .jollof-score-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); margin-bottom: 0.75rem; }
        .jollof-score-row   { display: flex; justify-content: center; gap: 2rem; align-items: center; }
        .jollof-score-item  { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .jollof-score-flag  { font-size: 20px; }
        .jollof-score-count { font-size: 28px; font-weight: 800; color: var(--color-text-primary); }
        .jollof-score-label { font-size: 10px; color: var(--color-text-muted); }
        .jollof-score-note  { font-size: 9px; color: var(--color-text-muted); text-align: center; margin-top: 0.75rem; font-style: italic; }

        .jollof-fact { padding: 1rem 1.25rem; }
        .jollof-fact-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-gold); margin-bottom: 0.5rem; }
        .jollof-fact-text  { font-size: 13px; color: var(--color-text-secondary); line-height: 1.6; font-style: italic; }

        .jollof-disclaimer { font-size: 10px; color: var(--color-text-muted); text-align: center; line-height: 1.6; }
      `})]})}export{u as default};
