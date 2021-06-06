import React, { Component } from 'react'; 
import Card from 'react-bootstrap/Card'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import Upgrade from '../img/upgrad-support.png';
import Contact from '../img/contact-support.png';
import UpgradeBottom from '../img/upgradebelow-support.png'; 
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'; 
import ContactUs from './contactUs.component'; 
import '../styles/support-style.css'; 


export default class SupportPage extends Component {

    render() {
        return (
            <div className="card-responsive">
            <div className="container-support">
                <Row>
                    <Col md={12} lg={6}>
                <Card id="card3">
                    <Card.Img variant="top" src={Upgrade} />
                    <Card.Body>
                        <Card.Text>
                        </Card.Text>
                        <Button href="/pricing" variant="success" size="lg">Go</Button>
                    </Card.Body>
                    <Card.Img variant="bottom" src={UpgradeBottom} />
                </Card>
                </Col>
                <Col md={12} lg={6}>
                <Card id="card4" border="info">
                    <Card.Img variant="top" src={Contact} />
                    <Card.Body className="contact-us">
                        <Card.Text></Card.Text>
                    <ContactUs />
                    </Card.Body>
                </Card>
                </Col>
                </Row>
            </div>
                <br></br>
                <div>
                    <h2>FAQ's:</h2>
                </div>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Q: I cancelled a booking by mistake. How can I undo?
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>A: All cancelled bookings are located in your Archive Booking List. You can restore the booking back to your main list, or send it to the trash for permanete deletion.</Card.Body>
                    </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Q: I just added data to my Inventory and it's not showing up in my reports or data charts. How long does this take? 
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>A: Data charts are automatically updated. It can take up to 30min. If your updates take longer than 30min please contact us at ###-####.</Card.Body>
                    </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            Q: I want to clean up my client list. Is there a way I can do that? 
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>A: For clients you haven't booked in a while you can send their profile to your Client Archive.</Card.Body>
                    </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="3">
                            Q: I don't see a menu option for what we're offering our clients. How do I add a new menu selection when I create a booking? 
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>A: We can add it for you. Contact us at ###-####</Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}