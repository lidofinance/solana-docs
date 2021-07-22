---
title: maintenancecli
description: Overview of CLI for Maintenance
keywords:
 - maintenance
 - lido
 - solana
 - cli
sidebar_position: 3
---

# Using the Lido for Solana CLI for Maintenance


### Performing maintenance for Lido for Solana

In order to perform maintenance steps, the cli provides a perform-maintenance option:

```bash
solido perform-maintenance --solido-program-id $solido-program-address --solido-address $solido-address --stake-pool-program $stake-pool-program
```
- where:
  - **solido-program-id** -> The address of the lido for solana program
  - **solido-address** -> The address of the account that stores Lido for Solana data
  - **stake-pool-program-id** -> The address of the account that stores Lido for Solana data
 - return:
  - **maintenance-result**: If something was executed as maintenance or there was nothing to do


