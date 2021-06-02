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


const TrashInventory = props => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

return (
    <tr>
        <td className="inventorylist">{props.inventory.fooditem}</td>
        <td className="inventorylist">{props.inventory.category}</td>
        <td className="inventorylist">{props.inventory.unitsize}{props.inventory.unittype}</td>
        <td className="inventorylist">{props.inventory.date.substring(0,10)}</td>
        <td className="inventorylist">{props.inventory.instock}</td>
        <td className="inventorylist">{props.inventory.needed}</td>
        <td className="inventorylist">{props.inventory.topurchase}</td>
        <td className="inventorylist">${props.inventory.unitprice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td className="inventorylist">${props.inventory.totalcost.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td className="inventorylist">
            <Button variant="outline-warning" size="sm">
            <Link to={"/restores/"+props.inventory._id}>restore</Link>
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
                        <Button variant="primary" onClick= {() => { props.deleteInventory(props.inventory._id) }}>Confirm</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </td>
    </tr>
    );
}


export default class TrashInventoryList extends Component {
    constructor(props) { 
        super(props); 

        this.deleteInventory = this.deleteInventory.bind(this); 

        this.state = {inventorys: []}; 

        this.compareByDescend.bind(this); 
        this.compareByAscend.bind(this); 
        this.sortByUp.bind(this); 
        this.sortByDown.bind(this); 
    }

    componentDidMount() {
        axios.get('http://localhost:5000/trashInventorys/')
        .then(response => {
            this.setState({ inventorys: response.data})
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
        let arrayCopy = [...this.state.inventorys]; 
        arrayCopy.sort(this.compareByDescend(key)); 
        this.setState({inventorys: arrayCopy});
    }

    // Z-A and 100-1 
    sortByDown(key) {
        let arrayCopy = [...this.state.inventorys]; 
        arrayCopy.sort(this.compareByAscend(key)); 
        this.setState({inventorys: arrayCopy});
    }


    deleteInventory(id) {
        axios.delete('http://localhost:5000/trashInventorys/'+id)
            .then(res => console.log(res.data)); 

        this.setState({
            inventorys: this.state.inventorys.filter(el => el._id !== id)
        })
    }

    trashInventoryList() {
        return this.state.inventorys.map(currentinventory => {
            return <TrashInventory inventory={currentinventory} deleteInventory={this.deleteInventory} key={currentinventory._id}/>; 
        })
    }

    render() { 
        return (
            <div className="table-responsive">
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Trash Inventory List
                            <Icon icon={arrowDropDownLine} height="2em" />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                <table className="table table-sm table-hover table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>
                            Food Item
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('fooditem')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('fooditem')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Category
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('category')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('category')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Unit Size
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('unitsize')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('unitsize')}>
                                </i>
                                </ButtonGroup>
                            </th>
                            <th>
                            Exp. Date
                                <ButtonGroup vertical>
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('date')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('date')}>
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
                                <i className="fas fa-sort-up" role="button" onClick={() => this.sortByUp('needed')}>
                                </i>
                                <i className="fas fa-sort-down" role="button" onClick={() => this.sortByDown('needed')}>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.trashInventoryList() }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Food Item</th>
                            <th>Category</th>
                            <th>Unit Size</th>
                            <th>Exp. Date</th>
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