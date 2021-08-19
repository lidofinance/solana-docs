# Commission

This page explains how Lido for Solana (“Solido”) handles validation rewards.
If you haven’t done so yet, now is a good time to review [how vote accounts
work on Solana](solana-staking.md#vote-accounts).

## Challenge

Lido for Solana faced the following challenge:

 * We want many validators to be able to join.
 * These validators may have different validation fees (commissions) for their
   public vote accounts.
 * We (Lido) want to decide the validation fee percentage, and it should be the
   same for all validators.

If we would allow validators to join with their public vote account, those would
have different commissions, and either some validators would take more
commission than the percentage set by Lido, or these validators would not be
able to join.

## Solido vote accounts

To level the playing field for validators, we ask them to create a new vote
account for use with Solido. We could ask validators to set the commission of
those vote accounts to the percentage decided by Lido, but this creates new
problems:

 * If we set a lower validation fee percentage than the commissions of existing
   public vote accounts, users might flock away from the existing vote accounts,
   and delegate to the Solido vote accounts directly. Users who do this would
   not benefit from Solido’s advantages (a liquid token, and spreading risk),
   but it would still undermine the validator’s public vote accounts.

 * Changing the validation fee percentage requires action from all validators.

To address this, we require validators to set the commission to 100%, but set
the *withdraw authority* of the vote account to an address controlled by Solido.
This has the following consequences:

 * It is no longer interesting for users to delegate directly to this vote
   account, because they would not gain any rewards.

 * Only the Solido program has access to validation rewards. This means that
   Soldio can distribute the validation fees, and should the percentage need to
   change, it can be done in a single place.

An additional advantage of Solido distributing validation fees, is that it can
distribute them in the form of stSOL. This means that validators automatically
get compounding rewards, and it aligns the interests of validators with those of
stSOL holders.

## Validation fee credit

When Solido observes a reward in a vote account, it splits it into a fee part,
and a part that goes to stSOL appreciation. The fee part is further split into
the treasury fee, the developer fee, and the validation fee. The treasury and
developer fee get paid directly into their stSOL accounts, but for technical
reasons, the validation fee involves a separate step. Solido stores the
amount in the validator list in the Solido instance, and when a validator claims
it, Solido mints the stSOL into the validator’s fee account, and resets the
unclaimed amount stored in the Solido instance back to zero.

The reason for the separate claiming step, is that Solana transactions have a
fairly low upper bound on the number of accounts they can reference. With many
validators, we couldn’t possibly pay all of them in a single transaction; the
“push-based” approach no longer works. To work around this, we instead store the
stSOL credit of each validator in the Solido instance (which is only one
account), and we have an instruction to pay out this credit for a single
validator. With this “pull-based” approach, the number of validators is no
longer limited by the Solana account limit.

The maintenance bot [will perform this claiming
step](../operation/maintenance.md#claiming-validation-fees) for all validators.
