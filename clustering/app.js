const process = require('node:process');
const Pacey = require('./pacey');

const PORT = 5051;
const server = new Pacey();

process.on('message', (message) => {
	console.log(`Message from parent. ${message}`);
});

server.route('get', '/', (req, res) => {
	process.send({ url: req.url, request: req.method.toLowerCase() });

	res.json({ message: 'Sent using the pacey server library' });
});

server.route('get', '/block-url', (req, res) => {
	process.send({ url: req.url, request: req.method.toLowerCase() });

	for (let i = 0; i < 1000000000; i++) {}
	res.json({
		message:
			'This url keeps the process busy which in turn stops other parts of the process from running',
	});
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
