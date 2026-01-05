export default function LocationInfo({ loc }: any) {
  return (
    <div>
      <h2>{loc.desa}, {loc.kecamatan}</h2>
      <p>{loc.kabupaten} – {loc.provinsi}</p>
    </div>
  )
}
