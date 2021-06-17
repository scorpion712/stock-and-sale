const connection = require('../connection');

// get all clients
module.exports.fetchClients = async (req, res) => { 
    connection.query('SELECT * from bd_elruso.client', function(err, rows) {
      if (err) throw err; 
        res.send(JSON.stringify(rows));
    });  
};

// edit a client by given id
module.exports.editClient = async(req, res) => {
    const id = req.params.id;   
    const {client_name, client_address, client_phone, client_cuit, client_category, client_email, client_city, client_postal} = req.body;
    connection.query("UPDATE bd_elruso.client SET client_name = ?, client_address = ?, client_phone = ?, client_cuit = ?, client_category = ?, client_email = ?, client_city = ?, client_postal = ? WHERE client_id = "+id,
        [client_name, client_address, client_phone, client_cuit, client_category, client_email, client_city, client_postal, id], 
        (err, results) => {
            if (err) throw err;
            res.send(JSON.stringify(results));
        });
};

// add new client
module.exports.createClient = async(req, res) => {
    const {client_name,client_address, client_phone, client_cuit, client_category, client_email, client_city, client_postal} = req.body;
    connection.query("INSERT INTO bd_elruso.client (client_name,client_address, client_phone, client_cuit, client_category, client_email, client_city, client_postal) VALUES (?,?,?,?,?,?,?,?)", 
        [client_name,client_address, client_phone, client_cuit, client_category, client_email, client_city, client_postal], 
        (err, results) => {
            if (err) throw err;
            res.send(JSON.stringify(results));
        }  
    );
};

// remove an existing client by given id
module.exports.removeClient = async(req, res) => { 
    const id = req.params.id;  
    connection.query("DELETE FROM bd_elruso.client WHERE client_id = "+id, 
    (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    }); 
};