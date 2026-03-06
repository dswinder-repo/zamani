function d(t,o){const s=t.map(l=>l.map(r=>{const e=String(r??"");return e.includes(",")||e.includes('"')||e.includes(`
`)?`"${e.replace(/"/g,'""')}"`:e}).join(",")).join(`
`),a=new Blob([s],{type:"text/csv;charset=utf-8;"}),c=URL.createObjectURL(a),n=document.createElement("a");n.href=c,n.download=o,n.click(),URL.revokeObjectURL(c)}export{d};
