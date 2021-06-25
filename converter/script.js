const calculateTemp = () => {
	const numberTemp = document.getElementById("temp").value;
	const tempSelected  = document.getElementById("temp_diff");
    const valueTemp =  temp_diff.options[tempSelected.selectedIndex].value;
    
    const celTofer = (cel) => {
        let ferhenheit = Math.round((cel* 9/5)+32);
        return ferhenheit;
    }
    
    const ferTocel = (fer) => {
        let celcius = Math.round((fer -32 )* 5/9);
        return celcius;
    }
    
    let result;
    
    if(valueTemp == 'cel'){
        result = celTofer(numberTemp);
        document.getElementById('resultContainer').innerHTML = `${result} ferhenheit`;
    }
    else{
        result = ferTocel(numberTemp);
        document.getElementById('resultContainer').innerHTML = `${result} celcius`;
    }
    
}

}