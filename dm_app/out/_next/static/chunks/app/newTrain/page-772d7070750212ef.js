(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[848],{35:function(e,n,i){Promise.resolve().then(i.bind(i,4279))},6327:function(e,n,i){"use strict";i.d(n,{A7:function(){return c},EO:function(){return h},JE:function(){return m}});var r=i(9268),l=i(1822),t=i(6840),s=i(6720),a=i(4873),d=i(728),o=i(3862),u=i(157);function c(e){let{element:n}=e;return(0,r.jsx)(l.Tr,{children:n.map((e,n)=>(0,r.jsx)(t.Td,{children:e},n))})}function h(e){let{element:n}=e;return(0,r.jsx)(l.Tr,{children:n.map((e,n)=>(0,r.jsx)(t.Td,{children:e},n))})}function m(e){let{indexes:n,children:i}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(s.x,{children:(0,r.jsxs)(a.i,{variant:"simple",colorScheme:"gray",children:[(0,r.jsx)(d.h,{children:(0,r.jsx)(l.Tr,{children:n.map((e,n)=>(0,r.jsx)(o.Th,{children:e},n))})}),(0,r.jsx)(u.p,{children:i})]})})})}i(6006)},9360:function(e,n,i){"use strict";i.d(n,{_:function(){return r}});let r=e=>async(n,i)=>{let r={};r=void 0===i?{credentials:"include"}:{...i,credentials:"include"};let l=await fetch(n,r),t=await l.json();return e.parse(t)}},4194:function(e,n,i){"use strict";i.d(n,{H:function(){return l}});var r=i(2391);let l=r.z.object({drivers:r.z.array(r.z.object({driver_id:r.z.number().positive().int(),name:r.z.string(),affilitation:r.z.string()}))})},2503:function(e,n,i){"use strict";i.d(n,{y:function(){return l}});var r=i(2391);let l=r.z.object({stations:r.z.array(r.z.object({station_id:r.z.number().positive().int(),name:r.z.string(),city:r.z.string(),line:r.z.string()}))})},4279:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return F}});var r=i(9268),l=i(2503),t=i(4194),s=i(5846),a=i.n(s),d=i(5559),o=i(8823),u=i(1060),c=i(2386),h=i(7932),m=i(9745),x=i(5134),p=i(6185),v=i(673),j=i(2127),f=i(160),_=i(2344),b=i(4658),g=i(2261),y=i(7400),I=i(1822),k=i(9360),N=i(730),C=i(6327),S=i(6006),z=i(6008);function F(){var e,n,i,s;let{data:F,error:P}=(0,N.ZP)("http://user.keio.ac.jp/~ub622319/dm_app/api/get_stations",(0,k._)(l.y)),T=null==F?void 0:F.stations,{data:q,error:E}=(0,N.ZP)("http://user.keio.ac.jp/~ub622319/dm_app/api/get_drivers",(0,k._)(t.H)),O=null==q?void 0:q.drivers,[w,R]=(0,S.useState)(0),[B,G]=(0,S.useState)(0),[L,J]=(0,S.useState)(0),[H,D]=(0,S.useState)([]),Q=(0,z.useRouter)(),Y=async()=>{let e={train:{schedule:H.map(e=>({...e,conductor_id:1})),detail:{origin:w,destinaion:B,car_id:0,id:L}}};await fetch("http://user.keio.ac.jp/~ub622319/dm_app/api/add_train",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),Q.push("/train/")};return console.log(P,E,H),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d.X,{as:"h2",size:"lg",children:"列車管理 編集"}),(0,r.jsxs)(o.U,{p:"1rem",spacing:"1rem",children:[(0,r.jsx)(u.xu,{p:"1rem",children:(0,r.jsxs)(c.NI,{children:[(0,r.jsx)(h.l,{children:"列車番号"}),(0,r.jsx)(m.I,{type:"number",value:L,onChange:e=>J(parseInt(e.target.value,10))})]})}),(0,r.jsxs)(x.k,{p:"1rem",children:[(0,r.jsxs)(c.NI,{children:[(0,r.jsx)(h.l,{children:"出発"}),(0,r.jsx)(p.P,{value:w,onChange:e=>R(parseInt(e.target.value,10)),children:null==T?void 0:T.map((e,n)=>(0,r.jsx)("option",{value:e.station_id,children:e.name},n))})]}),(0,r.jsxs)(c.NI,{children:[(0,r.jsx)(h.l,{children:"到着"}),(0,r.jsx)(p.P,{value:B,onChange:e=>G(parseInt(e.target.value,10)),children:null==T?void 0:T.map((e,n)=>(0,r.jsx)("option",{value:e.station_id,children:e.name},n))})]})]}),(0,r.jsx)(v.L,{}),(0,r.jsxs)(x.k,{children:[(0,r.jsx)(u.xu,{p:"0.25rem",children:(0,r.jsx)(a(),{href:"/train/[slug]",as:"/train",children:(0,r.jsx)(j.z,{colorScheme:"red",children:"キャンセル"})})}),(0,r.jsx)(u.xu,{p:"0.25rem",children:(0,r.jsx)(j.z,{colorScheme:"blue",onClick:Y,children:"更新"})})]})]}),(0,r.jsx)(u.xu,{p:"1rem",children:(0,r.jsxs)(f.m,{children:[(0,r.jsxs)(_.t,{children:[(0,r.jsx)(b.O,{children:"停車駅"}),(0,r.jsx)(b.O,{children:"乗務員"})]}),(0,r.jsxs)(g.n,{children:[(0,r.jsx)(y.x,{children:(0,r.jsxs)(C.JE,{indexes:["駅","到着時間","出発時間",""],children:[null==H?void 0:H.map((l,t)=>(0,r.jsx)(C.EO,{element:[(0,r.jsxs)(p.P,{variant:"outline",value:null!==(e=l.station_id)&&void 0!==e?e:"",onChange:e=>(H[t].station_id=parseInt(e.target.value,10),D([...H])),children:[(0,r.jsx)("option",{value:0,children:"駅を選択"}),null==T?void 0:T.map(e=>(0,r.jsx)("option",{value:e.station_id,children:e.name},e.station_id))]},t),(0,r.jsx)(c.NI,{children:(0,r.jsx)(m.I,{type:"number",value:null!==(n=l.arrival_time)&&void 0!==n?n:"",onChange:e=>(H[t].arrival_time=parseInt(e.target.value,10),D([...H]))})},t),(0,r.jsx)(c.NI,{children:(0,r.jsx)(m.I,{type:"number",value:null!==(i=l.departure_time)&&void 0!==i?i:"",onChange:e=>(H[t].departure_time=""===e.target.value?null:parseInt(e.target.value,10),D([...H]))})},t),(0,r.jsx)(j.z,{colorScheme:"red",onClick:()=>(H.splice(t,1),D([...H])),children:"削除"},t)]},t)),(0,r.jsx)(I.Tr,{children:(0,r.jsx)(j.z,{colorScheme:"blue",onClick:()=>{D([...H,{station_id:0,arrival_time:null,departure_time:null,driver_id:0}])},children:"追加"})})]})}),(0,r.jsx)(y.x,{children:(0,r.jsxs)(C.JE,{indexes:["駅","運転手"],children:[null==H?void 0:H.map((e,n)=>(0,r.jsx)(C.EO,{element:[(0,r.jsxs)(p.P,{variant:"outline",value:null!==(s=e.station_id)&&void 0!==s?s:"",onChange:e=>(H[n].station_id=parseInt(e.target.value,10),D([...H])),children:[(0,r.jsx)("option",{value:0,children:"駅を選択"}),null==T?void 0:T.map(e=>(0,r.jsx)("option",{value:e.station_id,children:e.name},e.station_id))]},n),(0,r.jsx)(c.NI,{children:(0,r.jsx)(p.P,{value:e.driver_id,onChange:e=>(H[n].driver_id=parseInt(e.target.value,10),D([...H])),children:null==O?void 0:O.map((e,n)=>(0,r.jsx)("option",{value:e.driver_id,children:e.name},n))})},n)]},n)),(0,r.jsx)(I.Tr,{children:(0,r.jsx)(j.z,{colorScheme:"blue",onClick:()=>{D([...H,{station_id:0,arrival_time:null,departure_time:null,driver_id:1}])},children:"追加"})})]})})]})]})})]})}},6008:function(e,n,i){e.exports=i(8170)},7932:function(e,n,i){"use strict";i.d(n,{l:function(){return u},n:function(){return c}});var r=i(2386),l=i(8710),t=i(5526),s=i(2424),a=i(2088),d=i(463),o=i(9268),u=(0,l.G)(function(e,n){var i;let l=(0,t.mq)("FormLabel",e),u=(0,s.Lr)(e),{className:h,children:m,requiredIndicator:x=(0,o.jsx)(c,{}),optionalIndicator:p=null,...v}=u,j=(0,r.NJ)(),f=null!=(i=null==j?void 0:j.getLabelProps(v,n))?i:{ref:n,...v};return(0,o.jsxs)(a.m.label,{...f,className:(0,d.cx)("chakra-form__label",u.className),__css:{display:"block",textAlign:"start",...l},children:[m,(null==j?void 0:j.isRequired)?x:p]})});u.displayName="FormLabel";var c=(0,l.G)(function(e,n){let i=(0,r.NJ)(),l=(0,r.e)();if(!(null==i?void 0:i.isRequired))return null;let t=(0,d.cx)("chakra-form__required-indicator",e.className);return(0,o.jsx)(a.m.span,{...null==i?void 0:i.getRequiredIndicatorProps(e,n),__css:l.requiredIndicator,className:t})});c.displayName="RequiredIndicator"},2386:function(e,n,i){"use strict";i.d(n,{NI:function(){return v},NJ:function(){return p},Q6:function(){return j},e:function(){return m}});var r=i(2027),l=i(4966),t=i(8710),s=i(5526),a=i(2424),d=i(2088),o=i(463),u=i(6006),c=i(9268),[h,m]=(0,r.k)({name:"FormControlStylesContext",errorMessage:"useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<FormControl />\" "}),[x,p]=(0,r.k)({strict:!1,name:"FormControlContext"}),v=(0,t.G)(function(e,n){let i=(0,s.jC)("Form",e),r=(0,a.Lr)(e),{getRootProps:t,htmlProps:m,...p}=function(e){let{id:n,isRequired:i,isInvalid:r,isDisabled:t,isReadOnly:s,...a}=e,d=(0,u.useId)(),c=n||`field-${d}`,h=`${c}-label`,m=`${c}-feedback`,x=`${c}-helptext`,[p,v]=(0,u.useState)(!1),[j,f]=(0,u.useState)(!1),[_,b]=(0,u.useState)(!1),g=(0,u.useCallback)((e={},n=null)=>({id:x,...e,ref:(0,l.lq)(n,e=>{e&&f(!0)})}),[x]),y=(0,u.useCallback)((e={},n=null)=>({...e,ref:n,"data-focus":(0,o.PB)(_),"data-disabled":(0,o.PB)(t),"data-invalid":(0,o.PB)(r),"data-readonly":(0,o.PB)(s),id:void 0!==e.id?e.id:h,htmlFor:void 0!==e.htmlFor?e.htmlFor:c}),[c,t,_,r,s,h]),I=(0,u.useCallback)((e={},n=null)=>({id:m,...e,ref:(0,l.lq)(n,e=>{e&&v(!0)}),"aria-live":"polite"}),[m]),k=(0,u.useCallback)((e={},n=null)=>({...e,...a,ref:n,role:"group"}),[a]),N=(0,u.useCallback)((e={},n=null)=>({...e,ref:n,role:"presentation","aria-hidden":!0,children:e.children||"*"}),[]);return{isRequired:!!i,isInvalid:!!r,isReadOnly:!!s,isDisabled:!!t,isFocused:!!_,onFocus:()=>b(!0),onBlur:()=>b(!1),hasFeedbackText:p,setHasFeedbackText:v,hasHelpText:j,setHasHelpText:f,id:c,labelId:h,feedbackId:m,helpTextId:x,htmlProps:a,getHelpTextProps:g,getErrorMessageProps:I,getRootProps:k,getLabelProps:y,getRequiredIndicatorProps:N}}(r),v=(0,o.cx)("chakra-form-control",e.className);return(0,c.jsx)(x,{value:p,children:(0,c.jsx)(h,{value:i,children:(0,c.jsx)(d.m.div,{...t({},n),className:v,__css:i.container})})})});v.displayName="FormControl";var j=(0,t.G)(function(e,n){let i=p(),r=m(),l=(0,o.cx)("chakra-form__helper-text",e.className);return(0,c.jsx)(d.m.div,{...null==i?void 0:i.getHelpTextProps(e,n),__css:r.helperText,className:l})});j.displayName="FormHelperText"},7106:function(e,n,i){"use strict";i.d(n,{K:function(){return s},Y:function(){return t}});var r=i(2386),l=i(463);function t(e){let{isDisabled:n,isInvalid:i,isReadOnly:r,isRequired:t,...a}=s(e);return{...a,disabled:n,readOnly:r,required:t,"aria-invalid":(0,l.Qm)(i),"aria-required":(0,l.Qm)(t),"aria-readonly":(0,l.Qm)(r)}}function s(e){var n,i,t;let s=(0,r.NJ)(),{id:a,disabled:d,readOnly:o,required:u,isRequired:c,isInvalid:h,isReadOnly:m,isDisabled:x,onFocus:p,onBlur:v,...j}=e,f=e["aria-describedby"]?[e["aria-describedby"]]:[];return(null==s?void 0:s.hasFeedbackText)&&(null==s?void 0:s.isInvalid)&&f.push(s.feedbackId),(null==s?void 0:s.hasHelpText)&&f.push(s.helpTextId),{...j,"aria-describedby":f.join(" ")||void 0,id:null!=a?a:null==s?void 0:s.id,isDisabled:null!=(n=null!=d?d:x)?n:null==s?void 0:s.isDisabled,isReadOnly:null!=(i=null!=o?o:m)?i:null==s?void 0:s.isReadOnly,isRequired:null!=(t=null!=u?u:c)?t:null==s?void 0:s.isRequired,isInvalid:null!=h?h:null==s?void 0:s.isInvalid,onFocus:(0,l.v0)(null==s?void 0:s.onFocus,p),onBlur:(0,l.v0)(null==s?void 0:s.onBlur,v)}}},9745:function(e,n,i){"use strict";i.d(n,{I:function(){return u}});var r=i(7106),l=i(8710),t=i(5526),s=i(2424),a=i(2088),d=i(463),o=i(9268),u=(0,l.G)(function(e,n){let{htmlSize:i,...l}=e,u=(0,t.jC)("Input",l),c=(0,s.Lr)(l),h=(0,r.Y)(c),m=(0,d.cx)("chakra-input",e.className);return(0,o.jsx)(a.m.input,{size:i,...h,__css:u.field,ref:n,className:m})});u.displayName="Input",u.id="Input"},5134:function(e,n,i){"use strict";i.d(n,{k:function(){return s}});var r=i(8710),l=i(2088),t=i(9268),s=(0,r.G)(function(e,n){let{direction:i,align:r,justify:s,wrap:a,basis:d,grow:o,shrink:u,...c}=e;return(0,t.jsx)(l.m.div,{ref:n,__css:{display:"flex",flexDirection:i,alignItems:r,justifyContent:s,flexWrap:a,flexBasis:d,flexGrow:o,flexShrink:u},...c})});s.displayName="Flex"},6185:function(e,n,i){"use strict";i.d(n,{P:function(){return h}});var r=i(1373),l=i(7106),t=i(8710),s=i(5526),a=i(2424),d=i(2088),o=i(463),u=i(6006),c=i(9268),h=(0,t.G)((e,n)=>{var i;let t=(0,s.jC)("Select",e),{rootProps:u,placeholder:h,icon:m,color:x,height:v,h:j,minH:f,minHeight:_,iconColor:b,iconSize:g,...y}=(0,a.Lr)(e),[I,k]=function(e,n){let i={},r={};for(let[l,t]of Object.entries(e))n.includes(l)?i[l]=t:r[l]=t;return[i,r]}(y,a.oE),N=(0,l.Y)(k),C={paddingEnd:"2rem",...t.field,_focus:{zIndex:"unset",...null==(i=t.field)?void 0:i._focus}};return(0,c.jsxs)(d.m.div,{className:"chakra-select__wrapper",__css:{width:"100%",height:"fit-content",position:"relative",color:x},...I,...u,children:[(0,c.jsx)(r.m,{ref:n,height:null!=j?j:v,minH:null!=f?f:_,placeholder:h,...N,__css:C,children:e.children}),(0,c.jsx)(p,{"data-disabled":(0,o.PB)(N.disabled),...(b||x)&&{color:b||x},__css:t.icon,...g&&{fontSize:g},children:m})]})});h.displayName="Select";var m=e=>(0,c.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,c.jsx)("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"})}),x=(0,d.m)("div",{baseStyle:{position:"absolute",display:"inline-flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",top:"50%",transform:"translateY(-50%)"}}),p=e=>{let{children:n=(0,c.jsx)(m,{}),...i}=e,r=(0,u.cloneElement)(n,{role:"presentation",className:"chakra-select__icon",focusable:!1,"aria-hidden":!0,style:{width:"1em",height:"1em",color:"currentColor"}});return(0,c.jsx)(x,{...i,className:"chakra-select__icon-wrapper",children:(0,u.isValidElement)(n)?r:null})};p.displayName="SelectIcon"},1373:function(e,n,i){"use strict";i.d(n,{m:function(){return a}});var r=i(463),l=i(8710),t=i(2088),s=i(9268),a=(0,l.G)(function(e,n){let{children:i,placeholder:l,className:a,...d}=e;return(0,s.jsxs)(t.m.select,{...d,ref:n,className:(0,r.cx)("chakra-select",a),children:[l&&(0,s.jsx)("option",{value:"",children:l}),i]})});a.displayName="SelectField"}},function(e){e.O(0,[559,845,782,787,253,961,744],function(){return e(e.s=35)}),_N_E=e.O()}]);