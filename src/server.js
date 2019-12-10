const { Server } = require('ws');

const server = new Server({ port: 9999 });

const connections = {};
const messages = [];

server.on('connection', connection => {
    const id = generateUniqId();

    connections[id] = connection;

    connection.on('message', message => {
        messages.push(message);
        Object.values(connections).forEach(connection => connection.send(message))
    });

    connection.on('close', () => delete connections[id]);

    messages.forEach(message => connection.send(message));
});

function generateUniqId() {
    return Date.now() * Math.random().toString();
}
