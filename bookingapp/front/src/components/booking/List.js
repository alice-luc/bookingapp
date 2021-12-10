import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getBookings, deleteBooking, changeBooking } from '../../actions/bookings'

class List extends Component {
    static PropTypes = {
        bookings: PropTypes.array.isRequired,
        getBookings: PropTypes.func.isRequired,
        changeBooking: PropTypes.func.isRequired,
        deleteBooking: PropTypes.func.isRequired
    };
    componentDidMount() {
        this.props.getBookings()
    };

    render() {
        return (
            <Fragment>
                <h2>Bookings</h2>
                <table className='table table-striped'>
                    <thead>
                        <th>Parking Space</th>
                        <th>Start</th>
                        <th>End</th>
                        <th></th>
                        <th></th>
                    </thead>
                    <tbody>
                        {this.props.bookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.parking_space}</td>
                                <td>{booking.start}</td>
                                <td>{booking.end}</td>
                                <td><button 
                                    className='btn btn-danger btn-sm'
                                    onChange={}
                                    >Change</button></td>
                                <td><button 
                                    className='btn btn-danger btn-sm' 
                                    onClick={this.deleteBooking.bind(this, booking.id)}
                                    >Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStatetoProps = (state) => ({
    bookings: state.bookings.bookings
});

export default connect(mapStatetoProps, { getBookings, changeBooking, deleteBooking })(List);
