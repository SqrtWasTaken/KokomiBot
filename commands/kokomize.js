module.exports = {
    name: 'kokomize',
    description: 'Turn your message into kokomi',
    category: 'general',
    callback: (message, args) => {
        const n = args.join(' ');
        message.channel.send(`${n} is ${n}`);
    }
}