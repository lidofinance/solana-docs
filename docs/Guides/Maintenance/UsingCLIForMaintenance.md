---
title: maintenancecli
description: Overview of CLI for Maintenance
keywords:
 - maintenance
 - lido
 - solido
 - solana
 - cli
sidebar_position: 3
---

# Using the Solido CLI for Maintenance


### Performing maintenance for Solido

In order to perform maintenance steps, the solido cli provides a perform-maintenance option:

```bash
solido perform-maintenance --solido-program-id $solido-program-address --solido-address $solido-address --stake-pool-program $stake-pool-program
```
- where:
  - **solido-program-id** -> The address of the solido program
  - **solido-address** -> The address of the account that stores Solido data
  - **stake-pool-program-id** -> The address of the account that stores Solido data
 - return:
  - **maintenance-result**: If something was executed as maintenance or there was nothing to do


