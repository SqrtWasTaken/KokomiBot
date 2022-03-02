module.exports = {
    name: 'kokoguide',
    description: 'View the best guides on kokomi',
    fulldesc: 'kokomi guides bc im too lazy to make my own',
    category: 'misc',
    callback: (message) => {
        message.channel.send('https://keqingmains.com/kokomi/\nhttps://genshin-impact.fandom.com/wiki/Sangonomiya_Kokomi');
    }
}