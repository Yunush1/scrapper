// store/projectStore.js
import axios from 'axios'
import { create } from 'zustand'

export const useProjectStore = create((set, get) => ({
  projects: [],
  loading: false,
  error: null,
  city: '',
  progress: 0,

  setCity: (city) => set({ city }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setProgress: (progress) => set({ progress }),

  addProject: (project) => set((state) => ({
    projects: [...state.projects, project]
  })),

  clearProjects: () => set({ projects: [], progress: 0 }),

  fetchProjects: async (cityName) => {
    set({ loading: true, error: null, projects: [], progress: 0 })
    try {
      const response = await axios.get(`/api/scrape?city=${encodeURIComponent(cityName)}`)
      console.log('Response received', response.data);
      const reader = response.data?.projects
      if (!reader) {
        throw new Error('Unable to read response')
      }
      set({ projects: reader, progress: 100 })

      // const decoder = new TextDecoder()
      // let buffer = ''

      // while (true) {
      //   const { done, value } = await reader.read()
        
      //   if (done) break
        
      //   buffer += decoder.decode(value, { stream: true })
      //   const lines = buffer.split('\n')
      //   buffer = lines.pop() || ''
        
      //   for (const line of lines) {
      //     if (line.trim()) {
      //       try {
      //         const data = JSON.parse(line)
              
      //         if (data.type === 'project') {
      //           set((state) => ({
      //             projects: [...state.projects, data.project],
      //             progress: data.progress
      //           }))
      //         } else if (data.type === 'progress') {
      //           set({ progress: data.progress })
      //         } else if (data.type === 'error') {
      //           set({ error: data.message })
      //         }
      //       } catch (e) {
      //         console.error('Parse error:', e)
      //       }
      //     }
      //   }
      // }
    } catch (error) {
      console.log(error)
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  }
}))