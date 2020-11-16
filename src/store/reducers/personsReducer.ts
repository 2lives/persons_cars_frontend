import { PersonsState, PersonsAction, PERSONS_LOADING, PERSONS_SUCCESS, PERSONS_FAIL } from '../types'

const initialState: PersonsState = {
    data: null,
    loading: false
}

export default (state = initialState, action: PersonsAction): PersonsState => {
    switch(action.type) {
        case PERSONS_SUCCESS:
            return {
                data: action.payload,
                loading: false
            }
        case PERSONS_FAIL:
            return {
                ...state,
                loading: false
            }
        case PERSONS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}