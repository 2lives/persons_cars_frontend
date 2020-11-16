import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import './addPerson.css'
export default class AddPerson extends Component {
    render() {
        return(
            <div className="add-person-wrapper">
                <div className="text-fields">
                    <TextField label="First Name" variant="outlined"/>
                    <TextField label="Last Name" variant="outlined"/>
                    <TextField label="Email" variant="outlined"/>
                </div>
                <Button className="add-person-button">Add Person</Button>
            </div>
        )
    }
}
