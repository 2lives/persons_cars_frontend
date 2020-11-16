import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { ICar } from '../../store/types'
import './carsTile.css'

interface ICarTileProps {
    car: ICar
}

export const CarsTile = ({car:{year, make, model, price}}: ICarTileProps) => {
    return (
        <div className="cars-tile-wrapper">
            <div className="text-wrapper">
                <Typography variant="subtitle1">
                    {year} {make} {model}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    ${price}
                </Typography>
            </div>
            <div className="cars-actions-wrapper">
                <Button className="edit-button">Edit</Button>
                <Button className="delete-button">Delete</Button>
            </div>
        </div>
    )
}