(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[927],{1266:function(n,i,r){Promise.resolve().then(r.bind(r,3763))},6327:function(n,i,r){"use strict";r.d(i,{A7:function(){return c},EO:function(){return v},JE:function(){return m}});var t=r(9268),e=r(1822),a=r(6840),d=r(6720),o=r(4873),l=r(728),s=r(3862),u=r(157);function c(n){let{element:i}=n;return(0,t.jsx)(e.Tr,{children:i.map((n,i)=>(0,t.jsx)(a.Td,{children:n},i))})}function v(n){let{element:i}=n;return(0,t.jsx)(e.Tr,{children:i.map((n,i)=>(0,t.jsx)(a.Td,{children:n},i))})}function m(n){let{indexes:i,children:r}=n;return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(d.x,{children:(0,t.jsxs)(o.i,{variant:"simple",colorScheme:"gray",children:[(0,t.jsx)(l.h,{children:(0,t.jsx)(e.Tr,{children:i.map((n,i)=>(0,t.jsx)(s.Th,{children:n},i))})}),(0,t.jsx)(u.p,{children:r})]})})})}r(6006)},9360:function(n,i,r){"use strict";r.d(i,{_:function(){return t}});let t=n=>async(i,r)=>{let t={};t=void 0===r?{credentials:"include"}:{...r,credentials:"include"};let e=await fetch(i,t),a=await e.json();return n.parse(a)}},6196:function(n,i,r){"use strict";r.d(i,{x:function(){return e}});var t=r(2391);let e=t.z.object({range:t.z.array(t.z.object({train_id:t.z.number(),conductor_id:t.z.number(),driver_id:t.z.number(),station_id:t.z.number()}))})},4194:function(n,i,r){"use strict";r.d(i,{H:function(){return e}});var t=r(2391);let e=t.z.object({drivers:t.z.array(t.z.object({driver_id:t.z.number().positive().int(),name:t.z.string(),affilitation:t.z.string()}))})},2503:function(n,i,r){"use strict";r.d(i,{y:function(){return e}});var t=r(2391);let e=t.z.object({stations:t.z.array(t.z.object({station_id:t.z.number().positive().int(),name:t.z.string(),city:t.z.string(),line:t.z.string()}))})},4948:function(n,i,r){"use strict";r.d(i,{s:function(){return a}});var t=r(2391);let e=t.z.custom(n=>{if("number"!=typeof n)return!1;let i=n/100,r=n%100;return!(i<0)&&!(i>24)&&!(r<0)&&!(r>59)}),a=t.z.object({stops:t.z.array(t.z.object({train_id:t.z.number(),station_id:t.z.number(),arrival_time:e.nullish(),departure_time:e.nullish()}))})},8301:function(n,i,r){"use strict";r.d(i,{v:function(){return e}});var t=r(2391);let e=t.z.object({train:t.z.object({train_id:t.z.number(),origin:t.z.number(),destinaion:t.z.number(),car:t.z.number()})})},3763:function(n,i,r){"use strict";r.r(i),r.d(i,{default:function(){return w}});var t=r(9268),e=r(8301),a=r(2503),d=r(6196),o=r(4194),l=r(4948),s=r(8823),u=r(1060),c=r(5559),v=r(1283),m=r(673),x=r(2127),p=r(160),h=r(2344),j=r(4658),f=r(2261),_=r(7400),z=r(9360),b=r(730),g=r(6327),y=r(5846),k=r.n(y);function w(){var n,i,r,y,w,T,E;let P={slug:""};P.slug=null!==(r=new URLSearchParams(new URL(window.location.href).search).get("slug"))&&void 0!==r?r:"";let{data:N,error:O}=(0,b.ZP)("http://user.keio.ac.jp/~ub622319/dm_app/api/train_detail/"+P.slug,(0,z._)(e.v)),{data:S,error:Z}=(0,b.ZP)("http://user.keio.ac.jp/~ub622319/dm_app/api/get_stations",(0,z._)(a.y)),A=null==S?void 0:S.stations,L={num:null==N?void 0:N.train.train_id,destination:null!==(y=null==A?void 0:null===(n=A.find(n=>n.station_id===(null==N?void 0:N.train.destinaion)))||void 0===n?void 0:n.name)&&void 0!==y?y:"",origin:null!==(w=null==A?void 0:null===(i=A.find(n=>n.station_id===(null==N?void 0:N.train.origin)))||void 0===i?void 0:i.name)&&void 0!==w?w:""},{data:J,error:R}=(0,b.ZP)("http://user.keio.ac.jp/~ub622319/dm_app/api/get_drivers",(0,z._)(o.H)),U=null==J?void 0:J.drivers,{data:C,error:F}=(0,b.ZP)("http://user.keio.ac.jp/~ub622319/dm_app/api/crewRange/".concat(null==N?void 0:N.train.train_id),(0,z._)(d.x)),H=null==C?void 0:C.range.map((n,i)=>{var r,t,e,a;return{station:null!==(e=null==A?void 0:null===(r=A.find(i=>i.station_id===n.station_id))||void 0===r?void 0:r.name)&&void 0!==e?e:"",driver:null!==(a=null==U?void 0:null===(t=U.find(i=>i.driver_id===n.driver_id))||void 0===t?void 0:t.name)&&void 0!==a?a:""}}),{data:q,error:D}=(0,b.ZP)("http://user.keio.ac.jp/~ub622319/dm_app/api/stops/".concat(null==N?void 0:N.train.train_id),(0,z._)(l.s)),G=null==q?void 0:q.stops.map((n,i)=>{var r,t;return{station:null!==(t=null==A?void 0:null===(r=A.find(i=>i.station_id===n.station_id))||void 0===r?void 0:r.name)&&void 0!==t?t:"",arrival:n.arrival_time,departure:n.departure_time}});return console.log(O,Z,R,F,D),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(s.U,{p:"1rem",spacing:"1rem",children:[(0,t.jsx)(u.xu,{p:"1rem",children:(0,t.jsxs)(c.X,{as:"h3",size:"md",children:["列車番号: ",null==N?void 0:N.train.train_id]})}),(0,t.jsxs)(u.xu,{p:"1rem",children:[(0,t.jsxs)(v.x,{children:["出発: ",L.origin]}),(0,t.jsxs)(v.x,{children:["到着: ",L.destination]})]}),(0,t.jsx)(m.L,{}),(0,t.jsx)(u.xu,{children:(0,t.jsx)(k(),{href:"/train/edit?slug=".concat(null==N?void 0:N.train.train_id),children:(0,t.jsx)(x.z,{colorScheme:"green",children:"編集"})})})]}),(0,t.jsx)(u.xu,{p:"1rem",children:(0,t.jsxs)(p.m,{children:[(0,t.jsxs)(h.t,{children:[(0,t.jsx)(j.O,{children:"停車駅"}),(0,t.jsx)(j.O,{children:"乗務員"})]}),(0,t.jsxs)(f.n,{children:[(0,t.jsx)(_.x,{children:(0,t.jsx)(g.JE,{indexes:["駅","到着時間","出発時間"],children:null==G?void 0:G.map((n,i)=>{var r,e;return(0,t.jsx)(g.A7,{element:[n.station,null!==(T=null===(r=n.arrival)||void 0===r?void 0:r.toString())&&void 0!==T?T:"-",null!==(E=null===(e=n.departure)||void 0===e?void 0:e.toString())&&void 0!==E?E:"-"]},i)})})}),(0,t.jsx)(_.x,{children:(0,t.jsx)(g.JE,{indexes:["駅","運転手"],children:null==H?void 0:H.map((n,i)=>(0,t.jsx)(g.A7,{element:[n.station,n.driver]},i))})})]})]})})]})}},1283:function(n,i,r){"use strict";r.d(i,{x:function(){return u}});var t=r(8710),e=r(5526),a=r(2424),d=r(2088),o=r(463),l=r(7873),s=r(9268),u=(0,t.G)(function(n,i){let r=(0,e.mq)("Text",n),{className:t,align:u,decoration:c,casing:v,...m}=(0,a.Lr)(n),x=(0,l.o)({textAlign:n.align,textDecoration:n.decoration,textTransform:n.casing});return(0,s.jsx)(d.m.p,{ref:i,className:(0,o.cx)("chakra-text",n.className),...x,...m,__css:r})});u.displayName="Text"},7873:function(n,i,r){"use strict";function t(n){let i=Object.assign({},n);for(let n in i)void 0===i[n]&&delete i[n];return i}r.d(i,{o:function(){return t}})}},function(n){n.O(0,[559,845,782,787,253,961,744],function(){return n(n.s=1266)}),_N_E=n.O()}]);