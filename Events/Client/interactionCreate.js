const { Client, CommandInteraction, InteractionType, EmbedBuilder } = require('discord.js')
const { ApplicationCommand } = InteractionType

module.exports = {
    name: 'interactionCreate',

    /**
     * @param { CommandInteraction } interaction
     * @param { Client } client
     */
    async execute(interaction, client) {
        const { user, guild, commandName, member, type } = interaction

        if (!guild || user.bot) return
        if (type !== ApplicationCommand) return

        const command = client.commands.get(commandName)

        // Error Handling
        // Command Not Found / Unable to get the command
        if (!command) {
            const noCommand = new EmbedBuilder()
                .setColor('Red')
                .setTitle('ERROR')
                .setDescription(`:x: | An Error occured while running the command!`)
                .setTimestamp()
                .setFooter({
                    text: `${client.user.username} | Coded by OnionDev#1885`,
                    iconURL: `${client.user.displayAvatarURL}`
                })

            interaction.reply({
                embeds: [noCommand],
                ephemeral: true
            }) && client.commands.delete(commandName)
            return
        }

        // User missing the required permissions
        if (command.UserPerms && command.UserPerms.length !== 0) {
            if (!member.permissions.has(command.UserPerms)) {
                const userPerms = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle('ERROR')
                    .setDescription(`:x: | You are missing the following permission(s) :\n> \`${command.UserPerms.join(", ")}\``)
                    .setTimestamp()
                    .setFooter({
                        text: `${client.user.username} | Coded by OnionDev#1885`,
                        iconURL: `${client.user.displayAvatarURL}`
                    })

                interaction.reply({
                    embeds: [userPerms],
                    ephemeral: true
                })
                return
            }
        }

        // Bot missing the required permissions
        const me = interaction.guild.members.cache.get(client.user.id)

        if (command.BotPerms && command.BotPerms.length !== 0) {
            if (!me.permissions.has(command.BotPerms)) {
                const botPerms = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle('ERROR')
                    .setDescription(`:x: | I am missing the following permission(s) :\n> \`${command.BotPerms.join(", ")}\``)
                    .setTimestamp()
                    .setFooter({
                        text: `${client.user.username} | Coded by OnionDev#1885`,
                        iconURL: `${client.user.displayAvatarURL}`
                    })

                interaction.reply({
                    embeds: [botPerms],
                    ephemeral: true
                })
                return
            }
        }

        // Executing Commands
        command.execute(interaction, client)
    }
}

/**********************************************************
 * @INFO
 * Bot Coded by OnionDev#1885 | https://trgop.gq
 * @INFO
 * Best Free Webhosting | https://freewh.gq
 * @INFO
 * Please mention me (OnionDev) when using this Code!
 * @INFO
 *********************************************************/