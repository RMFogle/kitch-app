import React, { Component } from 'react';
import "../styles/footerHomePage-style.css"; 

export default class FooterHomePage extends Component {

    render() {

        return(
            <footer className="homepage-footer">
                <div className="container-fluid">
                    <hr />
                    <div className="row">
                        <div className="col">
                            <p>
                            &copy;{new Date().getFullYear()} Kitch App | All rights reserved | Terms of service | Privacy
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

        )
    }
}