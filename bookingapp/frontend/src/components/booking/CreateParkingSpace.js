import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addParkingSpace, getParkingSpaces, deleteParkingSpace } from '../../actions/bookings'
import { PERMISSIONS_MAPPING } from '../../actions/types'

class ParkingSpaceForm extends Component {

    static propTypes = {
        parking_spaces: PropTypes.array.isRequired,
        deleteParkingSpace: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getParkingSpaces()
    };

    onChange = (e) => {
        this.setState({ 'name': e.target.value})
    };

    onSubmit = async (e) => {
        e.preventDefault();
        const response = await addParkingSpace({'name': this.state.name});
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
        const username = localStorage.getItem('username');
        const permissions = PERMISSIONS_MAPPING[username];
        return (
            <div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Parking Space</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.parking_spaces.map(parking_space => (
                            <tr key={parking_space.id}>
                                <td>
                                    <input 
                                    type='text'
                                    id='name'
                                    defaultValue={parking_space.name} 
                                    disabled
                                    /> 
                                </td>
                                <td>{permissions.can_delete_booking ? (<button 
                                    className='btn btn-danger btn-sm' 
                                    onClick={this.props.deleteParkingSpace.bind(this, parking_space.id)}
                                    >Delete</button>) : null }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br/>
                <br/>
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
            </div>
        )
    }
}


const mapStatetoProps = (state) => ({
    parking_spaces: state.parking_spaces.parking_spaces
});


export default connect(mapStatetoProps, { getParkingSpaces, addParkingSpace, deleteParkingSpace })(ParkingSpaceForm)