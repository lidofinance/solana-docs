---
title: Solong
description: Overview of user staking in LIDO for Solana with Solong
keywords:
 - staking
 - end-user
 - lido
 - solana
 - solong
sidebar_label: Solong
sidebar_position: 5
---


# How to Stake Solana on Lido
A quick guide on staking your Solana on the Lido widget

## Introduction
‘Lido for Solana’ is a Lido-DAO governed liquid staking protocol for the Solana blockchain. Anyone who stakes their SOL tokens with Lido will be issued an on-chain representation of SOL staking position with Lido validators, called stSOL. This will allow Solana token holders to get liquidity on their staked assets which can then be traded, or further utilized as collateral in DeFi products.

![Widget](./images/common/widget.png)

## Lido for Solana staking guide

In this step-by-step guide, we will learn how to stake your Solana via the Lido staking widget. This guide shows the testnet for demonstration purposes. However, the process remains the same for mainnet. You can use one of the following wallets to connect to Lido. The facility to use the hardware wallet Ledger is also provided. This guarantees an extra layer of security for the user.
1. Sollet
2. Phantom
3. Solflare
4. Solong
5. Ledger

---

## Step 1: Create or Restore Solong Wallet
Navigate to https://solongwallet.com/ to create/restore your solana wallet. You will need to install the [browser extension](https://chrome.google.com/webstore/detail/solong/memijejgibaodndkimcclfapfladdchj) offered by Solong to use this wallet.

![Browser Extension](./images/solong/extension.png)

### Creating the wallet
If you do not have a wallet you yet, you should
1. Create a new wallet,
2. Note down your 12 word mnemonic, and
3. your password, and
store these in a safe place. Follow the onscreen instructions and make sure to fund your wallet with some SOL tokens before interacting with Lido.

> Note: Solong asks you to enter a password before creating or restoring a wallet.

![Create 3](./images/solong/create3.png)
![Create 1](./images/solong/create1.png)
![Create 2](./images/solong/create2.png)



### Restoring the wallet
If you already have a wallet, you can restore it through the Solong extension using the mnemonic. Follow the online instructions to restore your SOL account.
![Create 3](./images/solong/create3.png)
![Restore 1](./images/solong/restore1.png)
![Restore 2](./images/solong/restore2.png)
![Restore 3](./images/solong/restore3.png)

### Logged In
Once you have funded your Solong wallet with Solana tokens, you can log in to the extension to see your account details.

![Logged In](./images/solong/logged_in.png)

## Step 2: Connect Lido to Solong

Once your wallet is setup visit https://solana.lido.fi to stake your SOL tokens. Now connect your Solong account to the Lido interface.

![Connect](./images/common/connect.png)

Pressing the connect wallet button, on the top right hand corner of the screen, pops up the wallet screen.

![Wallet List](./images/solong/wallet_list.png)

Selecting your wallet and pressing the connect button takes you to another window with the wallet’s browser extension. On this window you will have to **approve the connection**. Make sure to verify the details listed on the approval screen by Solong.

![Approve Connection](./images/solong/approve_connection.png)

If you have set a password to open the wallet, you might get prompted to unlock your wallet. You will, then, have to allow Lido to connect to your wallet and fetch its balance. Once connected you would be able to see your balance on the Lido widget.

![Connected Widget](./images/solong/connected_widget.png)

Before you interact with the widget further it is important to explore the widget and understand its functionality.

## Step 3: Explore the interface
At the top you can see your account’s information — your current stSOL balance and the number of SOL tokens available for staking. For new account holders, the staked amount (stSOL) will be 0 in the beginning. You can also see the returns you will get by staking with Lido under Lido APR. Below that you can enter the number of SOL you want to stake.

![Interface](./images/common/interface.png)


### Account info
You can go to the top-right corner of the screen and click on your connected account. This lets you take a look at your address and disconnect at any point during the process.
The address for the demo account is
> `2HQHi4Lq9D9FHFFRBb7bSrvnyMPpPmvW5uC1b9N5K4Bg`

Its transaction history can be viewed on the blockexplorer [here](https://explorer.solana.com/address/2HQHi4Lq9D9FHFFRBb7bSrvnyMPpPmvW5uC1b9N5K4Bg?cluster=testnet).


![Connect Dialog](./images/solong/connect_dialog.png)
![Connected Dialog 2](./images/solong/connect_dialog_2.png)

### Transaction Parameters
When you enter the amount of SOL you want to stake, the values below the submit button change automatically. These values give you specific information about the transaction you are about to perform. It tells you the
- Exchange rate of SOL v/s stSOL at the moment
- Amount of stSOL you will receive
- Transaction cost
- Fee that will be deducted for this transaction


![Transaction Parameters](./images/solong/tx_params.png)

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

![Staking](./images/solong/staking.png)

You get additional information about the transaction details while approving the transaction. Go ahead and approve the transaction.

![Approve](./images/solong/approve.png)

After verifying the information you can approve now.

## Step 5: View the transaction on Blockexplorer
Once you hit approve on your wallet, you can come back to the lido widget and click on **View on Solana Blockexplorer.**

![View Transactions](./images/common/view_tx.png)

This is useful as it tells you the [current status](https://explorer.solana.com/tx/czfRH3ZZbvuU6BEBizVV2CmSgg4JQ4bR1zwz4T4H9xu8fvMPWiREmDgMDm4bgCHkjSq56Jy1FXiTe1kydoojsyc?cluster=testnet) of your transaction.

> Link for the above transaction - https://explorer.solana.com/tx/czfRH3ZZbvuU6BEBizVV2CmSgg4JQ4bR1zwz4T4H9xu8fvMPWiREmDgMDm4bgCHkjSq56Jy1FXiTe1kydoojsyc?cluster=testnet

If you look at the Confirmations field you can slowly see it increasing from 0 to 32. Once it reaches the MAX number of confirmations your transaction gets added to the blockchain

![Confirmations 1](./images/solong/confirmations1.png)
![Confirmations 2](./images/solong/confirmations2.png)
![COnfirmations 3](./images/solong/confirmations3.png)

Finally, after 32 confirmations the transaction gets confirmed. The lido widget will reflect the new balance

![Confirmations 4](./images/solong/confirmations4.png)

You can now go back to the Lido widget and look at your updated stSOL balance. Just below the stSOL balance, you will also be able to see the amount of SOL you can get back for it a.k.a the exchange rate.

![Update](./images/solong/update.png)

![Updated](./images/solong/updated.png)

> Note 1: We had 2 SOL in the beginning and we staked 1 SOL. We should be left with 1 SOL but we had to pay an additional 0.0021 SOL as the rent for the new stSOL account that got created for us.

> Note 2: This rent is a one-time fee that won’t reccur on the next staking transaction.

## Withdrawing Solana
Withdrawals are not enabled yet. They will be live within the coming months. If you click on the **Unstake** tab you will see an error message pop up.

![Unstake](./images/common/unstake.png)

## Resources
[Introducing Lido for Solana](https://medium.com/chorus-one/introducing-lido-for-solana-8aa02db8503) - Explaining the SOL liquid staking solution by Chorus One




