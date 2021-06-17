const connection = require('../connection');

// get all products
module.exports.fetchProducts = async(req,res) => { 
    const MY_QUERY = 'SELECT product_code, product_description, product_price, product_iva, product_category, provider_name ' +
    'FROM bd_elruso.product pr JOIN bd_elruso.provider p ON (pr.provider_id = p.provider_id)'
    connection.query(MY_QUERY, function (err, rows) {
        if (err)
            throw err;
        res.send(JSON.stringify(rows));
    });  
};

// save a new product
module.exports.createProduct = async(req, res) => { 
    const {description, category, provider, price} = req.body;
    connection.query("INSERT INTO bd_elruso.product (product_description, product_category, product_price, provider_id) VALUES (?,?,?, (SELECT provider_id FROM bd_elruso.provider WHERE provider_name LIKE ?))",
        [description, category, price, provider], 
        function(err,rows) {
            if (err) throw err;
            res.send(JSON.stringify(rows));
        }
    );
};

// edit an existing product
module.exports.editProduct = async(req, res) => {  
    const {product_description, provider_name, product_category,product_price, product_iva, product_code} = req.body; 
    connection.query("UPDATE bd_elruso.product SET product_description = ?, provider_id = (SELECT DISTINCT provider_id FROM bd_elruso.provider WHERE provider_name LIKE ?), product_category = ?, product_price = ?, product_iva = ? WHERE product_code = ?",
        [product_description, provider_name, product_category, Number(parseFloat(product_price).toFixed(2)), product_iva, product_code], 
        (err, results) => {
            if (err) throw err;
            res.send(JSON.stringify(results));
        });
};

// remove an existing product
module.exports.removeProduct = async (req,res) => { 
    const id = req.params.id;  
    connection.query("DELETE FROM bd_elruso.product WHERE product_code = "+id, 
    (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    }); 
};