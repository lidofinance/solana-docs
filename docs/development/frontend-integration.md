# Integrating with Lido

**Sample integration on Devnet** - [http://solana-dev.testnet.lido.fi/](https://solana-dev.testnet.lido.fi)

In this document, we walkthrough the steps to integrate a web application with the Lido deposit function.


This guide assumes the web application is written in JavaScript / Typescript and has ready access to the [@solana/web3.js](https://www.npmjs.com/package/@solana/web3.js) and [@solana/spl-token](https://github.com/solana-labs/solana-program-library)  library.

:::note
The code snippets present in this doc might not be up to date with the current codebase. Please verify once before using.
:::

## Step 1 : Connecting to a Solana wallet

Solana wallets that are known to work well with the Lido program are Phantom, Solflare, Ledger, Sollet and Solong.

- The wallet should expose the following spec
    - `connect` function that triggers a connection request to the wallet
    - `publicKey` to retrieve the public key of the connected account
    - `signTransaction` function to send the transaction
    - `disconnect` function to trigger a disconnection request
    - Optional -  throws "connect" & "disconnect" events
- Add the wallet's `{ displayName, url & icon }` to the wallets array in [SolanaConnectWalletModal.jsx](https://github.com/ChorusOne/staking-widget-solana-lido/blob/develop/components/SolanaConnectWalletModal.jsx#L103)
- Add [activate](https://github.com/ChorusOne/staking-widget-solana-lido/blob/develop/contexts/wallet.jsx#L27) and [deactivate](https://github.com/ChorusOne/staking-widget-solana-lido/blob/develop/contexts/wallet.jsx#L119) handlers for the new wallet in the `wallet.jsx` file
- You can now access the wallet using the `useWallet` hook

The next step assumes:

- a wallet is loaded in the interface 
- and you have access to the variable `LIDO_ADDRESS`  which is the address of the account that stores the state of the deployed Lido Program. 

## Step 2 : Fetching Lido program state to retrieve relevant data

Install and require [@solana/web3.js](https://www.npmjs.com/package/@solana/web3.js) library in your program 

```bash
yarn add @solana/web3.js`
```

Use `getAccountInfo(LIDO_ADDRESS)` [function](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getAccountInfo) from this library to fetch the Lido program data (in the form of a buffer) 
  
```ts
const accountInfo = await connection.getAccountInfo(LIDO_ADDRESS);
```

The data structure storing the Lido [state(v0.4.0)](https://github.com/ChorusOne/solido/blob/v0.4.0/program/src/state.rs#L178) has the form 

```rust
pub struct Lido {
    pub lido_version: u8,

    /// Manager of the Lido program, able to execute administrative functions
    pub manager: Pubkey,

    /// The SPL Token mint address for stSOL.
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
    Validator,
    {
      kind: 'struct',
      fields: [
        ['fee_credit', 'u64'],
        ['fee_address', 'u256'],
        ['stake_accounts_seed_begin', 'u64'],
        ['stake_accounts_seed_end', 'u64'],
        ['stake_accounts_balance', 'u64'],
        ['weight', 'u32'],
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

Before we make a deposit from a user's wallet, we need to make sure such a recipient account exists - for the depositer to receive stSOL. 

### Fetch all accounts for the stSOL mint of the staker

- If atleast one such account exists, select the first one and proceed to Step 4
- If no such account exists, continue at Step 3.2

### If no account exists

- Create a new KeyPair
- Calculate rent exempt amount using `getMinimumBalanceForRentExemption(AccountLayout.span)`
- Add the createAccount instruction with program Id as the `TOKEN_PROGRAM_ID` and pass the rent exempt amount
- Add instruction to initialize the account using `Token.createInitAccountInstruction` and set the owner as the staker public key

```ts
import { AccountLayout, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

const { value: accounts } = await connection.getTokenAccountsByOwner(payer, {
  mint: ST_SOL_MINT,
});

const recipient = accounts[0];

// Select the first account if already exist
// Return early with recipient as the publick key of the account
// & signer as null
if (recipient) {
  return { recipient: recipient.pubkey, signer: null };
}

// Create a new public/private key pair
const newAccount = Keypair.generate();

// Calculate the lamports required for rent exemption
const accountRentExempt = await connection.getMinimumBalanceForRentExemption(
  AccountLayout.span,
);

// Add the instruction to create the new account 
// with the rent exemption amount
transaction.add(
  SystemProgram.createAccount({
    fromPubkey: payer,
    newAccountPubkey: newAccount.publicKey,
    lamports: accountRentExempt,
    programId: TOKEN_PROGRAM_ID,
    space: AccountLayout.span,
  }),
);

// Add the instruction to initalize the account
// using the ST_SOL_MINT token program
transaction.add(
  Token.createInitAccountInstruction(
    TOKEN_PROGRAM_ID,
    ST_SOL_MINT,
    newAccount.publicKey,
    payer,
  ),
);

// Set the signer as the new account's key pair 
// to partially sign the tx using the new account
return { recipient: newAccount.publicKey, signer: newAccount };
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

- Set all [keys](https://github.com/ChorusOne/solido/blob/c1258b48a8f06921ed261bf7d00191da1ae4c705/program/src/instruction.rs#L248) for the deposit instruction using the program data we fetch earlier

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
const { recipient, signer } = await ensureTokenAccount(
  connection,
  transaction,
  payer,
);

await depositInstruction(payer, amount, recipient, accountInfo, transaction);

// Partially sign the tx if signer is not null
// i.e., a new stSOL account has been created for the user
if (signer) {
  transaction.partialSign(signer);
}

// Sign the transaction using the wallet
const signed = wallet.signTransaction();

// Send the serialized signed transaction to the network
connection.sendRawTransaction(
  signed.serialize(),
);
```

## Useful Nuggets

1. **How to get the total number of `stSOL` holders?**

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

1. **How to calculate total amount of `SOL` and `stSOL` supply in the Lido Program?** 

  ```ts
  const accountInfo = await getAccountInfo(connection, lidoAddress);

  const totalSolInLamports = accountInfo.exchange_rate.sol_balance.toNumber();
  const stSolSupplyInLamports =
    accountInfo.exchange_rate.st_sol_supply.toNumber();
  ```

1. **How to get a tentative stSOL/SOL rate for the current epoch**

  ```ts
  // Calculate the stSOL/SOL exchange rate
  const exchangeRate = totalStSolSupplyInLamports/totalSolInLamports;
  ```