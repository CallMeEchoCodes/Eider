import { TextChannel } from 'discord.js'
import type { Bot } from '../Structures/Client'
import type { Event } from '../Types/Event'

const Ready: Event = {
  trigger: 'ready',
  type: 'once',
  run (Client: Bot): void {
    Client.Logger.info(`Logged In As ${Client.user.tag} 🚀!`)
    const statusChannel = Client.channels.cache.get('891133818214432859') as TextChannel

    statusChannel.send('Online!')
  }
}

module.exports = Ready
