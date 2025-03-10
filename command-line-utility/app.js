const { stdin, stdout, stderr, argv, exit } = require('node:process');
const { open } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { Buffer } = require('node:buffer');

const filePath = argv[2];

(async () => {
	if (filePath) {
		const readFileHandle = await open(filePath, 'r');
		const readFileStream = readFileHandle.createReadStream();

		await pipeline(readFileStream, stdout);

		await readFileHandle.close();

		exit(0);
	}

	await pipeline(stdin, stdout);
})().catch((err) => {
	stderr.write(Buffer.from(err));
});
