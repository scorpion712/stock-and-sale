const connection = require('../connection');

// save a new sale
module.exports.createOrder = async (req, res) => {     
    const {client, cartItems, total, iva, type, comprobante, delivered} = req.body;
    // save sale
    const query_sale = "INSERT INTO bd_elruso.sales (client_id, sale_total, iva, sale_date) VALUES (?, ?, ?, ?)";
    connection.query(query_sale, 
        [client.client_id, total, iva, new Date().toLocaleDateString("es-ES")],
        (err, res) => {
            if (err) throw err;
        }
    ); 
    // insertar sale choosing type
    let query_sale_type = "";
    switch (type) {
        case "fiscal":
            query_sale_type = "INSERT INTO bd_elruso.sales_fiscal (sale_id, id_comprobante) VALUES ((SELECT MAX(sale_id) FROM bd_elruso.sales), 'a'" + comprobante + ")";
            break;
        case "account":
            query_sale_type = "INSERT INTO bd_elruso.sales_no_fiscal (sale_id, payment, delivered) VALUES ((SELECT MAX(sale_id) FROM bd_elruso.sales), 'A', " + delivered + ")";
            break;
        default: // venta en negro
            query_sale_type = "INSERT INTO bd_elruso.sales_no_fiscal (sale_id, payment) VALUES ((SELECT MAX(sale_id) FROM bd_elruso.sales), 'E')";
            break;
    }
    connection.query(
        query_sale_type, 
        (err, res) => {
            if (err) throw err;
        }
    );
    // sale line insert
    const query_line = "INSERT INTO bd_elruso.sale_line (sale_id, line_id, product_description, product_count, price, total) VALUES ((SELECT MAX(sale_id) FROM bd_elruso.sales), ?, ?, ?, ?, ?)";
    cartItems.forEach((element, line=1) => {
        connection.query(
            query_line,
            [line, element.product_description,  element.count, element.product_price, Number(parseFloat(element.count) * parseFloat(element.product_price))],
            (err, res) => {
                if (err) throw err;
            }
        );
        line++;
    });
    res.send({});
};

// get all sales
module.exports.fetchSales = async(req, res) => {
    connection.query(
        "SELECT DISTINCT s.sale_id, sale_date, sale_total, iva, client_name, client_category "+
        "FROM bd_elruso.sales s JOIN bd_elruso.client c ON (s.client_id = c.client_id) LEFT JOIN bd_elruso.sales_no_fiscal nf ON (s.sale_id = nf.sale_id) "+
        "WHERE payment NOT LIKE 'A' OR (payment LIKE 'A' and (s.sale_total - nf.delivered > 0))", 
        function(err, rows) {
            if (err) throw err;
            res.send(JSON.stringify(rows));
        }
    );
};

// get sale detail by sale id
module.exports.getSaleDetail = async(req, res) => {
    connection.query(
        "SELECT DISTINCT s.sale_id, sale_date, sale_total, iva, client_name, client_category "+
        "FROM bd_elruso.sales s JOIN bd_elruso.client c ON (s.client_id = c.client_id) LEFT JOIN bd_elruso.sales_no_fiscal nf ON (s.sale_id = nf.sale_id) "+
        "WHERE payment NOT LIKE 'A' OR (payment LIKE 'A' and (s.sale_total - nf.delivered > 0))", 
        function(err, rows) {
            if (err) throw err;
            res.send(JSON.stringify(rows));
        }
    );
};
