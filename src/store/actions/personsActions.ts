import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '..'
import { PersonsAction, PERSONS_LOADING, PERSONS_FAIL, PERSONS_SUCCESS } from '../types'

const getPersonsSuccess = (persons: any) => ({
    type: PERSONS_SUCCESS,
    payload: persons
})

export const getPersons = (): ThunkAction<void, RootState, null, PersonsAction> => {
    return async dispatch => {
        console.log(';in here')
        try {
            const res = await axios.get('/api/v1/person')
            dispatch({
                type: PERSONS_SUCCESS,
                payload: res.data
            })
        }
        catch(e) {
            dispatch({
                type: PERSONS_FAIL
            })
        }
    }
}


export const personsLoading = (): PersonsAction => {
    return {
        type: PERSONS_LOADING
    }
}