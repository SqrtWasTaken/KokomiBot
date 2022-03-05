module.exports = {
    name: 'dekokomize',
    description: 'b a n',
    fulldesc: 'Ban a member for being unworthy of kokomi\n`dekokomize [member]`',
    category: 'moderator',
    permissions: ['BAN_MEMBERS'],
    callback: (message, args, client, profileData, pingedUser) => {
        if(pingedUser.user === message.author || !args[0]){
            return message.channel.send('Please provide a valid user (that isn\'t yourself)!')
        }
        if(!(pingedUser.guildMember.bannable)){
            return message.channel.send('Cannot ban this user!')
        }

        //pingedUser.guildMember.ban()
        message.guild.members.ban(pingedUser.user.id, { reason: 'Kokomi deemed this user unworthy'})
        message.channel.send(`${pingedUser.user.username} was banned for being unworthy of Kokomi ${client.emojis.cache.get('943704300553662474')}`)
        pingedUser.user.send(`You have been banned from ${message.guild.name}.`)
    }
}