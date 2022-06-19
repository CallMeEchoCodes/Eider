import type { Bot } from '../Structures/Client'
import type { Event } from '../Types/Event'

const Ready: Event = {
  trigger: 'ready',
  type: 'once',
  run (Client: Bot): void {
    Client.Logger.log(`Logged In As ${Client.user.tag} 🚀!`, 'SUCCESS')
  }
}

module.exports = Ready
