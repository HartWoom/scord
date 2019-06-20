const manager = require('../app.js').manager;

module.exports = {
    help: 'Display this help!',
    cmd: 'help',

    run: (msg, args) => {

        let commands = manager.commands;
        let helpMessage;

        if (args.length === 0)
            helpMessage = displayGeneralHelp(commands);
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

    if (args[0] === "game")
        helpMessage += getGameHelpMessage();
    if (args[0] === "trad")
        helpMessage += getTradHelpMessage();
    helpMessage += "```";

    return helpMessage;
}

function displayGeneralHelp(commands) {
    let helpMessage = '```';

    commands.forEach((command) => {
        helpMessage += `${command.cmd}\t\t${command.help}\n`;
    });
    helpMessage += '```';

    return helpMessage;
}

function getGameHelpMessage() {
    let helpMessage = "game [NAME_OF_GAME]\t";
    helpMessage += "Set your activity on NAME_OF_GAME. If blank, resets back your activity";
    return helpMessage;
}

function getTradHelpMessage() {
    let helpMessage = "trad source dest message\t";
    helpMessage += "Translate your message from source language to dest language. Message can be multiple words";
    return helpMessage;
}