const { MessageEmbed } = require("discord.js")
const profileModel = require('../profile-schema')

module.exports = {
    name: 'inv',
    description: 'View your inventory',
    fulldesc: 'View your item amounts and how rich/poor u are :P',
    category: 'currency',
    callback: async (message, args, client, profileData, pingedUser) => {
        if(!pingedUser.profileData){
            return message.reply('That user does not have a Kokomi profile!')
        }

        const itemNames = {
            sangoPearls: `${client.emojis.cache.get('946927536682721331')} **Sango Pearls**`,
            dewOfRepudiation: `${client.emojis.cache.get('946931162335547402')} **Dew of Repudiation**`,
            specter1: `${client.emojis.cache.get('950930008690524240')} **Spectral Husk**`,
            specter2: `${client.emojis.cache.get('950930023471280150')} **Spectral Heart**`,
            specter3: `${client.emojis.cache.get('950930034800091147')} **Spectral Nucleus**`,
        }

        let inv = '';
        for(const item in pingedUser.profileData.items){
            if(pingedUser.profileData.items[item]>0){
                inv = `${inv}${itemNames[item]}: ${pingedUser.profileData.items[item]}\n`
            }
        }

        const embed = new MessageEmbed()
            .setAuthor({ name: `${pingedUser.user.username}'s inventory`, iconURL: `https://cdn.discordapp.com/avatars/${pingedUser.user.id}/${pingedUser.user.avatar}.webp` })
            .setDescription(inv)
            /*.setDescription(`${client.emojis.cache.get('946927536682721331')} **Sango Pearls**: ${pingedUser.profileData.items.sangoPearls}
            \n${client.emojis.cache.get('946931162335547402')} **Dew of Repudiation**: ${pingedUser.profileData.items.dewOfRepudiation}`)*/

        message.channel.send({embeds: [embed]})
    }
}