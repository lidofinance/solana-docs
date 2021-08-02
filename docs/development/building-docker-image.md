---
title: dockerimage
description: Notes for building the Lido for Solana Docker image
keywords:
 - development
 - developers
 - lido
 - solana
 - docker
 - container
sidebar_position: 3
---

# Buiding a Docker image locally

In cases where there isn't a need to run the testnet (i.e. a local validator) and all that is required is the packaging of the Lido for Solana code and access to the Solana toolchain; there is the option of building a local container image.

## Prerequisites

Building a local version of the container requires that you have Docker installed but also the Rust toolchain.

- [Docker](https://docs.docker.com/engine/install/)
- [Rust](https://www.rust-lang.org/tools/install)

## Building

To build the local image use the buildimage.sh script.  This will build and package Lido for Solana along with the Solana toolchain into an image:

```Docker
chorusone/solido:hash
```
Where *hash* will be the git hash of the current version of the code base.

## Running the container

Once built, one can execute into the container interactively:

```bash
docker run -it --rm chorusone/solido:hash /bin/sh
```

This will provide a shell into the working directory where the Lido for Solana artefacts and the Solana toolchain are located. Inside the container, the Lido for Solana build artefacts are located in the **solido** directory which has the following structure:

- /solido
  - /cli
  - /deploy

The *cli* directory contains the solido cli artefacts.  The *deploy* directory contains the artefacts for the on-chain programs for Lido for Solana.


