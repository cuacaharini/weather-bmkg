export function getClientCoords(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation tidak didukung")
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err),
      { enableHighAccuracy: true }
    )
  })
}
