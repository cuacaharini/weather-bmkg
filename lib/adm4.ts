import { redis } from "./redis"

function normalize(v: string) {
  return v.toLowerCase().trim()
}

export async function findAdm4(loc: {
  provinsi: string
  kabupaten: string
  kecamatan: string
  desa: string
}) {
  const key = [
    loc.provinsi,
    loc.kabupaten,
    loc.kecamatan,
    loc.desa,
  ]
    .map(normalize)
    .join("|")

  return redis.get<string>(`adm4:${key}`)
}
