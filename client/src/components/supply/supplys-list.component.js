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

const Supply = props => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <tr>
            <td className="supplylist">{props.supply.supplyitem}</td>
            <td className="supplylist">{props.supply.vendor}</td>
            <td className="supplylist">{props.supply.instock}</td>
            <td className="supplylist">{props.supply.need}</td>
            <td className="supplylist">{props.supply.topurchase}</td>
            <td className="supplylist">${props.supply.unitprice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td className="supplylist">${props.supply.totalcost.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td className="supplylist">
            <Button variant="outline-info" size="sm">
            <Link to={"/editsss/"+props.supply._id}>edit</Link>
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
                        <Modal.Title>Delete Item</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        Are you sure you want to delete this item? 
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" onClick= {() => { props.deleteSupply(props.supply._id) }}>Confirm</Button>
                    </Modal.Footer>
                </Modal>
            </>
            </td>
        </tr>
    ); 
}

export default class SupplyList extends Component {
    constructor(props) {
        super(props);

        this.deleteSupply = this.deleteSupply.bind(this); 

        this.state = {supplys: []}; 

        this.compareByDescend.bind(this); 
        this.compareByAscend.bind(this); 
        this.sortByUp.bind(this); 
        this.sortByDown.bind(this); 
    }

    componentDidMount() {
        axios.get('http://localhost:5000/supplys/')
        .then(response => {
            this.setState({ supplys: response.data})
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
        let arrayCopy = [...this.state.supplys]; 
        arrayCopy.sort(this.compareByDescend(key)); 
        this.setState({supplys: arrayCopy});
    }

    // Z-A and 100-1 
    sortByDown(key) {
        let arrayCopy = [...this.state.supplys]; 
        arrayCopy.sort(this.compareByAscend(key)); 
        this.setState({supplys: arrayCopy});
    }


    deleteSupply(id) {
        axios.delete('http://localhost:5000/supplys/'+id)
            .then(res => console.log(res.data)); 

        this.setState({
            supplys: this.state.supplys.filter(el => el._id !== id)
        })
    }

    supplyList() {
        return this.state.supplys.map(currentsupply => {
            return <Supply supply={currentsupply} deleteSupply={this.deleteSupply} key={currentsupply._id}/>; 
        })
    }

    render() {
        return (
            <div className="table-responsive">
                <Accordion defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Supply Inventory List
                            <Icon icon={arrowDropDownLine} height="2em" />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                <table className="table table-sm table-hover table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>
                            Supply Item
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('supplyitem')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('supplyitem')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Vendor
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('vendor')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('vendor')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            In Stock
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('instock')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('instock')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Need
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('need')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('need')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            To Purchase                                
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('topurchase')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('topurchase')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Unit Price
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('unitprice')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('unitprice')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Total Cost
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('totalcost')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('totalcost')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>Actions:</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.supplyList() }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Supply Item</th>
                            <th>Vendor</th>
                            <th>In Stock</th>
                            <th>Need</th>
                            <th>To Purchase</th>
                            <th>Unit Price</th>
                            <th>Total Cost</th>
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