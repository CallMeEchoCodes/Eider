const { Logger } = require('../Utilities/Logger')

module.exports = class {
  constructor (client) {
    this.client = client
    this.trigger = 'once'
    this.type = 'ready'
  }

  run (client) {
    Logger.log(`Logged In As ${client.user.tag} 🚀!`, 'info')
  }
}
