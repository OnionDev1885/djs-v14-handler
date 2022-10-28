const { Client, ActivityType } = require('discord.js')
const ms = require('ms')
const config = require('../../config')

module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client
     */

    async execute(client) {
        const { user, ws } = client

        console.log(`${user.tag} is now online!`)

        user.setActivity({
            name: config.client.status.name,
            type: config.client.status.type
        })
        user.setStatus(config.client.status.mode)
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