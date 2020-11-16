import React, { Component } from 'react'
import { getPersons } from '../store/actions/personsActions'
import { connect } from 'react-redux'
import { RootState } from '../store'
import { IPerson } from '../store/types'
import { store } from '../store'
import { PersonsTile } from './personsTile/personsTile'

type personsProps = {
    persons: {
        data: IPerson[]
        loading: boolean
    }
}
class PersonsList extends Component<personsProps, {}> {
    componentWillMount() {
        store.dispatch(getPersons() as any)
        console.log(this.props, 'PERSONSzzzz')
    }
    render() {
        return(
            <div>{this.props.persons.data ? this.props.persons.data.map((person) => {
                return <PersonsTile key={person.email} person={person} />
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