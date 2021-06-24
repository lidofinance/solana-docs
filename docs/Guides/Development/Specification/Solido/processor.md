---
title: process
description: Specification of the process.rs module
keywords:
 - development
 - developers
 - lido
 - specification
 - intent
 - process
 - solido
 - solana
sidebar_position: 11
---

# Process

Following the Solana convention, this module contains the processing logic of the on-chain program.


 ## Functions

### process_initialize

This is the function that initializes the state of Solido.

```rust
pub fn process_initialize(
    version: u8,
    program_id: &Pubkey,
    fee_distribution: FeeDistribution,
    max_validators: u32,
    max_maintainers: u32,
    accounts_raw: &[AccountInfo],
) -> ProgramResult {

```

This function completes a number of checks:

- confirms the Solido account is rent exempt
- confirms the reserve account is rent exempt
- checks that the size of the Solido data is the same as expected given the constraints of ```max_maintainers```, ```max_validators``` and ```LIDO_CONSTANT_SIZE```

Once those checks are complete the function then finds the bump seeds associated with the ```RESERVE_AUTHORITY``` and ```DEPOSIT_AUTHORITY``` for the defined [constants](./lib.md#Constants), constructs the fee spec, checks that the ```treasury_account``` and ```developer_account``` are valid stSOL accounts and finally then builds and serializes the state of Solido.


### process_deposit

This function is responsible for taking SOL deposits and minting the equivalent stSOL to the depositors receiving account.

```rust
pub fn process_deposit(
    program_id: &Pubkey,
    amount: Lamports,
    accounts_raw: &[AccountInfo],
) -> ProgramResult {
```
The recipient account must be capable of holding stSOL.  The deposit is transferred from the users account to the reserve account and, after checking the correct amount of equivalent stSOL, these are minted to the recipient account.  The total stSOL shares is updated and the new Solido state is serialized.

### process_stake_deposit

The process stake deposit function is responsible for creating validator stake account and delegating reserve funds to those accounts.

```rust
pub fn process_stake_deposit(
    program_id: &Pubkey,
    amount: Lamports,
    raw_accounts: &[AccountInfo],
) -> ProgramResult {
```
This function is gated  so that only those in a maintainer role can run it successfully.  The function must check that the following are true:

- the amount being staked is greater than the minimum stake balance
- the amount being staked is less then the available reserve balance

Once those checks have been passed the function will try to find a stake address associated to the given validator and confirm that the account is uninitialized. The account is then allocated, assigned, the given amount is transferred to the account from the reserve. The account is then initialized and the amount is then delegated to the validator. Finally the validator stake amount is updated in the Solido state and the state is then serialized.


### process_withdraw

This function processes a withdrawal.

> Note: Withdrawals are currently not supported in Solido; they will be added in a subsequent version.

```rust
pub fn process_withdraw(
    _program_id: &Pubkey,
    _pool_tokens: StLamports,
    _accounts: &[AccountInfo],
) -> ProgramResult {
```

### process

This is the main process function that is called from the [entrypoint](./entrypoint.md#entrypoint).

```rust
pub fn process(program_id: &Pubkey, accounts: &[AccountInfo], input: &[u8]) -> ProgramResult {
```
The function simply parses the instruction passed and calls the appropriate processing logic.



