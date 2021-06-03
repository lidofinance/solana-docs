---
title: multisigcli
description: Overview of CLI for Multisig Governance
keywords:
 - governance
 - multi-sig
 - lido
 - solido
 - solana
 - cli
sidebar_position: 2
---

# Using the Solido CLI for MultiSig Governance

All mutlisig functionality relating to Solido can be accessed through the multisig subcommand:

```bash
solido multisig ...
```

The following sections go through descriptions of the subcommands.

## Creating a new MultiSig address

In order to create a new multisig address

```bash
solido multisig create-multisig --threshold $threshold --owner $owner1 --owner $owner2 ...
```
- where:
  - threshold -> This is the minimum number of signatures required to approve a transaction.  At most, this should be the number of multisig participants.
  - owner ->  The public key  of a multisig participant. Multiples of this argument can be supplied to cover all participants.
- return:
  - multisig address: The public key address of the multisig program
  - multisig program derived address: The public key derived address of the multisig program
