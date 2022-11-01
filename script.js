//declare cards array
let card = document.getElementsByClassName("card");
let cards = [...card];

//deck of all cards (set)
const deck = document.getElementById("card-deck");

//declare moves variable + counter variable for moves
let moves = 0; 
let counter = document.querySelector(".moves");

//declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// stars list
let starsList = document.querySelectorAll(".stars li");

//closing icon in modal
let closeIcon = document.querySelector(".close");

//declare modal
let modal = document.getElementById("popup1")

//declare (currently empty) openedCards array
var openedCards = [];

//shuffles the array each time
function shuffle (array){
   var currentIndex = array.length, temporaryValue, randomIndex;
   while (currentIndex !== 0)
   {
     randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
   }
   return array;
};

//starts a new game each time page is refreshed
document.body.onload = startGame();

//start a new game, reset array, timer, etc.
function startGame()
{
  openedCards = []; //empty openedCards array
  cards = shuffle(cards); //shuffle cards
  for (var i = 0; i < cards.length; i++)
  {
    deck.innerHTMl = ""; //clear out card classes
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });
  cards[i].classList.remove("show", "open", "match", "disabled");
  }
//reset moves
moves = 0;
counter.innerHTML = moves;

// reset stars
    for (var i = 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible"; //make them visible again
    }

//reset timer
hour = 0;
minute = 0;
second = 0;
var timer = document.querySelector(".timer");
timer.innerHTML = "0 minutes 0 seconds"; //back to default time
clearInterval(interval);
}

//function that displays cards
var displayCard = function (){
   this.classList.toggle("open");
   this.classList.toggle("show");
   this.classList.toggle("disabled");
}

//add opened cards to OpenedCards list and check if cards match or not
function cardOpen(){
  openedCards.push(this);
  var len = openedCards.length;
  if (len === 2){
    moveCounter();
if(openedCards[0].type === openedCards[1].type){ //if their types are same, they match
            matched();
        } else {
            unmatched();
        }
  }
  };

//when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = []; //empty array again
}

//when cards don't match
function unmatched(){
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout (function(){
    openedCards[0].classList.remove("show", "open", "no-event","unmatched");
    openedCards[1].classList.remove("show", "open", "no-event","unmatched");
    enable();
    openedCards = []; //empty array
    },1100);
}
//disable card function
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

//enable cards and disable matched cards
//make new array
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


//keep count of moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    //if between 100 and 150 moves, 2 stars
    if (moves > 100 && moves < 150){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    //if more than 200 moves, 1 star
    else if (moves > 200){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


//timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++; //add 1 to seconds
        if(second == 60){ //every 60 seconds, reset seconds and add 1 to minutes
            minute++;
            second=0;
        }
        if(minute == 60){ //every 60 minutes, reset minutes and add 1 to hours
            hour++;
            minute = 0;
        }
    },1000);
}


//the endgame when all cards match, show modal and moves, time and rating
function congratulations(){
    if (matchedCard.length == 66){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML; //show final # of stars

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves; //show final # of moves
        document.getElementById("starRating").innerHTML = starRating; //show final # of stars
        document.getElementById("totalTime").innerHTML = finalTime; //show final time on timer

        //closeicon on modal
        closeModal();
    };
}


// close icon on modal
function closeModal(){
    closeIcon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


//play again function (cues resetting) 
function playAgain(){
    modal.classList.remove("show");
    startGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};