export default function HourlyForecast({ hours }: any) {
  return (
    <ul>
      {hours.slice(0, 12).map((h: any) => (
        <li key={h.time}>
          {h.time} – {h.temperature}°C – {h.weatherDesc}
        </li>
      ))}
    </ul>
  )
}
