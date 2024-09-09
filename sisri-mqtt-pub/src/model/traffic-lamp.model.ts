export interface ILampResponse {
    code: number;
    message: string;
    status: boolean;
    data: {
        red_duration: number;
        yellow_duration: number;
        green_duration: number;
    }
}