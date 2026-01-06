import "dotenv/config"
import fs from "fs"
import path from "path"
import readline from "readline"
import { Redis } from "@upstash/redis"

function normalize(v: string) {
  return v
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

async function seed() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })

  const filePath = path.join(process.cwd(), "scripts", "adm4.csv")

  if (!fs.existsSync(filePath)) {
    throw new Error("adm4.csv tidak ditemukan di folder scripts/")
  }

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  })

  let count = 0

  for await (const line of rl) {
    if (!line || line.startsWith("provinsi")) continue

    const parts = line.split(",")
    if (parts.length < 5) continue

    const [prov, kab, _kec, desa, adm4] = parts
    if (!adm4) continue

    const key =
      "adm4:" +
      [
        normalize(prov),
        normalize(kab),
        normalize(desa),
      ].join("|")

    await redis.set(key, adm4)
    count++

    if (count % 1000 === 0) {
      console.log(`Seeded ${count} ADM4`)
    }
  }

  console.log(`DONE. Total ADM4 seeded: ${count}`)
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
