# Deployments

This page lists official addresses at which Lido for Solana is deployed, in the
form of [a `solido` config file][config].

Aside from the config keys, we list a few additional addresses that do not need
to be part of the config file, and that can be obtained through [`solido
show-solido`][solido] and [`solido anker show`][solido], but which are useful to
know anyway.

[config]: operation/the-solido-utility.md#configuration
[solido]: operation/the-solido-utility.md

## Mainnet-beta

Solido version: [v1.0.1](https://github.com/ChorusOne/solido/releases/tag/v1.0.1).
Anker version: [v1.3.0](https://github.com/ChorusOne/solido/releases/tag/v1.3.0).

Configuration:

```json
{
  "cluster": "https://api.mainnet-beta.solana.com",

  "multisig_program_id": "AAHT26ecV3FEeFmL2gDZW6FfEqjPkghHbAkNZGqwT8Ww",
  "multisig_address": "3cXyJbjoAUNLpQsFrFJTTTp8GD3uPeabYbsCVobkQpD1",

  "solido_program_id": "CrX7kMhLC3cSsXJdT7JDgqrRVWGnUpX3gfEfxxU2NVLi",
  "solido_address": "49Yi1TKkNyYjPAFdR9LBvoHcUjuPX4Df5T5yv39w2XTn",

  "anker_program_id": "BNVB8pd4coHpY7MVcrtiHLCLst7fyDGzMtPmfJqFAhwj",
  "anker_address": "2kDSwqbzm2zJ2GzeS1uRXpRZFR8H9A9XhNFVcnG9sEUY"
}
```

Related addresses:

| Account | Address | Description |
|---------|---------|-------------|
| Multisig PDA | `GQ3QPrB1RHPRr4Reen772WrMZkHcFM4DL5q44x1BBTFm` | Address that the multisig can sign on behalf of, used as the manager of the Solido instance, and upgrade authority of the Solido and Anker programs. |
| stSOL Mint | `7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj` | SPL token mint for stSOL, managed by Solido. |
| bSOL Mint | `EbMg3VYAE9Krhndw7FuogpHNcEPkXVhtXr7mGisdeaur` | SPL token mint for bSOL, managed by Anker. |
| Stake Authority | `W1ZQRwUfSkDKy2oefRBUWph82Vr2zg9txWMA8RQazN5` | Stake and withdraw authority of stake accounts managed by Solido. |
| Withdraw Authority | `GgrQiJ8s2pfHsfMbEFtNcejnzLegzZ16c9XtJ2X2FpuF` | Withdraw authority of vote accounts of Lido validators. |
| Solido Reserve | `3Kwv3pEAuoe4WevPB4rgMBTZndGDb53XT7qwQKnvHPfX` | Solido’s reserve that holds deposited SOL until it is staked near the epoch boundary. |
| Anker stSOL Reserve | `6emGaZGVvehtMNTr1mxhw9RNPptX6BVZVypTgbuq55GN` | Holds stSOL deposited into Anker. |
| Anker UST Reserve | `BBuh4WDeS6GJTGdZvi2SYzZnmVJ1kZXRcudEcyuAXfUE` | Holds Anker's proceeds until they are sent to Terra. |


Multisig owners (including past owners):

```json
{
  "Cv6GM219kzMrdUUdgDGVJUPW6fGosvrhsFrvmEhz3Mc6": "P2P",
  "ENH1xvwjinUWkwEgw1hKduyAg7CrJMiKvr9nAS7wLHrp": "Staking Facilities",
  "6CawqfAJDviZGfUpHFJgeauq6H9vhKuivMMZULZeGnPw": "Figment",
  "F4VFp4tFTyrQWo9YVjCbPE5eQP27ice2zyGDp2tN2Rkm": "Saber",
  "AnoVUukL1fMAwEp4y2rrZV45BNHLes8ZwWsCRgEwhGH4": "ChainLayer",
  "6S21QCmpAadEhHj3pY2RMbPMGwgYNvS4Pd7zUXoRDMdK": "Chorus One",
  "DHLXnJdACTY83yKwnUkeoDjqi4QBbsYGa1v8tJL76ViX": "Mercurial",
  "8Lep9addZWUWqBNj3igx4QoHe43GBfvLhGJy18jJgWQa": "Solana Foundation"
}
```

Maintainers:

```json
{
  "AR7FaVeVvUQwnLtojZNUc42H987KiHqfc4AN1qEwPUJw": "Chorus One",
  "2rqLzNZCBWykEs8bFMbmgqCz4eosaEfU3aRL4RJWdZgQ": "Figment",
  "DqCZaFR6cTMvFMuz43HS77Zcz1quR93n11kT1yY6aVf4": "Staking Facilities",
  "p2pokvNcNc1SFCMoUrp1UBQ6SBET7H5EdLqahz4g55k":  "P2P"
}
```

## Testnet

There is no official testnet or devnet deployment of a recent version of the
Solido program. For testing, you can create your own instance instead.
