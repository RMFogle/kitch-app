import React, { Component } from 'react'; 
import axios from 'axios'; 
import Button from 'react-bootstrap/Button';
import NumberFormat from 'react-number-format'; 
import DatePicker from 'react-date-picker'; 


export default class TrashInventoryFromArchive extends Component {
    constructor(props) {
        super(props); 

        this.onChangeFooditem = this.onChangeFooditem.bind(this); 
        this.onChangeCategory = this.onChangeCategory.bind(this); 
        this.onChangeUnitsize = this.onChangeUnitsize.bind(this); 
        this.onChangeInstock = this.onChangeInstock.bind(this); 
        this.onChangeNeeded = this.onChangeNeeded.bind(this); 
        this.onChangeTopurchase = this.onChangeTopurchase.bind(this); 
        this.onChangeUnitprice = this.onChangeUnitprice.bind(this); 
        this.onChangeTotalcost = this.onChangeTotalcost.bind(this); 
        this.onChangeUnitType = this.onChangeUnitType.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);  
        this.onSubmit = this.onSubmit.bind(this); 

        this.state = {
            fooditem: '', 
            category: '', 
            unitsize: '', 
            instock: '', 
            needed: '', 
            topurchase: '', 
            unitprice: '', 
            totalcost: '', 
            unittype: '',
            date: new Date(),  
            inventorys: []
        }   
    }


    componentDidMount() {
        axios.get('http://localhost:5000/archiveInventorys/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    fooditem: response.data.fooditem, 
                    category: response.data.category, 
                    unitsize: response.data.unitsize,
                    instock: response.data.instock,
                    needed: response.data.needed, 
                    topurchase: response.data.topurchase, 
                    unitprice: response.data.unitprice, 
                    totalcost: response.data.totalcost, 
                    unittype: response.data.unittype, 
                    date: response.data.date
                })
            })
            .catch(function (error) {
                console.log(error); 
            })

        axios.get('http://localhost:5000/archiveInventorys/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        inventorys: response.data.map(inventory => inventory.fooditem), 

                    })
                }

            })
    }
    
    onChangeFooditem(e) {
        this.setState({
            fooditem: e.target.value 
        }); 
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value 
        }); 
    }

    onChangeUnitsize(e) {
        this.setState({
            unitsize: e.target.value 
        }); 
    }

    onChangeInstock(e) {
        this.setState({
            instock: e.target.value
        }); 
    }

    onChangeNeeded(e) {
        this.setState({
            needed: e.target.value
        }); 
    }

    onChangeTopurchase(e) {
        this.setState({
            topurchase: e.target.value
        }); 
    }

    onChangeUnitprice(e) {
        this.setState({
            unitprice: e.target.value
        }); 
    }

    onChangeTotalcost(e) {
        this.setState({
            totalcost: e.target.value
        }); 
    }

    onChangeUnitType(e) {
        this.setState({
                unittype: e.target.value 
        }); 
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    addToTrashFromArchive() {
        const inventory = {
            fooditem: this.state.fooditem, 
            category: this.state.category, 
            unitsize: this.state.unitsize,
            instock: this.state.instock,
            needed: this.state.needed, 
            topurchase: this.state.topurchase, 
            unitprice: this.state.unitprice, 
            totalcost: this.state.totalcost, 
            unittype: this.state.unittype, 
            date: this.state.date
        }

        console.log(inventory);

        axios.post('http://localhost:5000/trashInventorys/add/', inventory)
        .then(res => console.log(res.data)); 
    }

    deleteArchiveInventory() {
        axios.delete('http://localhost:5000/archiveInventorys/'+this.props.match.params.id)
        .then(res => console.log(res.data)); 
    }

    onSubmit(e) { 
        alert("Item Sent To Trash!!!") 
        e.preventDefault(); 

        console.log(this);

        axios.all([this.addToTrashFromArchive(), this.deleteArchiveInventory()])
        .then(res => console.log(res.data)); 

    
        window.location = '/archive'; 
    }


    render() {
        return (
            <div className="form-responsive">
                <h3>Trash Inventory</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Food Item: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.fooditem}
                        onChange={this.onChangeFooditem}
                        readOnly/>
                </div>
                <div className="form-group">
                    <label>Category: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.category}
                        onChange={this.onChangeCategory}
                        readOnly/>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Unit Size: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.unitsize}
                        onChange={this.onChangeUnitsize}
                        readOnly/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Unit Type: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.unittype}
                        onChange={this.onChangeUnitType}
                        readOnly>
                        </input>
                    </div>
                    </div>
                <div className="form-group">
                    <label>Exp. Date: </label>
                    <div>
                        <DatePicker
                        value={this.state.date}
                        onChange={this.onChangeDate}
                        readOnly/>
                    </div>
                </div>
                <div className="form-group">
                    <label>In Stock: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.instock}
                        onChange={this.onChangeInstock}
                        readOnly/>
                </div>
                <div className="form-group">
                    <label>Need: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.needed}
                        onChange={this.onChangeNeeded}
                        readOnly/>
                </div>
                <div className="form-group">
                    <label>To Purchase: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.topurchase}
                        onChange={this.onChangeTopurchase}
                        readOnly/>
                </div>
                <div className="form-group">
                    <label>Unit Price: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.unitprice}
                        onChange={this.onChangeUnitprice}
                        readOnly/>
                </div>
                <div className="form-group">
                    <label>Total Cost: </label>
                    <div>
                        <NumberFormat
                        thousandSeparator={true} 
                        prefix={'$'} 
                        inputmode="numeric"
                        value={this.state.totalcost}
                        onChange={this.onChangeTotalcost}
                        readOnly
                        />
                    </div>
                </div>

                <div className="form-group">
                    <Button type="submit" value="Trash Item">
                        Trash Item</Button>
                    {" "}
                    <Button href="/archive/">Cancel</Button>
                </div>
            </form>
            </div>
        )
    }
}