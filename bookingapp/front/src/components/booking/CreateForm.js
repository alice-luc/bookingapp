import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBooking, getParkingSpaces } from '../../actions/bookings'

class CreateForm extends Component {
    // date = new Date();
    state = {
        date_start: '',
        date_end: '',
        parking_space: ''
    };
    static propTypes = {
        parking_spaces: PropTypes.array.isRequired,
        addBooking: PropTypes.func.isRequired
    };
    componentDidMount() {
        this.props.getParkingSpaces();
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
    onSelectChange = (e, data) => {
        this.setState({ [data.name]: e.value })
    }
    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value})
    }

    render() {
        const { date_start, date_end, parking_space } = this.state
        const options = this.props.parking_spaces.map((parking_space) => { 
            return {value: parking_space.id, label: parking_space.name}
        });
        return (
            <div className='card card-body mt-4 mb-4'>
                <h2>Add Booking</h2>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Parking Space</label>
                        <Select
                        name='parking_space'
                        id='parking_space'
                        options={options} 
                        onChange={this.onSelectChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>From</label>
                        <input 
                        type='datetime-local' 
                        className='form-control' 
                        id='date_start'
                        // value={date_start}
                        onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>To</label>
                        <input 
                        type='datetime-local'
                        className='form-control' 
                        id='date_end'
                        defaultValue={date_end}
                        onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary'>
                            Reserve Parking Space
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStatetoProps = (state) => ({
    bookings: state.bookings.bookings,
    parking_spaces: state.parking_spaces.parking_spaces
});

export default connect(mapStatetoProps, { addBooking, getParkingSpaces })(CreateForm)
