function evenOrOddSum(i){
	if(i==0){
		return 0;
	}
	else if (i==1){
		return 1;
	}
	return evenOrOddSum(i-2) + i;	
}
console.log(evenOrOddSum(7)); // output : 16
console.log(evenOrOddSum(4)); // output : 6