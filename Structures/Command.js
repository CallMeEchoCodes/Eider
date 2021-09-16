const { Permissions } = require('discord.js')

class Command {
  constructor (client, slashcmd, options = { permissions: [Permissions.FLAGS.SEND_MESSAGES], guildonly: false }) {
    this.client = client
    this.data = slashcmd
    this.conf = {
      permissions: options.permissions || [Permissions.FLAGS.SEND_MESSAGES],
      guildonly: options.guildonly || false
    }
  }
}

module.exports = Command
