const connection = require('../connection');

module.exports.getCash = async(req, res) => {
    connection.query("SELECT SUM(sale_total) AS 'cash' "+
        "FROM bd_elruso.sales "+
        "WHERE sale_id NOT IN (SELECT sale_id FROM bd_elruso.sales_no_fiscal "+
            "WHERE payment LIKE 'A') "+
        "AND sale_date = '"+new Date().toLocaleDateString("es-ES")+"'",
        function (err, result) {
            if (err) throw err; 
                res.send(JSON.stringify(result)); 
    }); 
};