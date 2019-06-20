const request = require('request');

const apiUrl = 'https://min-api.cryptocompare.com/data/price?tsyms=EUR&fsym=';

module.exports = {
  help: 'Display a cryptocurrency price',
  cmd: 'crypto',
  args: 1,

  run: (msg, args) => {
    msg.edit('Processing...')
      .then()
      .catch(console.error);

    let currency = args[0].toUpperCase();
    let url = apiUrl + currency;

    request(url, (err, res, body) => {
      if (res.statusCode !== 200 && res.statusCode !== 301)
        return msg.edit('API is down.').then().catch(console.error);

      body = JSON.parse(body);
      if (body['Response'] === 'Error')
        return msg.edit(body['Message']).then().catch(console.error);

      msg.edit(`${currency}: $${body['EUR']}`)
        .then()
        .catch(console.error);

    });
  }
};
