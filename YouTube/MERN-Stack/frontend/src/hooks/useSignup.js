import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const options = {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch('/api/user/signup', options)
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}

export default useSignup