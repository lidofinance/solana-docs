# Stake

:::danger
We are migrating to second version of procotol (solido), so this instructions will stop work, please see [migration guide](/frontend-integration/manual-instructions//migration-guide-2x) for being ready to version 2.
Or see [new version](/frontend-integration/manual-instructions/unstake) if you are new.
:::

:::info
We highly recommend use our [SDK](/frontend-integration/sdk), so we could support you better in case of some problems.
Also, integration with SDK is much easier & more simple than manually.
:::

**Live integration on Mainnet** - [http://solana.lido.fi/](https://solana.lido.fi)

In this document, we walk through the steps to integrate a web application with the Lido deposit function.


This guide assumes the web application is written in JavaScript / Typescript and has ready access to the [@solana/web3.js](https://www.npmjs.com/package/@solana/web3.js) and [@solana/spl-token](https://github.com/solana-labs/solana-program-library)  library.

:::note
The code snippets present in this doc might not be up-to-date with the current codebase. Please verify once before using.
:::

## Step 1 : Connecting to a Solana wallet

Solana wallets that are known to work well with the Lido program are Phantom, Solflare, Ledger, Sollet and Solong.

- The wallet should expose the following spec
    - `connect` function that triggers a connection request to the wallet
    - `publicKey` to retrieve the public key of the connected account
    - `signTransaction` function to send the transaction
    - `disconnect` function to trigger a disconnection request
    - Optional -  throws "connect" & "disconnect" events

The next step assumes:

- a wallet is loaded in the interface
- and you have access to the variable `LIDO_ADDRESS` which is the address of the account that stores the state of the deployed Lido Program.

## Step 2 : Fetching Lido program state to retrieve relevant data

Install and require [@solana/web3.js](https://www.npmjs.com/package/@solana/web3.js) library in your program

```bash
yarn add @solana/web3.js
```
Use `getAccountInfo(LIDO_ADDRESS)` [function](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getAccountInfo) from this library to fetch the Lido program data (in the form of a buffer)

```ts
const accountInfo = await connection.getAccountInfo(LIDO_ADDRESS);
```
The data structure storing the Lido [state(v1.0.0)](https://github.com/ChorusOne/solido/blob/v1.0.0/program/src/state.rs#L188) has the form
```rust
pub struct Lido {
    /// Version number for the Lido
    pub lido_version: u8,
    /// Manager of the Lido program, able to execute administrative functions
    #[serde(serialize_with = "serialize_b58")]
    pub manager: Pubkey,
    /// The SPL Token mint address for stSOL.
    #[serde(serialize_with = "serialize_b58")]
    pub st_sol_mint: Pubkey,
    /// Exchange rate to use when depositing.
    pub exchange_rate: ExchangeRate,
    /// Bump seeds for signing messages on behalf of the authority
    pub sol_reserve_account_bump_seed: u8,
    pub stake_authority_bump_seed: u8,
    pub mint_authority_bump_seed: u8,
    pub rewards_withdraw_authority_bump_seed: u8,
    /// How rewards are distributed.
    pub reward_distribution: RewardDistribution,
    /// Accounts of the fee recipients.
    pub fee_recipients: FeeRecipients,
    /// Metrics for informational purposes.
    ///
    /// Metrics are only written to, no program logic should depend on these values.
    /// An off-chain program can load a snapshot of the `Lido` struct, and expose
    /// these metrics.
    pub metrics: Metrics,
    /// Map of enrolled validators, maps their vote account to `Validator` details.
    pub validators: Validators,
    /// The set of maintainers.
    ///
    /// Maintainers are granted low security risk privileges. Maintainers are
    /// expected to run the maintenance daemon, that invokes the maintenance
    /// operations. These are gated on the signer being present in this set.
    /// In the future we plan to make maintenance operations callable by anybody.
    pub maintainers: Maintainers,
}
```
Create a borsh schema to deserialize the data.
```ts
class Lido {
  constructor(data) {
    Object.assign(this, data);
  }
}
class SeedRange {
  constructor(data) {
    Object.assign(this, data);
  }
}
class Validator {
  constructor(data) {
    Object.assign(this, data);
  }
}
class PubKeyAndEntry {
  constructor(data) {
    Object.assign(this, data);
  }
}
class PubKeyAndEntryMaintainer {
  constructor(data) {
    Object.assign(this, data);
  }
}
class RewardDistribution {
  constructor(data) {
    Object.assign(this, data);
  }
}
class FeeRecipients {
  constructor(data) {
    Object.assign(this, data);
  }
}
class Validators {
  constructor(data) {
    Object.assign(this, data);
  }
}
class Maintainers {
  constructor(data) {
    Object.assign(this, data);
  }
}
class ExchangeRate {
  constructor(data) {
    Object.assign(this, data);
  }
}
class Metrics {
  constructor(data) {
    Object.assign(this, data);
  }
}
class LamportsHistogram {
  constructor(data) {
    Object.assign(this, data);
  }
}
class WithdrawMetric {
  constructor(data) {
    Object.assign(this, data);
  }
}
const schema = new Map([
  [
    ExchangeRate,
    {
      kind: 'struct',
      fields: [
        ['computed_in_epoch', 'u64'],
        ['st_sol_supply', 'u64'],
        ['sol_balance', 'u64'],
      ],
    },
  ],
  [
    LamportsHistogram,
    {
      kind: 'struct',
      fields: [
        ['counts1', 'u64'],
        ['counts2', 'u64'],
        ['counts3', 'u64'],
        ['counts4', 'u64'],
        ['counts5', 'u64'],
        ['counts6', 'u64'],
        ['counts7', 'u64'],
        ['counts8', 'u64'],
        ['counts9', 'u64'],
        ['counts10', 'u64'],
        ['counts11', 'u64'],
        ['counts12', 'u64'],
        ['total', 'u64'],
      ],
    },
  ],
  [
    WithdrawMetric,
    {
      kind: 'struct',
      fields: [
        ['total_st_sol_amount', 'u64'],
        ['total_sol_amount', 'u64'],
        ['count', 'u64'],
      ],
    },
  ],
  [
    Metrics,
    {
      kind: 'struct',
      fields: [
        ['fee_treasury_sol_total', 'u64'],
        ['fee_validation_sol_total', 'u64'],
        ['fee_developer_sol_total', 'u64'],
        ['st_sol_appreciation_sol_total', 'u64'],
        ['fee_treasury_st_sol_total', 'u64'],
        ['fee_validation_st_sol_total', 'u64'],
        ['fee_developer_st_sol_total', 'u64'],
        ['deposit_amount', LamportsHistogram],
        ['withdraw_amount', WithdrawMetric],
      ],
    },
  ],
  [
    SeedRange,
    {
      kind: 'struct',
      fields: [
        ['begin', 'u64'],
        ['end', 'u64'],
      ],
    },
  ],
  [
    Validator,
    {
      kind: 'struct',
      fields: [
        ['fee_credit', 'u64'],
        ['fee_address', 'u256'],
        ['stake_seeds', SeedRange],
        ['unstake_seeds', SeedRange],
        ['stake_accounts_balance', 'u64'],
        ['unstake_accounts_balance', 'u64'],
        ['active', 'u8'],
      ],
    },
  ],
  [
    PubKeyAndEntry,
    {
      kind: 'struct',
      fields: [
        ['pubkey', 'u256'],
        ['entry', Validator],
      ],
    },
  ],
  [
    PubKeyAndEntryMaintainer,
    {
      kind: 'struct',
      fields: [
        ['pubkey', 'u256'],
        ['entry', [0]],
      ],
    },
  ],
  [
    RewardDistribution,
    {
      kind: 'struct',
      fields: [
        ['treasury_fee', 'u32'],
        ['validation_fee', 'u32'],
        ['developer_fee', 'u32'],
        ['st_sol_appreciation', 'u32'],
      ],
    },
  ],
  [
    FeeRecipients,
    {
      kind: 'struct',
      fields: [
        ['treasury_account', 'u256'],
        ['developer_account', 'u256'],
      ],
    },
  ],
  [
    Validators,
    {
      kind: 'struct',
      fields: [
        ['entries', [PubKeyAndEntry]],
        ['maximum_entries', 'u32'],
      ],
    },
  ],
  [
    Maintainers,
    {
      kind: 'struct',
      fields: [
        ['entries', [PubKeyAndEntryMaintainer]],
        ['maximum_entries', 'u32'],
      ],
    },
  ],
  [
    Lido,
    {
      kind: 'struct',
      fields: [
        ['lido_version', 'u8'],
        ['manager', 'u256'],
        ['st_sol_mint', 'u256'],
        ['exchange_rate', ExchangeRate],
        ['sol_reserve_authority_bump_seed', 'u8'],
        ['stake_authority_bump_seed', 'u8'],
        ['mint_authority_bump_seed', 'u8'],
        ['rewards_withdraw_authority_bump_seed', 'u8'],
        ['reward_distribution', RewardDistribution],
        ['fee_recipients', FeeRecipients],
        ['metrics', Metrics],
        ['validators', Validators],
        ['maintainers', Maintainers],
      ],
    },
  ],
]);
```
Deserialize the data using the above schema
```ts
import { deserializeUnchecked } from 'borsh';
// We use deserializeUnchecked because Validators and Maintainers entries' length varies with time
// It deserializes object from bytes using schema, without checking the length read
const deserializedAccountInfo = deserializeUnchecked(
  schema,
  Lido,
  accountInfo.data,
);
```
Calculate the reserve authority and mint authority address by passing `LIDO_ADDRESS` buffer and `reserve_account` for reserve authority and `mint_authority` for mint authority buffer as seeds to [findProgramAddress()](https://solana-labs.github.io/solana-web3.js/classes/PublicKey.html#findProgramAddress) along with the `PROGRAM_ID`
```ts
import { PublicKey } from '@solana/web3.js';
// Reserve authority
const bufferArray = [
  LIDO_ADDRESS.toBuffer(),
  Buffer.from('reserve_account'),
];
const [reserveAccount] = await PublicKey.findProgramAddress(bufferArray, PROGRAM_ID);
// Mint authority
const bufferArray = [
  LIDO_ADDRESS.toBuffer(),
  Buffer.from('mint_authority'),
];
const [mintAuthority] = await PublicKey.findProgramAddress(bufferArray, PROGRAM_ID);
```
## Step 3 : Ensure an stSOL recipient account exists
The Deposit instruction requires a recipient address - that will receive stSOL as liquid representation of the deposited SOL.
Before we make a deposit from a user's wallet, we need to make sure such a recipient account exists - for the depositor to receive stSOL.
### Fetch all accounts for the stSOL mint of the staker
- If at least one such account exists, select the first one and proceed to the next step
- If no such account exists, continue with this section.
### If no account exists
- Fetch the associated token account for the payer account
- Add the instruction to create the new associated token account
- Return the associated token account's public key
```ts
import { AccountLayout, Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
const { value: accounts } = await connection.getTokenAccountsByOwner(payer, {
  mint: stSolMint,
});
const recipient = accounts[0];
if (recipient) {
  return recipient.pubkey;
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
return associatedStSolAccount;
```
## Step 4 : Create Deposit Instruction
- Create the buffer layout in the format of `{ instruction_code: 1 byte, amount: 8 bytes}`
- Encode the deposit data using the buffer layout
  ```ts
  import * as BufferLayout from 'buffer-layout';
  import BN from 'bn.js';
  const dataLayout = BufferLayout.struct([
    BufferLayout.u8('instruction'),
    BufferLayout.nu64('amount'), // little endian
  ]);
  const data = Buffer.alloc(dataLayout.span);
  dataLayout.encode(
    {
      instruction: 1, // 1 for deposit instruction
      amount: new BN(amount),
    },
    data,
  );
  ```
- Set all [keys](https://github.com/ChorusOne/solido/blob/v1.0.0/program/src/instruction.rs#L167) for the deposit instruction using the program data we fetch earlier
  ```ts
  const keys = [
    {
      pubkey: lidoAddress,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: payer, isSigner: true, isWritable: true },
    {
      pubkey: recipient,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: stSolMint,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: reserveAccount, isSigner: false, isWritable: true },
    { pubkey: mintAuthority, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
  ];
  ```
- Add the instruction to the transaction
  ```ts
  transaction.add(
    new TransactionInstruction({
      keys,
      programId: PROGRAM_ID,
      data,
    }),
  );
  ```
## Step 5 : Sign and send Transaction
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
## Useful Nuggets
- **How to get the total number of `stSOL` holders?**
  ```ts
  // Filter out stSOL token addresses
  const memcmpFilter = { memcmp: { bytes: ST_SOL_MINT.toString(), offset: 0 } };
  const config = {
    filters: [{ dataSize: 165 }, memcmpFilter],
    encoding: 'jsonParsed',
  };
  // Get program accounts using the above filters
  const accounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    config,
  );
  const totalStSolHolders = accounts.length;
  ```
- **How to get the stSOL/SOL exchange rate for the current epoch?**
  ```ts
    const accountInfo = await getAccountInfo(connection, lidoAddress);
    // Fetch SOL and stSOL balance
    const totalSolInLamports = accountInfo.exchange_rate.sol_balance.toNumber();
    const stSolSupplyInLamports =
      accountInfo.exchange_rate.st_sol_supply.toNumber();
  // Calculate the stSOL/SOL exchange rate
  const exchangeRate = totalStSolSupplyInLamports/totalSolInLamports;
  ```
- **How to get the current amount of SOL staked with Lido?**
  ```ts
    const accountInfo = await getAccountInfo(connection, lidoAddress);
    // Find reserve account pubkey
    const bufferArray = [
      lidoAddress.toBuffer(),
      Buffer.from('reserve_account'),
    ];
    const [reserveAccount] = await PublicKey.findProgramAddress(bufferArray, programId);
    // Fetch balance and rent for reserve account
    const reserveAccountInfo = await connection.getAccountInfo(reserveAccount);
    const reserveAccountRent = await connection.getMinimumBalanceForRentExemption(
      reserveAccountInfo.data.byteLength,
    );
    const reserveAccountBalanceInLamports =
      reserveAccountInfo.lamports - reserveAccountRent;
    const validatorsStakeAccountsBalanceInLamports = accountInfo.validators.entries
      .map((pubKeyAndEntry) => pubKeyAndEntry.entry)
      .map((validator) => validator.stake_accounts_balance.toNumber())
      .reduce((acc, current) => acc + current, 0);
    const totalStakedInLamports = reserveAccountBalanceInLamports + validatorsStakeAccountsBalanceInLamports;
  ```