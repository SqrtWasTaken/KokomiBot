const { MessageEmbed } = require("discord.js");
const commandHandler = require("../command-handler");

module.exports = {
    name: 'help',
    description: 'view all commands and their uses',
    fulldesc: 'View a command, category, or other info\n`k$help [command/category/item]`',
    category: 'general',
    callback: (message, args, client, commands) => {
        const categories = ['general', 'currency', 'dev', 'misc', 'moderator']
        const embed = new MessageEmbed()
        //.setDescription('Commands: `help`, `ping`, `pray`, `kokomi`, `kokomize [text]`, `kokoguide`')
        .setColor('BLURPLE')
        .setFooter({text: 'add k$ before every command!'})

        if(args[0] in commands){
            embed.setTitle(args[0]).setDescription(commands[args[0]].fulldesc)
        } else if(categories.includes(args[0])){
            embed.setTitle(`${args[0][0].toUpperCase() + args[0].substring(1)} commands`)
            for(cmd in commands){
                if(commands[cmd].category===args[0]){
                    embed.addField(commands[cmd].name, commands[cmd].description)
                }
            }
        } else if(args[0]===undefined) {
            embed.setTitle('Kokomi welcomes you!').setURL('https://www.bilibili.com/video/BV1654y1J7JD')
            for(const c of categories){
                embed.addField(c, `\`k$help ${c}\``, true)
            }
        } else {
            embed.setTitle('Help').setDescription('Kokomi is confused!\nView other commands with `k$help`')
        }

        /*for(cmd in commands){
            if(!(commands[cmd].category === 'dev')){
                embed.addFields({name: commands[cmd].name, value: commands[cmd].description})
            }
        }*/

        message.channel.send({embeds: [embed]})
    }
}