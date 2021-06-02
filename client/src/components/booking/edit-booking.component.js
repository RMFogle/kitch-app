import React, { Component } from 'react'; 
import axios from 'axios'; 
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-date-picker'; 
import NumberFormat from 'react-number-format';


const BookingTimes = () => (
    <optgroup>
        <option>12:00 AM</option>
        <option>12:30 AM</option>
        <option>1:00 AM</option>
        <option>1:30 AM</option>
        <option>2:00 AM</option>
        <option>2:30 AM</option>
        <option>3:00 AM</option>
        <option>3:30 AM</option>
        <option>4:00 AM</option>
        <option>4:30 AM</option>
        <option>5:00 AM</option>
        <option>5:30 AM</option>
        <option>6:00 AM</option>
        <option>6:30 AM</option>
        <option>7:00 AM</option>
        <option>7:30 AM</option>
        <option>8:00 AM</option>
        <option>8:30 AM</option>
        <option>9:00 AM</option>
        <option>9:30 AM</option>
        <option>10:00 AM</option>
        <option>10:30 AM</option>
        <option>11:00 AM</option>
        <option>11:30 AM</option>
        <option>12:00 PM</option>
        <option>12:30 PM</option>
        <option>1:00 PM</option>
        <option>1:30 PM</option>
        <option>2:00 PM</option>
        <option>2:30 PM</option>
        <option>3:00 PM</option>
        <option>3:30 PM</option>
        <option>4:00 PM</option>
        <option>4:30 PM</option>
        <option>5:00 PM</option>
        <option>5:30 PM</option>
        <option>6:00 PM</option>
        <option>6:30 PM</option>
        <option>7:00 PM</option>
        <option>7:30 PM</option>
        <option>8:00 PM</option>
        <option>8:30 PM</option>
        <option>9:00 PM</option>
        <option>9:30 PM</option>
        <option>10:00 PM</option>
        <option>10:30 PM</option>
        <option>11:00 PM</option>
        <option>11:30 PM</option>
        <option>12:00 PM</option>
    </optgroup>
)

const MealType = () => (
    <optgroup>
        <option>Choose...</option>
        <option>Bkfst</option>
        <option>Bkfst/Lnch</option>
        <option>Bkfst/Lnch/Din</option>
        <option>Lnch</option>
        <option>Lnch/Din</option>
        <option>Din</option>
    </optgroup>
)

const MenuSelect = () => (
    <optgroup>
        <option>Choose...</option>
        <option>American</option>
        <option>Brazilian</option>
        <option>Cajun</option>
        <option>Chinese</option>
        <option>Cuban</option>
        <option>German</option>
        <option>Greek</option>
        <option>Indian</option>
        <option>Italian</option>
        <option>Mexican</option>
        <option>Soul Food</option>
        <option>Spanish</option>
        <option>Vietnamese</option>
    </optgroup>
)


export default class EditBooking extends Component {
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
        axios.get('http://localhost:5000/bookings/'+this.props.match.params.id)
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

        axios.get('http://localhost:5000/clients/')
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
            guestcount: e.target.value, 
            totalcost: e.target.value * this.state.costperguest
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
            costperguest: e.target.value, 
            totalcost: e.target.value * this.state.guestcount
        }); 
    }

    onChangeTotalCost(e) {
        this.setState({
            totalcost: e.target.value 
        }); 
    }

    bookingTimesList() {
        return <BookingTimes />
    }

    mealTypeList() {
        return <MealType />
    }

    menuSelectList() {
        return <MenuSelect />
    }

    onSubmit(e) { 
        e.preventDefault(); 

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

        axios.post('http://localhost:5000/bookings/update/'+this.props.match.params.id, booking)
        .then(res => console.log(res.data)); 

        window.location = '/booking'; 
    }


    render() { 
        return (
            <div className="form-responsive">
            <h3>Edit Booking</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Client: </label>
                    <select ref="clientInput"
                        required
                        className="form-control"
                        value={this.state.clientname}
                        onChange={this.onChangeClientname}>
                        {
                            this.state.clients.map(function(client) {
                                return <option 
                                key={client}
                                value={client}>{client}
                                </option>; 
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                        <label>Event: </label>
                        <input type="text" 
                        required 
                        className="form-control"
                        value={this.state.eventtype}
                        onChange={this.onChangeEventtype}
                        />
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.location}
                        onChange={this.onChangeLocation}
                        />
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Meal: </label>
                        <select id="meal"
                        required
                        className="form-control"
                        value={this.state.meal}
                        onChange={this.onChangeMeal}>
                            { this.mealTypeList() }
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Menu: </label>
                        <select id="menu"
                        required
                        className="form-control"
                        value={this.state.menu}
                        onChange={this.onChangeMenu}>
                            { this.menuSelectList() }
                        </select>
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                            required
                            value={this.state.date}
                            onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                    <label htmlFor="time1">Start Time: </label>
                        <select id="time1"
                        required
                        className="form-control"
                        value={this.state.starttime}
                        onChange={this.onChangeStartTime}>
                            { this.bookingTimesList() }
                        </select>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="time2">End Time: </label>
                        <select id="time2"
                        required
                        className="form-control"
                        value={this.state.endtime}
                        onChange={this.onChangeEndTime}>
                            { this.bookingTimesList() }
                        </select>
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
                        />
                    </div>
                    <div className="form-group col-md-4">
                    <label>$ Per Guest: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.costperguest}
                        onChange={this.onChangeCostPerGuest}
                        />
                    </div>
                    <div className="form-group col-md-4">
                    <label>Total Cost: </label>
                    <div>
                        <NumberFormat
                        required
                        thousandSeparator={true} 
                        prefix={'$'} 
                        inputmode="numeric"
                        value={this.state.totalcost}
                        onChange={this.onChangeTotalCost}
                        />
                        </div>
                    </div>
                    </div>
                <div className="form-group">
                    <input type="submit" value="Save" className="btn btn-primary" />
                    {" "}
                    <Button href="/booking/">Cancel</Button>
                </div>
            </form>
            </div>
        )
    }
}