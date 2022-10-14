"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6223],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=o.createContext({}),d=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=d(e.components);return o.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=d(n),m=r,h=u["".concat(p,".").concat(m)]||u[m]||s[m]||i;return n?o.createElement(h,a(a({ref:t},c),{},{components:n})):o.createElement(h,a({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,a[1]=l;for(var d=2;d<i;d++)a[d]=n[d];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7780:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var o=n(7462),r=(n(7294),n(3905));const i={},a="Reproducibility",l={unversionedId:"development/reproducibility",id:"development/reproducibility",title:"Reproducibility",description:"To verify that the programs deployed on-chain were built from a specific version",source:"@site/docs/development/reproducibility.md",sourceDirName:"development",slug:"/development/reproducibility",permalink:"/development/reproducibility",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"solidoSidebar",previous:{title:"Price oracle",permalink:"/development/price-oracle"},next:{title:"Introduction",permalink:"/frontend-integration/sdk/"}},p={},d=[{value:"Building",id:"building",level:2},{value:"Verification",id:"verification",level:2}],c={toc:d};function s(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"reproducibility"},"Reproducibility"),(0,r.kt)("p",null,"To verify that the programs deployed on-chain were built from a specific version\nof the Soldio source code, we can reproduce the programs with the steps below."),(0,r.kt)("h2",{id:"building"},"Building"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"./buildimage.sh")," script ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ChorusOne/solido/blob/main/buildimage.sh"},"in the repository root")," builds the\nprograms in a Docker container, and copies them out of the container into the\n",(0,r.kt)("inlineCode",{parentName:"p"},"build")," directory. That directory will then contain:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"lido.so"),": the Solido program that runs on-chain."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"serum_multisig.so"),": the multisig governance program that runs on-chain."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"solido"),": the command-line management client that runs locally.")),(0,r.kt)("h2",{id:"verification"},"Verification"),(0,r.kt)("p",null,"To verify that an on-chain program matches one we built, we have to download the\non-chain program. Suppose the program was deployed at address\n",(0,r.kt)("inlineCode",{parentName:"p"},"7k3rzqoNQxgTLTooAvXriGBKYsd16bV3JMvatvXcBfNo"),", then to download it:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ mkdir onchain\n$ solana program dump 7k3rzqoNQxgTLTooAvXriGBKYsd16bV3JMvatvXcBfNo onchain/lido.so\nWrote program to onchain/lido.so\n")),(0,r.kt)("p",null,"Note that if you have configured a network other than mainnet-beta in\n",(0,r.kt)("inlineCode",{parentName:"p"},"~/.config/solana/cli/config.yml"),", this will dump from that network.\nTo override, pass ",(0,r.kt)("inlineCode",{parentName:"p"},"--url")," and set it to e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"https://api.testnet.solana.com")," or\n",(0,r.kt)("inlineCode",{parentName:"p"},"https://api.mainnet-beta.solana.com"),"."),(0,r.kt)("p",null,"The dumped file will ",(0,r.kt)("em",{parentName:"p"},"not")," match ",(0,r.kt)("inlineCode",{parentName:"p"},"lido.so")," that we built previously, because by\ndefault, Solana pads programs with zeros during the initial deployment, to allow\nroom for future upgrades. The easiest way to verify, is to zero-pad our build of\nthe program as well, so we can make a fair comparison. First, note the file size\nof the dumped program and of our build:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ stat onchain/lido.so build/lido.so\n  File: onchain/lido.so\n  Size: 1042528     Blocks: 2040       IO Block: 4096   regular file\n  ...\n  File: build/lido.so\n  Size: 521264      Blocks: 1024       IO Block: 4096   regular file\n")),(0,r.kt)("p",null,"Confirm that the dump is larger than our build, then pad our build to that size:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ cp build/lido.so build/lido-padded.so\n$ truncate --size=1042528 build/lido-padded.so\n")),(0,r.kt)("p",null,"Now we can confirm that the programs match:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"$ sha256sum build/lido-padded.so onchain/lido.so\n350bae669da9b92ded86c0a89013160c42c4691d1cd5947a285b2e6657bb0c5b  build/lido-padded.so\n350bae669da9b92ded86c0a89013160c42c4691d1cd5947a285b2e6657bb0c5b  onchain/lido.so\n")))}s.isMDXComponent=!0}}]);