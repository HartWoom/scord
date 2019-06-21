module.exports = {
    help: 'Pong!',
    cmd: 'ping',

    run: (msg, args) => {
        msg.edit('Pong!')
            .catch(console.error);
    }
};
