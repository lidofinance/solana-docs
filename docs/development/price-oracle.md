# Price oracle

At its core, Lido for Solana (“Solido” for short) enables converting SOL into
stSOL and back. This conversion involves an exchange rate. The exchange rate
used by Solido is stored on-chain in the Solido instance itself. This page
explains how to access it. To understand how the exchange rate is set, see [the
internals page about the exchange rate](../internals/exchange-rate).

## On-chain

:::note
The details in this section are based on v1.0.0 of the Solido program. Please
confirm that this information is still up to date before building on it. The
source code is always the source of truth. For v1.0.0, the relevant field
is [`Lido::exchange_rate`][src-v1.0.0].
:::

[src-v1.0.0]: https://github.com/ChorusOne/solido/blob/v1.0.0/program/src/state.rs#L201

Solido stores two values that together determine the exchange rate:

 * The amount of stSOL in existence, `st_sol_supply`.
 * The amount of SOL managed, `sol_balance`.

Both are represented as a little-endian `u64` that holds the number of lamports.
`st_sol_supply` is stored in in the Solido account data at byte 73..81,
and `sol_balance` is stored at byte 81..89. The address of the official Solido
instance is listed [on the deployments page](../deployments).

Byte 0 of the Solido account data is a version byte. If we make changes to the
data layout of the Solido account, we will bump the value of this byte. You can
use this to block transactions after we update Solido, to prevent reading
garbage data.

To extract the on-chain data, you can use the following libraries:

 * **Rust**: [The `solido` crate][solido-v1]
 * **Typescript**: A library is in progress, follow [this issue][ts-sdk] for details.
 * If you are interested in other ways to extract the on-chain data, feel free
   to [open an issue][new-issue] and we might be able to help you out.

[solido-v1]: https://github.com/ChorusOne/solido/tree/v1.0.0/program
[ts-sdk]:    https://github.com/ChorusOne/solido/issues/467
[new-issue]: https://github.com/ChorusOne/solido/issues/new

## HTTP API

At the moment we do not expose a stable http API for requesting the current
exchange rate, but we might support one if there is demand for it. Feel free
to [open an issue][new-issue] if you are interested.

## Prometheus

The [maintenance daemon](../operation/maintenance) exposes details about the
Solido instance at a Prometheus `/metrics` endpoint. These metrics include
Solido’s current exchange rate. You will need to run an instance of the
maintenance daemon yourself to access these metrics; the endpoint is not
intended to be exposed to the public internet.

## bSOL

:::note
bSOL and the Anker program are still under development.
We don’t expect the definition of the bSOL price to change,
but no mainnet-beta deployment exists yet at the time of writing.
:::

Like the Solido program sets the stSOL price (in SOL), the Anker program sets
the bSOL price (in stSOL). The price used for deposits is determined by Solido’s
stSOL price such that 1 bSOL = 1 SOL, always. The price for withdrawals is
defined as follows:

$$$
\textup{bSOL price in stSOL} = \textrm{min}\left\{
\frac{\textup{stSOL supply}}{\textup{SOL balance}},
\frac{\textup{stSOL reserve}}{\textup{bSOL supply}}
\right\}
$$$

Here $$\textup{stSOL supply}$$ and $$\textup{SOL balance}$$ are the two fields
of Solido’s exchange rate, $$\textup{stSOL reserve}$$ is the balance of Anker’s
stSOL reserve, and $$\textup{bSOL supply}$$ is the supply as determined by the
bSOL mint. In other words, the price on withdraw is the minimum of two prices:

 1. The price that ensures the 1 bSOL = 1 SOL peg, implied by the Solido instance.
 2. The price where bSOL is a share of Anker’s stSOL pool.

During normal operation, the first term is smaller than the second term, so the
1 bSOL = 1 SOL peg is ensured. At the time of writing, there is no slashing on
Solana, which means that the price of stSOL in SOL does not decrease, so Anker’s
stSOL reserve more than covers all bSOL in existence, and the 1 bSOL = 1 SOL peg
is maintained. However, in the unlikely event that Solana were to introduce
slashing in the future, and Lido for Solana would experience a slashing event
that it could not compensate for from its treasury, then the price of stSOL
would go down, and Anker’s stSOL reserve may not contain sufficient stSOL to
back every bSOL at a 1 bSOL = 1 SOL exchange rate. In that case, the rate
changes such that every bSOL is a share of the stSOL pool. Note, this only
applies to withdrawals, not to deposits.

For the first term, the two relevant numbers are stored in the Solido instance,
[as described above](#on-chain). For the second term, the relevant accounts are
the stSOL reserve, and the bSOL mint, which live at program-derived addresses.
They are a regular SPL token account and mint, and their balance and supply can
be extracted with the regular SPL token tooling (e.g. the [Rust
crate][spl-token-crate], or the [`getMultipleAccounts` RPC
method][get-multiple-accounts] with `encoding: "jsonParsed"`).
You can view the addresses of the stSOL reserve and bSOL mint with
[`solido anker show`][solido-cli], and we will also list them on
[the deployments page](../deployments) once Anker has been deployed to mainnet-beta.

[spl-token-crate]:       https://lib.rs/crates/spl-token
[get-multiple-accounts]: https://docs.solana.com/developing/clients/jsonrpc-api#getmultipleaccounts
[solido-cli]:            ../operation/the-solido-utility
