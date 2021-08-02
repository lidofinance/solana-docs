---
title: logic
description: Specification of the logic.rs module
keywords:
 - development
 - developers
 - lido
 - specification
 - intent
 - logic
 - solido
 - solana
sidebar_position: 9
---

# Logic

The logic module contains general program logic that is not more directly associated with process, state or token functionality.


## Functions

### check_rent_exempt

This function checks the balance of account in lamports, along with the data length to determine if the account is rent exempt.

```rust
pub(crate) fn check_rent_exempt(
    rent: &Rent,
    account_info: &AccountInfo,
    account_name: &'static str,
) -> Result<(), ProgramError> {
```

### get_reserve_available_amount


This function gets the amount of lamports in reserve. The rent is subtracted from the total amount.

```rust
pub fn get_reserve_available_amount(
    reserve_account: &AccountInfo,
    sysvar_rent: &Rent,
) -> Result<Lamports, LidoError> {
```

> Note: this function will fail if the reserve's balance minus rent is < 0.


### calc_total_lamports

Calculates the sum of lamports available in the reserve (after rent us discounted) and the stake pool

```rust
pub fn calc_total_lamports(
    lido: &Lido,
    reserve_account: &AccountInfo,
    sysvar_rent: &Rent,
) -> Result<Lamports, LidoError> {
```

### token_mint_to


Creates and issues a spl_token ```MintTo``` instructioni from the Solana SPL token library program.

```rust
pub fn token_mint_to<'a>(
    lido: &Pubkey,
    token_program: AccountInfo<'a>,
    mint: AccountInfo<'a>,
    destination: AccountInfo<'a>,
    authority: AccountInfo<'a>,
    authority_type: &[u8],
    bump_seed: u8,
    amount: StLamports,
) -> Result<(), ProgramError> {
```

### deserialize_lido

This function first checks the the lido account is indeed the owner and then deserializes the lido data into the ```Lido``` struct.

```rust
pub fn deserialize_lido(program_id: &Pubkey, lido: &AccountInfo) -> Result<Lido, ProgramError>
```




