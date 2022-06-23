const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();





const { sort_data, get_request } = require('./requests');

const final_data =
    [
        'LluIROktoM7rqgSQ8judG7H59FCBJAc5HffAFyBGUedpSAsw7G8FnZi5vAzB2PwPKHZdYM3eyP5TVNxw34KXWSKCxm5g9MTXvFYp',
        'PgVzqM24P6Oa0wp4KxDBGVUriErVZ7YCMhNIl2sDasCp2aCPATATJCjiSz0tgy6W7nzOfDJSS1uaEJzGIuTCud6rItEhRSWrKmf9',
        'liO2707A2tmFDXHMCFki4IIIQnhdMUGHMS77kzpvKbBDWJ2lUeoNsswgf4BPv7uNoZVGoBtciRwe9nyHttMcv5Gm38ttgE0h3Cqo',
        'fON2rn7YEifFGryKmoMvVfpilbzevYBe2X0CvNSPzrVfopvs8UTuP6ykLrOc8SfNas8QX7Wvg44uti3dhdi001UssjlGqwWuimiv',
        '9snRwVunw3jzUqORGNwx0phesEDMs338CUTTXbmEnNXI16E13jzpDXyYtvjw6J8IMvpp712Vzj5W3zhtht0UBeGWIffogewO2BOq',
        'Lb6EnjDJvFNbvPFEUBfksyYqvgLY6n67YUzAZOCLIg5IoRA4g12I48zkQkorQnlx6d6c58M9GzisM3cqNIXpUjWDRWQyFZZjeejb',
        'sjsxmvVT9bvZT9wmtzhvu3AVb1kv6pEfg4EWZVdr4QKIw6kLHUaD8brc44hrNQUtYzOABxLXqFZH1Xfx9O7GX1KsGBN7AmZeQArU',
        '56XR2DS5TCIrMOAjAJqt0DoUH1S49PBD3ef4q6hOz81V5zIgjMwc87FuUWqIwbFgHe7R3WPfpZgauhbFuw55ZHYSzS30kse6an6a',
        'FKzs8cbpEXD5qNf0FBDmxaU3mhUyTQDp38H2aH6m13XLQyuJPF4murcglFAMPqnfOvOzRaCbZCtQnGIBl1z1uKjyDMDYOgcCTp45'
    ];


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

        console.log(data);
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
        const sorted_data = await check(block_data, token);
        console.log('Sorted Block data');
        console.log(sorted_data);
        const result = await test(sorted_data, token);
        console.log('Final result of test: ');
        console.log(result);

    } catch (e) {
        console.log(e);
    }
}

main();

