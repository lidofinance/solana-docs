---
id: stSOL-Saber-pool
title: Utilizing stSOL in Saber
description: Using stSOL as a collateral in Saber to earn secondary rewards 
keywords:
 - Saber
 - Raydium
 - lido
 - Mercurial
 - Farming
sidebar_label: Investing stSOL in Saber
sidebar_position: 7
---

import claimed from './images/saber/claimed-sbr.png';
import slpbalance from './images/saber/slp-balance.png';
import wsolflare from './images/saber/wsol-solflare.png';
import wsolong from './images/saber/wsol-solong.png';
import unwrap from './images/saber/unwrap.png';
import unwrap2 from './images/saber/unwrap2.png';


# How to use stSOL to earn secondary rewards
A quick guide on using stSOL in DeFi to earn more rewards. In this guide we will be talking about the following DeFi integrations.
1. [Saber](https://saber.so/)


## How to earn SBR by providing stSOL/SOL liquidity
### Summary
>1. Stake your SOL on Lido Finance to get stSOL, receiving staking rewards;
>2. Provide liquidity for stSOL/SOL on Saber, receiving Liquidity Provider rewards;
>3. Stake your LP tokens on Saber, receiving SBR liquidity mining rewards. There are future plans to also introduce dual yield farming that will allow farmers to also earn LDO liquidity mining rewards.

### 1. Adding liquidity to stSOL/SOL pool
1. Navigate to https://saber.so/, click on `Launch App` and go to the `Pools` tab.

![saber-main-page](./images/saber/mainpage.png)

2. Scroll down to `stSOL-SOL` pool. If you click on `Deposit`, you will be able to see the pool statistics as well. The statistics tell you the proportion of stSOL to SOL in the pool. Below the pool statistics you can view the account addresses related to stSOL, SOL and Swap accounts.

![stSOL-SOL-pool](./images/saber/stSOLpool.png)
![poolStats](./images/saber/poolStats.png)

3. Before you can add liquidity to the pool you will need to connect your wallet with Saber app.

![position](./images/saber/position.png)

4. You may choose any wallet of your liking to connect to Saber app. For the purposes of this guide we use `Phantom` wallet. 
:::note
When you unstake from Saber farm you get Wrapped SOL. Phantom wallet has the additional benefit of allowing you to unwrap SOL tokens easily.
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

### 2. Farming LP Tokens

8. Navigate to the `stSOL-SOL` farm on the Farm page and click on `Stake` to review the farm info and stake your LP tokens. At the time of writing this guide the collective returns from the pool were around `35,897 SBR/day`

![farm](./images/saber/farm.png)
![farm](./images/saber/farm-info.png)

9. Enter the amount of LP tokens you would like to stake or hit the `Balance` link to stake the maximum possible amount.

![lp-balance](./images/saber/lp-balance.png)

10. Once the transaction gets confirmed you will be able to see your stake balance and your rewards accruing in real-time (shown as `Your unclaimed tokens`)

![stake-farm](./images/saber/stake-farm.png)

### 3. Claiming SBR Rewards
11. Once you have accumulated SBR rewards you might want to claim these rewards. Simply click on `Claim` link provided next to `Your unclaimed tokens`. 

![claim-sbr](./images/saber/claim-sbr.png)

12. After successfully claiming your tokens you will see them appearing your wallet. Your claimable token balance on SBR will again start building up from 0.

<p align="center">
    <img src={claimed} alt="SBR Rewards in Wallet" width="400"/>
</p>

### 4. Unstaking from Saber farm
At some point, if you feel the need to unstake from Saber farm and invest stSOL somewhere else, you may click the `Unstake` tab as shown below.

![unstake](./images/saber/unstake.png)

Enter the amount that you want to unstake. If you want to unstake all of it click on the link provided next to `Balance` and click on Withdraw

![unstake2](./images/saber/unstake2.png)

Once the withdraw is successful you will see that Saber LP tokens are added back to your wallet. 

:::note
Remember, that we received Saber LP tokens upon adding liquidity to the pool, which we subsequently staked in the Saber farm. These are the same LP tokens that we receive upon unstaking
:::

![slp-tx](./images/saber/slp-tx.png)

<p align="center">
    <img src={slpbalance} alt="SLP Tokens in Wallet" width="400"/>
</p>

Some wallets are unable to recognize the token name. This is not a cause for concern as you can always use the transaction hash to look at the token name in the block explorer

![slp-token](./images/saber/slp-token.png)

### 5. Withdrawing from stSOL/SOL pool
Once you unstake from the Saber farm you will again start seeing a warning on the Saber interface about having unstaked LP tokens.

![warning](./images/saber/warning.png)

To withdraw (remove liqudity) from the `stSOL-SOL pool` move to the `Position Management` section in the pool page and click on the `Withdraw` tab. 

![position-withdraw](./images/saber/position-withdraw.png)

Choose the percentage of SLP tokens you want to withdraw from the pool Now you have 3 options while withdrawing
1. Default - Exchange Saber LP tokens for preset amounts of stSOL and SOL (this can be changed by modifying the percentage slider)
2. SOL only - Exchange Saber LP tokens for SOL only
3. stSOL only - Exchange Saber LP tokens for stSOL only

These scenarios are shown in the images below

![pool-withdraw](./images/saber/pool-withdraw-1.png)
![pool-withdraw](./images/saber/pool-withdraw-2.png)
![pool-withdraw](./images/saber/pool-withdraw-3.png)

After you `Confirm the Withdrawal` you will receive stSOL back in your wallet. However, you SOL tokens will show up as wrapped SOL . It is very easy to unwrap these SOL tokens and the process incurs 0 fee. However, it can be only done in `Phantom wallet` as of now. Move to the next section if you want to know how to unwrap your wrapped SOL
![withdraw-pool](./images/saber/withdraw-pool.png)

### 6. Unwrapping Wrapped SOL
The wrapped SOL tokens show up differently in different wallets.

<p align="center">
    <img src={wsolflare} alt="Wrapped SOL" width="400"/>
</p>

<p align="center">
    <img src={wsolong} alt="Wrapped SOL" width="400"/>
</p>

![wrapped SOL Sollet](./images/saber/wsol-sollet.png)

To unwrap it, migrate to Phantom wallet and click on the Wrapped SOL token balance. Then click the 3 dots in the top-right corner and select `Unwrap all` option.

<p align="center">
    <img src={unwrap} alt="Wrapped SOL" width="400"/>
</p>
<p align="center">
    <img src={unwrap2} alt="Wrapped SOL" width="400"/>
</p>

As soon as the unwrapping finishes, your wrapped SOL account will be closed and the tokens will be credited back to your wallet as SOL.

![closeaccount](./images/saber/closeaccount.png)