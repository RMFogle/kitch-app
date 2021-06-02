import React, { Component } from 'react'; 
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Icon } from '@iconify/react';
import arrowDropDownLine from '@iconify-icons/ri/arrow-drop-down-line';
import NumberFormat from 'react-number-format';


export default class CreateScheduleDemo extends Component {
    constructor(props) {
        super(props); 

        this.onChangeName = this.onChangeName.bind(this); 
        this.onChangePhone = this.onChangePhone.bind(this); 
        this.onChangeEmail = this.onChangeEmail.bind(this); 
        this.onChangeMessage = this.onChangeMessage.bind(this); 
        this.onSubmit = this.onSubmit.bind(this); 

        this.state = {
            name: '', 
            phone: '', 
            email: '', 
            message: ''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        }); 
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        }); 
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value 
        }); 
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value 
        });
    }

    onSubmit(e) {
        alert("Your request has been sent!!!")
        e.preventDefault(); 

        const scheduleDemo = {
            name: this.state.name, 
            phone: this.state.phone, 
            email: this.state.email, 
            message: this.state.message 
        }

        console.log(scheduleDemo); 

        axios.post('http://localhost:5000/scheduleDemos/add', scheduleDemo)
            .then(res => console.log(res.data)); 
            
        this.setState({
            name: '', 
            phone: '', 
            email: '',
            message: ''
        })

        window.location = '/kitch';
    }


    render() { 
        return (
            <div className="form-responsive">
                <Accordion defaultActiveKey="1" id="schedule">
                    <Card border="info">
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                        <h4><Icon icon={arrowDropDownLine} height="2em" /> Click here to schedule a demo for you and your team</h4>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone: </label>
                        <div>
                            <NumberFormat
                            required
                            format="(###) ###-####" 
                            mask="_"
                            value={this.state.phone}
                            onChange={this.onChangePhone}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Message: (Include a date and time and one of our
                        customer service associates will contact you)</label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.message}
                        onChange={this.onChangeMessage}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
                </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>
            </div>
        )
    }
}