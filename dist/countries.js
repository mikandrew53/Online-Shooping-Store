 class Countries {
    constructor(){
        this.defaultCountries = [{name: 'Canada'}, {name:'United States'}, {name:'Other'}];
        this.countries;
    }
    async getCountries (){
        const response = await fetch('countries.json');
        if (response.ok)
           this.countries = response.json();
        else
            this.countries = this.defaultCountries;
        return this.countries;
    }
}