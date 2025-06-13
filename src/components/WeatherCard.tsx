import React from 'react'

interface WeatherCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  color?: string
  bgColor?: string
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color = 'text-indigo-600',
  bgColor = 'bg-indigo-50'
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 ${bgColor} rounded-lg`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
