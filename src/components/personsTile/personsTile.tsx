import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import './personsTile.css'
import { IPerson } from '../../store/types'
import { CarsTile } from '../carsTile/carsTile'

interface IPersonTileProps {
    person: IPerson
}

export const PersonsTile = ({person: {first_name, last_name, email, cars}}: IPersonTileProps) => {
    return (
        <Card className="person-tile-card">
            <div className="person-card-wrapper">
                <CardContent>
                    <Typography variant="h5">
                        {first_name} {last_name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {email}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button className="edit-button">Edit</Button>
                    <Button className="delete-button">Delete</Button>
                </CardActions>
            </div>
            {cars && cars.length > 0 && 
                <div className="car-wrapper">
                    <Typography variant="h6" color="textSecondary">
                        Car(s):
                    </Typography>
                    {cars.map((car) => {
                        return <CarsTile key={car.model + car.make} car={car}/>
                    })}
                </div>
            }
        </Card>
    )
}