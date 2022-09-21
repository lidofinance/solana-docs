---
title: solido
description: Overview of the specification of the solido program of the LIDO for Solana repo
keywords:
 - development
 - developers
 - lido
 - specification
 - solido
 - intent
 - solido
 - solana
sidebar_position: 2
---

# Solido

Solido is the core on-chain program (aside from the multisig governance program) for LIDO for Solana.

## Program Structure

The program structure follows the recommended structure for Solana programs.

- src
  - **lib.rs**                 -> to register modules
  - **entrypoint.rs**          -> initial entrypoint into the program
  - **instruction.rs**         -> program api and the (de)serializing of instruction related data
  - **processor.rs**           -> program logic
  - **state.rs**               -> program objects/structures and the (de)serializing of program state
  - **error.rs**               -> error objects specific to the program
  - ...

Solido has a couple of additional modules for specific behaviour or domain functionality:

- src
  - ...
  - **account_map.rs**    -> objects to assist with mapping objects to a PubKey as key value pair
  - **balance.rs**            -> functionality related to target balances associated with validators
  - **logic.rs**              -> logic and helper functions associated with the program
  - **process_management.rs** -> functionality associated with changing the state of the program
  - **token.rs**              -> types to make working with token balances safer

The solido specification documents will go into detail for each of these modules to describe the structure and intent of the affiliated code.

- [balance](./balance)
- [entrypoint](./entrypoint)
- [error](./error)
- [instruction](./instruction)
- [lib](./lib)
- [process_management](./process_management)
- [processor](./processor)
- [state](./state)
- [token](./token)


## Terminology

- **Lamport**:  The minimum unit of denomination in Solana, which an equivalent value of 0.000000001 SOL. A helper struct,[Lamports](./token.md#Lamports) , is used in Solido to ensure safety when dealing with balances.
- **StLamport**:  The minimum unit of denomination in Solido pool tokens, stSOL, which an equivalent value of 0.000000001 stSOL. A helper struct,[StLamports](./token.md#StLamports) , is used in Solido to ensure safety when dealing with balances.



Additional Solana specific terminology can be found [here](https://docs.solana.com/terminology).

