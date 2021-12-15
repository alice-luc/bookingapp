import React, { Fragment, Component } from 'react'
import CreateForm from './CreateForm'
import List from './List'


class DashBoard extends Component {
    render() {
        return (
            <Fragment>
                <List />
                <CreateForm />
            </Fragment>
        )
    }
}

export default DashBoard
