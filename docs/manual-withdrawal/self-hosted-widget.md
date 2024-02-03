---
title: with self-hosted widget
---

# Manual withdraw with self-hosted widget

## 1. Local build

### Prerequisites

- Node.js v18+
- Yarn package manager

This project requires an `.env` file which is distributed via private communication channels.
A sample can be found in `sample.env`

### Development

Step 1. Clone github repository [stsol-unstake-widget](https://github.com/lidofinance/stsol-unstake-widget)

```bash
git clone https://github.com/lidofinance/stsol-unstake-widget.git
```

Step 2. Copy the contents of `sample.env` to `.env.local`

```bash
cp sample.env .env.local
```

Optinal: provide your-own private solana RPC endpoint

For the best experience, set your own RPC endpoint (`VITE_SOLANA_RPC_ENDPOINT`)

[List](https://solana.com/rpc) of free services to get solana RPC endpoint

Step 3. Install dependencies

```bash
yarn install
```

Step 4. Start the development server

```bash
yarn dev
```

Step 5. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

Step 6. Optional. Now you can build and [deploy](https://vitejs.dev/guide/static-deploy) your own version of widget.

## 2. Hosted version

You can use hosted version of this widget on https://lidofinance.github.io/stsol-unstake-widget

This version of widget rate-limited RPC endpoint - so it may be very slow
