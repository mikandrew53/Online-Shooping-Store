class Payment {
    constructor(){
        this.paymentInfo = {
            firstName: document.getElementById('firstName'),
            lastName: document.getElementById('lastName'),
            creditCardNumber: document.getElementById('creditCardNumber'),
            creditCardNumberActual: '',
            creditCardValid: false,
            securityCode: document.getElementById('securityCode'),
            securityCodeValid: false,
            experationMonth: document.getElementById('cardExperationMonth'),
            expirationYear: document.getElementById('cardExperationYear'), 
            valueIntialYear: '',
            currentEnteredYear: ''
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
        this.today = new Date();
        this.deliveryDate;
    }

    validate(countries){
        if (this.checkFields()){
            console.log('All fields filled');
        }else{
            console.log('one or more fields empty');
        }
    }

    checkFields() {
        let passed = true;
      
        passed = this.checkField(this.paymentInfo.firstName, this.paymentInfo.firstName.value === '');
        passed = this.checkField(this.paymentInfo.lastName, this.paymentInfo.firstName.value === '');
        passed = this.checkField(this.paymentInfo.creditCardNumber, this.paymentInfo.creditCardNumber.value === '' || !paymentInfo.creditCardValid);
        passed = this.checkField(this.paymentInfo.securityCode, this.paymentInfo.securityCode.value === '' || !this.paymentInfo.securityCodeValid);
        passed = this.checkField(this.paymentInfo.experationMonth, this.paymentInfo.experationMonth.value === '');
        passed = this.checkField(this.paymentInfo.expirationYear, this.paymentInfo.expirationYear.value === '');
        passed = this.checkField(this.shippingInfo.streetAddress, this.shippingInfo.streetAddress.value === '');
        passed = this.checkField(this.shippingInfo.city, this.shippingInfo.city.value === '');
        passed = this.checkField(this.shippingInfo.state, this.shippingInfo.state.value === '');
        passed = this.checkField(this.shippingInfo.postalCode, this.shippingInfo.postalCode.value === '');
        passed = this.checkField(this.shippingInfo.country, this.shippingInfo.country.value === '');
        passed = this.checkField(this.email, this.email.value === '');
      
        return passed;
    }  
    
    checkField(field, condition){
        let passed = true;
        if(condition){
            this.changeBorderColour(field, 'red');
            passed = false;
        }else
            this.changeBorderColour(field, '#CCC')
        
        return passed;
    }

    changeBorderColour(field, colour){
        field.style.border = `solid 1px ${colour}`;
    }

    checkCountry(countries){
        console.log(this.shippingInfo.country.value);
        let isCountry = false
        countries.forEach(country => {
            if(this.shippingInfo.country.value == country.name)
                isCountry = true;
        });
        if(!isCountry)
            this.shippingInfo.country.value = '';
        return isCountry;
    }
    
    checkCreditCardNumber(e) {
        let creditCardNumber = this.paymentInfo.creditCardNumber.value;
        
        if (e.data === null && creditCardNumber.length < 20)
            this.paymentInfo.creditCardValid = false;
        if(e.data != null){
            if (isNaN(e.data) || creditCardNumber.length == 20)
                this.paymentInfo.creditCardNumber.value = creditCardNumber.slice(0, this.paymentInfo.creditCardNumber.value.length-1);
            else{
                if (creditCardNumber.length == 4){
                    this.paymentInfo.creditCardNumberActual = creditCardNumber;
                    this.paymentInfo.creditCardNumber.value += '_';
                    this.paymentInfo.creditCardValid = false;
                }else if(creditCardNumber.length == 9){
                    this.paymentInfo.creditCardNumberActual += creditCardNumber.slice(5,9);
                    this.paymentInfo.creditCardNumber.value += '_';    
                    this.paymentInfo.creditCardValid = false;
                }else if(creditCardNumber.length == 14){
                    this.paymentInfo.creditCardNumberActual += creditCardNumber.slice(10,14);
                    this.paymentInfo.creditCardNumber.value += '_';        
                    this.paymentInfo.creditCardValid = false;
                }else if(creditCardNumber.length == 19){
                    this.paymentInfo.creditCardNumberActual += creditCardNumber.slice(15,19);
                    this.paymentInfo.creditCardNumber.style.border = '#CCC solid 1px';
                    this.paymentInfo.creditCardValid = true;   
                }
                console.log('Credit card number: ' + this.paymentInfo.creditCardNumberActual);
            }
        }
    }

    checkSecurityNumber(e) {
        let securityCode = this.paymentInfo.securityCode.value
        if (e.data === null)
            this.paymentInfo.securityCodeValid = false;
        else if(securityCode.length == 4){
            this.paymentInfo.securityCode.value = securityCode.slice(0, this.paymentInfo.securityCode.value.length-1);
            this.paymentInfo.securityCodeValid = true;
        }
        else if (isNaN(e.data)){
            this.paymentInfo.securityCode.value = securityCode.slice(0, this.paymentInfo.securityCode.value.length-1);
        }else if (this.paymentInfo.securityCode.value.length === 3){
            this.paymentInfo.securityCode.style.border = '#CCC solid 1px';
            this.paymentInfo.securityCodeValid = true;
        }else 
            this.paymentInfo.securityCodeValid = false;
    }

    checkMonth(e){
        let month = this.paymentInfo.experationMonth.value
        if(e.data != null){
            if (isNaN(e.data) || month > 12 || month < 1)
                this.paymentInfo.experationMonth.value = month.slice(0, this.paymentInfo.experationMonth.value.length-1);
                // alert('Must be a number Between 1 and 12')
        }        
    }
    checkYear(e){
        let year = this.paymentInfo.expirationYear.value

        if (e.data === null){
            if (this.paymentInfo.valueIntialYear !== ''){
                if (year.length < this.paymentInfo.valueIntialYear.length){
                    this.paymentInfo.expirationYear.value = this.paymentInfo.valueIntialYear;
                }
            }
        }

        if(e.data != null){
            if (isNaN(e.data) || year.length > 4)
                this.paymentInfo.expirationYear.value = year.slice(0, this.paymentInfo.expirationYear.value.length-1);
            else if (year.length == 4){
                // if (e.data. length ==)
                if (year < this.today.getFullYear() || year > (this.today.getFullYear()+5)){
                    this.paymentInfo.expirationYear.style.border = 'solid 1px red ';
                }else if (year == this.today.getFullYear()){
                    this.paymentInfo.expirationYear.style.border = '#CCC solid 1px';
                }
            }
            else{
               this.paymentInfo.expirationYear.style.border = '#CCC solid 1px';
            }
        }        
    }
    clear(){
        this.clearPaymentInfo();
        this.removeRedBorderPaymentInfo();
        this.clearShippingInfo();
        this.removeRedBorderShippingInfo();
        this.changeBorderColour(this.email, '#CCC');
    }

    clearPaymentInfo(){
        this.paymentInfo.firstName.value = '';
        this.paymentInfo.lastName.value = '';
        this.paymentInfo.creditCardNumber.value = '';
        this.paymentInfo.securityCode.value = '';
        this.paymentInfo.experationMonth.value = '';
        this.paymentInfo.expirationYear.value = '';
        this.paymentInfo.creditCardValid = false;
        this.paymentInfo.securityCodeValid = false;
    }

    clearShippingInfo(){
        this.shippingInfo.streetAddress.value = '';
        this.shippingInfo.streetAddressLine2.value = '';
        this.shippingInfo.city.value = '';
        this.shippingInfo.state.value = '';
        this.shippingInfo.postalCode.value = '';
        this.shippingInfo.country.value = '';
    }

    removeRedBorderPaymentInfo(){
        this.changeBorderColour(this.paymentInfo.firstName, '#CCC');
        this.changeBorderColour(this.paymentInfo.lastName, '#CCC');
        this.changeBorderColour(this.paymentInfo.creditCardNumber, '#CCC');
        this.changeBorderColour(this.paymentInfo.securityCode, '#CCC');
        this.changeBorderColour(this.paymentInfo.experationMonth, '#CCC');
        this.changeBorderColour(this.paymentInfo.expirationYear, '#CCC');
    }
    
    removeRedBorderShippingInfo(){
        this.changeBorderColour(this.shippingInfo.streetAddress, '#CCC');
        this.changeBorderColour(this.shippingInfo.city, '#CCC');
        this.changeBorderColour(this.shippingInfo.state, '#CCC');
        this.changeBorderColour(this.shippingInfo.postalCode, '#CCC');
        this.changeBorderColour(this.shippingInfo.country, '#CCC');
    }
}