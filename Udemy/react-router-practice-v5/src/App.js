import React, { Suspense } from "react"
import { Redirect, Route, Switch } from "react-router-dom"

// import AllQuotes from "./pages/AllQuotes"
// import QuoteDetails from "./pages/QuoteDetails"
// import NewQuote from "./pages/NewQuote"
// import NotFound from "./pages/NotFound"
import Layout from "./components/layout/Layout"
import LoadingSpinner from "./components/UI/LoadingSpinner"

const NewQuote = React.lazy(() => import('./pages/NewQuote'))
const QuoteDetails = React.lazy(() => import('./pages/QuoteDetails'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'))

function App() {
  return (
    <div>
      <Layout>
        <Suspense fallback={<div className="centered"><LoadingSpinner /></div>}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/quotes" />
            </Route>
            <Route path="/quotes" exact>
              <AllQuotes />
            </Route>
            <Route path="/quotes/:quoteID">
              <QuoteDetails />
            </Route>
            <Route path="/new-quote">
              <NewQuote />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </div>
  )
}

export default App