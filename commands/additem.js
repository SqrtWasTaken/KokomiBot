const profileModel = require('../profile-schema')

module.exports = {
    name: 'additem',
    description: 'literally op',
    fulldesc: 'pray to kokomi that i dont abuse this command',
    category: 'dev',
    callback: async (message, args, client, profileData) => {
        if(message.author.id === '745027768361943051'){
            if(args[1] === 's'){
                await profileModel.findOneAndUpdate(
                    { userID: args[2] },
                    { $inc: { sangoPearls: args[0] } }
                )
            } else if(args[1] === 'd'){
                await profileModel.findOneAndUpdate(
                    { userID: args[2] },
                    { $inc: { dewOfRepudiation: args[0] } }
                )
            }
            message.channel.send(`Added ${args[0]} items`)
        } else return message.channel.send('this is a sqrt only command :P')
    }
}