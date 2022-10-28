/**********************************************************
 * @INFO  [TABLE OF CONTENTS]
 * 1  Import_Modules
 * 2  CREATE_THE_DISCORD_BOT_CLIENT
 * 3  Login_to_the_Bot
 * 4  Making_Collections
 * 5  Running_handlers
 * 6  Exporting_Client
 * 
 * 
 *   BOT CODED BY: OnionDev#1885 | https://trgop.gq
 *********************************************************/


/**********************************************************
 * @param {1} Import_Modules for this FIle
 *********************************************************/
require('dotenv').config()

const { Client, Partials, Collection } = require('discord.js');
const ms = require('ms')
const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials
const config = require('../config')
const { promisify } = require('util')
const { glob } = require('glob')
const PG = promisify(glob)
const Ascii = require('ascii-table')


/**********************************************************
 * @param {2} CREATE_THE_DISCORD_BOT_CLIENT with some default settings and logging in
 *********************************************************/
const client = new Client({
    intents: 131071,
    partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent],
    allowedMentions: { parse: ["everyone", "users", "roles"] },
    rest: { timeout: ms('1m') }
})


/**********************************************************
 * @param {3} Login_to_the_Bot
 *********************************************************/
client.login(process.env.client_token)


/**********************************************************
 * @param {4} Making_Collections for commands and events
 *********************************************************/
client.events = new Collection()
client.commands = new Collection()


/**********************************************************
 * @param {5} Running_handlers
 *********************************************************/
const Handlers = ["Commands", "Events", "Errors"]
Handlers.forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
})


/**********************************************************
 * @param {6} Exporting_Client to all the other files
 *********************************************************/
module.exports = client



/**********************************************************
 * @INFO
 * Bot Coded by OnionDev#1885 | https://trgop.gq
 * @INFO
 * Best Free Webhosting | https://freewh.gq
 * @INFO
 * Please mention me (OnionDev) when using this Code!
 * @INFO
 *********************************************************/