import React from 'react'
import { MapPin, Navigation, Shield, Users } from 'lucide-react'

interface LocationPermissionProps {
  onRequestLocation: () => void
  isLoading: boolean
}

const LocationPermission: React.FC<LocationPermissionProps> = ({ onRequestLocation, isLoading }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-8">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-blue-100 rounded-xl">
          <MapPin className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Share Your Location for Better Insights
          </h3>
          <p className="text-gray-700 mb-4">
            Enable location sharing to get personalized emotional climate data for your area and contribute to your local community's emotional weather patterns.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">Local Community</div>
                <div className="text-xs text-gray-600">Connect with nearby users</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
              <Navigation className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">Accurate Data</div>
                <div className="text-xs text-gray-600">Location-specific insights</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">Privacy First</div>
                <div className="text-xs text-gray-600">Data stays on your device</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRequestLocation}
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Getting Location...</span>
                </>
              ) : (
                <>
                  <Navigation className="h-4 w-4" />
                  <span>Share My Location</span>
                </>
              )}
            </button>
            <div className="text-sm text-gray-600 flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Your location is only used locally and never shared with third parties
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationPermission
