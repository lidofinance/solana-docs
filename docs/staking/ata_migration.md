---
id: migrate-aux-to-ata-guide
title: Migrating tokens from Aux account to ATA account
description: Guide to help users migrate to Associated Token Accounts
keywords:
 - Solana
 - ATA
 - Saber
 - Mercurial
 - Raydium
sidebar_label: ATA Migration Guide
sidebar_position: 9
---

import mercurialerror from './images/ata-migration/mercurial_error.png';
import raywarn from './images/ata-migration/raydium_warning.png';
import raymigrate from './images/ata-migration/raydium_migrate.png';
import sabermigrate from './images/ata-migration/saber_migrate.png';

## Associated Token Accounts v/s Aux Accounts
Solana Program Library (SPL) allows a user to hold multiple tokens accounts corresponding to the same mint. These accounts 
- All have different addresses 
- **Do not** bear any relation with the user's main account address
- Hold only those tokens which are produced by that specific mint

Such accounts are known as Aux Accounts. However, these accounts can be a source of considerable confusion for other users trying to transfer money to the holder of the Aux Accounts. It also becomes nuanced for Dapps to build solutions that list a user's Aux Accounts. 

To overcome this problem Solana Program Library provides [**Associated Token Accounts**](https://spl.solana.com/associated-token-account) (ATA) which are _deterministically_ derived from the user's main account address and a token mint address. This makes it easier for wallets to keep track of all the ATAs corresponding to one user (one main System account address).

## Lido for Solana Aux Accounts
Every time a user deposits into and subsequently withdraws from the Lido for Solana program they are provided with a **deactivating stake account**. In its early days these deactivating stake accounts were just Aux Accounts. Later on, the Lido program started creating Associated Token Accounts upon withdrawal. Users who performed withdrawals within the first few days of Lido for Solana launch were assigned the Aux accounts.

:::note
For more details about the withdrawal process and deactivating stake accounts please visit https://docs.solana.lido.fi/staking/phantom#step-6-unstaking-and-utlizing-stsol
:::

These users now need to migrate their Aux accounts to ATA as most wallets recognize the ATAs. Those who do not migrate to ATAs may face problems when depositing into pools. For example a user with stSOL in their Aux account tried to deposit into the Mercurial [`stSOL-2Pool`](https://mercurial.finance/pools/stsol-2pool) but got a warning that their `Transaction may fail to confirm`

<p align="center">
    <img src={mercurialerror} alt="Mercurial Error" width="500"/>
</p>

This warning and other errors may arise if stSOL lies in an Aux Account instead of an ATA. 

## How to migrate to an ATA account

### 1. Checking stSOL in Aux Account
To check if your stSOL is **not** in an ATA head over to [https://raydium.io/swap](https://raydium.io/swap/?from=7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj&to=11111111111111111111111111111111) and connect your wallet.

In case you have stSOL in an Aux Account Raydium will show you the following warning

:::warning
You have 1 Token Accounts in your wallet that need to be migrated to associated token accounts. To learn more click here or use this migration tool to simplify the process of migrating your balances
:::

<p align="center">
    <img src={raywarn} alt="Raydium Warning" width="500"/>
</p>

### 2. Migrating the Aux Account to ATA
If you do have tokens in your Aux Account head over to [https://v1.raydium.io/migrate/](https://v1.raydium.io/migrate/). You will see the Aux Account Address, the balance and the token that needs to be migrated - `stSOL` in this case. 

<p align="center">
    <img src={raymigrate} alt="Raydium Migrate" width="500"/>
</p>

Click `Migrate Token Accounts`. Upon successful migration you will be able to deposit your stSOL easily into pools like Mercurial, Orca and Saber.

**Alternatively**, you may also use Saber App to migrate your stSOL to ATA. Head over to [Saber ATA URL](https://app.saber.so/#/tools/ata) and click on Migrate.

<p align="center">
    <img src={sabermigrate} alt="Saber Migrate" width="500"/>
</p>