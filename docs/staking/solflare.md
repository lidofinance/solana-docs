---
title: Solflare
description: Overview of user staking in LIDO for Solana with Solflare
keywords:
 - staking
 - end-user
 - lido
 - solana
 - solflare
sidebar_label: Solflare
sidebar_position: 3
---

import wallets from './images/solflare/wallet_list.png';
import connect from './images/solflare/connect_dialog_2.png';
import viewtx from './images/common/view_tx.png';
import unstake from './images/common/unstake.png';
import stakingtab from './images/solflare/stakingtab.png';


# How to Stake Solana on Lido
A quick guide on staking your Solana on the Lido widget

## Introduction
‘Lido for Solana’ is a Lido-DAO governed liquid staking protocol for the Solana blockchain. Anyone who stakes their SOL tokens with Lido will be issued an on-chain representation of SOL staking position with Lido validators, called stSOL. This will allow Solana token holders to get liquidity on their staked assets which can then be traded, or further utilized as collateral in DeFi products.

![Widget](./images/common/widget.png)

## Lido for Solana staking guide

In this step-by-step guide, we will learn how to stake your Solana via the Lido staking widget. This guide shows the testnet for demonstration purposes. However, the process remains the same for mainnet. You can use one of the following wallets to connect to Lido. The facility to use the hardware wallet Ledger is also provided. This guarantees an extra layer of security for the user.
1. Phantom
2. Solflare
3. Ledger
4. Sollet
5. Solong

---

## Step 1: Create or Restore Solflare Wallet
Navigate to https://solflare.com/ to create/restore your solana wallet.

![Solflare](./images/solflare/solflaredotcom.png)

### Creating the wallet
If you do not have a wallet you yet, you should
1. Create a new wallet,
2. Note down your password, and
3. Download the kyestore file, and
store these in a safe place. Follow the onscreen instructions and make sure to fund your wallet with some SOL tokens before interacting with Lido


![Create 1](./images/solflare/create1.png)
![Create 2](./images/solflare/create2.png)
![Create 3](./images/solflare/create3.png)
![Create 4](./images/solflare/create4.png)
![Create 5](./images/solflare/create5_alt.png)

### Restoring the wallet
If you already have a wallet, you can restore it on solflare using the associated password and keystore file. Follow the online instructions to restore your SOL account.

![Restore 1](./images/solflare/restore1.png)
![Restore 2](./images/solflare/restore2.png)

### Logged In
Once you have funded your Solflare wallet with Solana, you can log in to solflare webapp to see your account details.

![Logged In](./images/solflare/logged_in.png)

## Step 2: Connect Lido to Solflare

Once your wallet is setup visit https://solana.lido.fi to stake your SOL tokens. Now connect your Solflare account to the Lido interface.

![Connect](./images/common/connect.png)

Pressing the connect wallet button, on the top right hand corner of the screen, pops up the wallet screen.

<p align="center">
    <img src={wallets} alt="Wallets" width="350"/>
</p>

Selecting your wallet and pressing the connect button takes you to another window with the wallet’s browser extension. On this window you will have to **approve the connection**. Make sure to verify the details listed on the approval screen by Solflare.

![Approve Connection](./images/solflare/approve_connection.png)

If you have set a password to open the wallet, you might get prompted to unlock your wallet. You will, then, have to allow Lido to connect to your wallet and fetch its balance. Once connected you would be able to see your balance on the Lido widget.

![Connected Widget](./images/solflare/connected_widget.png)

Before you interact with the widget further it is important to explore the widget and understand its functionality.

## Step 3: Explore the interface
At the top you can see your account’s information — your current stSOL balance and the number of SOL tokens available for staking. For new account holders, the staked amount (stSOL) will be 0 in the beginning. You can also see the returns you will get by staking with Lido under Lido APR. Below that you can enter the number of SOL you want to stake.

![Interface](./images/common/interface.png)

### Account info
You can go to the top-right corner of the screen and click on your connected account. This lets you take a look at your address and disconnect at any point during the process.
The address for the demo account is
> `GMXFs1SpNhwVW7m9sHTZks5oEEtAVqmySX2zkJ5ffUT`

Its transaction history can be viewed on the blockexplorer [here](https://solana.fm/address/GMXFs1SpNhwVW7m9sHTZks5oEEtAVqmySX2zkJ5ffUT?cluster=testnet-qn1).

![Transaction Parameters](./images/solflare/account_info.png)

<p align="center">
    <img src={connect} alt="Connect Dialog" width="350"/>
</p>

### Transaction Parameters
When you enter the amount of SOL you want to stake, the values below the submit button change automatically. These values give you specific information about the transaction you are about to perform. It tells you the
- Exchange rate of SOL v/s stSOL at the moment
- Amount of stSOL you will receive
- Transaction cost
- Fee that will be deducted for this transaction

![Transaction Parameters](./images/solflare/tx_params.png)

### Lido Statistics
Just below the transaction parameters you also see global Lido statistics. This gives you a clear idea of how much SOL is being staked worldwide and other information regarding the liquid staking ecosystem.

![Lido Parameters](./images/common/lido_params.png)

### FAQs
You can see the FAQ section right below the Lido statistics. It is prudent to familiarize yourself with some of the basic features of liquid staking and the risks involved. The FAQ section also gives more information about the stSOL and its value. In case, you have even more questions you can always reach out to the Lido team or Chorus One for any clarifications. The contact information is given at the end of this article.

![Faqs](./images/common/faqs.png)

## Step 4: Stake your SOL

![Stake](./images/common/stake.png)

To stake your SOL with lido enter the amount you wanter to stake. Once you submit you might get redirected to your wallet. On the lido widget will see a pop-up showing the state of your transaction. The Lido widget waits for you to approve this transaction through your wallet.

>Note **This transaction will only go through if you go back to your wallet and approve it.**

![Staking](./images/solflare/staking.png)

You get additional information about the transaction details while approving the transaction. Go ahead and approve the transaction.

![Approve 1](./images/solflare/approve1.png)

After verifying the information you can approve now.

![Approve 2](./images/solflare/approve2.png)

## Step 5: View the transaction on Blockexplorer

Once you hit approve on your wallet, you can come back to the lido widget and click on **View on Solana Blockexplorer.**

<p align="center">
    <img src={viewtx} alt="View Tx" width="500"/>
</p>


This is useful as it tells you the [current status](https://solana.fm/tx/3sLpWNJrhY7nUWKuLJx6nTGjxaJNUGTYVsFT8Uh9UNa5nQ2rRMZZcnb66ELEMSME5cmUycP4V4CUoBSvhAjLiwdw?cluster=testnet-qn1) of your transaction.

> Link for the above transaction - https://solana.fm/tx/3sLpWNJrhY7nUWKuLJx6nTGjxaJNUGTYVsFT8Uh9UNa5nQ2rRMZZcnb66ELEMSME5cmUycP4V4CUoBSvhAjLiwdw?cluster=testnet-qn1

If you look at the Confirmations field you can slowly see it increasing from 0 to 32. Once it reaches the MAX number of confirmations your transaction gets added to the blockchain

![Confirmation 1](./images/solflare/confirmations1.png)
![Confirmation 2](./images/solflare/confirmations2.png)
![Confirmation 3](./images/solflare/confirmations3.png)

Finally, after 32 confirmations the transaction gets confirmed. The lido widget will reflect the new balance

![Confirmation 4](./images/solflare/confirmations4.png)

You can now go back to the Lido widget and look at your updated stSOL balance. Just below the stSOL balance, you will also be able to see the amount of SOL you can get back for it a.k.a the exchange rate.

![Update](./images/solflare/update.png)
![Updated](./images/solflare/updated.png)

> Note 1: We had 2 SOL in the beginning and we staked 1 SOL. We should be left with 1 SOL but we had to pay an additional 0.0021 SOL as the rent for the new stSOL account that got created for us.

> Note 2: This rent is a one-time fee that won’t reccur on the next staking transaction.

## Step 6: Unstaking and utlizing stSOL
To withdraw click on the **Unstake** tab and enter the amount of stSOL that you would like to unstake in the field provided below.

![unstake-amount](./images/common/unstake-amount.png)

Then click unstake and head over to your wallet to approve the transaction.
:::note
Make sure to note down the transaction hash or the link provided on the screen. This allows for an easier debugging in case of a failed transaction.
:::

![unstake-transaction](./images/common/unstake-transaction.png)

The Solana blockchain waits for 32 confirmations (called MAX Confirmations) before making a transaction 'final'. Once the transaction gets the `MAX Confirmations` the Lido program splits off a stake account with the redeemed SOL amount and transfers it to you. 

:::note
Make sure to note down the stake account address by clicking on the blockexplorer link provided on the screen.
:::

![unstake-successful](./images/common/unstake-successful.png)


After unstaking go back to your wallet and click on the `Staking` tab in the solflare wallet.

![stakingtab](./images/solflare/stakingtab.png)

You will see a number of deactivating stake accounts. `Click to expand` the staking account details.

:::note
Note that the option to view deactivating stake accounts is visible only in Phantom and Solflare wallets. On Sollet or Solong you will not be able to see these stake accounts. This is not a cause for concern as you can always migrate from Sollet/Solong to either Phantom or Solflare for free
:::

![stake-accounts](./images/solflare/stakeaccounts.png)

You will then see your deactivating stake account where you can keep a track of your deactivating stake. If you issue the unstake instruction when epoch `N` is going on, the deactivation will start immediately and your stake will completely deactivate at epoch `N+1`.

For example, for the stake account shown in the example above the `Unstake` was done at epoch `225`, the stake started deactivating within the same epoch and the SOL became available for withdrawing at epoch `226`

![epochN+2](./images/common/epochNplus2.png)

After your stake gets completely deactivated, you will see that a `Withdraw` button appears below your stake account. 

![Withdraw-Button](./images/solflare/withdraw-button.png)

You can withdraw your SOL by clicking on `Withdraw`. The SOL tokens should immediately reflect in your account. This complete process from first `unstaking` to finally `withdrawing` your stakes takes between 3-5 days to complete. For users who desire instant liquidity, the preferred option is to exchange stSOL on the open market, e.g. on the supported AMM pools on Saber and Raydium.

### Utilizing and exchanging stSOL
The following AMM pools and markets exist for exchanging stSOL or adding liquidity to pools.

| Provider | Type | Link |
| :--- | :--- | :--- |
| Saber | Swap stSOL for SOL | https://app.saber.so/#/swap |
| Saber | Add Liquidity to Pool | https://app.saber.so/#/pools/stsol/deposit |
| Saber | Farming | https://app.saber.so/#/quarries/stsol/stake |
| Raydium | Swap stSOL for USDC | [Raydium Pool](https://raydium.io/swap/?ammId=6a1CsrpeZubDjEJE9s1CMVheB6HWM5d7m1cj2jkhyXhj) |


## Resources
[Introducing Lido for Solana](https://medium.com/chorus-one/introducing-lido-for-solana-8aa02db8503) - Explaining the SOL liquid staking solution by Chorus One




