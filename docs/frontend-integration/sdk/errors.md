---
sidebar_position: 3
---

# Error codes

---

This document lists the error code information returned by the SolidoSDK when it is called.

| Status code | Definition          | Description                                                                          |
|:------------|:--------------------|:-------------------------------------------------------------------------------------|
| 100         | CANNOT_CONFIRM_TRANSACTION | Got error during transaction confirmation                                            |
| 200         | NO_VALIDATORS | Couldn't fetch validators list                                                       |
| 300         | UNSUPPORTED_CLUSTER | SolidoSDK doesn't support devnet, specify mainnet-beta or testnet                    |
| 301         | UNSTAKE_UNAVAILABLE | Unstake is not available right now, for more information [contact](https://t.me/lidofinance) Lido developers |
| 302         | NO_PUBLIC_KEY | Public key is null in wallet                                                         |
| 303         | NO_ACCOUNT_INFO | Couldn't fetch account info                                                          |
| 400         | EXCEED_MAX | Amount must not exceed MAX(..) in stake/unstake transaction                          |

