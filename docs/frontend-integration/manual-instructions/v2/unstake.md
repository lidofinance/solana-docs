---
sidebar_position: 1
---

# UnStake

:::caution
We didn't switch protocol to second version on **mainnet** yet. So, this code will work only after migration.
Please see [first version](/frontend-integration/manual-instructions/v1) if you are going to deploy integration before **breaking [upgrade](https://research.lido.fi/t/lido-on-solana-protocol-upgrade-proposal/2959)**.
Anyway, you should be ready for migration, so we recommend follow [our example](https://github.com/lidofinance/solido-sdk/blob/b1ab2a4f5e58e7f08e1d0965d9d83f867f9ce958/src/unstake/getAccountInfo.ts#L469-L516).
:::

:::info
We highly recommend use our [SDK](/frontend-integration/sdk), so we could support you better in case of some problems.
Also, integration with SDK is much easier & more simple than manually.
:::

## Step 1: Fetching Lido program state to retrieve relevant data

```ts
const accountInfo = await connection.getAccountInfo(LIDO_ADDRESS);
```
_Use getAccountInfo(LIDO_ADDRESS) function from this library to fetch the Lido program data (in the form of a buffer)._

- Create a borsh schema to deserialize the solido state data:
```ts
class Lido {
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

const accountInfoScheme = new Map([
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
    RewardDistribution,
    {
      kind: 'struct',
      fields: [
        ['treasury_fee', 'u32'],
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
        ['treasury_account', [32]],
        ['developer_account', [32]],
      ],
    },
  ],
  [
    Lido,
    {
      kind: 'struct',
      fields: [
        ['account_type', 'u8'],

        ['lido_version', 'u8'],

        ['manager', [32]],

        ['st_sol_mint', [32]],

        ['exchange_rate', ExchangeRate],

        ['sol_reserve_authority_bump_seed', 'u8'],
        ['stake_authority_bump_seed', 'u8'],
        ['mint_authority_bump_seed', 'u8'],

        ['reward_distribution', RewardDistribution],

        ['fee_recipients', FeeRecipients],

        ['metrics', Metrics],

        ['validator_list', [32]],

        ['maintainer_list', [32]],

        ['max_commission_percentage', 'u8'],
      ],
    },
  ],
]);
```

- Deserialize the data using above schema:
```ts
import { deserializeUnchecked } from 'borsh';
// It deserializes object from bytes using schema, without checking the length read
const deserializedAccountInfo = deserializeUnchecked(
  accountInfoschema,
  Lido,
  accountInfo.data,
);
```

## Step 2: Fetching Validators list account

```ts
const validatorsList = new PublicKey(deserializedAccountInfo.validators_list);
const validators = await connection.getAccountInfo(validatorsList);
```

- Create a borsh schema to deserialize the validators data:
```ts
class ListHeader {
  constructor(data) {
    Object.assign(this, data);
  }
}

class SeedRange {
  constructor(data) {
    Object.assign(this, data);
  }
}

class ValidatorClass {
  constructor(data) {
    Object.assign(this, data);
  }
}

class AccountList {
  constructor(data) {
    Object.assign(this, data);
  }
}

const validatorsSchema = new Map([
  [
    ListHeader,
    {
      kind: 'struct',
      fields: [
        ['account_type', 'u8'],
        ['lido_version', 'u8'],
        ['max_entries', 'u32'],
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
    ValidatorClass,
    {
      kind: 'struct',
      fields: [
        ['vote_account_address', [32]],
        ['stake_seeds', SeedRange],
        ['unstake_seeds', SeedRange],
        ['stake_accounts_balance', 'u64'],
        ['unstake_accounts_balance', 'u64'],
        ['effective_stake_balance', 'u64'],
        ['active', 'u8'],
      ],
    },
  ],
  [
    AccountList,
    {
      kind: 'struct',
      fields: [
        ['header', ListHeader],
        ['entries', [ValidatorClass]],
      ],
    },
  ],
]);
```

- Deserialize the data using above schema:
```ts
const deserializedValidators = deserializeUnchecked(
    validatorsSchema,
    AccountList,
    validators.data,
);
```

## Step 3: Sign new Transaction

```ts
const newStakeAccount = Keypair.generate();
// Create new transaction
const transaction = new Transaction({ feePayer: payer });
// Set recent blockhash
const { blockhash } = await connection.getLatestBlockhash();
transaction.recentBlockhash = blockhash;
```

## Step 4: Create Withdraw Instruction

- Create the buffer layout in the format of `{ instruction_code: 1 byte, amount: 8 bytes, validator_index: 4 bytes}`:
```javascript
import { nu64, struct, u32, u8 } from 'buffer-layout';

const dataLayout = struct([u8('instruction'), nu64('amount'), u32('validator_index')]);

const data = Buffer.alloc(dataLayout.span);
```

- Get heaviest validator index:
```javascript
const getHeaviestValidator = (validatorEntries) => {
  const sortedValidators = validatorEntries.sort(
    (validatorA, validatorB) =>
      validatorB.stake_accounts_balance.toNumber() - validatorA.stake_accounts_balance.toNumber(),
  );

  return sortedValidators[0];
};

const getValidatorIndex = (validatorEntries, validator) =>
    validatorEntries.findIndex(
      ({ vote_account_address: voteAccountAddress }) =>
        voteAccountAddress.toString() === validator.vote_account_address.toString(),
    );

const validator = getHeaviestValidator(validators);

const validatorIndex = getValidatorIndex(validators, validator);
```

- Encode the deposit data using the buffer layout:
```ts
import BN from 'bn.js';

dataLayout.encode(
  {
    instruction: 23, // code of withdraw instruction
    amount: new BN(amount),
    validator_index: validatorIndex,
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

const calculateStakeAuthority = async (lidoAddress, programId) => {
  const bufferArray = [lidoAddress.toBuffer(), Buffer.from('stake_authority')];

  const mint = await PublicKey.findProgramAddress(bufferArray, programId);

  return mint[0];
};

const calculateStakeAccountAddress = async (lidoAddress, programId, validatorVoteAccount, seed) => {
  const bufferArray = [
    lidoAddress.toBuffer(),
    validatorVoteAccount.toBuffer(),
    Buffer.from('validator_stake_account'),
    seed.toArray('le', 8),
  ];

  const [stakeAccountAddress] = await PublicKey.findProgramAddress(bufferArray, programId);

  return stakeAccountAddress;
};

const getStSolAccountsForUser = async (owner) => {
    const stSolAccounts = [];

    const { value } = await connection.getParsedTokenAccountsByOwner(owner, {
        mint: ST_SOL_MINT,
    });

    value.forEach((v) => {
        const address = v.pubkey;
        const balanceInLamports = parseInt(v.account.data.parsed?.info?.tokenAmount?.amount ?? '0', 10);

        stSolAccounts.push({ address, balanceInLamports });
    });

    return stSolAccounts;
};

const stakeAuthority = await calculateStakeAuthority(lidoAddress, programId);
const validator = await getHeaviestValidator(validators);

const senderStSolAccountAddress = await getStSolAccountsForUser(wallet.publicKey); // payerAddress 

const validatorStakeAccount = await calculateStakeAccountAddress(
  LIDO_ADDRESS,
  PROGRAM_ID,
  new PublicKey(validator.vote_account_address),
  validator.stake_seeds.begin,
);

const keys = [
    { pubkey: solidoInstanceId, isSigner: false, isWritable: true },
    { pubkey: payerAddress, isSigner: true, isWritable: false },
    { pubkey: senderStSolAccountAddress, isSigner: false, isWritable: true },
    { pubkey: ST_SOL_MINT, isSigner: false, isWritable: true },
    { pubkey: new PublicKey(validator.vote_account_address), isSigner: false, isWritable: false },
    { pubkey: validatorStakeAccount, isSigner: false, isWritable: true },
    { pubkey: stakeAccount, isSigner: true, isWritable: true },
    { pubkey: stakeAuthority, isSigner: false, isWritable: false },
    { pubkey: validatorsList, isSigner: false, isWritable: true }, // step 2
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    { pubkey: StakeProgram.programId, isSigner: false, isWritable: false },
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

## Step 5: Create deactivate transaction & add its instructions to transaction

```ts
import { StakeProgram } from '@solana/web3.js';

const deactivateTransaction = StakeProgram.deactivate({
    authorizedPubkey: payer,
    stakePubkey: newStakeAccount.publicKey,
});

transaction.add(...deactivateTransaction.instructions);

transaction.partialSign(newStakeAccount); // step 2 variables
```
