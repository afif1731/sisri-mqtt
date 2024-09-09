import { calculateISPU } from './ispu-calculator';
import client from './config/mqtt.config';
import { IAirQualityBodyRequest, IAirQualityResponse } from './model/air-quality.model';
import axios from 'axios';

client.on('message', async(topic, message) => {
    try {
        const airQualityMsg: IAirQualityResponse = JSON.parse(message.toString());
        const ispuResults = {
            //PM10: calculateISPU(airQualityMsg.pm10, 'PM10'),
            //PM25: calculateISPU(airQualityMsg.pm25, 'PM25'),
            CO: calculateISPU(airQualityMsg.co, 'CO'),
            OZONE: calculateISPU(airQualityMsg.ozone, 'OZONE'),
            NO2: calculateISPU(airQualityMsg.no2, 'NO2')
        }
        const aqi = Object.values(ispuResults).reduce((max, val) => {
            return (val !== null && val > (max ?? 0)) ? val : max;
        }, null);

        const cctvId = topic.split('/')[3];
        const url = `${process.env.BE_URL}/si-road/air-quality/${cctvId}`;
        const requestData: IAirQualityBodyRequest = {
            pm1: airQualityMsg.pm1,
            pm10: airQualityMsg.pm10,
            pm25: airQualityMsg.pm25,
            co: airQualityMsg.co,
            no2: airQualityMsg.no2,
            ozone: airQualityMsg.ozone,
            temperature: airQualityMsg.temperature,
            humidity: airQualityMsg.humidity,
            pressure: airQualityMsg.pressure,
            aqi: Math.floor(aqi ?? 999)
        }

        try {
            await axios.patch(url, requestData);
            console.log('sended..');
        } catch(error: any) {
            console.error('error sanding data: ', error.message);
        }
    } catch(error: any) {
        console.error('error catch: ', error.message);
    }
})
