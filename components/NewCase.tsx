"use client"

import { useState, useEffect } from 'react'
import { Mic } from 'lucide-react'

const AnimatedWaveform = () => {
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (isAnimating) {
        const timer = setTimeout(() => setIsAnimating(false), 5000) // Stop after 5 seconds
        return () => clearTimeout(timer)
        }
    }, [isAnimating])

    const generateRandomPoints = () => {
        const points = []
        for (let i = 0; i < 100; i++) {
        points.push(Math.random() * 50)
        }
        return points.join(' ')
    }

    return (
        <svg className="w-full h-32" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <polyline
            points={generateRandomPoints()}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            className={isAnimating ? "animate-wave" : ""}
        />
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
        </defs>
        </svg>
    )
}

export default function NewCase() {
    const [isRecording, setIsRecording] = useState(false)

    const handleMicClick = () => {
        setIsRecording(!isRecording)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-12">
            What is <span className="text-gray-400">your story?</span>
        </h1>
        <div className="w-full max-w-3xl mb-12">
            <AnimatedWaveform />
        </div>
        <button
            onClick={handleMicClick}
            className={`rounded-full p-6 transition-colors duration-300 ${
            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'
            }`}
        >
            <Mic className="w-8 h-8 text-white" />
        </button>
        </div>
    )
}