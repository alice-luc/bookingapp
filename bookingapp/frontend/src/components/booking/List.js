import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getBookingsList, deleteBooking, changeBooking, getParkingSpaces } from '../../actions/bookings'
import { PERMISSIONS_MAPPING } from '../../actions/types'
import { devToolsEnhancer } from 'redux-devtools-extension';


class List extends Component {

    state = {
        active: 0,
    }
    
    static propTypes = {
        bookings: PropTypes.array.isRequired,
        parking_spaces: PropTypes.array.isRequired,
        getBookingsList: PropTypes.func.isRequired,
        changeBooking: PropTypes.func.isRequired,
        deleteBooking: PropTypes.func.isRequired,
        getParkingSpaces: PropTypes.func.isRequired
    };
    onClickChange = async (data) => {
        if (this.state.active == data.id) {
            const booking = {
                id: data.id,
                date_start: this.state.date_start,
                date_end: this.state.date_end,
                parking_space: this.state.parking_space
            }
            const response = await changeBooking(booking);
            if (response.status == 200) {
                this.setState({'active': 0})
                alert('Booking has been changd successfully')
            } else if (response.status == 400) {
                const error = response.data
                if (!!error['body'].length) {
                    alert(response.data.error + '\n' + 'Nearest available time for booking is:' + '\n' + 
                    `From ${JSON.stringify(error.body[0][0]).split('+')[0]}" \n To ${JSON.stringify(error.body[0][1]).split('+')[0]}"`)
                } else if (error.error) {
                    alert(error.error);
                } else alert('Choosen time is not available for this parking space')
            } else if (response.status == 401){
                localStorage.clear();
                window.location.reload();
                alert('Please, Log In again')
            }
        } else {
            if (this.state.active != 0) {
                alert('Previous incomleted changes might not be applied, but shown on the page. Please reload the page if you had made booking changes without confirmation')
            }
            this.setState({'active': data.id})
            this.setState({ 'date_start': data.date_start })
            this.setState({ 'date_end': data.date_end })
            this.setState({ 'parking_space': data.parking_space })
        }

    };
    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value})
    };
    onSelectChange = (e, data) => {
        this.setState({ [ data.name ]: e.value })
    };
    componentDidMount() {
        this.props.getParkingSpaces(),
        this.props.getBookingsList()
    };

    render() {
        const options = this.props.parking_spaces.map((parking_space) => { 
            return {value: parking_space.id, label: parking_space.name}
        });
        const username = localStorage.getItem('username');
        const permissions = PERMISSIONS_MAPPING[username];
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
                                    options={options}
                                    name='parking_space'
                                    defaultValue={
                                        options.filter(option => 
                                           option.value === booking.parking_space)
                                     }
                                    isDisabled={this.state.active == booking.id ? false : true}
                                    onChange={ this.onSelectChange.bind(this) }
                                    /></td>
                                <td><input 
                                    type='datetime-local'
                                    id='date_start'
                                    defaultValue={booking.date_start.slice(0, -1)} 
                                    disabled={this.state.active == booking.id ? false : true}
                                    onChange={ this.onChange.bind(this) }
                                    /> </td>
                                <td><input 
                                    type='datetime-local'
                                    id='date_end'
                                    defaultValue={booking.date_end.slice(0, -1)} 
                                    disabled={this.state.active == booking.id ? false : true}
                                    onChange={ this.onChange.bind(this) }
                                    /></td>
                                <td>{permissions.can_change_booking ? (<button 
                                    className='btn btn-danger btn-sm'
                                    onClick={ this.onClickChange.bind(this, booking) }
                                    >Change</button>) : null}</td>
                                <td>{permissions.can_delete_booking ? (<button 
                                    className='btn btn-danger btn-sm' 
                                    onClick={this.props.deleteBooking.bind(this, booking.id)}
                                    >Delete</button>) : null }</td>
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

export default connect(mapStatetoProps, { getBookingsList, changeBooking, deleteBooking, getParkingSpaces })(List);
