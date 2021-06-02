import React, { Component } from 'react'; 
import axios from 'axios'; 
import Button from 'react-bootstrap/Button';
import NumberFormat from 'react-number-format'; 

export default class TrashClientFromArchive extends Component {
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
        axios.get('http://localhost:5000/archiveClients/'+this.props.match.params.id)
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

        axios.get('http://localhost:5000/archiveClients/')
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

    addToTrashFromArchive() {
        const client = {
            clientname: this.state.clientname, 
            phone: this.state.phone, 
            email: this.state.email,
            notes: this.state.notes
        }

        console.log(client);

        axios.post('http://localhost:5000/trashClients/add', client)
        .then(res => console.log(res.data)); 
    }

    deleteArchiveClient() { 
        axios.delete('http://localhost:5000/archiveClients/'+this.props.match.params.id)
        .then(res => console.log(res.data));
    }

    onSubmit(e) {
        alert("Client Sent To Trash!!!")
        e.preventDefault();

        console.log(this);

        axios.all([this.addToTrashFromArchive(), this.deleteArchiveClient()])
        .then(res => console.log(res.data)); 

        window.location = '/archive';  
    }


    render() { 
        return (
            <div className="form-responsive">
                <h3>Trash Client</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Client: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.clientname}
                        onChange={this.onChangeClientname}
                        readOnly/>
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
                        readOnly
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
                        readOnly/>
                </div>
                <div className="form-group">
                    <label>Notes: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.notes}
                        onChange={this.onChangeNotes}
                        readOnly/>
                </div>

                <div className="form-group">
                    <Button type="submit" value="Trash Client">
                    Trash Client</Button>
                    {" "}
                    <Button href="/archive/">Cancel</Button>
                </div>
            </form>
        </div>
        )
    }
}