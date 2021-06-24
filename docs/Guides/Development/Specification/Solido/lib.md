---
title: lib
description: Specification of the lib.rs module
keywords:
 - development
 - developers
 - lido
 - specification
 - intent
 - lib
 - solido
 - solana
sidebar_position: 8
---

# Lib

Aside from the standard Rust convention of pulling all the modules together, the lib.rs module contains some important seeds for the Solido program along with functionality to find the correct public key and bump seed for a given authority.

## Constants

### RESERVE_AUTHORITY

Seed for reserve authority in SOL.

```rust
pub const RESERVE_AUTHORITY: &[u8] = b"reserve_authority";
```
### DEPOSIT_AUTHORITY

Seed for deposit authority

```rust
pub const DEPOSIT_AUTHORITY: &[u8] = b"deposit_authority";
```

### VALIDATOR_STAKE_ACCOUNT

Additional seed for validator stake accounts.

```rust
pub const VALIDATOR_STAKE_ACCOUNT: &[u8] = b"validator_stake_account";
```

## Functions

### find_authority_program_address

The find_authority_program_address function finds the public key and bump seed for a given authority.

```rust
pub fn find_authority_program_address(
    program_id: &Pubkey,
    lido_address: &Pubkey,
    authority: &[u8],
) -> (Pubkey, u8) {
```
> Note: This function can take some time to run so it is preferred to use ```PubKey::create_program_address``` function inside programs.





