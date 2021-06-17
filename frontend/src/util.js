 
function formatCurrency(num) {
    return "$" + Number(parseFloat(num).toFixed(2)).toLocaleString() + " "
};

function checkCUIT(cuit, e) {
    let regex = new RegExp("[0-9]|-"); 
    let character = String.fromCharCode(e.which);
    if(!regex.test(character)) { 
        e.preventDefault();
        return false;
    } 
    if (cuit.length > 12) {
        e.preventDefault();
        return false;
    }
    return true;
};

function checkPhone(phone, e) { 
    let character = String.fromCharCode(e.which);
    let regex = new RegExp("[0-9]"); 
    if(!regex.test(character)) { 
        e.preventDefault();
        return false;
    } 
    if (phone.length >= 10) {
        e.preventDefault();
        return false;
    }
}

function checkPostal(postal, e) {
    let character = String.fromCharCode(e.which)
    let regex = new RegExp("[0-9]"); 
    if(!regex.test(character)) { 
        e.preventDefault();
        return false;
    } 
    if (postal.length >= 4) {
        e.preventDefault();
        return false;
    }
}

function checkDouble (e) {
    let character = String.fromCharCode(e.which)
    let regex = new RegExp("[0-9.]"); 
    if(!regex.test(character)) { 
        e.preventDefault();
        return false;
    }     
}

export {formatCurrency, checkCUIT, checkPhone, checkPostal, checkDouble};