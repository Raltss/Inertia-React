import { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/react'

export default function Toast() {
    const { flash } = usePage().props
    const [showToast, setShowToast] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (flash.message || flash.success) {
            setShowToast(true)
            setIsVisible(true)
            
            const fadeTimer = setTimeout(() => setIsVisible(false), 1000)
            const removeTimer = setTimeout(() => setShowToast(false), 1500)
            
            return () => {
                clearTimeout(fadeTimer)
                clearTimeout(removeTimer)
            }
        }
    }, [flash.message, flash.success])

    if (!showToast) return null

    return (
        <>
            {flash.message && (
                <DeleteToast isVisible={isVisible} flash={flash} />
            )}
            {flash.success && (
                <UpdateToast isVisible={isVisible} flash={flash} />
            )}
        </>
    )
}

function DeleteToast({isVisible, flash}){
    return(
        <div className={`toast toast-center toast-middle border-1 border-black bg-red-500 p-3 rounded-lg transition-opacity duration-300 ${
            isVisible ? 'opacity-90' : 'opacity-0'
        }`}>
            {flash.message}
        </div>
    )
}

function UpdateToast({isVisible, flash}){
    return(
        <div className={`toast toast-center toast-middle border-1 border-black bg-green-500 p-3 rounded-lg transition-opacity duration-300 ${
            isVisible ? 'opacity-90' : 'opacity-0'
        }`}>
            {flash.success}
        </div>
    )
}