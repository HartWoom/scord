let user = require('../app').user;

module.exports = {
    help: 'Change the current activity',
    spechelp: "activity [NAME_OF_GAME]\tSet your activity on NAME_OF_GAME. If blank, resets back your activity",
    cmd: 'activity',

    run: (msg, args) => {
        if (user === null)
            user = require('../app').user;

        let type = args[0] ? args[0].toUpperCase() : '';
        args.splice(0, 1);
        let game = args.join(' ');
        user.setActivity(game, {type: type}).then(() => {
            msg.delete().catch(console.error);
        }).catch(console.error);
    }
};
