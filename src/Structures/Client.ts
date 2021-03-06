import { Client, Collection, Intents } from 'discord.js'
import Simpllog from 'simpllog'
import { readdirSync } from 'fs'
import configFile from '../config.json'
import type { ClientOptions } from 'discord.js'
import type { Event } from '../Types/Event'
import type { config } from '../Types/config'
import type { Command } from '../Types/Command'

export class Bot extends Client {
  config: config
  Logger: Simpllog
  commands: Collection<unknown, Command>
  cooldowns: Collection<unknown, Collection<unknown, any>>
  constructor () {
    const props: ClientOptions = {
      presence: configFile.presence,
      partials: ['CHANNEL'],
      intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS]
    }

    super(props)

    this.Logger = new Simpllog({ production: configFile.production })
    this.config = configFile

    this.commands = new Collection()
    this.cooldowns = new Collection()
  }

  public Login (): void {
    if (this.config.token === '' || this.config.token === null) {
      this.Logger.log('The Token You Provided Was Invalid!', 'FATAL')
      process.exit(1)
    }
    try {
      super.login(this.config.token)
    } catch (error) {
      this.Logger.log('The Token You Provided Was Invalid!', 'FATAL')
    }
  }

  public loadEvents (path: string): void {
    this.Logger.log('Loading Events...', 'INFO')
    const EventFiles = readdirSync(`${path}`).filter(file => file.endsWith('.js'))
    for (const EventFile of EventFiles) {
      const Event: Event = require(`.${path}/${EventFile}`)
      if (Event.type === 'once') super.once(Event.trigger, (...args) => Event.run(this, ...args))
      else super.on(Event.trigger, (...args) => Event.run(this, ...args))
      this.Logger.log(`Loaded ${EventFile} - ${Event.trigger} Event`, 'INFO')
    }
  }

  public loadCommands (path: string): void {
    this.Logger.log('Loading Commands...', 'INFO')
    const commandFolders = readdirSync(path)
    for (const folder of commandFolders) {
      if (folder.endsWith('.js')) {
        this.Logger.log(`Command ${folder} is not in a subdirectory! It has been ignored, please move it.`, 'WARN')
        continue
      }
      if (folder.endsWith('.map')) continue
      const commandFiles = readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'))
      for (const file of commandFiles) {
        const command = require(`.${path}/${folder}/${file}`)

        this.commands.set(command.data.name, command)
        this.Logger.log(`Loaded ${file} - ${command.data.name} Command`, 'INFO')
      }
    }
  }
}
