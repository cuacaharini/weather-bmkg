"use client"

import { useEffect, useState } from "react"
import { getClientCoords } from "@/lib/geo-client"
import { reverseGeocode } from "@/lib/reverse-geo"
import { getWeatherByAdm4 } from "@/lib/weather"
import LocationInfo from "@/components/LocationInfo"
import HourlyForecast from "@/components/HourlyForecast"

export default function Home() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    async function load() {
      const coords = await getClientCoords()

      const loc = await reverseGeocode(
        coords.latitude,
        coords.longitude
      )

      const res = await fetch("/api/adm4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loc),
      })

      const { adm4 } = await res.json()
      if (!adm4) return

      const weather = await getWeatherByAdm4(adm4)
      setData(weather)
    }

    load()
  }, [])

  if (!data) {
    return (
      <main style={{ padding: 20 }}>
        <p>Memuat cuaca…</p>
      </main>
    )
  }

  return (
    <main style={{ padding: 20 }}>
      <LocationInfo loc={data.lokasi} />
      <HourlyForecast hours={data.hourly} />
    </main>
  )
}
