import { useState, useEffect } from 'react'

const useCounter = (forwards = true, initValue = 0) => {
    const [counter, setCounter] = useState(initValue)

    useEffect(() => {
        const interval = setInterval(() => {
            if (forwards) setCounter(prevCounter => prevCounter + 1)
            else setCounter(prevCounter => prevCounter - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [forwards])

    return counter
}

export default useCounter