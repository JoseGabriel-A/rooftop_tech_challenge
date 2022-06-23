const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();



var sorted_data = [];

const { sort_data, get_request } = require('./requests');


async function check(block_data, token) {
    try {
        var i;
        var z = 0
        var j = 1;
        sorted_data[0] = block_data.data[0];
        for (i = 0; i < (block_data.length / block_data.chunkSize); i++) {

            if (i === z) { i++; } // this is  to avoid compare the same string
            var data = {
                "blocks": [
                    block_data.data[z],
                    block_data.data[i]
                ]
            };
            console.log(data);
            console.log('Loop is equal :' + i);
            var value = await sort_data(data, token);
            if (value.message == true) {
                sorted_data[j] = block_data.data[i];
                z = i;
                i = 1;
                j++;

            }
            console.log(value);


        }
        console.log('sorted vector');
        console.log(sorted_data);


    } catch (e) {
        console.log(e);
    }

}


function get_block(token) { // getting block data
    console.log("Getting block....")
    const base_URL = process.env.BLOCK_URL;
    const user_token = token.token;
    console.log(base_URL.concat(user_token));
    fetch(base_URL.concat(user_token)).then((res) => {
        return res.json();
    }).then((json) => {
        const block_data = json;
        console.log(block_data);
        check(block_data, token);
    }).catch(error => console.log(error))
}


async function get_token() { // getting the token
    try {
        const url = process.env.TOKEN_URL;
        console.log("Getting token.... from ", url);
        var token = await get_request(url);
        console.log(token);
    } catch (e) {
        console.log(e);
    }
}


get_token();
