import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import './addCar.css'
import { IPerson, personsProps } from '../../store/types'

import axios from 'axios'
import { store } from '../../store'
import { addCar } from '../../store/actions/personsActions'

class AddCar extends Component<personsProps, {}> {
    users: IPerson[] | null = null
    year = React.createRef<HTMLDivElement>()
    make = React.createRef<HTMLDivElement>()
    model = React.createRef<HTMLDivElement>()
    price = React.createRef<HTMLDivElement>()
    owner = React.createRef<HTMLDivElement>()

    handleChange = (field: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
        (this as any)[field].current.value = evt.target.value
    }

    clearInputs = () => {
        (this.year.current as HTMLInputElement).value = '';
        (this.make.current as HTMLInputElement).value = '';
        (this.model.current as HTMLInputElement).value = '';
        (this.price.current as HTMLInputElement).value = '';
        (this.owner.current as HTMLInputElement).value = '';
    }

    submitAddCar = async () => {
            try {
                await axios.post(
                    '/api/v1/car',
                    { 
                        car: {
                            year: (this.year.current as HTMLInputElement).value,
                            make: (this.make.current as HTMLInputElement).value,
                            model: (this.model.current as HTMLInputElement).value,
                            price: (this.price.current as HTMLInputElement).value,
                            person_id: (this.owner.current as HTMLInputElement).value
                        }
                    }
                )
                .then((res) => {
                    store.dispatch(addCar(res.data) as any)
                });
    
                this.clearInputs()
            }
            catch(e) {
                console.error(e)
            }
    }
    // test adding user and then see if they show up in select list
    render() {
        return(
            <div className="add-person-wrapper">
                <div className="text-fields">
                    <TextField 
                        label="Year" 
                        variant="outlined"
                        inputRef={this.year}
                        onChange={this.handleChange('year')}
                        />
                    <TextField 
                        label="Make" 
                        variant="outlined" 
                        inputRef={this.make}
                        onChange={this.handleChange('make')}
                        />
                    <TextField 
                        label="Model" 
                        variant="outlined" 
                        inputRef={this.model}
                        onChange={this.handleChange('model')}
                        />
                    <TextField 
                        label="Price" 
                        variant="outlined"
                        inputRef={this.price}
                        onChange={this.handleChange('price')}
                        />
                    <TextField 
                        className="owner-select"
                        variant="outlined"
                        label="Owner"
                        inputRef={this.owner}
                        onChange={this.handleChange('owner')}
                        select
                        >
                        {this.props.persons.data ? this.props.persons.data.map((person) =>{
                            return (
                                <MenuItem key={person.id} value={person.id}>
                                    {person.first_name} {person.last_name}
                                </MenuItem>
                            )
                        }) : null}
                    </TextField>
                </div>
                <Button className="add-car-button" onClick={() => this.submitAddCar()}>Add Car</Button>
            </div>
        )
    }
}

function mapStateToProps(state: RootState) {
    return {
        persons: state.persons
    }
}

export default connect(mapStateToProps)(AddCar as any)