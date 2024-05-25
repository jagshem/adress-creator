'use client'

// pages/index.tsx
import { useEffect, useState } from 'react'
import { getRandomAddress } from './lib/osm'

const Home = () => {
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const result = await getRandomAddress()
        setAddress(result.display_name)
      } catch (error) {
        console.error('Error fetching address:', error)
        setAddress('Uygun adres bulunamadı.')
      }
    }

    fetchAddress()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <h1 className="text-3xl font-bold">Rastgele Türkiye Adresi</h1>
      <div className="mt-4 p-4 border rounded bg-white shadow">
        {address ? <p>{address}</p> : <p>Adres yükleniyor...</p>}
      </div>
    </div>
  )
}

export default Home
