const dgram = require('dgram');
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

const socket = dgram.createSocket('udp4');

socket.on('listening', () => {
	let address = socket.address();
	console.log(`UDP client listening on ${address.address}:${address.port}`);
});

socket.on('message', (msg, rinfo) => {
	console.log(`server: ${msg}`);
});

socket.bind(8001);


rl.on('line', (input) => {
	let message = Buffer.from(input);
	socket.send(message, 0, message.length, 8000, '127.0.0.1', (err, bytes) => {
		if (err) throw err;
		console.log(`Message sent.`);
	});
});
