---
title: state
description: Specification of the state.rs module
keywords:
 - development
 - developers
 - lido
 - specification
 - intent
 - state
 - solido
 - solana
sidebar_position: 12
---

# State


## Constants

### LIDO_VERSION

This byte specifies the version of the Solido state.

```rust
pub const LIDO_VERSION: u8 = 0;
```

### LIDO_CONSTANT_HEADER_SIZE

This defines the size of the header of the Solido state.

```rust
pub const LIDO_CONSTANT_HEADER_SIZE: usize = 1 + 2 * 32 + 8 + 2;
```
The header size should be equivalent to the following:

- the size of the version byte
- the size of the manager and st_sol_mint public keys
- the size of the st_sol_total_shares which is an stLamports struct
- the size of the sol_reserve_authority_bump_seed and the deposit_authority_bump_seed


### LIDO_CONSTANT_FEE_SIZE

This defines the size of the fee section of the Lido state.

```rust
pub const LIDO_CONSTANT_FEE_SIZE: usize = 2 * 32 + 3 * 4;
```

This should be equivalent to the following:

- the size of the FeeDistribution struct
- the size of the FeeRecipients struct


## Types

### Validators

The validators type uses the AccountMap struct and the [Validator](./state.md#Validator) struct to create a helper type to assist in dealing with the collection of validators needed for the Soldio state.

```rust
pub type Validators = AccountMap<Validator>;
```

### Maintainers

The Maintainers type leverages a type alias, AccountSet, for an AccountMap with a unit type.

```rust
pub type Maintainers = AccountSet;
```

## Structs

### Lido

This is the main structure for maintaining the Solido state.

```rust
pub struct Lido {
    pub lido_version: u8,
    pub manager: Pubkey,
    pub st_sol_mint: Pubkey,
    pub st_sol_total_shares: StLamports,
    pub sol_reserve_authority_bump_seed: u8,
    pub deposit_authority_bump_seed: u8,
    pub fee_distribution: FeeDistribution,
    pub fee_recipients: FeeRecipients,
    pub validators: Validators,
    pub maintainers: Maintainers,
}
```

#### Implemented functions on Lido

##### calculate_size

This function calculates the size of the Solido state *if* it had the maximum number of validators and maintainers.

```rust
pub fn calculate_size(max_validators: u32, max_maintainers: u32) -> usize {
```

##### calc_pool_tokens_for_deposit

This function calculates the correct amount of pool tokens, stSOL, for a given stake deposit in SOL.

$$
\textnormal{equivalent pool token (stLamports)}=\textnormal{stake equivalent in stLamports}*\frac{\textnormal{Total Shares stLamports}}{\textnormal{Total Lamports}}
$$

```rust
pub fn calc_pool_tokens_for_deposit(
    &self,
    stake_lamports: Lamports,
    total_lamports: Lamports,
) -> Option<StLamports> {
```

##### is_initialized

Checks if the instance of Solido has already been initialized.

```rust
pub fn is_initialized(&self) -> ProgramResult {
```

##### check_mint_is_st_sol_mint

Confirms that the passed mint account is indeed Solido's expected stSOL mint.

```rust
pub fn check_mint_is_st_sol_mint(&self, mint_account_info: &AccountInfo) -> ProgramResult {
```

##### check_is_st_sol_account

Confirms that the given account is an SPL token account with our stSOL mint as mint.

```rust
pub fn check_is_st_sol_account(&self, token_account_info: &AccountInfo) -> ProgramResult {
```

##### check_manager

Checks if the passed manager is the same as the one stored in the state

```rust
pub fn check_manager(&self, manager: &AccountInfo) -> ProgramResult {
```

##### check_maintainer

Checks if the passed maintainer belong to the list of maintainers

```rust
pub fn check_maintainer(&self, maintainer: &AccountInfo) -> ProgramResult {
```

##### get_reserve_account

This function returns the address of the reserve account, i.e. the account where SOL gets deposited to.

```rust
pub fn get_reserve_account(
  &self,
  program_id: &Pubkey,
  solido_address: &Pubkey,
) -> Result<Pubkey, ProgramError> {
```

##### check_reserve_authority

Confirms that the reserve authority passed does in fact belong to this Solido instance.

```rust
pub fn check_reserve_authority(
  &self,
  program_id: &Pubkey,
  solido_address: &Pubkey,
  reserve_authority_info: &AccountInfo,
) -> Result<Pubkey, ProgramError> {
```

### Validator

The validator struct maintains the data regarding each validator that is required to generate staking accounts and maintain the fees due.

```rust
pub struct Validator {
    pub fee_credit: StLamports,
    pub fee_address: Pubkey,
    pub stake_accounts_seed_begin: u64,
    pub stake_accounts_seed_end: u64,
    pub stake_accounts_balance: Lamports,
}
```

#### Implemented functions on Validator

##### find_stake_account_address

This function finds a stake account associated with a given validator vote account.

```rust
pub fn find_stake_account_address(
    program_id: &Pubkey,
    solido_account: &Pubkey,
    validator_vote_account: &Pubkey,
    seed: u64,
) -> (Pubkey, u8) {
```

> This function wraps the Solana `Pubkey::find_program_address`. That function tries to find a valid program address and its corresponding bump seed which must be passed as an additional seed when calling `invoke_signed`.
> The processes of finding a valid program address is by trial and error,and even though it is deterministic given a set of inputs it can take a variable amount of time to succeed across different inputs.  This means that when called from an on-chain program it may incur a variable amount of the program's compute budget.  Programs that are meant to be very performant may not want to use this function because it could take a considerable amount of time.  Also, programs that area already at risk of exceeding their compute budget should also call this with care since there is a chance that the program's budget may be occasionally exceeded.

> Additional Note: The underlying Solana program function will panic in the very unlikely event that the additional seed could not be found.

### FeeDistribution

The FeeDistribution struct simply maintains the ratios of distribution between the treasury, developer (Chorus One), and the validators.

```rust
pub struct FeeDistribution {
    pub treasury_fee: u32,
    pub validation_fee: u32,
    pub developer_fee: u32,
}
```

### FeeRecipients

The FeeRecipients struct is another simple struct that holds the Pubkey addresses of the treasury and developer (Chorus One) accounts that will receive fees.

```rust
pub struct FeeRecipients {
    pub treasury_account: Pubkey,
    pub developer_account: Pubkey,
}
```



