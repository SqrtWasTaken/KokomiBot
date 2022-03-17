const { Collection, MessageEmbed, Permissions } = require('discord.js');
const fs = require('fs');
const getFiles = require('./get-files');
const cooldowns = new Map();
const profileModel = require('./profile-schema');

module.exports = async (client) => {
    const commands = {};
    const suffix = '.js';
    const commandFiles = getFiles('./commands', suffix);

    //console.log(commandFiles);

    for (const command of commandFiles) {
        let commandFile = require(command);
        if (commandFile.default) commandFile = commandFile.default;

        const split = command.replace(/\\/g, '/').split('/');
        const commandName = split[split.length-1].replace(suffix, '');

        commands[commandName.toLowerCase()] = commandFile;
    }

    //console.log(commands);

    //message detection

    client.on('messageCreate', async (message) => {
        if(!message.content.startsWith('k$') || message.author.bot) return;

        let profileData;
        try {
            profileData = await profileModel.findOne({ userID: message.author.id });
            if(!profileData){
                let profile = await profileModel.create({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    items: {
                        sangoPearls: 0,
                        dewOfRepudiation: 0,
                        specter1: 0,
                        specter2: 0,
                        specter3: 0,
                    },
                    progression: {
                        xp: 0,
                        ascension: 0,
                    }
                })
                profile.save();
            }
        } catch (error) {
            console.log(error)
        }

        //aliases

        let cmd;

        const args = message.content.slice(2).split(/ +/);
        const commandName = args.shift().toLowerCase();
        for(const command in commands){
            if(commands[command].aliases && commands[command].aliases.includes(commandName)){
                cmd = commands[command];
            }
        }
        if(commands[commandName]){
            cmd = commands[commandName];
        }

        if (!cmd) return;

        //permissions

        if(cmd.permissions){
            let invalidPerms = [];
            cmd.permissions.forEach(p => {
                //console.log(p, cmd.permissions)
                if(!message.member.permissions.has(p)){
                    invalidPerms.push(p);
                }
            });
            if(invalidPerms.length>0){
                return message.channel.send(`${client.emojis.cache.get('943281858601443348')} You need the \`${invalidPerms.join(', ')}\` permission(s) to run this command!`)
            }
        }

        //cds haha losers

        if(!cooldowns.has(cmd)){
            cooldowns.set(cmd, new Collection());
        }

        const current_time = Date.now();
        const timestamps = cooldowns.get(cmd);
        const cd_amount = (cmd.cooldown) * 1000;

        if(timestamps.has(message.author.id)){
            const expiration_time = timestamps.get(message.author.id) + cd_amount;
            if(current_time<expiration_time){
                const time_left = (expiration_time-current_time)/1000;
                const embed = new MessageEmbed()
                    .setAuthor({ name: `${message.author.username}'s cooldown`, iconURL: message.author.avatarURL() })
                    .setTitle(`Please wait ${time_left.toFixed(0)}s before using this command again...`)
                    .setDescription('*Rest and rebuild!*')
                //return message.reply(`You can use this command again in \`${time_left.toFixed(0)}s\``);
                return message.reply({embeds: [embed]});
            }
        }

        timestamps.set(message.author.id, current_time);
        setTimeout(() => timestamps.delete(message.author.id), cd_amount);

        //ping, get data

        let target = {};

        if((message.mentions.users.size>0) && (args[0]===`<@!${message.mentions.users.first().id}>`)){
            target.user = message.mentions.users.first();
            target.guildMember = message.guild.members.cache.get(target.user.id)
            target.profileData = await profileModel.findOne({ userID: target.user.id });
            target.self = false;
        } else {
            target.user = message.author;
            target.profileData = profileData;
            target.self = true;
        }
        //console.log(target)

        try {
            if(commandName === 'help'){
                commands['help'].callback(message, args, client, commands);
            } else {
                cmd.callback(message, args, client, profileData, target);
            }
        } catch (error) {
            console.error(error);
        }
    })

}