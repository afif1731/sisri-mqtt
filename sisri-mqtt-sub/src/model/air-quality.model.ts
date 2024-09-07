export interface IAirQualityResponse {
    pm1: number;
    pm10: number;
    pm25: number;
    co: number;
    no2: number;
    ozone: number;
    temperature: number;
    humidity: number;
    pressure: number;
}

export interface IAirQualityBodyRequest extends IAirQualityResponse {
    aqi: number;
}