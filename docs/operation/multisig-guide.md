# Multisig guide

This page is aimed at members of the [administration
multisig](administration.md).

## Adding a validator

*This step needs to be executed by one of the multisig owners.*

The validator should have provided a vote account, stSOL SPL token account, and
optionally a maintainer account. In this example, we have

 * Vote account: `EAsHKTdxL9GELqQatEFFe3mbSBcbxyEiA8yoPihGhoM6`
 * stSOL account: `3gD74tkT4NAnzUT5SsiYTV5HPgML4wnjjxrxfpjaFXHk`
 * Maintainer account: `F5HwubK4v7VKazPXzRhdvHqA3MmJR5yXDoC8mXeMpdDw`

To be sure, we can confirm that the vote account is set up correctly with
`solana vote-account` as shown in [the validator onboarding
docs](validator-onboarding.md#setting-up-a-vote-account), but a transaction that
adds a vote account will fail anyway if the vote account is not set up
correctly.

Ensure [`solido` is configured](the-solido-utility.md#configuration), then create
the multisig transaction:

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

If the validator will run the maintenance daemon, we also need to propose a
multisig transaction to add the maintainer:

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

## Approving and executing validator onboarding

*This step needs to be executed by the remaining multisig owners.*

To approve the addition of a new validator, we need:

 * To know that the validator was admitted by the LNOSG.
 * The vote account, stSOL account, and maintainer account, provided by the
   validator.
 * The multisig transaction that adds the vote account.
 * Optionally, the multisig transaction that adds the maintainer.

Ensure [`solido` is configured](the-solido-utility.md#configuration), and
confirm that the transactions are adding the right vote account and maintainer,
using `solido multisig show-transaction`, as shown in the previous section. Then
approve the transactions:

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
