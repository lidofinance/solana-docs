# Migration Guide (v1 → v2)

:::caution
Our smart-contract (solido) upgrade is coming soon. It will bring **breaking changes** to frontend integration, that's why it's critical
important to be ready for this upgrade, v1 instructions **will stop work**. We recommend follow [our example](https://github.com/lidofinance/solido-sdk/blob/b1ab2a4f5e58e7f08e1d0965d9d83f867f9ce958/src/unstake/getAccountInfo.ts#L469-L516),
support both version by using `try/catch`. But the best is to start using [SDK](/frontend-integration/sdk).
:::

## Solido Changes:
- Validators and Maintainers list now is stored in a separate account, you need to fetch them separately, in first version they were stored inside protocol state.
- Validator structure was changed:
  - `pubkey` now is stored in `vote_account_address`
  - was removed `fee_credit`, `fee_address` fields
- Withdraw instruction fields:
  - Changed buffer layout, had been added `validator_index`
  - Instruction code was **2**, now is **23** due to technical peculiarity
  - `validator_list` had been added to instructions keys


### 1. Validators list now is stored in a separate account
```diff
- ['validators', Validators] // Validator scheme
+ ['validator_list', [32]] // PublicKey
```

That's why, in order to get validator list you need to fetch additionally them after fetching solido state:
```ts
const deserializedAccountInfo = deserializeUnchecked(
  accountInfoschema,
  Lido,
  accountInfo.data,
);

const validatorsList = new PublicKey(deserializedAccountInfo.validators_list);
const validators = await connection.getAccountInfo(validatorsList);

const deserializedValidators = deserializeUnchecked(
    validatorsSchema,
    AccountList,
    validators.data,
);

// here is parsed validator list array
console.log('validators', deserializedValidators.entries);
```

Also changed structure of validator. 

**V1**:
```javascript
// accountInfoScheme
[
  // ... other fields
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
        ['fee_credit', 'u64'],
        ['fee_address', [32]],
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
        ['pubkey', [32]],
        ['entry', ValidatorClass],
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
  ]
]
```

**V2**:
```javascript
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

<details>
  <summary>Typings:</summary>

**V1**:
```ts
type Validator = {
  entry: {
    vote_account_address: PublicKey;
    stake_seeds: SeedRange;
    unstake_seeds: SeedRange;
    stake_accounts_balance: BN;
    unstake_accounts_balance: BN;
    effective_stake_balance: BN;
    active: boolean;
  };
  pubkey: PublicKey;
};

type AccountInfo = {
 // other fields
  validators: {
    entries: Validator[];
  };
};
```

**V2**:
```ts
type Validator = {
  vote_account_address: PublicKey;
  stake_seeds: SeedRange;
  unstake_seeds: SeedRange;
  stake_accounts_balance: BN;
  unstake_accounts_balance: BN;
  effective_stake_balance: BN;
  active: boolean;
};

type ValidatorsList = {
  header: ListHeader;
  entries: Validator[];
};
```
</details>

### 2. Withdraw Instruction

- Changed buffer layout, had been added `validator_index`:

**V1**:
```javascript
import { nu64, struct, u8 } from 'buffer-layout';

const dataLayout = struct([u8('instruction'), nu64('amount')]);

const data = Buffer.alloc(dataLayout.span);
```

**V2**:
```javascript
import { nu64, struct, u32, u8 } from 'buffer-layout';

const dataLayout = struct([u8('instruction'), nu64('amount'), u32('validator_index')]);

const data = Buffer.alloc(dataLayout.span);
```

- Instruction code:

**V1**:
```ts
dataLayout.encode(
  {
    instruction: 2, // old code of withdraw instruction
    amount: new BN(amount),
  },
  data,
);
```

**V2**:
```ts
dataLayout.encode(
  {
    instruction: 23, // new code of withdraw instruction
    amount: new BN(amount),
    validator_index: validatorIndex,
  },
  data,
);
```
*For `validatorIndex` see [unstake page](/frontend-integration/manual-instructions/unstake#step-4-create-withdraw-instruction).*

- `validator_list` had been added to instructions keys:

```diff
  const keys = [
    { pubkey: solidoInstanceId, isSigner: false, isWritable: true },
    { pubkey: payerAddress, isSigner: true, isWritable: false },
    { pubkey: senderStSolAccountAddress, isSigner: false, isWritable: true },
    { pubkey: stSolMintAddress, isSigner: false, isWritable: true },
    { pubkey: new PublicKey(validator.pubkey.toArray('le')), isSigner: false, isWritable: false },
    { pubkey: validatorStakeAccount, isSigner: false, isWritable: true },
    { pubkey: stakeAccount, isSigner: true, isWritable: true },
    { pubkey: stakeAuthority, isSigner: false, isWritable: false },
+   { pubkey: new PublicKey(accountInfo.validators_list), isSigner: false, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    { pubkey: StakeProgram.programId, isSigner: false, isWritable: false },
  ];
```

<br />

<details>
  <summary>Full change of account schema:</summary>

```diff
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
-    [
-      SeedRange,
-      {
-        kind: 'struct',
-        fields: [
-          ['begin', 'u64'],
-          ['end', 'u64'],
-        ],
-      },
-    ],
-    [
-      Validator,
-      {
-        kind: 'struct',
-        fields: [
-          ['fee_credit', 'u64'],
-          ['fee_address', 'u256'],
-          ['stake_seeds', SeedRange],
-          ['unstake_seeds', SeedRange],
-          ['stake_accounts_balance', 'u64'],
-          ['unstake_accounts_balance', 'u64'],
-          ['active', 'u8'],
-        ],
-      },
-    ],
-    [
-      PubKeyAndEntry,
-      {
-        kind: 'struct',
-        fields: [
-          ['pubkey', 'u256'],
-          ['entry', Validator],
-        ],
-      },
-    ],
-    [
-      PubKeyAndEntryMaintainer,
-      {
-        kind: 'struct',
-        fields: [
-          ['pubkey', 'u256'],
-          ['entry', [0]],
-        ],
-      },
-    ],
    [
      RewardDistribution,
      {
        kind: 'struct',
        fields: [
          ['treasury_fee', 'u32'],
-          ['validation_fee', 'u32'],
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
-          ['treasury_account', 'u256'],
+          ['treasury_account', [32]],
-          ['developer_account', 'u256'],
+          ['developer_account', [32]],
        ],
      },
    ],
-    [
-      Validators,
-      {
-        kind: 'struct',
-        fields: [
-          ['entries', [PubKeyAndEntry]],
-          ['maximum_entries', 'u32'],
-        ],
-      },
-    ],
-    [
-      Maintainers,
-      {
-        kind: 'struct',
-        fields: [
-          ['entries', [PubKeyAndEntryMaintainer]],
-          ['maximum_entries', 'u32'],
-        ],
-      },
-    ],
    [
      Lido,
      {
        kind: 'struct',
        fields: [
+          ['account_type', 'u8'],

          ['lido_version', 'u8'],

-          ['manager', 'u256'],
+          ['manager', [32]],

-          ['st_sol_mint', 'u256'],
+          ['st_sol_mint', [32]],

          ['exchange_rate', ExchangeRate],

          ['sol_reserve_authority_bump_seed', 'u8'],
          ['stake_authority_bump_seed', 'u8'],
          ['mint_authority_bump_seed', 'u8'],
          ['rewards_withdraw_authority_bump_seed', 'u8'],

          ['reward_distribution', RewardDistribution],

          ['fee_recipients', FeeRecipients],

          ['metrics', Metrics],

-          ['validators', Validators],
+          ['validator_list', [32]],

-          ['maintainers', Maintainers],
+          ['maintainer_list', [32]],

+          ['max_commission_percentage', 'u8'],
        ],
      },
    ],
  ]);
  
+ const validatorsSchema = new Map([
+   [
+     ListHeader,
+     {
+       kind: 'struct',
+       fields: [
+         ['account_type', 'u8'],
+         ['lido_version', 'u8'],
+         ['max_entries', 'u32'],
+       ],
+     },
+   ],
+   [
+     SeedRange,
+     {
+       kind: 'struct',
+       fields: [
+         ['begin', 'u64'],
+         ['end', 'u64'],
+       ],
+     },
+   ],
+   [
+     ValidatorClass,
+     {
+       kind: 'struct',
+       fields: [
+         ['vote_account_address', [32]],
+         ['stake_seeds', SeedRange],
+         ['unstake_seeds', SeedRange],
+         ['stake_accounts_balance', 'u64'],
+         ['unstake_accounts_balance', 'u64'],
+         ['effective_stake_balance', 'u64'],
+         ['active', 'u8'],
+       ],
+     },
+   ],
+   [
+     AccountList,
+     {
+       kind: 'struct',
+       fields: [
+         ['header', ListHeader],
+         ['entries', [ValidatorClass]],
+       ],
+     },
+   ],
+ ]);
```

</details>
