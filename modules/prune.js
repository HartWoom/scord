module.exports = {
    help: 'Prunes your last x messages',
    cmd: 'prune',
    args: 1,

    run: (msg, args) => {
        let limit = parseInt(args[0]);

        if (limit === 0)
            msg.edit("Can't prune 0 message !")
                .then(() => {
                    setTimeout(() => {
                        msg.delete().catch(console.error);
                    }, 500)
                }).catch(console.error);
        else {
            msg.edit(`Pruning ${limit} messages...`)
                .catch(console.error);

            msg.channel.fetchMessages({
                limit: limit,
                before: msg.id
            })
                .then(messages => {
                    messages.filter(m => m.author.id === msg.author.id).deleteAll();
                    msg.delete().catch(console.error);
                })
                .catch(console.error);
        }
    }
};
