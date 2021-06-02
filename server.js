const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 

require('dotenv').config({ path: "./config.env" }); 

const app = express(); 
const port = process.env.PORT; 

app.use(cors()); 
app.use(express.json()); 

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("MongoDB database connection established successfully"); 
})

const bookingsRouter = require('./routes/bookings'); 
const clientsRouter = require('./routes/clients'); 
const inventorysRouter = require('./routes/inventorys'); 
const supplysRouter = require('./routes/supplys'); 
const archiveBookingsRouter = require('./routes/archiveBookings'); 
const archiveClientsRouter = require('./routes/archiveClients'); 
const archiveInventorysRouter = require('./routes/archiveInventorys'); 
const trashBookingsRouter = require('./routes/trashBookings'); 
const trashClientsRouter = require('./routes/trashClients'); 
const trashInventorysRouter = require('./routes/trashInventorys');
const scheduleDemosRouter = require('./routes/scheduleDemos'); 
const contactUsRouter = require('./routes/contactUs');

app.use('/bookings', bookingsRouter); 
app.use('/clients', clientsRouter); 
app.use('/inventorys', inventorysRouter); 
app.use('/supplys', supplysRouter); 
app.use('/archiveBookings', archiveBookingsRouter); 
app.use('/archiveClients', archiveClientsRouter); 
app.use('/archiveInventorys', archiveInventorysRouter); 
app.use('/trashBookings', trashBookingsRouter); 
app.use('/trashClients', trashClientsRouter); 
app.use('/trashInventorys', trashInventorysRouter); 
app.use('/scheduleDemos', scheduleDemosRouter); 
app.use('/contactUs', contactUsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`); 
}); 