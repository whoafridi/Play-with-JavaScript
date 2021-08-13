function factorial(i){
	if (i==0){
		return "Zero"
	}
    if (i==1){
        return 1;
    }
    return factorial(i-1) * i;
}

console.log(factorial(5)); // output : 120