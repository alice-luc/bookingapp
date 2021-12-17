import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'


export default class Navigation extends Component {

    render() {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route exact path='' element={ localStorage.getItem('username') ? <Home /> : <Login /> }/>
                    </Routes>
                </Router>

            </div>
        )
    }
}

// export default Header
