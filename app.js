const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();





const { sort_data, get_request } = require('./requests');


async function check(block_data, token) {
    try {
        console.log("Sorting data blocks....")
        var sorted_data = [];
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
        return sorted_data;


    } catch (e) {
        console.log(e);
    }

}


async function get_block(token) { // getting block data
    try {
        const base_URL = process.env.BLOCK_URL;
        const user_token = token.token;
        var url = base_URL.concat(user_token);
        console.log("Getting block.... from", url)
        var block_data = await get_request(url);
        return block_data;
    } catch (e) {
        console.log(e);
    }
}



async function get_token() { // getting the token
    try {
        const url = process.env.TOKEN_URL;
        console.log("Getting token.... from ", url);
        var token = await get_request(url);
        return token;
    } catch (e) {
        console.log(e);
    }
}

async function test(sorted_data, token) { // testing the sorted data
    try {
        test_data = sorted_data.join('');
        var data = {
            "encoded": test_data
        };

        console.log("Testing sorted block.... ")
        var res = await sort_data(data, token)
        return res;
    } catch (e) {
        console.log(e);
    }

}


async function main() {
    try {
        const token = await get_token();
        console.log(token);
        const block_data = await get_block(token);
        console.log('Block data: ');
        console.log(block_data);
        const final_data = await check(block_data, token);
        console.log('Sorted Block data');
        console.log(final_data);
        const result = await test(final_data, token);
        console.log('Final result of test: ');
        console.log(result);

    } catch (e) {
        console.log(e);
    }
}

main();

