const mqtt = require('mqtt');
const {CronJob: cronJob} = require("cron");


const host = "127.0.0.1";
const port = "1885";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "test",
  password: "testadmin",
  reconnectPeriod: 1000,
})

const topic = '696969'
client.on('connect', () => {
  console.log('Connected')
//   client.subscribe([topic], () => {
//     console.log(`Subscribe to topic '${topic}'`)
//   })

//   client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
//     if (error) {
//       console.error(error)
//     }
//   })
})

new cronJob(
    "*/10 * * * * *",
    function () {
        console.log('==job 10s start==')
        const time = new Date();
        const timeStamp = Math.floor(time.getTime()/1000);
        const stationId = '686868'
        client.publish( stationId, JSON.stringify({
            station_id: stationId,
            Time: timeStamp,
            CO: Math.random() * 50400,
            O3: Math.random() * 604,
            SO2: Math.random() * 1004,
            NO2: Math.random() * 2049,
            PM10: Math.random() * 604,
            PM1: Math.random() * 654,
            PM2p5: Math.random() * 500.4,
            Humidity: Math.random() * 100,
            Temperature: Math.random() * 40,
            Pressure: 100000 + Math.random() * 1000,
        }) , {qos:2} , (error => {
            if(!error){
                res.status(200).json({msg : 'Gửi bản tin thành công'})
            }else {
                console.log(error)
                res.status(500).json({msg : "Gửi bản tin thất bại , vui lòng thử lại"})
            }
        }))
        
    },
    null,  // cb when job stop
    true,  // auto start
    'Asia/Ho_Chi_Minh'
)

// client.on('message', (topic, payload) => {
//   console.log('Received Message:', topic, payload.toString())
// })
