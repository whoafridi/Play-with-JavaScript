function sum(i){
	if (i==0){
		return "Zero"
	}
    if (i==1){
        return 1;
    }
    return sum(i-1) + i;
}

console.log(sum(0));