export const PERSONS_SUCCESS = 'PERSONS_SUCCESS'
export const PERSONS_FAIL = 'PERSONS_FAIL'
export const PERSONS_LOADING = 'PERSONS_LOADING'
export const CARS_SUCCESS = 'CARS_SUCCESS'
export const PERSONS_DELETE = 'PERSONS_DELETE'
export const PERSONS_UPDATE = 'PERSONS_UPDATE'
export const CARS_DELETE = 'CARS_DELETE'
export const CARS_UPDATE = 'CARS_UPDATE'

export interface ICar {
    id: number
    year: number
    make: string
    model: string
    price: number
    person_id: number
}

export interface IPerson {
    id: number
    first_name: string
    last_name: string
    email: string
    cars?: ICar[]
}

export interface PersonsState {
    data: IPerson[] | null | undefined,
    loading: boolean
}

interface GetPersonsAction {
    type: typeof PERSONS_SUCCESS
    payload: IPerson[]
}
interface UpdatePersonsAction {
    type: typeof PERSONS_UPDATE
    payload: IPerson
}

interface PersonsFailAction {
    type: typeof PERSONS_FAIL
}
interface PersonsDeleteAction {
    type: typeof PERSONS_DELETE,
    payload: number 
}
interface CarsDeleteAction {
    type: typeof CARS_DELETE,
    payload: { person_id: number, car_id: number } 
}
interface CarsUpdateAction {
    type: typeof CARS_UPDATE,
    payload: { person_id: number, car: ICar }
}
interface GetCars {
    type: typeof CARS_SUCCESS
    payload: ICar
}

export type personsProps = {
    persons: {
        data: IPerson[]
        loading: boolean
    }
}

export type PersonsAction = GetPersonsAction | PersonsFailAction | GetCars | CarsDeleteAction | CarsUpdateAction | PersonsDeleteAction | UpdatePersonsAction