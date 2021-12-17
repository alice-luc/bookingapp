import React, { Component, Fragment } from 'react';

import { PERMISSIONS_MAPPING } from '../../actions/types'
import CreateBookingForm from '../booking/CreateBookingForm';
import CreateParkingSpace from '../booking/CreateParkingSpace';
import List from '../booking/List';

class Home extends Component {

    state = {
        page: 'view_bookings'
    }

    logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    render() {
        const username = localStorage.getItem('username');
        const permissions = PERMISSIONS_MAPPING[username];
        return (
            <div>
                <br />
                <br />
                <div 
                className="nav nav-pills nav-fill" 
                style={{ 'display': 'flex', 'justifyContent': 'space-between' }}
                >
                    { permissions.can_create_parking_space ? (<button 
                    className='btn btn-primary' 
                    onClick={() => this.setState({'page': 'add_parking'})}
                    >Add Parking Space</button>) : null }
                    { permissions.can_create_booking ? (<button 
                    className='btn btn-primary' 
                    onClick={() => this.setState({'page': 'add_booking'})}
                    >Add Booking</button>) : null }
                    <button 
                    className='btn btn-primary' 
                    onClick={() =>this.setState({'page': 'view_bookings'})}
                    >View Bookings</button>
                    <button 
                    className='btn btn-primary' 
                    onClick={ () => this.logout() }
                    >Log Out</button>
                    <h4>Hey, { localStorage.getItem('username') }</h4>
                </div>
                <br />
                <br />
            { this.state.page == 'add_parking' ? (<CreateParkingSpace />) : null }
            { this.state.page == 'view_bookings' ? (<List />) : null }
            { this.state.page == 'add_booking' ? (<CreateBookingForm />) : null }
            </div>
            
        )
    }
}


export default Home;
