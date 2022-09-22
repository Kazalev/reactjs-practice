const redux = require('redux')

const coutnerReducer = (state = { counter: 0 }, action) => {
    if (action.type == 'increment') return { counter: state.counter + 1 }
    if (action.type == 'decrement') return { counter: state.counter - 1 }

    return state
}

const store = redux.createStore(coutnerReducer)

const counterSubscriber = () => {
    // Triggered when the state changes
    const latestState = store.getState() // Get the latest state
    console.log(latestState)
}

store.subscribe(counterSubscriber)

store.dispatch({ type: 'increment' })
store.dispatch({ type: 'decrement' })