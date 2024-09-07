import * as mqtt from 'mqtt';

const connecitonUrl = process.env.MQTT_URL as string

const options: mqtt.IClientOptions = {
    clientId: process.env.MQTT_CLIENT_ID as string,
    username: process.env.MQTT_USER as string,
    password: process.env.MQTT_PASS as string,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
    rejectUnauthorized: true
}

const client = mqtt.connect(connecitonUrl, options);

client.on('connect', () => {
    client.subscribe('sisri/siroad/air-quality/+')
});

export default client;