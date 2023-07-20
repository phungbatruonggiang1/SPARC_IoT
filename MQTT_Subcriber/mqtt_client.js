const mqtt = require('mqtt')
const events = require('events');
emitter = new events.EventEmitter();

var clients = [];
const mqttConfig = [{
    host: "127.0.0.1",
    port: "1885",
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: "test",
    useNewUrlParser: true,
    password: "testadmin",
}]
mqttConfig.map(config => {
    config.clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
    var client = mqtt.connect(process.env.APP_MQTT, config);
    clients.push(client);
    client.on('connect', function () {
        console.log(config.port)
        client.subscribe('#', function (err) {
            // console.log(config.port)
            if (!err) {
                console.log("Connect mqtt successfully in port:", config.port);
            }
            else
                console.log(err);
        })
    })
})



clients.map(client => {
    client.on('message', function (topic, message, packet) {
        try{
            message = JSON.parse(message.toString('utf-8'));
            console.log(message);
        } 
        catch(e) {

        }
    });
})



