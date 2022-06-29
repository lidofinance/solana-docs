(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8551],{3905:function(t,e,a){"use strict";a.d(e,{Zo:function(){return l},kt:function(){return m}});var n=a(7294);function o(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function r(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?r(Object(a),!0).forEach((function(e){o(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function s(t,e){if(null==t)return{};var a,n,o=function(t,e){if(null==t)return{};var a,n,o={},r=Object.keys(t);for(n=0;n<r.length;n++)a=r[n],e.indexOf(a)>=0||(o[a]=t[a]);return o}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(n=0;n<r.length;n++)a=r[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(o[a]=t[a])}return o}var c=n.createContext({}),u=function(t){var e=n.useContext(c),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},l=function(t){var e=u(t.components);return n.createElement(c.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},p=n.forwardRef((function(t,e){var a=t.components,o=t.mdxType,r=t.originalType,c=t.parentName,l=s(t,["components","mdxType","originalType","parentName"]),p=u(a),m=o,g=p["".concat(c,".").concat(m)]||p[m]||d[m]||r;return a?n.createElement(g,i(i({ref:e},l),{},{components:a})):n.createElement(g,i({ref:e},l))}));function m(t,e){var a=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var r=a.length,i=new Array(r);i[0]=p;var s={};for(var c in e)hasOwnProperty.call(e,c)&&(s[c]=e[c]);s.originalType=t,s.mdxType="string"==typeof t?t:o,i[1]=s;for(var u=2;u<r;u++)i[u]=a[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}p.displayName="MDXCreateElement"},319:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return g},frontMatter:function(){return l},metadata:function(){return d},toc:function(){return p}});var n=a(2122),o=a(9756),r=(a(7294),a(3905)),i=a.p+"assets/images/mercurial_error-d13c2ba7c41e92cb97f76ad7ac49fa74.png",s=a.p+"assets/images/raydium_warning-f64d8aa114e25d44c6e147e4f11aaa11.png",c=a.p+"assets/images/raydium_migrate-cf1573ea2c95722a883c0be300216f86.png",u=a.p+"assets/images/saber_migrate-7183c3f70bea568a3d3cf36a31263032.png",l={id:"migrate-aux-to-ata-guide",title:"Migrating tokens from Aux account to ATA account",description:"Guide to help users migrate to Associated Token Accounts",keywords:["Solana","ATA","Saber","Mercurial","Raydium"],sidebar_label:"ATA Migration Guide",sidebar_position:9},d={unversionedId:"staking/migrate-aux-to-ata-guide",id:"staking/migrate-aux-to-ata-guide",isDocsHomePage:!1,title:"Migrating tokens from Aux account to ATA account",description:"Guide to help users migrate to Associated Token Accounts",source:"@site/docs/staking/ata_migration.md",sourceDirName:"staking",slug:"/staking/migrate-aux-to-ata-guide",permalink:"/solana-docs/staking/migrate-aux-to-ata-guide",version:"current",sidebar_label:"ATA Migration Guide",sidebarPosition:9,frontMatter:{id:"migrate-aux-to-ata-guide",title:"Migrating tokens from Aux account to ATA account",description:"Guide to help users migrate to Associated Token Accounts",keywords:["Solana","ATA","Saber","Mercurial","Raydium"],sidebar_label:"ATA Migration Guide",sidebar_position:9},sidebar:"solidoSidebar",previous:{title:"Wormhole Transfer and Orca Pool Guide",permalink:"/solana-docs/staking/Orca-pool-Wormhole-guide"},next:{title:"Governance",permalink:"/solana-docs/governance"}},p=[{value:"Associated Token Accounts v/s Aux Accounts",id:"associated-token-accounts-vs-aux-accounts",children:[]},{value:"Lido for Solana Aux Accounts",id:"lido-for-solana-aux-accounts",children:[]},{value:"How to migrate to an ATA account",id:"how-to-migrate-to-an-ata-account",children:[{value:"1. Checking stSOL in Aux Account",id:"1-checking-stsol-in-aux-account",children:[]},{value:"2. Migrating the Aux Account to ATA",id:"2-migrating-the-aux-account-to-ata",children:[]}]}],m={toc:p};function g(t){var e=t.components,a=(0,o.Z)(t,["components"]);return(0,r.kt)("wrapper",(0,n.Z)({},m,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"associated-token-accounts-vs-aux-accounts"},"Associated Token Accounts v/s Aux Accounts"),(0,r.kt)("p",null,"Solana Program Library (SPL) allows a user to hold multiple tokens accounts corresponding to the same mint. These accounts "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"All have different addresses "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Do not")," bear any relation with the user's main account address"),(0,r.kt)("li",{parentName:"ul"},"Hold only those tokens which are produced by that specific mint")),(0,r.kt)("p",null,"Such accounts are known as Aux Accounts. However, these accounts can be a source of considerable confusion for other users trying to transfer money to the holder of the Aux Accounts. It also becomes nuanced for Dapps to build solutions that list a user's Aux Accounts. "),(0,r.kt)("p",null,"To overcome this problem Solana Program Library provides ",(0,r.kt)("a",{parentName:"p",href:"https://spl.solana.com/associated-token-account"},(0,r.kt)("strong",{parentName:"a"},"Associated Token Accounts"))," (ATA) which are ",(0,r.kt)("em",{parentName:"p"},"deterministically")," derived from the user's main account address and a token mint address. This makes it easier for wallets to keep track of all the ATAs corresponding to one user (one main System account address)."),(0,r.kt)("h2",{id:"lido-for-solana-aux-accounts"},"Lido for Solana Aux Accounts"),(0,r.kt)("p",null,"Every time a user deposits into and subsequently withdraws from the Lido for Solana program they are provided with a ",(0,r.kt)("strong",{parentName:"p"},"deactivating stake account"),". In its early days these deactivating stake accounts were just Aux Accounts. Later on, the Lido program started creating Associated Token Accounts upon withdrawal. Users who performed withdrawals within the first few days of Lido for Solana launch were assigned the Aux accounts."),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"For more details about the withdrawal process and deactivating stake accounts please visit ",(0,r.kt)("a",{parentName:"p",href:"https://docs.solana.lido.fi/staking/phantom#step-6-unstaking-and-utlizing-stsol"},"https://docs.solana.lido.fi/staking/phantom#step-6-unstaking-and-utlizing-stsol")))),(0,r.kt)("p",null,"These users now need to migrate their Aux accounts to ATA as most wallets recognize the ATAs. Those who do not migrate to ATAs may face problems when depositing into pools. For example a user with stSOL in their Aux account tried to deposit into the Mercurial ",(0,r.kt)("a",{parentName:"p",href:"https://mercurial.finance/pools/stsol-2pool"},(0,r.kt)("inlineCode",{parentName:"a"},"stSOL-2Pool"))," but got a warning that their ",(0,r.kt)("inlineCode",{parentName:"p"},"Transaction may fail to confirm")),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:i,alt:"Mercurial Error",width:"500"})),(0,r.kt)("p",null,"This warning and other errors may arise if stSOL lies in an Aux Account instead of an ATA. "),(0,r.kt)("h2",{id:"how-to-migrate-to-an-ata-account"},"How to migrate to an ATA account"),(0,r.kt)("h3",{id:"1-checking-stsol-in-aux-account"},"1. Checking stSOL in Aux Account"),(0,r.kt)("p",null,"To check if your stSOL is ",(0,r.kt)("strong",{parentName:"p"},"not")," in an ATA head over to ",(0,r.kt)("a",{parentName:"p",href:"https://raydium.io/swap/?from=7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj&to=11111111111111111111111111111111"},"https://raydium.io/swap")," and connect your wallet."),(0,r.kt)("p",null,"In case you have stSOL in an Aux Account Raydium will show you the following warning"),(0,r.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You have 1 Token Accounts in your wallet that need to be migrated to associated token accounts. To learn more click here or use this migration tool to simplify the process of migrating your balances"))),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:s,alt:"Raydium Warning",width:"500"})),(0,r.kt)("h3",{id:"2-migrating-the-aux-account-to-ata"},"2. Migrating the Aux Account to ATA"),(0,r.kt)("p",null,"If you do have tokens in your Aux Account head over to ",(0,r.kt)("a",{parentName:"p",href:"https://raydium.io/migrate/"},"https://raydium.io/migrate/"),". You will see the Aux Account Address, the balance and the token that needs to be migrated - ",(0,r.kt)("inlineCode",{parentName:"p"},"stSOL")," in this case. "),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:c,alt:"Raydium Migrate",width:"500"})),(0,r.kt)("p",null,"Click ",(0,r.kt)("inlineCode",{parentName:"p"},"Migrate Token Accounts"),". Upon successful migration you will be able to deposit your stSOL easily into pools like Mercurial, Orca and Saber."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Alternatively"),", you may also use Saber App to migrate your stSOL to ATA. Head over to ",(0,r.kt)("a",{parentName:"p",href:"https://app.saber.so/#/tools/ata"},"Saber ATA URL")," and click on Migrate."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:u,alt:"Saber Migrate",width:"500"})))}g.isMDXComponent=!0}}]);