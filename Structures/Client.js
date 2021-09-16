const { Client, Collection, Intents } = require('discord.js')
const { Logger } = require('../Utilities/Logger')
const { readdirSync } = require('fs')

module.exports.Bot = class Bot extends Client {
  constructor () {
    const config = require('../config.json')
    const props = {
      presence: config.presence,
      partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
      intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS]
    }

    super(props)

    this.config = config

    this.commands = new Collection()

    const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'))
    const commandFolders = readdirSync('./commands')

    for (const file of eventFiles) {
      const event = new (require(`../Events/${file}`))(this)
      if (event.trigger === 'once') super.once(event.type, (...args) => event.run(...args))
      else super.on(event.type, (...args) => event.run(...args))

      Logger.log(`Loaded ${file} - ${event.type} Event`, 'info')
    }

    for (const folder of commandFolders) {
      if (folder.endsWith('.js')) return Logger.log(`Command ${folder} is not in a subdirectory! It has been ignored, please move it.`, 'warn')

      const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))

      for (const file of commandFiles) {
        const command = new (require(`../Commands/${folder}/${file}`))(this)

        this.commands.set(command.data.name, command)
        Logger.log(`Loaded ${file} - ${command.data.name} Command`, 'info')
      }
    }
  }

  login (token) {
    if (!this.config.token) {
      Logger.log('You didn\'t provide a token in config.json!', 'error')
      process.exit(1)
    }
    super.login(token)
    return this
  }
}
