---
title: instruction
description: Specification of the instruction.rs module
keywords:
 - development
 - developers
 - lido
 - specification
 - intent
 - instruction
 - solido
 - solana
sidebar_position: 7
---

# Instruction

The purpose of the instruction module is to contain all functionality and structures related to the Solido program instructions.

## Enums

### Lido Instruction

The Lido instruction enum contains all the possible instructions for the Solido program.

#### Initialize

```rust
Initialize {
  fee_distribution: FeeDistribution,
  max_validators: u32,
  max_maintainers: u32,
},
```

The initialise instruction should be passed an appropriate [FeeDistribution](./state.md#FeeDistribution) along with the maximum number of validators and maintainers the instance of Solido will support.

#### Deposit

```rust
Deposit {
  amount: Lamports,
},
```
The instruction to deposit an amount defined using the helper struct [Lamports](./token.md#Lamports)

#### StakeDeposit

```rust
StakeDeposit {
  amount: Lamports,
},
```

The StakeDeposit instruction moves deposits, specified in [Lamports](./token.md#Lamports), into a new stake account and delegates it to a member validator.


#### Withdraw

```rust
Withdraw  {
  amount: Lamports,
},
```

The Withdraw instruction withdraws an amount, specified in [Lamports](./token.md#Lamports),  from the Solido program.

> Note: Withdraws are not currently supported in the Solido program but will be implemeted in a future version.

#### DistributeFees

```rust
DistributeFees
```
The DistributeFees instruction will calculate any fees due to the Lido stakeholders, allocate the fees to the program accounts and update the validator fees to be claimed when the ClaimValidatorFees instruction is called.

> Note: Only a maintainer can call this instruction

#### ClaimValidatorFees

```rust
ClaimValidatorFees
```

The ClaimValidatorFees instruction will mint any unclaimed fees to the validator's fee account.

#### ChangeFeeSpec

```rust
ChangeFeeSpec {
  new_fee_distribution: FeeDistribution,
},
```

The ChangeFeeSpec instruction changes the fee distribution ratios after initialisation when given an appropriate new [FeeDistribution](./state.md#FeeDistribution).

#### AddValidator

```rust
AddValidator,
```

The AddValidator instruction add a given validator to the pool of validators.

> Note: Only the manager role can call this instruction.


#### RemoveValidator

```rust
RemoveValidator,
```

The RemoveValidator instruction removes a given validator from the pool of validators. This instruction will fail with an [ValidatorHasUnclaimedCredit](./error.md#errors) error if the validator still has unclaimed credit.

> Note: Only the manager role can call this instruction.


#### AddMaintainer

```rust
AddMaintainer,
```

The AddMaintainer instruction add a given maintainer to the pool of maintainers.

> Note: Only the manager role can call this instruction.


#### RemoveMaintainer

```rust
RemoveMaintainer,
```

> Note: Only the manager role can call this instruction.


## Macros

### Accounts Struct and Accounts Struct Meta


```rust
macro_rules! accounts_struct {
...
}
```


```rust
macro_rules! accounts_struct_meta {
...
}
```

The accounts_struct and accounts_struct_meta macros assist in  generating two structs for passing accounts by name.  This has the following advantages over dealing with a list of accounts manually:

- There is no risk of making a mistake in the ordering of accounts, or forgetting to update one place after modifying a different place.
- For every account, it forces consideration of if that account should be writable or not.
- It has a shorthand for defining accounts that have a statically known address.


Example:

```rust

accounts_struct! {
  ExampleAccountsMeta, ExampleAccountsInfo {
     frobnicator: { is_signer: true, is_writable: false },
   sysvar_rent = sysvar::rent::id(),
 }
...
}
```

This will generate two structs of the form:

```rust
struct ExampleAccountsMeta {
   frobnicator: Pubkey,
}

impl ExampleAccountsMeta {
   pub fn to_vec(&self) -> Vec<AccountMeta>;
}

struct ExampleAccountsInfo<'a> {
 frobnicator: &'a AccountInfo<'a>,
 sysvar_rent: &'a AccountInfo<'a>,
}

impl ExampleAccountsInfo {
   pub fn try_from_slice<'a, 'b: 'a>(raw: &'b [AccountInfo<'a>]) -> Result<ExampleAccountsInfo, ProgramError>;
}
```


The generated structs ensure that the accounts returned by ```to_vec``` are in the same order that
 ```try_from_slice``` expects them. ```try_from_slice``` additionally validates that ```is_signer``` and ```is_writable``` match the definition.

### Accounts

The accounts used by Solido are generated using the accounts_struct macro. They are summarized here, for each instruction, along with the signable and writable status.

#### InitializeAccounts

Generated structs => InitializeAccountsMeta and InitializeAccountsInfo

| Account Name | Purpose | is_signer | is_writable |
| --- | --- | --- | --- |
| lido | | false | **true** |
| manager | | false | false |
| st_sol_mint | | false | false |
| treasury_account | | false | false |
| developer_account | | false | false |
| reserve_account | | false | false |

Constants included:

```rust
const sysvar_rent = sysvar::rent::id(),
const spl_token = spl_token::id(),
```

#### DepositAccounts

Generated structs => DepositAccountsMeta and DepositAccountsInfo

| Account Name | Purpose | is_signer | is_writable |
| --- | --- | --- | --- |
| lido | | false | **true** |
| user | | **true** | **true** |
| recipient | | false  | **true** |
| st_sol_mint | | false | **true** |
| reserve_account | | false | **true** |


Constants included:

```rust
const spl_token = spl_token::id(),
const system_program = system_program::id(),
const sysvar_rent = sysvar::rent::id(),
```


#### StakeDepositAccount

Generated structs => StakeDepositAccountMeta and StakeDepositAccountInfo

| Account Name | Purpose | is_signer | is_writable |
| --- | --- | --- | --- |
| lido | | false | **true** |
| maintainer | | **true** | false |
| reserve | | false | **true** |
| validator_vote_account | | false  | false |
| stake_account_end | | false | **true** |
| deposit_authority | | false | **true** |


Constants included:

```rust
const sysvar_clock = sysvar::clock::id(),
const system_program = system_program::id(),
const sysvar_rent = sysvar::rent::id(),
const stake_program = stake_program::id(),
const stake_history = stake_history::id(),
const stake_program_config = stake_program::config_id(),
```


#### ChangeFeeSpec

Generated structs => ChangeFeeSpecMeta and ChangeFeeSpecInfo

| Account Name | Purpose | is_signer | is_writable |
| --- | --- | --- | --- |
| lido | | false | **true** |
| manager | | **true** | false |
| treasury_account | | false  | false |
| developer_account | | false  | false |

No additonal constants.


#### AddValidator

Generated structs => AddValidatorMeta and AddValidatorInfo

| Account Name | Purpose | is_signer | is_writable |
| --- | --- | --- | --- |
| lido | | false | **true** |
| manager | | **true** | false |
| validator_vote_account | | false  | false |
| validator_fee_st_sol_account | | false  | false |


Constants included:

```rust
const sysvar_clock = sysvar::clock::id(),
const sysvar_stake_history = sysvar::stake_history::id(),
const sysvar_stake_program = stake_program::id(),
```

#### RemoveValidator

Generated structs => RemoveValidatorMeta and RemoveValidatorInfo

| Account Name | Purpose | is_signer | is_writable |
| --- | --- | --- | --- |
| lido | | false | **true** |
| manager | | **true** | false |
| validator_vote_account_to_remove | | false  | false |


Constants included:

```rust
const sysvar_clock = sysvar::clock::id(),
const sysvar_stake_program = stake_program::id(),
```

#### DistributeFees

Generated structs => DistributeFeesMeta and DistributeFeesInfo

| Account Name | Purpose | is_signer | is_writable |
| --- | --- | --- | --- |
| lido | | false | **true** |
| maintainer  | | **true** | false |
| st_sol_mint  | | false | **true** |
| reserve_authority | | false  | false |
| treasury_account  | | false | **true** |
| developer_account | | false | **true** |


Constants included:

```rust
const spl_token = spl_token::id(),
```

#### ClaimValidatorFees

Generated structs => ClaimValidatorFeesMeta and DistributeFeesInfo

| Account Name | Purpose | is_signer | is_writable |
| --- | --- | --- | --- |
| lido | | false | **true** |
| st_sol_mint  | | false | **true** |
| reserve_authority | | false  | false |
| validator_fee_st_sol_account  | | false | **true** |


Constants included:

```rust
const spl_token = spl_token::id(),
```

#### AddMaintainer

Generated structs => AddMaintainerMeta and  AddMaintainerInfo

| Account Name | Purpose | is_signer | is_writable |
| --- | --- | --- | --- |
| lido | | false | **true** |
| manager | | **true** | false |
| maintainer | | false  | false |

No additonal constants.

#### RemoveMaintainer

Generated structs => RemoveMaintainerMeta and  RemoveMaintainerInfo

| Account Name | Purpose | is_signer | is_writable |
| --- | --- | --- | --- |
| lido | | false | **true** |
| manager | | **true** | false |
| maintainer | | false  | false |

No additonal constants.


## Functions

For each of the instructions (and their associated account structs) the module contains the functions required to generate the appropriate instructions.

Each of the functions return a result object of the appropriate instruction or a ```ProgramError```:

```rust
-> Result<Instruction, ProgramError>
```
### initialise

Constructs, verifies the accounts and returns the ```Lido::Initialize``` instruction.

```rust
pub fn initialize(
    program_id: &Pubkey,
    fee_distribution: FeeDistribution,
    max_validators: u32,
    max_maintainers: u32,
    accounts: &InitializeAccountsMeta,
) -> Result<Instruction, ProgramError> {
```

### deposit

Constructs, verifies the accounts and returns the ```Lido::Deposit``` instruction.

```rust
pub fn deposit(
    program_id: &Pubkey,
    accounts: &DepositAccountsMeta,
    amount: Lamports,
) -> Result<Instruction, ProgramError> {
```

### stake_deposit

Constructs, verifies the accounts and returns the ```Lido::StakeDeposit``` instruction.

```rust
pub fn stake_deposit(
    program_id: &Pubkey,
    accounts: &StakeDepositAccountsMeta,
    amount: Lamports,
) -> Result<Instruction, ProgramError> {
```

### change_fee_distribution

Constructs, verifies the accounts and returns the ```Lido::ChangeFeeSpec``` instruction.

```rust
pub fn change_fee_distribution(
    program_id: &Pubkey,
    new_fee_distribution: FeeDistribution,
    accounts: &ChangeFeeSpecMeta,
) -> Result<Instruction, ProgramError> {
```

### add_validator

Constructs, verifies the accounts and returns the ```Lido::AddValidator``` instruction.

```rust
pub fn add_validator(
    program_id: &Pubkey,
    accounts: &AddValidatorMeta,
) -> Result<Instruction, ProgramError> {
```

### remove_validator

Constructs, verifies the accounts and returns the ```Lido::RemoveValidator``` instruction.

```rust
pub fn remove_validator(
    program_id: &Pubkey,
    accounts: &RemoveValidatorMeta,
) -> Result<Instruction, ProgramError> {
```

### distribute_fees

Constructs, verifies the accounts and returns the ```Lido::DistributeFees``` instruction.

```rust
pub fn distribute_fees(
    program_id: &Pubkey,
    accounts: &DistributeFeesMeta,
) -> Result<Instruction, ProgramError> {
```

### claim_validator_fees

Constructs, verifies the accounts and returns the ```Lido::ClaimValidatorFees``` instruction.

```rust
pub fn claim_validator_fees(
    program_id: &Pubkey,
    accounts: &ClaimValidatorFeeMeta,
) -> Result<Instruction, ProgramError> {
```

### add_maintainer

Constructs, verifies the accounts and returns the ```Lido::AddMaintainer``` instruction.

```rust
pub fn add_maintainer(
    program_id: &Pubkey,
    accounts: &AddMaintainerMeta,
) -> Result<Instruction, ProgramError> {
```

### remove_maintainer

Constructs, verifies the accounts and returns the ```Lido::RemoveMaintainer``` instruction.

```rust
pub fn remove_maintainer(
    program_id: &Pubkey,
    accounts: &RemoveMaintainerMeta,
) -> Result<Instruction, ProgramError> {
```




