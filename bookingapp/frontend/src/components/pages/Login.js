import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { logIn } from '../../actions/bookings';

class Login extends Component {
    
    state = {
        username: '',
        password: ''
    };

    static propTypes = {
        logIn: PropTypes.func.isRequired
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    };
    onSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.logIn({ username, password });
    };
    render() {
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Log In</h2>
                <form  className='form-group' onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <label>Username</label>
                    <input 
                    required 
                    className='form-control' 
                    type='text' name='username' 
                    placeholder='Enter Username' 
                    onChange={this.onChange} 
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input 
                    required 
                    className='form-control' 
                    type='password' 
                    name='password' 
                    placeholder='Enter Password' 
                    onChange={this.onChange} 
                    />
                </div>
                <div className='form-group'>
                    <input 
                    className='btn btn-primary' 
                    type='submit' 
                    />
                </div>
                </form>
            </div>
        )
    }
}

export default connect(null, { logIn })(Login)
