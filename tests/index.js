let assert = require('assert');
let path = require('path');
let fs = require('fs');

describe('Default test', () => {
    it('Encode files', () => {
        const actual = fs.readFileSync(path.join(__dirname, './actual/index.css'), 'utf-8');
        const expected = fs.readFileSync(path.join(__dirname, './expected/index.css'), 'utf-8');

        assert.equal(actual, expected, 'Files not are equal');
    });
});
