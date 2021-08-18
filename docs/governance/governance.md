---
title: Governance overview
description: Overview of governance in Lido for Solana
keywords:
 - governance
 - multi-sig
 - lido
 - solana
sidebar_position: 1
---

# Governance overview

Lido for Solana is part of the [**Lido Decentralized Autonomous
Organization**](https://lido.fi) (**Lido DAO**) which governs and enables the
development of liquid staking solutions on different blockchains. The first
liquid staking protocol solution was [built for
Ethereum](https://blog.lido.fi/staking-ethereum-with-lido/) — and now Lido is
expanding to different blockchain networks.

## Summary

 * **The long-term goals** for Lido for Solana are decided on by the Lido
   community through the Lido DAO.
 * **The validator set** for Lido for Solana is determined by the Lido Node
   Operator Subgovernance Group on behalf of the Lido DAO. Any validator can
   apply, see also [the validator admission docs][admission].
 * **Admininistrator rights** reside with a 4-out-of-7 multisig that consists of
   established validators and ecosystem partners, including the Solana
   Foundation. The role of this multisig is to execute decisions made by the
   Lido DAO, not to make independent decisions.

[admission]: validator-onboarding.md#validator-admission

## The Lido DAO

The Lido DAO exists on Ethereum. Holders of the LDO governance token can vote on
proposals, either on-chain through [Aragon][aragon], or off-chain through
[Snapshot][snapshot]. For example, the proposal by Chorus One to build Lido for
Solana was [accepted through a unanimous Snapshot vote][solido-vote] in favor
of the proposal. Before proposals are put up for voting, they are discussed on
the [Lido forum][forum].

[aragon]:      https://mainnet.lido.fi/#/lido-dao
[snapshot]:    https://snapshot.org/#/lido-snapshot.eth
[solido-vote]: https://snapshot.org/#/lido-snapshot.eth/proposal/QmdGihkHD61rimU5syA6VqesV3ZzAQPS6Vzn7H5NnjAXNE
[forum]:       https://research.lido.fi/

## The administrator

Members of the DAO — holders of the LDO token — can vote on proposals, but these
are high-level proposals, like expanding to a new chain. For Lido for Solana, we
have a much more narrowly scoped need for governance for day to day tasks. We
need an **administrator**.

Lido for Solana is implemented as a program called _Solido_, that runs on the
Solana blockchain. Programs on Solana have an **upgrade authority**: an address
that can replace the program with a newer version. This upgrade authority has a
lot of power, especially for a program like Solido that manages user’s funds.
After all, the upgrade authority could deploy a new program that withdraws all
staked SOL into an address of their choice. Therefore, it is essential that the
upgrade authority is trustworthy.

:::note
It is possible on Solana to disable upgrades for a program. In that case nobody
will ever be able to change it, so there is no party to trust — you only need to
trust the code itself. This is a double-edged sword: if the code contains a
critical bug, then nobody can fix it. This makes disabling upgrades dangerous,
potentially more risky than trusting an upgrade authority. Especially for early
versions of a program, we need a way to upgrade.
:::

Aside from the program code itself, the Solido program has parameters, whose
values must be set by somebody:

 * How much fees does it take, and how are those split up among the treasury,
   the developer, and validators?
 * Which validators are part of the validator set?

In the program, we refer to the address that can sign parameter changes as the
**manager**. The role of the administrator, is to act as the manager for
parameter changes, and to act as the upgrade authority for program changes.

## Multisig administration

Different administration methods exists, each with different advantages and
disadvantages.

 * A single person could act as the administrator. This has very low overhead,
   and the administrator can move quickly when there is a need to deploy a
   critical bugfix. However, it also places a high degree of trust in a single
   person.

 * On the opposide side of the spectrum, a DAO program could act as the
   administrator. Administrative tasks could only be executed after a majority
   of LDO token holders approve. This is decentralized, but it makes it very
   difficult to act quickly when needed.

A good middle ground between these two extremes is a **multisig**, a program
that executes administrative tasks after _m_ out of _n_ members have approved.
For _m_ greater than one, no single party can unilaterally execute
administrative tasks, but we only need to coordinate with _m_ parties to get
something done, not with a majority of LDO holders.

For Lido for Solana, we use the [Serum Multisig program][serum-multisig], and we
require approval from 4 out of 7 members. The members are:

 * [Bonafida](https://bonfida.org/)
 * [Chorus One](https://chorus.one)
 * [Figment](https://figment.io/)
 * [P2P](https://p2p.org/)
 * [Saber](https://saber.so/)
 * [Solana Foundation](https://solana.com/)
 * [Staking Facilities](https://stakingfacilities.com/)

The addresses of the multisig members are listed on the [deployments
page](deployments.md).

[serum-multisig]: https://github.com/project-serum/multisig

## TODO

The stake deposited to the Lido contract on Solana is distributed to these validators following a logic similar to the Lido [(stETH) on Ethereum](https://lido.fi/static/Lido:Ethereum-Liquid-Staking.pdf). Lido on Solana has a fee mechanism similar to that on Ethereum which allows splitting fees between node operators and the Lido treasury (e.g. to be used for the insurance fund).
Lido’s decentralized organization brings together the industry’s top staking providers, decentralized finance projects, and investors. The Lido DAO eliminates dependence on a centralized authority, thereby removing the risk of a single point of failure. Distributed governance also fosters a stronger community!

## Governance Rewards

A portion of the rewards goes to the Lido DAO treasury. The amount that goes to the Lido DAO treasury can be potentially used for different purposes
- Revenue share to maintainers (20% of the portion going to the treasury, see also the full Chorus One proposal to the Lido DAO)
- Insurance
- Grants
- Value Accrual to LDO

The Lido DAO is the deciding authority on the various parameters of the ecosystem. Things like fees, upgrade approvals, validator set, voting mechanisms, etc. are decided by the DAO. It is in the DAO’s charter to make the system run smoothly and it does so through the process of voting. To be a voter one must possess the governance token, LDO. The amount of LDO determines the weight of your vote.

Lido DAO’s governance is a key aspect of the ecosystem and holds the key to the success of Lido for Solana.
