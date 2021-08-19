# Validator onboarding

This page is aimed at validators who want to join Lido for Solana.

:::note Note for validators
If you have already been admitted by the LNOSG, please continue to [Setting up a
vote account](#setting-up-a-vote-account) below.
:::

## Validator admission

The set of validators who participate in Lido for Solana (“Solido”) is managed
by the [**Lido Node Operator Subgovernance Group (LNOSG)**][lnosg], which is
part of the Lido DAO. The [Lido Node Operators Notion page][notion] contains
further information about the current operators, and how to apply.

After approval from the LNOSG, the steps to onboard a validator to Solido are:

 1. **The validator** sets up a new identity account and vote account for use
    with Solido.
 2. **A multisig owner** creates a multisig transaction to propose adding the
    vote account to the validator set.
 3. **The other multisig owners** approve this transaction and execute it. At
    this point, admission of the validator should already have been approved by
    the LNOSG; the multisig owners merely ratify and execute the decision, they
    do not make an independent decision about which validators to admit.
 4. Once the validator is part of the Solido validator set, the Solido
    [maintenance daemon][maintenance] will automatically rebalance the stake
    and delegate to the new validator. In version 1, only new deposits can be
    staked with new validators; we plan to add active rebalancing in a later
    version.
 5. [**Some validators**][maintainers] are expected to operate an instance of
    the [maintenance daemon][maintenance].

The remainder of this page goes over step 1 in detail. For steps 2 and 3,
see [the multisig guide](operation/multisig-guide.md) instead.

[lnosg]:  https://research.lido.fi/t/validator-admission-process/20
[notion]: https://enchanted-direction-844.notion.site/Lido-Node-Operators-19ca4a3e7553421486cd3e8be314bb03
[maintenance]: operation/maintenance.md
[maintainers]: operation/maintenance.md#maintainer-operators

## Setting up a vote account

*This step needs to be executed by the validator.*

Solido requires validators to use a dedicated vote account for use with Solido.
See [the commission page](internals/commission.md) for the rationale behind this.

We will assume that you are familiar with [setting up a Solana vote
account][solana-vote], and that you have created a vote account keypair and
identity keypair. For simplicity, we’ll asume they are in files in
`~/.config/solana` below, but Solana supports hardware wallets as well.

We need to create an vote account with 100% commission, and the withdraw
authority set to Solido, so first we need to know the withdraw authority.
Assuming [`solido` is configured][config], `show-authorities` will print the
withdraw authority:

```console
$ solido --config mainnet.json show-authorities

Stake authority:            W1ZQRwUfSkDKy2oefRBUWph82Vr2zg9txWMA8RQazN5
Mint authority:             8kRRsKezwXS21beVDcAoTmih1XbyFnEAMXXiGXz6J3Jz
Rewards withdraw authority: GgrQiJ8s2pfHsfMbEFtNcejnzLegzZ16c9XtJ2X2FpuF
Reserve account:            3Kwv3pEAuoe4WevPB4rgMBTZndGDb53XT7qwQKnvHPfX
```

For the mainnet-beta deployment shown above, the withdraw authority is
`GgrQiJ8s2pfHsfMbEFtNcejnzLegzZ16c9XtJ2X2FpuF`.

:::info
Because the authority addresses are derived from the program and instance
addresses, `show-authorities` can compute them even when the program has not yet
been deployed, as long as the address where it will be deployed is known. For
existing instances, `show-solido` will also show the authorities, and more
information about the instance.
:::

Create a new vote account with that authority and 100% commission, and confirm:

```console
$ solana create-vote-account \
  --authorized-withdrawer GgrQiJ8s2pfHsfMbEFtNcejnzLegzZ16c9XtJ2X2FpuF \
  --commission 100 \
  ~/.config/solana/vote.json \
  ~/.config/solana/id.json

$ solana-keygen pubkey ~/.config/solana/vote.json
EAsHKTdxL9GELqQatEFFe3mbSBcbxyEiA8yoPihGhoM6

$ solana vote-account EAsHKTdxL9GELqQatEFFe3mbSBcbxyEiA8yoPihGhoM6
Account Balance: 0.02685864 SOL
Validator Identity: 9RyFMqXbbUUFEhvA1svJffP7RGAw1fE3YcCtazaom8Me
Vote Authority: {214: "9RyFMqXbbUUFEhvA1svJffP7RGAw1fE3YcCtazaom8Me"}
Withdraw Authority: GgrQiJ8s2pfHsfMbEFtNcejnzLegzZ16c9XtJ2X2FpuF
Credits: 0
Commission: 100%
Root Slot: ~
Recent Timestamp: 1970-01-01T00:00:00Z from slot 0
```

In this case, `EAsHKTdxL9GELqQatEFFe3mbSBcbxyEiA8yoPihGhoM6` is the vote account
address, which we need for the next step.

In addition to the vote account, we need an SPL token account that can hold
stSOL, to receive validation fees. For this we need to know the stSOL mint
address. For an existing instance, we can use `show-solido` to confirm, but for
mainnet-beta prior to initialization, `show-solido` cannot show anything yet.
Instead, we created the SPL token mint ahead of time, and we will initialize the
instance with this mint address. **The mint address for mainnet-beta is [listed
on the deployments page](deployments#mainnet-beta)**. For an existing instance,
`show-solido` displays the mint address:

```console
$ solido --config testnet.json show-solido  
Manager:    F6xN9xSNduk84x6JxKwd3VuENL46TqmTyQiY36mCvwHr
stSOL mint: 8ry9FhmvhifEBwLPJpg89fAu19rmUHskDVvEfKuDbQbT

(further output omitted)
```

Create an account, and make it owned by an account that you have the private key
for (`6S21...` in the example below):

```console
spl-token create-account \
  --owner 6S21QCmpAadEhHj3pY2RMbPMGwgYNvS4Pd7zUXoRDMdK \
  8ry9FhmvhifEBwLPJpg89fAu19rmUHskDVvEfKuDbQbT

Creating account 3gD74tkT4NAnzUT5SsiYTV5HPgML4wnjjxrxfpjaFXHk
Signature: eEoNdMgA37pxSQFJafgYHuE3tX6bmCmT6P4w5fhJTs5rWefcboZPSXjCwudvCy6uS3tD6h6tWfm3em2cwg5dCnG
```

This created stSOL account `3gD74tkT4NAnzUT5SsiYTV5HPgML4wnjjxrxfpjaFXHk`,
which we also need for the next step.

Finally, we need to have an account for the maintenance daemon. The daemon needs
to be able to sign with this account programmatically, so it is recommended to
create a new account for this purpose, and to make sure it never contains a lot
of funds; 1.0&nbsp;SOL should be plenty to run the daemon for many months. In
this example, we’ll use account `F5HwubK4v7VKazPXzRhdvHqA3MmJR5yXDoC8mXeMpdDw`.

Please share the vote account, stSOL account, and maintainer account with the
multisig members [by filling out this form][validator-addr-form].

[solana-vote]:         https://docs.solana.com/running-validator/vote-accounts
[validator-addr-form]: https://forms.gle/sf5syRvkjTGyqNPMA
[config]:              operation/the-solido-utility.md#configuration
[solido]:              operation/the-solido-utility.md

## Adding the vote account

*This step needs to be executed by one of the multisig owners. For the initial
launch, Chorus One will be the multisig owner to do this.*

The validator should have provided a vote account, stSOL SPL token account, and
maintainer account. In this example, we have

 * Vote account: `EAsHKTdxL9GELqQatEFFe3mbSBcbxyEiA8yoPihGhoM6`
 * stSOL account: `3gD74tkT4NAnzUT5SsiYTV5HPgML4wnjjxrxfpjaFXHk`
 * Maintainer account: `F5HwubK4v7VKazPXzRhdvHqA3MmJR5yXDoC8mXeMpdDw`

To be sure, we can confirm that the vote account is set up correctly with
`solana vote-account` as shown in the previous section, but a transaction that
adds a vote account will fail anyway if the vote account is not set up
correctly.

Ensure [`solido` is configured][config], then create the multisig transaction:

```console
$ solido --config testnet.json add-validator \
  --validator-vote-account EAsHKTdxL9GELqQatEFFe3mbSBcbxyEiA8yoPihGhoM6 \
  --validator-fee-account 3gD74tkT4NAnzUT5SsiYTV5HPgML4wnjjxrxfpjaFXHk
Transaction address: BaVYNfiC8DkteXfJy58YcC5pz2qfYDBcNsAuEt7PBZ6h
```

Check that the transaction was created as expected with `multisig
show-transaction`:

```console
$ solido --config testnet.json multisig show-transaction \
  --transaction-address BaVYNfiC8DkteXfJy58YcC5pz2qfYDBcNsAuEt7PBZ6h

Multisig: 7Yh1UgKE1KQoLYohynqdo84aNBwQ3GwU4XrCNY153PQ5
Did execute: false

Signers:
  [ ] ENH1xvwjinUWkwEgw1hKduyAg7CrJMiKvr9nAS7wLHrp
  [ ] DBd1yUhptC7yRq79sM4cAH1Zhe5rdTpJizxXJQGxRTyn
  [ ] J4RLjzbJUrm4vRk5ZpPpk6CHzrmAiZGDByuyJ8f9jXR7
  [x] 6S21QCmpAadEhHj3pY2RMbPMGwgYNvS4Pd7zUXoRDMdK
  [ ] CeuSTdUx4XnPET4K4o3Zxx3zjh1yrR4f8fyWycGjs7wj
  [ ] 6DzkRQ3CJXMdnwm9aS2ww7KNeKxw3YLANzpUeTFoRCtC
  [ ] F4VFp4tFTyrQWo9YVjCbPE5eQP27ice2zyGDp2tN2Rkm

Instruction:
  Program to call: 7k3rzqoNQxgTLTooAvXriGBKYsd16bV3JMvatvXcBfNo
  Accounts:

    (some output omitted)

  This is a Solido instruction. It adds a validator to Solido
    Solido instance:        7yoacaUf7yu5wqxpcHaXtwCaMciR7kFqps8FwnX4cjeK
    Manager:                F6xN9xSNduk84x6JxKwd3VuENL46TqmTyQiY36mCvwHr
    Validator vote account: EAsHKTdxL9GELqQatEFFe3mbSBcbxyEiA8yoPihGhoM6
    Validator fee account:  3gD74tkT4NAnzUT5SsiYTV5HPgML4wnjjxrxfpjaFXHk
    Validator weight:       1000
```

We also need to propose a multisig transaction to add the maintainer:

```console
$ solido --config testnet.json add-maintainer \
  --maintainer-address F5HwubK4v7VKazPXzRhdvHqA3MmJR5yXDoC8mXeMpdDw
Transaction address: Cq8MtYCYwep7s475yEaLWQbJr8wgnuSnW2Y5doaw6wf4
```

Verify the transaction:

```console
$ solido --config testnet.json multisig show-transaction \
  --transaction-address Cq8MtYCYwep7s475yEaLWQbJr8wgnuSnW2Y5doaw6wf4

Multisig: 7Yh1UgKE1KQoLYohynqdo84aNBwQ3GwU4XrCNY153PQ5
Did execute: false

Signers:
  [ ] ENH1xvwjinUWkwEgw1hKduyAg7CrJMiKvr9nAS7wLHrp
  [ ] DBd1yUhptC7yRq79sM4cAH1Zhe5rdTpJizxXJQGxRTyn
  [ ] J4RLjzbJUrm4vRk5ZpPpk6CHzrmAiZGDByuyJ8f9jXR7
  [x] 6S21QCmpAadEhHj3pY2RMbPMGwgYNvS4Pd7zUXoRDMdK
  [ ] CeuSTdUx4XnPET4K4o3Zxx3zjh1yrR4f8fyWycGjs7wj
  [ ] 6DzkRQ3CJXMdnwm9aS2ww7KNeKxw3YLANzpUeTFoRCtC
  [ ] F4VFp4tFTyrQWo9YVjCbPE5eQP27ice2zyGDp2tN2Rkm

Instruction:
  Program to call: 7k3rzqoNQxgTLTooAvXriGBKYsd16bV3JMvatvXcBfNo
  Accounts:

    * 7yoacaUf7yu5wqxpcHaXtwCaMciR7kFqps8FwnX4cjeK
      signer: false, writable: true

    * F6xN9xSNduk84x6JxKwd3VuENL46TqmTyQiY36mCvwHr
      signer: true, writable: false

    * F5HwubK4v7VKazPXzRhdvHqA3MmJR5yXDoC8mXeMpdDw
      signer: false, writable: false

  This is a Solido instruction. It adds a maintainer
    Solido instance: 7yoacaUf7yu5wqxpcHaXtwCaMciR7kFqps8FwnX4cjeK
    Manager:         F6xN9xSNduk84x6JxKwd3VuENL46TqmTyQiY36mCvwHr
    Maintainer:      F5HwubK4v7VKazPXzRhdvHqA3MmJR5yXDoC8mXeMpdDw
```

Please share the transaction addresses with the remaining multisig members.

## Approving and executing 

*This step needs to be executed by the remaining multisig owners.*

To approve the addition of a new validator, we need:

 * To know that the validator was admitted by the LNOSG.
 * The vote account, stSOL account, and maintainer account, provided by the
   validator.
 * The two multisig transactions that add the vote account and maintainer.

Ensure [`solido` is configured][config], and confirm that the transactions are
adding the right vote account and maintainer, using `solido multisig
show-transaction`, as shown in the previous section. Then approve the
transactions:

```console
$ solido --config testnet.json multisig approve \
  --transaction-address BaVYNfiC8DkteXfJy58YcC5pz2qfYDBcNsAuEt7PBZ6h

Transaction approved.
Solana transaction id of approval: 2NKbP8LHYEy1DvZyq7gH2pHEDJk9E2f6Btv6sEeihzVpEi3qmBqbvs5SUKn3MaJCy6kEYQtyvCxSbkJea2LWawbj
Multisig transaction now has 2 out of 4 required approvals.

$ solido --config testnet.json multisig approve \
  --transaction-address Cq8MtYCYwep7s475yEaLWQbJr8wgnuSnW2Y5doaw6wf4

Transaction approved.
Solana transaction id of approval: 2RvvNVmqQnd4Fhf6jmac8xDiDADCXU1jVgaBvbrytiFPs2pvNq6LXgrGeeQbXCQqCbACaD5zqK8uCbsECrFiUwKD
Multisig transaction now has 2 out of 4 required approvals.
```

If the transaction is approved by a majority, you can also go ahead and execute
it:

```console
$ solido --config testnet.json multisig execute-transaction \
  --transaction-address BaVYNfiC8DkteXfJy58YcC5pz2qfYDBcNsAuEt7PBZ6h

Transaction executed.
Solana transaction id of execution: 3qawwqtnb684gV9AgqoTqdx8pgZfGQ2dvmMxtfsYWXJgszDMKLP5BBbB4nZfmFwGK5dmFSoFGfSU5M7XSdmXavej

$ solido --config testnet.json multisig execute-transaction \
  --transaction-address Cq8MtYCYwep7s475yEaLWQbJr8wgnuSnW2Y5doaw6wf4

Transaction executed.
Solana transaction id of execution: 5N9vgWmBec6BFmgnJqFe7zvB5TrS22vDcmPxSw2PoZj7WWHa4LDw4j14qfxywDXYTsUAeUUQCqSbGSh5tp2WqEJn
```

:::note
The multisig’s program derived address (PDA) needs to have sufficient
funds to execute transactions. Chorus One should have funded it during setup.
:::

You can confirm that the transaction was executed:

```console
$ solido --config testnet.json multisig show-transaction \
  --transaction-address Cq8MtYCYwep7s475yEaLWQbJr8wgnuSnW2Y5doaw6wf4

Multisig: 7Yh1UgKE1KQoLYohynqdo84aNBwQ3GwU4XrCNY153PQ5
Did execute: true

Signers:
  [x] ENH1xvwjinUWkwEgw1hKduyAg7CrJMiKvr9nAS7wLHrp
  [x] DBd1yUhptC7yRq79sM4cAH1Zhe5rdTpJizxXJQGxRTyn
  [x] J4RLjzbJUrm4vRk5ZpPpk6CHzrmAiZGDByuyJ8f9jXR7
  [x] 6S21QCmpAadEhHj3pY2RMbPMGwgYNvS4Pd7zUXoRDMdK
  [ ] CeuSTdUx4XnPET4K4o3Zxx3zjh1yrR4f8fyWycGjs7wj
  [ ] 6DzkRQ3CJXMdnwm9aS2ww7KNeKxw3YLANzpUeTFoRCtC
  [ ] F4VFp4tFTyrQWo9YVjCbPE5eQP27ice2zyGDp2tN2Rkm

(remaining output omitted)
```
