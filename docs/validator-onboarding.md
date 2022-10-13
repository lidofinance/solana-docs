# Validator onboarding

This page is aimed at validators who want to join Lido for Solana.

:::note Note for validators
If you have already been admitted by the LNOSG, please continue to [Setting up
a vote account](#setting-up-a-vote-account) below.
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

Solido requires validators to use a dedicated identity and vote account for use
with Solido. See [the commission page](internals/commission.md) for the
rationale behind the separate vote account. A separate identity account is
needed to clarify that the vote account is part of Solido, to distinguish it
from the validator’s public public vote account.

We will assume that you are familiar with [setting up a Solana vote
account][solana-vote], and that you have created a new vote account keypair and
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
address, which we need for the final step.

[solana-vote]: https://docs.solana.com/running-validator/vote-accounts
[config]:       /operation/the-solido-utility#configuration
[solido]:      /operation/the-solido-utility

## Configuring the validator identity

As a validator, you now have two or more vote accounts:

 * A public one that anybody can delegate to.
 * One for Lido for Solana with 100% commission, that only the Solido program is
   expected to delegate to.
   
To distinguish these two in validator lists such as
<https://solanabeach.io/validators>, we ask you to use a separate validator
identity account for the Solido vote account. Set the name of your validator to
“Lido / «your-name»” with [`solana validator-info`][validator-info], and link
your Keybase account. For example, for Chorus One, we would run

```console
$ solana validator-info publish \
  --keypair ~/.config/solana/id.json \
  --website https://chorus.one \
  --keybase chorusoneinc \
  --details "Chorus One validator for Lido for Solana" \
  "Lido / Chorus One"
```

Then upload the public key of your identity account to Keybase, as described in
[this Solana guide][solana-keybase].

:::note
Be sure to fund the identity account as well, as it pays for the votes.
:::

[validator-info]: https://docs.solana.com/running-validator/validator-info
[solana-keybase]: https://docs.solana.com/running-validator/validator-info#keybase

## Setting up a fee account

In addition to the vote account, we need an SPL token account that can hold
stSOL, to receive validation fees. For this we need to know the stSOL mint
address. For an existing instance, we can use `show-solido` to confirm, but for
mainnet-beta prior to initialization, `show-solido` cannot show anything yet.
Instead, we created the SPL token mint ahead of time, and we will initialize the
instance with this mint address. **The mint address for mainnet-beta is [listed
on the deployments page](deployments.md#mainnet-beta)**. For an existing instance,
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
which we also need for the final step.

## Setting up a maintainer account

**This step is only needed for [the validators who operate an instance of the
maintenance daemon][maintainers]. If you are not on that list, you can skip this
step.**

[maintainers]: operation/maintenance#maintainer-operators

We need to have an account for the maintenance daemon. The daemon needs to be
able to sign with this account programmatically, so it is recommended to create
a new account for this purpose, and to make sure it never contains a lot of
funds; 1.0&nbsp;SOL should be plenty to run the daemon for many months. In this
example, we’ll use account `F5HwubK4v7VKazPXzRhdvHqA3MmJR5yXDoC8mXeMpdDw`.

## Final onboarding step

Please share the vote account, stSOL account, and if applicable, your maintainer
account, with the multisig members [by filling out this
form][validator-addr-form]. Chorus One will then prepare a multisig transaction
to add your vote account to the Solido instance, and the multisig members will
batch-approve these transactions periodically.

After your vote account has been added to the instance, the [maintenance
bot][maintenance] will automatically delegate new deposits to your vote account.

[validator-addr-form]: https://forms.gle/sf5syRvkjTGyqNPMA
