import React from 'react'
import { Thermometer, Droplets, Eye, Wind, Gauge, Navigation2, Sun } from 'lucide-react'

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

interface WeatherMetricsProps {
  weatherData: WeatherData
  isLoading: boolean
  location: string
}

const WeatherMetrics: React.FC<WeatherMetricsProps> = ({ weatherData, isLoading, location }) => {
  const getUVLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: 'Low', color: 'text-green-600', bgColor: 'bg-green-50' }
    if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
    if (uvIndex <= 7) return { level: 'High', color: 'text-orange-600', bgColor: 'bg-orange-50' }
    if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-600', bgColor: 'bg-red-50' }
    return { level: 'Extreme', color: 'text-purple-600', bgColor: 'bg-purple-50' }
  }

  const getHumidityLevel = (humidity: number) => {
    if (humidity < 30) return { level: 'Low', color: 'text-orange-600' }
    if (humidity <= 60) return { level: 'Comfortable', color: 'text-green-600' }
    return { level: 'High', color: 'text-blue-600' }
  }

  const getTemperatureColor = (temp: number) => {
    if (temp < 10) return 'text-blue-600'
    if (temp < 20) return 'text-cyan-600'
    if (temp < 30) return 'text-green-600'
    if (temp < 35) return 'text-yellow-600'
    return 'text-red-600'
  }

  const uvLevel = getUVLevel(weatherData.uvIndex)
  const humidityLevel = getHumidityLevel(weatherData.humidity)

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-gray-600">Loading weather data...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Sun className="h-5 w-5 mr-2 text-yellow-500" />
          Current Weather Conditions
        </h3>
        <div className="text-sm text-gray-600 flex items-center">
          <Navigation2 className="h-4 w-4 mr-1" />
          {location}
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Temperature */}
        <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
          <div className="flex items-center justify-center mb-3">
            <Thermometer className={`h-8 w-8 ${getTemperatureColor(weatherData.temperature)}`} />
          </div>
          <div className={`text-3xl font-bold ${getTemperatureColor(weatherData.temperature)} mb-1`}>
            {weatherData.temperature}°C
          </div>
          <div className="text-sm text-gray-600 mb-2">Temperature</div>
          <div className="text-xs text-gray-500">
            Feels like {weatherData.feelsLike}°C
          </div>
        </div>

        {/* Humidity */}
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
          <div className="flex items-center justify-center mb-3">
            <Droplets className={`h-8 w-8 ${humidityLevel.color}`} />
          </div>
          <div className={`text-3xl font-bold ${humidityLevel.color} mb-1`}>
            {weatherData.humidity}%
          </div>
          <div className="text-sm text-gray-600 mb-2">Humidity</div>
          <div className={`text-xs px-2 py-1 rounded-full ${humidityLevel.color} bg-opacity-10`}>
            {humidityLevel.level}
          </div>
        </div>

        {/* UV Index */}
        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
          <div className="flex items-center justify-center mb-3">
            <Eye className={`h-8 w-8 ${uvLevel.color}`} />
          </div>
          <div className={`text-3xl font-bold ${uvLevel.color} mb-1`}>
            {weatherData.uvIndex}
          </div>
          <div className="text-sm text-gray-600 mb-2">UV Index</div>
          <div className={`text-xs px-2 py-1 rounded-full ${uvLevel.color} ${uvLevel.bgColor}`}>
            {uvLevel.level}
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <Wind className="h-5 w-5 text-gray-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">{weatherData.windSpeed}</div>
          <div className="text-xs text-gray-600">km/h Wind</div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <Gauge className="h-5 w-5 text-gray-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">{weatherData.pressure}</div>
          <div className="text-xs text-gray-600">hPa Pressure</div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <Eye className="h-5 w-5 text-gray-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">{weatherData.visibility}</div>
          <div className="text-xs text-gray-600">km Visibility</div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <Sun className="h-5 w-5 text-gray-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900 capitalize">{weatherData.condition}</div>
          <div className="text-xs text-gray-600">Conditions</div>
        </div>
      </div>

      {/* Weather Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
        <h4 className="font-medium text-gray-900 mb-2">Weather Impact on Mood</h4>
        <p className="text-sm text-gray-700">
          {weatherData.temperature > 25 && weatherData.uvIndex > 6 && (
            "☀️ Perfect sunny weather! High temperatures and UV levels often boost mood and energy levels."
          )}
          {weatherData.temperature < 15 && weatherData.humidity > 70 && (
            "🌧️ Cool and humid conditions may encourage introspection and cozy indoor activities."
          )}
          {weatherData.temperature >= 15 && weatherData.temperature <= 25 && weatherData.humidity < 60 && (
            "🌤️ Ideal weather conditions! Comfortable temperature and humidity create perfect conditions for outdoor activities and positive mood."
          )}
          {weatherData.uvIndex <= 2 && (
            " Low UV levels make it safe for extended outdoor time without sun protection concerns."
          )}
          {weatherData.uvIndex > 8 && (
            " High UV levels - remember sun protection if spending time outdoors!"
          )}
        </p>
      </div>
    </div>
  )
}

export default WeatherMetrics
