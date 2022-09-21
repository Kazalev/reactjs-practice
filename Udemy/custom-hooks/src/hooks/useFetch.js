import { useCallback, useState } from 'react'

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true)
        setError(null)
        try {
            let options = {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            }
            const response = await fetch(requestConfig.url, options)
            if (!response.ok) throw new Error('Request failed!')
            const data = await response.json()

            applyData(data)
        } catch (err) { setError(err.message || 'Something went wrong!') }

        setIsLoading(false)
    }, [])

    return { isLoading, error, sendRequest }
}

export default useFetch