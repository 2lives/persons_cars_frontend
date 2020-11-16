import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import personsReducer from './reducers/personsReducer'

const rootReducer = combineReducers({
    persons: personsReducer
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>