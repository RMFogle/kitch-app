import React, { Component } from 'react'; 
import axios from 'axios'; 
import DatePicker from 'react-date-picker';
import Button from 'react-bootstrap/Button'; 


export default class TrashBooking extends Component {
    constructor(props) {
        super(props);

        this.onChangeClientname = this.onChangeClientname.bind(this); 
        this.onChangeEventtype = this.onChangeEventtype.bind(this); 
        this.onChangeLocation = this.onChangeLocation.bind(this); 
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this); 
        this.onChangeEndTime = this.onChangeEndTime.bind(this); 
        this.onSubmit = this.onSubmit.bind(this); 
        
        this.state = {
            clientname: '', 
            eventtype: '', 
            location: '', 
            date: new Date(), 
            starttime: '', 
            endtime: '', 
            clients: []
        }
    }

    
    componentDidMount() {
        axios.get('http://localhost:5000/bookings/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    clientname: response.data.clientname, 
                    eventtype: response.data.eventtype, 
                    location: response.data.location, 
                    date: new Date(response.data.date),
                    starttime: response.data.starttime, 
                    endtime: response.data.endtime
                })
            })
            .catch(function (error) {
                console.log(error); 
            })

        axios.get('http://localhost:5000/bookings/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        clients: response.data.map(client => client.clientname), 

                    })
                }

            })
    }

    onChangeClientname(e) {
        this.setState({
            clientname: e.target.value 
        }); 
    }

    onChangeEventtype(e) {
        this.setState({
            eventtype: e.target.value 
        }); 
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value 
        }); 
    }

    onChangeDate(date) {
        this.setState({
            date: date 
        }); 
    }

    onChangeStartTime(e) {
        this.setState({
            starttime: e.target.value 
        });
    }

    onChangeEndTime(e) {
        this.setState({
            endtime: e.target.value 
        });
    }

    addToTrash() {
        const booking = {
            clientname: this.state.clientname, 
            eventtype: this.state.eventtype, 
            location: this.state.location, 
            date: this.state.date,
            starttime: this.state.starttime, 
            endtime: this.state.endtime
        }

        console.log(booking); 

        axios.post('http://localhost:5000/trashBookings/add', booking)
            .then(res => console.log(res.data)); 
    }

    deleteBooking() {
        axios.delete('http://localhost:5000/bookings/'+this.props.match.params.id)
        .then(res => console.log(res.data));
    }

    onSubmit(e) {
        alert("Booking Sent To Trash!!!")
        e.preventDefault();

        console.log(this);

        axios.all([this.addToTrash(), this.deleteBooking()])
        .then(res => console.log(res.data)); 


        window.location = '/booking';  
    }

    
    render() { 
        return (
            <div>
                <h3>Trash Booking</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Client Name: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.clientname}
                        onChange={this.onChangeClientname}
                        readOnly/>
                    </div>
                    <div className="form-group">
                        <label>Event: </label>
                        <input type="text" 
                        required 
                        className="form-control"
                        value={this.state.eventtype}
                        onChange={this.onChangeEventtype}
                        readOnly/>
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.location}
                        onChange={this.onChangeLocation}
                        readOnly/>
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-3">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                readOnly/>
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                    <label>Start Time: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.starttime}
                        onChange={this.onChangeStartTime}
                        readOnly/>
                        </div>
                        <div className="form-group col-md-4">
                        <label>End Time: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.endtime}
                        onChange={this.onChangeEndTime}
                        readOnly/>
                        </div>
                    </div>

                    <div className="form-group">
                        <Button type="submit" value="Trash Booking">
                        Trash Booking</Button>
                        {" "}
                        <Button href="/booking/">Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}