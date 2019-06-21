const request = require("request");
const apiURrl = "http://frengly.com/frengly/data/translateREST";
const email = "antoine.hartwig@gmail.com";
const password = "ThisIs4Password";

module.exports = {
    help: 'Translate from one language to another',
    spechelp: 'trad source dest message\tTranslate your message from source language to dest language. Message can be multiple words. Available languages are :' +
        'ar, bg, zhCN, zhTW, hr, cs, da, nl, en, et, tl, fi, fr, de, el, iw, hi, hu, is, id, ga, it, ja, ko, la, lv, lt, mk, mt, no, fa, pl, pt, ro, ru, sr, sk, si, es, sv, th, tr, vi.',
    cmd: 'trad',

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
                    return msg.edit(body['message'])
                        .then(() => {
                            setTimeout(() => {
                                msg.delete().catch(console.error)
                            }, 500)
                        }).catch(console.error);

                if (res.statusCode !== 200)
                    return msg.edit("API is down.")
                        .then(() => {
                            setTimeout(() => {
                            msg.delete().catch(console.error)
                        }, 500)
                        }).catch(console.error);

                msg.edit(`Translation of \'${body['text']}\' from ${body['src']} to ${body['dest']}: ${body['translation']}`)
                    .catch(console.error);
            });
    }
};