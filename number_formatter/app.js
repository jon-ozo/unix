const { spawn } = require('node:child_process');
const { open } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');

const childProcess = spawn('c-code/bin/Debug/number_formatter.exe', [
	'c-code/dest.txt',
	'$',
	',',
]);

childProcess.stdout.on('data', (chunk) => {
	console.log(`Processing... ${chunk}`);
});

childProcess.stderr.on('data', (chunk) => {
	console.log(`Error: ${chunk}`);
});

childProcess.on('close', (code) => {
	if (code === 0) return console.log('Data processed successfully');

	console.log('Something went wrong');
});

(async () => {
	const readFileHandle = await open('../../node-stream-module/notes.txt', 'r');
	const readFileStream = readFileHandle.createReadStream();
	await pipeline(readFileStream, childProcess.stdin);

	await readFileHandle.close();
})().catch((err) => console.log(err.message));
