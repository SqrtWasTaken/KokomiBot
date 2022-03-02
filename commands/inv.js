const { MessageEmbed } = require("discord.js")
const profileModel = require('../profile-schema')

module.exports = {
    name: 'inv',
    description: 'View your inventory',
    fulldesc: 'View your item amounts and how rich/poor u are :P',
    category: 'currency',
    callback: async (message, args, client, profileData, pingedUser) => {
        const embed = new MessageEmbed()
            .setAuthor({ name: `${pingedUser[1]}'s inventory`, iconURL: `https://cdn.discordapp.com/avatars/${pingedUser[0]}/${pingedUser[2]}.webp` })
            .setDescription(`${client.emojis.cache.get('946927536682721331')} **Sango Pearls**: ${pingedUser[3].sangoPearls}
            \n${client.emojis.cache.get('946931162335547402')} **Dew of Repudiation**: ${pingedUser[3].dewOfRepudiation}`)

        message.channel.send({embeds: [embed]})
    }
}