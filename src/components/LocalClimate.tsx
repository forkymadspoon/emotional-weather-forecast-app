import React from 'react'
import { MapPin, Users, TrendingUp, TrendingDown, Minus, Navigation } from 'lucide-react'

interface LocalClimateData {
  averageIntensity: number
  dominantMood: string
  totalReports: number
  trend: 'improving' | 'declining' | 'stable'
}

interface LocalClimateProps {
  data: LocalClimateData | null
  location: string
  hasLocationData?: boolean
}

const LocalClimate: React.FC<LocalClimateProps> = ({ data, location, hasLocationData = false }) => {
  if (!data) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
          Local Emotional Climate
        </h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-4">No local data available yet</p>
          <p className="text-sm text-gray-500 mb-4">
            Submit your first mood report to start building the emotional climate data for {location}
          </p>
          {!hasLocationData && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-sm text-blue-700">
                <Navigation className="h-4 w-4" />
                <span>Enable location sharing for more accurate local data</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const getTrendIcon = () => {
    switch (data.trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = () => {
    switch (data.trend) {
      case 'improving':
        return 'text-green-600 bg-green-50'
      case 'declining':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getIntensityColor = () => {
    if (data.averageIntensity >= 70) return 'text-green-600'
    if (data.averageIntensity >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
        Local Emotional Climate
        {hasLocationData && (
          <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
            📍 Live Location
          </span>
        )}
      </h3>
      
      <div className="space-y-6">
        {/* Location Header */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">{location}</h4>
            <p className="text-sm text-gray-600">
              Based on {data.totalReports} recent reports
              {hasLocationData && (
                <span className="text-indigo-600 font-medium"> • Location-specific data</span>
              )}
            </p>
          </div>
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="capitalize">{data.trend}</span>
          </div>
        </div>

        {/* Climate Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className={`text-2xl font-bold ${getIntensityColor()}`}>
              {data.averageIntensity}%
            </div>
            <div className="text-sm text-gray-600">Average Intensity</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-indigo-600 capitalize">
              {data.dominantMood}
            </div>
            <div className="text-sm text-gray-600">Dominant Mood</div>
          </div>
        </div>

        {/* Climate Description */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <p className="text-sm text-gray-700">
            <strong>Current Climate:</strong> The emotional atmosphere in {location} is predominantly{' '}
            <span className="font-medium">{data.dominantMood}</span> with an average intensity of{' '}
            <span className="font-medium">{data.averageIntensity}%</span>. 
            {data.trend === 'improving' && ' The community mood is trending upward! ☀️'}
            {data.trend === 'declining' && ' The community mood needs some sunshine. 🌤️'}
            {data.trend === 'stable' && ' The emotional climate is steady. 🌤️'}
          </p>
        </div>

        {/* Community Impact */}
        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
          <Users className="h-5 w-5 text-purple-600" />
          <div className="text-sm text-purple-800">
            <strong>Community Impact:</strong> Your mood reports help create a supportive emotional environment for everyone in {location}.
            {hasLocationData && (
              <span className="block mt-1 font-medium">
                🎯 Your location data makes this community insight more accurate!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocalClimate
