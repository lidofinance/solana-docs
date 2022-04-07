# Security

If you find any vulnerabilities in Lido for Solana, please report them through
[Immunefi’s platform][immunefi]. Immunefi will handle bug bounty communications.

[immunefi]: https://immunefi.com/bounty/lidoforsolana

## Bug bounty

Lido for Solana runs a bug bounty program with [Immunefi][immunefi] with
bounties up to $2,000,000. Please see the page over at Immunfi for the details
about what is in scope.

## Audits

The Lido for Solana source code has been audited by the following parties:

| Date                      | Version          | Program | Auditor                  | Report                          |
|---------------------------|------------------|---------|--------------------------|---------------------------------|
| February 2022             | [v1.2.0][v1.2.0] | Anker   | [Neodyme][neodyme]       | [Download PDF][neodyme-report2] |
| August 2021               | [v0.5.0][v0.5.0] | Solido  | [Neodyme][neodyme]       | [Download PDF][neodyme-report]  |
| July 2021                 | [v0.1.0][v0.1.0] | Solido  | [Bramah Systems][bramah] | [Download PDF][bramah-report]   |

[neodyme]:        https://neodyme.io/
[bramah]:         https://www.bramah.systems/
[bramah-report]:  https://github.com/ChorusOne/solido/raw/b95fc4fe9435a1d5ccdaae60011ea59dd93afed8/audit/2021-07-05-bramah-systems.pdf
[neodyme-report]: https://github.com/ChorusOne/solido/raw/cb3805689e042fe88abd9f9c17adb9c10e029e18/audit/2021-08-03-neodyme.pdf
[neodyme-report2]: https://github.com/ChorusOne/solido/raw/163b26aee08958fbdc0f3909ccb6ef606a1ea0f2/audit/2022-04-06-neodyme.pdf
[v0.1.0]:         https://github.com/ChorusOne/solido/tree/v0.1.0
[v0.5.0]:         https://github.com/ChorusOne/solido/tree/v0.5.0
[v1.2.0]:         https://github.com/ChorusOne/solido/tree/v1.2.0

## Open source and reproducible

The source code for all of our on-chain programs [is publicly available][src],
and the programs can be built reproducibly. This means that anybody can look at
the source code to see what the program does, and anybody can verify that the
program deployed on-chain was really built from the source code we publish.
See the [reproducibility page](development/reproducibility) for the technical
details of how to reproduce the programs.

[src]: https://github.com/ChorusOne/solido

## Upgrade authority

The upgrade authority of both the Solido program and our deployment of the Serum
multisig program, is set to the multisig’s program-derived address. This means
that our on-chain programs can only be upgraded with approval from 4 of the 7
members. See the [administration page](administration) for more details about
the multisig, and see the [deployments page](deployments) for the addresses of
our deployments and the multisig members.
