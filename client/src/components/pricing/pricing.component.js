import React, { Component, useState } from 'react'; 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'; 
import ListGroup from 'react-bootstrap/ListGroup';
import { Icon } from '@iconify/react';
import Alert from 'react-bootstrap/Alert';
import checkmarkCircle2Fill from '@iconify-icons/eva/checkmark-circle-2-fill';
import Starter from '../img/starter-pricing.png'; 
import Pro from '../img/pro-pricing.png'; 
import Enterprise from '../img/enter-pricing.png'; 
import '../styles/pricing-style.css'; 


const AlertDismissible = () => {
    const [show, setShow] = useState(false);

    return (
        <>
        <Alert show={show} variant="success">
            <Alert.Heading>Pricing Disabled!</Alert.Heading>
            <p>
            Kitch App is currently a demo application only. 
            We are not taking subscriptions at this time.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-success">
                Close
                </Button>
            </div>
        </Alert>

        {!show && <Button onClick={() => setShow(true)} variant="success" size="lg">Sign Up</Button>}
        </>
    );
}

export default class PricingPage extends Component {

    pricingAlert() {
        <AlertDismissible />
    }

    render() {

        return (
            <div className="card-responsive">
                <CardDeck>
                    <Card className="price">
                    <Card.Img variant="top" src={Starter} />
                    <div className="center-button">
                        <AlertDismissible />
                        </div>
                        <Card.Body>
                            <Card.Text>
                            <ListGroup variant="flush">
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark" />{" "}<small>Good for Start Ups or Small Businesses</small></ListGroup.Item>
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>100 GB Secure Storage</small></ListGroup.Item>
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>Mobile and Sync Capabilities</small></ListGroup.Item>
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>Up to 10 Embedded Data Charts</small></ListGroup.Item>
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>Customer Support Help Desk</small></ListGroup.Item>
                            </ListGroup>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        </Card.Footer>
                    </Card>
                    <Card className="price">
                    <Card.Img variant="top" src={Pro} />
                    <div className="center-button">
                        <AlertDismissible />
                        </div>
                        <Card.Body>
                        <Card.Title></Card.Title>
                            <Card.Text>
                            <ListGroup variant="flush">
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>All Starter Features +</small></ListGroup.Item>
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>Minimum 3 Users</small></ListGroup.Item>
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>500 GB Secure Storage</small></ListGroup.Item>
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>Up to 25 Embedded Data Charts</small></ListGroup.Item>
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>Client Side Online Ordering</small></ListGroup.Item>
                            </ListGroup>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        </Card.Footer>
                    </Card>
                    <Card className="price">
                    <Card.Img variant="top" src={Enterprise} />
                    <div className="center-button">
                        <AlertDismissible />
                        </div>
                        <Card.Body>
                        <Card.Title></Card.Title>
                            <Card.Text>
                            <ListGroup variant="flush">
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>All Professional Features +</small></ListGroup.Item>
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>Unlimited Secure Storage</small></ListGroup.Item>
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>Enhanced Session and Account Management</small></ListGroup.Item>
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>Unlimited Embedded Data Charts</small></ListGroup.Item>
                            <ListGroup.Item><Icon icon={checkmarkCircle2Fill} className="checkmark"/>{" "}<small>Full Customization of SDK Data Charts Package</small></ListGroup.Item>
                            </ListGroup>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        </Card.Footer>
                    </Card>
                </CardDeck>
            </div>
        )
    
}
}