import React from 'react'
import { RefreshCw } from 'lucide-react'

interface EmotionalWeather {
  condition: string
  intensity: number
  description: string
  icon: React.ComponentType
  color: string
  bgGradient: string
}

interface EmotionalForecastProps {
  weather: EmotionalWeather
  onRefresh: () => void
}

const EmotionalForecast: React.FC<EmotionalForecastProps> = ({ weather, onRefresh }) => {
  const IconComponent = weather.icon

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${weather.bgGradient} rounded-3xl shadow-2xl text-white`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white/15"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 rounded-full bg-white/10"></div>
      </div>

      <div className="relative p-8 lg:p-12">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <IconComponent className="h-12 w-12" />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">{weather.condition}</h2>
              <div className="flex items-center space-x-2">
                <div className="text-6xl lg:text-7xl font-light">{weather.intensity}%</div>
                <div className="text-lg opacity-90">intensity</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onRefresh}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors group"
            title="Get new forecast"
          >
            <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <p className="text-lg lg:text-xl leading-relaxed">{weather.description}</p>
        </div>

        {/* Hourly Forecast */}
        <div className="grid grid-cols-4 gap-4">
          {['Morning', 'Afternoon', 'Evening', 'Night'].map((time, index) => {
            const intensityVariation = weather.intensity + (Math.random() - 0.5) * 20
            const clampedIntensity = Math.max(10, Math.min(100, intensityVariation))
            
            return (
              <div key={time} className="text-center">
                <div className="text-sm opacity-80 mb-2">{time}</div>
                <div className="p-3 bg-white/15 rounded-xl backdrop-blur-sm">
                  <IconComponent className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-lg font-semibold">{Math.round(clampedIntensity)}%</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default EmotionalForecast
