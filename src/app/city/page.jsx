'use client'
import { useEffect } from 'react'
import { useSearchParams ,useRouter} from 'next/navigation'
import { useProjectStore } from '@/store/projectStore'
import ProjectCard from '@/components/component/ProjectCard'
import InteractiveMap from '@/components/component/InteractiveMap'
import LoadingSpinner from '@/components/component/LoadingSpinner'
import ProgressBar from '@/components/component/ProgressBar'

export default function CityPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cityName = searchParams.get('cityName')
 
  const { projects, loading, error, progress, fetchProjects, clearProjects } = useProjectStore()

  useEffect(() => {
    if (cityName) {
      clearProjects()
      fetchProjects(cityName)
    }
  }, [cityName, fetchProjects, clearProjects])

  if (!cityName) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Real Estate Projects in {cityName}
          </h1>
          <p className="text-gray-600">
            Discover the latest real estate projects and their locations
          </p>
        </div>

        {loading && (
          <div className="mb-8">
            <ProgressBar progress={progress} />
            <div className="flex items-center justify-center mt-4">
              <LoadingSpinner />
              <span className="ml-2 text-gray-600">
                Loading projects... {progress}%
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Projects List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              Projects ({projects.length})
            </h2>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Interactive Map */}
          <div className="sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Project Locations</h2>
            <InteractiveMap projects={projects} />
          </div>
        </div>
      </div>
    </div>
  )
}