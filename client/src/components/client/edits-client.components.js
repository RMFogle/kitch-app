import React, { Component } from 'react'; 
import axios from 'axios';
import Button from 'react-bootstrap/Button'; 
import NumberFormat from 'react-number-format'; 


export default class EditClient extends Component {
    constructor(props) {
        super(props); 

        this.onChangeClientname = this.onChangeClientname.bind(this); 
        this.onChangePhone = this.onChangePhone.bind(this); 
        this.onChangeEmail = this.onChangeEmail.bind(this); 
        this.onChangeNotes = this.onChangeNotes.bind(this); 
        this.onSubmit = this.onSubmit.bind(this); 
        
        this.state = {
            clientname: '', 
            phone: '', 
            email: '',
            notes: '',
            clients: []
        }
    }


    componentDidMount() {
        axios.get('/clients/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    clientname: response.data.clientname, 
                    phone: response.data.phone, 
                    email: response.data.email, 
                    notes: response.data.notes
                })
            })
            .catch(function (error) {
                console.log(error); 
            })

        axios.get('/clients/')
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

    onChangeNotes(e) {
        this.setState({
            notes: e.target.value
        }); 
    }

    onSubmit(e) { 
        e.preventDefault(); 

        console.log(this); 

        const client = {
            clientname: this.state.clientname, 
            phone: this.state.phone, 
            email: this.state.email,
            notes: this.state.notes
        }

        console.log(client);

        axios.post('/clients/update/'+this.props.match.params.id, client)
        .then(res => console.log(res.data)); 

        window.location = '/client'; 
    }


    render() { 
        return (
            <div className="form-responsive">
                <h3>Edit Client</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Client: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.clientname}
                        onChange={this.onChangeClientname}
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
                    <input 
                        type="text"
                        required
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                </div>
                <div className="form-group">
                    <label>Notes: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.notes}
                        onChange={this.onChangeNotes}
                        />
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Client" className="btn btn-primary" />
                    {" "}
                    <Button href="/client">Cancel</Button>
                </div>
            </form>
            </div>
        )
    }
}