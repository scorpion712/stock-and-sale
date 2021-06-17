const connection = require('../connection');

// get accounts ("sales" that client did not pay)
module.exports.fetchAccounts = async(req, res) => {
    connection.query(
        "SELECT s.sale_id, sale_date, sale_total, client_name, delivered "+
        "FROM bd_elruso.sales s JOIN bd_elruso.client c ON (s.client_id = c.client_id) JOIN bd_elruso.sales_no_fiscal nf ON (s.sale_id = nf.sale_id) "+
        "WHERE payment LIKE 'A'", 
        function(err, rows) {
            if (err) throw err;
            res.send(JSON.stringify(rows));
        }
    );
};

// pay off an acocunt 
module.exports.payOffAccount = async(req, res) => {
    const {sale_id, delivered} = req.body;
    connection.query("UPDATE bd_elruso.sales_no_fiscal SET delivered = "+ delivered + " WHERE sale_id = "+sale_id, 
        (err, results) => {
            if (err) throw err;
            res.send(JSON.stringify(results));
        }  
    );
};