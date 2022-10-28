const { Events } = require('../Validation/EventNames')

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Events Loaded")
    Table.setHeading("Event Name", "Status", "Error")

    const EventFiles = await PG(`${process.cwd()}/Events/*/*.js`)

    EventFiles.map(async file => {
        const event = require(file)

        if (!Events.includes(event.name) || !event.name) {
            const L = file.split("/")

            await Table.addRow(`${event.name || "MISSING"}`, "FAILED", `Event name is either not valid or missing: ${L[6] + '/' + L[7] + '/' + L[8]}`)
            return
        }

        if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
        else client.on(event.name, (...args) => event.execute(...args, client))

        await Table.addRow(event.name, "SUCCESSFUL", "No Error")
    })

    console.log(Table.toString())
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