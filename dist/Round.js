class Round {

    roundNum(string) {
        const indexOfDecimal = parseFloat(string.indexOf('.'));
        let decimals = string.slice(indexOfDecimal+1, string.length);
        let nonDecimals = string.slice(0, indexOfDecimal);
        const numToCheck = decimals.slice(2, 3);
        
        if(decimals.length >= 3){
            decimals = decimals.slice(0, 3);
            if (numToCheck > 4)
                return this.roundDecOrNonDec(decimals, nonDecimals);
            else
                return nonDecimals + '.' + decimals.slice(0, 2);
        }else 
            return string;
    }

    roundDecOrNonDec(decimals, nonDecimals){
        decimals = decimals.slice(0, 2);

        if (decimals == '99'){
            decimals = '00';
            nonDecimals = this.round(nonDecimals);
        }else
            decimals = this.round(decimals);
        
        return nonDecimals + '.' + decimals;
    }
    
    round(number) {
        let indexToCheck = number.length -1;
        let newNumber;
        let newString = '';
        for (let i = indexToCheck; indexToCheck > -1; i--){
            if (number.charAt(indexToCheck) != 9 || indexToCheck == 0){
                newNumber = parseFloat(number.charAt(indexToCheck)) +1;
                for(let i = 0; i < number.length; i++)
                    i == indexToCheck ? newString += newNumber : newString += number.charAt(i);
                return newString;
            }else {
                let tempString = '';
                for(let i = 0; i < number.length; i++)
                    i == indexToCheck ? tempString += '0' : tempString += number.charAt(i); 
                number = tempString;
            }
        }
    }
}