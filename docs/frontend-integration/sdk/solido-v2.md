# Smart-contract upgrade

Our smart-contract (solido) upgrade is coming soon. It will bring **breaking changes** to frontend integration, that's why it's critical
important to be ready for this upgrade.

In [0.5.0](https://github.com/lidofinance/solido-sdk/releases/tag/0.5.0) we have supported v2 in advance, in order not to be broken when the protocol
switches to second version. 

For sdk users totally nothing changes, but **unStake operations can not be performed for 1-2 epoches**, because of removing
validators before migration, and adding them again after. For this case we prepared new method [`isUnStakeAvailable()`](/frontend-integration/sdk/sdk-methods#isunstakeavailable),
use it for checking unStake operation availability. 

After migration v1 instructions **will stop work**, it means versions fewer than 0.5.0 will stop work after migration. So, we recommend update sdk:

```bash
npm i @lidofinance/solido-sdk@latest
```

Learn more:
- [Smart-contract upgrade](https://research.lido.fi/t/lido-on-solana-protocol-upgrade-proposal/2959/3).
- [Solido changes](/frontend-integration/manual-instructions/#solido-changes)

