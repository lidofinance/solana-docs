---
title: Governance
description: Overview of governance in Lido for Solana
keywords:
 - governance
 - multi-sig
 - lido
 - solana
sidebar_position: 1
---

# Governance

Lido for Solana is part of the [**Lido Decentralized Autonomous
Organization**](https://lido.fi) (**Lido DAO**) which governs and enables the
development of liquid staking solutions on different blockchains. The first
liquid staking protocol solution was [built for
Ethereum](https://blog.lido.fi/staking-ethereum-with-lido/) — and now Lido is
expanding to different blockchain networks.

 * **The long-term goals** for Lido for Solana are decided on by the Lido
   community through the Lido DAO.
 * **The validator set** for Lido for Solana is determined by the Lido Node
   Operator Subgovernance Group on behalf of the Lido DAO. Any validator can
   apply, see also [the validator admission docs][admission].
 * **Admininistration rights** [reside with a 4-out-of-7 multisig][admin] that
   consists of established validators and ecosystem partners, including the
   Solana Foundation. The role of this multisig is to execute decisions made by
   the Lido DAO, not to make independent decisions.

[admission]: validator-onboarding.md#validator-admission
[admin]: administration.md

## The Lido DAO

The Lido DAO is the deciding authority on the various parameters of the
ecosystem. The DAO decides on fees, the validator set, etc. It is in the DAO’s
charter to make the system run smoothly and it does so through the process of
voting.  Holders of the **LDO** governance token can vote on proposals, either
on-chain through [Aragon][aragon], or off-chain through [Snapshot][snapshot].
For example, the proposal by Chorus One to build Lido for Solana was [accepted
through a unanimous Snapshot vote][solido-vote] in favor of the proposal. Before
proposals are put up for voting, they are discussed on the [Lido forum][forum].

[aragon]:      https://mainnet.lido.fi/#/lido-dao
[snapshot]:    https://snapshot.org/#/lido-snapshot.eth
[solido-vote]: https://snapshot.org/#/lido-snapshot.eth/proposal/QmdGihkHD61rimU5syA6VqesV3ZzAQPS6Vzn7H5NnjAXNE
[forum]:       https://research.lido.fi/

## TODO

The stake deposited to the Lido contract on Solana is distributed to these validators following a logic similar to the Lido [(stETH) on Ethereum](https://lido.fi/static/Lido:Ethereum-Liquid-Staking.pdf). Lido on Solana has a fee mechanism similar to that on Ethereum which allows splitting fees between node operators and the Lido treasury (e.g. to be used for the insurance fund).
Lido’s decentralized organization brings together the industry’s top staking providers, decentralized finance projects, and investors. The Lido DAO eliminates dependence on a centralized authority, thereby removing the risk of a single point of failure. Distributed governance also fosters a stronger community!

