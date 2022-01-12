import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed, Permissions } from 'discord.js'
import type { CommandInteraction, GuildMember } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const Ban: Command = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to ban')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason you are banning this user (will be set to "None Provided" if not provided)')
        .setRequired(false)),

  guildonly: true,
  permissions: Permissions.FLAGS.BAN_MEMBERS,

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    const Offender = Interaction.options.getMember('user') as GuildMember

    let reason = 'No reason provided'

    if (Interaction.options.getString('reason')) reason = Interaction.options.getString('reason')

    if (Offender === Interaction.member) return await Interaction.reply({ content: 'You can\'t do that to yourself!', ephemeral: true })
    if (!Offender.bannable) return await Interaction.reply({ content: ` I'm missing permissions to ban ${Offender.user.username}!\nEither they are above me or I don't have the **Ban Members** permission.`, ephemeral: true })
    const banembed = new MessageEmbed()
      .setTitle('Member banned')
      .setAuthor(Interaction.user.tag, Interaction.user.displayAvatarURL({ dynamic: true }))
      .addFields([
        {
          name: Offender.user.tag,
          value: 'was banned'
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
      .setColor('RED')
      .setThumbnail(Offender.user.displayAvatarURL({ dynamic: true }))
    Offender.ban({ days: 7, reason: reason })
    await Interaction.reply({ embeds: [banembed] })
    try { await Offender.user.send({ embeds: [banembed] }) } catch { Interaction.channel.send('The user could not receive any details about this incident in DMs.') }
  }
}

module.exports = Ban
