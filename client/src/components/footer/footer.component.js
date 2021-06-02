import React, { Component } from 'react';
import "../styles/footer-style.css"; 

export default class Footer extends Component {

    render() {

        return(
            <footer>
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