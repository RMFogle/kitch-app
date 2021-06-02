import React, { Component } from 'react'; 
import Card from 'react-bootstrap/Card'; 
import CardDeck from 'react-bootstrap/CardDeck';
import InventoryIcon from '../img/kitch-inventory-homepage.png'; 
import BookingIcon from '../img/kitch-bookings-homepage.png'; 
import ClientIcon from '../img/kitch-clients-homepage.png';
import '../styles/clientHomePage-style.css'; 


export default class ClientHomePage extends Component {

    render() {
        return (
            <div className="card-responsive">
            <CardDeck className="card-deck">
                <Card className="card">
                    <Card.Body className="card-body-home">
                        <Card.Link href="/inventory">
                            <Card.Img variant="top" src={InventoryIcon} />
                        </Card.Link>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
                <Card className="card">
                    <Card.Body className="card-body-home">
                        <Card.Link href="/client">
                            <Card.Img variant="top" src={ClientIcon} />
                        </Card.Link>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
                <Card className="card">
                    <Card.Body className="card-body-home">
                        <Card.Link href="/booking">
                            <Card.Img variant="top" src={BookingIcon} />
                        </Card.Link>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
            </CardDeck>
            </div>
        )
    }
}