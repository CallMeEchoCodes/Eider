import { Collection } from 'discord.js'
import type { CommandInteraction, GuildMember } from 'discord.js'
import type { Bot } from '../Structures/Client'
import type { Command } from '../Types/Command'
import type { Event } from '../Types/Event'

const CommandHandler: Event = {
  trigger: 'interactionCreate',
  type: 'on',
  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    if (!Interaction.isCommand()) return

    const Command: Command = Client.commands.get(Interaction.commandName)
    if (!Command) return await Interaction.reply({ content: 'There was an error while executing that command!', ephemeral: true })

    if (Command.guildonly && !Interaction.guild) return await Interaction.reply({ content: 'That command can only be used in a guild!', ephemeral: true })

    if (!Client.cooldowns.has(Command.data.name)) Client.cooldowns.set(Command.data.name, new Collection())

    const now = Date.now()
    const timestamps = Client.cooldowns.get(Command.data.name)
    const cooldownAmount = (Command.cooldown || 3) * 1000

    if (timestamps.has(Interaction.user.id)) {
      const expirationTime = timestamps.get(Interaction.user.id) + cooldownAmount

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000
        return await Interaction.reply({ content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${Command.data.name}\` command.`, ephemeral: true })
      }
    }

    timestamps.set(Interaction.user.id, now)
    setTimeout(() => timestamps.delete(Interaction.user.id), cooldownAmount)

    const Member = Interaction.member as GuildMember // Required for the permissions check to work. This is caused by Interaction.member being ?GuildMember | ?APIGuildMember instead of ?GuildMember.
    if (Command.permissions !== undefined) if (!Member.permissions.has(Command.permissions)) return await Interaction.reply({ content: 'You don\'t have permission to use that command!', ephemeral: true })
    if (Command.permissions !== undefined) if (!(await Member.guild.members.fetch(Client.config.clientID)).permissions.has(Command.permissions)) return await Interaction.reply({ content: 'I don\'t have permission to use that command!', ephemeral: true })

    try {
      Command.run(Client, Interaction)

      Client.database.createTable('overallData', ['messageCount BIGINT', 'commandCount BIGINT'])
      const valueCommand = await Client.database.selectColumnAll('overallData', 'commandCount')
      const valueMessage = await Client.database.selectColumnAll('overallData', 'messageCount')
      if (valueCommand[0] === undefined) { return await Client.database.insert('overallData', ['messageCount', 'commandCount'], [0, 1]) }
      Client.database.query(`UPDATE overallData SET commandCount = ${valueCommand[0].commandCount + 1}`)
      Client.database.query(`UPDATE overallData SET messageCount = ${valueMessage[0].messageCount - 1}`)
    } catch (err) {
      Client.Logger.error(`Failed to run ${Command.data.name} for user ${Interaction.user.tag}.`, err)
      return await Interaction.reply({ content: 'There was an error while executing that command! My developer has been notified.', ephemeral: true })
    }
  }
}

module.exports = CommandHandler
