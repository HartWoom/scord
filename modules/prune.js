module.exports = {
    help: 'Prunes your last x messages',
    cmd: 'prune',
    args: 1,

    run: (msg, args) => {
        let limit = parseInt(args[0]) + 1;
        const fixedLimit = limit;

        if (limit === 0)
            msg.edit("Can't prune 0 message !").catch(console.error);
        else {
            msg.edit(`Pruning ${fixedLimit} messages...`)
                .then()
                .catch(console.error);
            do {
                let newLimit = limit % 25;
                if (newLimit === 0)
                    newLimit = 25;
                console.log("newLimit:" + newLimit);

                msg.channel.search({
                    author: msg.author,
                    channel: msg.channel,
                    limit: newLimit
                }).then((res) => {

                    res.messages.forEach((m) => {
                        m.forEach((m) => {
                            if (m.hit)
                                m.delete().then().catch();
                        });
                    });
                }).catch(console.error);
                limit -= newLimit;
            } while (limit > 0);
            msg.delete().then().catch();
        }
    }
};
