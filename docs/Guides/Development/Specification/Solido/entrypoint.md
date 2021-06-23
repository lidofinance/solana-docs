---
title: entrypoint
description: Specification of the entrypoint.rs module
keywords:
 - development
 - developers
 - lido
 - specification
 - intent
 - entrypoint
 - solido
 - solana
sidebar_position: 5
---

# Entrypoint

The only function in the entrypoint module is the entrypoint function.  This module conforms to the standard Solana program structure and serves to call through to the process function in the process module; ```processor::process(program_id, accounts, instruction_data)```.


```rust
entrypoint!(process_instruction);
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
```




