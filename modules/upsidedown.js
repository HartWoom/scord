const bot = require('../app.js').bot;

let enabled = false;
let id = 0;

const callback = (msg) => {
  if (msg.channel.id === id)
    msg.react('🙃').then().catch(console.error);
};

module.exports = {
  cmd: 'upsidedown',
  help: 'Enable / disable upsidedown mode',

  run: (msg, args) => {
    if (!enabled) {
      bot.on('message', callback);
      id = msg.channel.id;
      enabled = true;
    }
    else {
      bot.removeListener('message', callback);
      id = 0;
      enabled = false;
    }
    msg.edit(`State: ${enabled ? 'enabled' : 'disabled'}`)
      .then(() => {
        setTimeout(() => {
          msg.delete().then().catch(console.error);
        }, 500);
      })
      .catch(console.error);
  }
};