import { redis } from "./redis"

function normalize(v: string) {
  return v
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

export async function findAdm4(loc: {
  provinsi: string
  kabupaten: string
  desa: string
  kecamatan?: string
}) {
  const baseKey = [
    normalize(loc.provinsi),
    normalize(loc.kabupaten),
    normalize(loc.desa),
  ].join("|")

  // preferred: tanpa kecamatan
  let adm4 = await redis.get<string>(`adm4:${baseKey}`)
  if (adm4) return adm4

  // fallback: pakai kecamatan kalau ada
  if (loc.kecamatan) {
    const withKec = [
      normalize(loc.provinsi),
      normalize(loc.kabupaten),
      normalize(loc.kecamatan),
      normalize(loc.desa),
    ].join("|")

    adm4 = await redis.get<string>(`adm4:${withKec}`)
    if (adm4) return adm4
  }

  return null
}
