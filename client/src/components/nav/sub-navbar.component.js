import React, { Component } from 'react'; 
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; 
import Logo1 from '../img/kitch-navlogo-2a.png';
import '../styles/nav-style.css'; 

export default class SubNavbar extends Component {

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" className="nav-responsive">
            <Navbar.Brand>
                <Link to="/demo">
                <img width="auto" height="auto" className="img-responsive" src={Logo1} alt="logo"></img>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Inventory" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/inventory">Food Inventory</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/supply">Supply Inventory</NavDropdown.Item>
                        </NavDropdown>
                    <Nav.Link href="/client">Clients</Nav.Link>
                    <Nav.Link href="/booking">Bookings</Nav.Link>
                        <NavDropdown title="Other" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/report">Reports</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/archive">Archive</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/trash">Trash</NavDropdown.Item>
                        </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="/">Sign Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}