
const WEATHER_API_KEY = "c0df7fa7a47fef84e94435e20c010ee0";
const WEATHER_LAT = "32.109333";
const WEATHER_LON = "34.855499";
const WEATHER_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${WEATHER_LAT}&lon=${WEATHER_LON}&appid=${WEATHER_API_KEY}`;


export const getOutsideTemperture = async () => {
    const response = await fetch(WEATHER_ENDPOINT).then(res => res.json());
    return response.main.temp;
}