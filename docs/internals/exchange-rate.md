# Exchange rate

At its core, Lido for Solana (“Solido” for short) enables converting SOL into
stSOL and back. This conversion involves an exchange rate. This page describes
how Solido sets that exchange rate, and the rationale behind that.

To programmatically access the exchange rate, see the [price
oracle](../development/price-oracle.md) page.

## Definition

The exchange rate used by Solido is **_x_ SOL = _y_ stSOL**, where:

 * $$x$$ is Solido’s SOL balance at the start of the current epoch.
 * $$y$$ is the amount of stSOL in existence at the start of the current epoch.

These variables are updated at the start of the epoch, and remain fixed for the
duration of the epoch. This means that the exchange rate changes at most once
per epoch. We will go into more detail about this in the next sections.

Solido’s SOL balance, $$x$$, is the total amount of SOL managed by the instance.
Solido holds this SOL in two places:

 * In its _reserve account_ (unstaked).
 * In validator stake accounts.

Validation rewards that are paid by the Solana runtime into vote accounts, are
not counted as part of the Solido balance, until Solido withdraws them into its
reserve.

The amount of stSOL in existence consists of:

 * Minted stSOL, as recorded in the SPL token mint account.
 * Unclaimed validation fees.
   For [technical reasons](commission.md#validation-fee-credit), validation fees
   are not paid directly. Instead, the the amount is recorded in the Solido
   instance, and the fees are minted when the validator claims them.

When the Solido instance is first created, the SOL balance $$x$$ and stSOL
amount $$y$$ are both zero, so the exchange rate is not well-defined. For this
case, we choose to define the rate as **1 SOL = 1 stSOL**.

## Deposits and donations

To explain why the exchange rate in Solido is fixed per epoch, we need to
introduce two terms:

 * A **deposit** is a change in $$x$$ — Solido’s SOL balance — that keeps the
   exchange rate constant. In other words, it is paired with a corresponding
   change in $$y$$ — the stSOL supply — such that $$x/y$$ remains constant.

 * A **donation** is a change in $$x$$ where $$y$$ remains constant.

Deposits do not affect the exchange rate, whereas donations do. If the change in
$$x$$ is positive, then a donation benefits stSOL holders by making the SOL value
of stSOL go up.

Depositing with Solido is a **deposit** in the above sense: we adjust the SOL
balance by a given amount, and then we need to mint a corresponding amount of
stSOL to keep the exchange rate fixed. (Withdrawing from Solido works in the
same way, but the change in $$x$$ is negative.) A **donation** happens when new
funds appear in one of Solido’s accounts, without going through the deposit or
withdrawal instruction. In practice this happens when the Solana runtime pays
validation rewards, but in theory any user can transfer funds to one of Solido’s
accounts at any time.

Naively, we can define the $$\textup{deposit}$$ and $$\textup{donate}$$
functions as follows:

$$$
\begin{align*}
\textup{deposit} : \textup{Sol} &\to \textup{Solido} \to \textup{Solido} \\
a &\mapsto (x, y) \mapsto (x + a,\, y + a \cdot y/x) \\
\\
\textup{donate} : \textup{Sol} &\to \textup{Solido} \to \textup{Solido} \\
a &\mapsto (x, y) \mapsto (x + a,\, y)
\end{align*}
$$$

Here $$\textup{Solido} = \textup{Sol} \times \textup{StSol}$$ is the set of
possible Solido states. Its elements are tuples $$(x, y)$$ of the SOL balance
and stSOL supply, that together determine the exchange rate. $$\textup{Sol}$$
and $$\textup{StSol}$$ are the sets of SOL and stSOL balances, which for this
analysis we assume to be equal to $$\mathbb{Q}$$. (In practice, they do not have
unlimited precision, and small rounding errors do occur.)

A few properties follow from this definition:

**Deposit commutes with itself:**
$$$
\forall a, b \in \textup{Sol}:
  \textup{deposit}(a) \circ \textup{deposit}(b)
= \textup{deposit}(a + b)
= \textup{deposit}(b) \circ \textup{deposit}(a)

$$$
**Donate commutes with itself:**
$$$
\forall a, b \in \textup{Sol}:
  \textup{donate}(a) \circ \textup{donate}(b)
= \textup{donate}(a + b)
= \textup{donate}(b) \circ \textup{donate}(a)
$$$

**Deposit and donate do not commute in general:**
$$$
\exists a, b \in \textup{Sol}:
\textup{deposit}(a) \circ \textup{donate}(b) \neq \textup{donate}(b) \circ \textup{deposit}(a)
$$$

## The ordering challenge

The non-commutativity of $$\textup{donate}$$ and $$\textup{deposit}$$ presents a
challenge when processing validation rewards. We would like to process a
validation reward as follows:

 1. Inspect the validator vote account, and see if there are any new funds in
    there that we can withdraw. If not, we are done.
 2. Split the reward in a fee part, and an stSOL appreciation part.
 3. $$\textup{donate}$$ the stSOL appreciation part.
 4. $$\textup{deposit}$$ the fee part, and distribute the resulting stSOL to fee
    recipients.

Solido aims to support many validators, but because Solana has a fairly low
upper bound on the number of accounts that a transaction can reference, it is
not feasible to inspect all validator vote accounts in a single transaction. We
need to visit validators one by one. This means that for validation rewards
$$v_1, v_2, \ldots$$, and a fee percentage $$f$$, we get a sequence of donations
and deposits:

$$$
\cdots
\circ \textup{deposit}(f \cdot v_2)
\circ \textup{donate}((1 - f) \cdot v_2)
\circ \textup{deposit}(f \cdot v_1)
\circ \textup{donate}((1 - f) \cdot v_1)
$$$

**Note that this depends on the order in which we visit the validators!** If we
collect validation rewards in a different order, the fees will be different, and
the final exchange rate will also be different! This ordering dependence is
undesirable, especially with the eventual goal of permissionlessness in mind,
where any user should be able to trigger Solido to collect validation rewards.

## Fixing the exchange rate

To remove the ordering dependence, Solido fixes the exchange rate for the
duration of the epoch. Effectively, $$\textup{deposit}$$ becomes indexed by the
epoch:

$$$
\begin{align*}
\textup{deposit}_i : \textup{Sol} &\to \textup{Solido} \to \textup{Solido} \\
a &\mapsto (x, y) \mapsto (x + a,\, y + a \cdot y_i / x_i) \\
\end{align*}
$$$

where $$(x_i, y_i) \in \textup{Solido}$$ is the fixed exchange rate for epoch
$$i$$. Within a given epoch, this version of $$\textup{deposit}$$ does commute
with $$\textup{donate}$$:

$$$
\forall a, b \in \textup{Sol}, i \in \textup{Epoch}:
  \textup{deposit}_i(a) \circ \textup{donate}(b)
= \textup{donate}(b) \circ \textup{deposit}_i(a)
$$$

This removes the ordering dependence: we can now collect validation rewards in
any order, and the net result will be the same.

An alternative way of looking at the fixed exchange rate per epoch, is to say
that the order of any $$\textup{deposit}$$ and $$\textup{donate}$$ operations
within an epoch is no longer relevant, and therefore the time at which they
happened within the epoch is no longer relevant. Time for Solido moves in
discrete ticks, one per epoch.

## Exchange rate update

Solido stores the exchange rate that is used throughout the epoch in the Solido
instance. Once per epoch, the [maintenance deamon](../operation/maintenance.md)
calls the `UpdateExchangeRate` instruction, which updates the variables to the
latest values according to the [definition](#definition) above. The on-chain
program disallows collecting validation rewards (which also distributes fees) if
the exchange rate is outdated, but withdrawals and deposits are never blocked.
This means that users who deposit in epoch $$k$$, might still get the exchange
rate for epoch $$k - 1$$, if they manage to execute their deposit before
`UpdateExchangeRate` executes. This is not a problem: users could have deposited
in epoch $$k - 1$$ anyway. For Solido, `UpdateExchangeRate` effectively
*defines* the start of the new epoch.
