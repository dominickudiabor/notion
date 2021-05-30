const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })
const state = { foo: 'bar' }
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message)
        state['something'] = message
    })
    ws.send(JSON.stringify(state))
})
