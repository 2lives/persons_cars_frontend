import { PersonsDispatchTypes, IPerson, PERSONS_SUCCESS, PERSONS_FAIL, PERSONS_LOADING } from '../actions/personsAndCarsTypes'

interface IdefaultState {
    loading: boolean
    persons?: IPerson[]
}

const defaultState: IdefaultState = {
    loading: false
}


const personsAndCarsReducer = (state: IdefaultState = defaultState, action: PersonsDispatchTypes) : IdefaultState => {
    switch (action.type) {
        case PERSONS_FAIL:
            return {
                loading: false
            }
        case PERSONS_LOADING:
            return {
                loading: true
            }
        case PERSONS_SUCCESS:
            return {
                loading: false,
                persons: action.payload
            }
        default:
            return state
    }
}

export default personsAndCarsReducer
