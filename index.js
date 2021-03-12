try {
  require("@babel/polyfill");
  // const Web3 = require('web3')
  const TransportHID = require('@ledgerhq/hw-transport-node-hid').default
  // const TransportU2F = require("@ledgerhq/hw-transport-u2f").default
  const ProviderEngine = require('@umaprotocol/web3-provider-engine')
  const ProviderSubprovider = require('@umaprotocol/web3-provider-engine/subproviders/provider.js')
  const RpcSubprovider = require('@umaprotocol/web3-provider-engine/subproviders/rpc.js')
  const InfuraSubprovider = require('@umaprotocol/web3-provider-engine/subproviders/infura.js')
  const FiltersSubprovider = require('@umaprotocol/web3-provider-engine/subproviders/filters.js')
  const NonceSubprovider = require('@umaprotocol/web3-provider-engine/subproviders/nonce-tracker.js')
  const createLedgerSubprovider = require('@umaprotocol/web3-subprovider').default


  class LedgerProvider {
    constructor(options, url) {
      const debug = false
      const getTransport = () => TransportHID.create()
      // const getTransport = () => TransportU2F.create()
      const ledger = createLedgerSubprovider(getTransport, options)
      if (debug) console.log('1')

      this.engine = new ProviderEngine()
      if (debug) console.log('2')

      this.engine.addProvider(new FiltersSubprovider())
      if (debug) console.log('3')

      this.engine.addProvider(new NonceSubprovider())
      if (debug) console.log('4')

      this.engine.addProvider(ledger)
      if (debug) console.log('5')

      // this.engine.addProvider(new ProviderSubprovider(new Web3.providers.HttpProvider(url)))
      this.engine.addProvider(new RpcSubprovider({rpcUrl: url}))
      if (debug) console.log('6')

      // this.engine.addProvider(new InfuraSubprovider({network: 'kovan'}))
      this.engine.start()
      if (debug) console.log('7')
    }

    sendAsync(...args) {
      this.engine.sendAsync(...args)
    }

    send(...args) {
      return this.engine.send(...args)
    }
  }

  module.exports = LedgerProvider

} catch(error) {
  class LedgerProviderError {
    constructor() {
      throw new Error("Truffle ledger provider was not correctly installed, so it cannot be constructed. Please use a different provider.");
    }
  }
}
