export interface AirQualityResponseIFace {
    elevation: number,
    generationtime_ms: number,
    hourly: {
        pm2_5: number[],
        pm10: number[],
        time: string[]
    },
    hourly_units: {
        pm2_5: string,
        pm10: string,
        time: string
    },
    latitude: number,
    longitude: number,
    timezone: string,
    timezone_abbreviation: string,
    utc_offset_seconds: number
}