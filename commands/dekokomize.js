module.exports = {
    name: 'dekokomize',
    description: 'b a n',
    fulldesc: 'Ban a member for being unworthy of kokomi\n`dekokomize [member]`',
    category: 'moderator',
    permissions: ['BAN_MEMBERS'],
    aliases: ['ban'],
    callback: (message, args, client, profileData, target) => {
        console.log(message.guild.bans)
        if(target.user === message.author || !args[0]){
            return message.channel.send('Please provide a valid user (that isn\'t yourself)!');
        }
        if(!(target.guildMember.bannable)){
            return message.channel.send('Cannot ban this user!');
        }

        message.channel.send(`${target.user.username} was banned for being unworthy of Kokomi ${client.emojis.cache.get('943704300553662474')}`);
        target.user.send(`You have been banned from ${message.guild.name}.`);
        message.guild.members.ban(target.user.id, { reason: 'Kokomi deemed this user unworthy'});
    }
}