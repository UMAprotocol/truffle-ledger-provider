const Web3 = require('web3')
const TransportHID = require('@ledgerhq/hw-transport-node-hid').default
const ProviderEngine = require('web3-provider-engine')
const ProviderSubprovider = require('web3-provider-engine/subproviders/provider.js')
const FiltersSubprovider = require('web3-provider-engine/subproviders/filters.js')
const createLedgerSubprovider = require('@ledgerhq/web3-subprovider').default


class LedgerProvider {
  constructor(options, url) {
    const getTransport = () => TransportHID.create()
    const ledger = createLedgerSubprovider(getTransport, options)

    this.engine = new ProviderEngine()
    this.engine.addProvider(ledger)
    this.engine.addProvider(new FiltersSubprovider())
    this.engine.addProvider(new ProviderSubprovider(new Web3.providers.HttpProvider(url)))
    this.engine.start()
  }

  sendAsync(...args) {
    this.engine.sendAsync(...args)
  }

  send(...args) {
    return this.engine.send.apply(this.engine, ...args)
  }

  getAddress() {
    return this.address
  }
}

module.exports = LedgerProvider
