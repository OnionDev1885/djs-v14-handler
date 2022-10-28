const { Client, EmbedBuilder } = require('discord.js')
const config = require('../../config')

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const Embed = new EmbedBuilder()
        .setColor('Red')
        .setTimestamp()
        .setFooter({ text: 'Anti-Crash System | Coded by OnionDev#1885', iconURL: null })
        .setTitle('Error Encountered!')

    // Unhandled Rejection
    process.on("unhandledRejection", (reason, p) => {
        console.log(reason, p)

        const Channel = client.channels.cache.get(config.channel.error)
        if (!Channel) return

        Channel.send({
            embeds: [
                Embed
                    .setDescription(`**Unhandled Rejection/Catch: \n\n** \`\`\`\n${reason}\n\`\`\``)
            ]
        })
    })

    // Uncaught Exception
    process.on("uncaughtException", (err, origin) => {
        console.log(err, origin)

        const Channel = client.channels.cache.get(config.channel.error)
        if(!Channel) return

        Channel.send({
            embeds: [
                Embed
                .setDescription(`**Uncaught Exception/Catch: \n\n** \`\`\`\n${err}\n\`\`\`\nOrigin:\n\`\`\`\n${origin.toString()}\n\`\`\``)
            ]
        })
    })

    // Uncaught Exception Monitor
    process.on("uncaughtExceptionMonitor", (err, origin) => {
        console.log(err, origin)

        const Channel = client.channels.cache.get(config.channel.error)
        if(!Channel) return

        Channel.send({
            embeds: [
                Embed
                .setDescription(`**Uncaught Exception/Catch (MONITOR): \n\n** \`\`\`\n${err}\n\`\`\`\nOrigin:\n\`\`\`\n${origin.toString()}\n\`\`\``)
            ]
        })
    })
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