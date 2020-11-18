import React, { Component } from 'react'
import { getPersons } from '../store/actions/personsActions'
import { connect } from 'react-redux'
import { RootState } from '../store'
import { store } from '../store'
import PersonsTile from './personsTile/personsTile'
import { personsProps } from '../store/types'

class PersonsList extends Component<personsProps, {}> {
    componentWillMount() {
        store.dispatch(getPersons() as any)
    }
    render() {
        return(
            <div>{this.props.persons.data ? this.props.persons.data.map((person) => {
                return <PersonsTile key={person.email + person.first_name + person.last_name} person={person} />
            }) : ''}</div>
        )
    }
}

function mapStateToProps(state: RootState) {
    return {
        persons: state.persons
    }
}

export default connect(mapStateToProps)(PersonsList as any)