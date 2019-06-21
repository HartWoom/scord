const fs = require('fs');
const path = require('path');
const manager = require('../app').manager;

module.exports = {
    help: 'Reload all modules',
    cmd: 'reload',

    run: (msg, args) => {
        msg.edit('Reloading...')
            .catch(console.error);

        manager.reset();

        const files = fs.readdirSync(__dirname);

        files.forEach((filename) => {
            delete require.cache[require.resolve(path.join(__dirname, filename))];
            try {
                const mod = require(path.join(__dirname, filename));
                manager.register(mod);
            } catch (e) {
                console.error(`Cannot load ${filename}: ${e}.`);
            }
        });

        msg.edit('Reloaded!')
            .then(() => {
                setTimeout(() => {
                    msg.delete().then().catch(console.error);
                }, 500);
            })
            .catch(console.error);
    }
};
