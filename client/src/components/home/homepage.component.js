import React, { Component } from 'react'; 
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'; 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import { Icon } from '@iconify/react';
import listOutline from '@iconify-icons/eva/list-outline';
import peopleGroup from '@iconify-icons/vs/people-group';
import calendarClockOutline from '@iconify-icons/mdi/calendar-clock-outline';
import barGraph from '@iconify-icons/entypo/bar-graph';
import KitchCarousel from '../img/kitch-carousel.jpg';
import InventoryCarousel from '../img/inventory-carousel.jpg'; 
import ClientsCarousel from '../img/clients-carousel.jpg'; 
import BookingCarousel from '../img/bookings-carousel.jpg'; 
import ReportsCarousel from '../img/reports-carousel.jpg'; 
import InventoryScreenshot from '../img/inventory-info-home.jpg';
import ClientScreenshot from '../img/client-info-home.jpg'; 
import BookingScreenshot from '../img/booking-info-home.jpg'; 
import ReportScreenshot from '../img/reports-info-home.jpg';
import Quote from '../img/quote-homepage.png'; 
import FreeDemo from '../img/getstarted-freedemo.png'; 
import CreateScheduleDemo from './scheduleDemo.component'; 
import '../styles/homePage-style.css';




export default class HomePage extends Component {

    render() {

        return (
            <div className="container-main">
                <div className="container-carousel">
                    <div className="row">
                        <div className="col">
                <Carousel className="carousel">
                    <Carousel.Item interval={3000}>
                        <img
                        className="d-block w-100"
                        src={KitchCarousel}
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                        className="d-block w-100"
                        src={InventoryCarousel}
                        alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                        className="d-block w-100"
                        src={ClientsCarousel}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                        className="d-block w-100"
                        src={BookingCarousel}
                        alt="Fourth slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                        className="d-block w-100"
                        src={ReportsCarousel}
                        alt="Fifth slide"
                        />
                    </Carousel.Item>
                </Carousel>
                </div>
            </div>
        </div>
        <br>
        </br>
        <div className="container-quote">
            <div className="row">
                <div className="col">
                    <Card>
                        <Image src={Quote} fluid className="info-image" />
                    </Card>
                </div>
            </div>
        </div>
        <br>
        </br>
        <Container className="container-info" fluid>
            <Row>
                <Col md={12} lg={6}>
                    <Card className="card-info" id="how">
                        <Card.Header><Icon icon={listOutline} /></Card.Header>
                        <Card.Body>
                        <Card.Title>Manage Your Inventory</Card.Title>
                            <Card.Text>
                            Add food items and kitchen supplies. Keep track of total costs and stock. 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            <Col md={12} lg={6}>
                <Image src={InventoryScreenshot} fluid className="info-image" />
            </Col>
            </Row>
        </Container>
        <br>
        </br>
        <Container className="container-info" fluid>
            <Row>
                <Col md={12} lg={6} className="img-second">
                    <Image src={ClientScreenshot} fluid className="info-image" />
                </Col>
                <Col md={12} lg={6}>
                    <Card className="card-info">
                        <Card.Header><Icon icon={peopleGroup} /></Card.Header>
                        <Card.Body>
                        <Card.Title>Keep Track of Your Clients</Card.Title>
                            <Card.Text>
                            Sortable tables make it easy to find a client and update their contact information. 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <br>
        </br>
        <Container className="container-info" fluid>
            <Row>
                <Col md={12} lg={6}>
                    <Card className="card-info">
                        <Card.Header><Icon icon={calendarClockOutline} /></Card.Header>
                        <Card.Body>
                        <Card.Title>Schedule Bookings</Card.Title>
                            <Card.Text>
                            Know when, where and how many guests you need to feed for your clients next event. 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            <Col md={12} lg={6}>
                <Image src={BookingScreenshot} fluid className="info-image" />
            </Col>
            </Row>
        </Container>
        <br>
        </br>
        <Container className="container-info" fluid>
            <Row>
                <Col md={12} lg={6} className="img-second">
                    <Image src={ReportScreenshot} fluid className="info-image" />
                </Col>
            <Col md={12} lg={6}>
                <Card className="card-info">
                    <Card.Header><Icon icon={barGraph} /></Card.Header>
                    <Card.Body>
                    <Card.Title>Generate Reports and Data Charts</Card.Title>
                        <Card.Text>
                        Visulized data shows you how much you spend on inventory each month. 
                        How many new clients you've booked, or how many bookings you've cancelled per month. 
                        Make informed decisions about your business with our data charts powered by mongoDB. 
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
        <br>
        </br>
        <div className="container-demo">
            <Card className="card-demo">
                    <Card.Img variant="top" src={FreeDemo} />
                        <Card.Body>
                            <div className="row">
                                <div className="col-md-4">
                                <Button href="/demo" variant="info" size="lg">FREE Demo</Button>
                                </div>
                            <br>
                            </br>
                                <div className="col-md-8">
                                    <CreateScheduleDemo />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <br>
                    </br>
                    <Card className="text-center" id="card-signup">
                        <Card.Body>
                        <Card.Title><h4>Manage Your Catering Business Today!</h4></Card.Title>
                            <Card.Text>See which plan is right for you.</Card.Text>
                                <Button href="/pricing" variant="success" size="lg">Sign Up</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}