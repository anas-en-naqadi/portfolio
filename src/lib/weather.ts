export type WeatherConditionKey =
  | 'clearSky'
  | 'partlyCloudy'
  | 'foggy'
  | 'drizzle'
  | 'rainy'
  | 'snowy'
  | 'showers'
  | 'thunderstorm'
  | 'clear'

export interface HourlyForecast {
  hour: string
  temp: number
  code: number
}

export interface WeatherState {
  temp: number
  conditionKey: WeatherConditionKey
  high: number
  low: number
  code: number
  hourly: HourlyForecast[]
}

const OPEN_METEO_MARRAKECH_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=31.6295&longitude=-7.9811&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto'

export function getWeatherConditionKey(code: number): WeatherConditionKey {
  if (code === 0) return 'clearSky'
  if ([1, 2, 3].includes(code)) return 'partlyCloudy'
  if ([45, 48].includes(code)) return 'foggy'
  if ([51, 53, 55].includes(code)) return 'drizzle'
  if ([61, 63, 65].includes(code)) return 'rainy'
  if ([71, 73, 75].includes(code)) return 'snowy'
  if ([80, 81, 82].includes(code)) return 'showers'
  if ([95, 96, 99].includes(code)) return 'thunderstorm'
  return 'clear'
}

/**
 * Fetches live Marrakech weather + next 6 sequential hourly points from Open-Meteo.
 * Returns null cleanly on HTTP or network errors instead of throwing.
 */
export async function fetchMarrakechWeather(signal?: AbortSignal): Promise<WeatherState | null> {
  const res = await fetch(OPEN_METEO_MARRAKECH_URL, { signal })
  if (!res.ok) {
    return null
  }

  const data = await res.json()
  const currentTemp = data?.current?.temperature_2m
  const currentCode = data?.current?.weather_code
  const dailyMax = data?.daily?.temperature_2m_max?.[0]
  const dailyMin = data?.daily?.temperature_2m_min?.[0]

  if (
    typeof currentTemp !== 'number' ||
    typeof currentCode !== 'number' ||
    typeof dailyMax !== 'number' ||
    typeof dailyMin !== 'number'
  ) {
    return null
  }

  const currentHour = new Date().getHours()
  const hourlyForecast: HourlyForecast[] = []

  // Index sequentially into the 168h array so late-evening hours roll into tomorrow instead of wrapping back to 0..5
  for (let i = 0; i < 6; i++) {
    const targetIndex = currentHour + i
    const hourlyTemp = data?.hourly?.temperature_2m?.[targetIndex]
    const hourlyCode = data?.hourly?.weather_code?.[targetIndex]

    if (typeof hourlyTemp === 'number' && typeof hourlyCode === 'number') {
      hourlyForecast.push({
        hour: String(targetIndex % 24).padStart(2, '0'),
        temp: Math.round(hourlyTemp),
        code: hourlyCode,
      })
    }
  }

  return {
    temp: Math.round(currentTemp),
    conditionKey: getWeatherConditionKey(currentCode),
    high: Math.round(dailyMax),
    low: Math.round(dailyMin),
    code: currentCode,
    hourly: hourlyForecast,
  }
}
