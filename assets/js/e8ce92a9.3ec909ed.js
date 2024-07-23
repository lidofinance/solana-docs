"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6697],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),l=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(n),f=r,m=d["".concat(c,".").concat(f)]||d[f]||p[f]||o;return n?a.createElement(m,i(i({ref:t},u),{},{components:n})):a.createElement(m,i({ref:t},u))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8040:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=n(7462),r=(n(7294),n(3905));const o={sidebar_position:0},i="Stake",s={unversionedId:"frontend-integration/manual-instructions/v2/stake",id:"frontend-integration/manual-instructions/v2/stake",title:"Stake",description:"We highly recommend use our SDK, so we could support you better in case of some problems.",source:"@site/docs/frontend-integration/manual-instructions/v2/stake.md",sourceDirName:"frontend-integration/manual-instructions/v2",slug:"/frontend-integration/manual-instructions/v2/stake",permalink:"/frontend-integration/manual-instructions/v2/stake",draft:!1,tags:[],version:"current",sidebarPosition:0,frontMatter:{sidebar_position:0},sidebar:"solidoSidebar",previous:{title:"UnStake",permalink:"/frontend-integration/manual-instructions/v1/unstake"},next:{title:"UnStake",permalink:"/frontend-integration/manual-instructions/v2/unstake"}},c={},l=[{value:"Step 1: Ensure an stSOL recipient account exists",id:"step-1-ensure-an-stsol-recipient-account-exists",level:2},{value:"Fetch all accounts for the stSOL mint of the staker",id:"fetch-all-accounts-for-the-stsol-mint-of-the-staker",level:3},{value:"If no account exists",id:"if-no-account-exists",level:3},{value:"Step 2: Create Deposit Instruction",id:"step-2-create-deposit-instruction",level:2},{value:"Step 3: Sign and send Transaction",id:"step-3-sign-and-send-transaction",level:2}],u={toc:l};function p(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"stake"},"Stake"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"We highly recommend use our ",(0,r.kt)("a",{parentName:"p",href:"/frontend-integration/sdk"},"SDK"),", so we could support you better in case of some problems.\nAlso, integration with SDK is much easier & more simple than manually.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Live integration on Mainnet")," - ",(0,r.kt)("a",{parentName:"p",href:"https://solana.lido.fi"},"http://solana.lido.fi/")),(0,r.kt)("p",null,"In this document, we walk through the steps to integrate a web application with the Lido deposit function."),(0,r.kt)("h2",{id:"step-1-ensure-an-stsol-recipient-account-exists"},"Step 1: Ensure an stSOL recipient account exists"),(0,r.kt)("p",null,"The Deposit instruction requires a recipient address - that will receive stSOL as liquid representation of the deposited SOL.\nBefore we make a deposit from a user's wallet, we need to make sure such a recipient account exists - for the depositor to receive stSOL."),(0,r.kt)("h3",{id:"fetch-all-accounts-for-the-stsol-mint-of-the-staker"},"Fetch all accounts for the stSOL mint of the staker"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"If at least one such account exists, select the first one and proceed to the next step"),(0,r.kt)("li",{parentName:"ul"},"If no such account exists, continue with this section.")),(0,r.kt)("h3",{id:"if-no-account-exists"},"If no account exists"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Fetch the associated token account for the payer account"),(0,r.kt)("li",{parentName:"ul"},"Add the instruction to create the new associated token account"),(0,r.kt)("li",{parentName:"ul"},"Return the associated token account's public key")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"import { AccountLayout, Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';\n\nconst { value: accounts } = await connection.getTokenAccountsByOwner(payer, {\n  mint: stSolMint,\n});\nconst recipient = accounts[0];\n\nif (recipient) {\n  recipientStSolAddress = recipient.pubkey;\n}\n// Creating the associated token account if not already exist\nconst associatedStSolAccount = await Token.getAssociatedTokenAddress(\n  ASSOCIATED_TOKEN_PROGRAM_ID,\n  TOKEN_PROGRAM_ID,\n  stSolMint,\n  payer,\n);\n\ntransaction.add(\n  Token.createAssociatedTokenAccountInstruction(\n    ASSOCIATED_TOKEN_PROGRAM_ID,\n    TOKEN_PROGRAM_ID,\n    stSolMint,\n    associatedStSolAccount,\n    payer,\n    payer,\n  ),\n);\n\nconst recipientStSolAddress = associatedStSolAccount;\n")),(0,r.kt)("h2",{id:"step-2-create-deposit-instruction"},"Step 2: Create Deposit Instruction"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Create the buffer layout in the format of ",(0,r.kt)("inlineCode",{parentName:"li"},"{ instruction_code: 1 byte, amount: 8 bytes}"),":")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"import { nu64, struct, u8 } from 'buffer-layout';\n\nconst dataLayout = struct([u8('instruction'), nu64('amount')]);\n\nconst data = Buffer.alloc(dataLayout.span);\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Encode the deposit data using the buffer layout:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"import BN from 'bn.js';\n\ndataLayout.encode(\n  {\n    instruction: 1, // code of deposit instruction\n    amount: new BN(amount),\n  },\n  data,\n);\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Set all keys for the deposit instruction using the program data we fetch earlier:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { TOKEN_PROGRAM_ID } from '@solana/spl-token';\nimport {\n  Keypair,\n  PublicKey,\n  StakeProgram,\n  SystemProgram,\n  SYSVAR_CLOCK_PUBKEY,\n} from '@solana/web3.js';\n\nconst bufferArray = [\n    LIDO_ADDRESS.toBuffer(),\n    Buffer.from('reserve_account'),\n];\n\nconst [reserveAccount] = await PublicKey.findProgramAddress(bufferArray, programId);\n\nconst bufferArrayMint = [\n    LIDO_ADDRESS.toBuffer(),\n    Buffer.from('mint_authority'),\n];\n\nconst [mintAuthority] = await PublicKey.findProgramAddress(bufferArrayMint, programId);\n\nconst keys = [\n    { pubkey: LIDO_ADDRESS, isSigner: false, isWritable: true },\n    { pubkey: payerAddress, isSigner: true, isWritable: true }, // wallet.publicKey\n    { pubkey: recipientStSolAddress, isSigner: false, isWritable: true },\n    { pubkey: ST_SOL_MINT, isSigner: false, isWritable: true },\n    { pubkey: reserveAccount, isSigner: false, isWritable: true },\n    { pubkey: mintAuthority, isSigner: false, isWritable: false },\n    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },\n    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },\n];\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Add the instruction to the transaction:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"transaction.add(\n  new TransactionInstruction({\n    keys,\n    programId: PROGRAM_ID,\n    data,\n  }),\n);\n")),(0,r.kt)("h2",{id:"step-3-sign-and-send-transaction"},"Step 3: Sign and send Transaction"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Create a new transaction with the fee payer as the staker"),(0,r.kt)("li",{parentName:"ul"},"Add all the above instructions in the sequence"),(0,r.kt)("li",{parentName:"ul"},"If we have created a new stSOL, partially sign the transaction using the ",(0,r.kt)("inlineCode",{parentName:"li"},"newAccount's keypair")),(0,r.kt)("li",{parentName:"ul"},"Sign the transaction"),(0,r.kt)("li",{parentName:"ul"},"Send the transaction")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"// Create new transaction\nconst transaction = new Transaction({ feePayer: payer });\n// Set recent blockhash\nconst { blockhash } = await connection.getRecentBlockhash();\ntransaction.recentBlockhash = blockhash;\n// Add all the above instructions\nconst recipient = await ensureTokenAccount(\n  connection,\n  transaction,\n  payer,\n  stSolMint\n);\nawait depositInstruction(payer, amount, recipient, transaction, config);\n// Sign the transaction using the wallet\nconst signed = wallet.signTransaction(transaction);\n// Send the serialized signed transaction to the network\nconnection.sendRawTransaction(\n  signed.serialize(),\n);\n")))}p.isMDXComponent=!0}}]);