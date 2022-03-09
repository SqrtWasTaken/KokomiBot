const { MessageEmbed } = require("discord.js");
const profileModel = require('../profile-schema');

module.exports = {
    name: 'hunt',
    description: 'Go on an adventure for xp!',
    fulldesc: 'Go on a hunting trip to collect spectral drops and XP\n**Rewards:** 1-5 Spectral Husk, 0-2 Spectral Heart, 0-1 Spectral Nucleus',
    category: 'currency',
    cooldown: 60,
    callback: async (message, args, client, profileData) => {
        const huntMsg = ['You take a waverider to Watatsumi and slap some specters in the face.']

        let x = Math.floor(Math.random()*300)+201
        let s1 = Math.floor((Math.random()**2)*5)+1
        let s2 = Math.floor((Math.random()**2)*3)
        let s3 = Math.random();
        if(s3>0.1){
            s3 = 0
        } else {
            s3 = 1
        }

        let desc = `${huntMsg}\nYou collected ${s1} ${client.emojis.cache.get('950930008690524240')} Spectral Husk`;
        if(s2>0){
            desc = `${desc}, ${s2} ${client.emojis.cache.get('950930023471280150')} Spectral Heart`
        }
        if(s3>0){
            desc = `${desc}, ${s3} ${client.emojis.cache.get('950930034800091147')} Spectral Nucleus`
        }

        desc = `${desc}\nYou gained ${x} ${client.emojis.cache.get('950927930178023496')} XP`

        const embed = new MessageEmbed()
            //.setFooter({text: 'k$kokomi to view your xp and progression'})
            .setDescription(desc)
        
        await profileModel.findOneAndUpdate(
            { userID: message.author.id },
            { $inc: { "progression.xp": x, "items.specter1": s1, "items.specter2": s2, "items.specter3": s3 } }
        )

        message.reply({embeds: [embed]});
    }
}