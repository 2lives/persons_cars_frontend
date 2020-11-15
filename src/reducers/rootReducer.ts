import { combineReducers } from 'redux'
import personsAndCarsReducer from './personsAndCarsReducer'

const RootReducer = combineReducers({
    persons: personsAndCarsReducer
})

export default RootReducer