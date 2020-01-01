const countries = new Countries();
const ui = new UI();
const cart = new Cart();
const payment = new Payment();


// fetch and display countries from json file once DOM has loaded
// display date range for cardExperationYearLabel
// Write first two numbers for the experation year input
document.addEventListener('DOMContentLoaded', e =>{
    ui.displayHeader();
    countries.getCountries()
    .then(allCountries => ui.displayCountries(allCountries));

    document.getElementById('cardExperationYearLabel').innerHTML += ` (${payment.today.getFullYear()} - ${payment.today.getFullYear()+5})`;
    let year = payment.today.getFullYear();
    year = year.toString();
    console.log(year.slice(1, 4));
    if (year.slice(2, 4) === '99' && year.slice(1, 4) !== '999'){
        document.getElementById('cardExperationYear').value = year.slice(0,1);
    }else if (year.slice(1, 4) !== '999'){
        document.getElementById('cardExperationYear').value = year.toString().slice(0,2);
    }
    payment.paymentInfo.valueIntialYear = document.getElementById('cardExperationYear').value;
    
});

// Cart Items
document.getElementById('red-box').addEventListener('click', e => {
    ui.unDisablebtn();
    document.getElementById('redCheckbox').checked = true;
    e.preventDefault();
});
document.getElementById('blue-box').addEventListener('click', e => {
    ui.unDisablebtn();
    document.getElementById('blueCheckbox').checked = true;
    e.preventDefault();
});
document.getElementById('orange-box').addEventListener('click', e => {
    ui.unDisablebtn();
    document.getElementById('orangeCheckbox').checked = true;
    e.preventDefault();
});
document.getElementById('green-box').addEventListener('click', e => {
    ui.unDisablebtn();
    document.getElementById('greenCheckbox').checked = true;
    e.preventDefault();
});

// Add Cart Item
document.getElementById('anotherItem').addEventListener('click', e => {
    cart.addItem();
    let itemQuantity = cart.item;
    if(itemQuantity){
        if(itemQuantity === 'red')
            itemQuantity = cart.red.quantity;
        else if (itemQuantity === 'blue')
            itemQuantity = cart.blue.quantity;
        else if(itemQuantity === 'orange')
            itemQuantity = cart.orange.quantity;
        else 
            itemQuantity = cart.green.quantity;
    ui.addItemToCart
    (cart.item,
    itemQuantity,
    cart.colorSubTotal,
    cart.subTotal.string,
    cart.cartTotal.string,
    cart.quantity.total);
    }

    e.preventDefault();
});


document.getElementById('clear-btn').addEventListener('click', e => {
    ui.clear();
    cart.reset();
    payment.clear();
    e.preventDefault();
});

document.getElementById('payment-btn').addEventListener('click', e => {
    if(!cart.isCartEmpty){
        payment.validate(ui.countries);
    }else
        alert('Cart Is Empty');
        e.preventDefault();
});


document.getElementById('creditCardNumber').addEventListener('input', e => {
    payment.checkCreditCardNumber(e);
    e.preventDefault();
});
document.getElementById('securityCode').addEventListener('input', e => {
    payment.checkSecurityNumber(e);
    e.preventDefault();
});
document.getElementById('cardExperationMonth').addEventListener('input', e => {
    payment.checkMonth(e);
    e.preventDefault();
});
document.getElementById('cardExperationYear').addEventListener('input', e => {
    payment.checkYear(e)
    e.preventDefault();
});