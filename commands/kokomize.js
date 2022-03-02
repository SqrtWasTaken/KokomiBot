module.exports = {
    name: 'kokomize',
    description: 'Turn your message into kokomi',
    category: 'general',
    callback: (message) => {
        const n = message.content.slice(11);
        message.channel.send(`${n} is ${n}`);
    }
}