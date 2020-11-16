import React, { Component } from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import './personsTile.css'
import { IPerson } from '../../store/types'
import { CarsTile } from '../carsTile/carsTile'
import { store } from '../../store'
import { getPersons } from '../../store/actions/personsActions'

interface IPersonTileProps {
    person: IPerson
}

export default class PersonsTile extends Component<{person: IPerson}, IPersonTileProps> {
    person = this.props.person

    async deletePerson (id: number) {
        try {
            await axios.delete(`/api/v1/person/${id}`)
            store.dispatch(getPersons() as any)
        }
        catch(e) {
            console.error(e)
        }
    }

    render() {
        return (
            <Card className="person-tile-card">
                <div className="person-card-wrapper">
                    <CardContent>
                        <Typography variant="h5">
                            {this.person.first_name} {this.person.last_name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {this.person.email}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button className="edit-button">Edit</Button>
                        <Button className="delete-button" onClick={() => {this.deletePerson(this.person.id as number)}}>Delete</Button>
                    </CardActions>
                </div>
                {this.person.cars && this.person.cars.length > 0 && 
                    <div className="car-wrapper">
                        <Typography variant="h6" color="textSecondary">
                            Car(s):
                        </Typography>
                        {this.person.cars.map((car) => {
                            return <CarsTile key={car.id} car={car}/>
                        })}
                    </div>
                }
            </Card>
        )
    }
}