const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'inventory',
    description: 'View your inventory',
    fulldesc: 'View your item amounts and how rich/poor u are :P',
    category: 'currency',
    aliases: ['inv', 'items'],
    callback: async (message, args, client, profileData, target) => {
        if(!target.profileData){
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
        for(const item in target.profileData.items){
            if(target.profileData.items[item]>0){
                inv = `${inv}${itemNames[item]}: ${target.profileData.items[item]}\n`
            }
        }

        const embed = new MessageEmbed()
            .setAuthor({ name: `${target.user.username}'s inventory`, iconURL: `https://cdn.discordapp.com/avatars/${target.user.id}/${target.user.avatar}.webp` })
            .setDescription(inv)
            /*.setDescription(`${client.emojis.cache.get('946927536682721331')} **Sango Pearls**: ${pingedUser.profileData.items.sangoPearls}
            \n${client.emojis.cache.get('946931162335547402')} **Dew of Repudiation**: ${pingedUser.profileData.items.dewOfRepudiation}`)*/

        message.channel.send({embeds: [embed]})
    }
}