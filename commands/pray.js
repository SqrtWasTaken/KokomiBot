const { MessageEmbed } = require("discord.js");
const profileModel = require('../profile-schema');

module.exports = {
    name: 'pray',
    description: 'p r a y for sango pearls :pray:',
    fulldesc: 'Pray to kokogod for sango pearls!\n**Rewards:** 5-10 Sango Pearls, 0-1 Dew of Repudiation',
    category: 'currency',
    cooldown: 10,
    callback: async (message, args, client, profileData) => {
        let s = Math.floor(Math.random()*69);
        if(s===0){
            s = 69;
        } else {
            s = Math.floor(Math.random()*6+5);
        }

        let d = Math.floor(Math.random()*200);
        if(!(d===1)){
            d = 0;
        }

        let desc = '';

        const embed = new MessageEmbed()
            .setFooter({text: 'k$inv to view your item amounts!'})

        desc = `${client.emojis.cache.get('943173282495070299')} You pay your respects to the goddess of war.
        \nYou are blessed by the Divine Priestess and receive **${s} ${client.emojis.cache.get('946927536682721331')} Sango Pearls.**`

        if(s===69){
            desc = `Kokomi became very noice and gave you **69 ${client.emojis.cache.get('946927536682721331')} Sango Pearls** ${client.emojis.cache.get('942222300986622042')}`
        }

        if(d===1){
            desc = `${desc}\nYou also got a ${client.emojis.cache.get('946931162335547402')} Dew of Repudiation!`
        }

        embed.setDescription(desc)
        
        await profileModel.findOneAndUpdate(
            { userID: message.author.id },
            { $inc: { "items.sangoPearls": s, "items.dewOfRepudiation": d } }
        )

        message.reply({embeds: [embed]});
    }
}