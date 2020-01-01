class Cart {
    constructor(){
        this.quantity = {
            currentQuantity: 0,
            total: 0
        };
        this.items; // html collection of document.getElementsByName('item');
        this.item; // string of the selected item ex: 'red'
        this.cartTotal = {
            string: '',
            total: 0
        };
        
        this.subTotal = {
            string: '', 
            total: 0
        };
        
        this.red = {}; 
        this.blue = {};
        this.orange = {};
        this.green = {};
        this.setItem(this.red);
        this.setItem(this.blue);
        this.setItem(this.orange);
        this.setItem(this.green);
    
        this.round = new Round ();
        this.colorSubTotal = '';
        this.isCartEmpty = true;
    }
    
    addItem(){
        this.isCartEmpty = false;
        this.quantity.currentQuantity = parseFloat(document.getElementById('item-quantity').value);
        
        const item = this.checkItems();

        if (item){
            this.subTotal.total += this.quantity.currentQuantity*item;
            this.cartTotal.total = this.subTotal.total*1.13;
    
            let stringTot = this.cartTotal.total.toString();
            let stringSubTot = this.subTotal.total.toString();
    
            stringTot = this.round.roundNum(stringTot);
            this.cartTotal.string = stringTot;
            
            stringSubTot = this.round.roundNum(stringSubTot);
            this.subTotal.string = stringSubTot;
        }
    }

    checkItems(){
        this.items = document.getElementsByName('item');
        let checkQuantity;
        for(let i=0; i<this.items.length; i++){
            if(this.items[i].checked){
                let totString;
                if(i==0){
                    checkQuantity = this.red.quantity + this.quantity.currentQuantity;
                    if(checkQuantity > 10){
                        this.item = '';
                        return '';
                    }
                    this.red.total += this.items[i].value * this.quantity.currentQuantity;
                    this.red.quantity += parseFloat(this.quantity.currentQuantity);
                    totString = this.red.total.toString();
                        this.red.string = this.round.roundNum(totString);
                        this.colorSubTotal = this.red.string;
                        this.item = 'red';    
                }else if (i == 1){
                    checkQuantity = this.blue.quantity + this.quantity.currentQuantity;
                    if(checkQuantity > 10){
                        console.log('blue: ' + checkQuantity);
                        this.item = '';
                        return '';
                    }
                    this.blue.total += this.items[i].value * this.quantity.currentQuantity;
                    this.blue.quantity += parseFloat(this.quantity.currentQuantity);
                    totString = this.blue.total.toString();
                    this.blue.string = this.round.roundNum(totString);
                    this.colorSubTotal = this.blue.string;
                    this.item = 'blue';
                }else if (i==2){
                    checkQuantity = this.orange.quantity + this.quantity.currentQuantity;
                    console.log('orange: ' + checkQuantity);
                    if(checkQuantity > 10){
                        console.log('orange');
                        this.item = '';
                        return '';
                    }
                    this.orange.total += this.items[i].value * this.quantity.currentQuantity;
                    this.orange.quantity += parseFloat(this.quantity.currentQuantity);
                    totString = this.orange.total.toString();
                    this.orange.string = this.round.roundNum(totString);
                    this.colorSubTotal = this.orange.string;
                    this.item = 'orange';
                }else if (i==3){
                    checkQuantity = this.green.quantity + this.quantity.currentQuantity;
                    if(checkQuantity > 10){
                        this.item = '';
                        return '';
                    }
                    this.green.total += this.items[i].value * this.quantity.currentQuantity;
                    this.green.quantity += parseFloat(this.quantity.currentQuantity);
                    totString = this.green.total.toString();
                    this.green.string = this.round.roundNum(totString);
                    this.colorSubTotal = this.green.string;
                    this.item = 'green';
                }
                this.quantity.total += this.quantity.currentQuantity;
                return this.items[i].value; // Example: 19.99"
            }
        }
    }
    reset(){
        this.cartTotal.total = 0;
        this.cartTotal.string = '';

        this.subTotal.total = 0;
        this.subTotal.string = '';

        this.quantity.currentQuantity = 0;
        this.quantity.total = 0;
        
        this.setItem(this.red);
        this.setItem(this.blue);
        this.setItem(this.orange);
        this.setItem(this.green);
        
        this.colorSubTotal = '';

        this.isCartEmpty = true;
    }

    setItem(item){
        item.total = 0;
        item.quantity = 0;
        item.string = '';
    }
}