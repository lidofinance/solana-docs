# Withdrawals

This page describes how withdrawals in Lido for Solana work. It lists some
concerns, and how those are addressed.

## Background: Staking on Solana

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

A vote account (the things that you delegate a stake account to), specifies a
commission percentage. Validation rewards get split into a commission part, and
a delegator part. Commission gets paid into the vote account, and the remainder
gets paid into the delegating stake account, where it is immediately active.
Because only funds in stake accounts can be staked, rewards paid as commission
do not compound automatically, but rewards paid into stake accounts do.

Vote accounts have a *withdraw authority*: an address that can withdraw funds
from the vote account. The withdraw authority can be different from the vote
account itself, or the validator that controls it. For traditional non-pooled
validators, it is set to an address controlled by the validator, usually the
vote account’s address itself.

Because Solana features a complicated rent mechanism, the minimum amount that
can be staked, is the rent-exempt balance of a stake account. This amount is
always inactive, only funds above this threshold can be activated. However,
there used to be [an issue][stake-merge-bug] in Solana where stake accounts that
hold very little stake cannot be merged. Solido requires stake account merging
to keep the number of stake accounts in check, so stake accounts need a minimum
amount of stake. The exact minimum is not known, but 1 SOL is enough.

[stake-merge-bug]: https://github.com/solana-labs/solana/issues/18942

## Background: Solido staking

For Solido, we require validators to set up a new vote account, with 100%
commission, and the withdraw authority set to a Solido-controlled address. (See
also [the commission page](commission).) This means that all validation rewards
are controlled by the Solido program. Solido then computes fee amounts and
distributes those to validators. This is a bit different from a typical
non-pooled validator setup, where validators set themselves as withdraw
authority, and fee distribution happens automatically due to the
commission/delegator split. Because for Solido all validation rewards are paid
as commission into vote accounts, rewards do not compound automatically, so the
Solido maintenance bot withdraws the rewards from the vote accounts and stakes
them, just like it stakes deposits.

## Background: Solido rewards

On Solana, vote accounts gain rewards proportional to how many times they voted,
and proportional to the stake delegated to them. The stake amount is the
*active* stake at the start of the epoch (so active and deactivating stake, but
not activating and inactive stake). Rewards for votes in epoch _k_, are then
paid by the runtime at the start of epoch _k_ + 1. In the optimal case, this
means that if you activate (delegate) stake in epoch _k_, it will be activating
for the remainder of epoch _k_, it will be active in epoch _k_ + 1, and the
rewards gained over epoch _k_ + 1 will be paid at the start of epoch _k_ + 2.

Solido splits validation rewards into two parts: fees, that get paid in the form
of stSOL, and rewards that benefit stSOL holders implicitly, by making the SOL
value of stSOL go up. Solido maintains a fixed exchange rate per epoch, that is
updated once at the start of the epoch.

 * At the start of epoch _k_, the maintenance bot triggers an exchange rate
   update. Solido then reads the SOL balance managed, and the amount of stSOL in
   existence, and this becomes the new exchange rate for epoch _k_. The SOL
   balance managed by Solido does not yet include rewards received at the start
   of epoch _k_.

 * After the exchange rate update, the maintenance bot triggers fee collection
   for every validator. This looks at the vote accounts, and withdraws the
   rewards in there into the Solido reserve. These rewards are the rewards over
   epoch _k_ - 1. Solido mints stSOL fees according to the current (just
   updated) exchange rate, and the remainder goes to stSOL value accrual, which
   will go into effect when the next exchange rate update observes the new
   balance.

A user who deposits in epoch _k_, can withdraw more SOL than initially
deposited, in epoch _k_ + 1. Therefore, the user benefits from rewards in epoch
_k_ + 1. This benefit is not due to the user’s own deposit, because that stake
only started being active in epoch _k_ + 1; it’s the reward over epoch _k_ - 1,
that benefits stSOL holders at the transition from epoch _k_ to _k_ + 1. This
means rewards are “shifted in time”: users can already benefit, even though
their share of the pool is not yet active and gaining rewards.

On the flip side of this, users do not benefit from rewards gained over the
epoch where they withdraw. If a user withdraws and deactivates in epoch _k_,
then the stake still gains rewards over epoch _k_. The stake is deactivating,
but that counts as active stake for the purpose of rewards. Those rewards over
epoch _k_ get paid at the start of epoch _k_ + 1, and they will benefit stSOL
holders at the exchange rate update of epoch _k_ + 2. A user who withdraws in
epoch _k_, therefore benefitted for the last time at transition from epoch
_k_ - 1 to _k_, and that benefit was due to the stake active in epoch _k_ - 2.

Aside from reward differences due to differences in activating stake, Solana has
an inflation schedule that reduces the reward slightly with every epoch.

## Withdrawal approach

This section describes how withdrawals work in Lido for Solana. In the next
section, we can then investigate possible concerns to see if they are a problem
for this withdrawal method.

**Withdrawals withdraw an active stake account.**
When a user withdraws, we take the stSOL and burn it. Then we split one of the
Solido-managed stake accounts, to split off the corresponding amount of SOL.
(The amount is determined by the internal exchange rate, see below.) We set the
stake and withdraw authority of this new stake account to the withdrawing user’s
address, so the user is now in full control of this stake account. The stake
remains active, and delegated to one of the Solido validators. It is up to the
user to deactivate the stake, and then withdraw from the stake account. We might
automatically include a deactivate instruction from the withdraw widget or CLI
command, to save users the deactivate step.

**Solido picks the validator to withdraw from.**
Solido maintains a target stake balance and actual balance for every validator.
It only allows withdrawing from a validator, if there is no other validator
whose stake balance is further above its target than the one we try to withdraw
from. If the maintenance bot kept the stake exactly balanced, this could be any
validator, but in practice, due to the minimum stake amount, validator balances
can differ slightly.

**Withdrawal amounts are constrained.**
Because withdrawal splits a stake account, the maximum amount to withdraw is the
amount of stake in the target stake account, minus the minimum stake balance. If
users want to withdraw more, they should do multiple withdrawals. Also, because
of the minimum rent-exempt balance of stake accounts, the minimum amount to
withdraw is the minimum rent-exempt balance.

**Withdrawal amounts are capped further.**
Aside from the above limitations, we cap withdrawals so users can withdraw at
most 10% of a validator’s stake.

**The exchange rate is fixed per epoch.**
Solido uses a fixed SOL/stSOL exchange rate that is updated once per epoch. The
net effect of this is that the relative order of deposits and withdrawals within
an epoch no longer matters. Effectively, time is discrete, and only epochs
matter.

**Withdrawals are for advanced users.**
Because withdrawals are subject to some constraints, and because they require
multiple advanced steps from the user (deactivate and withdraw from the stake
account), we don’t expect regular users to withdraw from Solido. Those users can
withdraw on the open market (e.g. Saber or Serum) instead. We mainly expect
power users such as market makers to withdraw directly from Solido.

Consequences of this approach:

 * Solido gains rewards over stake that was withdrawn, over the epoch that the
   stake was withdrawn in. (And possibly longer, if the user doesn’t deactivate
   the stake.)
 * Withdrawals are instant for Solido, we do not need to store ongoing
   withdrawals anywhere. Withdrawals are instant for users too, in the sense
   that the funds immediately move to an account controlled by the user, but
   users still need to deactivate their stake and wait for it to cool down
   before they can spend the SOL. This is enforced by the Solana network, Solido
   is not involved in the cooldown.

## Possible concerns

This section lists some possible issues, and explains how they affect Solido’s
withdrawal approach.

**[Non-issue] Withdrawals causing churn, which cause Solido to miss rewards.**
If stake that is withdrawn no longer incurs rewards, then a user could withdraw
_x_ SOL, and then deposit _x_ SOL. (They might be different users too.) The end
result is the same balance for Solido, except that we gain fewer rewards,
because newly deposited SOL needs to be activated first, and it’s not gaining
rewards while it is activating. This turns out to be a non-issue, because
deactivating stake still gains rewards, so when users withdraw, even though they
are in control of the stake account from that point on, Solido still gets the
rewards that epoch. Therefore, withdrawing does not cause Solido to miss
rewards.

**[Non-issue] Users who have knowledge about future slashings can withdraw to
avoid the penalty.** This is not a problem, because slashing does not exist on
Solana.

**[Non-issue] Bank run.** Aside from the minimum mentioned above, nothing
prevents users from withdrawing, and users who withdraw do not have a negative
impact on Solido.

**[Low impact] Users can disturb the stake balance.**
Even though Solido only allows withdrawing from the validator with the most
excess stake, users can withdraw a large amount that disturbs the stake
distribution by a lot. This is less of a problem with more validators. Users
could also wait for their target validator to be the one with the most excess
stake, and then withdraw. A validator with less stake is not a problem for that
validator, because Solido distributes validation rewards among all validators,
so the validator will still have income, even if it temporarily has less stake.
Still, to limit the impact of this issue, we cap the amount per withdrawal to a
percentage of the validator’s stake. For larger withdrawals, the user needs to
break them up, and then Solido enforces that the parts are withdrawn from
different validators. Furthermore, in v1, the only way to return to the target
stake distribution is by staking more new deposits, but in v2, we plan for the
maintenance bot to actively redistribute stake, which will limit the possibility
for imbalance at larger timescales.

**[Low impact] Solido balance cannot be fully withdrawn.** Because we require a
minimum amount to remain in every stake account, not all funds can be withdrawn.
We need to keep at least one stake account, with the minimum stake account
balance, per validator. In the long term, this can be resolved by implementing
validator removal. Because the “locked” amount is proportional to the number of
validators, it can be reduced by reducing the number of validators. But even
without validator removal, this is not a problem in practice. The minimum stake
account balance is only 1 SOL, so if every validator who joins deposits 1 SOL
without the intention of withdrawing it, then all users who wish to withdraw can
do so.

**[Unknown impact] Time shift of rewards.** When users deposit at epoch _k_ and
withdraw in epoch _k_ + 1, the reward is really the reward over the stake active
in epoch _k_ - 1, see also the earlier section on Solido rewards. When the
balance managed by Solido is steady, and when deposits and withdrawals are small
with respect to size of the pool, the rewards over those epochs will be very
similar. However, when the pool is growing or shrinking a lot, this difference
might be significant. Let’s consider three scenarios:

 1. In epoch _k_ - 1, the pool size was a lot smaller than _x_, and in epoch
    _k_, it’s _x_. (The pool is growing fast.)
 2. In epoch _k_ - 1, the pool size was about _x_, and in epoch _k_, it’s _x_.
    (The pool is steady.)
 3. In epoch _k_ - 1, the pool size was a lot larger than _x_, and in epoch _k_,
    it’s _x_. (The pool is shrinking quickly.)

For a user who deposits SOL in epoch _k_, and withdraws all of it in epoch
_k_ + 1, the benefit in scenario 1 is smaller than scenario 2, and the benefit
in scenario 3 is larger than in scenario 2. In other words, it’s more lucrative
to jump in and out when the pool is shrinking to _x_, than when the pool is
growing to _x_. (Note, this compares growing and shrinking to _x_, not just
growing or shrinking in general!) We don’t know how this impacts long-term
stability; withdrawing in epoch _k_ + 1 is still more lucrative than withdrawing
in epoch _k_, regardless of whether the pool is growing or shrinking. Also, due
to the fixed exchange rate, withdrawing _x_ SOL in epoch _k_ and depositing the
same amount again in epoch _k_, is equivalent for the user to just holding the
stSOL. There might be other interesting behaviors though, this needs more
analysis.
