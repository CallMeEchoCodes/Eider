import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const Ping: Command = {
  data: new SlashCommandBuilder()
    .setName('activity')
    .setDescription('Sends a random activity for you to do.'),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    type ActivityObject = {
      activity: string
      type: string
      participants: number
      price: number
      link: string
      key: string
      accessibility: number
    }

    Interaction.deferReply()
    const res = (await axios.get('https://www.boredapi.com/api/activity/'))
    const data = res.data as ActivityObject

    const embed = new MessageEmbed()
      .setTitle('Activity for you:')
      .setColor('#6BA3FF')
      .setDescription(data.activity)
      .addField('Type:', data.type)
      .setFooter('Requested by ' + Interaction.user.tag, Interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    try {
      Interaction.editReply({ embeds: [embed] })
    } catch {
      Interaction.editReply('Something went wrong')
    }
  }
}

module.exports = Ping
