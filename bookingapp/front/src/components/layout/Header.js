import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class Header extends Component {
    render() {
        return (
            <nav className="nav nav-pills nav-fill">
                <Link to="">Book Parking Space</Link>
                <Link to="login/">Log in</Link>
            </nav>
        )
    }
}

export default Header
