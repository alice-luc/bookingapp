import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <nav className="nav nav-pills nav-fill">
                <a className="nav-link" aria-current="page" href="#">Book</a>
                <a className="nav-link" href="#">See Booking</a>
                <a className="nav-link" href="#">Log In</a>
            </nav>
        )
    }
}

export default Header
