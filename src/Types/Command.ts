import type { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders'
import type { PermissionResolvable } from 'discord.js'

export type Command = {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
  guildonly?: boolean
  permissions?: PermissionResolvable[]
  cooldown?: number
  run: Function
}
