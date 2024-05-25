import axios from 'axios'

// Türkiye'nin sınır koordinatları
const TURKEY_BOUNDS = {
  minLat: 36.0,
  maxLat: 42.0,
  minLon: 26.0,
  maxLon: 45.0,
}

// Rastgele koordinatlar üretme fonksiyonu
const getRandomCoordinates = () => {
  const lat =
    Math.random() * (TURKEY_BOUNDS.maxLat - TURKEY_BOUNDS.minLat) +
    TURKEY_BOUNDS.minLat
  const lon =
    Math.random() * (TURKEY_BOUNDS.maxLon - TURKEY_BOUNDS.minLon) +
    TURKEY_BOUNDS.minLon
  return { lat, lon }
}

// Rastgele adres alma fonksiyonu, belirli sayıda deneme yapar
export const getRandomAddress = async (maxRetries = 10) => {
  for (let i = 0; i < maxRetries; i++) {
    const { lat, lon } = getRandomCoordinates()
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`
    const response = await axios.get(url)

    const data = response.data
    if (data.address && data.address.postcode) {
      return data
    }
  }
  throw new Error('Uygun adres bulunamadı.')
}
