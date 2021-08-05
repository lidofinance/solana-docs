# Staking on Solana

This page gives an overview of how staking on Solana works, as background for
the following sections on commissions and withdrawals.

## Stake accounts

To stake SOL on Solana, one has to create a *stake account*, fund it with some
amount of SOL, and then *delegate* the stake account to a *validator vote
account*.  The balance of a stake account can be split into four states:
*inactive*, *activating*, *active*, and *deactivating*. Activating and
deactivating stake are mutually exclusive, but a stake account can contain a mix
of inactive, active, and activating/deactivating stake.

Stake on Solana is subject to a warmup and cooldown period. Immediately after
delegating, stake transitions from inactive to activating. At the start of the
next epoch, a portion of the activating stake transitions to active. In practice
the full amount becomes active, but in theory, stake can take more than one
epoch to warm up, when there is a lot of churn on the network. Stake
deactivation works in the same way: immediately after deactivation, stake
transitions from active to deactivating, and at the start of the next epoch, a
portion of the deactivating stake becomes inactive.

A stake account has an *authorized withdrawer*, which is an address that can
withdraw inactive stake from the stake account. Active stake cannot be
withdrawn.

For the purpose of determining the stake held by a validator, activating stake
is considered inactive, and deactivating stake is considered active. This means
that activating stake incurs no rewards, and deactivating stake does.

Because Solana features a complicated rent mechanism, the minimum amount that
can be staked, is the rent-exempt balance of a stake account. This amount is
always inactive, only funds above this threshold can be activated. However,
there used to be [an issue][stake-merge-bug] in Solana where stake accounts that
hold very little stake cannot be merged. Solido requires stake account merging
to keep the number of stake accounts in check, so stake accounts need a minimum
amount of stake. The exact minimum is not known, but 1 SOL is enough.

[stake-merge-bug]: https://github.com/solana-labs/solana/issues/18942

## Vote accounts

To operate a validator, you need a *vote account* and an *identity account*. The
identity account contains metadata about the validator, such as its description,
and the vote account refers to the identity account. Multiple vote accounts can
refer to the same identity account, but a `solana-validator` instance can only
validate on behalf of one vote account at a time.

A vote account (the things that you delegate a stake account to), specifies a
*commission percentage*. Validation rewards get split into a commission part,
and a delegator part. Commission gets paid into the vote account, and the
remainder gets paid into the delegating stake account, where it is immediately
active.  Because only funds in stake accounts can be staked, rewards paid as
commission do not compound automatically, but rewards paid into stake accounts
do.

Vote accounts have a *withdraw authority*: an address that can withdraw funds
from the vote account. The withdraw authority can be different from the vote
account itself, or the validator that controls it. For traditional non-pooled
validators, it is set to an address controlled by the validator, usually the
vote account address itself.
