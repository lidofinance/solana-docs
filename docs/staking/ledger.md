---
title: Ledger
description: Overview of user staking in LIDO for Solana with Ledger
keywords:
 - staking
 - end-user
 - lido
 - solana
 - ledger
sidebar_label: Ledger
sidebar_position: 4
---

import viewtx from './images/common/view_tx.png';
import updated from './images/ledger/updated.png';
import unstake from './images/common/unstake.png';

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
## Step 1: Using Solana App on Ledger
To setup your ledger please head over to [Solana documentation site](https://docs.solana.com/wallet-guide/ledger-live) and follow the instructions written in the following sections.
1. Getting Started
2. Install the Solana App on your Nano

Additional instructions can also be found on the [Ledger site](https://support.ledger.com/hc/en-us/articles/360016265659-Solana-SOL-)

### Setting up
Make sure to note down the seed phrase for your address and store it in a safe place. Additionally, fund your Solana address with some SOL tokens before interacting with Lido

When your app is ready you'll see something like this on the Ledger screen.
![Ready](./images/ledger/ready.jpg)


## Step 2: Connect Ledger to Lido

Once the Ledger is setup visit https://solana.lido.fi to stake your SOL tokens. Now connect your Ledger device to your machine and press the connect button in the top-right corner of the Lido interface.

![Connect](./images/common/connect.png)

Pressing the connect wallet button, on the top right hand corner of the screen, pops up the wallet screen.

![Wallet List](./images/ledger/wallet_list.png)

Selecting Ledger and pressing the connect button pops up a dialog box for you to **approve the connection**. Make sure to verify the details (if any) listed on the approval dialog box by Ledger.

![Approve 1](./images/ledger/approve1.png)
![Approve 2](./images/ledger/approve2.png)

Once connected you would be able to see your balance on the Lido widget. Before you interact with the widget further it is important to explore the widget and understand its functionality.

## Step 2: Explore the interface
At the top you can see your account’s information — your current stSOL balance and the number of SOL tokens available for staking. For new account holders, the staked amount (stSOL) will be 0 in the beginning. You can also see the returns you will get by staking with Lido under Lido APR. Below that you can enter the number of SOL you want to stake.

![Interface](./images/common/interface.png)

### Account info
You can go to the top-right corner of the screen and click on your connected account. This lets you take a look at your address and disconnect at any point during the process.

To view the transaction history of your address on Solana's blockexplorer you can add your address to the end of the following URL
> https://solana.fm/address/**your-address-goes-here**

![Account Info](./images/ledger/account_info_bl.png)
![Connect Dialog](./images/ledger/connect_dialog.png)

### Transaction Parameters
When you enter the amount of SOL you want to stake, the values below the submit button change automatically. These values give you specific information about the transaction you are about to perform. It tells you the
- Exchange rate of SOL v/s stSOL at the moment
- Amount of stSOL you will receive
- Transaction cost
- Fee that will be deducted for this transaction

![Transaction Params](./images/ledger/tx_params.png)

### Lido Statistics
Just below the transaction parameters you also see global Lido statistics. This gives you a clear idea of how much SOL is being staked worldwide and other information regarding the liquid staking ecosystem.

![Lido Params](./images/common/lido_params.png)

### FAQs
You can see the FAQ section right below the Lido statistics. It is prudent to familiarize yourself with some of the basic features of liquid staking and the risks involved. The FAQ section also gives more information about the stSOL and its value. In case, you have even more questions you can always reach out to the Lido team or Chorus One for any clarifications. The contact information is given at the end of this article.

![Faqs](./images/common/faqs.png)


## Step 3: Stake your SOL

![Stake](./images/common/stake.png)

To stake your SOL with lido enter the amount you wanter to stake. On the lido widget will see a pop-up showing the state of your transaction. The Lido widget waits for you to approve this transaction through your Ledger device.

>Note **This transaction will only go through if you go back to Ledger and approve it.**

![Staking](./images/ledger/staking.png)

You get additional information about the transaction details while approving the transaction. Go ahead and approve the transaction.

![Approve Transaction](./images/ledger/approve_tx.jpg)

After verifying the information you can approve now.

## Step 4: View the transaction on Blockexplorer
Once you hit approve on your wallet, you can come back to the lido widget and click on **View on Solana Blockexplorer.**

<p align="center">
    <img src={viewtx} alt="View Tx" width="500"/>
</p>


This is useful as it tells you the current status of your transaction. In the block explorer, if you look at the ```Confirmations``` field you can slowly see it increasing from 0 to 32. Once it reaches the MAX number of confirmations your transaction gets added to the blockchain

**Finally after 32 confirmations, our transaction gets confirmed**

You can now go back to the Lido widget and look at your updated stSOL balance. Just below the stSOL balance, you will also be able to see the amount of SOL you can get back for it a.k.a the exchange rate.

![Update](./images/ledger/update.png)

Zooming into the widget we can observe the new SOL balance and the updated stSOL balance

> Note 1: We had 2 SOL in the beginning and we staked 1 SOL. We should be left with 1 SOL but we had to pay an additional 0.0021 SOL as the rent for the new stSOL account that got created for us.

> Note 2: This rent is a one-time fee that won’t reccur on the next staking transaction.


<p align="center">
    <img src={updated} alt="Updated Balance" width="450"/>
</p>


## Withdrawing Solana
To withdraw click on the **Unstake** tab and enter the amount of stSOL that you would like to unstake in the field provided below.

![unstake-amount](./images/common/unstake-amount.png)

Then click unstake and head over to your wallet to approve the transaction.

![unstake-transaction](./images/common/unstake-transaction.png)

The Solana blockchain waits for 32 confirmations (called MAX Confirmations) before making a transaction 'final'. Once the transaction gets the `MAX Confirmations` the Lido program splits off a stake account with the redeemed SOL amount and transfers it to you. 

![unstake-successful](./images/common/unstake-successful.png)

You then unstake those SOL and will receive liquid SOL after the deactivation period which lasts for approximately 2 epochs. For users that desire instant liquidity, the preferred option is to exchange stSOL on the open market, e.g. on the supported AMM pools on Saber and Raydium.

## Resources
[Introducing Lido for Solana](https://medium.com/chorus-one/introducing-lido-for-solana-8aa02db8503) - Explaining the SOL liquid staking solution by Chorus One



