export async function fetchBMKG(adm4: string) {
  const res = await fetch(
    `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${adm4}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Gagal ambil data BMKG")
  }

  return res.json()
}
