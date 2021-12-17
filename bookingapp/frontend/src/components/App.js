import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import store from "../store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route exact path='' element={ localStorage.getItem('username') ? <Home /> : <Login /> }/>
                    </Routes>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));