import type { Message } from 'discord.js'
import type { Bot } from '../Structures/Client'
import type { Event } from '../Types/Event'

const MessageCounter: Event = {
  trigger: 'messageCreate',
  type: 'on',
  async run (Client: Bot, message: Message): Promise<void> {
    Client.database.createTable('overallData', ['messageCount BIGINT', 'commandCount BIGINT'])
    const value = await Client.database.selectColumnAll('overallData', 'messageCount')
    if (value[0] === undefined) { return await Client.database.insert('overallData', ['messageCount', 'commandCount'], [1, 0]) }
    Client.database.query(`UPDATE overallData SET messageCount = ${value[0].messageCount + 1}`)
  }
}

module.exports = MessageCounter
