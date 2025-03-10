const cluster = require('node:cluster');
const { availableParallelism } = require('node:os');
const process = require('node:process');

// check if parent process
if (cluster.isPrimary) {
	const coresCount = availableParallelism();
	console.log(`Parent ID: ${process.pid}`);

	for (let i = 0; i < coresCount; i++) {
		const worker = cluster.fork();
		worker.send(`Your ID is: ${worker.process.pid}`);
		console.log(`Spawned a new child process`);
	}
} else {
	require('./app');
}

cluster.on('listen', () => {});

cluster.on('message', (worker, message) => {
	console.log(`A message from ID: ${worker.process.pid}`);
	let indexPageReqCount = 0;
	let otherPageCount = 0;

	// count requests sent
	if (message.url === '/' && message.request === 'get') {
		indexPageReqCount++;
		console.log(indexPageReqCount);
	}

	if (message.url === '/block-url' && message.request === 'get') {
		otherPageCount++;
		console.log(otherPageCount);
	}
});

cluster.on('exit', (worker, code, signal) => {
	console.log(
		`Worker ${worker.process.pid} with ${
			code || signal
		} exited. Creating new worker...`
	);
	const newWorker = cluster.fork();
	console.log(`New worker process with ID: ${newWorker.process.pid} created`);
});
