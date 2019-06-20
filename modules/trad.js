const request = require("request");
const apiURrl = "http://frengly.com/frengly/data/translateREST";
const email = "antoine.hartwig@gmail.com";
const password = "ThisIs4Password";

module.exports = {
    help: "Translate from one language to another",
    cmd: "trad",

    run: (msg, args) => {
        if (args.length < 3)
            return msg.edit("Need at least 3 params").then().catch(console.error);
        msg.edit("Translating...").then().catch(console.error);


        let rawJSON = {
            "src": args[0],
            "dest": args[1],
            "email": email,
            "password": password
        };
        args.splice(0, 2);
        rawJSON.text = args.join(' ');

        request({ uri: apiURrl,
                method: 'POST',
                json: rawJSON
            },
            function(err, res, body) {
                if (res.statusCode === 500)
                    return msg.edit(body['message']).then().catch(console.error);
                if (res.statusCode !== 200)
                    return msg.edit("API is down.").then().catch(console.error);
                msg.edit(`Translation of \'${body['text']}\' from ${body['src']} to ${body['dest']}: ${body['translation']}`)
                    .then().catch(console.error);
            });
    }
};