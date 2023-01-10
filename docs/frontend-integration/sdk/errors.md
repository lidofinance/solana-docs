---
sidebar_position: 3
---

# Error codes

---

All **known** errors we wrap adding some extra fields to make it easier controlling exceptions.
Also, it's possible to use *`message`* field of *`Error`* object to inform users about the details of exception.

Additional fields to *`Error`* object:
- *`code: number`* - error code
- *`codeDesc: string`* - error code definition

This table lists the error code information returned by the SolidoSDK when it is called.

| Error code | Error code definition       | Message                                                                                                                                                                                                                      |
|:-----------|:----------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 100        | CANNOT_CONFIRM_TRANSACTION  | Got error from Solana blockchain during transaction confirmation, so this error could have different messages (signature is not base58 encoded/transaction was not confirmed in N seconds/signature has invalid length etc.) |
| 200        | NO_VALIDATORS               | Couldn't fetch validators list                                                                                                                                                                                               |
| 300        | UNSUPPORTED_CLUSTER         | SolidoSDK doesn't support devnet, specify mainnet-beta or testnet                                                                                                                                                            |
| 301        | UNSTAKE_UNAVAILABLE         | Sorry, unStake is not available right now. Please contact lido developers for details.                                                                                                                                       |
| 302        | NO_PUBLIC_KEY               | SolidoSDK: publicKey is null in wallet                                                                                                                                                                                       |
| 303        | NO_ACCOUNT_INFO             | Couldn't fetch getAccountInfo                                                                                                                                                                                                |
| 304        | NO_APY_DATA                 | Couldn't fetch apy data                                                                                                                                                                                                      |
| 400        | EXCEED_MAX                  | Amount must not exceed MAX(..)                                                                                                                                                                                               |
| 401        | PUBLIC_KEY_IS_PDA           | Your publicKey is PDA type. Please use allowOwnerOffCurve=true flag.                                                                                                                                                         |

#### Example

```ts
try {
  const { transactionHash, stSolAccountAddress } = await solidoSDK.stake({
    amount: 20, // The amount of SOL-s which need to stake
    wallet: wallet, // Wallet instance with 1 Sol left
  });
} catch (error) {
  console.error(error.code); // -> 400
  console.error(error.codeDesc); // -> 'EXCEED_MAX'
  console.error(error.message); // -> 'Amount must not exceed MAX(0.9988)'
}
```

