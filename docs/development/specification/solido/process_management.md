---
title: process_management
description: Specification of the process_management.rs module
keywords:
 - development
 - developers
 - lido
 - specification
 - intent
 - process_management
 - solido
 - solana
sidebar_position: 10
---

# Process Management

Process management contains functionality that changes the state of Solido.

## Functions

### process_change_fee_spec

This function changes the fee spec in the Solido state.

```rust
pub fn process_change_fee_spec(
    program_id: &Pubkey,
    new_fee_distribution: FeeDistribution,
    accounts_raw: &[AccountInfo],
) -> ProgramResult {
```
The function is gated so that only the manager role can call the function successfully. It additionally checks that the developer and treasury accounts passed to the function are stSOL accounts.

> Note: This function can also be used to change the keys associated with the developer and treasury accounts in addition to changing the fee spec.


### process_add_validator

This function add a validator to the list of validators in the Solido state.

```rust
pub fn process_add_validator(program_id: &Pubkey, accounts_raw: &[AccountInfo]) -> ProgramResult {
```
The add validator process is gated so that only the manager role can call the function successfully. It additionally checks that the validator fee account is an stSOL accounts.


### process_remove_validator

This function remove a validator from the list of validators in the Solido state.

```rust
pub fn process_remove_validator(program_id: &Pubkey, accounts_raw: &[AccountInfo]) -> ProgramResult {
```
The remove validator process is gated so that only the manager role can call the function successfully. Additionally, before a validator can be removed, all fees must be claimed.  The function will fail with ```ValidatorHAsUnclaimedCredit``` [error](./error.md#Errors)  if there are unclaimed fees.

### process_claim_validator_fee

For a given validator fee account, this function will mint stSOL to the fee account equal to any outstanding fees due. Once minting is complete, the fee amount for the validator is reset to 0.

```rust
pub fn process_claim_validator_fee(
    program_id: &Pubkey,
    accounts_raw: &[AccountInfo],
) -> ProgramResult {
```
This function is **not** gated so anyone can call it successfully.


### process_distribute_fees

This function calculates the correct [Fee Distribution](../../../fees.md) and mints the appropriate stSOL tokens to the treasury and developer accounts.  Once minting is complete, the function sets the validator fees attributable to the validators in the Solido state ready for the [process_claim_validator_fee](./process_management.md#process_claim_validator_fee) to be called at a subsequent point in time.

```rust
pub fn process_distribute_fees(program_id: &Pubkey, accounts_raw: &[AccountInfo]) -> ProgramResult {
```
This function is gated so that only the maintainer role can call it successfully.


### process_add_maintainer

This function adds a maintainer to the list of maintainers in the Solido state.

```rust
pub fn process_add_maintainer(program_id: &Pubkey, accounts_raw: &[AccountInfo]) -> ProgramResult {
```

This function is gated so that only the manager role can call it successfully.

### process_remove_maintainer

This function removes a maintainer from the list of maintainers in the Solido state.

```rust
pub fn process_remove_maintainer(program_id: &Pubkey, accounts_raw: &[AccountInfo]) -> ProgramResult {
```

This function is gated so that only the manager role can call it successfully.
