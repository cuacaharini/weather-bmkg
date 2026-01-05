"use client"

import { useEffect, useState } from "react"
import { getClientCoords } from "@/lib/geo-client"
import { reverseGeocode } from "@/lib/reverse-geo"
import { findAdm4 } from "@/lib/adm4"
import { getWeatherByAdm4 } from "@/lib/weather"
import LocationInfo from "@/components/LocationInfo"
import HourlyForecast from "@/components/HourlyForecast"

export default function Home() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    async function load() {
      const coords = await getClientCoords()
      const loc = await reverseGeocode(coords.latitude, coords.longitude)
      const adm4 = await findAdm4(loc)
      if (!adm4) return

      const weather = await getWeatherByAdm4(adm4)
      setData(weather)
    }

    load()
  }, [])

  if (!data) return <p>Memuat cuaca…</p>

  return (
    <main style={{ padding: 20 }}>
      <LocationInfo loc={data.lokasi} />
      <HourlyForecast hours={data.hourly} />
    </main>
  )
}
