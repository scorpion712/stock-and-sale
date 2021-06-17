const express = require("express");
const bodyParser = require("body-parser");
// adding routers
const orderRouter = require('./routes/ordersRoute'); 
const accountRouter = require('./routes/accoutsRoute'); 
const clientRouter = require('./routes/clientsRoute'); 
const productRouter = require('./routes/productsRoute'); 
const providerRouter = require('./routes/providersRoute'); 
const cashRouter = require('./routes/cashRoute'); 
// create server using express
const app = express();
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/build"));

app.use('/api', orderRouter);
app.use('/api', accountRouter);
app.use('/api', clientRouter);
app.use('/api', productRouter);
app.use('/api', providerRouter);
app.use('/api', cashRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server at http://localhost:" + port + "/"));