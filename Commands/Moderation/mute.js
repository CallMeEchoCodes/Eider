const Command = require('../../Structures/Command')
const { MessageEmbed, Permissions } = require('discord.js')
const ms = require('ms')
const { SlashCommandBuilder } = require('@discordjs/builders')

class Mute extends Command {
  constructor (client) {
    const commandBuilder = new SlashCommandBuilder()
      .setName('mute')
      .setDescription('Mutes a user.')
      .addUserOption(option =>
        option.setName('user')
          .setDescription('The user to mute.')
          .setRequired(true)
      )
      .addStringOption(option =>
        option.setName('time')
          .setDescription('Time to mute the user for. If the time is invalid they will be muted permanently (format 10h, 10m)')
          .setRequired(true)
      )
      .addStringOption(option =>
        option.setName('reason')
          .setDescription('Why you are muting the user')
      )
    const options = {
      guildonly: false,
      permissions: Permissions.FLAGS.MANAGE_ROLES
    }
    super(client, commandBuilder, options)

    this.data = commandBuilder
  }

  async run (client, interaction) {
    let muterole = interaction.guild.roles.cache.find(role => role.name === 'Muted')

    if (!muterole) {
      muterole = await interaction.guild.roles.create({
        name: 'Muted',
        color: '#000000',
        permissions: []
      })
    }

    const channels = await interaction.guild.channels.fetch()
    channels.forEach(async (channel, id) => {
      await channel.permissionOverwrites.create(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false
      })
    })

    const offender = interaction.options.getMember('user')
    const time = interaction.options.getString('time')

    if (offender === interaction.member) return await interaction.reply({ content: 'You can\'t do that to yourself!', ephemeral: true })

    let reason = 'No reason provided'

    if (interaction.options.getString('reason')) reason = interaction.options.getString('reason')

    const muteembed = new MessageEmbed()
      .setTitle('Member muted')
      .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
      .addField(offender.user.tag, 'was muted')
      .addField('Moderator', interaction.user.tag)
      .addField('Reason', reason)
      .addField('Time', time)
      .setColor('RED')
      .setThumbnail(offender.user.displayAvatarURL({ dynamic: true }))
    try {
      offender.roles.add(muterole)
    } catch {
      return await interaction.reply({ content: ` I'm missing permissions to ban ${offender.user.username}!\nEither they are above me or I don't have the **Ban Members** permission.`, ephemeral: true })
    }

    await interaction.reply({ embeds: [muteembed] })

    setTimeout(function () {
      try {
        offender.roles.remove(muterole)
      } catch {
        return true
      }
    }, ms(time))
  }
}

module.exports = Mute
