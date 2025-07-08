// components/LeafletMap.js
import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/placeholder.png',
  iconUrl: '/placeholder.png',
  shadowUrl: '/placeholder.png',
})

export default function LeafletMap({ projects }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([12.9716, 77.5946], 11)
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current)
    }

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker)
    })
    markersRef.current = []

    // Add new markers
    projects.forEach(project => {
      const marker = L.marker([project.coordinates.lat, project.coordinates.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${project.name}</h3>
            <p class="text-xs text-gray-600 mt-1">${project.location}</p>
            <p class="text-xs text-blue-600 mt-1">${project.priceRange}</p>
            <p class="text-xs text-gray-500 mt-1">By ${project.builder}</p>
          </div>
        `)

      markersRef.current.push(marker)
    })

    // Fit map to show all markers
    if (projects.length > 0) {
      const group = new L.featureGroup(markersRef.current)
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1))
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [projects])

  return <div ref={mapRef} className="h-96 rounded-lg border border-gray-300" />
}