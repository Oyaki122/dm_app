(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[44],{6905:function(t,n,e){Promise.resolve().then(e.bind(e,1347))},9360:function(t,n,e){"use strict";e.d(n,{_:function(){return r}});let r=t=>async(n,e)=>{let r={};r=void 0===e?{credentials:"include"}:{...e,credentials:"include"};let i=await fetch(n,r),s=await i.json();return t.parse(s)}},2503:function(t,n,e){"use strict";e.d(n,{y:function(){return i}});var r=e(2391);let i=r.z.object({stations:r.z.array(r.z.object({station_id:r.z.number().positive().int(),name:r.z.string(),city:r.z.string(),line:r.z.string()}))})},1347:function(t,n,e){"use strict";e.r(n),e.d(n,{default:function(){return _}});var r=e(9268),i=e(8705),s=e(1622),o=e(5559),a=e(8131),u=e(1283),c=e(5846),l=e.n(c);function d(t){let{num:n,destination:e,origin:c}=t;return(0,r.jsx)(l(),{href:"/train/detail?slug=".concat(n),children:(0,r.jsxs)(i.Z,{size:"sm",variant:"outline",children:[(0,r.jsx)(s.O,{pb:0,children:(0,r.jsxs)(o.X,{as:"h3",size:"md",children:["Train ",n]})}),(0,r.jsxs)(a.e,{children:[(0,r.jsxs)(u.x,{pt:"1",fontSize:"sm",children:[(0,r.jsx)("b",{children:"Destination:"})," ",e]}),(0,r.jsxs)(u.x,{pt:"1",fontSize:"sm",children:[(0,r.jsx)("b",{children:"Origin:"})," ",c]})]})]})})}var f=e(2391);let m=f.z.object({trains:f.z.array(f.z.object({train_id:f.z.number(),origin:f.z.number(),destinaion:f.z.number(),car:f.z.number()}))});var x=e(9360),v=e(730),h=e(2503);function _(){let{data:t,error:n}=(0,v.ZP)("http://user.keio.ac.jp/~ub622319/dm_app2//api/train_details",(0,x._)(m)),{data:e,error:i}=(0,v.ZP)("http://user.keio.ac.jp/~ub622319/dm_app2//api/get_stations",(0,x._)(h.y)),s=null==e?void 0:e.stations,a=null==t?void 0:t.trains;return console.log(n,i),console.log(a),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.X,{as:"h2",size:"lg",children:"列車管理"}),null==a?void 0:a.map(t=>{var n,e,i,o;let a="/train/detail?slug=".concat(t.train_id);return console.log(a),(0,r.jsx)(d,{num:t.train_id,destination:null!==(i=null==s?void 0:null===(n=s.find(n=>n.station_id===t.destinaion))||void 0===n?void 0:n.name)&&void 0!==i?i:"",origin:null!==(o=null==s?void 0:null===(e=s.find(n=>n.station_id===t.origin))||void 0===e?void 0:e.name)&&void 0!==o?o:""},t.train_id)})]})}},1622:function(t,n,e){"use strict";e.d(n,{O:function(){return u}});var r=e(838),i=e(463),s=e(8710),o=e(2088),a=e(9268),u=(0,s.G)(function(t,n){let{className:e,...s}=t,u=(0,r.v)();return(0,a.jsx)(o.m.div,{ref:n,className:(0,i.cx)("chakra-card__header",e),__css:u.header,...s})})},8131:function(t,n,e){"use strict";e.d(n,{e:function(){return u}});var r=e(838),i=e(463),s=e(8710),o=e(2088),a=e(9268),u=(0,s.G)(function(t,n){let{className:e,...s}=t,u=(0,r.v)();return(0,a.jsx)(o.m.div,{ref:n,className:(0,i.cx)("chakra-card__body",e),__css:u.body,...s})})},838:function(t,n,e){"use strict";e.d(n,{Y:function(){return r},v:function(){return i}});var[r,i]=(0,e(1511).eC)("Card")},8705:function(t,n,e){"use strict";e.d(n,{Z:function(){return l}});var r=e(838),i=e(463),s=e(8710),o=e(2424),a=e(5526),u=e(2088),c=e(9268),l=(0,s.G)(function(t,n){let{className:e,children:s,direction:l="column",justify:d,align:f,...m}=(0,o.Lr)(t),x=(0,a.jC)("Card",t);return(0,c.jsx)(u.m.div,{ref:n,className:(0,i.cx)("chakra-card",e),__css:{display:"flex",flexDirection:l,justifyContent:d,alignItems:f,position:"relative",minWidth:0,wordWrap:"break-word",...x.container},...m,children:(0,c.jsx)(r.Y,{value:x,children:s})})})},1283:function(t,n,e){"use strict";e.d(n,{x:function(){return l}});var r=e(8710),i=e(5526),s=e(2424),o=e(2088),a=e(463),u=e(7873),c=e(9268),l=(0,r.G)(function(t,n){let e=(0,i.mq)("Text",t),{className:r,align:l,decoration:d,casing:f,...m}=(0,s.Lr)(t),x=(0,u.o)({textAlign:t.align,textDecoration:t.decoration,textTransform:t.casing});return(0,c.jsx)(o.m.p,{ref:n,className:(0,a.cx)("chakra-text",t.className),...x,...m,__css:e})});l.displayName="Text"},7873:function(t,n,e){"use strict";function r(t){let n=Object.assign({},t);for(let t in n)void 0===n[t]&&delete n[t];return n}e.d(n,{o:function(){return r}})},1511:function(t,n,e){"use strict";e.d(n,{Dm:function(){return m},ZL:function(){return _},Fo:function(){return x},f6:function(){return f},eC:function(){return h},yK:function(){return v}});var r=e(5790),i=e(6006);function s(t={}){let{strict:n=!0,errorMessage:e="useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",name:r}=t,s=(0,i.createContext)(void 0);return s.displayName=r,[s.Provider,function t(){var r;let o=(0,i.useContext)(s);if(!o&&n){let n=Error(e);throw n.name="ContextError",null==(r=Error.captureStackTrace)||r.call(Error,n,t),n}return o},s]}var o=e(2424),a=e(6302),u=e(7165),c=e(4059),l=e(2120),d=e(9268);function f(t){let{cssVarsRoot:n,theme:e,children:r}=t,s=(0,i.useMemo)(()=>(0,o.c0)(e),[e]);return(0,d.jsxs)(c.a,{theme:s,children:[(0,d.jsx)(m,{root:n}),r]})}function m({root:t=":host, :root"}){let n=[t,"[data-theme]"].join(",");return(0,d.jsx)(l.xB,{styles:t=>({[n]:t.__cssVars})})}var[x,v]=s({name:"StylesContext",errorMessage:"useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "});function h(t){return s({name:`${t}StylesContext`,errorMessage:`useStyles: "styles" is undefined. Seems you forgot to wrap the components in "<${t} />" `})}function _(){let{colorMode:t}=(0,r.If)();return(0,d.jsx)(l.xB,{styles:n=>{let e=(0,a.Wf)(n,"styles.global"),r=(0,u.Pu)(e,{theme:n,colorMode:t});if(!r)return;let i=(0,o.iv)(r)(n);return i}})}}},function(t){t.O(0,[559,845,782,253,961,744],function(){return t(t.s=6905)}),_N_E=t.O()}]);