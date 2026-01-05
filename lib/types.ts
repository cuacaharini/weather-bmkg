export type LocationInfo = {
  desa: string
  kecamatan: string
  kabupaten: string
  provinsi: string
  lat: number
  lon: number
  timezone: string
}

export type HourlyWeather = {
  time: string
  temperature: number
  humidity: number
  windSpeed: number
  windDir: string
  weatherDesc: string
  icon: string
}

export type WeatherResult = {
  lokasi: LocationInfo
  hourly: HourlyWeather[]
}
