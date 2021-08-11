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

## Obtaining the maintenance daemon

The maintenance daemon is part of the `solido` utility. You can either build
it from source with Cargo, or use the [`chorusone/solido-maintainer`][dockerhub]
container image that includes a prebuilt version.

[dockerhub]: https://hub.docker.com/r/chorusone/solido-maintainer

## Running the maintenance daemon

The maintenance daemon is part of the `solido` utility and can be started with
the `run-maintainer` subcommand. Like all `solido` commands, it can be
configured either on the command line, with a json config file, or through
environment variables. See `solido --help` and `solido run-maintainer --help`
for details. Beware that:

 * The public Solana RPC endpoints are rate-limited, and require trusting the
   server. If possible, point `--cluster` at the RPC endpoint of your own
   validator, instead of a public one like
   `https://api.mainnet-beta.solana.com`.

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

## Claiming validation fees

When the maintenance bot inspects a vote account and finds rewards in there,
it withdraws them into the Solido reserve, and distributes fees. For [technical
reasons](internals/commission#validation-fee-credit), the treasury and developer
fee are paid directly, but validation fees are only recorded in the Solido
instance, and they need to be claimed separately. To make the maintenance bot
automatically claim validation fees, provide `run-maintainer` with
`--validator-vote-account`. This will mint the credited amount of stSOL into the
validator’s fee account, which was provided when the validator was added.

