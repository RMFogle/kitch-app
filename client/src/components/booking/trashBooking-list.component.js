import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import axios from 'axios'; 
import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Icon } from '@iconify/react';
import arrowDropDownLine from '@iconify-icons/ri/arrow-drop-down-line';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import '../styles/table-style.css';


const TrashBooking = props => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

return(
    <tr>
        <td className="bookinglist">{props.booking.clientname}</td>
        <td className="bookinglist">{props.booking.eventtype}</td>
        <td className="bookinglist">{props.booking.location}</td>
        <td className="bookinglist">{props.booking.meal}</td>
        <td className="bookinglist">{props.booking.menu}</td>
        <td className="bookinglist">{props.booking.date.substring(0,10)}</td>
        <td className="bookinglist">{props.booking.starttime}</td>
        <td className="bookinglist">{props.booking.endtime}</td>
        <td className="bookinglist">{props.booking.guestcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td className="bookinglist">${props.booking.costperguest.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td className="bookinglist">${props.booking.totalcost.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td className="bookinglist">
            <Button variant="outline-warning" size="sm">
            <Link to={"/restoresBooking/"+props.booking._id}>restore</Link>
            </Button> |
            <>
            <Button variant="outline-danger" style={{ color: 'blue' }} size="sm" onClick={handleShow}>
            delete
            </Button> 
                <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Booking</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        Are you sure you want to delete this booking? 
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" onClick= {() => { props.deleteBooking(props.booking._id) }}>Confirm</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </td>
    </tr>
    );
}


export default class TrashBookingList extends Component {
    constructor(props) {
        super(props); 

        this.deleteBooking = this.deleteBooking.bind(this); 

        this.state = {bookings: []}

        this.compareByDescend.bind(this); 
        this.compareByAscend.bind(this); 
        this.sortByUp.bind(this); 
        this.sortByDown.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/trashBookings/')
        .then(response => {
            this.setState({ bookings: response.data})
        })
        .catch((error) => {
            console.log(error); 
        })
    }

    compareByDescend(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1; 
            if (a[key] > b[key]) return 1; 
            return 0; 
        }; 
    }

    compareByAscend(key) {
        return function (a, b) {
            if (a[key] < b[key]) return 1; 
            if (a[key] > b[key]) return -1; 
            return 0; 
        }; 
    }

    // A-Z and 1-100 
    sortByUp(key) {
        let arrayCopy = [...this.state.bookings]; 
        arrayCopy.sort(this.compareByDescend(key)); 
        this.setState({bookings: arrayCopy});
    }

    // Z-A and 100-1 
    sortByDown(key) {
        let arrayCopy = [...this.state.bookings]; 
        arrayCopy.sort(this.compareByAscend(key)); 
        this.setState({bookings: arrayCopy});
    }

    deleteBooking(id) {
        axios.delete('http://localhost:5000/trashBookings/'+id)
            .then(res => console.log(res.data)); 

        this.setState({
            bookings: this.state.bookings.filter(el => el._id !== id)
        })
    }

    trashBookingList() {
        return this.state.bookings.map(currentbooking => {
            return <TrashBooking booking={currentbooking} deleteBooking={this.deleteBooking} key={currentbooking._id}/>; 
        })
    }

    render() { 
        return (
            <div className="table-responsive">
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Trash Booking List
                            <Icon icon={arrowDropDownLine} height="2em" />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                <table className="table table-sm table-hover table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>
                            Client
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('clientname')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('clientname')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Event
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('eventtype')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('eventtype')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Location
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('location')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('location')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Meal
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('meal')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('meal')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Menu 
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('menu')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('menu')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Date
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('date')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('date')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Start Time
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('starttime')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('starttime')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            End Time
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('endtime')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('endtime')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Guest#
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('guestcount')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('guestcount')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            $Guest
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('costperguest')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('costperguest')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Total
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('totalcost')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('totalcost')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.trashBookingList() }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Client</th>
                            <th>Event</th>
                            <th>Location</th>
                            <th>Meal</th>
                            <th>Menu</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Guest#</th>
                            <th>$Guest</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
                </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>
            </div>
        )
    }
}