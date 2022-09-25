import { useEffect } from "react"
import { Link, Route, useParams, useRouteMatch } from "react-router-dom"
import Comments from "../components/comments/Comments"
import HighLightedQuote from "../components/quotes/HighlightedQuote"
import LoadingSpinner from "../components/UI/LoadingSpinner"
import useHttp from "../hooks/use-http"
import { getSingleQuote } from "../lib/api"

const QuoteDetails = () => {
    const match = useRouteMatch()
    const params = useParams()
    const { quoteID } = params
    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true)

    useEffect(() => {
        sendRequest(quoteID)
    }, [sendRequest, quoteID])
    // const quote = DUMMY_QUOTES.find(quote => quote.id === Number(params.quoteID))
    if (status === 'pending') return <div className="centered"><LoadingSpinner /></div>
    if (error) return <div className="centered">{error}</div>
    if (!loadedQuote.text) return <p>No quote found!</p>

    return (
        <>
            <HighLightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route path={match.path} exact>
                <div className="centered">
                    <Link to={`${match.url}/comments`} className="btn--flat">Show Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </>
    )
}

export default QuoteDetails