const Command = require('../../Structures/Command')
const { MessageEmbed, Permissions } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

class Ban extends Command {
  constructor (client) {
    const commandBuilder = new SlashCommandBuilder()
      .setName('ban')
      .setDescription('Bans a user.')
      .addUserOption(option =>
        option.setName('user')
          .setDescription('The user to ban')
          .setRequired(true))
      .addStringOption(option =>
        option.setName('reason')
          .setDescription('Why you are banning the user (will be set to "None Provided" if not provided)')
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
    const banembed = new MessageEmbed()
      .setTitle('Member banned')
      .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
      .addField(offender.user.tag, 'was banned')
      .addField('Moderator', interaction.user.tag)
      .addField('Reason', reason)
      .setColor('RED')
      .setThumbnail(offender.user.displayAvatarURL({ dynamic: true }))
    offender.ban({ days: 7, reason: reason })
    await interaction.reply({ embeds: [banembed] })
    try { await offender.user.send(banembed) } catch { interaction.channel.send('The user could not receive any details about this incident in DMs.') }
  }
}

module.exports = Ban
