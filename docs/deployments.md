# Deployments

This page lists official addresses at which Lido for Solana is deployed, in the
form of [a `solido` config file](the-solido-utility#configuration).

Aside from the config keys, we list a few additional addresses that do not need
to be part of the config file, and that can be obtained through [`solido
show-solido`](the-solido-utility.md), but which are useful to know anyway.

## Testnet

```json title="testnet.json"
{
  "cluster": "https://api.testnet.solana.com",
  "multisig_program_id": "BY7D3NJMevi3JiT49xmAKditKL69a8TuyiCc9YuSvy4W",
  "multisig_address": "7Yh1UgKE1KQoLYohynqdo84aNBwQ3GwU4XrCNY153PQ5",
  "solido_program_id": "7k3rzqoNQxgTLTooAvXriGBKYsd16bV3JMvatvXcBfNo",
  "solido_address": "7yoacaUf7yu5wqxpcHaXtwCaMciR7kFqps8FwnX4cjeK"
}
```

```json title="Mainnet related addresses"
{
  "st_sol_mint": "8ry9FhmvhifEBwLPJpg89fAu19rmUHskDVvEfKuDbQbT",
  "withdraw_authority": "4t57fC1TwHGo5d6X4fpH9hkEvvDLaMDXj13vfkSZvvrQ",
  "reserve": "BfT1Sn54zwUk46WtJRhizcu6izUvw9eTanndawX5MdR",
}
```

## Mainnet-beta

Lido for Solana is not yet available on mainnet-beta, but we did reserve the
following addresses:

```json title="mainnet.json"
{
  "solido_program_id": "CrX7kMhLC3cSsXJdT7JDgqrRVWGnUpX3gfEfxxU2NVLi",
  "solido_address": "49Yi1TKkNyYjPAFdR9LBvoHcUjuPX4Df5T5yv39w2XTn",
}
```

```json title="Mainnet related addresses"
{
  "st_sol_mint": "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj"
}
```
