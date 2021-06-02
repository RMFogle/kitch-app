import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomePage from "./components/home/homepage.component";
import ClientHomePage from "./components/home/clientHomepage.component";

import MainNavbar from "./components/nav/main-navbar.component";
import SubNavbar from "./components/nav/sub-navbar.component";

import SupportPage from "./components/support/support.component";
import PricingPage from "./components/pricing/pricing.component"; 

import CreateInventory from "./components/inventory/create-inventory.component";
import InventoryList from "./components/inventory/inventorys-list.component"; 
import EditInventory from "./components/inventory/editss-inventory.component";
import ArchiveInventory from "./components/inventory/sendTo-archiveInventory.component";
import TrashInventory from "./components/inventory/sendToo-trashInventory.component";
import ArchiveInventoryList from "./components/inventory/archiveInventory-list.component";
import ArchiveRestoreInventory from "./components/inventory/restoreInventory-fromArchive.component";
import TrashInventoryFromArchive from "./components/inventory/sendToosTrash-fromArchiveInventory.component";
import TrashInventoryList from "./components/inventory/trashInventory-list.component";
import TrashRestoreInventory from "./components/inventory/restoresInventory-fromTrash.component"; 

import CreateSupply from "./components/supply/create-supply.component"; 
import SupplyList from "./components/supply/supplys-list.component"; 
import EditSupply from "./components/supply/editsss-supply.component"; 

import CreateBooking from "./components/booking/create-booking.component"; 
import BookingsList from "./components/booking/bookings-list.component";
import EditBooking from "./components/booking/edit-booking.component"; 
import ArchiveBooking from "./components/booking/addTo-archiveBooking.component";
import TrashBooking from "./components/booking/addToo-trashBooking.component";
import ArchiveBookingList from "./components/booking/archiveBooking-list.component"; 
import ArchiveRestoreBooking from "./components/booking/restoreBooking-fromArchive.component";
import TrashBookingFromArchive from "./components/booking/addTooTrash-fromArchiveBooking.component";
import TrashBookingList from "./components/booking/trashBooking-list.component";
import TrashRestoreBooking from "./components/booking/restoresBooking-fromTrash.component"; 

import CreateClient from "./components/client/create-client.component";  
import ClientsList from "./components/client/clients-list.component"; 
import EditClient from "./components/client/edits-client.components"; 
import ArchiveClient from "./components/client/postTo-archiveClient.component";
import TrashClient from "./components/client/postToo-trashClient.component";
import ArchiveClientList from "./components/client/archiveClient-list.component"; 
import ArchiveRestoreClient from "./components/client/restoreClient-fromArchive.component";
import TrashClientFromArchive from "./components/client/postToTrash-fromArchiveClient.component"; 
import TrashClientList from "./components/client/trashClient-list.component";  
import TrashRestoreClient from "./components/client/restoresClient-fromTrash.component";

import DataChart from "./components/report/data-charts.component"; 

import Footer from "./components/footer/footer.component"; 



function App() {
  return (
    <div className="page-container">
    <div className="content-wrap">
    <Router>
      <br/>
      <Route path="/kitch" component={MainNavbar} />
      <Route path="/kitch" component={HomePage} />
      <Route path="/support" component={MainNavbar} />
      <Route path="/support" component={SupportPage} />
      <Route path="/pricing" component={MainNavbar} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/demo" component={SubNavbar} />
      <Route path="/demo" component={ClientHomePage} />
      <Route path="/inventory" component={SubNavbar} />
      <Route path="/inventory" component={CreateInventory} />
      <Route path="/inventory" component={InventoryList} />
      <Route path="/supply" component={SubNavbar} />
      <Route path="/supply" component={CreateSupply} />
      <Route path="/supply" component={SupplyList} />
      <Route path="/booking" component={SubNavbar} />
      <Route path="/booking" component={CreateBooking} />
      <Route path="/booking" component={BookingsList} />
      <Route path="/client" component={SubNavbar} />
      <Route path="/client" component={CreateClient} /> 
      <Route path="/client" component={ClientsList} />
      <Route path="/edit/:id" component={EditBooking} />
      <Route path="/edits/:id" component={EditClient} />
      <Route path="/editss/:id" component={EditInventory} />
      <Route path="/editsss/:id" component={EditSupply} />
      <Route path="/report" component={SubNavbar} />
      <Route path="/report" component={DataChart} />
      <Route path="/archive" component={SubNavbar} />
      <Route path="/archive" component={ArchiveInventoryList} />
      <Route path="/archive" component={ArchiveClientList} />
      <Route path="/archive" component={ArchiveBookingList} />
      <Route path="/trash" component={SubNavbar} />
      <Route path="/trash" component={TrashInventoryList} />
      <Route path="/trash" component={TrashClientList} />
      <Route path="/trash" component={TrashBookingList} />
      <Route path="/postTo/:id" component={ArchiveClient} />
      <Route path="/postToo/:id" component={TrashClient} />
      <Route path="/postToTrash/:id" component={TrashClientFromArchive} />
      <Route path="/addTo/:id" component={ArchiveBooking} />
      <Route path="/addToo/:id" component={TrashBooking} />
      <Route path="/addTooTrash/:id" component={TrashBookingFromArchive} />
      <Route path="/sendTo/:id" component={ArchiveInventory} />
      <Route path="/sendToo/:id" component={TrashInventory} />
      <Route path="/sendToos/:id" component={TrashInventoryFromArchive} /> 
      <Route path="/restore/:id" component={ArchiveRestoreInventory} />
      <Route path="/restores/:id" component={TrashRestoreInventory} />
      <Route path="/restoreBooking/:id" component={ArchiveRestoreBooking} />
      <Route path="/restoresBooking/:id" component={TrashRestoreBooking} />
      <Route path="/restoreClient/:id" component={ArchiveRestoreClient} />
      <Route path="/restoresClient/:id" component={TrashRestoreClient} />
    </Router>
      </div>
      <Footer />
      </div>
  );
}

export default App;
