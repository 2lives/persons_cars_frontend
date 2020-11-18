import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { store } from '../../store'
import { getPersons } from '../../store/actions/personsActions'
import axios from 'axios'
import './addPerson.css'

export default class AddPerson extends Component {
    first_name = React.createRef<HTMLDivElement>()
    last_name = React.createRef<HTMLDivElement>()
    email = React.createRef<HTMLDivElement>()

    // Curried function because passing event is deprecated?
    handleChange = (field: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
        (this as any)[field].current.value = evt.target.value
    }

    clearInputs = () => {
        (this.first_name.current as HTMLInputElement).value = '';
        (this.last_name.current as HTMLInputElement).value = '';
        (this.email.current as HTMLInputElement).value = '';
    }

    submitAddPerson = async () => {
        if (
            !(this.email.current as HTMLInputElement).value.length || 
            !(this.first_name.current as HTMLInputElement).value.length || 
            !(this.last_name.current as HTMLInputElement).value.length
        ) {
            alert('Error: To create a person, all fields must be filled')
            return
        }
        try {
            await axios.post(
                '/api/v1/person',
                { 
                    person: {
                        first_name: (this.first_name.current as HTMLInputElement).value,
                        last_name: (this.last_name.current as HTMLInputElement).value,
                        email: (this.email.current as HTMLInputElement).value
                    }
                }
            )
            .then(() => {
                store.dispatch(getPersons() as any)
            });

            this.clearInputs()

        }
        catch(e) {
            console.error(e)
        }
    }

    render() {
        return(
            <div className="add-person-wrapper">
                <div className="text-fields">
                    <TextField 
                        label="First Name" 
                        inputRef={this.first_name}
                        onChange={this.handleChange('first_name')}
                        variant="outlined"
                        />
                    <TextField 
                        label="Last Name" 
                        inputRef={this.last_name}
                        onChange={this.handleChange('last_name')}
                        variant="outlined" 
                        />
                    <TextField 
                        label="Email" 
                        inputRef={this.email}
                        onChange={this.handleChange('email')}
                        type="email"
                        variant="outlined"
                    />
                </div>
                <Button className="add-person-button" onClick={this.submitAddPerson}>Add Person</Button>
            </div>
        )
    }
}
