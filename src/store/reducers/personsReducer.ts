import { Console } from 'console'
import { PersonsState, PersonsAction, IPerson, ICar, PERSONS_SUCCESS, PERSONS_UPDATE, PERSONS_FAIL, CARS_SUCCESS, CARS_UPDATE, PERSONS_DELETE, CARS_DELETE } from '../types'

const initialState: PersonsState = {
    data: null,
    loading: false
}

interface IDeleteCarPayload {
    person_id: number
    car_id: number
}

const personsReducer = (state = initialState, action: PersonsAction): PersonsState => {
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
        case PERSONS_DELETE:
                return {
                    ...state,
                    data: state.data?.filter((person: IPerson) => person.id !== action.payload)
                }
        case PERSONS_UPDATE:
            return {
                ...state,
                data: state.data?.map((person) => {
                    if (person.id !== action.payload.id) {
                        return person
                    }
                    return { ...person, ...action.payload }
                })
            }
        case CARS_SUCCESS:
            const persons = state.data
            const updatedPersons = persons?.map((person: IPerson) => {
                if(person.id === action.payload.person_id) {
                    person.cars?.push(action.payload)
                }
                return person
            })
            return { ...state, data: updatedPersons }
        case CARS_UPDATE:
            return {
                ...state,
                data: state.data?.map((person) => {
                    if (person.id !== action.payload.person_id) {
                        return person
                    }
                    else {
                        person.cars?.map((car) => {
                            if (car.id !== action.payload.car.id) {
                                return null
                            }
                            else {
                                let b = person.cars
                                let a = b?.filter((car) => {
                                    return car.id !== action.payload.car.id
                                })
                                let c = a?.concat([action.payload.car])
                                person.cars = c
                                return person
                            }
                        })
                        return person
                    }
                })
            }
        case CARS_DELETE:
            const stateClones = state.data
            const updatedClones = stateClones?.map((person: IPerson) => {
                if (person.id === action.payload.person_id) {
                    person.cars = person.cars?.filter((car: ICar) => car.id !== (action.payload as IDeleteCarPayload).car_id)
                    return person
                }
                return person
            })
            return { ...state, data: updatedClones }
        default:
            return state
    }
}

export default personsReducer