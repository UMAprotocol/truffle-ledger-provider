const Web3 = require('web3')
const TransportHID = require('@ledgerhq/hw-transport-node-hid').default
// const TransportU2F = require("@ledgerhq/hw-transport-u2f").default
const ProviderEngine = require('web3-provider-engine')
const ProviderSubprovider = require('web3-provider-engine/subproviders/provider.js')
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js')
const InfuraSubprovider = require('web3-provider-engine/subproviders/infura.js')
const FiltersSubprovider = require('web3-provider-engine/subproviders/filters.js')
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js')
const createLedgerSubprovider = require('@ledgerhq/web3-subprovider').default


class LedgerProvider {
  constructor(options, url) {
    const getTransport = () => TransportHID.create()
    // const getTransport = () => TransportU2F.create()
    const ledger = createLedgerSubprovider(getTransport, options)

    this.engine = new ProviderEngine()
    this.engine.addProvider(new FiltersSubprovider())
    this.engine.addProvider(new NonceSubprovider())
    this.engine.addProvider(ledger)
    // this.engine.addProvider(new ProviderSubprovider(new Web3.providers.HttpProvider(url)))
    this.engine.addProvider(new RpcSubprovider({rpcUrl: url}))
    // this.engine.addProvider(new InfuraSubprovider({network: 'kovan'}))
    this.engine.start()
  }

  sendAsync(...args) {
    this.engine.sendAsync(...args)
  }

  send(...args) {
    return this.engine.send(...args)
  }
}

module.exports = LedgerProvider
