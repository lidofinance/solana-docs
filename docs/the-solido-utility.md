# The Solido utility

Lido for Solana consists of an on-chain program, a web-based frontend for users
to interact with it, and a command-line client for governance and maintenance to
interact with it. This command-line client is called `solido`. It is used for:

 * Creating a new Solido instance. This is only done once on mainnet, but we do
   it often on a local validator for testing.
 * Creating a new multisig instance, and approving and executing multisig
   transactions.
 * Creating multisig transactions for governance operations (adding validators,
   changing the fees).
 * Running [the maintenance daemon](maintenance.md).
 * Inspecting a Solido instance, to show the current status.
 * Making deposits and withdrawals. These are indended for testing, end
   users are expected to use the webinterface instead.

## Obtaining Solido

You can either build `solido` from [source][source] with Cargo, or use the
[`chorusone/solido-maintainer`][dockerhub] container image that includes a
prebuilt version. The utility is developed and tested on Linux, and it should
run on Mac as well.

[source]: https://github.com/ChorusOne/solido
[dockerhub]: https://hub.docker.com/r/chorusone/solido-maintainer

## Configuration

The `solido` program needs to know a few things before it can interact with the
on-chain program:

 * The network to connect to (mainnet-beta, testnet, or possibly a local test
   validator).
 * The address of the Solido program, and the address of the Solido instance.
 * Possibly the address of the multisig program, and the address of the multisig
   instance.
 * When signing, the key pair to sign with.

These can be configured in three ways:

 * With command-line arguments. See `solido --help` for more details.
 * With environment variables. The names are the same as the command-line
   options, but uppercase, with underscores instead of dashes, and prefixed with
   `SOLIDO_`. For example, to provide `--keypair-path` through an environment
   variable, set `SOLIDO_KEYPAIR_PATH`.
 * With a json configuration file, that contains an object with options. The
   names are the same as the command-line options, but with underscores instead
   of dashes. For example, to set `--keypair-path` in a config file, write the
   following to `solido.json`:

   ```json
   {
     "keypair_path": "/home/users/lido/.config/solana/id.json"
   }
   ```

   Then run `solido` with `--config solido.json` to use this config file.

When an option is provided in multiple places, the command-line takes
precedence, then the config file, then the environment variable, and if that is
not set either, the default value is used, if possible.

For sample configuration files with the right addresses set up, see
[the deployments page](deployments).

## Using a hardware wallet

The `--keypair-path` can point to a keypair file generated with `solana-keygen`,
or it can be a URI that starts with `usb://` to use a hardware wallet. Some
examples:

 * `usb://ledger` to connect to a Ledger and use its default key.
 * `usb://ledger?key=0` to select the key by derivation path.

See [the Solana documentation on hardware wallets][solana-hww] for more
information.

[solana-hww]: https://docs.solana.com/wallet-guide/hardware-wallets
