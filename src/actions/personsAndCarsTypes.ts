export const PERSONS_LOADING = "PERSONS_LOADING"
export const PERSONS_FAIL = "PERSONS_FAIL"
export const PERSONS_SUCCESS = "PERSONS_SUCCESS"

export interface ICar {
    year: number
    model: string
    make: string
    price: number
}

export interface IPerson {
    first_name: string
    last_name: string
    email: string
    cars?: ICar[]
}

export interface PersonsLoading {
    type: typeof PERSONS_LOADING
}

export interface PersonsFail {
    type: typeof PERSONS_FAIL
}

export interface PersonsSuccess {
    type: typeof PERSONS_SUCCESS,
    payload: IPerson[]
}

export type PersonsDispatchTypes = PersonsLoading | PersonsFail | PersonsSuccess