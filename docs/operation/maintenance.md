# Maintenance

Some tasks in Solido, such as claiming staking rewards, need to happen
periodically. We refer to these as *maintenance* tasks. The maintenance daemon
(also called “bot”) watches the on-chain state, and executes maintenance tasks
as necessary. It is fine, and even encouraged for redundancy, if multiple
parties run a maintenance daemon.

## Trusted maintainers

Most maintenance tasks can be executed by anybody. However, staking deposits is
limited to a list of *maintainers* at the moment. This simplifies the on-chain
program, but it also gives maintainers great power and responsibility over the
stake distribution. The maintenance daemon that maintainers are expected to use,
targets a uniform stake distribution, but maintainers in theory have the power
to disturb this balance. We plan to move the stake distribution logic into the
on-chain program in a future version, to eliminate the need for trusted
maintainers.

## Maintainer operators

Most of the Solido maintenance tasks can be executed by anybody, but there still
needs to be *somebody* who submits the transaction. The maintenance bot
automates this. The bot will also execute maintenance tasks that are restricted
to the set of trusted maintainers. For v1 the set of trusted maintainers who run
the bot consists of validators who are also part of the multisig:

 * Chorus One
 * Figment
 * P2P
 * Staking Facilities

Uptime of the maintenance bot is not critical. As long as *somebody* at least
briefly runs the bot once every epoch, Solido will work fine. Because multiple
parties run an instance, it is okay if an instance is inactive for a bit (e.g.
to reboot the host).

## Obtaining the maintenance daemon

The maintenance daemon is part of the `solido` utility. You can either build
it from source with Cargo, or use the [`chorusone/solido-maintainer`][dockerhub]
container image that includes a prebuilt version.

[dockerhub]: https://hub.docker.com/r/chorusone/solido-maintainer

## Running the maintenance daemon

The maintenance daemon is part of the `solido` utility and can be started with
the `run-maintainer` subcommand. Like all `solido` commands, it can be
configured either on the command line, with a json config file, or through
environment variables. See also [the section on `solido` configuration][config]
See `solido --help` and `solido run-maintainer --help` for the options specific
to `run-maintainer`. Beware that:

 * The public Solana RPC endpoints are rate-limited, and require trusting the
   server. If possible, point `--cluster` at the RPC endpoint of your own
   validator, instead of a public one like
   `https://api.mainnet-beta.solana.com`. See also [the section about the RPC
   node requirements](#rpc-node-requirements).

 * The key used to sign (configured with `--keypair-path`) needs to be listed as
   a maintainer in the Solido instance. You can view the list of maintainers
   with `solido show-solido`. The account needs to be funded, as it pays for the
   transaction fees of maintenance transactions.

When running, the maintenance daemon periodically polls the on-chain state, and
executes maintenances transactions if necessary. It also exposes an http server
that serves a Prometheus `/metrics` endpoint. These metrics include both metrics
about Solido in general (extracted from the on-chain state), and metrics about
the daemon. The following metrics are useful for monitoring:

 * `solido_maintainer_balance_sol`: The balance of the maintainer account
   (configured with `--keypair-path`). You can alert on this value dropping
   below e.g. 0.1 SOL; to top up the account in a timely fashion.

 * `solido_maintenance_polls_total`: The number of times we refreshed the
   on-chain state. If this value stops increasing, something is wrong.

 * `solido_maintenance_errors_total`: The number of times we encountered an
   error. If the rate of this metric gets close to the poll rate, that means
   most iterations are failing, and investigation is needed. Occasional errors
   are expected, especially when using a public RPC endpoint.

[config]: operation/the-solido-utility.md#configuration

## RPC node requirements

The Solido maintenance daemon puts some demands on the RPC node that it connects
to:

 * The RPC must be enabled with `--full-rpc-api`.
   Since [Solana 1.9.6](https://github.com/solana-labs/solana/releases/tag/v1.9.6)
   by default only the minimal set of RPC methods is enabled, so the full set
   must be enabled explicitly.

 * Set `--max-multiple-accounts` to a sufficiently large value. (1000 should be
   plenty for now.) Solido relies on `GetMultipleAccounts` to read atomic
   snapshots of the chain state. For correctness, it must be able to read all
   accounts in a single call. Solido needs to read multiple accounts per
   validator (multiple stake accounts, the vote account, the config account for
   metadata, etc.). Solido will log a warning to stdout when it can’t request
   all accounts in a single call.

 * Enable account indexing of the config program with `--account-index
   program-id` and `--account-index-include-key Config1111111111111111111111111111111111111`.
   Due to the way Solana implements validator metadata, one needs to list all
   accounts owned by the config program to find the metadata for a particular
   validator. For this query to be fast, account indexing is needed. Without
   these flags, the `GetProgramAccounts` call will time out.

## Claiming validation fees

For [technical reasons](internals/commission.md#validation-fee-credit), Solido
holds on to any validation fees until the validator withdraws them into the
validator’s stSOL account; they are not paid into the account automatically by
the on-chain program. To alleviate this, the maintenance bot will withdraw the
rewards automatically for all validators, into their stSOL accounts.
