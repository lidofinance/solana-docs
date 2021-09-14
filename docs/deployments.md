# Deployments

This page lists official addresses at which Lido for Solana is deployed, in the
form of [a `solido` config file][config].

Aside from the config keys, we list a few additional addresses that do not need
to be part of the config file, and that can be obtained through [`solido
show-solido`][solido], but which are useful to know anyway.

[config]: operation/the-solido-utility.md#configuration
[solido]: operation/the-solido-utility.md

## Mainnet-beta

Version: [v1.0.1](https://github.com/ChorusOne/solido/releases/tag/v1.0.1).

Configuration:

```json
{
  "cluster": "https://api.mainnet-beta.solana.com",
  "multisig_program_id": "AAHT26ecV3FEeFmL2gDZW6FfEqjPkghHbAkNZGqwT8Ww",
  "multisig_address": "3cXyJbjoAUNLpQsFrFJTTTp8GD3uPeabYbsCVobkQpD1",
  "solido_program_id": "CrX7kMhLC3cSsXJdT7JDgqrRVWGnUpX3gfEfxxU2NVLi",
  "solido_address": "49Yi1TKkNyYjPAFdR9LBvoHcUjuPX4Df5T5yv39w2XTn"
}
```

Related addresses:

```json
{
  "multisig_pda": "GQ3QPrB1RHPRr4Reen772WrMZkHcFM4DL5q44x1BBTFm",
  "st_sol_mint": "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
  "withdraw_authority": "GgrQiJ8s2pfHsfMbEFtNcejnzLegzZ16c9XtJ2X2FpuF",
  "reserve": "3Kwv3pEAuoe4WevPB4rgMBTZndGDb53XT7qwQKnvHPfX"
}
```

Multisig owners:

```json
{
  "Cv6GM219kzMrdUUdgDGVJUPW6fGosvrhsFrvmEhz3Mc6": "P2P",
  "ENH1xvwjinUWkwEgw1hKduyAg7CrJMiKvr9nAS7wLHrp": "Staking Facilities",
  "6CawqfAJDviZGfUpHFJgeauq6H9vhKuivMMZULZeGnPw": "Figment",
  "F4VFp4tFTyrQWo9YVjCbPE5eQP27ice2zyGDp2tN2Rkm": "Saber",
  "AnoVUukL1fMAwEp4y2rrZV45BNHLes8ZwWsCRgEwhGH4": "ChainLayer",
  "6S21QCmpAadEhHj3pY2RMbPMGwgYNvS4Pd7zUXoRDMdK": "Chorus One",
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

Version: [v0.4.0](https://github.com/ChorusOne/solido/releases/tag/v0.4.0).

Configuration:

```json
{
  "cluster": "https://api.testnet.solana.com",
  "multisig_program_id": "BY7D3NJMevi3JiT49xmAKditKL69a8TuyiCc9YuSvy4W",
  "multisig_address": "7Yh1UgKE1KQoLYohynqdo84aNBwQ3GwU4XrCNY153PQ5",
  "solido_program_id": "7k3rzqoNQxgTLTooAvXriGBKYsd16bV3JMvatvXcBfNo",
  "solido_address": "7yoacaUf7yu5wqxpcHaXtwCaMciR7kFqps8FwnX4cjeK"
}
```

Related addresses:

```json
{
  "st_sol_mint": "8ry9FhmvhifEBwLPJpg89fAu19rmUHskDVvEfKuDbQbT",
  "withdraw_authority": "4t57fC1TwHGo5d6X4fpH9hkEvvDLaMDXj13vfkSZvvrQ",
  "reserve": "BfT1Sn54zwUk46WtJRhizcu6izUvw9eTanndawX5MdR"
}
```

Multisig owners:

```json
{
  "ENH1xvwjinUWkwEgw1hKduyAg7CrJMiKvr9nAS7wLHrp": "Staking Facilities",
  "DBd1yUhptC7yRq79sM4cAH1Zhe5rdTpJizxXJQGxRTyn": "Figment",
  "J4RLjzbJUrm4vRk5ZpPpk6CHzrmAiZGDByuyJ8f9jXR7": "P2P",
  "6S21QCmpAadEhHj3pY2RMbPMGwgYNvS4Pd7zUXoRDMdK": "Chorus One",
  "CeuSTdUx4XnPET4K4o3Zxx3zjh1yrR4f8fyWycGjs7wj": "Bonafida",
  "6DzkRQ3CJXMdnwm9aS2ww7KNeKxw3YLANzpUeTFoRCtC": "Solana Foundation",
  "F4VFp4tFTyrQWo9YVjCbPE5eQP27ice2zyGDp2tN2Rkm": "Saber"
}
```
