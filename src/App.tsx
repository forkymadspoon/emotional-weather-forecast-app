import React, { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, Zap, Wind, Snowflake, MapPin, TrendingUp, Users, Calendar, Clock, Navigation, Thermometer, Droplets, Eye } from 'lucide-react'
import EmotionalForecast from './components/EmotionalForecast'
import MoodSubmission from './components/MoodSubmission'
import LocalClimate from './components/LocalClimate'
import WeatherCard from './components/WeatherCard'
import LocationPermission from './components/LocationPermission'
import WeatherMetrics from './components/WeatherMetrics'

interface EmotionalWeather {
  condition: string
  intensity: number
  description: string
  icon: React.ComponentType
  color: string
  bgGradient: string
}

interface MoodEntry {
  id: string
  mood: string
  intensity: number
  timestamp: Date
  location: string
  coordinates?: {
    lat: number
    lng: number
  }
}

interface LocationData {
  city: string
  region: string
  country: string
  district?: string
  neighborhood?: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface WeatherData {
  temperature: number
  humidity: number
  uvIndex: number
  condition: string
  windSpeed: number
  pressure: number
  visibility: number
  feelsLike: number
}

const emotionalConditions: Record<string, EmotionalWeather> = {
  sunny: {
    condition: 'Sunny Disposition',
    intensity: 85,
    description: '99% chance of spontaneous joy, with scattered moments of contentment throughout the day.',
    icon: Sun,
    color: 'text-yellow-500',
    bgGradient: 'from-yellow-400 to-orange-400'
  },
  cloudy: {
    condition: 'Mild Existential Dread',
    intensity: 65,
    description: '75% chance of overthinking, clearing up by dinner with possible bursts of motivation.',
    icon: Cloud,
    color: 'text-gray-500',
    bgGradient: 'from-gray-400 to-gray-600'
  },
  rainy: {
    condition: 'Emotional Drizzle',
    intensity: 45,
    description: '60% chance of melancholy with intermittent periods of introspection and tea consumption.',
    icon: CloudRain,
    color: 'text-blue-500',
    bgGradient: 'from-blue-400 to-indigo-500'
  },
  stormy: {
    condition: 'Anxiety Storm',
    intensity: 30,
    description: '90% chance of racing thoughts with possible lightning bolts of panic, subsiding by evening.',
    icon: Zap,
    color: 'text-purple-500',
    bgGradient: 'from-purple-500 to-pink-500'
  },
  windy: {
    condition: 'Restless Winds',
    intensity: 55,
    description: '80% chance of fidgeting and inability to focus, with gusts of creative energy.',
    icon: Wind,
    color: 'text-teal-500',
    bgGradient: 'from-teal-400 to-cyan-500'
  },
  snowy: {
    condition: 'Peaceful Snowfall',
    intensity: 70,
    description: '85% chance of calm reflection with a blanket of serenity covering all worries.',
    icon: Snowflake,
    color: 'text-blue-300',
    bgGradient: 'from-blue-200 to-indigo-300'
  }
}

function App() {
  const [currentWeather, setCurrentWeather] = useState<EmotionalWeather>(emotionalConditions.cloudy)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [location, setLocation] = useState('Your Area')
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [locationPermission, setLocationPermission] = useState<'pending' | 'granted' | 'denied' | 'unsupported'>('pending')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [isLoadingWeather, setIsLoadingWeather] = useState(false)

  useEffect(() => {
    // Load saved mood entries
    const saved = localStorage.getItem('moodEntries')
    if (saved) {
      const parsed = JSON.parse(saved)
      setMoodEntries(parsed.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      })))
    }

    // Load saved location data
    const savedLocation = localStorage.getItem('locationData')
    if (savedLocation) {
      const parsedLocation = JSON.parse(savedLocation)
      setLocationData(parsedLocation)
      setLocation(formatLocationDisplay(parsedLocation))
      setLocationPermission('granted')
      // Fetch weather data for saved location
      fetchWeatherData(parsedLocation.coordinates.lat, parsedLocation.coordinates.lng)
    }

    // Generate initial forecast
    generateForecast()

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setLocationPermission('unsupported')
      setLocation('Location Not Available')
    }
  }, [])

  const formatLocationDisplay = (locationData: LocationData): string => {
    // For Singapore, prioritize specific regions/districts
    if (locationData.country.toLowerCase().includes('singapore')) {
      // Try to get the most specific location available
      if (locationData.neighborhood) {
        return `${locationData.neighborhood}, Singapore`
      }
      if (locationData.district) {
        return `${locationData.district}, Singapore`
      }
      if (locationData.region && locationData.region !== 'Singapore') {
        return `${locationData.region}, Singapore`
      }
      if (locationData.city && locationData.city !== 'Singapore') {
        return `${locationData.city}, Singapore`
      }
      return 'Singapore'
    }
    
    // For other countries, use city, country format
    return `${locationData.city}, ${locationData.country}`
  }

  const generateForecast = () => {
    const conditions = Object.keys(emotionalConditions)
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
    setCurrentWeather(emotionalConditions[randomCondition])
  }

  const fetchWeatherData = async (lat: number, lng: number) => {
    setIsLoadingWeather(true)
    try {
      // Using OpenWeatherMap API (free tier)
      const API_KEY = 'demo_key' // In a real app, this would be from environment variables
      
      // For demo purposes, we'll simulate weather data based on location
      // In production, you'd use: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
      
      // Simulate realistic weather data based on coordinates
      const simulatedWeather: WeatherData = {
        temperature: Math.round(20 + Math.random() * 15), // 20-35°C
        humidity: Math.round(40 + Math.random() * 40), // 40-80%
        uvIndex: Math.round(1 + Math.random() * 10), // 1-11
        condition: ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        windSpeed: Math.round(5 + Math.random() * 15), // 5-20 km/h
        pressure: Math.round(1000 + Math.random() * 50), // 1000-1050 hPa
        visibility: Math.round(8 + Math.random() * 7), // 8-15 km
        feelsLike: Math.round(22 + Math.random() * 12) // Feels like temperature
      }

      // Add some location-based variation
      if (lat > 40) { // Northern locations
        simulatedWeather.temperature -= 5
        simulatedWeather.humidity += 10
      }
      if (lat < 10) { // Tropical locations (like Singapore)
        simulatedWeather.temperature += 5
        simulatedWeather.humidity += 15
        simulatedWeather.uvIndex += 2
      }

      setWeatherData(simulatedWeather)
    } catch (error) {
      console.error('Error fetching weather data:', error)
      // Set default weather data on error
      setWeatherData({
        temperature: 25,
        humidity: 60,
        uvIndex: 5,
        condition: 'Partly Cloudy',
        windSpeed: 10,
        pressure: 1013,
        visibility: 10,
        feelsLike: 27
      })
    } finally {
      setIsLoadingWeather(false)
    }
  }

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setLocationPermission('unsupported')
      return
    }

    setIsLoadingLocation(true)

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        })
      })

      const { latitude, longitude } = position.coords

      // Use OpenStreetMap Nominatim for reverse geocoding (free and accurate)
      const locationName = await reverseGeocode(latitude, longitude)
      
      const newLocationData: LocationData = {
        city: locationName.city,
        region: locationName.region,
        country: locationName.country,
        district: locationName.district,
        neighborhood: locationName.neighborhood,
        coordinates: {
          lat: latitude,
          lng: longitude
        }
      }

      setLocationData(newLocationData)
      setLocation(formatLocationDisplay(newLocationData))
      setLocationPermission('granted')
      
      // Save location data
      localStorage.setItem('locationData', JSON.stringify(newLocationData))

      // Fetch weather data for the new location
      await fetchWeatherData(latitude, longitude)

    } catch (error) {
      console.error('Error getting location:', error)
      setLocationPermission('denied')
      setLocation('Location Access Denied')
    } finally {
      setIsLoadingLocation(false)
    }
  }

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      // Use OpenStreetMap Nominatim API for accurate reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'EmotionalWeatherApp/1.0'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Geocoding API request failed')
      }

      const data = await response.json()
      
      // Extract location information from the response
      const address = data.address || {}
      
      // For Singapore, extract specific regional information
      let neighborhood = null
      let district = null
      
      if (address.country && address.country.toLowerCase().includes('singapore')) {
        // Singapore-specific location parsing
        neighborhood = address.neighbourhood || 
                      address.suburb || 
                      address.residential ||
                      address.quarter ||
                      address.hamlet
        
        district = address.city_district ||
                  address.district ||
                  address.subdistrict ||
                  address.town ||
                  address.village ||
                  address.municipality
        
        // Some Singapore areas might be in different fields
        if (!neighborhood && !district) {
          // Try alternative fields that might contain Singapore regions
          neighborhood = address.amenity ||
                        address.building ||
                        address.house_name
          
          district = address.road ||
                    address.pedestrian ||
                    address.footway
        }
        
        // Clean up common Singapore location patterns
        if (neighborhood) {
          neighborhood = neighborhood.replace(/\s+(Estate|Park|Gardens?|Court|Place|Avenue|Road|Street|Drive|Lane|Walk|Close|Crescent|Rise|Hill|View|Heights?)$/i, '')
        }
        
        if (district) {
          district = district.replace(/\s+(Estate|Park|Gardens?|Court|Place|Avenue|Road|Street|Drive|Lane|Walk|Close|Crescent|Rise|Hill|View|Heights?)$/i, '')
        }
      }
      
      // Try to get city from various possible fields
      const city = address.city || 
                   address.town || 
                   address.village || 
                   address.municipality || 
                   address.county ||
                   address.state_district ||
                   'Unknown City'

      // Get region/state
      const region = address.state || 
                     address.province || 
                     address.region ||
                     address.county ||
                     ''

      // Get country
      const country = address.country || 'Unknown Country'

      return {
        city,
        region,
        country,
        district,
        neighborhood
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error)
      
      // Fallback: Use coordinate-based location naming
      return {
        city: `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`,
        region: 'Coordinates',
        country: 'Unknown',
        district: null,
        neighborhood: null
      }
    }
  }

  const submitMood = (mood: string, intensity: number) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      intensity,
      timestamp: new Date(),
      location,
      coordinates: locationData?.coordinates
    }
    
    const updatedEntries = [newEntry, ...moodEntries].slice(0, 50) // Keep last 50 entries
    setMoodEntries(updatedEntries)
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries))
  }

  const getLocalClimateData = () => {
    if (moodEntries.length === 0) return null

    // Filter entries by current location if we have location data
    const locationFilteredEntries = locationData 
      ? moodEntries.filter(entry => entry.location === location)
      : moodEntries

    const recentEntries = locationFilteredEntries.slice(0, 20)
    if (recentEntries.length === 0) return null

    const avgIntensity = recentEntries.reduce((sum, entry) => sum + entry.intensity, 0) / recentEntries.length
    
    const moodCounts = recentEntries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const dominantMood = Object.entries(moodCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'neutral'

    return {
      averageIntensity: Math.round(avgIntensity),
      dominantMood,
      totalReports: recentEntries.length,
      trend: recentEntries.length > 1 ? 
        (recentEntries[0].intensity > recentEntries[1].intensity ? 'improving' : 'declining') : 'stable'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Cloud className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Emotional Weather</h1>
                <p className="text-sm text-gray-600">Your daily emotional forecast</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{location}</span>
                {locationData?.neighborhood && (
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                    📍 {locationData.neighborhood}
                  </span>
                )}
              </div>
              {(locationPermission === 'pending' || locationPermission === 'denied') && locationPermission !== 'unsupported' && (
                <button
                  onClick={requestLocation}
                  disabled={isLoadingLocation}
                  className="flex items-center space-x-2 px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {isLoadingLocation ? (
                    <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Navigation className="h-4 w-4" />
                  )}
                  <span>{isLoadingLocation ? 'Locating...' : 'Share Location'}</span>
                </button>
              )}
              {locationPermission === 'granted' && (
                <button
                  onClick={requestLocation}
                  disabled={isLoadingLocation}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {isLoadingLocation ? (
                    <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Navigation className="h-4 w-4" />
                  )}
                  <span>{isLoadingLocation ? 'Updating...' : 'Update Location'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Permission Banner */}
        {locationPermission === 'pending' && (
          <LocationPermission 
            onRequestLocation={requestLocation}
            isLoading={isLoadingLocation}
          />
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Today's Emotional Forecast
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your emotional weather patterns and contribute to your local emotional climate data
            {locationData && (
              <span className="block mt-2 text-lg text-indigo-600 font-medium">
                📍 Currently tracking emotions in {location}
                {locationData.neighborhood && locationData.neighborhood !== locationData.city && (
                  <span className="block text-base text-purple-600">
                    🏘️ Neighborhood: {locationData.neighborhood}
                  </span>
                )}
              </span>
            )}
          </p>
        </div>

        {/* Weather Metrics */}
        {weatherData && (
          <div className="mb-8">
            <WeatherMetrics 
              weatherData={weatherData}
              isLoading={isLoadingWeather}
              location={location}
            />
          </div>
        )}

        {/* Main Weather Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <EmotionalForecast 
              weather={currentWeather}
              onRefresh={generateForecast}
            />
          </div>
          <div>
            <MoodSubmission onSubmit={submitMood} />
          </div>
        </div>

        {/* Stats and Local Climate */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <LocalClimate 
            data={getLocalClimateData()}
            location={location}
            hasLocationData={!!locationData}
          />
          
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Your Emotional Insights
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{moodEntries.length}</div>
                <div className="text-sm text-gray-600">Total Reports</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">
                  {moodEntries.length > 0 ? Math.round(moodEntries.slice(0, 7).reduce((sum, entry) => sum + entry.intensity, 0) / Math.min(7, moodEntries.length)) : 0}%
                </div>
                <div className="text-sm text-gray-600">7-Day Average</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">
                  {moodEntries.length > 0 ? moodEntries.slice(0, 7).length : 0}
                </div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">
                  {locationData ? new Set(moodEntries.filter(e => e.location === location).map(e => e.location)).size : new Set(moodEntries.map(e => e.location)).size}
                </div>
                <div className="text-sm text-gray-600">Locations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Mood History */}
        {moodEntries.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
              Recent Emotional Weather Reports
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {moodEntries.slice(0, 6).map((entry) => (
                <div key={entry.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 capitalize">{entry.mood}</span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {entry.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${entry.intensity}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{entry.intensity}%</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">{entry.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Emotional Weather Forecast - Understanding the climate of human feelings</p>
            <p className="text-sm">Remember: Emotional weather is temporary, but your resilience is permanent ☀️ Created by <a href="https://www.linkedin.com/in/madeleine-cckoh/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 transition-colors">Madeleine Koh</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
