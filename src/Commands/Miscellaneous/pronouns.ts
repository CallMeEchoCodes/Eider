import { SlashCommandBuilder } from '@discordjs/builders'
import { GuildMember, MessageEmbed } from 'discord.js'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'
import axios from 'axios'

const Pronouns: Command = {
  data: new SlashCommandBuilder()
    .setName('pronouns')
    .setDescription('See a users pronouns (using pronounDB).')
    .addUserOption(option =>
      option.setName('user')
        .setRequired(true)
        .setDescription('The user to get the pronouns of.')
    ),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    type PronounObj = {
      pronouns: string
    }
    const member = Interaction.options.getMember('user') as GuildMember

    const { data } = await axios.get(`https://pronoundb.org/api/v1/lookup?platform=discord&id=${member.id}`)
    const res = data as PronounObj

    let pronouns = ''

    switch (res.pronouns) {
      case 'unspecified':
        pronouns = 'Unspecified'
        break
      case 'hh':
        pronouns = 'He/Him'
        break
      case 'hi':
        pronouns = 'He/It'
        break
      case 'hs':
        pronouns = 'He/She'
        break
      case 'ht':
        pronouns = 'He/They'
        break
      case 'ih':
        pronouns = 'It/Him'
        break
      case 'ii':
        pronouns = 'It/Its'
        break
      case 'is':
        pronouns = 'It/She'
        break
      case 'it':
        pronouns = 'It/They'
        break
      case 'shh':
        pronouns = 'She/He'
        break
      case 'sh':
        pronouns = 'She/Her'
        break
      case 'si':
        pronouns = 'She/It'
        break
      case 'st':
        pronouns = 'She/They'
        break
      case 'th':
        pronouns = 'They/He'
        break
      case 'ti':
        pronouns = 'They/It'
        break
      case 'ts':
        pronouns = 'They/She'
        break
      case 'tt':
        pronouns = 'They/Them'
        break
      case 'any':
        pronouns = 'Any pronouns'
        break
      case 'other':
        pronouns = 'Other pronouns'
        break
      case 'ask':
        pronouns = 'Ask me my pronouns'
        break
      case 'avoid':
        pronouns = 'Avoid pronouns, use my name'
    }

    const embed = new MessageEmbed()
      .setColor('#262626')
      .setTitle('PronounDB')
      .setDescription(`The pronouns of ${member.user.tag} are: ${pronouns}`)
      .setTimestamp()

    await Interaction.reply({ embeds: [embed] })
  }
}

module.exports = Pronouns
