---
title: Phantom
description: Overview of user staking in LIDO for Solana with Phantom
keywords:
 - staking
 - end-user
 - lido
 - solana
 - phantom
sidebar_label: Phantom
sidebar_position: 2
---

import loggedin from './images/phantom/logged_in.png';
import wallets from './images/phantom/connect.png';
import connect from './images/phantom/connect_dialog.png';
import updated from './images/phantom/updated.png';
import viewtx from './images/common/view_tx.png';
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

## Step 1: Create or Restore Phantom Wallet
Navigate to https://phantom.app/ to create/restore your solana wallet.
### Creating the wallet
If you do not have a wallet you yet, you should create a new wallet and note down the seed phrase and store it in a safe place. Follow the onscreen instructions and make sure to fund your wallet with some SOL tokens before interacting with Lido

![Create Wallet](./images/phantom/create_wallet.png)
![Wallet](./images/phantom/create_wallet2.png)

### Restoring the wallet
If you already have a wallet, you can restore it on Phantom using the associated seed phrase. Follow the online instructions to restore your SOL account.

![Restore](./images/phantom/restore.png)
![Restore 2](./images/phantom/restore2.png)


### Logged In
Once you have funded your Phantom wallet with Solana, you can click on the Phantom extension to see your account details.

<p align="center">
    <img src={loggedin} alt="logged_in" width="300"/>
</p>

## Step 2: Connect Lido to Phantom

Once your wallet is setup visit https://solana.lido.fi to stake your SOL tokens. Now connect your Phantom account to the Lido interface.

![Connect](./images/common/connect.png)

Pressing the connect wallet button, on the top right hand corner of the screen, pops up the wallet screen.

<p align="center">
    <img src={wallets} alt="Wallets" width="350"/>
</p>

Selecting your wallet and pressing the connect button takes you to another window with the wallet’s browser extension. On this window you will have to **approve the connection**. Make sure to verify the details listed on the approval screen by Phantom.

![Approve Connection](./images/phantom/approve_connection.png)

If you have set a password to open the wallet, you might get prompted to unlock your wallet. You will, then, have to allow Lido to connect to your wallet and fetch its balance. Once connected you would be able to see your balance on the Lido widget.

![Connected](./images/phantom/connected.png)

Before you interact with the widget further it is important to explore the widget and understand its functionality.

## Step 3: Explore the interface
At the top you can see your account’s information — your current stSOL balance and the number of SOL tokens available for staking. For new account holders, the staked amount (stSOL) will be 0 in the beginning. You can also see the returns you will get by staking with Lido under Lido APR. Below that you can enter the number of SOL you want to stake.

![Interface](./images/common/interface.png)

### Account info
You can go to the top-right corner of the screen and click on your connected account. This lets you take a look at your address and disconnect at any point during the process.
The address for the demo account is
> Address - `yBfu1AzbyRcfoJRU5TcUf59QwntqoFeDDTF9efh6XjL`

> Blockexplorer URL - https://explorer.solana.com/address/yBfu1AzbyRcfoJRU5TcUf59QwntqoFeDDTF9efh6XjL?cluster=testnet

Its transaction history can be viewed on the blockexplorer [here](https://explorer.solana.com/address/yBfu1AzbyRcfoJRU5TcUf59QwntqoFeDDTF9efh6XjL?cluster=testnet).

![Account Info](./images/phantom/account_info.png)

<p align="center">
    <img src={connect} alt="Connect Dialog" width="350"/>
</p>

### Transaction Parameters
When you enter the amount of SOL you want to stake, the values below the submit button change automatically. These values give you specific information about the transaction you are about to perform. It tells you the
- Exchange rate of SOL v/s stSOL at the moment
- Amount of stSOL you will receive
- Transaction cost
- Fee that will be deducted for this transaction

![Transaction Params](./images/phantom/tx_params.png)

### Lido Statistics
Just below the transaction parameters you also see global Lido statistics. This gives you a clear idea of how much SOL is being staked worldwide and other information regarding the liquid staking ecosystem.

![Lido Params](./images/phantom/lido_params.png)

### FAQs
You can see the FAQ section right below the Lido statistics. It is prudent to familiarize yourself with some of the basic features of liquid staking and the risks involved. The FAQ section also gives more information about the stSOL and its value. In case, you have even more questions you can always reach out to the Lido team or Chorus One for any clarifications. The contact information is given at the end of this article.

![Faqs](./images/common/faqs.png)


## Step 4: Stake your SOL

![Stake](./images/common/stake.png)

To stake your SOL with lido enter the amount you wanter to stake. Once you submit you might get redirected to your wallet. On the lido widget will see a pop-up showing the state of your transaction. The Lido widget waits for you to approve this transaction through your wallet.

>Note **This transaction will only go through if you go back to your wallet and approve it.**

![Staking](./images/phantom/staking.png)

You get additional information about the transaction details while approving the transaction. Go ahead and approve the transaction.

![Approve](./images/phantom/approve.png)

After verifying the information you can approve now.

## Step 5: View the transaction on Blockexplorer
Once you hit approve on your wallet, you can come back to the lido widget and click on **View on Solana Blockexplorer.**

<p align="center">
    <img src={viewtx} alt="View Tx" width="500"/>
</p>


This is useful as it tells you the [current status](https://explorer.solana.com/tx/3jDcSYVRVUEyNfTVZ6T6WaddAKq24wyp5PapndbrzUQj2xbk3LAuSaTp4B2UAfseobQsTNaBsWaW5hzEqPwkyQKB?cluster=testnet) of your transaction.

> Link for the above transaction - https://explorer.solana.com/tx/3jDcSYVRVUEyNfTVZ6T6WaddAKq24wyp5PapndbrzUQj2xbk3LAuSaTp4B2UAfseobQsTNaBsWaW5hzEqPwkyQKB?cluster=testnet

If you look at the Confirmations field you can slowly see it increasing from 0 to 32. Once it reaches the MAX number of confirmations your transaction gets added to the blockchain

![Confirmations 1](./images/phantom/confirmations1.png)
![Confirmations 2](./images/phantom/confirmations2.png)
![Confirmations 3](./images/phantom/confirmations3.png)

**Finally after 32 confirmations, our transaction gets confirmed**

![Confirmations 4](./images/phantom/confirmations4.png)

You can now go back to the Lido widget and look at your updated stSOL balance. Just below the stSOL balance, you will also be able to see the amount of SOL you can get back for it a.k.a the exchange rate.

![Update](./images/phantom/update.png)

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



