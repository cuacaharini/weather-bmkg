export async function reverseGeocode(lat: number, lon: number) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=id`
  )

  const data = await res.json()
  const a = data.address || {}

  return {
    desa: a.village || a.suburb || "",
    kecamatan: a.county || "",
    kabupaten: a.city || a.regency || "",
    provinsi: a.state || "",
  }
}
