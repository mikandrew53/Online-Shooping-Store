class UI{
    constructor (){
        this.submitItem = document.getElementById('anotherItem');
        this.submitItemDisabled = true;
        this.cart = {
            cart_div: document.getElementById('cart'),
            header: `
            <div class="cart-header">
                <p class="text-primary">Item</p>
                <p class="text-primary">Quantity</p>
                <p class="text-primary">Sub-Total</p>
                <p class="text-primary">Total</p>
            </div>`,
            items: ``,
            total: ``
        };
        this.paymentInfo = {
            firstName: document.getElementById('firstName'),
            lastName: document.getElementById('lastName'),
            creditCardNumber: document.getElementById('creditCardNumber'),
            securityCode: document.getElementById('securityCode'),
            experationMonth: document.getElementById('cardExperationMonth'),
            expirationYear: document.getElementById('cardExperationYear')
        };

        this.shippingInfo = {
            streetAddress: document.getElementById('streetAddress'),
            streetAddressLine2: document.getElementById('streetAddressLine2'),
            city: document.getElementById('city'),
            state: document.getElementById('state'),
            postalCode: document.getElementById('postalCode'),
            country: document.getElementById('country')
        }
        this.email = document.getElementById('e-mail')

        this.countries;
    }
    
    addItemToCart(item, quantity_item, sub_total_item, sub_total, total, quantity){
        let outputItem = `
        <div class="cart-items" id=${item}>
            <img src="./img/${item}.jpeg" alt="" class="cart-img">
            <p>${quantity_item}</p>
            <p>$${sub_total_item}</p>
        </div>`;

        this.cart.total = `
        <div class="total">
            <p>Total:</p>
            <p>${quantity}</p>
            <p>$${sub_total}</p>
            <p class="text-primary">$${total}</p>  
        </div>`;
        
        let items = document.getElementsByClassName('cart-items');
        if (items.length === 0){
            this.cart.items = outputItem;
        }else{
            let isDouble = false;
            console.log('Second one');
            for(let i=0; i < items.length; i++){
                if (items[i].id == item){
                    items[i].outerHTML = outputItem;
                    isDouble = true;
                }
            }
            if(!isDouble){
                this.cart.items += outputItem;
            }else{
                let output = '';
                for(let i = 0; i < items.length; i++){
                    output += items[i].outerHTML;
                }
                this.cart.items = output;
            }

        }
            
        this.cart.cart_div.innerHTML = this.cart.header + this.cart.items + this.cart.total;
    }
    
    clear(){
        this.cart.items = '';
        this.cart.cart_div.innerHTML = this.cart.header + this.cart.items;

        this.paymentInfo.firstName.value = '';
        this.paymentInfo.lastName.value = '';
        this.paymentInfo.creditCardNumber.value = '';
        this.paymentInfo.securityCode.value = '';
        this.paymentInfo.experationMonth.value = '';
        this.paymentInfo.expirationYear.value = '';

        this.shippingInfo.streetAddress.value = '';
        this.shippingInfo.streetAddressLine2.value = '';
        this.shippingInfo.city.value = '';
        this.shippingInfo.state.value = '';
        this.shippingInfo.postalCode.value = '';
        this.shippingInfo.country.value = '';

        this.email.value = '';

    }
    displayHeader(){
        this.cart.cart_div.innerHTML = this.cart.header;
    }
    unDisablebtn() {
        this.submitItem.disabled = false;
        this.submitItem.className = 'btn btn-primary';
    }
    displayCountries(allCountries){
        this.countries = allCountries;
        const ui_countries = document.getElementById('countries');
        let output;
        allCountries.forEach(country => output += `<option>${country.name}</option>`);
        ui_countries.innerHTML = output;    
    }
    displayDeliveryDate(date){

    }
}