import React, { Fragment, Component } from 'react'
import CreateForm from './CreateForm'
import List from './List'


export class DashBoard extends Component {
    render() {
        return (
            <Fragment>
                <CreateForm />
                <List />
            </Fragment>
        )
    }
}

export default DashBoard
