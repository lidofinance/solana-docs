(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[590],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return s},kt:function(){return m}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),p=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,d=u["".concat(l,".").concat(m)]||u[m]||f[m]||i;return n?o.createElement(d,a(a({ref:t},s),{},{components:n})):o.createElement(d,a({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var p=2;p<i;p++)a[p]=n[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1294:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return a},metadata:function(){return c},toc:function(){return l},default:function(){return s}});var o=n(2122),r=n(9756),i=(n(7294),n(3905)),a={title:"specification",description:"Overview of the intent of specification of the LIDO for Solana repo",keywords:["development","developers","lido","specification","intent","solana"],sidebar_position:1},c={unversionedId:"development/specification/specification",id:"development/specification/specification",isDocsHomePage:!1,title:"Specification Overview",description:"Overview of the intent of specification of the LIDO for Solana repo",source:"@site/docs/development/specification/specification.md",sourceDirName:"development/specification",slug:"/development/specification/specification",permalink:"/solana-docs/development/specification/specification",version:"current",sidebarPosition:1,frontMatter:{title:"specification",description:"Overview of the intent of specification of the LIDO for Solana repo",keywords:["development","developers","lido","specification","intent","solana"],sidebar_position:1},sidebar:"solidoSidebar",previous:{title:"Reproducibility",permalink:"/solana-docs/development/reproducibility"},next:{title:"cli",permalink:"/solana-docs/development/specification/cli/cli"}},l=[],p={toc:l};function s(e){var t=e.components,n=(0,r.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The Solido repo can be generally split into three logical components:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"./Solido/solido"},"solido")," (the on-chain program)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"./Multisig/multisig"},"multisig")," (the on-chain multisig governance program)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"./Cli/cli"},"cli")," ( the command line interface into the solido and multisig programs)")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Caveat: The initial iterations of Solido used the Solana program library stake-pool program, whilst this is no longer used as a main component, there exists references to data structures within the stake pool program.")),(0,i.kt)("p",null,"There is also an dependency on the spl_token program from the Solana program library but this is used as is with no changes."))}s.isMDXComponent=!0}}]);