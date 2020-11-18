import React, { Component } from 'react'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { ICar } from '../../store/types'
import './carsTile.css'
import { store } from '../../store'
import { deleteCar, updateCar } from '../../store/actions/personsActions'

interface ICarTileProps {
    car: ICar
    openDialog?: boolean
    openConfirmationDialog?: boolean
}


export default class CarsTile extends Component<{car: ICar}, ICarTileProps> {
    year = React.createRef<HTMLDivElement>()
    make = React.createRef<HTMLDivElement>()
    model = React.createRef<HTMLDivElement>()
    price = React.createRef<HTMLDivElement>()
    
    constructor(props: any) {
        super(props);
        this.state = {
            car: this.props.car,
            openDialog: false,
            openConfirmationDialog: false
        }
    }
    async deleteCar () {
        try {
            await axios.delete(`/api/v1/car/${this.state.car.id}`)
            store.dispatch(deleteCar(this.state.car.person_id, this.state.car.id) as any)
        }
        catch(e) {
            console.error(e)
        }
    }

    async updateCar() {
        try {
            await axios.put(`/api/v1/car/${this.state.car.id}`, {
                car: {
                    year: (this.year.current as HTMLInputElement).value,
                    make: (this.make.current as HTMLInputElement).value,
                    model: (this.model.current as HTMLInputElement).value,
                    price: (this.price.current as HTMLInputElement).value,
                    person_id: this.props.car.person_id
                }
            })
            .then(() => {
                store.dispatch(updateCar(
                    this.state.car.person_id, 
                    {
                        id: this.state.car.id,
                        year: (this.year.current as HTMLInputElement).value,
                        make: (this.make.current as HTMLInputElement).value,
                        model: (this.model.current as HTMLInputElement).value,
                        price: (this.price.current as HTMLInputElement).value,
                        person_id: this.state.car.person_id
                    } as any)
                )
            })
        }
        catch(e) {
            console.error(e)
        }
        
    }

    handleChange = (field: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
        (this as any)[field].current.value = evt.target.value
    }

    handleOpenDialog() {
        this.setState({ openDialog: true })
    }

    handleCloseDialog() {
        this.setState({ openDialog: false })
    }

    handleCloseConfirmationDialog() {
        this.setState({ openConfirmationDialog: false })
    }

    handleOpenConfirmationDialog() {
        this.setState({ openConfirmationDialog: true })
    }

    render() {
        return (
            <div className="cars-tile-wrapper">
                <div className="text-wrapper">
                    <Typography variant="subtitle1">
                        {this.state.car.year} {this.state.car.make} {this.state.car.model}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        ${this.state.car.price}
                    </Typography>
                </div>
                <div className="cars-actions-wrapper">
                    <Button className="edit-button" onClick={() => this.handleOpenDialog()}>Edit</Button>
                    <Button className="delete-button" onClick={() => {this.handleOpenConfirmationDialog()}}>Delete</Button>
                </div>
                <Dialog open={this.state.openDialog || false} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Update Car: {this.state.car.year} {this.state.car.make} {this.state.car.model}</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                label="Year"
                                onChange={this.handleChange('year')}
                                defaultValue={this.state.car.year}
                                inputRef={this.year}
                                fullWidth
                                />
                            <TextField
                                margin="dense"
                                label="Make"
                                onChange={this.handleChange('make')}
                                defaultValue={this.state.car.make}
                                inputRef={this.make}
                                fullWidth
                                />
                            <TextField
                                margin="dense"
                                label="Model"
                                onChange={this.handleChange('model')}
                                defaultValue={this.state.car.model}
                                inputRef={this.model}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Price"
                                onChange={this.handleChange('price')}
                                defaultValue={this.state.car.price}
                                inputRef={this.price}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                        <Button color="primary" onClick={() => this.handleCloseDialog()}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={() => this.updateCar()}>
                            Update
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={this.state.openConfirmationDialog || false} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <Typography>
                                Are you sure you want to delete {this.state.car.year} {this.state.car.make} {this.state.car.model}?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={() => this.handleCloseConfirmationDialog()}>
                                Cancel
                            </Button>
                            <Button color="primary" onClick={() => {this.deleteCar()}}>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
            </div>
        )
    }
}