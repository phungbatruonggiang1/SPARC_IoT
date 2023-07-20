var mosca = require('mosca')
var events=require('events');
emitter=new events.EventEmitter();

let settings = {
  port: 1885,
};

var server = new mosca.Server(settings);
server.on('ready', setup);

var authenticate = function(client, username, password, callback) {
  try{
		var authorized = (username === 'test' && password.toString() === 'testadmin');
      callback(null, authorized);
  }
  catch (ex){
    console.log(ex);
  }
}

server.on('clientConnected', function(client) {
   console.log('client connected');
});

server.on('published', function(packet, client) {
  try{
   var stringBuf = packet.payload.toString('utf-8');
   console.log(stringBuf);
   
  }
  catch (ex){
 
  }
});

emitter.on('error', function(error) {
   console.log('client connected', error);
});

function setup() {
 console.log('Mosca server is up and running');
   server.authenticate = authenticate;
}