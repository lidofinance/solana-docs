# Administration

Lido for Solana [is governed](governance.md) by the **Lido Decentralized
Autonomous Organization** (**Lido DAO**). Members of the DAO — holders of
the LDO governance token — can vote on high-level proposals, such as whether to
expand to a new chain. For day to day tasks, we have a much more narrowly scoped
need for somebody to execute privileged operations: an **administrator**. The
administrator rights reside with a 4-out-of-7 multisig that consists of
established validators and ecosystem partners.

## Administrator responsibilities

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

## Multisig details

For Lido for Solana, we use the [Serum Multisig program][serum-multisig], and we
require approval from 4 out of 7 members. The members are:

 * [ChainLayer](https://chainlayer.io/)
 * [Chorus One](https://chorus.one)
 * [Figment](https://figment.io/)
 * [Mercurial](https://mercurial.finance/)
 * [P2P](https://p2p.org/)
 * [Saber](https://saber.so/)
 * [Staking Facilities](https://stakingfacilities.com/)

The addresses of the multisig members are listed on the [deployments
page](deployments.md). The multisig instance is used both as the upgrade
authority of the Solido program, and as the manager of the Solido instance.

For initial testing on testnet, [Bonafida](http://bonfida.org/) participated as
one of the seven multisig members. For the mainnet deployment, ChainLayer has
taken their place. During the initial mainnet deployment, [Solana
Foundation](https://solana.com/) participated as one of the seven members. They
were succeeded by Mercurial after the v1.0.0 launch.

Aside from approving parameter changes to onboard validators, the multisig
members also verify that the deployed Solido program can be
[reproduced][reproduce], to ensure that the on-chain program was built from the
publicly available source code, and contains no back doors.

[serum-multisig]: https://github.com/project-serum/multisig
[reproduce]:      https://blog.lido.fi/lido-dao-treasury-fund/

## Multisig origin

The 4-out-of-7 multisig was established as follows:

 * Chorus One reached out to all participants, and verified their identities
   on Telegram and GitHub.
 * Participants shared their public keys on GitHub.
 * Chorus one deployed the Serum Multisig program, and created an instance that
   has the 7 public keys as owners. The upgrade authority of the multisig
   program was set to the multisig instance itself.
 * Participants verified that they could [reproduce][reproduce] the program, and
   that the list of public keys matched the keys shared earlier on GitHub.
