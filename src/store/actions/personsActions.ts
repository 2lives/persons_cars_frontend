import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '..'
import { ICar, PersonsAction, PERSONS_FAIL, PERSONS_DELETE, PERSONS_SUCCESS, PERSONS_UPDATE, CARS_SUCCESS, CARS_DELETE, CARS_UPDATE } from '../types'

export const getPersons = (): ThunkAction<void, RootState, null, PersonsAction> => {
    return async dispatch => {
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

export const updatePerson = (person: any): PersonsAction => {
    return {
        type: PERSONS_UPDATE,
        payload: person
    }
}
export const updateCar = (person_id: number, car: ICar): PersonsAction => {
    return {
        type: CARS_UPDATE,
        payload: { person_id, car }
    }
}
export const deletePerson = (id: number): PersonsAction => {
    return {
        type: PERSONS_DELETE,
        payload: id
    }
}

export const addCar = (data: ICar): PersonsAction => {
    return {
        type: CARS_SUCCESS,
        payload: data
    }
}

export const deleteCar = (person_id: number, car_id: number): PersonsAction => {
    return {
        type: CARS_DELETE,
        payload: { person_id, car_id }
    }
}