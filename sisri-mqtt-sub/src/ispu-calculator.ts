type PollutantType = 'PM10' | 'PM25' | 'CO' | 'OZONE' | 'NO2';

const pollutant_ranges = {
    PM10: [
        [0, 50, 0, 50],
        [51, 100, 51, 150],
        [101, 200, 151, 350],
        [201, 300, 351, 420],
        [301, 500, 421, 500]
    ],
    PM25: [
        [0, 50, 0, 15.5],
        [51, 100, 15.6, 55.4],
        [101, 200, 55.5, 150.4],
        [201, 300, 150.5, 250.4],
        [301, 500, 250.5, 500.0]
    ],
    CO: [
        [0, 50, 0, 4000],
        [51, 100, 4001, 8000],
        [101, 200, 8001, 15000],
        [201, 300, 15001, 30000],
        [301, 500, 30001, 45000]
    ],
    OZONE: [
        [0, 50, 0, 120],
        [51, 100, 121, 235],
        [101, 200, 236, 400],
        [201, 300, 401, 800],
        [301, 500, 801, 1000]
    ],
    NO2: [
        [0, 50, 0, 80],
        [51, 100, 81, 200],
        [101, 200, 201, 1130],
        [201, 300, 1131, 2260],
        [301, 500, 2261, 3000]
    ]
};

export function calculateISPU(concentration: number, pollutant: string) {
    const ranges = pollutant_ranges[pollutant.toUpperCase() as PollutantType] || [];
    let ispu = null;

    for (let range of ranges) {
        const [Ib, Ia, Xb, Xa] = range;
        if (Xb <= concentration && concentration <= Xa) {
            ispu = Ib + ((Ia - Ib) * (concentration - Xb) / (Xa - Xb));
            break;
        }
    }

    if (ispu === null && concentration > ranges[ranges.length - 1][3]) {
        ispu = 999;
    }

    return ispu;
}