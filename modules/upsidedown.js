const bot = require('../app.js').bot;

let enabled = false;
let id = 0;

//🙃

bot.on('message', msg => {
    if (msg.author.id === id)
        msg.react('🙃').then().catch(console.error);
});

module.exports = {
    cmd: 'upsidedown',
    help: 'Enable / disable upsidedown mode',

    run: (msg, args) => {
        if (!enabled) {
            enabled = true;
        }
        else {
            id = 0;
            enabled = false;
        }

        msg.edit(`State: ${enabled ? 'enabled' : 'disabled'}`)
            .then(() => {
                setTimeout(() => {
                    id = enabled ? msg.author.id : 0;
                    msg.delete().then().catch(console.error);
                }, 500);
            })
            .catch(console.error);
    }
};