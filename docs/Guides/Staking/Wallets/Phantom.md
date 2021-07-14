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


------------
## Step 1: Create or Restore Phantom Wallet
Navigate to https://phantom.app/ to create/restore your solana wallet. 
### Creating the wallet
If you do not have a wallet you yet, you should create a new wallet and note down the seed phrase and store it in a safe place. Follow the onscreen instructions and make sure to fund your wallet with some SOL tokens before interacting with Lido

![Create](./images/phantom/create_wallet.png)
![Create](./images/phantom/create_wallet2.png)

### Restoring the wallet
If you already have a wallet, you can restore it on Phantom using the associated seed phrase. Follow the online instructions to restore your SOL account. 

![Restore](./images/phantom/restore.png)
![Restore](./images/phantom/restore2.png)

### Logged In
Once you have funded your Phantom wallet with Solana, you can click on the Phantom extension to see your account details.
<img src="./images/phantom/logged_in.png" alt="logged_in" width="350">

## Step 2: Connect Lido to Phantom

Once your wallet is setup visit https://solana.lido.fi to stake your SOL tokens. Now connect your Phantom account to the Lido interface. 

<img src="./images/common/connect.png" alt="connect" width="1000"/>

Pressing the connect wallet button, on the top right hand corner of the screen, pops up the wallet screen.

<img src="./images/phantom/connect.png" alt="wallet_list" width="350"/>

Selecting your wallet and pressing the connect button takes you to another window with the wallet’s browser extension. On this window you will have to **approve the connection**. Make sure to verify the details listed on the approval screen by Phantom.
![Approve-connection](./images/phantom/approve_connection.png)

If you have set a password to open the wallet, you might get prompted to unlock your wallet. You will, then, have to allow Lido to connect to your wallet and fetch its balance. Once connected you would be able to see your balance on the Lido widget.

![Connected](./images/phantom/connected.png)

Before you interact with the widget further it is important to explore the widget and understand its functionality.

## Step 2: Explore the interface
At the top you can see your account’s information — your current stSOL balance and the number of SOL tokens available for staking. For new account holders, the staked amount (stSOL) will be 0 in the beginning. You can also see the returns you will get by staking with Lido under Lido APR. Below that you can enter the number of SOL you want to stake.

![Interface](./images/common/interface.png)

### Account info
You can go to the top-right corner of the screen and click on your connected account. This lets you take a look at your address and disconnect at any point during the process. 
The address for the demo account is 
> Address - `yBfu1AzbyRcfoJRU5TcUf59QwntqoFeDDTF9efh6XjL` 

> Blockexplorer URL - https://explorer.solana.com/address/yBfu1AzbyRcfoJRU5TcUf59QwntqoFeDDTF9efh6XjL?cluster=testnet

Its transaction history can be viewed on the blockexplorer [here](https://explorer.solana.com/address/yBfu1AzbyRcfoJRU5TcUf59QwntqoFeDDTF9efh6XjL?cluster=testnet).

![Account](./images/phantom/account_info.png)

<img src="./images/phantom/connect_dialog.png" alt="connect_dialog" width="500"/>

### Transaction Parameters
When you enter the amount of SOL you want to stake, the values below the submit button change automatically. These values give you specific information about the transaction you are about to perform. It tells you the 
- Exchange rate of SOL v/s stSOL at the moment
- Amount of stSOL you will receive
- Transaction cost
- Fee that will be deducted for this transaction

![Transaction](./images/phantom/tx_params.png)

### Lido Statistics
Just below the transaction parameters you also see global Lido statistics. This gives you a clear idea of how much SOL is being staked worldwide and other information regarding the liquid staking ecosystem.

![Lido](./images/phantom/lido_params.png)

### FAQs
You can see the FAQ section right below the Lido statistics. It is prudent to familiarize yourself with some of the basic features of liquid staking and the risks involved. The FAQ section also gives more information about the stSOL and its value. In case, you have even more questions you can always reach out to the Lido team or Chorus One for any clarifications. The contact information is given at the end of this article.

![FAQ](./images/common/faqs.png)

## Step 3: Stake your SOL
<img src="./images/common/stake.png" alt="stake" width="750"/>

To stake your SOL with lido enter the amount you wanter to stake. Once you submit you might get redirected to your wallet. On the lido widget will see a pop-up showing the state of your transaction. The Lido widget waits for you to approve this transaction through your wallet. 

>Note **This transaction will only go through if you go back to your wallet and approve it.**

<img src="./images/phantom/staking.png" alt="staking" width="850"/>

You get additional information about the transaction details while approving the transaction. Go ahead and approve the transaction.

<img src="./images/phantom/approve.png" alt="approve" width="850"/>

After verifying the information you can approve now.

## Step 4: View the transaction on Blockexplorer
Once you hit approve on your wallet, you can come back to the lido widget and click on **View on Solana Blockexplorer.**


<img src="./images/common/view_tx.png" alt="view_tx" width="500"/>

This is useful as it tells you the [current status](https://explorer.solana.com/tx/3jDcSYVRVUEyNfTVZ6T6WaddAKq24wyp5PapndbrzUQj2xbk3LAuSaTp4B2UAfseobQsTNaBsWaW5hzEqPwkyQKB?cluster=testnet) of your transaction. 

> Link for the above transaction - https://explorer.solana.com/tx/3jDcSYVRVUEyNfTVZ6T6WaddAKq24wyp5PapndbrzUQj2xbk3LAuSaTp4B2UAfseobQsTNaBsWaW5hzEqPwkyQKB?cluster=testnet
If you look at the Confirmations field you can slowly see it increasing from 0 to 32. Once it reaches the MAX number of confirmations your transaction gets added to the blockchain


![Conf1](./images/phantom/confirmations1.png)
![Conf2](./images/phantom/confirmations2.png)
![Conf3](./images/phantom/confirmations3.png)

**Finally after 32 confirmations, our transaction gets confirmed**

![Conf3](./images/phantom/confirmations4.png)

You can now go back to the Lido widget and look at your updated stSOL balance. Just below the stSOL balance, you will also be able to see the amount of SOL you can get back for it a.k.a the exchange rate.

![Update](./images/phantom/update.png)

Zooming into the widget we can observe the new SOL balance and the updated stSOL balance

> Note 1: We had 2 SOL in the beginning and we staked 1 SOL. We should be left with 1 SOL but we had to pay an additional 0.0021 SOL as the rent for the new stSOL account that got created for us. 

> Note 2: This rent is a one-time fee that won’t reccur on the next staking transaction.

<img src="./images/phantom/updated.png" alt="updated" width="450"/>

## Withdrawing Solana
Withdrawals are not enabled yet. They will be live within the coming months. If you click on the **Unstake** tab you will see an error message pop up.
![Unstake](./images/common/unstake.png)

## Resources
[Introducing Lido for Solana](https://medium.com/chorus-one/introducing-lido-for-solana-8aa02db8503) - Explaining the SOL liquid staking solution by Chorus One



