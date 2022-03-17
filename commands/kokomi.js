const { MessageEmbed } = require("discord.js");
const updateXP = require('../update-xp');

module.exports = {
    name: 'kokomi',
    description: 'is kokomi',
    fulldesc: 'kokomi is kokomi :pray:',
    category: 'general',
    callback: (message, args, client, profileData, target) => {
        if(!target.profileData){
            return message.reply('That user does not have a Kokomi profile!')
        }

        updateXP.update(target.user.id, 0);

        let level;

        for(const l of updateXP.levelXP){
            if(target.profileData.progression.xp<l){ //check level xp
                level = updateXP.levelXP.indexOf(l)
                break;
            }
        }

        //ascension check
        /*for(const asc of ascension){
            if(target.profileData.progression.xp<updateXP.levelXP[asc.lvl]){
                console.log(ascension.indexOf(asc));
                break;
            }
        }*/

        const embed = new MessageEmbed()
            .setAuthor({ name: `${target.user.username}'s Kokomi`, iconURL: `https://cdn.discordapp.com/avatars/${target.user.id}/${target.user.avatar}.webp` })
            .setDescription(`Level ${level}, ${target.profileData.progression.xp - updateXP.levelXP[level-1]}/${updateXP.levelXP[level] - updateXP.levelXP[level-1]} XP`)
        
        message.channel.send({embeds: [embed]})
    }
}