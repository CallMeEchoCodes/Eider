import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const Ping: Command = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('See the bots latency.')
    .setDescription('Replys with a yes/no answer to your question')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('The question to answer')
        .setRequired(true)),
  guildonly: false,
  cooldown: 5,
  permissions: [],

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    const answers = [
      'It is Certain.',
      'It is decidedly so.',
      'Without a doubt.',
      'Yes definitely.',
      'You may rely on it.',
      'As I see it, yes.',
      'Most likely.',
      'Outlook good.',
      'Yes.',
      'Signs point to yes.',
      'Reply hazy, try again.',
      'Ask again later.',
      'Better not tell you now.',
      'Cannot predict now.',
      'Concentrate and ask again.',
      'Don\'t count on it.',
      'My reply is no.',
      'My sources say no.',
      'Outlook not so good.',
      'Very doubtful.'
    ]

    const answer = Math.floor(Math.random() * answers.length)

    const embed = new MessageEmbed()
      .setColor('#050505')
      .setTitle('**Magic 8-Ball**')
      .setDescription(`**Your question**: ${Interaction.options.get('question').value} \n**Our Magic 8-Ball Says**: ${answers[answer]}`)

    await Interaction.reply({ embeds: [embed] })
  }
}

module.exports = Ping
