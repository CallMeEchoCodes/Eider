import type { Bot } from '../Structures/Client'
import type { Event } from '../Types/Event'

const Ready: Event = {
  trigger: 'ready',
  type: 'once',
  run (Client: Bot): void {
    Client.Logger.info(`Logged In As ${Client.user.tag} 🚀!`)
  }
}

module.exports = Ready
