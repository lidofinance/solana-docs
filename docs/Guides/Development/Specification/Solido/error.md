---
title: error
description: Specification of the error.rs module
keywords:
 - development
 - developers
 - lido
 - specification
 - intent
 - error
 - solido
 - solana
sidebar_position: 6
---

# Error

The error module defines the LidoError enum for the available error types in the Solido  program along with some small conversion implementations to and from the Solana ProgramError struct.

## Errors

The LidoError enum, at time of writing, defines the following errors:

| Error | Description |
| --- | --- |
| **AlreadyInUse**  |  The Lido address passed to the program is in use; i.e. the Solido program has already been initialised. |
| **InvalidOwner** |  The address of the owner of the Solido program is different to the passed program id. |
| **InvalidAmount** |  The amount being staked is below the minimum stake amount. |
| **SignatureMissing** | A required signature is missing |
| **InvalidReserveAuthority** | The authority for the reserve account, where SOL gets deposited, is invalid |
| **CalculationFailure** | Calculation failed due to division by zero or overflow |
| **WrongStakeState** | Stake account is in an invalid state or does not exist when processing a stake deposit |
| **MaximumNumberOfAccountsExceeded** | The maximum number of entries in the account map is already at maximum capacity as defined by maximum entries |
| **UnexpectedMaxValidators** | The size of the account for the Solido state does not match `max_validators` |
| **InvalidManager** |  Wrong manager trying  to alter the state of the Solido program |
| **InvalidMaintainer** |  Wrong maintainer trying  to alter the state of the Solido program |
| **InvalidAccountInfo** | The provided account is mismatched in is_writable or is_signer to what was expected for that type of account  |
| **TooManyAccountKeys** | More accounts were provided than Solido expects |
| **InvalidValidatorCreditAccount** | The account provided when claiming validator fees is incorrect |
| **InvalidFeeRecipient** | The provided fee recipient account is incorrect |
| **DuplicatedEntry** | The entry trying to be added to the account_map already exists |
| **ValidatorHasUnclaimedCredit** | The validator trying to be removed has unclaimed credit, the credit should be minted before the validator is removed |
| **ReserveIsNotRentExempt** | The reserve account value is not above the minimum value for rent exemption |
| **AmountExceedsReserve** |  The requested amount for reserve withdrawal exceeds the maximum held in the reserve account when considering rent exemption |
| **InvalidAccountMember** | An entry in the account map is not present |
| **InvalidLidoSize** | Lido has an invalid size, calculated with the Lido's constant size plus  required to hold variable structures |
| **NoActiveValidators** | There are no validators with an active stake account to delegate to |
| **InvalidStakeAccount** | When staking part of the reserve to a new stake account, the next program-derived address for the stake account associated with the given validator, does not match the provided stake account |
| **InvalidStSolAccount** | We expected an SPL token account that holds stSOL, but this was not an SPL token account, or its mint did not match |
