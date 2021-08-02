---
title: balance
description: Specification of the balance.rs module
keywords:
 - development
 - developers
 - lido
 - specification
 - intent
 - balance
 - solido
 - solana
sidebar_position: 4
---

# Balance

The purpose of this module is to hold functionality that assists with calculating target balances associated with validators.

## Functions

There are two functions within this module; one that is intended to get the ideal target balance for each validator and the second to get the validator that is the furthest below the ideal target balance along with its current balance.

### get_target_balance

The intent of the get_target_balance function is to compare the current validator stake account balance to the ideal target balance of validators after any lamports that have not been delegated are taken into account.  The balances of the active validators is then updated to the target balance in a uniform fashion.  Any remainder due to rounding is also distributed.

```rust
pub fn get_target_balance(
    undelegated_lamports: Lamports,
    validators: &Validators,
    target_balance: &mut [Lamports],
) -> Result<(), LidoError> {
```

### get_validator_furthest_below_target

The intent of the get_validator_furthest_below_target function is to find the index and amount of the validator that is furthest from the ideal target balance.

```rust
pub fn get_validator_furthest_below_target(
    validators: &Validators,
    target_balance: &[Lamports],
) -> (usize, Lamports) {
```
