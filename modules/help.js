const manager = require('../app.js').manager;
let commands;

module.exports = {
    help: 'Display this help!',
    cmd: 'help',

    run: (msg, args) => {
        let helpMessage;
        commands = manager.commands;

        if (args.length === 0)
            helpMessage = displayGeneralHelp();
        else if (args.length === 1)
            helpMessage = displaySpecificHelp(args);
        else
            helpMessage = displayError();

        msg.edit(helpMessage)
            .then()
            .catch(console.error);
    }
};

function displayError() {
    let helpMessage = "```";

    helpMessage += "Usage for help : help [COMMAND]";
    helpMessage += "```";

    return helpMessage;
}

function displaySpecificHelp(args) {
    let helpMessage = "```";

    let command = commands[args[0]];
    if (command === undefined)
        helpMessage += `Command ${args[0]} doesn't exist.`;
    else if (command.hasOwnProperty('spechelp'))
        helpMessage += command.spechelp;
    else
        helpMessage += `No specific help for ${args[0]}`;
    helpMessage += "```";

    return helpMessage;
}

function displayGeneralHelp() {
    let helpMessage = '```';

    Object.keys(commands).forEach(function(command) {
        helpMessage += `${commands[command].cmd}\t\t${commands[command].help}\n`;
    });
    helpMessage += '```';

    return helpMessage;
}