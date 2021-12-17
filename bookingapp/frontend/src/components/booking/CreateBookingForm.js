import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBooking, getParkingSpaces } from '../../actions/bookings'

class CreateBookingForm extends Component {

    static propTypes = {
        parking_spaces: PropTypes.array.isRequired,
        addBooking: PropTypes.func.isRequired
    };
    componentDidMount() {
        this.props.getParkingSpaces()
    };
    onSelectChange = (e, data) => {
        this.setState({ [data.name]: e.value })
    }
    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value})
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const booking = {
            date_start: this.state.date_start,
            date_end: this.state.date_end,
            parking_space: this.state.parking_space
        };
        const response = await addBooking(booking);
        if (response.status == 201) {
            alert('Booking has been created successfully')
            window.location.reload();
        } else if (response.status == 400) {
            if (!!response.data.body) {
                alert(response.data.error + '\n' + 'Nearest available time for booking is:' + '\n' + 
                `From ${JSON.stringify(response.data.body[0][0]).split('+')[0]}" \n To ${JSON.stringify(response.data.body[0][1]).split('+')[0]}"`)
            } else alert(response.data.error);
        } else if (response.status == 401){
            localStorage.clear();
            window.location.reload();
        }
    };
    render() {
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
                        required
                        options={options} 
                        onChange={this.onSelectChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>From</label>
                        <input 
                        type='datetime-local' 
                        className='form-control'
                        required
                        id='date_start'
                        onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>To</label>
                        <input 
                        type='datetime-local'
                        className='form-control'
                        required
                        id='date_end'
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
    parking_spaces: state.parking_spaces.parking_spaces
});

export default connect(mapStatetoProps, { addBooking, getParkingSpaces })(CreateBookingForm)