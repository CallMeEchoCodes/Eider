const { Client, Collection, Intents } = require('discord.js')
const { Logger } = require('../Utilities/Logger')
const { readdirSync } = require('fs')

module.exports.Bot = class Bot extends Client {
  constructor () {
    const config = require('../config.json')

    /**
     * Options for the client
     * @type {Object}
     * @property {Discord.Presence} presence - Discord Presence Data
     * @property {String[]} partials         - Client Partials
     * @property {Discord.Intents[]} intents - Client Intents
     */
    const props = {
      presence: config.presence,
      partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
      intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS]
    }

    super(props)

    /**
     * Options for the bot
     * @type {Object}
     * @property {String} token           - The bot token used to log in
     * @property {String} clientId        - The bots user id used to register slash commands
     * @property {String} guildId         - A guild id used to register guild specific slash commands
     * @property {String} owner           - The id of the bot owner, currently unused
     * @property {Discord.Presence} presence        - A presence object used for the bots presence data
     */
    this.config = config

    /**
     * A collection of the bots commands
     * @type {Discord.Collection}
     */
    this.commands = new Collection()

    const eventFiles = readdirSync('./Events').filter(file => file.endsWith('.js'))
    const commandFolders = readdirSync('./Commands')

    for (const file of eventFiles) {
      const event = new (require(`../Events/${file}`))(this)
      if (event.trigger === 'once') super.once(event.type, (...args) => event.run(...args))
      else super.on(event.type, (...args) => event.run(...args))

      Logger.log(`Loaded ${file} - ${event.type} Event`, 'info')
    }

    for (const folder of commandFolders) {
      if (folder.endsWith('.js')) return Logger.log(`Command ${folder} is not in a subdirectory! It has been ignored, please move it.`, 'warn')

      const commandFiles = readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'))

      for (const file of commandFiles) {
        const command = new (require(`../Commands/${folder}/${file}`))(this)

        this.commands.set(command.data.name, command)
        Logger.log(`Loaded ${file} - ${command.data.name} Command`, 'info')
      }
    }
  }

  /**
   * Logs the bot in
   * @returns {Discord.Client} A discord client
   */
  login (token) {
    if (!this.config.token) {
      Logger.log('You didn\'t provide a token in config.json!', 'error')
      process.exit(1)
    }
    super.login(token)
    return this
  }
}
