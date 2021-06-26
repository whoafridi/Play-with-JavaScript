let msg1 = document.getElementById("message1");
let msg2 = document.getElementById("message2");
let msg3 = document.getElementById("message3");
let result = document.getElementById("result");

let answer = Math.floor(Math.random()*10) + 1;
let no_of_guesses = 0;
let guessed_nums = [];

const play = () => {
    let user_guess = document.getElementById("guess").value;
    if(user_guess < 1 || user_guess > 10){
        alert("Please enter a number between 1 and 10.");
    }
    else{
        guessed_nums.push(user_guess);
        no_of_guesses+= 1;

        if(user_guess < answer){
            msg1.textContent = "Your guess is too low.";
            msg2.textContent = "No. of guesses: " + no_of_guesses;
            msg3.textContent = "Your gGuessed numbers are: " +
            guessed_nums;
            if(no_of_guesses == 3){

                result.textContent = "You're done with your 3 guess. The actual number is "+answer;
                document.getElementById("my_btn").disabled = true;
            }
        }
        else if(user_guess > answer){
            msg1.textContent = "Your guess is too high.";
            msg2.textContent = "No. of guesses: " + no_of_guesses;
            msg3.textContent = "Your guessed numbers are: " +
            guessed_nums;
             if(no_of_guesses == 3){

                result.textContent = "You're done with your 3 guess. The actual number is "+answer;
                document.getElementById("my_btn").disabled = true;

              
            }
        }
        else if(user_guess == answer){
            msg1.textContent = "Yippie You Win!!";
            msg2.textContent = "The number was: " + answer;
            msg3.textContent = "You guessed it in "+ no_of_guesses + " guesses";
            document.getElementById("my_btn").disabled = true;
        }
        console.log(answer)
    }
}