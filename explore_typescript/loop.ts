// loop to print 1 to 10
for ( let i : number = 1; i<=10; i++){
	console.log(i);
}

// loop to print 10 to 1
for ( let i : number = 10; i>=1; i--){
	console.log(i);
}

// loop to print the sum of 10 to 1 
let sum : number = 0;
for ( let i : number= 10; i>=1; i--){
	if ( i % 2==0){
		sum += i;
	}
}
console.log(sum);

// using while loop to print even numbers
let i : number = 1;
while (i <= 10){
	if(i % 2==0){
		console.log(i);
	}
	i++;
}

// using while loop for sum of even numbers
let iter : number = 1;
let	summ : number = 0;
while (iter <= 10){
	if(iter % 2==0){
		summ += i;
	}
	i++;
}
console.log(summ);