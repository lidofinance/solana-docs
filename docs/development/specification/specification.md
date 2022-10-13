---
title: specification
description: Overview of the intent of specification of the LIDO for Solana repo
keywords:
 - development
 - developers
 - lido
 - specification
 - intent
 - solana
sidebar_position: 1
---

# Specification Overview

The Solido repo can be generally split into three logical components:

- [solido](./Solido/solido) (the on-chain program)
- _multisig_ (the on-chain multisig governance program)
- _cli_ (the command line interface into the solido and multisig programs)

> Caveat: The initial iterations of Solido used the Solana program library stake-pool program, whilst this is no longer used as a main component, there exists references to data structures within the stake pool program.

There is also an dependency on the spl_token program from the Solana program library but this is used as is with no changes.
