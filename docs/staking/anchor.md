---
id: lido-anchor-guide
title: Lido-Anchor Guide
description: Step by step description on how to get bSOL, transfer them to Terra and borrow UST
keywords:
 - Lido
 - Anchor
 - bSOL
 - Wormhole
 - UST
sidebar_label: Lido-Anchor Guide
sidebar_position: 2
---

import convertwbsol from './images/anchor/34_anchor_wbSOL.png'

# Lido Anchor guide
This is a step-by-step guide on how to get `bSOL` by exchanging your `stSOL`, bridging over your `bSOL` to Terra blockchain and finally borrowing UST by putting up `bSOL` as a collateral.

:::info
This guide is built using Devnet but the steps are equally applicable to Mainnet!
:::


## Step-by-step Guide
### Step 1: Acquiring `bSOL`
To get `bSOL` you need `stSOL`. You get `stSOL` by staking SOL. Begin by going to the [Lido for Solana interface](https://solana.lido.fi/) and connecting your wallet.

![lido](./images/anchor/1_LidoInterface.png)
![connect-wallet](./images/anchor/2_connect_wallet.png)

Enter the amount of SOL you want to stake and hit the `Stake` button. Approve the transaction in your wallet and you will see stSOL getting credited to your account.

![stake-amount](./images/anchor/5_enter_stake_amount.png)
![stake-amount](./images/anchor/9_tx_success.png)

:::note
You can view detailed staking guides under the same section as the Lido-Anchor guide. e.g. The guide to stake SOL using [Solflare can be found here](https://docs.solana.lido.fi/staking/solflare)
:::

### Step 2: Converting `stSOL` to get `bSOL`

`stSOL` can be converted to `bSOL` by clicking on the Anchor icon at the top or by visiting [https://solana.lido.fi/anchor](https://solana.lido.fi/anchor). Once on this link connect your wallet if it is not already connected.

![Anchor-icon](./images/anchor/10_anchor.png)
![Anchor-screen](./images/anchor/11_anchor_screen.png)

Enter the amount of `stSOL` tokens you want to convert.

![amount-bsol](./images/anchor/12_amount_convert.png)

Upon clicking you will first have to approve the transaction in your wallet. You will see a popup that tells your how much `bSOL` you will receive upon confirmation

![waiting](./images/anchor/13_waiting_for_wallet.png)

Once the transaction is successful approved and processed, your wallet balance will start reflecting `bSOL` tokens
![bsol-success](./images/anchor/15_tx_success.png)

### Step 3: Bridge `bSOL` over to Terra blockchain
Now that you have `bSOL` on the Solana blockchain, it is time to bridge them over to the Terra ecosystem. The first step in that direction is to visit the [Wormhole Portal Bridge](https://portalbridge.com/#/transfer). Under `Source` select Solana as the chain and under `Target` select Terra. Click on `Connect`!

![portal](./images/anchor/16_portal.png)
![source-target](./images/anchor/17_choose_terra.png)

You will be displayed a list of Solana wallets. Select your wallet and approve the connection
![select-wallet](./images/anchor/18_select_wallet.png)

:::warning
This process of bridging your `bSOL` from Solana to Terra, requires various transactions to be approved in your respective wallets. Make sure you have enough `SOL` and `UST` or `LUNA` to pay for the gas fee.
::: 
![select-wallet](./images/anchor/19_wallet_selected.png)

Once you connect the Solana wallet, select `bSOL` as the token from `Select a token` dropdown.
![select-bSOL](./images/anchor/20_bSOL_amount.png)

Enter the amount of `bSOL` you want to send to Terra and hit `Next`
![select-bSOL](./images/anchor/22_1_bSOL_amount.png)

Now connect your Terra wallet with wormhole portal by selecting your preferred wallet.
![select-terra_wallet](./images/anchor/23_connect_terra_wallet.png)

Review the info in the next step and click on `Next`. The actual transfer starts when you hit the `Transfer` button in the next step. Note that you will need to approve the transaction in the Solana wallet first.
![solana-send](./images/anchor/25_send_bsol_to_terra.png)

Once the transfer transaction is successful on the Solana blockchain, headover to the final step where you redeem the transferred tokens on Terra blockchain. 
![29_redeem_terra](./images/anchor/29_redeem_terra.png)

After approving the transaction in your wallet you will start seeing the newly transferred `bSOL` on the [Anchor Protocol page under bAssets tab](https://app.anchorprotocol.com/basset).


### Step 4: Converting `wbSOL` to `bSOL`
When you take a look at your Terra wallet you will see that your wallet has received `wbSOL` instead of `bSOL`. This is completely alright as `wbSOL` is the wormhole wrapped asset that gets bridged over to Terra. It is very easy to convert `wbSOL` to `bSOL` on the Anchor Platform.

Head over to the bASSET tab under anchor protocol page (https://app.anchorprotocol.com/basset). You will see an info from the Anchor protocol team

![33_anchor_bassets](./images/anchor/33_anchor_bassets.png)

:::info
bAssets that have been transferred to Terra through Wormhole (webETH) must go through the convert operation to be used as collateral on Anchor.
:::

This applies to `wbSOL` as well. In order to convert click on the `wbSOL/bSOL` card

<p align="center">
    <img src={convertwbsol} alt="Convert wbSOL/bSOL" width="300"/>
</p>

You will be taken to the convert page where you can enter the amount you want to convert and receive `bSOL`
![35_convert](./images/anchor/35_convert.png)

Once your transaction is approved `bSOL` will start reflecting in your account.
![37_converted](./images/anchor/37_converted.png)

### Step 5: Borrow `UST` against `bSOL`

Now you finally have `bSOL` on the Terra blockchain and you can start borrowing UST against a collateral of `bSOL`. Head over to the borrow tab (https://app.anchorprotocol.com/borrow) in anchor protocol page and locate your token in the collateral list.
![38_bsol_collateral](./images/anchor/38_bsol_collateral.png)

Click on `Provide` collateral and enter the amount of `bSOL` you want to deposit. On the same popup screen you will also see the amount of UST that can be borrowed with this much collateral.
![39_provide_collateral](./images/anchor/39_provide_collateral.png)

At the top of the page under the `Position Management` section you will see the `Borrow` button light up! 
![40_click_borrow](./images/anchor/40_click_borrow.png)

Click on `Borrow` and enter the amount of `UST` you want to borrow out of the total `UST` available for borrowing to you!
![41-borrow](./images/anchor/41_borrow.png)

Once you approve the transaction your `Position Management` section will get updated with the borrowed value and now you are a proud owner of borrowed UST!

You have now succesfully acquired bSOL, bridged it over to Terra and used it to borrow UST!


