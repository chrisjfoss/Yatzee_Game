score = 0;
dice = [0, 0, 0, 0, 0];
user = "Guest";
isFinished = false;
//set to the ipaddress of the server
ipaddress = "localhost";
$.support.cors = true;
function saveGame()
{
    $.post(
        ipaddress+":61446/api/game/create",
        { score: score, user: user, isFinished: isFinished },
        function(data) {
            alert("Response: " + data);
        }
    );
}

function getGames()
{
    $.get({
        url: ipaddress+":61446/api/game",
        success: function(data) {
            alert( "Data Loaded: " + data );
        }
    });
}

// Starts players score card over and reset the user interface
function resetGame()
{
    score = 0;
    dice = [0,0,0,0,0];
    changeDisplay();
}

// Changes what is shown on screen based on information provided throughout the game
function changeDisplay()
{
    rollElement = document.getElementById("roll");
    string = "";
    for(j = 0; j < 4; ++j)
    {
        string += dice[j].toString() + ",";
    }
    string += dice[4].toString();
    rollElement.innerHTML = string;
    scoreElement = document.getElementById("score");
    scoreElement.innerHTML = "Score: " + score;
}

// Randomly generates 5 numbers
function roll() 
{ 
    for(j = 0; j < 5; ++j)
    {
        dice[j] = Math.floor(Math.random() * 6) + 1;
    }
    
    changeDisplay();
    return dice;
} 

// Allows user to pick dice he/she wants to reroll
function reRoll(number)
{
    for(j = 4; j >= 0; --j)
    {
        if(number >= 2**j)
        {
            number -= 2**j;
            dice[j] = Math.floor(Math.random() * 6) + 1;
        }
    }
    changeDisplay();
}

// Sorts numbers rolled into an array that counts the number of dice per number 1-6.
function sortNumbers(arrayNumbers)
{
    sortedNumbers = [0,0,0,0,0,0];
    
    for(j = 0; j <= 5; ++j)
    {
        sortedNumbers[dice[j]-1] += 1;
    }
    changeDisplay();
    return sortedNumbers; 
}

// Calculates score if player chooses to score values 1-6
function topSection(number)
{
    sortedNumbers = sortNumbers();
    score = array (sortedNumbers[number]) * number;
    changeDisplay();
    return score;
}

// Check to see if user scored a full House, if true, 25 points.
function fullHouse()
{ 
    sortedNumbers = sortNumbers();
    three = false;
    two = false;
    for(j = 0; j <= 5; ++j)
    {
        three = (sortedNumbers[j] == 3) || three;
        two   = (sortedNumbers[j] == 3) || two;
    }

    if (two && three)
    {
        score += 25;
    }
    changeDisplay();
    return score;
} 

// If three of a kind is true, add all dice to score
function threeOfAKind() 
{ 
    sortedNumbers = sortNumbers();
    threeOrMore = false;
    tempScore = 0;
    for(j = 0; j <= 5; ++j)
    {
        threeOrMore = (sortedNumbers[j] >= 3) || threeOrMore;
        tempScore += sortedNumbers[j] * (j+1);
    }
    if(threeOrMore)
    {
        score += tempScore;
    }
    changeDisplay();
} 

// If four of a kind is true, add all dice to score
function fourOfAKind() 
{ 
    sortedNumbers = sortNumbers();
    threeOrMore = false;
    score = 0;
    for(j = 0; j <= 5; ++j)
    {
        threeOrMore = (sortedNumbers[j] >= 4) || threeOrMore;
        score += sortedNumbers[j] * (j+1);
    }
    changeDisplay();
}

// If smallStraight is true, add 30 points
function smallStraight() 
{ 
    sortedNumbers = sortNumbers();
    straight = false;
    for(j = 1; j < 5; ++j)
    {
        straight = (sortedNumbers[j-1] > 0 && sortedNumbers[j] > 0 && sortedNumbers[j+1] > 0) || straight;
    }
    if(straight)
    {
        score += 30;
    }
    changeDisplay();
    return score;
}

// If largeStraight is true, add 40 points
function largeStraight()
{ 
    sortedNumbers = sortNumbers();
    straight = false;

    for(j = 0; j <= 2; ++j)
    {
        straight = (sortedNumbers[j] > 0 && sortedNumbers[j+1] > 0 && sortedNumbers[j+2] > 0 && sortedNumbers[j+3] > 0) || straight;
    }

    if(straight)
    {
        score += 40;
    }
    changeDisplay();
    return score;
}

// If yahtzee is true, add 50 points
function yahtzee() 
{ 
    sortedNumbers = sortNumbers();
    yahtzee = false;
    for(j = 0; j <= 5; ++j)
    {
        yahtzee = (sortedNumbers[j] == 5) || yahtzee;
    }
    
    if(yahtzee)
    {
        score += 50;
    }
    changeDisplay();
    return score;
}

// Adds all dice together and adds to score
function chance() 
{
    sortedNumbers = sortNumbers();
    for(j = 0; j <= 5; ++j)
    {
        score += sortedNumbers[j] * (j+1);
    }
    changeDisplay();
    return score;
}
