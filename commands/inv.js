const { MessageEmbed } = require("discord.js")
const profileModel = require('../profile-schema')

module.exports = {
    name: 'inv',
    description: 'View your inventory',
    fulldesc: 'View your item amounts and how rich/poor u are :P',
    category: 'currency',
    callback: async (message, args, client, profileData, pingedUser) => {
        const embed = new MessageEmbed()
            .setAuthor({ name: `${pingedUser.user.username}'s inventory`, iconURL: `https://cdn.discordapp.com/avatars/${pingedUser.user.id}/${pingedUser.user.avatar}.webp` })
            .setDescription(`${client.emojis.cache.get('946927536682721331')} **Sango Pearls**: ${pingedUser.profileData.sangoPearls}
            \n${client.emojis.cache.get('946931162335547402')} **Dew of Repudiation**: ${pingedUser.profileData.dewOfRepudiation}`)

        message.channel.send({embeds: [embed]})
    }
}