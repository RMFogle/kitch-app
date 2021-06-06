import React, { Component } from 'react';
import "../styles/footerClientHome-style.css"; 

export default class FooterClientHome extends Component {

    render() {

        return(
            <footer className="clienthome-footer">
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