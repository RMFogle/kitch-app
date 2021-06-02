import React, { Component } from 'react'; 
import axios from 'axios'; 
import DatePicker from 'react-date-picker'; 
import NumberFormat from 'react-number-format';
import Button from 'react-bootstrap/Button'; 


export default class TrashRestoreBooking extends Component {
    constructor(props) {
        super(props);

        this.onChangeClientname = this.onChangeClientname.bind(this); 
        this.onChangeEventtype = this.onChangeEventtype.bind(this); 
        this.onChangeLocation = this.onChangeLocation.bind(this); 
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this); 
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.onChangeGuestCount = this.onChangeGuestCount.bind(this);
        this.onChangeMeal = this.onChangeMeal.bind(this); 
        this.onChangeMenu = this.onChangeMenu.bind(this);
        this.onChangeCostPerGuest = this.onChangeCostPerGuest.bind(this);
        this.onChangeTotalCost = this.onChangeTotalCost.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
        
        this.state = {
            clientname: '', 
            eventtype: '', 
            location: '', 
            date: new Date(), 
            starttime: '', 
            endtime: '',
            guestcount: '',
            meal: '', 
            menu: '',
            costperguest: '', 
            totalcost: '',
            clients: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/trashBookings/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    clientname: response.data.clientname, 
                    eventtype: response.data.eventtype, 
                    location: response.data.location, 
                    date: new Date(response.data.date),
                    starttime: response.data.starttime, 
                    endtime: response.data.endtime, 
                    guestcount: response.data.guestcount, 
                    meal: response.data.meal, 
                    menu: response.data.menu,
                    costperguest: response.data.costperguest, 
                    totalcost: response.data.totalcost,
                })
            })
            .catch(function (error) {
                console.log(error); 
            })

        axios.get('http://localhost:5000/trashBookings/')
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

    onChangeGuestCount(e) {
        this.setState({
            guestcount: e.target.value 
        });
    }

    onChangeMeal(e) {
        this.setState({
            meal: e.target.value 
        });
    }

    onChangeMenu(e) {
        this.setState({
            menu: e.target.value 
        });
    }

    onChangeCostPerGuest(e) {
        this.setState({
            costperguest: e.target.value
        }); 
    }

    onChangeTotalCost(e) {
        this.setState({
            totalcost: e.target.value 
        }); 
    }

    restoreToBooking() {
        const booking = {
            clientname: this.state.clientname, 
            eventtype: this.state.eventtype, 
            location: this.state.location, 
            date: this.state.date, 
            starttime: this.state.starttime, 
            endtime: this.state.endtime, 
            guestcount: this.state.guestcount,
            meal: this.state.meal, 
            menu: this.state.menu,
            costperguest: this.state.costperguest, 
            totalcost: this.state.totalcost, 
        }

        console.log(booking); 

        axios.post('http://localhost:5000/bookings/add', booking)
            .then(res => console.log(res.data)); 
    }

    deleteTrashBooking() {
        axios.delete('http://localhost:5000/trashBookings/'+this.props.match.params.id)
        .then(res => console.log(res.data));
    }

    onSubmit(e) {
        alert("Added Back To Booking!!!")
        e.preventDefault();

        console.log(this);

        axios.all([this.restoreToBooking(), this.deleteTrashBooking()])
        .then(res => console.log(res.data)); 


        window.location = '/trash';  
    }

    render() { 
        return (
            <div className="form-responsive">
                <h3>Restore Booking</h3>
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
                    <div className="form-group col-md-6">
                        <label>Meal: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.meal}
                        onChange={this.onChangeMeal}
                        readOnly/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Menu: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.menu}
                        onChange={this.onChangeMenu}
                        readOnly/>
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-4">
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
                    <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Guest#: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.guestcount}
                        onChange={this.onChangeGuestCount}
                        readOnly/>
                    </div>
                    <div className="form-group col-md-4">
                    <label>$ Per Guest: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.costperguest}
                        onChange={this.onChangeCostPerGuest}
                        readOnly/>
                    </div>
                    <div className="form-group col-md-4">
                    <label>Total Cost: </label>
                    <div>
                        <NumberFormat
                        thousandSeparator={true} 
                        prefix={'$'} 
                        inputmode="numeric"
                        value={this.state.totalcost}
                        onChange={this.onChangeTotalCost}
                        readOnly/>
                        </div>
                    </div>
                    </div>
                    <div className="form-group">
                        <Button type="submit" value="Restore Booking">
                        Restore Booking</Button>
                        {" "}
                        <Button href="/trash/">Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}