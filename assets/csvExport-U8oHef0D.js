import{c as l}from"./index-DA4_4N8F.js";const i=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],u=l("download",i);function m(c,t){const a=c.map(d=>d.map(r=>{const e=String(r??"");return e.includes(",")||e.includes('"')||e.includes(`
`)?`"${e.replace(/"/g,'""')}"`:e}).join(",")).join(`
`),s=new Blob([a],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(s),n=document.createElement("a");n.href=o,n.download=t,n.click(),URL.revokeObjectURL(o)}export{u as D,m as d};
