score = 0;
dice = [0, 0, 0, 0, 0];

function resetGame()
{
    score = 0;
    dice = [0,0,0,0,0];
    changeDisplay();
}

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

function roll() 
{ 
    for(j = 0; j < 5; ++j)
    {
        dice[j] = Math.floor(Math.random() * 6) + 1;
    }
    
    changeDisplay();
    return dice;
} 

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

function topSection(number)
{
    sortedNumbers = sortNumbers();
    score = array (sortedNumbers[number]) * number;
    changeDisplay();
    return score;
}

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