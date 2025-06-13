import React, { useState } from 'react'
import { Send, Heart, Frown, Smile, Meh, Angry, Zap } from 'lucide-react'

interface MoodSubmissionProps {
  onSubmit: (mood: string, intensity: number) => void
}

const moodOptions = [
  { name: 'joyful', icon: Smile, color: 'bg-yellow-500', label: 'Joyful' },
  { name: 'content', icon: Heart, color: 'bg-green-500', label: 'Content' },
  { name: 'neutral', icon: Meh, color: 'bg-gray-500', label: 'Neutral' },
  { name: 'anxious', icon: Zap, color: 'bg-purple-500', label: 'Anxious' },
  { name: 'sad', icon: Frown, color: 'bg-blue-500', label: 'Sad' },
  { name: 'angry', icon: Angry, color: 'bg-red-500', label: 'Angry' },
]

const MoodSubmission: React.FC<MoodSubmissionProps> = ({ onSubmit }) => {
  const [selectedMood, setSelectedMood] = useState('')
  const [intensity, setIntensity] = useState(50)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMood) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onSubmit(selectedMood, intensity)
    setSelectedMood('')
    setIntensity(50)
    setIsSubmitting(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        How are you feeling right now?
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mood Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select your current mood
          </label>
          <div className="grid grid-cols-2 gap-3">
            {moodOptions.map((mood) => {
              const IconComponent = mood.icon
              return (
                <button
                  key={mood.name}
                  type="button"
                  onClick={() => setSelectedMood(mood.name)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedMood === mood.name
                      ? 'border-indigo-500 bg-indigo-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-8 h-8 ${mood.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{mood.label}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Intensity Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Intensity: {intensity}%
          </label>
          <div className="relative">
            <input
              type="range"
              min="1"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Intense</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedMood || isSubmitting}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
            !selectedMood || isSubmitting
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Submit Mood Report</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <p className="text-sm text-blue-800">
          <strong>Your contribution matters!</strong> Each mood report helps create a more accurate emotional climate map for your community.
        </p>
      </div>
    </div>
  )
}

export default MoodSubmission
