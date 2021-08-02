---
title: development
description: Overview of development in LIDO for Solana
keywords:
 - development
 - developers
 - lido
 - solana
sidebar_position: 1
---

# Development Overview

## Building the project

The project can be built in either of two ways: in the supplied container or locally.

### Building the container image

The [building the docker image](./building-docker-image.md) document gives detailed instructions on how to build and run the container supplied in the repo for testing and developing.

### Building locally

In order to build Lido for Solana locally, one will need a number of prerequisites:

- [Rust toolchain](https://www.rust-lang.org/learn/get-started)
- [Solana toolchain](https://docs.solana.com/cli/install-solana-cli-tools)
- Misc System Packages: libudev-dev, libhidapi-dev, pkg-config, openssl (these are the package names for Debian, please source equivalents for your OS is they are not already installed)

#### CLI

To build/test the CLI, one can use the normal cargo commands:

```rust
cargo build
cargo test
```

#### On-Chain Programs

For the on-chain parts of the repo, one must use the bpf equivalent commands:

```rust
cargo build-bpf
cargo test-bpf
```
> Note: The BPF commands require the Solana SDK to be installed as was previously stated.



## Specification

The [Specification](specification/specification.md) document is a deeper dive into the code of Lido for Solana to tour the intent and implementation of the on-chain program and the cli.

