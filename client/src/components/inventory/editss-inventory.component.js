import React, { Component } from 'react'; 
import axios from 'axios'; 
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-date-picker';
import NumberFormat from 'react-number-format';

const CategoryType = () => (
    <optgroup>
        <option>Choose...</option>
        <option>Baking</option>
        <option>Beverage/Hot</option>
        <option>Beverage/Cold</option>
        <option>Canned Goods</option>
        <option>Condiments / Sauces</option>
        <option>Dairy</option>
        <option>Dry Goods</option>
        <option>Frozen</option>
        <option>Fruits</option>
        <option>Grains</option>
        <option>Herbs / Spices</option>
        <option>Legumes</option>
        <option>Meat</option>
        <option>Misc</option>
        <option>Oils / Fats</option>
        <option>Seafood</option>
        <option>Vegtables</option>
    </optgroup>
)

const UnitType = () => (
    <optgroup>
        <option>Choose...</option>
        <option>c</option>
        <option>fl oz</option>
        <option>gal</option>
        <option>gram</option>
        <option>kg</option>
        <option>L</option>
        <option>mg</option>
        <option>ml</option>
        <option>oz</option>
        <option>pt</option>
        <option>lb</option>
        <option>tbsp</option>
        <option>tsp</option>
    </optgroup>
)

export default class EditInventory extends Component {
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
        axios.get('/inventorys/'+this.props.match.params.id)
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
                    date: new Date(response.data.date),
                })
            })
            .catch(function (error) {
                console.log(error); 
            })

        axios.get('/inventorys/')
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

    categoryTypeList() {
        return <CategoryType />
    }

    unitTypeList() {
        return <UnitType />
    }

    onSubmit(e) { 
        e.preventDefault(); 

        console.log(this); 

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

        axios.post('/inventorys/update/'+this.props.match.params.id, inventory)
        .then(res => console.log(res.data)); 
    

        window.location = '/inventory'; 
    }


    render() {
        return (
            <div className="form-responsive">
                <h3>Edit Inventory</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Food Item: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.fooditem}
                        onChange={this.onChangeFooditem}
                        />
                </div>
                <div className="form-group">
                        <label>Category: </label>
                        <select id="category"
                        required
                        className="form-control"
                        value={this.state.category}
                        onChange={this.onChangeCategory}>
                            { this.categoryTypeList() }
                        </select>
                    </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Unit Size: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.unitsize}
                        onChange={this.onChangeUnitsize}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Unit Type: </label>
                        <select id="unittype"
                        required
                        className="form-control"
                        value={this.state.unittype}
                        onChange={this.onChangeUnitType}>
                            { this.unitTypeList() }
                        </select>
                    </div>
                    </div>
                <div className="form-group">
                    <label>Exp. Date: </label>
                    <div>
                        <DatePicker
                        required
                        value={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
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
                        value={this.state.needed}
                        onChange={this.onChangeNeeded}
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
                    <input type="submit" value="Save" className="btn btn-primary" />
                    {" "}
                    <Button href="/inventory">Cancel</Button>
                </div>
            </form>
            </div>
        )
    }
}