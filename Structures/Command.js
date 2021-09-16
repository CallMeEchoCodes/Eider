const { Permissions } = require('discord.js')

class Command {
  /**
   *
   * @param {Discord.Client} client                - A Discord client
   * @param {Discord.SlashCommandBuilder} slashcmd - A Discord slash command builder
   * @param {Object} [options]                     - Options for the command
   */
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
