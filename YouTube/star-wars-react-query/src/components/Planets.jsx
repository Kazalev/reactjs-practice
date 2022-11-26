import { useState } from "react"
import { useQuery } from "react-query"
import Planet from "./Planet"

const fetchPlanets = async (key) => {
    const page = key.queryKey[1]
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`)
    return res.json()
}

const Planets = () => {
    const [page, setPage] = useState(1)
    const { data, status } = useQuery(['planets', page], fetchPlanets, {
        keepPreviousData: true,
    })

    return (
        <div>
            <h2>Planets</h2>

            {status === 'loading' && (
                <div>Loading data...</div>
            )}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {status === 'success' && (
                <>
                    <button onClick={() => setPage(curr => Math.max(curr - 1, 1))} disabled={page === 1}>Previous Page</button>
                    <span>{page}</span>
                    <button onClick={() => setPage(curr => (!data.results ? curr : curr + 1))} disabled={!data?.results || !data.next}>Next Page</button>
                    <div>{data?.results && data.results.map(planet => <Planet key={planet.name} planet={planet} />)}</div>
                </>
            )}
        </div>
    )
}

export default Planets