import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addParkingSpace } from '../../actions/bookings'

class CreateBookingForm extends Component {

    onChange = (e) => {
        this.setState({ 'name': e.target.value})
    };

    onSubmit = async (e) => {
        e.preventDefault();
        const response = await addParkingSpace({'name': this.state.name});
        console.log(response)

        if (response.status == 201) {
            alert('Parking Space has been created successfully');
            window.location.reload();
        } else if (response.status == 400) {
            alert(response.data.error);
        } else if (response.status == 401){
            localStorage.clear();
            window.location.reload();
        }
    };

    render() {
        return (
            <div className='card card-body mt-4 mb-4'>
                <h2>Add Parking Space</h2>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className='form-group'>
                        <label>Name</label>
                        <input 
                        type='text'
                        className='form-control'
                        required
                        onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary'>
                            Create Parking Space
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, { addParkingSpace })(CreateBookingForm)