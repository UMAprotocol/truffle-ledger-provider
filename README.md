# Fork
This is a fork of https://github.com/hussy-io/truffle-ledger-provider that actually works.  Now works with web3 1.0 and truffle 5!  Probably won't work for older web3 versions, but commit https://github.com/deconet/truffle-ledger-provider/commit/b184bcb55dfaf4bf372490af5268f31190d4b136 may work with older web3 versions.

# truffle-ledger-provider

Ledger Wallet-enabled Web3 provider. Use it to sign transactions with Ledger Nano S or Ledger Blue.

## Install

```sh
$ npm i truffle-ledger-provider -S
```

## General Usage

You can use this provider wherever a Web3 provider is needed, not just in Truffle. For Truffle-specific usage, see next section.

Before using Ledger Wallet-enabled Web3 provider, you must change your Ledger App configuration as follows:

- Contract data: Yes
- Browser Support: No

```js
const LedgerWalletProvider = require('truffle-ledger-provider');

const ledgerOptions = {
  networkId: 1, // mainnet
  path: "44'/60'/0'/0", // ledger default derivation path
  askConfirm: false,
  accountsLength: 1,
  accountsOffset: 0,
};

const provider = new LedgerWalletProvider(ledgerOptions, 'http://localhost:8545');
```

### Parameters:

- `network`: `number`. Ethereum network ID. 1-mainnet, 3-ropsten, etc.
- `path`: `string`. HD derivation path.
- `askConfirm`: `boolean`. If true, deployment of each contract must be confirmed.
- `accountsLength`: `number`. Number of accounts to derivate.
- `accountsOffset`: `number`. Offset index to use to start derivating the accounts.

## Truffle Usage

You can easily use this within a Truffle configuration. For instance:

truffle.js

```js
const LedgerWalletProvider = require('truffle-ledger-provider');

const INFURA_APIKEY = '...'; // set your Infura API key
const ledgerOptions = {}; // use default options

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
    },
    ropsten: {
      provider: new LedgerWalletProvider(ledgerOptions, `https://ropsten.infura.io/${INFURA_APIKEY}`),
      network_id: 3,
      gas: 4600000,
    },
  },
};
```
