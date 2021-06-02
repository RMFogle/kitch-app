import React, { Component } from 'react'; 
import axios from 'axios'; 
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Icon } from '@iconify/react';
import arrowDropDownLine from '@iconify-icons/ri/arrow-drop-down-line';
import NumberFormat from 'react-number-format';

export default class CreateSupply extends Component {
    constructor(props) {
        super(props); 

        this.onChangeSupplyitem = this.onChangeSupplyitem.bind(this); 
        this.onChangeVendor = this.onChangeVendor.bind(this); 
        this.onChangeInstock = this.onChangeInstock.bind(this); 
        this.onChangeNeed = this.onChangeNeed.bind(this);
        this.onChangeTopurchase = this.onChangeTopurchase.bind(this); 
        this.onChangeUnitprice = this.onChangeUnitprice.bind(this); 
        this.onChangeTotalcost = this.onChangeTotalcost.bind(this); 
        this.onSubmit = this.onSubmit.bind(this); 

        this.state = {
            supplyitem: '', 
            vendor: '', 
            instock: '', 
            need: '', 
            topurchase: '',
            unitprice: '', 
            totalcost: '', 
        }

    }

    onChangeSupplyitem(e) {
        this.setState({
            supplyitem: e.target.value
        }); 
    }

    onChangeVendor(e) {
        this.setState({
            vendor: e.target.value 
        }); 
    }

    onChangeInstock(e) {
        this.setState({
            instock: e.target.value 
        }); 
    }

    onChangeNeed(e) {
        this.setState({
            need: e.target.value 
        }); 
    }

    onChangeTopurchase(e) {
        this.setState({
            topurchase: e.target.value, 
            totalcost: e.target.value * this.state.unitprice
        }); 
    }

    onChangeUnitprice(e) {
        this.setState({
            unitprice: e.target.value, 
            totalcost: e.target.value * this.state.topurchase
        });
    }

    onChangeTotalcost(e) {
        this.setState({
            totalcost: e.target.value 
        }); 
    }

    onSubmit(e) {
        alert("Supply Successfully Added!!!")
        e.preventDefault(); 

        const supply = {
            supplyitem: this.state.supplyitem, 
            vendor: this.state.vendor, 
            instock: this.state.instock, 
            need: this.state.need, 
            topurchase: this.state.topurchase, 
            unitprice: this.state.unitprice, 
            totalcost: this.state.totalcost
        }

        console.log(supply); 

        axios.post('http://localhost:5000/supplys/add', supply)
            .then(res => console.log(res.data)); 

        this.setState({
            supplyitem: '', 
            vendor: '', 
            instock: '', 
            need: '', 
            topurchase: '', 
            unitprice: '', 
            totalcost: ''
        })

        window.location.reload(); 
    }

    render() {
        return (
            <div className="form-responsive">
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            +Add Supply Inventory
                            <Icon icon={arrowDropDownLine} height="2em" />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Supply Item: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.supplyitem}
                        onChange={this.onChangeSupplyitem}
                        />
                    </div>
                    <div className="form-group">
                        <label>Vendor: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.vendor}
                        onChange={this.onChangeVendor}
                        />
                    </div>
                    <div className="form-group">
                        <label>In Stock: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.instock}
                        onChange={this.onChangeInstock}
                        />
                    </div>
                    <div className="form-group">
                        <label>Need: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.need}
                        onChange={this.onChangeNeed}
                        />
                    </div>
                    <div className="form-group">
                        <label>To Purchase: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.topurchase}
                        onChange={this.onChangeTopurchase}
                        />
                    </div>
                    <div className="form-group">
                        <label>Unit Price: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.unitprice}
                        onChange={this.onChangeUnitprice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Total Cost: </label>
                        <div>
                            <NumberFormat
                            required
                            thousandSeparator={true}
                            prefix={'$'}
                            inputmode="numeric"
                            value={this.state.totalcost}
                            onChange={this.onChangeTotalcost}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Item" className="btn btn-primary" />
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