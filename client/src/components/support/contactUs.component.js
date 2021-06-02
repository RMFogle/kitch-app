import React, { Component } from 'react'; 
import axios from 'axios';
import NumberFormat from 'react-number-format';


export default class CreateContactUs extends Component {
    constructor(props) {
        super(props); 

        this.onChangeName = this.onChangeName.bind(this); 
        this.onChangePhone = this.onChangePhone.bind(this); 
        this.onChangeEmail = this.onChangeEmail.bind(this); 
        this.onChangeIssue = this.onChangeIssue.bind(this); 
        this.onSubmit = this.onSubmit.bind(this); 

        this.state = {
            name: '', 
            phone: '', 
            email: '', 
            issue: ''
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

    onChangeIssue(e) {
        this.setState({
            issue: e.target.value 
        });
    }

    onSubmit(e) {
        alert("Your message has been sent!!!")
        e.preventDefault(); 

        const contactUs = {
            name: this.state.name, 
            phone: this.state.phone, 
            email: this.state.email, 
            issue: this.state.issue
        }

        console.log(contactUs); 

        axios.post('http://localhost:5000/contactUs/add', contactUs)
            .then(res => console.log(res.data)); 
            
        this.setState({
            name: '', 
            phone: '', 
            email: '',
            issue: ''
        })

        window.location = '/support';
    }


    render() { 
        return (
            <div className="form-responsive">
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
                        <label>Issue: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.issue}
                        onChange={this.onChangeIssue}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}