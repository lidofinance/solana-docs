# Reproducibility

To verify that the programs deployed on-chain were built from a specific version
of the Soldio source code, we can reproduce the programs with the steps below.

## Building

The `./buildimage.sh` script [in the repository root][buildimage] builds the
programs in a Docker container, and copies them out of the container into the
`build` directory. That directory will then contain:

 * `lido.so`: the Solido program that runs on-chain.
 * `serum_multisig.so`: the multisig governance program that runs on-chain.
 * `solido`: the command-line management client that runs locally.

[buildimage]: https://github.com/ChorusOne/solido/blob/main/buildimage.sh

## Verification

To verify that an on-chain program matches one we built, we have to download the
on-chain program. Suppose the program was deployed at address
`7k3rzqoNQxgTLTooAvXriGBKYsd16bV3JMvatvXcBfNo`, then to download it:

```console
$ mkdir onchain
$ solana program dump 7k3rzqoNQxgTLTooAvXriGBKYsd16bV3JMvatvXcBfNo onchain/lido.so
Wrote program to onchain/lido.so
```

Note that if you have configured a network other than mainnet-beta in
`~/.config/solana/cli/config.yml`, this will dump from that network.
To override, pass `--url` and set it to e.g. `https://api.testnet.solana.com` or
`https://api.mainnet-beta.solana.com`.

The dumped file will *not* match `lido.so` that we built previously, because by
default, Solana pads programs with zeros during the initial deployment, to allow
room for future upgrades. The easiest way to verify, is to zero-pad our build of
the program as well, so we can make a fair comparison. First, note the file size
of the dumped program and of our build:

```console
$ stat onchain/lido.so build/lido.so
  File: onchain/lido.so
  Size: 1042528   	Blocks: 2040       IO Block: 4096   regular file
  ...
  File: build/lido.so
  Size: 521264    	Blocks: 1024       IO Block: 4096   regular file
```

Confirm that the dump is larger than our build, then pad our build to that size:

```console
$ cp build/lido.so build/lido-padded.so
$ truncate --size=1042528 build/lido-padded.so
```

Now we can confirm that the programs match:

```console
$ sha256sum build/lido-padded.so onchain/lido.so
350bae669da9b92ded86c0a89013160c42c4691d1cd5947a285b2e6657bb0c5b  build/lido-padded.so
350bae669da9b92ded86c0a89013160c42c4691d1cd5947a285b2e6657bb0c5b  onchain/lido.so
```
