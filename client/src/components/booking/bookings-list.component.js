import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Icon } from '@iconify/react';
import arrowDropDownLine from '@iconify-icons/ri/arrow-drop-down-line';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import '../styles/table-style.css';


const Booking = props => (
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
            <Button variant="outline-info" size="sm">
            <Link to={"/edit/"+props.booking._id}>edit</Link>
            </Button> |
            <Button variant="outline-danger" style={{ color: 'blue' }} size="sm">
            <Link to={"/addTo/"+props.booking._id}>cancel</Link>
            </Button> 
        </td>
    </tr>
)



export default class BookingsList extends Component {
    constructor(props) { 
        super(props); 

        this.state = {bookings: []}; 

        this.compareByDescend.bind(this); 
        this.compareByAscend.bind(this); 
        this.sortByUp.bind(this); 
        this.sortByDown.bind(this);
        this.filterContent.bind(this); 
        this.handleTextSearch.bind(this);
    }

    componentDidMount() {
        axios.get('/bookings/')
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

    bookingList() {
        return this.state.bookings.map(currentbooking => {
            return <Booking booking={currentbooking} key={currentbooking._id}/>; 
        })
    }

    filterContent(bookings, searchBooking) {
        const result = bookings.filter((booking) => 
        booking.clientname.toLowerCase().includes(searchBooking.toLowerCase())||
        booking.eventtype.toLowerCase().includes(searchBooking.toLowerCase())||
        booking.location.toLowerCase().includes(searchBooking.toLowerCase())||
        booking.meal.toLowerCase().includes(searchBooking.toLowerCase())||
        booking.menu.toLowerCase().includes(searchBooking.toLowerCase())||
        booking.date.toString().includes(searchBooking)||
        booking.starttime.toLowerCase().includes(searchBooking.toLowerCase())||
        booking.endtime.toLowerCase().includes(searchBooking.toLowerCase())||
        booking.guestcount.toString().includes(searchBooking)||
        booking.costperguest.toString().includes(searchBooking)||
        booking.totalcost.toString().includes(searchBooking)
        ); 
        this.setState({ bookings: result })
    }

    handleTextSearch = (e) => {
        const searchBooking = e.currentTarget.value; 
        axios.get('/bookings/')
        .then(response => {
        let bookingCopy = (response.data)
        this.filterContent(bookingCopy, searchBooking)
        })
    }; 


    render() { 
        return (
            <div className="table-responsive">
                <Accordion defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Booking List
                            <Icon icon={arrowDropDownLine} height="2em" />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                        <div className="search">
                                <input 
                                    className="form-control"
                                    type="search"
                                    placeholder="Search"
                                    name="searchBooking"
                                    onChange={this.handleTextSearch}
                                ></input>
                        </div>
                    <br>
                    </br>
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
                        { this.bookingList() }
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