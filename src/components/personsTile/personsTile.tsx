import React, { Component } from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './personsTile.css'
import { IPerson } from '../../store/types'
import CarsTile from '../carsTile/carsTile'
import { store } from '../../store'
import { deletePerson, updatePerson } from '../../store/actions/personsActions'

interface IPersonTileProps {
    person: IPerson
    openDialog?: boolean
    openConfirmationDialog?: boolean
}

export default class PersonsTile extends Component<{person: IPerson}, IPersonTileProps> {
    first_name = React.createRef<HTMLDivElement>()
    last_name = React.createRef<HTMLDivElement>()
    email = React.createRef<HTMLDivElement>()

    constructor(props: any) {
        super(props);
        this.state = {
            person: this.props.person,
            openDialog: false,
            openConfirmationDialog: false
        }
    }

    async deletePerson (id: number) {
        try {
            await axios.delete(`/api/v1/person/${id}`)
            store.dispatch(deletePerson(id) as any)
        }
        catch(e) {
            console.error(e)
        }
    }

    async updatePerson () {
        try {
            await axios.put(`/api/v1/person/${this.state.person.id}`, {
                person: {
                    first_name: (this.first_name.current as HTMLInputElement).value,
                    last_name: (this.last_name.current as HTMLInputElement).value,
                    email: (this.email.current as HTMLInputElement).value
                }
            })
            .then(() => {
                store.dispatch(updatePerson({
                    id: this.state.person.id,
                    first_name: (this.first_name.current as HTMLInputElement).value,
                    last_name: (this.last_name.current as HTMLInputElement).value,
                    email: (this.email.current as HTMLInputElement).value
                } as IPerson) as any)
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
            <Card className="person-tile-card">
                <div className="person-card-wrapper">
                    <CardContent>
                        <Typography variant="h5">
                            {this.state.person.first_name} {this.state.person.last_name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {this.state.person.email}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button className="edit-button" onClick={() => this.handleOpenDialog()}>Edit</Button>
                        <Button className="delete-button" onClick={() => {this.handleOpenConfirmationDialog()}}>Delete</Button>
                    </CardActions>
                    <Dialog open={this.state.openDialog || false} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Update Person: {this.state.person.first_name} {this.state.person.last_name}</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                label="First name"
                                onChange={this.handleChange('first_name')}
                                defaultValue={this.state.person.first_name}
                                inputRef={this.first_name}
                                fullWidth
                                />
                            <TextField
                                margin="dense"
                                label="Last name"
                                onChange={this.handleChange('last_name')}
                                defaultValue={this.state.person.last_name}
                                inputRef={this.last_name}
                                fullWidth
                                />
                            <TextField
                                margin="dense"
                                label="Email"
                                onChange={this.handleChange('email')}
                                defaultValue={this.state.person.email}
                                inputRef={this.email}
                                type="email"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                        <Button color="primary" onClick={() => this.handleCloseDialog()}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={() => this.updatePerson()}>
                            Update
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.openConfirmationDialog || false} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <Typography>
                                Are you sure you want to delete {this.state.person.first_name} {this.state.person.last_name}?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={() => this.handleCloseConfirmationDialog()}>
                                Cancel
                            </Button>
                            <Button color="primary" onClick={() => {this.deletePerson(this.state.person.id as number)}}>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>


                </div>
                {this.state.person.cars && this.state.person.cars.length > 0 && 
                    <div className="car-wrapper">
                        <Typography variant="h6" color="textSecondary">
                            Car(s):
                        </Typography>
                        {this.state.person.cars.map((car) => {
                            return <CarsTile key={car.id + car.price + car.make + Math.random()} car={car}/>
                        })}
                    </div>
                }
            </Card>
        )
    }
}