---
id: stSOL-Liquidity
title: Utilizing stSOL in DeFi
description: Using stSOL as a collateral in DeFi to earn secondary rewards
keywords:
 - Saber
 - Raydium
 - lido
 - Mercurial
 - Farming
sidebar_label: stSOL-Liquidity
sidebar_position: 7
---

import wallets from './images/sollet/wallet_list_sollet.png';


# How to use stSOL to earn secondary rewards
A quick guide on using stSOL in DeFi to earn more rewards. In this guide we will be talking about the following DeFi integrations.
1. [Saber](https://saber.so/)
2. Raydium


## Adding liquidity to Saber stSOL/SOL Pool and farming Saber LP tokens
### Summary
>How to earn SBR by providing stSOL/SOL liquidity:
>1. Stake your SOL on Lido Finance to get stSOL, receiving staking rewards;
>2. Provide liquidity for stSOL/SOL on Saber, receiving Liquidity Provider rewards;
>3. Stake your LP tokens on Saber, receiving SBR liquidity mining rewards. There are future plans to also introduce dual yield farming that will allow farmers to also earn LDO liquidity mining rewards.

### Steps
1. Navigate to https://saber.so/, click on `Launch App` and go to the `Pools` tab.

![saber-main-page](./images/saber/mainpage.png)

2. Scroll down to `stSOL-SOL` pool. If you click on `Deposit`, you will be able to see the pool statistics as well. The statistics tell you the proportion of stSOL to SOL in the pool. Below the pool statistics you can view the account addresses related to stSOL, SOL and Swap accounts.

![stSOL-SOL-pool](./images/saber/stSOLpool.png)
![poolStats](./images/saber/poolStats.png)

3. Before you can add liquidity to the pool you will need to connect your wallet with Saber app.

![position](./images/saber/position.png)

4. You may choose any wallet of your liking to connect to Saber app. For the purposes of this guide we use `Phantom` wallet. 
:::note
When you unstake from Saber farm you get Wrapped SOL (wSOL instead of SOL). Phantom wallet has the additional benefit of allowing you to unwrap SOL tokens easily.
:::

![connect](./images/saber/connect.png)
![phantom](./images/saber/phantom.png)
![connecting](./images/saber/connecting.png)
![wallet-connect](./images/saber/wallet-connect.png)
![connected](./images/saber/connected1.png)
![connected](./images/saber/connected2.png)

5. Enter the amount of stSOL and SOL you would like to add to the pool and click on Deposit.

![enter-amount](./images/saber/enter-amount.png)

6. Confirm the deposit and approve the transaction in your wallet.
:::note
Make sure to note down the transaction hash or the link provided on the screen. This allows for an easier debugging in case of a failed transaction.
:::

![confirm-pool-deposit](./images/saber/confirm-pool-deposit.png)

7. Once the deposit to the pool gets confirmed, you will receive LP tokens that will accrue rewards whenever someone transacts on the pool. Saber also displays a warning that your LP tokens are unstaked. You can click on the `Farm SBR` link or go to the `Farms` tab above to stake your LP tokens. Staking in Saber farms provides you with an opportunity to earn additional `$SBR` rewards

![pool-confirmed](./images/saber/pool-confirmed.png)
![pool-confirmed2](./images/saber/pool-confirmed2.png)

#### Farming LP Tokens

8. Navigate to the `stSOL-SOL` farm on the Farm page and click on `Stake` to review the farm info and stake your LP tokens. At the time of writing this guide the collective returns from the pool were around `35,897 SBR/day`

![farm](./images/saber/farm.png)
![farm](./images/saber/farm-info.png)

9. Enter the amount of LP tokens you would like to stake or hit the `Balance` link to stake the maximum possible amount.

![lp-balance](./images/saber/lp-balance.png)

10. Once the transaction gets confirmed you will be able to see your stake balance and your rewards accruing in real-time (shown as `Your unclaimed tokens`)

![stake-farm](./images/saber/stake-farm.png)

#### Claiming SBR Rewards
_coming soon_

#### Unstaking from Saber farm
_coming soon_

#### Withdrawing from stSOL/SOL pool
_coming soon_

#### Unwrapping wSOL
_coming soon_