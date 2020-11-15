import Axios from 'axios'
import { Dispatch } from 'redux'
import { PersonsDispatchTypes, PERSONS_LOADING, PERSONS_FAIL, PERSONS_SUCCESS } from './personsAndCarsTypes'
import axios from 'axios'

export const getPersons = () => async (dispatch: Dispatch<PersonsDispatchTypes>) => {
    try {
        dispatch({
            type: PERSONS_LOADING
        })

        const res = await axios.get('localhost:3000/api/v1/person')
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