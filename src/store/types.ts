export const PERSONS_SUCCESS = 'PERSONS_SUCCESS'
export const PERSONS_FAIL = 'PERSONS_FAIL'
export const PERSONS_LOADING = 'PERSONS_LOADING'

export interface ICar {
    year: number
    make: string
    model: string
    price: number
}

export interface IPerson {
    first_name: string
    last_name: string
    email: string
    cars?: ICar[]
}

export interface PersonsState {
    data: IPerson[] | null,
    loading: boolean
}

interface GetPersonsAction {
    type: typeof PERSONS_SUCCESS
    payload: IPerson[]
}

interface PersonsLoadingAction {
    type: typeof PERSONS_LOADING
}
interface PersonsFailAction {
    type: typeof PERSONS_FAIL
}

export type PersonsAction = GetPersonsAction | PersonsLoadingAction | PersonsFailAction