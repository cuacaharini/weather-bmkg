import { fetchBMKG } from "./bmkg"
import { WeatherResult } from "./types"

export async function getWeatherByAdm4(adm4: string): Promise<WeatherResult> {
  const json = await fetchBMKG(adm4)

  const lokasi = json.lokasi
  const cuaca = json.data[0].cuaca

  const hourly = cuaca.flat().map((c: any) => ({
    time: c.local_datetime,
    temperature: c.t,
    humidity: c.hu,
    windSpeed: c.ws,
    windDir: c.wd,
    weatherDesc: c.weather_desc,
    icon: c.image,
  }))

  return {
    lokasi: {
      desa: lokasi.desa,
      kecamatan: lokasi.kecamatan,
      kabupaten: lokasi.kotkab,
      provinsi: lokasi.provinsi,
      lat: lokasi.lat,
      lon: lokasi.lon,
      timezone: lokasi.timezone,
    },
    hourly,
  }
}

