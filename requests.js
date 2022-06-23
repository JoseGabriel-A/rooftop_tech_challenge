const fetch = require('node-fetch');
require('dotenv').config();

module.exports = {
    async sort_data(data, token) {
        try {
            const base_URL = process.env.CHECK_URL;
            const user_token = token.token;
            var url = base_URL.concat(user_token);
            console.log(url);
            const res = await fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return res.json();

        } catch (e) {
            console.log(e);
        }
    },
    async get_request(url) {
        try {
            console.log(url);
            const res = await fetch(url);
            return res.json();
        } catch (e) {
            console.log(e);
        }
    }
}