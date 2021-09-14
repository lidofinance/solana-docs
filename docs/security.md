# Security

If you find any vulnerabilities in Lido for Solana, please report them through
[Immunefi’s platform][immunefi]. Immunefi will handle bug bounty communications.

[immunefi]: https://immunefi.com/bounty/lidoforsolana

## Bug bounty

The [bug bounty program with Immunefi](https://immunefi.com/bounty/lidoforsolana) is live now! 

The Lido for Solana bug bounty program is focused around our smart contracts, websites, and apps with a primary interest in the prevention of loss of the staked user funds, either through freezing or theft, DoS attacks and governance manipulation.

### Rewards by Threat level
Rewards are distributed according to the impact of the vulnerability based on the [Immunefi Vulnerability Severity Classification System](https://immunefi.com/severity-updated). This is a simplified 5-level scale, with separate scales for websites/apps and smart contracts/blockchains, encompassing everything from consequence of exploitation to privilege required to likelihood of a successful exploit. 

#### Smart contracts

| Level | Bounty Amount |
| :--- | :--- |
| Critical | $100,000 |
| High | $20,000 |
| Medium | $5,000 |
| Low | $1,000 |


#### Website and Apps\*

| Level | Bounty Amount |
| :--- | :--- |
| Critical | USD $20,000 |
| High | USD $7,500 |
| Medium | USD $3,250 |
| Low | USD $500 |

>\*All web/app bug reports must come with a PoC in order to be considered for a reward. 

Payouts are handled by the *Lido for Solana* department of the Lido team directly and are denominated in USD. Payouts can be done in *ETH, DAI, RAI, or LDO,* at the decision of the bug bounty hunter.


### Assets in Scope

| Target | Type | 
| :--- | :--- |
| https://github.com/ChorusOne/solido/tree/main/program | Smart Contract - Main Program |
| https://github.com/chorusone/multisig |  Smart Contract - Multisig |
| https://chorusone.github.io/solido/deployments | Smart Contract - Testnet Addresses |
| https://solana.lido.fi | Web/App |


For the `Main Program`, only the on-chain program in the `program` subdirectory of the repository is in scope. The `cli` subdirectory is not. Please use the main branch.

For the `Multisig`, the addresses listed in the readme are the deployments of the upstream Serum Multisig program, these are not the addresses used by Lido for Solana. Please use the commit that is pinned as the `multisig` submodule in the solido repository.

> Once launched on mainnet, the testnet addresses will be removed from the Assets in Scope table and replaced with mainnet contracts. 



## Audits

The Lido for Solana source code has been audited by the following parties:

| Date                      | Version | Auditor                  | Report                         |
|---------------------------|---------|--------------------------|--------------------------------|
| August 2021               | v0.5.0  | [Neodyme][neodyme]       | [Download PDF][neodyme-report] |
| July 2021                 | v0.1.0  | [Bramah Systems][bramah] | [Download PDF][bramah-report]  |

[neodyme]:        https://neodyme.io/
[bramah]:         https://www.bramah.systems/
[bramah-report]:  https://github.com/ChorusOne/solido/raw/b95fc4fe9435a1d5ccdaae60011ea59dd93afed8/audit/2021-07-05-bramah-systems.pdf
[neodyme-report]: https://github.com/ChorusOne/solido/raw/d57347c41c68a7def1722f5aa2b052539c325ba2/audit/2021-08-03-neodyme.pdf
