'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [city, setCity] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      router.push(`/city?cityName=${city.trim()}`)
    }
  }

  const popularCities = [
    'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MagicBricks Real Estate Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover real estate projects in your city with real-time data and interactive maps
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore
            </button>
          </form>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Popular Cities
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {popularCities.map((cityName) => (
              <button
                key={cityName}
                onClick={() => router.push(`/city?cityName=${cityName}`)}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}