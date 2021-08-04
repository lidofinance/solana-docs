# Commission

This page explains how Lido for Solana (“Solido”) handles validation rewards.
Before we dive into this, let’s briefly recap how staking works on Solana.

 * Validators create a _vote account_. A vote account has an _identity address_
   of an account that contains the metadata for the validator, such as its
   description.
 * Multiple vote accounts can refer to the same validator identity, but a
   `solana-validator` process can only validate on behalf of one vote account at
   a time.
 * Delegators delegate to a vote account, not to a validator identity!
 * A vote account also has a _commission_ percentage, that determines the
   portion of validation rewards that goes to the vote account. The remainder
   goes to delegators.
 * A vote account has a _withdraw authority_ who can withdraw the validation
   rewards from the vote account. Usually the withdraw authority is the vote
   account itself, but it can be a different address.

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
