const connection = require('../connection');

// get all providers
module.exports.fetchProviders = async (req, res) => {
    connection.query('SELECT * FROM bd_elruso.provider', function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });  
};

// save a new provider
module.exports.createProvider = async (req, res) => {
    const {provider_name, provider_address, provider_phone, provider_cuit, provider_email, provider_city, provider_postal} = req.body;
    connection.query("INSERT INTO bd_elruso.provider (provider_name, provider_address, provider_city, provider_phone, provider_email, provider_cuit, provider_postal) VALUES (?,?,?,?,?,?,?)",
    [provider_name, provider_address, provider_city, provider_phone, provider_email, provider_cuit, provider_postal], 
    (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
};

// edit an existing provider
module.exports.editProvider = async(req, res) => {
    const id = req.params.id;  
    const {provider_name, provider_address, provider_phone, provider_cuit, provider_email, provider_city, provider_postal} = req.body;
    connection.query("UPDATE bd_elruso.provider SET provider_name = ?, provider_address = ?, provider_phone = ?, provider_cuit = ?, provider_email = ?, provider_city = ?, provider_postal = ? WHERE provider_id = "+id,
        [provider_name, provider_address, provider_phone, provider_cuit, provider_email, provider_city, provider_postal], 
        (err, results) => {
            if (err) throw err;
            res.send(JSON.stringify(results));
        });
};

// remove an existing provider
module.exports.removeProvider = async(req, res) => { 
    const id = req.params.id;  
    connection.query("DELETE FROM bd_elruso.provider WHERE provider_id = "+id, 
    (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    }); 
};

// increase all products prices from a given provider
module.exports.increaseProvider = async(req, res) => {
    const id = req.params.id;  
    const {inc_percent} = req.body; 
    connection.query("UPDATE bd_elruso.product SET product_price = product_price * ? WHERE provider_id = "+id,
        [parseInt(parseInt(inc_percent)+100)/100], 
        (err, results) => {
            if (err) throw err;
            res.send(JSON.stringify(results));
        });
};