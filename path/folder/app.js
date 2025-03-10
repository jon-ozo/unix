const { readFileSync } = require('node:fs');
const { join, parse } = require('node:path');
require('./file.js');

console.log(__dirname);
console.log(process.cwd());
console.log(parse(join(__dirname, 'file.txt')));

// this will throw an error cos the fs module requires the absolute path to get files 
const readContent = readFileSync('./file.txt', 'utf-8');

// using the join method in the path module, it normalizes the path string provided 
// by removing any un-necessary character or string so that the path is resolved into
// a proper path.
// const readContent = readFileSync(join(__dirname, './file.txt'), 'utf-8');
console.log(readContent);
