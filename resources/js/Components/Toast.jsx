import { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/react'

export default function Toast() {
    const { flash } = usePage().props
    const [showToast, setShowToast] = useState(true)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        if (flash.message) {
            setShowToast(true)
            setIsVisible(true)
            const fadeTimer = setTimeout(() => setIsVisible(false), 1000) // Start fade 300ms before disappear
            const removeTimer = setTimeout(() => setShowToast(false), 1500) // Total 2 seconds
            return () => {
                clearTimeout(fadeTimer)
                clearTimeout(removeTimer)
            }
        }
    }, [flash.message])

    if (!flash.message || !showToast) return null

    return (
        <div className={`toast toast-center toast-middle border-1 border-black bg-red-500 p-3 rounded-lg transition-opacity duration-300 ${
            isVisible ? 'opacity-90' : 'opacity-0'
        }`}>
            {flash.message}
        </div>
    )
}