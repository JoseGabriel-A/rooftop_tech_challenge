const MOCK_VALUE = [{ message: true }];
const { sort_data } = require('./requests');
const { check } = require('./app');

jest.mock("./requests");

const dummy_token = {
    token: 'XX7XXXX7-7X77-7X7X-777X-7X7777X77777'
};

const block_data_test = {
    "data": [
        "LluIROktoM7rqgSQ8judG7H59FCBJAc5HffAFyBGUedpSAsw7G8FnZi5vAzB2PwPKHZdYM3eyP5TVNxw34KXWSKCxm5g9MTXvFYp",
        "PgVzqM24P6Oa0wp4KxDBGVUriErVZ7YCMhNIl2sDasCp2aCPATATJCjiSz0tgy6W7nzOfDJSS1uaEJzGIuTCud6rItEhRSWrKmf9",
        "liO2707A2tmFDXHMCFki4IIIQnhdMUGHMS77kzpvKbBDWJ2lUeoNsswgf4BPv7uNoZVGoBtciRwe9nyHttMcv5Gm38ttgE0h3Cqo",
        "fON2rn7YEifFGryKmoMvVfpilbzevYBe2X0CvNSPzrVfopvs8UTuP6ykLrOc8SfNas8QX7Wvg44uti3dhdi001UssjlGqwWuimiv",
        "9snRwVunw3jzUqORGNwx0phesEDMs338CUTTXbmEnNXI16E13jzpDXyYtvjw6J8IMvpp712Vzj5W3zhtht0UBeGWIffogewO2BOq",
        "Lb6EnjDJvFNbvPFEUBfksyYqvgLY6n67YUzAZOCLIg5IoRA4g12I48zkQkorQnlx6d6c58M9GzisM3cqNIXpUjWDRWQyFZZjeejb",
        "sjsxmvVT9bvZT9wmtzhvu3AVb1kv6pEfg4EWZVdr4QKIw6kLHUaD8brc44hrNQUtYzOABxLXqFZH1Xfx9O7GX1KsGBN7AmZeQArU",
        "56XR2DS5TCIrMOAjAJqt0DoUH1S49PBD3ef4q6hOz81V5zIgjMwc87FuUWqIwbFgHe7R3WPfpZgauhbFuw55ZHYSzS30kse6an6a",
        "FKzs8cbpEXD5qNf0FBDmxaU3mhUyTQDp38H2aH6m13XLQyuJPF4murcglFAMPqnfOvOzRaCbZCtQnGIBl1z1uKjyDMDYOgcCTp45"

    ],
    "chunkSize": 100,
    "length": 900
};


describe('testing function to resolve challenge', () => {

    test('Test_check.test.js with sorted block', async () => {
        const funcBSpy = jest.fn(() => Promise.resolve(
            MOCK_VALUE
        ));
        sort_data.mockImplementation(() => funcBSpy());
        await check(block_data_test, dummy_token);
        expect(funcBSpy).toHaveBeenCalledTimes(8);

    });
});

