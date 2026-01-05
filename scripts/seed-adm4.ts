// baca CSV Kemendagri → push ke Redis
// dijalankan sekali di local

import fs from "fs"
import path from "path"
import readline from "readline"
import { redis } from "../lib/redis"

function normalize(v: string) {
  return v
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
}

async function seed() {
  const filePath = path.join(__dirname, "adm4.csv")

  const stream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  })

  let count = 0

  for await (const line of rl) {
    // skip header
    if (count === 0 && line.includes("provinsi")) {
      count++
      continue
    }

    const [prov, kab, kec, desa, adm4] = line.split(",")

    if (!adm4) continue

    const key =
      "adm4:" +
      [
        normalize(prov),
        normalize(kab),
        normalize(kec),
        normalize(desa),
      ].join("|")

    await redis.set(key, adm4)
    count++

    if (count % 1000 === 0) {
      console.log(`Seeded ${count} data`)
    }
  }

  console.log(`DONE. Total ADM4 seeded: ${count}`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
