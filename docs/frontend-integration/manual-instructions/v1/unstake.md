# UnStake

:::danger
We are migrating to second version of procotol (solido), so this instructions will stop work, please see [migration guide](/frontend-integration/manual-instructions//migration-guide-2x) for being ready to version 2.
Or see [new version](/frontend-integration/manual-instructions/unstake) if you are new.
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

- Create a borsh schema to deserialize the data:
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

- Deserialize the data using above schema:
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

## Step 2: Sign new Transaction

```ts
const newStakeAccount = Keypair.generate();
// Create new transaction
const transaction = new Transaction({ feePayer: payer });
// Set recent blockhash
const { blockhash } = await connection.getLatestBlockhash();
transaction.recentBlockhash = blockhash;
```

## Step 3: Create Withdraw Instruction

- Create the buffer layout in the format of `{ instruction_code: 1 byte, amount: 8 bytes}`
- Encode the deposit data using the buffer layout:
```ts
import * as BufferLayout from 'buffer-layout';
import BN from 'bn.js';

const dataLayout = BufferLayout.struct([BufferLayout.u8('instruction'), BufferLayout.nu64('amount')]);

const data = Buffer.alloc(dataLayout.span);
dataLayout.encode(
  {
    instruction: 2, // withdraw instruction
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

const getHeaviestValidator = async (validatorEntries) => {
  const sortedValidatorEntries = validatorEntries.sort(
    ({ entry: validatorA }, { entry: validatorB }) =>
      validatorB.stake_accounts_balance.toNumber() - validatorA.stake_accounts_balance.toNumber(),
  );

  const heaviestValidator = sortedValidatorEntries[0];

  return heaviestValidator;
};

const stakeAuthority = await calculateStakeAuthority(lidoAddress, programId);
const validator = await getHeaviestValidator(accountInfo.validators.entries);

const validatorStakeAccount = await calculateStakeAccountAddress(
  lidoAddress,
  programId,
  new PublicKey(validator.pubkey.toArray('le')),
  validator.entry.stake_seeds.begin,
);

const keys = [
  {
    pubkey: lidoAddress,
    isSigner: false,
    isWritable: true,
  },
  { pubkey: payer, isSigner: true, isWritable: false },
  {
    pubkey: stSolAddress,
    isSigner: false,
    isWritable: true,
  },
  {
    pubkey: stSolMint,
    isSigner: false,
    isWritable: true,
  },
  {
    pubkey: new PublicKey(validator.pubkey.toArray('le')),
    isSigner: false,
    isWritable: false,
  },
  { pubkey: validatorStakeAccount, isSigner: false, isWritable: true },
  {
    pubkey: newStakeAccount.publicKey, // step 2 variable
    isSigner: true,
    isWritable: true,
  },
  { pubkey: stakeAuthority, isSigner: false, isWritable: false },
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

## Step 4: Create deactivate transaction & add its instructions to transaction

```ts
import { StakeProgram } from '@solana/web3.js';

const deactivateTransaction = StakeProgram.deactivate({
    authorizedPubkey: payer,
    stakePubkey: newStakeAccount.publicKey,
  });

transaction.add(...deactivateTransaction.instructions);

transaction.partialSign(newStakeAccount); // step 2 variables
```
