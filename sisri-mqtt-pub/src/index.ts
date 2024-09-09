import client from './config/mqtt.config';
import axios from 'axios';
import { ILampResponse } from './model/traffic-lamp.model';

client.on('message', async(topic, message) => {
    try {
        const lampId = topic.split('/')[3];
        const lampUrl = `${process.env.BE_URL}/si-traffic/lamp/${lampId}`;
        console.log(lampId);
        const data: ILampResponse = (await axios.get(lampUrl)).data;
        if(!data.status) {
            throw new Error(data.message);
        }
        const payload = data.data.green_duration;

        client.publish(`sisri/sitraffic/lamp-duration/${lampId}`, String(payload));
    } catch(error: any) {
        console.error('error catch: ', error.message);
    }
})
