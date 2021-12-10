import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBooking } from '../../actions/bookings'

export class CreateForm extends Component {
    // date = new Date();
    state = {
        start: '',
        end: '',
        parking_space: ''
    }
    static propTypes = {
        addBooking: PropTypes.func.isRequired
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { parking_space, start, end } = this.state;
        const booking = { parking_space, start, end };
        this.props.addBooking(booking);
        this.setState({
            start: '',
            end: '',
            parking_space: ''
        });
    };
    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    render() {
        return (
            <div>Here i am</div>
        )
    }
}

const mapStatetoProps = (state) => ({
    bookings: state.bookings.bookings
});

export default connect(mapStatetoProps, { addBooking })(CreateForm)
