---
title: multisigcli
description: Overview of CLI for Governance
keywords:
 - governance
 - multi-sig
 - lido
 - solana
 - cli
sidebar_position: 4
---

# Using the Lido for Solana CLI for Governance

## MultiSig Governance

All mutlisig functionality relating to Lido for Solana can be accessed through the multisig subcommand:

```bash
solido multisig --multisig-program-id $multisig-program-address ...
```
The ```$multisig-program-address``` is the id of the on-chain multisig program.

The following sections go through descriptions of the subcommands.

### Creating a new MultiSig address

In order to create a new multisig address

```bash
solido multisig --multisig-program-id $multisig-program-address create-multisig --threshold $threshold --owner $owner1 --owner $owner2 ...
```
- where:
  - **threshold** -> This is the minimum number of signatures required to approve a transaction.  At most, this should be the number of multisig participants.
  - **owner** ->  The public key  of a multisig participant. Multiples of this argument can be supplied to cover all participants.
- return:
  - **multisig address**: The public key address of the multisig program
  - **multisig program derived address**: The public key derived address of the multisig program


### Showing details of the MultiSig

To view details of the MultiSig

```bash
solido multisig --multisig-program-id $multisig-program-address show-multisig  --multisig-address $multisig-address
```
- where:
  - **multisig-address** -> This is the address of the multisig program
- return:
  - **multisig program derived address**: The public key derived address of the multisig program
  - **threshold**: The current minimum number of signers required to approve a transaction
  - **owners**: List of the multisig owner public keys

### Approving a MultiSig Transaction

A MultiSig owner can approve a transaction using the following:

```bash
solido multisig --multisig-program-id $multisig-program-address approve  --multisig-address $owner-address --transaction-address $transaction-address
```
- where:
  - **owner-address** -> This is the address of the multisig owner who
  - **transaction-address** -> The address of the transaction to be approved
- return:
  - **signature**: The signature of the approval


### Executing a MultiSig Transaction

A transaction can be executed, once it has the required number of a approvals, using the following:

```bash
solido multisig --multisig-program-id $multisig-program-address execute-transaction  --multisig-address $multisig-address --transaction-address $transaction-address
```
- where:
  - **multisig-address** -> This is the address of the multisig program
  - **transaction-address** -> The address of the transaction to be approved
- return:
  - **signature**: The signature of the transaction


### Proposing a change

Proposing a change to the threshold or owners of the multisig can be achieved with the following:
A transaction can be executed, once it has the required number of a approvals, using the following:

```bash
solido multisig --multisig-program-id $multisig-program-address propose-change-multisig  --multisig-address $multisig-address --threshold $threshold --owner $owner1 --owner $owner2 ...
```
- where:
  - **threshold** -> This is the minimum number of signatures required to approve a transaction.  At most, this should be the number of multisig participants.
  - **multisig-address** -> This is the address of the multisig program
  - **owner** ->  The public key  of a multisig participant. Multiples of this argument can be supplied to cover all participants.
- return:
  - **transaction-address**: The address of the transaction


### Proposing an upgrade

Proposing a change to the threshold or owners of the multisig can be achieved with the following:
A transaction can be executed, once it has the required number of a approvals, using the following:

```bash
solido multisig --multisig-program-id $multisig-program-address propose-change-multisig  --multisig-address $multisig-address --program-address $program-address --buffer-address $buffer-address --spill-address $spill-address
```
- where:
  - **multisig-address** -> This is the address of the multisig program
  - **program-address** -> This is the address of the program to upgrade
  - **buffer-address** -> This is the address that holds the new program data
  - **spill-address** -> This address will receive leftover funds from the buffer account
- return:
  - **transaction-address**: The address of the transaction

## General Governance

### Adding a maintainer

To add a maintainer for Lido for Solana one can use the following:


```bash
solido add-maintainer --solido-program-id $solido-program-id --solido-address $solido-address --maintainer-address $maintainer-address
```
- where:
  - **solido-program-id** -> This is the address of the Lido for Solana program
  - **solido-address** -> This is the address of the account that stores the data for the Lido for Solana instance
  - **maintainer-address** -> This is the address of the maintainer to be added
  - **multisig-address** -> This is the address of the multisig account
  - **multisig-program-id** -> This is the address of the multisig program
- return:
  - **transaction-address**: The address of the transaction

### Removing a maintainer

To remove a maintainer for Lido for Solana one can use the following:


```bash
solido remove-maintainer --solido-program-id $solido-program-id --solido-address $solido-address --maintainer-address $maintainer-address
```
- where:
  - **solido-program-id** -> This is the address of the Lido for Solana program
  - **solido-address** -> This is the address of the account that stores the data for the Lido for Solana instance
  - **maintainer-address** -> This is the address of the maintainer to be added
  - **multisig-address** -> This is the address of the multisig account
  - **multisig-program-id** -> This is the address of the multisig program
- return:
  - **transaction-address**: The address of the transaction

### Adding a validator

To add a validator for Lido for Solana one can use the following:


```bash
solido add-validator --solido-program-id $solido-program-id --solido-address $solido-address --stake-pool-program-id  $stake-pool-program-id  --validator-vote $validator-vote-account --validator-rewards-address  $validator-rewards-address
```
- where:
  - **solido-program-id** -> This is the address of the Lido for Solana program
  - **solido-address** -> This is the address of the account that stores the data for the Lido for Solana instance
  - **stake-pool-program-id** -> This is the address of the stake pool program deployed with Lido for Solana
  - **validator-vote** -> This is the address of the vote account for the validator being added
  - **validator-rewards-address** -> This is the address that stSol rewards will be sent to
- return:
  - **transaction-address**: The address of the transaction


### Creating a validator stake account

In order to create the stake account that a validator will use, the solido cli provides the following operation:

```bash
solido create-validator-stake-account --solido-program-id $solido-program-id --solido-address $solido-address --stake-pool-program-id  $stake-pool-program-id  --validator-vote $validator-vote-account
```
- where:
  - **solido-program-id** -> This is the address of the Lido for Solana program
  - **solido-address** -> This is the address of the account that stores the data for the Lido for Solana instance
  - **stake-pool-program-id** -> This is the address of the stake pool program deployed with Lido for Solana
  - **validator-vote** -> This is the address of the vote account for the validator being added
- return:
  - **transaction-address**: The address of the transaction


### Creating the Lido for Solana instance.

In order to create the Lido for Solana instance it is necessary to supply commands to the following:

```bash
solido create-solido --solido-program-id $solido-program-id --stake-pool-program-id  $stake-pool-program-id --fee-numerator $fee-numerator --fee-denominator $fee-denominator --max-validators $max-validators --max-maintainers $max-maintainers --insurance-fee $insurance-fee --treasury-fee $treasury-fee --validation-fee $validation-fee --manager-fee $manager-fee --insurance-account-owner $insurance-account-owner --treasury-account-owner $treasury-account-ownder --manager-fee-account-owner $manager-fee-account-owner --manager $manager
```
- where:
  - **solido-program-id** -> This is the address of the Lido for Solana program
  - **stake-pool-program-id** -> This is the address of the stake pool program deployed with Lido for Solana
  - **fee-numerator** -> The numerator of the fee fraction
  - **fee-denominator** -> The denominator of the fee fraction
  - **max-validators** -> The maximum number of validators that the Lido for Solana instance will support
  - **max-maintainers** -> The maximum number of maintainers that the Lido for Solana instance will support
  - **insurance-fee** -> The share of the fee for insurance
  - **treasury-fee** -> The share of the fee for treasury
  - **validation-fee** -> The share of the fee for validation
  - **manager-fee** -> The share of the fee for manager
  - **insurance-account-owner** -> The account who will own the stSOL SPL token account that receives the treasury fees
  - **treasury-account-owner** -> The account who will own the stSOL SPL token account that receives the treasury fees
  - **manager-fee-account-owner** -> The account who will own the stSOL SPL token account that receives the manager fees
  - **manager(optional)** -> If defined, the Lido for Solana instance is created with a manager, otherwise the default fee payer is used
- return:
  - **transaction-address**: The address of the transaction


