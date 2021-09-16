const Command = require('../../Structures/Command')
const { MessageEmbed, Permissions } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

class Kick extends Command {
  constructor (client) {
    const commandBuilder = new SlashCommandBuilder()
      .setName('kick')
      .setDescription('Kicks a user.')
      .addUserOption(option =>
        option.setName('user')
          .setDescription('The user to kick')
          .setRequired(true))
      .addStringOption(option =>
        option.setName('reason')
          .setDescription('Why you are kicking the user (will be set to "None Provided" if not provided)')
          .setRequired(false))
    const options = {
      guildonly: true,
      permissions: Permissions.FLAGS.BAN_MEMBERS
    }
    super(client, commandBuilder, options)

    this.data = commandBuilder
  }

  async run (client, interaction) {
    const offender = interaction.options.getMember('user')

    let reason = 'No reason provided'

    if (interaction.options.getString('reason')) reason = interaction.options.getString('reason')

    if (offender === interaction.member) return await interaction.reply({ content: 'You can\'t do that to yourself!', ephemeral: true })
    if (!offender.bannable) return await interaction.reply({ content: ` I'm missing permissions to ban ${offender.user.username}!\nEither they are above me or I don't have the **Ban Members** permission.`, ephemeral: true })
    const kickembed = new MessageEmbed()
      .setTitle('Member kicked')
      .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
      .addField(offender.user.tag, 'was kicked')
      .addField('Moderator', interaction.user.tag)
      .addField('Reason', reason)
      .setColor('RED')
      .setThumbnail(offender.user.displayAvatarURL({ dynamic: true }))
    offender.kick(reason)
    await interaction.reply({ embeds: [kickembed] })
    try { await offender.user.send(kickembed) } catch { interaction.channel.send('The user could not receive any details about this incident in DMs.') }
  }
}

module.exports = Kick
