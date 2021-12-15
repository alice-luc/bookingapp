import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./layout/Header";
import DashBoard from "./booking/DashBoard";

import { Provider } from 'react-redux';
import store from '../store'
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../utils/PrivateRoute";


class App extends Component {
    render() {
        return (
            // <Provider store={store}>
                <div className='container'>
                    <Router>
                        <Header />
                        <PrivateRoute component={HomePage} path='' exact/>
                        <Route component={LoginPage} path='login/' />
                    </Router>
                </div>
            // </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));