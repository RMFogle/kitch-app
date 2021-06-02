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

const TrashClient = props => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

return (
    <tr>
        <td className="clientlist">{props.client.clientname}</td>
        <td className="clientlist">{props.client.phone}</td>
        <td className="clientlist">{props.client.email}</td>
        <td className="clientlist">{props.client.notes}</td>
        <td className="clientlist">
            <Button variant="outline-warning" size="sm">
            <Link to={"/restoresClient/"+props.client._id}>restore</Link>
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
                        <Modal.Title>Delete Client</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        Are you sure you want to delete this client? 
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" onClick= {() => { props.deleteClient(props.client._id) }}>Confirm</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </td>
    </tr>
    );
}


export default class TrashClientList extends Component {
    constructor(props) { 
        super(props); 

        this.deleteClient = this.deleteClient.bind(this); 

        this.state = {clients: []}; 

        this.compareByDescend.bind(this); 
        this.compareByAscend.bind(this); 
        this.sortByUp.bind(this); 
        this.sortByDown.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/trashClients/')
        .then(response => {
            this.setState({ clients: response.data})
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
        let arrayCopy = [...this.state.clients]; 
        arrayCopy.sort(this.compareByDescend(key)); 
        this.setState({clients: arrayCopy});
    }

    // Z-A and 100-1 
    sortByDown(key) {
        let arrayCopy = [...this.state.clients]; 
        arrayCopy.sort(this.compareByAscend(key)); 
        this.setState({clients: arrayCopy});
    }

    deleteClient(id) {
        axios.delete('http://localhost:5000/trashClients/'+id)
            .then(res => console.log(res.data)); 

        this.setState({
            clients: this.state.clients.filter(el => el._id !== id)
        })
    }

    trashClientList() { 
        return this.state.clients.map(currentclient => {
            return <TrashClient client={currentclient} deleteClient={this.deleteClient} key={currentclient._id}/>;
        })
    }

    render() {
        return ( 
            <div className="table-responsive">
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Trash Client List
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
                            Phone
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('phone')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('phone')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Email
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('email')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('email')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Notes
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('notes')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('notes')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.trashClientList() }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Client</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Notes</th>
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