const { spawn, exec } = require('node:child_process');
const { stdin, stdout, stderr } = require('node:process');

stdin.on('data', (chunk) => {
  console.log(`Incoming data from sources like the keyboard or another program: ${chunk}`);
});

stdout.write('Outgoing data from node to any output device or program');
stdout.end();

stderr.write('Outgoing data - as error - from node to any output device or program');
stderr.end();

// creates a new process
// const childProcess = spawn('echo', ['some', 'string']);
// childProcess.stdout.on('data', (chunk) => {
//   console.log(chunk.toString('utf-8'));
// });

// executes a console command
// exec();