import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed, Permissions } from 'discord.js'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const Unban: Command = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unbans a user.')
    .addStringOption(option =>
      option.setName('id')
        .setDescription('The user id to unban')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason you are unbanning this user (will be set to "None Provided" if not provided)')
        .setRequired(false)),

  guildonly: true,
  permissions: Permissions.FLAGS.BAN_MEMBERS,

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    let reason = 'No reason provided'

    if (Interaction.options.getString('reason')) reason = Interaction.options.getString('reason')
    const UnbannedUser = (await Interaction.guild.bans.fetch()).find(b => b.user.id === Interaction.options.getString('id'))
    if (UnbannedUser === Interaction.member) return await Interaction.reply({ content: 'You can\'t do that to yourself!', ephemeral: true })
    const banembed = new MessageEmbed()
      .setTitle('Member unbanned')
      .setAuthor(Interaction.user.tag, Interaction.user.displayAvatarURL({ dynamic: true }))
      .addFields([
        {
          name: UnbannedUser.user.tag,
          value: 'was unbanned'
        },
        {
          name: 'Moderator',
          value: Interaction.user.tag
        },
        {
          name: 'Reason',
          value: reason
        }
      ])
      .setColor('GREEN')
      .setThumbnail(UnbannedUser.user.displayAvatarURL({ dynamic: true }))
    Interaction.guild.members.unban(UnbannedUser.user)
    await Interaction.reply({ embeds: [banembed] })
    try { await UnbannedUser.user.send({ embeds: [banembed] }) } catch { Interaction.channel.send('The user could not receive any details about this incident in DMs.') }
  }
}

module.exports = Unban
