# Fees

Validation rewards that Lido for Solana receives are split into four parts:

 * **90%** goes to stSOL holders in the form of stSOL value appreciation: stSOL
   holders now own a share of a larger pool of SOL. This is how users benefit.
 * **5%** goes to validators to cover their operating expenses. The fees are
   distributed equally among all validators.
 * **4%** goes to the treasury of the Lido DAO. The Lido DAO [spends its
   treasury funds][dao-treasury] on e.g. bug bounties and grants to advance the
   ecosystem.
 * **1%** goes to the developer for the development and ongoing maintenance of
   the Solido program.

All fees are distributed in the form of stSOL. The fee percentages [are set by
the Lido DAO](governance.md), and can be changed by [the administration
multisig](administration.md) when called for by the Lido DAO. The fee
percentages are stored on-chain, and you can inspect the current values with
[`solido show-solido`][solido].

[dao-treasury]: https://blog.lido.fi/lido-dao-treasury-fund/
[solido]:       operation/the-solido-utility
