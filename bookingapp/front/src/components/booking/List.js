import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getBookingsList, deleteBooking, changeBooking, addBooking, getParkingSpaces } from '../../actions/bookings'

class List extends Component {
    static propTypes = {
        bookings: PropTypes.array.isRequired,
        parking_spaces: PropTypes.array.isRequired,
        getBookingsList: PropTypes.func.isRequired,
        changeBooking: PropTypes.func.isRequired,
        deleteBooking: PropTypes.func.isRequired,
        addBooking: PropTypes.func.isRequired,
        getParkingSpaces: PropTypes.func.isRequired
    };
    componentDidMount() {
        this.props.getParkingSpaces(),
        this.props.getBookingsList()
    };
    onSelectChange = (e, data) => {
        this.setState({ [data.name]: e.value })
    };
    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value})
    };
    onSubmit = (e) => {
        e.preventDefault();
        const { parking_space, date_start, date_end } = this.state;
        const booking = { parking_space, date_start, date_end };
        console.log(booking, 'create booking')
        this.props.addBooking(booking);
        this.setState({
            date_start: '',
            date_end: '',
            parking_space: ''
        });
    };
    render() {
        const options = this.props.parking_spaces.map((parking_space) => { 
            return {value: parking_space.id, label: parking_space.name}
        });
        return (
            <Fragment>
                <h2>Bookings</h2>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Parking Space</th>
                            <th>Start</th>
                            <th>End</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bookings.map(booking => (
                            <tr key={booking.id}>
                                <td><Select
                                    id='parking_space'
                                    options={options}
                                    defaultValue={
                                        options.filter(option => 
                                           option.value === booking.parking_space)
                                     }
                                    onChange={this.onSelectChange}
                                    /></td>
                                <td>{booking.date_start}</td>
                                <td>{booking.date_end}</td>
                                <td><button 
                                    className='btn btn-danger btn-sm'
                                    onClick={this.props.changeBooking.bind(this, booking)}
                                    >Change</button></td>
                                <td><button 
                                    className='btn btn-danger btn-sm' 
                                    onClick={this.props.deleteBooking.bind(this, booking.id)}
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
    bookings: state.bookings.bookings,
    parking_spaces: state.parking_spaces.parking_spaces
});

export default connect(mapStatetoProps, { getBookingsList, changeBooking, deleteBooking, addBooking, getParkingSpaces })(List);
