---
sidebar_position: 0
---

# Stake

:::caution
We didn't switch protocol to second version on **mainnet** yet. So, this code will work only after migration.
Please see [first version](/frontend-integration/manual-instructions/v1) if you are going to deploy integration before **breaking [upgrade](https://research.lido.fi/t/lido-on-solana-protocol-upgrade-proposal/2959)**.
Anyway, you should be ready for migration, so we recommend follow [our example](https://github.com/lidofinance/solido-sdk/blob/b1ab2a4f5e58e7f08e1d0965d9d83f867f9ce958/src/unstake/getAccountInfo.ts#L469-L516).
:::

:::info
We highly recommend use our [SDK](/frontend-integration/sdk), so we could support you better in case of some problems.
Also, integration with SDK is much easier & more simple than manually.
:::

**Live integration on Mainnet** - [http://solana.lido.fi/](https://solana.lido.fi)

In this document, we walk through the steps to integrate a web application with the Lido deposit function.

## Step 1: Ensure an stSOL recipient account exists
The Deposit instruction requires a recipient address - that will receive stSOL as liquid representation of the deposited SOL.
Before we make a deposit from a user's wallet, we need to make sure such a recipient account exists - for the depositor to receive stSOL.

### Fetch all accounts for the stSOL mint of the staker
- If at least one such account exists, select the first one and proceed to the next step
- If no such account exists, continue with this section.

### If no account exists
- Fetch the associated token account for the payer account
- Add the instruction to create the new associated token account
- Return the associated token account's public key
```javascript
import { AccountLayout, Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';

const { value: accounts } = await connection.getTokenAccountsByOwner(payer, {
  mint: stSolMint,
});
const recipient = accounts[0];

if (recipient) {
  recipientStSolAddress = recipient.pubkey;
}
// Creating the associated token account if not already exist
const associatedStSolAccount = await Token.getAssociatedTokenAddress(
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  stSolMint,
  payer,
);

transaction.add(
  Token.createAssociatedTokenAccountInstruction(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    stSolMint,
    associatedStSolAccount,
    payer,
    payer,
  ),
);

const recipientStSolAddress = associatedStSolAccount;
```

## Step 2: Create Deposit Instruction

- Create the buffer layout in the format of `{ instruction_code: 1 byte, amount: 8 bytes}`:
```javascript
import { nu64, struct, u8 } from 'buffer-layout';

const dataLayout = struct([u8('instruction'), nu64('amount')]);

const data = Buffer.alloc(dataLayout.span);
```

- Encode the deposit data using the buffer layout:
```javascript
import BN from 'bn.js';

dataLayout.encode(
  {
    instruction: 1, // code of deposit instruction
    amount: new BN(amount),
  },
  data,
);
```

- Set all keys for the deposit instruction using the program data we fetch earlier:
```ts
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  Keypair,
  PublicKey,
  StakeProgram,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
} from '@solana/web3.js';

const bufferArray = [
    LIDO_ADDRESS.toBuffer(),
    Buffer.from('reserve_account'),
];

const [reserveAccount] = await PublicKey.findProgramAddress(bufferArray, programId);

const bufferArrayMint = [
    LIDO_ADDRESS.toBuffer(),
    Buffer.from('mint_authority'),
];

const [mintAuthority] = await PublicKey.findProgramAddress(bufferArrayMint, programId);

const keys = [
    { pubkey: LIDO_ADDRESS, isSigner: false, isWritable: true },
    { pubkey: payerAddress, isSigner: true, isWritable: true }, // wallet.publicKey
    { pubkey: recipientStSolAddress, isSigner: false, isWritable: true },
    { pubkey: ST_SOL_MINT, isSigner: false, isWritable: true },
    { pubkey: reserveAccount, isSigner: false, isWritable: true },
    { pubkey: mintAuthority, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
];
```

- Add the instruction to the transaction:
```ts
transaction.add(
  new TransactionInstruction({
    keys,
    programId: PROGRAM_ID,
    data,
  }),
);
```

## Step 3: Sign and send Transaction
- Create a new transaction with the fee payer as the staker
- Add all the above instructions in the sequence
- If we have created a new stSOL, partially sign the transaction using the `newAccount's keypair`
- Sign the transaction
- Send the transaction
```ts
// Create new transaction
const transaction = new Transaction({ feePayer: payer });
// Set recent blockhash
const { blockhash } = await connection.getRecentBlockhash();
transaction.recentBlockhash = blockhash;
// Add all the above instructions
const recipient = await ensureTokenAccount(
  connection,
  transaction,
  payer,
  stSolMint
);
await depositInstruction(payer, amount, recipient, transaction, config);
// Sign the transaction using the wallet
const signed = wallet.signTransaction(transaction);
// Send the serialized signed transaction to the network
connection.sendRawTransaction(
  signed.serialize(),
);
```
