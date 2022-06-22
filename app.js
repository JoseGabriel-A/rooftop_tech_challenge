const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();



function get_block(token) { // getting block data
    console.log("Getting block....")
    const base_URL = process.env.URL;
    const user_token = token.token;
    console.log(base_URL.concat(user_token));
    fetch(base_URL.concat(user_token)).then((res) => {
        return res.json();
    }).then((json) => {
        const block = json;
        console.log(block);
    }).catch(error => console.log(error))
}


function get_token() { // getting the token
    fetch(process.env.TOKEN_URL).then((res) => {
        return res.json();
    }).then((json) => {
        const token = json;
        console.log(token);
        get_block(token);
    }).catch(error => console.log(error))
}


get_token();
